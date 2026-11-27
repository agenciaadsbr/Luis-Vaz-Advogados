# LP Luis Vaz Advogados — Direito Bancário

Site estático (HTML/CSS/JS puro, sem build) publicado na Vercel. Mesmo padrão das demais LPs ADS BR.

| Rota | Arquivo | O que faz |
|---|---|---|
| `/` | `index.html` | Landing page. Registra 1 visita por carregamento e salva o lead do formulário |
| `/redirect` | `redirect.html` | Página de obrigado. Dispara o evento `Lead` do Pixel (se configurado) e abre o WhatsApp após 4 s |
| `/dashboard` | `dashboard.html` | Painel de leads com login (Supabase Auth + RLS) |

## Configuração — edite só `assets/js/config.js`

- `WHATSAPP_NUMBER` — `5543991387447` (43) 99138-7447.
- `META_PIXEL_ID` — opcional. Com ele preenchido, a LP envia `PageView` e a /redirect envia `Lead`.
- `REDIRECT_SECONDS` — segundos até abrir o WhatsApp (padrão 4).
- `SITE` (`luis-vaz`), `SUPABASE_URL` e `SUPABASE_ANON_KEY` apontam para o projeto **ADS BR CLIENTES** (`qxhnjzyhtllmtdrcyygi`). A anon key é pública por natureza: o RLS só deixa o público **inserir** em `lp_visits`/`lp_leads`; ler exige login.

## Dados (Supabase)

- Tabelas: `lp_visits` (site, path, referrer) e `lp_leads` (site, nome, whatsapp, origem).
- O formulário só vai para `/redirect` depois que o Supabase confirma a gravação do lead. Se falhar, mostra erro e permite tentar de novo (na 2ª falha oferece o WhatsApp direto).
- `origem` do lead: `utm_source / utm_medium / utm_campaign` → `meta` (fbclid) → `google` (gclid) → domínio de referência → `direto`.
- Login do painel: usuário `Admin` (mapeado para `admin@luis-vaz.adsbr.internal`, com acesso só ao site `luis-vaz` via `lp_acessos`). A senha não fica neste repositório.

## Âncoras para anúncios

`/#revisional`, `/#busca-e-apreensao`, `/#fraudes`, `/#criterios`, `/#form`.

Conteúdo em conformidade com o Provimento 205/2021 da OAB: sem promessa de resultado.
