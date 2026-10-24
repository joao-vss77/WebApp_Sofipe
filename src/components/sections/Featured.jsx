import { useMedia } from '@/hooks/useMedia';
import FeaturedMobile from './FeaturedMobile';
import FeaturedDesktop from './FeaturedDesktop';

/** Lista de produtos: cartões empilhados no mobile; painel com rolagem "pinada" no desktop. */
export default function Featured() {
  const wide = useMedia('(min-width:900px)');
  return wide ? <FeaturedDesktop /> : <FeaturedMobile />;
}
