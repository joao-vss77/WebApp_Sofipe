import { QUOTES } from '@/data/content';

export default function Testimonials() {
  return (
    <section id="clientes" className="wrap" style={{ paddingBlock: 'clamp(48px,9vw,110px) 40px' }}>
      <h2 className="title-xl max-w-[16ch]">Empresas que já conversaram com a Sofi</h2>

      {/* Mobile: carrossel com snap horizontal. A partir de md: grade de 3 colunas. */}
      <div className="carousel mt-8 sm:mt-10" role="region" aria-label="Depoimentos" tabIndex={0}>
        {QUOTES.map((q) => (
          <figure key={q.n} className="quote-card m-0" style={{ background: q.bg }}>
            <span className="meta-chip meta-chip-dark">Depoimento ilustrativo</span>
            <blockquote className="m-0 text-[1.15rem] leading-[1.3] tracking-[-.02em] sm:text-[1.3rem]">“{q.q}”</blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              <span className="avatar" aria-hidden="true">{q.i}</span>
              <span><b>{q.n}</b><br /><span className="text-[.92rem]">{q.r}</span></span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-4 text-[.85rem] text-muted">
        Depoimentos de exemplo para a fase de protótipo. Substitua por relatos reais, com autorização por escrito, antes de publicar.
      </p>
    </section>
  );
}
