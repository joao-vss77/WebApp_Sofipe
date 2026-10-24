# Sofipe: landing page React

Vite + React 18 + Tailwind CSS 3.4, mobile-first.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção (pasta dist/)
npm run preview  # testar o build
```

## Estrutura

```
src/
├─ main.jsx · App.jsx        entrada e composição de providers
├─ index.css                 diretivas do Tailwind
├─ layouts/                  MainLayout (aviso + header + conteúdo + footer + chat)
├─ pages/                    Home (só compõe as seções)
├─ components/
│  ├─ ui/                    reutilizáveis: Icons, Logo, ProductGlyphs
│  ├─ layout/                Header, DesktopNav, MegaMenu, MobileMenu, Footer, AnnounceBar
│  ├─ sections/              Hero, Intro, Featured*, HowItWorks, Trust, Testimonials, Faq
│  └─ chat/                  ChatWidget, Chat, TextControl, ResultCard
├─ hooks/                    useMedia, useScrolled, useLockBodyScroll, useChatFlow
├─ context/                  ChatContext (estado do chat e useChat)
├─ services/                 leads.js (classificação, payload, envio ao webhook)
├─ config/                   site.js (CONFIG, URL da logo)
├─ data/                     produtos, opções do chat, FAQ e depoimentos
├─ utils/                    validadores, formatadores, motion, uid
├─ styles/                   tokens, base, buttons, layout, sections, chat
└─ assets/                   imagens locais (vazio: a logo vem do site)
```

## Configuração

Edite `src/config/site.js`: `webhookUrl` e `newsletterUrl` (vazios = modo demonstração),
WhatsApp, telefones e regras de pontuação. A URL da logo também fica ali (`LOGO_URL`).
