import { CONFIG } from '@/config/site';
import { useChat } from '@/context/ChatContext';
import { ArrowUR, Icon, Shield, Users } from '@/components/ui/Icons';

const CATEGORIES = [
  { label: 'Saúde', icon: <Icon size={20}><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" /></Icon> },
  { label: 'Vida em grupo', icon: <Users size={20} /> },
  { label: 'Responsabilidade Civil', icon: <Icon size={20}><path d="M12 4v16M5 20h14M12 7 6 10l-2 5h8l-2-5Zm0 0 6 3 2 5h-8" /></Icon> },
  { label: 'D&O', icon: <Shield size={20} /> },
  { label: 'Patrimonial', icon: <Icon size={20}><path d="M4 21V9l8-6 8 6v12M9 21v-6h6v6" /></Icon> },
];

export default function Hero() {
  const { openChat } = useChat();
  return (
    <section className="hero" id="topo">
      <div className="blob b1" aria-hidden="true" />
      <div className="blob b2" aria-hidden="true" />
      <div className="blob b3" aria-hidden="true" />
      <div className="blob b4" aria-hidden="true" />

      <div className="wrap">
        <div className="laurel">
          <span>Credenciada SUSEP</span><span className="sep">·</span>
          <span>Conforme a LGPD</span><span className="sep">·</span>
          <span>Reclame Aqui sem reclamações</span>
        </div>

        <h1 className="mt-5 sm:mt-6">
          Seguro empresarial para quem<br className="hidden sm:block" /> faz a empresa{' '}
          <span className="chip-img"><Shield /></span> <span className="hl">crescer</span>
        </h1>
        <p className="hero-sub mt-5 sm:mt-8">em minutos, com a Sofi AI e um consultor ao seu lado</p>

        <div className="hero-cta mt-6 sm:mt-8">
          <button type="button" className="pill pill-cta pill-lg" onClick={() => openChat()}>
            Começar minha cotação
            <span className="arrow-c" style={{ width: 28, height: 28, background: '#0B1F3A', color: '#FFC93C' }}><ArrowUR /></span>
          </button>
          <a className="pill pill-line pill-lg" href={'https://wa.me/' + CONFIG.whatsapp} target="_blank" rel="noopener">
            Falar no WhatsApp
          </a>
        </div>

        <div className="logos mt-8 sm:mt-12" aria-label="Seguros empresariais">
          {CATEGORIES.map((c) => <span key={c.label}>{c.icon}{c.label}</span>)}
        </div>

        <div className="hero-foot mt-8 sm:mt-12">
          <p className="max-w-[34ch]">
            Corretora de seguros empresariais que une <b>tecnologia e cuidado humano</b>, de MEI com 1 vida a empresas com centenas de funcionários.
          </p>
          <p className="hf-r max-w-[24ch]">
            Sede na <b>Mooca, São Paulo</b><br />Atendimento em todo o Brasil
          </p>
        </div>
      </div>
    </section>
  );
}
