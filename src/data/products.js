export const PRODUCTS = {
  saude: {
    key: 'saude', name: 'Seguro Saúde Empresarial', short: 'Saúde Empresarial', pts: 15, self: true, bg: '#CFE0FF',
    tag: 'A partir de 1 vida · CNPJ e MEI',
    desc: 'Cuide de quem faz a empresa crescer. Plano de saúde para CNPJ ou MEI, com cobertura completa.',
    who: 'Empresas de qualquer porte que querem reter e atrair talentos.',
    why: 'Planos empresariais podem ter condições melhores que os individuais, conforme a operadora, e ajudam a reter a equipe. Atendem CNPJ e MEI a partir de 1 vida.',
  },
  vida: {
    key: 'vida', name: 'Seguro de Vida em Grupo', short: 'Vida em Grupo', pts: 15, self: true, bg: '#FFD66B',
    tag: 'Equipe, sócios e famílias',
    desc: 'Segurança financeira para a equipe e as famílias, com cobertura por invalidez, assistências e serviços adicionais.',
    who: 'Empresas com equipe, RH e sócios que buscam custo previsível.',
    why: 'Protege a equipe e as famílias com cobertura por morte e invalidez, assistências e custo previsível para a empresa.',
  },
  rc: {
    key: 'rc', name: 'Responsabilidade Civil (D&O e Geral)', short: 'Responsabilidade Civil', pts: 20, self: false, bg: '#FFB066',
    tag: 'D&O e Geral · com especialista',
    desc: 'Proteja decisões, patrimônio e reputação. Cobre danos a terceiros e custos de defesa, incluindo sócios e administradores.',
    who: 'Diretores, conselhos, prestadores de serviço e indústrias.',
    why: 'Protege sócios, administradores e a empresa contra reclamações de terceiros e custos de defesa. Exige análise de risco feita por um especialista.',
  },
  patrimonial: {
    key: 'patrimonial', name: 'Seguro Patrimonial e Empresarial', short: 'Patrimonial', pts: 20, self: false, bg: '#E0D3FF',
    tag: 'Imóvel, estoque e equipamentos',
    desc: 'Seu espaço de trabalho protegido, conforme os riscos previstos na apólice.',
    who: 'Lojas, escritórios, clínicas e indústrias.',
    why: 'Protege imóvel, estoque e equipamentos conforme os riscos da apólice. O valor depende do local e da atividade, por isso passa por um consultor.',
  },
};

export const PRODUCT_LIST = [PRODUCTS.saude, PRODUCTS.vida, PRODUCTS.rc, PRODUCTS.patrimonial];
