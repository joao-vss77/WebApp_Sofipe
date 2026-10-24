/** Logo oficial hospedada no site da Sofipe. */
export const LOGO_URL =
  'https://sofipe.com.br/wp-content/uploads/elementor/thumbs/Logo-site-ajustado-ralaeydtsot6yx8ywxbywuflmbqzqs4t77hvmwdh4w.png?x55306';

export const CONFIG = {
  // Endpoint que recebe o lead (n8n, Make, função serverless ou API própria) e repassa ao
  // Exact Spotter, RD Station e WhatsApp. Vazio = modo demonstração: nada é enviado.
  webhookUrl: '',
  newsletterUrl: '',
  whatsapp: '5511970891940',
  phoneLabel: '(11) 97089-1940',
  landlineLabel: '(11) 3740-2037',
  selfServiceUrl: 'https://sofipe.com.br/',
  hotMin: 65,
  warmMin: 40,
  selfServiceMaxLives: 29, // Saúde e Vida em Grupo elegíveis à contratação online até este nº de vidas
};
