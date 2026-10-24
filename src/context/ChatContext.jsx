import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CONFIG } from '@/config/site';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [req, setReq] = useState(null);

  /** Abre o chat iniciando uma conversa nova (opcionalmente já com um produto escolhido). */
  const openChat = useCallback((preset) => {
    setReq({ preset: preset || undefined, n: Date.now() });
    setOpen(true);
  }, []);

  /** Reabre o chat mantendo a conversa em andamento (launcher e teaser). */
  const resumeChat = useCallback(() => {
    setReq((r) => r || { preset: undefined, n: Date.now() });
    setOpen(true);
  }, []);

  const restartChat = useCallback(() => setReq({ preset: undefined, n: Date.now() }), []);
  const closeChat = useCallback(() => setOpen(false), []);

  // Compatibilidade com integrações externas (GTM, botões fora do React).
  useEffect(() => {
    window.addEventListener('sofi-open', resumeChat);
    window.addEventListener('sofi-restart', restartChat);
    return () => {
      window.removeEventListener('sofi-open', resumeChat);
      window.removeEventListener('sofi-restart', restartChat);
    };
  }, [resumeChat, restartChat]);

  useEffect(() => {
    window.SofiAI = { open: openChat, config: CONFIG };
  }, [openChat]);

  const value = useMemo(
    () => ({ open, req, openChat, resumeChat, restartChat, closeChat }),
    [open, req, openChat, resumeChat, restartChat, closeChat],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat deve ser usado dentro de <ChatProvider>');
  return ctx;
}
