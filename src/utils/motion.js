export const reduced =
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Espera `ms` milissegundos (zero quando o usuário prefere menos movimento). */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, reduced ? 0 : ms));
