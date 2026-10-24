import { useEffect, useRef, useState } from 'react';

/** Campo de texto do chat, com chips de atalho opcionais (ex.: "Pular"). */
export default function TextControl({ opts, onSubmit, onChip }) {
  const [value, setValue] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    try { ref.current && ref.current.focus({ preventScroll: true }); } catch (e) { /* noop */ }
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (value.trim()) { onSubmit(value.trim()); setValue(''); }
  };

  return (
    <>
      <form className="chat-form" noValidate onSubmit={submit}>
        <input
          id="sofi-input"
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={opts.type || 'text'}
          placeholder={opts.placeholder}
          inputMode={opts.inputMode || 'text'}
          autoComplete={opts.autocomplete || 'off'}
          aria-label={opts.label}
        />
        <button type="submit" className="pill pill-cta">Enviar</button>
      </form>
      {opts.extra && opts.extra.length > 0 && (
        <div className="chips">
          {opts.extra.map((o) => (
            <button key={o.label} type="button" className="chip alt" onClick={() => onChip(o)}>{o.label}</button>
          ))}
        </div>
      )}
    </>
  );
}
