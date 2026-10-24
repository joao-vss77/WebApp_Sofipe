import AnnounceBar from '@/components/layout/AnnounceBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';

/** Esqueleto comum a todas as páginas: aviso, cabeçalho, conteúdo, rodapé e chat flutuante. */
export default function MainLayout({ children }) {
  return (
    <>
      <AnnounceBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <div style={{ height: 12 }} />
      <ChatWidget />
    </>
  );
}
