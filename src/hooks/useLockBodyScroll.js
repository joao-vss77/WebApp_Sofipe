import { useEffect } from 'react';

let locks = 0;

/** Trava a rolagem da página enquanto `active` for true (menu mobile, chat em tela cheia). */
export function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return undefined;
    locks += 1;
    document.body.classList.add('no-scroll');
    return () => {
      locks -= 1;
      if (locks === 0) document.body.classList.remove('no-scroll');
    };
  }, [active]);
}
