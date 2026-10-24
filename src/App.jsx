import { ChatProvider } from '@/context/ChatContext';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';

export default function App() {
  return (
    <ChatProvider>
      <MainLayout>
        <Home />
      </MainLayout>
    </ChatProvider>
  );
}
