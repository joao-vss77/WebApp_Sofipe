export const fmtCnpj = (v) =>
  v.replace(/\D/g, '').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');

export const fmtPhone = (s) =>
  s.length === 11
    ? s.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
    : s.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
