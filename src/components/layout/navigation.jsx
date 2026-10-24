import { PRODUCT_LIST } from '@/data/products';
import { Shield, Users, Pin } from '@/components/ui/Icons';

/** Menus com submenu (desktop). `preset` abre o chat já num produto; `href` navega. */
export const MENUS = {
  produtos: {
    label: 'Produtos',
    items: PRODUCT_LIST.map((p) => ({ label: p.short, preset: p.key })),
    tile: <Shield size={56} />,
  },
  setores: {
    label: 'Setores',
    items: ['Comércio e varejo', 'Indústria', 'Serviços e agências', 'Saúde e clínicas', 'Tecnologia']
      .map((s) => ({ label: s, preset: '' })),
    tile: <Users size={56} />,
  },
  sobre: {
    label: 'Sobre',
    items: [
      { label: 'Quem somos', href: 'https://sofipe.com.br/' },
      { label: 'Credenciais e LGPD', href: '#confianca' },
      { label: 'Contato', href: '#contato' },
    ],
    tile: <Pin size={56} />,
  },
};

/** Links de âncora simples, usados no desktop e no menu mobile. */
export const ANCHOR_LINKS = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Dúvidas', href: '#faq' },
];
