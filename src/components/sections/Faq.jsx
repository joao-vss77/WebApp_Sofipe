import { FAQS } from '@/data/content';
import { useChat } from '@/context/ChatContext';
import { PlusIcon } from '@/components/ui/Icons';

export default function Faq() {
  const { openChat } = useChat();
  return (
    <section id="faq" className="wrap" style={{ paddingBlock: '32px clamp(48px,9vw,110px)' }}>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-10">
        <div>
          <p className="eyebrow text-brand">Dúvidas frequentes</p>
          <h2 className="title-lg mt-2">O que o decisor pergunta antes de contratar</h2>
          <p className="mt-4 text-muted">Ainda tem dúvida? Pergunte à Sofi ou chame um consultor.</p>
          <button type="button" className="pill pill-cta mt-6" onClick={() => openChat()}>Falar com a Sofi <span>↗</span></button>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <details key={q} className="faq" open={i === 0}>
              <summary>{q}<PlusIcon sw={2.5} /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
