import { useState } from 'react';
import { CONFIG } from '@/config/site';
import { useChat } from '@/context/ChatContext';
import { emailOk } from '@/utils/validators';
import { postJson } from '@/services/leads';
import { ArrowUR } from '@/components/ui/Icons';

const FOOTER_PRODUCTS = [
  ['saude', 'Saúde Empresarial'],
  ['vida', 'Vida em Grupo'],
  ['rc', 'Responsabilidade Civil'],
  ['patrimonial', 'Patrimonial'],
];

export default function Footer() {
  const { openChat } = useChat();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();
    if (!emailOk(email)) { setMsg('Digite um e-mail válido.'); return; }
    const status = await postJson(CONFIG.newsletterUrl, {
      origem: 'newsletter-lp-sofipe',
      email,
      consentimento_lgpd: true,
    });
    setMsg(
      status === 'ok' ? 'Cadastro recebido.'
        : status === 'erro' ? 'Não foi possível cadastrar agora. Tente de novo.'
          : 'Modo demonstração: e-mail não enviado.',
    );
  };

  return (
    <footer id="contato" className="foot">
      <div className="wrap">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-[1.4rem] leading-[1.1] sm:text-[1.6rem]">Receba novidades sobre seguros empresariais</h3>
            <form className="foot-input mt-5" onSubmit={subscribe} noValidate>
              <input
                id="news-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Seu e-mail"
              />
              <button type="submit" className="arrow-c" aria-label="Cadastrar e-mail" style={{ border: 0, cursor: 'pointer' }}>
                <ArrowUR />
              </button>
            </form>
            <p className="mt-2 min-h-5 text-[.8rem] text-[#9FB0C6]" role="status">
              {msg || 'Ao cadastrar, você concorda com o tratamento do e-mail conforme a LGPD.'}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <a href="#produtos">Produtos</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#clientes">Clientes</a>
            <a href="#faq">Dúvidas</a>
          </div>

          <div className="flex flex-col gap-1">
            {FOOTER_PRODUCTS.map(([key, label]) => (
              <button key={key} type="button" className="lnk" onClick={() => openChat(key)}>{label}</button>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <a href="https://sofipe.com.br/" target="_blank" rel="noopener">sofipe.com.br</a>
            <a href={'https://wa.me/' + CONFIG.whatsapp} target="_blank" rel="noopener">WhatsApp {CONFIG.phoneLabel}</a>
            <span>Telefone {CONFIG.landlineLabel}</span>
            <span className="text-[.95rem] text-[#9FB0C6]">Rua Isabel Dias, 62, Sala 03<br />Mooca, São Paulo/SP</span>
          </div>
        </div>

        <div className="wordmark mt-10 sm:mt-12" aria-hidden="true">Sofipe<sup>®</sup></div>
        {/* Incluir nº de registro SUSEP e links reais de política de privacidade e canal do titular */}
        <p className="mt-4 text-[.8rem] text-[#9FB0C6]">
          © 2026 Sofipe Corretora de Seguros · Corretora credenciada SUSEP · Política de privacidade · Canal do titular (LGPD)
        </p>
      </div>
    </footer>
  );
}
