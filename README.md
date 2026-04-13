# Portfolio Malik Ribeiro Mourad

## 🚀 Visão Geral

Portfolio pessoal de **Malik Ribeiro Mourad**, Analista de Dados na Copel, especializado em Power BI, SQL, Python e desenvolvimento web. O projeto foi migrado de um site estático para uma **Single Page Application (SPA)** moderna construída com React, Vite e Tailwind CSS, com dados dinâmicos gerenciados pelo **Supabase**.

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** — Componentes funcionais com Hooks
- **Vite 4** — Build tool e dev server
- **Tailwind CSS 3** — Estilização utilitária com tema customizado
- **EmailJS** — Envio de formulário de contato sem backend próprio

### Backend / Dados
- **Supabase** — Banco de dados PostgreSQL gerenciado + Storage para imagens
  - `experiences` — Experiências profissionais
  - `projects` — Projetos do portfólio (com suporte a `image_url` via Storage)
  - `education` — Formação acadêmica
  - `certificates` — Certificações e cursos (paginado, filtrável por categoria)

### Infraestrutura
- **GitHub Pages** — Hospedagem
- **GitHub Actions** — Deploy automático via workflow

## ✨ Funcionalidades

- **Typewriter effect** animado na seção Hero
- **Dark/Light mode** com persistência via `localStorage` e detecção da preferência do sistema
- **Dados dinâmicos** via Supabase: Experiências, Projetos, Formação e Certificações
- **Certificações paginadas** com filtro por categoria e botão "Ver mais" (load more)
- **Modal de projetos** com detalhes completos, links GitHub/Demo e suporte a imagens via Supabase Storage (com fallback para emoji)
- **Formulário de contato** integrado ao EmailJS
- **Scroll animations** com `IntersectionObserver`
- **Botão de download do CV** (arquivo `assets/Curriculo.pdf`)
- **ScrollToTop** button flutuante
- **Tela de loading** animada ao iniciar a aplicação

## 📁 Estrutura do Projeto

```
malikribeiro.github.io/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navegação com dark mode toggle
│   │   ├── Hero.jsx            # Seção inicial com typewriter e social links
│   │   ├── About.jsx           # Sobre mim, skills e stats
│   │   ├── Experience.jsx      # Experiências (Supabase) com timeline visual
│   │   ├── Projects.jsx        # Projetos (Supabase) com filtro e modal
│   │   ├── Education.jsx       # Formação (Supabase) + cursos recentes
│   │   ├── Certificates.jsx    # Certificações (Supabase) com paginação
│   │   ├── Contact.jsx         # Formulário (EmailJS) + info de contato
│   │   ├── Footer.jsx          # Rodapé
│   │   └── ScrollToTop.jsx     # Botão voltar ao topo
│   ├── lib/
│   │   └── supabase.js         # Cliente Supabase
│   ├── App.jsx                 # Componente raiz (dark mode, loading state)
│   ├── main.jsx                # Entry point
│   └── index.css               # Estilos globais / Tailwind
├── assets/
│   └── Curriculo.pdf           # CV para download
├── .env                        # Variáveis de ambiente (não versionado)
├── supabase_schema.sql         # Schema completo do banco de dados
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── package.json
```

## 🗄️ Schema do Banco de Dados

O arquivo `supabase_schema.sql` contém o schema completo. As tabelas principais são:

| Tabela | Descrição |
|---|---|
| `experiences` | Experiências profissionais com `sort_order`, `achievements[]`, `technologies[]` |
| `projects` | Projetos com `image_url`, `features[]`, `technologies[]`, `github`, `demo` |
| `education` | Formação acadêmica com `subjects[]`, `status`, `color` |
| `certificates` | Certificações com `category`, `skills[]`, `verification_url`, `credential_id` |

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```env
VITE_SUPABASE_URL=https://<seu-projeto>.supabase.co
VITE_SUPABASE_ANON_KEY=<sua-anon-key>

VITE_EMAILJS_SERVICE_ID=<service-id>
VITE_EMAILJS_TEMPLATE_ID=<template-id>
VITE_EMAILJS_PUBLIC_KEY=<public-key>
```

## 🚀 Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/MalikRibeiro/malikribeiro.github.io.git
cd malikribeiro.github.io

# Instale as dependências
npm install

# Configure as variáveis de ambiente (veja seção acima)
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

### Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção em `/dist` |
| `npm run preview` | Preview do build de produção |

## 🌐 Deploy

O site é hospedado via **GitHub Pages**. O deploy é feito automaticamente via **GitHub Actions** ao fazer push na branch `main`.

O Vite gera o bundle estático em `/dist`, que é publicado pelo workflow `.github/workflows/`.

## 📞 Contato

- **Email**: [malik_ribeiromourad@hotmail.com](mailto:malik_ribeiromourad@hotmail.com)
- **WhatsApp**: [+55 (41) 99834-4388](https://wa.me/5541998344388)
- **LinkedIn**: [linkedin.com/in/malikribeiro](https://www.linkedin.com/in/malikribeiro/)
- **GitHub**: [github.com/MalikRibeiro](https://github.com/MalikRibeiro)
- **Localização**: Curitiba, PR — Brasil

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ por Malik Ribeiro Mourad**  
*Analista de Dados | Power BI, SQL, Python | Desenvolvedor Web*
