import { useChat } from '@/context/ChatContext';
import { Bolt, Pin, Shield, Users } from '@/components/ui/Icons';

const STEPS = [
  { t: 'Conte sobre a sua empresa', d: 'Informe o seguro de interesse, CNPJ ou MEI, número de vidas e faturamento aproximado.', m: '2 minutos', icon: <Users size={26} /> },
  { t: 'A Sofi analisa o seu perfil', d: 'Ela cruza porte, necessidade e urgência e define a prioridade do seu atendimento.', m: 'Em segundos', icon: <Bolt size={26} /> },
  { t: 'Receba a recomendação', d: 'Você vê o seguro mais indicado e o motivo da indicação, em linguagem simples.', m: 'Sem compromisso', icon: <Shield size={26} /> },
  { t: 'Contrate ou fale com um consultor', d: 'Produtos elegíveis podem ser contratados online. Os demais seguem para um especialista no WhatsApp.', m: 'Você decide', icon: <Pin size={26} /> },
];

export default function HowItWorks() {
  const { openChat } = useChat();
  return (
    <section id="como-funciona" className="wrap" style={{ paddingBlock: 'clamp(48px,9vw,120px)' }}>
      <div className="flex flex-wrap items-end justify-between gap-5 sm:gap-6">
        <div className="max-w-[720px]">
          <p className="eyebrow text-brand">Como funciona a cotação com IA</p>
          <h2 className="title-xl mt-2">Da conversa à proteção em 4 passos</h2>
        </div>
        <button type="button" className="pill pill-cta pill-lg w-full justify-center sm:w-auto" onClick={() => openChat()}>
          Começar agora <span>↗</span>
        </button>
      </div>

      <ol className="m-0 mt-8 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.t} className="card flex min-w-0 flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="step-n">{i + 1}</span>
              <span className="meta-chip">{s.m}</span>
            </div>
            <h3 className="text-[1.3rem] leading-[1.08] sm:text-[1.45rem]">{s.t}</h3>
            <p className="text-muted">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
