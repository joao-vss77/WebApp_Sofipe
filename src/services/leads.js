import { CONFIG } from '@/config/site';
import { PRODUCTS } from '@/data/products';

/** Pontua o lead e devolve a prioridade de atendimento (quente | morno | frio). */
export function classify(a) {
  let score = a.livesOpt.pts + a.revenueOpt.pts + PRODUCTS[a.product].pts + a.urgencyOpt.pts;
  if (!a.hasCnpj) score -= 5;
  score = Math.max(0, score);
  return {
    score,
    cls: score >= CONFIG.hotMin ? 'quente' : score >= CONFIG.warmMin ? 'morno' : 'frio',
  };
}

export function buildPayload(a, c) {
  return {
    origem: 'landing-page-sofipe',
    canal: 'sofi-ai',
    criado_em: new Date().toISOString(),
    lead: { nome: a.name, whatsapp: a.phone ? '55' + a.phone : null, email: a.email || null },
    empresa: {
      cnpj: a.hasCnpj ? a.cnpj.replace(/\D/g, '') : null,
      sem_cnpj: !a.hasCnpj,
      faixa_faturamento: a.revenueOpt.label,
    },
    necessidade: {
      produto_interesse: a.interest,
      produto_recomendado: a.product,
      faixa_vidas: a.livesOpt.label,
      prazo: a.urgencyOpt.label,
    },
    classificacao: { score: c.score, nivel: c.cls, autocontratacao_elegivel: a.selfEligible },
    consentimento_lgpd: { aceito: true, texto_versao: 'v1', data: new Date().toISOString() },
    utm: Object.fromEntries(new URLSearchParams(window.location.search).entries()),
  };
}

/** Envia JSON ao webhook. Retorna 'ok' | 'erro' | 'demo' (quando a URL está vazia). */
export async function postJson(url, payload) {
  if (!url) {
    console.log('[Sofipe] modo demonstração, payload:', payload);
    return 'demo';
  }
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return r.ok ? 'ok' : 'erro';
  } catch (e) {
    return 'erro';
  }
}
