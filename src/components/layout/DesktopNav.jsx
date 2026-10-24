import { MENUS, ANCHOR_LINKS } from './navigation';
import { PlusIcon } from '@/components/ui/Icons';

export default function DesktopNav({ menu, setMenu }) {
  return (
    <nav aria-label="Principal" className="flex gap-0.5">
      {Object.entries(MENUS).map(([key, m]) => (
        <span key={key} onMouseEnter={() => setMenu(key)}>
          <button
            type="button"
            className={'nav-btn ' + (menu === key ? 'on' : '')}
            aria-expanded={menu === key}
            onClick={() => setMenu(menu === key ? null : key)}
          >
            {m.label}
            <PlusIcon size={14} sw={2.5} className="opacity-80" />
          </button>
        </span>
      ))}
      {ANCHOR_LINKS.map((l) => (
        <a key={l.href} className="nav-btn" href={l.href} onMouseEnter={() => setMenu(null)}>{l.label}</a>
      ))}
    </nav>
  );
}
