import { useEffect, useState } from 'react';
import { useChat } from '@/context/ChatContext';
import { useMedia } from '@/hooks/useMedia';
import { useScrolled } from '@/hooks/useScrolled';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import Logo from '@/components/ui/Logo';
import { CloseIcon, MenuIcon } from '@/components/ui/Icons';
import DesktopNav from './DesktopNav';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { openChat } = useChat();
  const solid = useScrolled(40);
  const wide = useMedia('(min-width:1024px)');
  const [menu, setMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobile = mobileOpen && !wide;

  useLockBodyScroll(mobile);

  // A faixa de status do topo (safe-area) acompanha o estado do header.
  useEffect(() => {
    document.documentElement.style.setProperty('--band', solid ? 'var(--bg)' : '#B8F5DC');
  }, [solid]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setMenu(null); setMobileOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeAll = () => { setMenu(null); setMobileOpen(false); };
  const selectItem = (item) => {
    closeAll();
    if (!item.href) openChat(item.preset);
  };

  return (
    <header className="hdr" onMouseLeave={() => setMenu(null)}>
      <div className={'hdr-in ' + (solid || menu || mobile ? 'solid' : '')}>
        <a className="brand" href="#topo" aria-label="Sofipe Corretora de Seguros, início" onClick={closeAll}>
          <span className="brand-logo"><Logo /></span>
        </a>

        {wide && <DesktopNav menu={menu} setMenu={setMenu} />}

        <div className="flex items-center gap-2">
          <button type="button" className="pill pill-white hdr-cta" onClick={() => { closeAll(); openChat(); }}>
            <span className="whitespace-nowrap">Falar com a Sofi <span className="text-[.8em]">↗</span></span>
          </button>
          {!wide && (
            <button
              type="button"
              className="icon-btn"
              aria-label={mobile ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobile ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          )}
        </div>

        {wide && menu && <MegaMenu menuKey={menu} onSelect={selectItem} />}
        {mobile && (
          <MobileMenu
            onSelect={selectItem}
            onClose={closeAll}
            onOpenChat={() => { closeAll(); openChat(); }}
          />
        )}
      </div>
    </header>
  );
}
