create table if not exists public.users (
  id uuid primary key,
  nome text not null,
  email text unique not null,
  tipo text check (tipo in ('paciente', 'clinica')) not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.simulacoes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  procedimento text not null,
  quantidade_ml numeric(4,1) not null,
  intensidade text not null,
  foto_original_url text not null,
  foto_resultado_url text not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.clinica_pacientes (
  clinica_id uuid references public.users(id) on delete cascade,
  paciente_id uuid references public.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  primary key (clinica_id, paciente_id)
);
