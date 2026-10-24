import { useChat } from '@/context/ChatContext';
import { Users } from '@/components/ui/Icons';

export default function Intro() {
  const { openChat } = useChat();
  return (
    <section className="wrap intro" style={{ paddingBlock: 'clamp(48px,9vw,120px)' }}>
      <div className="grid items-start gap-6 lg:grid-cols-[.8fr_1.6fr] lg:gap-10">
        <p className="max-w-[36ch] text-[1.02rem] text-muted sm:text-[1.1rem]">
          Uma equipe de especialistas em seguros empresariais que usa inteligência artificial para entender o seu negócio rápido e consultoria humana para fechar a proteção certa.
        </p>
        <div>
          <h2>
            Soluções em seguros que unem{' '}
            <span className="chip-img" style={{ width: '1.1em' }}><Users /></span>{' '}
            tecnologia e cuidado humano
          </h2>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <a className="pill pill-white" style={{ border: '1px solid var(--line)' }} href="#como-funciona">Como funciona <span>↗</span></a>
            <button type="button" className="pill pill-ghost" onClick={() => openChat()}>Cotar com a Sofi <span>↗</span></button>
          </div>
        </div>
      </div>
    </section>
  );
}
