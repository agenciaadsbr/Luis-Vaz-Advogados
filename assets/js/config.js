/*
 * Configuração da LP Luis Vaz Advogados (Direito Bancário)
 * Edite SOMENTE este arquivo para trocar número de WhatsApp, Pixel etc.
 *
 * A chave abaixo é a chave pública (anon) do Supabase "ADS BR CLIENTES".
 * Ela pode ficar no front-end: as políticas RLS só permitem que o público
 * INSIRA visitas e leads; a leitura exige login no painel.
 */
window.LP_CONFIG = {
  SITE: 'luis-vaz',

  SUPABASE_URL: 'https://qxhnjzyhtllmtdrcyygi.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4aG5qenlodGxsbXRkcmN5eWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMzczNjgsImV4cCI6MjA5NzgxMzM2OH0.DWf4I_x9F--H7ZZHUt_n4V3B__Nlsf1jNZdUV0vNBLU',

  // WhatsApp do escritório: só dígitos, com 55 + DDD. (43) 99138-7447
  WHATSAPP_NUMBER: '5543991387447',

  // Mensagem enviada quando o lead abre o WhatsApp pela página /redirect
  WHATSAPP_MESSAGE: 'Olá! Me chamo {nome} e acabei de preencher o formulário no site. Gostaria de solicitar a análise do meu caso bancário.',

  // ID do Pixel do Meta (deixe vazio para desativar). Ex.: '123456789012345'
  META_PIXEL_ID: '',

  // Segundos até abrir o WhatsApp automaticamente na /redirect
  REDIRECT_SECONDS: 4,

  // Painel /dashboard
  DASHBOARD_TITLE: 'LUIS VAZ ADVOGADOS',
  DASHBOARD_LOGIN_EMAIL: 'admin@luis-vaz.adsbr.internal',
  DASHBOARD_USER: 'Admin',
  WHATSAPP_LEAD_MESSAGE: 'Olá, {nome}. Recebemos seu contato através do site do Dr. Luis Vaz e gostaria de dar continuidade ao seu atendimento.'
};
