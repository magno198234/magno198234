# FaceAI Studio

App web em React + TypeScript para simulação estética facial para clínicas e dermatologistas.

## Stack
- React + TypeScript
- Tailwind CSS
- Componentes estilo shadcn/ui
- Supabase Auth + DB
- React Router

## Rodando localmente
```bash
npm install
npm run dev
```

## Variáveis de ambiente
Copie `.env.example` para `.env` e preencha:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Banco de dados
Execute o SQL em `supabase/schema.sql` no SQL Editor do Supabase.

## Placeholder de IA
A função `gerarSimulacaoIA(foto, procedimento, ml, intensidade)` está em `src/lib/ia.ts` e atualmente retorna uma URL simulada para facilitar integração futura.
