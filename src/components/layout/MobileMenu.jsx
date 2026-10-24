import { PRODUCT_LIST } from '@/data/products';
import { ANCHOR_LINKS } from './navigation';

/** Menu hambúrguer (< 1024px): painel com rolagem própria e fundo que fecha ao tocar. */
export default function MobileMenu({ onSelect, onClose, onOpenChat }) {
  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <nav id="mobile-menu" className="mobile-menu" aria-label="Menu principal">
        <button type="button" className="pill pill-cta mm-cta" onClick={onOpenChat}>
          Falar com a Sofi ↗
        </button>

        <p className="mm-label">Produtos</p>
        {PRODUCT_LIST.map((p) => (
          <button key={p.key} type="button" onClick={() => onSelect({ preset: p.key })}>{p.short}</button>
        ))}

        <p className="mm-label">Navegue</p>
        {ANCHOR_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={onClose}>{l.label}</a>
        ))}
        <a href="#confianca" onClick={onClose}>Credenciais e LGPD</a>
        <a href="#contato" onClick={onClose}>Contato</a>
        <a href="https://sofipe.com.br/" target="_blank" rel="noopener" onClick={onClose}>Quem somos</a>
      </nav>
    </>
  );
}
