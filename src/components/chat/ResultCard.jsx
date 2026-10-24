import { CONFIG } from '@/config/site';
import { PRODUCTS } from '@/data/products';
import { PRIO } from '@/data/chatOptions';

function ActionLink({ cls, href, children }) {
  return <a className={'pill ' + cls} href={href} target="_blank" rel="noopener">{children}</a>;
}

const STATUS_LABEL = {
  ok: 'Dados enviados ao time comercial',
  erro: 'Falha no envio. Dados abaixo',
  demo: 'Modo demonstração: nada foi enviado',
};

export default function ResultCard({ r }) {
  const { a, c, payload, status } = r;
  const p = PRODUCTS[a.product];
  const wa = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(
    `Olá! Sou ${a.name} e fiz a cotação com a Sofi AI. Tenho interesse em: ${p.name}. Vidas: ${a.livesOpt.label}. Prazo: ${a.urgencyOpt.label}.`,
  );

  return (
    <div className="result">
      <span className={'prio ' + c.cls}>{PRIO[c.cls]}</span>
      <h4>{p.name}</h4>
      <p>{p.why}</p>
      <div className="actions">
        {a.selfEligible && c.cls !== 'quente' && (
          <>
            <ActionLink cls="pill-cta" href={CONFIG.selfServiceUrl}>Contratar online</ActionLink>
            <ActionLink cls="pill-line" href={wa}>Falar com um consultor</ActionLink>
          </>
        )}
        {a.selfEligible && c.cls === 'quente' && (
          <>
            <ActionLink cls="pill-cta" href={wa}>Falar com um consultor agora</ActionLink>
            <ActionLink cls="pill-line" href={CONFIG.selfServiceUrl}>Contratar online</ActionLink>
          </>
        )}
        {!a.selfEligible && <ActionLink cls="pill-cta" href={wa}>Falar com um consultor</ActionLink>}
      </div>
      <details>
        <summary>{STATUS_LABEL[status] || STATUS_LABEL.demo}</summary>
        <pre>{JSON.stringify(payload, null, 2)}</pre>
      </details>
    </div>
  );
}
