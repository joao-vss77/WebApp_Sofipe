export function cnpjOk(value) {
  const s = String(value).replace(/\D/g, '');
  if (s.length !== 14 || /^(\d)\1+$/.test(s)) return false;
  const dv = (n) => {
    let sum = 0;
    let pos = n - 7;
    for (let i = n; i >= 1; i--) {
      sum += Number(s[n - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return dv(12) === Number(s[12]) && dv(13) === Number(s[13]);
}

/** Retorna só os dígitos (DDD + número) ou null se inválido. */
export function phoneDigits(value) {
  let s = String(value).replace(/\D/g, '');
  if ((s.length === 12 || s.length === 13) && s.startsWith('55')) s = s.slice(2);
  return s.length === 10 || s.length === 11 ? s : null;
}

export const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
