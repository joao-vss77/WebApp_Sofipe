import { useEffect, useRef } from 'react';
import { useChat } from '@/context/ChatContext';
import { useChatFlow } from '@/hooks/useChatFlow';
import { useMedia } from '@/hooks/useMedia';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { Robot } from '@/components/ui/Icons';
import TextControl from './TextControl';
import ResultCard from './ResultCard';

export default function Chat({ req, open, onClose }) {
  const { restartChat } = useChat();
  const { msgs, ctrl, typing, answer, submitText } = useChatFlow(req);
  const logRef = useRef(null);
  const isMobile = useMedia('(max-width:639px)');

  // No mobile o chat vira uma folha quase em tela cheia: trava a rolagem da página atrás.
  useLockBodyScroll(open && isMobile);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing, ctrl]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <section className="chat" id="chat" role="dialog" aria-label="Chat com a Sofi AI" hidden={!open}>
      <div className="chat-head">
        <div className="sofi"><Robot /></div>
        <div className="min-w-0">
          <div className="font-bold leading-tight">Sofi AI</div>
          <div className="s">Assistente de IA da Sofipe · online</div>
        </div>
        <div className="ml-auto flex gap-2">
          <button type="button" className="hb" onClick={restartChat}>Reiniciar</button>
          <button type="button" className="hb" onClick={onClose} aria-label="Fechar chat">Fechar</button>
        </div>
      </div>

      <div className="chat-log" ref={logRef} role="log" aria-live="polite">
        {msgs.map((m) => (m.kind === 'result'
          ? <ResultCard key={m.id} r={m.r} />
          : <div key={m.id} className={'msg ' + m.who}>{m.text}</div>))}
        {typing && <div className="msg bot typing" aria-label="Sofi está digitando"><i /><i /><i /></div>}
      </div>

      <div className="chat-controls" style={ctrl ? undefined : { display: 'none' }}>
        {ctrl && ctrl.kind === 'chips' && (
          <div className="chips">
            {ctrl.options.map((o) => (
              <button key={o.label} type="button" className="chip" onClick={() => answer(o.label, o)}>{o.label}</button>
            ))}
          </div>
        )}
        {ctrl && ctrl.kind === 'text' && (
          <TextControl
            key={ctrl.opts.label}
            opts={ctrl.opts}
            onSubmit={submitText}
            onChip={(o) => answer(o.shown || o.label, { chip: o })}
          />
        )}
        {ctrl && ctrl.kind === 'again' && (
          <div className="chips">
            <button type="button" className="chip" onClick={restartChat}>Cotar outro seguro</button>
          </div>
        )}
      </div>

      <p className="chat-foot">
        A Sofi é uma assistente de IA e não substitui o consultor. Seus dados seguem a LGPD e só são usados para a sua cotação.
      </p>
    </section>
  );
}
