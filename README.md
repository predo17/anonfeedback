# FeedbackHub - Sistema de Feedback Anônimo para Times

Sistema moderno e intuitivo para coleta de feedback anônimo de equipes, permitindo que colaboradores compartilhem suas opiniões de forma segura e confidencial sobre diferentes aspectos do ambiente de trabalho.

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Banco de Dados](#-estrutura-do-banco-de-dados)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Desenvolvimento](#-desenvolvimento)

## ✨ Características

- **Feedback Anônimo**: Sistema totalmente anônimo para garantir privacidade dos colaboradores
- **Categorização**: Organização de feedbacks por categorias (Comunicação, Liderança, Processos, Ambiente)
- **Sistema de Avaliação**: Avaliação por estrelas (1 a 5 estrelas)
- **Dashboard Administrativo**: Painel completo com métricas e análises
- **Filtros Avançados**: Filtragem por categoria, avaliação e ordenação
- **Interface Moderna**: Design responsivo com suporte a tema claro/escuro
- **Validação de Formulários**: Validação robusta com Zod e React Hook Form
- **Notificações**: Sistema de notificações toast para feedback ao usuário

## 🛠 Tecnologias

### Frontend
- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9.3** - Superset JavaScript com tipagem estática
- **Vite 7.2.4** - Build tool e dev server moderno
- **Tailwind CSS 4.1.18** - Framework CSS utility-first
- **React Router DOM 7.11.0** - Roteamento para aplicações React

### Bibliotecas de UI
- **Radix UI** - Componentes acessíveis e sem estilo
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-label`
  - `@radix-ui/react-select`
  - `@radix-ui/react-slot`
- **Lucide React 0.562.0** - Biblioteca de ícones
- **Sonner 2.0.7** - Sistema de notificações toast
- **next-themes 0.4.6** - Gerenciamento de temas

### Validação e Formulários
- **React Hook Form 7.70.0** - Gerenciamento de formulários
- **Zod 4.3.5** - Validação de schemas TypeScript-first
- **@hookform/resolvers 5.2.2** - Resolvers para React Hook Form

### Backend/Database
- **Supabase 2.90.0** - Backend as a Service (BaaS)
  - PostgreSQL como banco de dados
  - API REST automática
  - Autenticação e segurança

### Utilitários
- **class-variance-authority 0.7.1** - Gerenciamento de variantes de classes
- **clsx 2.1.1** - Utilitário para construção de classes CSS
- **tailwind-merge 3.4.0** - Merge inteligente de classes Tailwind

## 📁 Estrutura do Projeto

```
anonfeedback/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/        # Componentes React
│   │   ├── feedback/      # Componentes relacionados a feedback
│   │   │   ├── FeedbackForm.tsx
│   │   │   ├── FeedbackTable.tsx
│   │   │   ├── FeedbackMetrics.tsx
│   │   │   ├── FeedbackDetailsDialog.tsx
│   │   │   └── index.ts
│   │   ├── layout/        # Componentes de layout
│   │   │   └── Header.tsx
│   │   └── ui/            # Componentes UI reutilizáveis
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── sonner.tsx
│   │       ├── table.tsx
│   │       └── textarea.tsx
│   ├── hooks/             # Custom hooks
│   │   ├── useFeedback.ts
│   │   └── useDebounce.ts
│   ├── pages/             # Páginas da aplicação
│   │   ├── Home.tsx
│   │   └── Admin.tsx
│   ├── schemas/           # Schemas de validação
│   │   └── feedback.schema.ts
│   ├── services/          # Serviços e APIs
│   │   ├── feedback.service.ts
│   │   └── http.ts
│   ├── types/             # Definições de tipos TypeScript
│   │   └── feedback.ts
│   ├── utils/             # Funções utilitárias
│   │   ├── categoryLabels.ts
│   │   └── formatDate.ts
│   ├── lib/               # Bibliotecas e configurações
│   │   └── utils.ts
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Ponto de entrada
│   └── index.css          # Estilos globais
├── supabase/
│   ├── migrations/        # Migrações do banco de dados
│   │   └── 20260108142409_setup_database_schema.sql
│   └── config.toml        # Configuração do Supabase
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** ou **pnpm**
- Conta no **Supabase** (para o banco de dados)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/predo17/anonfeedback.git
cd anonfeedback
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

**Como obter as credenciais do Supabase:**

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto ou acesse um existente
3. Vá em **Settings** > **API**
4. Copie a **URL** e a **anon/public key**

### Configuração do Banco de Dados

Execute a migração SQL no Supabase:

1. Acesse o SQL Editor no painel do Supabase
2. Execute o script em `supabase/migrations/20260108142409_setup_database_schema.sql`

Ou use a CLI do Supabase:
```bash
supabase db push
```

## 🎯 Uso

### Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada).

### Build para Produção

Gere a build de produção:

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`.

### Preview da Build

Visualize a build de produção localmente:

```bash
npm run preview
```

## 🎨 Funcionalidades

### Página Inicial (`/`)

- **Formulário de Feedback**: Permite que usuários enviem feedback anônimo
  - Seleção de categoria (Comunicação, Liderança, Processos, Ambiente)
  - Sistema de avaliação por estrelas (1-5)
  - Campo de comentário (opcional, mas recomendado)
  - Validação em tempo real

### Dashboard Administrativo (`/admin`)

- **Métricas Gerais**:
  - Total de feedbacks recebidos
  - Avaliação média geral
  - Melhor categoria avaliada
  - Número de categorias ativas

- **Métricas por Categoria**:
  - Média de avaliação por categoria
  - Quantidade de feedbacks por categoria

- **Tabela de Feedbacks**:
  - Listagem completa de todos os feedbacks
  - Filtros por categoria e avaliação
  - Ordenação por data ou avaliação
  - Visualização de detalhes completos em modal
  - Formatação de datas relativas (ex: "há 2 dias")

### Categorias de Feedback

1. **Comunicação** - Feedback sobre comunicação interna e externa
2. **Liderança** - Avaliação sobre liderança e gestão
3. **Processos** - Opiniões sobre processos e fluxos de trabalho
4. **Ambiente** - Feedback sobre ambiente de trabalho e cultura

## 🗄 Estrutura do Banco de Dados

### Tabela: `feedbacks`

```sql
CREATE TABLE feedbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('comunicacao', 'lideranca', 'processos', 'ambiente')),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text DEFAULT '',
  created_at timestamptz DEFAULT now()
);
```

**Campos:**
- `id`: UUID único gerado automaticamente
- `category`: Categoria do feedback (enum)
- `rating`: Avaliação de 1 a 5 estrelas
- `comment`: Comentário opcional do usuário
- `created_at`: Timestamp de criação

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter ESLint

## 🔧 Desenvolvimento

### Componentes Principais

#### FeedbackForm
Componente de formulário com validação usando React Hook Form e Zod. Inclui:
- Seleção de categoria via Select
- Sistema de avaliação visual com estrelas
- Campo de texto para comentários
- Estados de loading e feedback visual

#### FeedbackTable
Tabela responsiva com:
- Filtros dinâmicos
- Ordenação customizável
- Paginação visual
- Modal de detalhes

#### FeedbackMetrics
Dashboard de métricas com:
- Cards informativos
- Cálculos em tempo real
- Visualização por categoria

### Hooks Customizados

- `useFeedbacks`: Gerencia a busca e filtragem de feedbacks
- `useFeedbackMetrics`: Calcula e retorna métricas agregadas
- `useDebounce`: Utilitário para debounce de valores

### Validação

O schema de validação (`feedback.schema.ts`) garante:
- Categoria obrigatória e válida
- Rating entre 1 e 5
- Comentário opcional, mas se fornecido deve ter entre 5 e 1000 caracteres

### Estilização

- **Tailwind CSS 4**: Sistema de design utility-first
- **Tema Claro/Escuro**: Suporte nativo via next-themes
- **Design System**: Componentes baseados em Radix UI
- **Responsividade**: Mobile-first design
