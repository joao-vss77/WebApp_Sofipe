export const INTEREST = [
  { label: 'Saúde empresarial', value: 'saude' },
  { label: 'Vida em grupo', value: 'vida' },
  { label: 'Responsabilidade Civil / D&O', value: 'rc' },
  { label: 'Patrimonial', value: 'patrimonial' },
  { label: 'Não sei, me ajude', value: 'unsure' },
];

export const LIVES = [
  { label: 'Só eu (1 vida)', pts: 5, max: 1 },
  { label: '2 a 9', pts: 10, max: 9 },
  { label: '10 a 29', pts: 20, max: 29 },
  { label: '30 a 99', pts: 25, max: 99 },
  { label: '100 ou mais', pts: 30, max: 100 },
];

export const REVENUE = [
  { label: 'Até R$ 81 mil (MEI)', pts: 5 },
  { label: 'R$ 81 mil a R$ 360 mil', pts: 10 },
  { label: 'R$ 360 mil a R$ 4,8 milhões', pts: 20 },
  { label: 'Acima de R$ 4,8 milhões', pts: 25 },
];

export const URGENCY = [
  { label: 'Nos próximos 30 dias', pts: 20 },
  { label: 'Em 1 a 3 meses', pts: 12 },
  { label: 'Só pesquisando', pts: 3 },
];

export const PRIO = {
  quente: 'Prioridade alta no atendimento',
  morno: 'Prioridade média no atendimento',
  frio: 'Atendimento padrão',
};
