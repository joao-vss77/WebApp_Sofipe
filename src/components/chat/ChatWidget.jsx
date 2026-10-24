import { useEffect, useState } from 'react';
import { useChat } from '@/context/ChatContext';
import { reduced } from '@/utils/motion';
import { Robot } from '@/components/ui/Icons';
import Chat from './Chat';

/** Chat flutuante: launcher, balão de convite (só desktop) e janela do chat. */
export default function ChatWidget() {
  const { req, open, closeChat, resumeChat } = useChat();
  const [teaser, setTeaser] = useState(false);

  useEffect(() => {
    if (open) { setTeaser(false); return undefined; }
    const t = setTimeout(() => setTeaser(true), reduced ? 500 : 4000);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <div className="fab">
      {req && <Chat req={req} open={open} onClose={closeChat} />}
      {!open && teaser && (
        <button type="button" className="teaser" onClick={resumeChat}>
          Oi! Quer cotar um seguro empresarial em 2 minutos?
        </button>
      )}
      {!open && (
        <button type="button" className="launcher" onClick={resumeChat} aria-label="Abrir conversa com a Sofi AI">
          <span className="sofi"><Robot /></span>
          <span className="lbl">Falar com a Sofi</span>
        </button>
      )}
    </div>
  );
}
