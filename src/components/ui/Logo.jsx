import { useState } from 'react';
import { LOGO_URL } from '@/config/site';

/**
 * Logo oficial da Sofipe (imagem hospedada em sofipe.com.br).
 * Se a imagem falhar ao carregar, cai para o nome em texto para não quebrar o layout.
 */
export default function Logo({ className = '' }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="text-xl font-bold tracking-tight text-[#0B1F3A]">Sofipe</span>;
  }

  return (
    <img
      src={LOGO_URL}
      alt="Sofipe Corretora de Seguros"
      className={className}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
