import { useEffect, useRef, useState } from 'react';
import { CONFIG } from '@/config/site';
import { PRODUCTS } from '@/data/products';
import { INTEREST, LIVES, REVENUE, URGENCY } from '@/data/chatOptions';
import { cnpjOk, emailOk, phoneDigits } from '@/utils/validators';
import { fmtCnpj, fmtPhone } from '@/utils/formatters';
import { sleep } from '@/utils/motion';
import { uid } from '@/utils/uid';
import { buildPayload, classify, postJson } from '@/services/leads';

/**
 * Máquina de conversa da Sofi AI.
 * Recebe `req` (um novo objeto reinicia a conversa) e devolve o estado da UI:
 *  - msgs: mensagens exibidas   - ctrl: controle atual (chips | text | again)
 *  - typing: indicador de digitação
 *  - answer / submitText: callbacks para responder à pergunta atual
 */
export function useChatFlow(req) {
  const [msgs, setMsgs] = useState([]);
  const [ctrl, setCtrl] = useState(null);
  const [typing, setTyping] = useState(false);
  const run = useRef(0); // id da execução atual; execuções antigas se auto-cancelam
  const resolver = useRef(null);

  const push = (m) => setMsgs((x) => [...x, { id: uid(), ...m }]);

  const bot = async (id, text) => {
    if (id !== run.current) return false;
    setTyping(true);
    await sleep(550 + Math.min(text.length * 6, 700));
    if (id !== run.current) return false;
    setTyping(false);
    push({ who: 'bot', text });
    return true;
  };

  const ask = (id, c) => new Promise((resolve) => {
    resolver.current = { id, resolve, opts: c.opts };
    setCtrl(c);
  });

  const answer = (shown, value) => {
    const r = resolver.current;
    if (!r || r.id !== run.current) return;
    resolver.current = null;
    setCtrl(null);
    push({ who: 'user', text: shown });
    r.resolve(value);
  };

  const submitText = async (val) => {
    const r = resolver.current;
    if (!r || r.id !== run.current) return;
    const res = r.opts.validate(val);
    if (!res.ok) {
      push({ who: 'user', text: val });
      await bot(r.id, res.msg);
      return;
    }
    answer(res.shown || res.value, { value: res.value });
  };

  const flow = async (id, preset) => {
    const say = (text) => bot(id, text);
    const stale = () => id !== run.current;
    const A = {};

    if (!(await say('Oi! Eu sou a Sofi, assistente de IA da Sofipe. Vou entender a sua empresa em poucas perguntas e indicar o seguro mais adequado.'))) return;

    // 1. Produto de interesse
    let interest = preset;
    if (!interest) {
      if (!(await say('Para começar: qual seguro empresarial você quer cotar?'))) return;
      const o = await ask(id, { kind: 'chips', options: INTEREST });
      if (stale()) return;
      interest = o.value;
    } else if (!(await say(`Você escolheu ${PRODUCTS[interest].name}. Vou fazer mais algumas perguntas rápidas.`))) return;
    A.interest = interest;

    // 2. CNPJ
    if (!(await say('Qual o CNPJ da sua empresa? Se você é MEI, informe o CNPJ do MEI.'))) return;
    const r = await ask(id, {
      kind: 'text',
      opts: {
        label: 'CNPJ',
        placeholder: '00.000.000/0000-00',
        inputMode: 'numeric',
        validate: (v) => (cnpjOk(v)
          ? { ok: true, value: fmtCnpj(v) }
          : { ok: false, msg: 'Não consegui validar esse CNPJ. Confira os 14 números e tente de novo, ou escolha uma opção abaixo.' }),
        extra: [
          { label: 'Usar CNPJ de exemplo', shown: '11.222.333/0001-81', cnpj: '11.222.333/0001-81' },
          { label: 'Ainda não tenho CNPJ', shown: 'Ainda não tenho CNPJ', none: true },
        ],
      },
    });
    if (stale()) return;
    if (r.chip) { A.hasCnpj = !r.chip.none; A.cnpj = r.chip.none ? '' : r.chip.cnpj; }
    else { A.hasCnpj = true; A.cnpj = r.value; }
    if (A.hasCnpj) { if (!(await say('CNPJ validado, obrigada!'))) return; }
    else if (!(await say('Sem problema. Um consultor ajuda você a formalizar e escolher a melhor opção.'))) return;

    // 3. Vidas, faturamento e prazo
    if (!(await say('Quantas pessoas você quer proteger (sócios e funcionários)?'))) return;
    const l = await ask(id, { kind: 'chips', options: LIVES.map((x) => ({ label: x.label, opt: x })) });
    if (stale()) return;
    A.livesOpt = l.opt;

    if (!(await say('Qual o faturamento anual aproximado da empresa?'))) return;
    const f = await ask(id, { kind: 'chips', options: REVENUE.map((x) => ({ label: x.label, opt: x })) });
    if (stale()) return;
    A.revenueOpt = f.opt;

    if (!(await say('Para quando você precisa da proteção?'))) return;
    const u = await ask(id, { kind: 'chips', options: URGENCY.map((x) => ({ label: x.label, opt: x })) });
    if (stale()) return;
    A.urgencyOpt = u.opt;

    // 4. Contato
    if (!(await say('Quase lá. Como posso chamar você? Ao continuar, você concorda com o uso dos seus dados conforme a LGPD, apenas para esta cotação.'))) return;
    const n = await ask(id, {
      kind: 'text',
      opts: {
        label: 'Seu nome', placeholder: 'Nome e sobrenome', autocomplete: 'name',
        validate: (v) => (v.length >= 2 ? { ok: true, value: v } : { ok: false, msg: 'Pode digitar seu nome?' }),
      },
    });
    if (stale()) return;
    A.name = n.value;

    if (!(await say(`Prazer, ${A.name.split(' ')[0]}! Qual o seu WhatsApp com DDD?`))) return;
    const w = await ask(id, {
      kind: 'text',
      opts: {
        label: 'WhatsApp', placeholder: '(11) 90000-0000', type: 'tel', inputMode: 'tel', autocomplete: 'tel',
        validate: (v) => {
          const d = phoneDigits(v);
          return d
            ? { ok: true, value: d, shown: fmtPhone(d) }
            : { ok: false, msg: 'Informe o número com DDD, por exemplo (11) 90000-0000.' };
        },
      },
    });
    if (stale()) return;
    A.phone = w.value;

    if (!(await say('E o seu e-mail? É opcional, mas ajuda a enviar a proposta.'))) return;
    const e = await ask(id, {
      kind: 'text',
      opts: {
        label: 'E-mail', placeholder: 'voce@empresa.com.br', type: 'email', inputMode: 'email', autocomplete: 'email',
        validate: (v) => (emailOk(v) ? { ok: true, value: v } : { ok: false, msg: 'Esse e-mail parece incompleto. Confira ou pule esta etapa.' }),
        extra: [{ label: 'Pular', shown: 'Prefiro não informar', skip: true }],
      },
    });
    if (stale()) return;
    A.email = e.chip ? '' : e.value;

    // 5. Classificação, envio e recomendação
    setTyping(true);
    await sleep(900);
    if (stale()) return;
    setTyping(false);

    A.product = A.interest === 'unsure' ? 'saude' : A.interest;
    A.selfEligible = PRODUCTS[A.product].self && A.hasCnpj && A.livesOpt.max <= CONFIG.selfServiceMaxLives;
    const c = classify(A);
    const payload = buildPayload(A, c);
    const status = await postJson(CONFIG.webhookUrl, payload);
    if (stale()) return;

    if (A.interest === 'unsure' && !(await say('Com base no seu perfil, começar pelo seguro de saúde costuma ser o caminho mais comum. Um consultor pode avaliar os demais.'))) return;
    if (!(await say(`Analisei o perfil da ${A.hasCnpj ? 'sua empresa' : 'sua futura empresa'}. Esta é a minha recomendação:`))) return;
    push({ who: 'bot', kind: 'result', r: { a: A, c, payload, status } });

    const closing = c.cls === 'quente'
      ? 'Seu perfil tem prioridade: um consultor da Sofipe pode assumir a sua cotação pelo WhatsApp.'
      : c.cls === 'morno'
        ? 'Você pode seguir sozinho ou falar com um consultor, como preferir.'
        : 'Sem pressa. Quando quiser retomar, é só chamar a Sofi ou um consultor.';
    if (!(await say(closing))) return;
    setCtrl({ kind: 'again' });
  };

  useEffect(() => {
    if (!req) return;
    run.current += 1;
    resolver.current = null;
    setMsgs([]);
    setCtrl(null);
    setTyping(false);
    flow(run.current, req.preset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [req]);

  return { msgs, ctrl, typing, answer, submitText };
}
