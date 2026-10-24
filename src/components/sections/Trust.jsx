import { Lock, Shield, Star, Users } from '@/components/ui/Icons';

const ITEMS = [
  { icon: <Shield size={30} />, t: 'Credenciada SUSEP', d: 'Corretora de seguros regulada, com registro oficial.' },
  { icon: <Lock size={30} />, t: 'Conforme a LGPD', d: 'Dados usados só para a sua cotação, com canal do titular.' },
  { icon: <Star size={30} />, t: 'Reclame Aqui', d: 'Zero reclamações registradas no perfil da Sofipe.' },
  { icon: <Users size={30} />, t: 'Atendimento consultivo', d: 'Um especialista acompanha você até a ativação.' },
];

export default function Trust() {
  return (
    <section id="confianca" className="trust-panel" style={{ paddingBlock: 'clamp(28px,5vw,64px)' }}>
      <div className="wrap">
        <h2 className="title-lg max-w-[16ch]">Corretora próxima, transparente e reconhecida</h2>
        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((x) => (
            <div key={x.t} className="trust-item">
              <div className="text-[#0B1F3A]">{x.icon}</div>
              <h3 className="mt-3 text-[1.25rem] sm:text-[1.35rem]">{x.t}</h3>
              <p className="mt-1">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
