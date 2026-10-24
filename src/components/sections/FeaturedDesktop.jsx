import { useEffect, useRef, useState } from 'react';
import { PRODUCT_LIST } from '@/data/products';
import { useChat } from '@/context/ChatContext';
import { reduced } from '@/utils/motion';
import { ArrowUR } from '@/components/ui/Icons';
import { PRODUCT_GLYPHS } from '@/components/ui/ProductGlyphs';

const N = PRODUCT_LIST.length;

export default function FeaturedDesktop() {
  const { openChat } = useChat();
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  // O produto em destaque acompanha o progresso da rolagem dentro da seção "pinada".
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight + 80;
      const p = total > 0 ? Math.min(0.999, Math.max(0, -r.top / total)) : 0;
      setActive(Math.floor(p * N));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const jump = (i) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + total * ((i + 0.5) / N), behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section id="produtos" ref={ref} style={{ height: `${N * 75 + 25}svh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 'calc(env(safe-area-inset-top,0px) + 92px)', height: 'calc(100svh - 104px)', minHeight: 520 }}>
        <div className="feat grid h-full grid-cols-2 gap-9" style={{ marginInline: 12, padding: 'clamp(24px,3vw,44px)' }}>
          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <p className="eyebrow text-mint">Seguros empresariais</p>
              <p className="mt-1.5 max-w-[30ch] text-[var(--panel-muted)]">Role para ver cada produto ou escolha um.</p>
            </div>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {PRODUCT_LIST.map((p, i) => {
                const d = Math.abs(i - active);
                return (
                  <li key={p.key}>
                    <button
                      type="button"
                      className="feat-name"
                      aria-current={i === active}
                      onClick={() => jump(i)}
                      style={{ opacity: d === 0 ? 1 : d === 1 ? 0.38 : 0.2, transform: d === 0 ? 'translateX(0)' : 'translateX(-6px)' }}
                    >
                      {p.short}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="text-[.95rem] text-[var(--panel-muted)]">
              {String(active + 1).padStart(2, '0')} de {String(N).padStart(2, '0')}
            </p>
          </div>

          <div className="relative min-h-0">
            {PRODUCT_LIST.map((p, i) => {
              const off = i - active;
              return (
                <article
                  key={p.key}
                  className="feat-card"
                  aria-hidden={off !== 0}
                  style={{
                    background: p.bg,
                    opacity: off === 0 ? 1 : 0,
                    transform: `translateY(${off * 112}%) scale(${off === 0 ? 1 : 0.96})`,
                    pointerEvents: off === 0 ? 'auto' : 'none',
                    zIndex: off === 0 ? 2 : 1,
                  }}
                >
                  <div>
                    <span className="meta-chip meta-chip-dark">{p.tag}</span>
                    <h3 className="mt-[18px]">{p.name}</h3>
                    <p className="mt-3.5">{p.desc}</p>
                    <p className="mt-2.5 text-[.95rem]"><b>Para quem:</b> {p.who}</p>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <button type="button" className="go" tabIndex={off === 0 ? 0 : -1} onClick={() => openChat(p.key)}>
                      Cotar com IA <span className="arrow-c"><ArrowUR /></span>
                    </button>
                    <div className="feat-glyph">{PRODUCT_GLYPHS[p.key]}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
