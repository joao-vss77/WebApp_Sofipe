import { PRODUCT_LIST } from '@/data/products';
import { useChat } from '@/context/ChatContext';
import { ArrowUR } from '@/components/ui/Icons';

export default function FeaturedMobile() {
  const { openChat } = useChat();
  return (
    <section id="produtos" className="feat py-10">
      <div className="wrap">
        <p className="eyebrow text-mint">Seguros empresariais</p>
        <h2 className="title-lg mt-2">Proteção inteligente para o seu negócio</h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
          {PRODUCT_LIST.map((p) => (
            <article key={p.key} className="stack-card" style={{ background: p.bg }}>
              <span className="meta-chip meta-chip-dark">{p.tag}</span>
              <h3>{p.short}</h3>
              <p className="text-[#14283F]">{p.desc}</p>
              <button type="button" className="go mt-auto" onClick={() => openChat(p.key)}>
                Cotar com IA <span className="arrow-c"><ArrowUR /></span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
