import { MENUS } from './navigation';

export default function MegaMenu({ menuKey, onSelect }) {
  const { items, tile } = MENUS[menuKey];
  return (
    <div className="mega" role="menu">
      <ul>
        {items.map((it) => (
          <li key={it.label}>
            {it.href ? (
              <a
                href={it.href}
                onClick={() => onSelect(it)}
                {...(it.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {it.label}
              </a>
            ) : (
              <button type="button" onClick={() => onSelect(it)}>{it.label}</button>
            )}
          </li>
        ))}
      </ul>
      <div className="tile">{tile}</div>
    </div>
  );
}
