-- ============================================================
-- SUPABASE SCHEMA — Portfólio de Malik Ribeiro Mourad
-- Execute este script no SQL Editor do seu projeto Supabase
-- ============================================================

-- ============================================================
-- TABELA: projects
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id            SERIAL PRIMARY KEY,
    title         TEXT        NOT NULL,
    category      TEXT        NOT NULL,
    description   TEXT        NOT NULL,
    image         TEXT        NOT NULL DEFAULT '🚀',
    technologies  TEXT[]      NOT NULL DEFAULT '{}',
    features      TEXT[]      NOT NULL DEFAULT '{}',
    status        TEXT        NOT NULL DEFAULT 'Concluído',
    year          TEXT        NOT NULL,
    client        TEXT,
    github        TEXT,
    demo          TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: experiences
-- ============================================================
CREATE TABLE IF NOT EXISTS public.experiences (
    id            SERIAL PRIMARY KEY,
    title         TEXT        NOT NULL,
    company       TEXT        NOT NULL,
    period        TEXT        NOT NULL,
    location      TEXT        NOT NULL,
    type          TEXT        NOT NULL,
    description   TEXT        NOT NULL,
    achievements  TEXT[]      NOT NULL DEFAULT '{}',
    technologies  TEXT[]      NOT NULL DEFAULT '{}',
    logo          TEXT        NOT NULL DEFAULT '💼',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- DADOS INICIAIS — projects
-- ============================================================
INSERT INTO public.projects (title, category, description, image, technologies, features, status, year, client, github, demo) VALUES
(
    'Dashboard Copel Solar',
    'powerbi',
    'Dashboard completo para monitoramento de performance de sistemas fotovoltaicos, incluindo análise de geração, economia e sustentabilidade.',
    '🌞',
    ARRAY['Power BI', 'DAX', 'Power Query', 'SQL'],
    ARRAY['Monitoramento em tempo real de geração de energia', 'Análise de economia financeira por cliente', 'Relatórios de sustentabilidade e CO2 evitado', 'Comparativo de performance entre sistemas'],
    'Concluído', '2022', 'Copel', NULL, NULL
),
(
    'Automação de Relatórios CCEE',
    'python',
    'Estruturação completa e automação da leitura de dados extraídos da CCEE, substituindo fluxos manuais em Excel e otimizando o processo e a visualização em 200%.',
    '⚡',
    ARRAY['Python', 'Pandas', 'Openpyxl', 'SQL Server', 'SMTP'],
    ARRAY['Extração e processamento automático de dados da CCEE', 'Geração de relatórios com melhoria visual', 'Otimização de 200% na eficiência do processo', 'Envio automatizado de resultados'],
    'Concluído', '2025', 'Electra', NULL, NULL
),
(
    'Dashboard de Contratos de Energia',
    'powerbi',
    'Dashboard interativo para acompanhamento de contratos de energia com KPIs, metas e análise de performance por analista e submercado.',
    '📈',
    ARRAY['Power BI', 'DAX', 'Power Query', 'SharePoint'],
    ARRAY['KPIs de contratos em tempo real', 'Análise de performance por analista', 'Comparativo de dados da Carteira da empresa', 'Drill-down detalhado por contrato'],
    'Concluído', '2025', 'Electra', NULL, NULL
),
(
    'Monitoramento de Economia de Varejistas',
    'powerbi',
    'Dashboard gerencial focado no acompanhamento de economia e performance de clientes varejistas.',
    '📦',
    ARRAY['Power BI', 'DAX', 'Power Query', 'SharePoint'],
    ARRAY['Monitoramento em tempo real de economia gerada', 'Comparativo de preços e tarifas', 'Análise de performance por cliente'],
    'Concluído', '2025', 'Electra', NULL, NULL
),
(
    'Script de Higienização de Dados',
    'python',
    'Desenvolvimento de script especializado para limpeza, padronização e tratamento de dados brutos extraídos da CCEE.',
    '🧹',
    ARRAY['Python', 'Pandas', 'Openpyxl'],
    ARRAY['Limpeza automatizada de grandes volumes de dados', 'Padronização de formatação para inserção em banco', 'Tratamento de exceções e dados nulos'],
    'Concluído', '2025', 'Electra', NULL, NULL
),
(
    'Automação de Log de Erros SAP',
    'python',
    'Sistema de monitoramento que realiza a leitura de logs de erro do SAP e dispara alertas automatizados por email com resumos estruturados.',
    '📧',
    ARRAY['Python', 'SMTP', 'Schedule', 'Jinja2'],
    ARRAY['Agendamento de varreduras de log', 'Templates de email dinâmicos', 'Listas de distribuição por tipo de erro', 'Monitoramento contínuo'],
    'Concluído', '2025', 'Electra', 'https://github.com/MalikRibeiro/Log-Email', NULL
),
(
    '100HYPE - Gestão com IA',
    'python',
    'Plataforma pessoal para gestão avançada de investimentos utilizando Inteligência Artificial para análise de mercado.',
    '🧠',
    ARRAY['Python', 'Pandas', 'Scikit-Learn', 'APIs Financeiras'],
    ARRAY['Análise preditiva de ativos', 'Automação de coleta de indicadores', 'Gestão automatizada de portfólio', 'Integração com modelos de IA'],
    'Concluído', '2025', 'Projeto Pessoal', 'https://github.com/MalikRibeiro/100HYPE', NULL
),
(
    'InvestAI',
    'web',
    'Aplicação web voltada para recomendação e análise de carteiras de investimentos baseada em algoritmos inteligentes.',
    '💹',
    ARRAY['React', 'Python', 'FastAPI', 'Pandas'],
    ARRAY['Interface web interativa', 'Recomendações baseadas em dados', 'Visualização de rentabilidade', 'Alertas de mercado'],
    'Concluído', '2025', 'Projeto Pessoal', 'https://github.com/MalikRibeiro/InvestAI-Email', NULL
),
(
    'Analisador de Processos com IA',
    'python',
    'Ferramenta corporativa que utiliza IA para mapear gargalos operacionais e sugerir otimizações em fluxos de trabalho.',
    '⚙️',
    ARRAY['Python', 'LLMs', 'Pandas', 'Process Mining'],
    ARRAY['Mapeamento de fluxos operacionais', 'Identificação de ineficiências', 'Geração de relatórios de melhoria contínua'],
    'Concluído', '2025', 'Projeto Pessoal', 'https://github.com/MalikRibeiro/Analisador-de-Processos-Corporativos-com-IA', NULL
),
(
    'MouseMacro Pro',
    'python',
    'Software de automação RPA (Robotic Process Automation) com versões Desktop e Extensão para Chrome, focado em gravação e reprodução de rotinas web.',
    '🖱️',
    ARRAY['Python', 'PyAutoGUI', 'Selenium', 'JavaScript'],
    ARRAY['Gravação de macros em tempo real', 'Execução em background', 'Versão nativa Desktop', 'Extensão integrada ao navegador Chrome'],
    'Concluído', '2025', 'Projeto Pessoal', 'https://github.com/MalikRibeiro/MouseMacro-Desktop-PRO', NULL
),
(
    'SaaS para Gestão de APIs',
    'web',
    'Plataforma SaaS desenvolvida para simplificar a orquestração, monitoramento e consumo de múltiplas APIs em um único painel.',
    '🔌',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Docker'],
    ARRAY['Dashboard centralizado de endpoints', 'Monitoramento de uptime e latência', 'Gestão de chaves de autenticação', 'Analytics de consumo'],
    'Concluído', '2025', 'Projeto Pessoal', NULL, NULL
),
(
    'Portfólio Pessoal Dinâmico',
    'web',
    'Desenvolvimento do meu próprio portfólio web utilizando arquitetura moderna, com integração de dados via Supabase e envio de emails automatizado.',
    '🌐',
    ARRAY['React', 'Tailwind CSS', 'Vite', 'Supabase'],
    ARRAY['Consumo de banco de dados relacional', 'Formulário de contato integrado via API', 'Design responsivo e Dark Mode'],
    'Concluído', '2025', 'Projeto Pessoal', 'https://github.com/MalikRibeiro/portfolio', 'https://malikribeiro.github.io'
);

-- ============================================================
-- DADOS INICIAIS — experiences (CORRIGIDOS)
-- ============================================================
INSERT INTO public.experiences (title, company, period, location, type, description, achievements, technologies, logo) VALUES
(
    'Assistente de Comercialização',
    'Electra Energy',
    '2025 - Presente',
    'Curitiba, PR',
    'Tempo Integral',
    'Atuo na área de comercialização de energia integrando visão de negócios com automação tecnológica. Sou responsável pelo desenvolvimento de painéis em Power BI e criação de rotinas automatizadas em Python para otimização do setor.',
    ARRAY[
        'Liderança na automação de relatórios da CCEE, substituindo processos em Excel por Python e gerando 200% de melhoria na eficiência e visualização',
        'Desenvolvimento de dashboards estratégicos em Power BI para acompanhamento de contratos e economia de clientes',
        'Criação de scripts para integração e limpeza de dados complexos do mercado de energia',
        'Implementação de sistemas de alerta automatizados via leitura de logs do SAP'
    ],
    ARRAY['Python', 'Power BI', 'SQL Server', 'Pandas', 'DAX'],
    '⚡'
),
(
    'Auxiliar de Comercialização',
    'Electra Energy',
    '2025 - 2025',
    'Curitiba, PR',
    'Tempo Integral',
    'Atuação no suporte às rotinas operacionais de comercialização de energia, com foco em gestão de dados e introdução de melhorias processuais.',
    ARRAY[
        'Auxílio na estruturação de bases de dados para os primeiros dashboards da área',
        'Mapeamento de rotinas manuais passíveis de automação (RPA)',
        'Suporte no acompanhamento de KPIs da carteira de clientes e varejistas'
    ],
    ARRAY['Excel Avançado', 'Power BI', 'SQL Básico'],
    '📊'
),
(
    'Estagiário de TI',
    'Copel Comercialização',
    '2024 - 2025',
    'Curitiba, PR',
    'Estágio',
    'Atuação focada no desenvolvimento de soluções de Business Intelligence e automações iniciais para o setor, com forte ênfase em análise de dados.',
    ARRAY[
        'Desenvolvimento de mais de 20 dashboards em Power BI para diferentes áreas da empresa',
        'Implementação de automações em Python que reduziram 70% do tempo de processamento de dados',
        'Criação de relatórios gerenciais para suporte estratégico'
    ],
    ARRAY['Power BI', 'Python', 'SQL Server', 'Excel'],
    '💻'
),
(
    'Estagiário de Projetos',
    'Copel Comercialização',
    '2023 - 2024',
    'Curitiba, PR',
    'Estágio',
    'Contribuição no projeto Copel Solar e atuação no front administrativo, focando na análise de dados de energia solar e suporte à equipe de vendas.',
    ARRAY[
        'Análise de dados de geração de energia solar de mais de 1000 clientes',
        'Organização e digitalização de mais de 5000 documentos comerciais',
        'Desenvolvimento de relatórios de economia e sustentabilidade'
    ],
    ARRAY['Excel', 'Word', 'Power Query'],
    '☀️'
);

-- ============================================================
-- PERMISSÕES (Row Level Security)
-- Habilite RLS e crie políticas de leitura pública
-- ============================================================
ALTER TABLE public.projects    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública (anon key)
CREATE POLICY "Allow public read on projects"
    ON public.projects FOR SELECT
    USING (true);

CREATE POLICY "Allow public read on experiences"
    ON public.experiences FOR SELECT
    USING (true);

-- ============================================================
-- EVOLUÇÃO: sort_order em experiences + image_url em projects
-- Execute este bloco se as tabelas já existirem no Supabase
-- ============================================================
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS sort_order INT NOT NULL DEFAULT 0;
ALTER TABLE public.projects    ADD COLUMN IF NOT EXISTS image_url  TEXT;

-- Definir sort_order das experiências (maior = mais recente = exibido primeiro)
UPDATE public.experiences SET sort_order = 4 WHERE title = 'Assistente de Comercialização' AND company = 'Electra Energy';
UPDATE public.experiences SET sort_order = 3 WHERE title = 'Auxiliar de Comercialização'   AND company = 'Electra Energy';
UPDATE public.experiences SET sort_order = 2 WHERE title = 'Estagiário de TI'              AND company = 'Copel Comercialização';
UPDATE public.experiences SET sort_order = 1 WHERE title = 'Estagiário de Projetos'        AND company = 'Copel Comercialização';

-- ============================================================
-- TABELA: education
-- ============================================================
CREATE TABLE IF NOT EXISTS public.education (
    id          SERIAL PRIMARY KEY,
    degree      TEXT        NOT NULL,
    institution TEXT        NOT NULL,
    period      TEXT        NOT NULL,
    status      TEXT        NOT NULL DEFAULT 'Concluído',
    description TEXT        NOT NULL DEFAULT '',
    subjects    TEXT[]      NOT NULL DEFAULT '{}',
    logo        TEXT        NOT NULL DEFAULT '🎓',
    color       TEXT        NOT NULL DEFAULT 'from-blue-500 to-purple-600',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on education"
    ON public.education FOR SELECT
    USING (true);

INSERT INTO public.education (degree, institution, period, status, description, subjects, logo, color) VALUES
(
    'Análise e Desenvolvimento de Sistemas',
    'Universidade Positivo',
    '2024 - 2025',
    'Concluído',
    'Curso superior focado em desenvolvimento de software, análise de sistemas, banco de dados e metodologias ágeis.',
    ARRAY['Programação Orientada a Objetos', 'Banco de Dados', 'Desenvolvimento Web', 'Engenharia de Software', 'Estruturas de Dados', 'Redes de Computadores'],
    '🎓',
    'from-blue-500 to-purple-600'
),
(
    'Administração de Empresas',
    'FAE Centro Universitário',
    '2020 - 2023',
    'Concluído',
    'Graduação em Administração com foco em gestão empresarial, finanças e estratégia organizacional.',
    ARRAY['Gestão Estratégica', 'Finanças Corporativas', 'Marketing', 'Recursos Humanos', 'Contabilidade', 'Empreendedorismo'],
    '📊',
    'from-green-500 to-teal-600'
);

-- ============================================================
-- TABELA: certificates
-- ============================================================
CREATE TABLE IF NOT EXISTS public.certificates (
    id               SERIAL PRIMARY KEY,
    title            TEXT        NOT NULL,
    issuer           TEXT        NOT NULL,
    category         TEXT        NOT NULL DEFAULT 'other',
    date             TEXT        NOT NULL,
    duration         TEXT,
    credential_id    TEXT,
    verification_url TEXT,
    description      TEXT        NOT NULL DEFAULT '',
    skills           TEXT[]      NOT NULL DEFAULT '{}',
    badge            TEXT        NOT NULL DEFAULT '🏆',
    color            TEXT        NOT NULL DEFAULT 'from-primary-400 to-secondary-500',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on certificates"
    ON public.certificates FOR SELECT
    USING (true);

INSERT INTO public.certificates (title, issuer, category, date, duration, credential_id, verification_url, description, skills, badge, color) VALUES

-- 2026
(
    'Claude 101',
    'Anthropic',
    'ai',
    'mar 2026',
    NULL,
    NULL,
    NULL,
    'Curso oficial da Anthropic sobre fundamentos e uso avançado do Claude.',
    ARRAY['Claude', 'IA Generativa', 'Prompting', 'LLMs'],
    '🤖',
    'from-orange-400 to-red-500'
),
(
    'Lógica de programação: praticando com desafios',
    'Alura',
    'programming',
    'jan 2026',
    NULL,
    'be032523-29f5-4a2e-8f02-474a394d74c4',
    'https://cursos.alura.com.br/certificate/be032523-29f5-4a2e-8f02-474a394d74c4',
    'Prática de lógica de programação por meio de desafios progressivos com JavaScript.',
    ARRAY['JavaScript', 'Lógica de Programação', 'Algoritmos'],
    '🧩',
    'from-yellow-400 to-orange-500'
),
(
    'RPA: automatize processos com ferramentas No/Low Code',
    'Alura',
    'programming',
    'jan 2026',
    NULL,
    '92acad9e-d1b8-46dc-b10c-983fd01e263d',
    'https://cursos.alura.com.br/certificate/92acad9e-d1b8-46dc-b10c-983fd01e263d',
    'Automação de processos com ferramentas No/Low Code, modelagem BPMN e gestão de projetos de automação.',
    ARRAY['RPA', 'Zapier', 'Trello', 'BPMN', 'Automação'],
    '⚙️',
    'from-blue-400 to-indigo-500'
),

-- 2025
(
    'Automação: criando fluxos integrados com n8n',
    'Alura',
    'programming',
    'nov 2025',
    NULL,
    'befe4e64-27c9-4672-9571-d34f673ca2ed',
    'https://cursos.alura.com.br/certificate/befe4e64-27c9-4672-9571-d34f673ca2ed',
    'Criação de fluxos de automação integrados utilizando a plataforma n8n.',
    ARRAY['n8n', 'Automação', 'Integração de Sistemas', 'Workflows'],
    '🔄',
    'from-green-400 to-teal-500'
),
(
    'Streamlit: construindo um dashboard interativo',
    'Alura',
    'data',
    'nov 2025',
    NULL,
    '8c8445ef-fef6-4d48-8850-1abf65fa08b9',
    'https://cursos.alura.com.br/certificate/8c8445ef-fef6-4d48-8850-1abf65fa08b9',
    'Desenvolvimento de dashboards interativos com Python e Streamlit.',
    ARRAY['Streamlit', 'Python', 'Dashboards', 'Data Visualization'],
    '📊',
    'from-red-400 to-pink-500'
),
(
    'UiPath: automatize processos e manipule dados',
    'Alura',
    'programming',
    'ago 2025',
    NULL,
    '5a5822b0-7d9c-4e91-9532-a71290b8b371',
    'https://cursos.alura.com.br/certificate/5a5822b0-7d9c-4e91-9532-a71290b8b371',
    'Automação de processos com UiPath, incluindo interação web, manipulação de planilhas, Orchestrator e Clipboard AI.',
    ARRAY['UiPath', 'RPA', 'Orchestrator', 'Excel', 'Automação'],
    '🤖',
    'from-orange-500 to-red-600'
),
(
    'Power BI: criando relatórios com auxílio de IA',
    'Alura',
    'data',
    'ago 2025',
    NULL,
    '92ec8605-976f-4252-9585-7741909cfc5b',
    'https://cursos.alura.com.br/certificate/92ec8605-976f-4252-9585-7741909cfc5b',
    'Criação de relatórios avançados no Power BI com recursos de Inteligência Artificial.',
    ARRAY['Power BI', 'IA', 'Relatórios', 'DAX'],
    '📈',
    'from-yellow-500 to-orange-600'
),
(
    'Cursos base para as liquidações da CCEE',
    'CCEE',
    'energy',
    'jul 2025',
    NULL,
    '3B814965094BDF2A',
    NULL,
    'Formação base sobre liquidações da CCEE: garantia física, contratos, PLD, medição e estudos por liquidação.',
    ARRAY['PLD', 'CCEE', 'Mercado de Energia', 'Liquidações', 'Garantia Física'],
    '⚡',
    'from-blue-500 to-cyan-600'
),
(
    'Python e Gemini: crie seu chatbot com IA generativa',
    'Alura',
    'ai',
    'jun 2025',
    NULL,
    '74f4da35-6e89-4a61-91dc-9ca378f3c1e0',
    'https://cursos.alura.com.br/certificate/74f4da35-6e89-4a61-91dc-9ca378f3c1e0',
    'Desenvolvimento de chatbot com IA generativa usando Python, Flask e Gemini API, com gestão de histórico e envio de imagens.',
    ARRAY['Python', 'Gemini API', 'Flask', 'IA Generativa', 'Chatbot'],
    '🧠',
    'from-blue-400 to-purple-500'
),
(
    'Python com IAs: acelerando a produtividade em data science',
    'Alura',
    'ai',
    'jun 2025',
    NULL,
    '35898b05-13fa-42c7-805b-359573dc5f3d',
    'https://cursos.alura.com.br/certificate/35898b05-13fa-42c7-805b-359573dc5f3d',
    'Aplicação de IAs para acelerar análise e manipulação de dados em data science com Python e Pandas.',
    ARRAY['Python', 'Pandas', 'Data Science', 'IA'],
    '🐍',
    'from-green-400 to-blue-500'
),
(
    'ChatGPT: otimizando a qualidade dos resultados',
    'Alura',
    'ai',
    'jun 2025',
    NULL,
    '829c4244-b073-4470-b253-f4cd2a23ddf9',
    'https://cursos.alura.com.br/certificate/829c4244-b073-4470-b253-f4cd2a23ddf9',
    'Técnicas avançadas de prompting para otimizar resultados com ChatGPT no contexto profissional.',
    ARRAY['ChatGPT', 'Prompting', 'IA Generativa', 'Produtividade'],
    '💬',
    'from-teal-400 to-green-500'
),

-- 2025 (início)
(
    'Curso de Looker Data Studio - do básico ao avançado!',
    'Udemy',
    'data',
    'fev 2025',
    NULL,
    'UC-74b2d3b9-3a05-4eee-beb8-d178ecfb9fa2',
    'https://www.udemy.com/certificate/UC-74b2d3b9-3a05-4eee-beb8-d178ecfb9fa2/',
    'Curso completo de Looker Data Studio abrangendo desde fundamentos até recursos avançados de visualização.',
    ARRAY['Looker Studio', 'Google Data Studio', 'Visualização de Dados', 'Dashboards'],
    '🔍',
    'from-blue-400 to-cyan-500'
),

-- 2024
(
    'Web Hacking - Técnicas de Invasão em Ambientes Web [Pentest]',
    'Udemy',
    'security',
    'nov 2024',
    NULL,
    'UC-caa0ad4f-df28-42f1-aa41-45cf8a87dc71',
    'https://www.udemy.com/certificate/UC-caa0ad4f-df28-42f1-aa41-45cf8a87dc71/',
    'Técnicas de hacking ético e pentest em ambientes web com Google Dorks e Kali Linux.',
    ARRAY['Pentest', 'Web Hacking', 'Google Dorks', 'Kali Linux', 'Segurança'],
    '🔐',
    'from-gray-700 to-red-700'
),
(
    'Treinamento Perfil Desenvolvedor, Engenheiro de Dados, Cientista de Dados',
    'Atos',
    'data',
    'ago 2024',
    NULL,
    NULL,
    NULL,
    'Treinamento abrangendo Kubernetes, Python, Jupyter, Engenharia de Dados, Spark, PySpark, Airflow, Pandas, H2O e MLOps.',
    ARRAY['Python', 'Jupyter', 'PySpark', 'Airflow', 'Pandas', 'MLOps', 'Kubernetes'],
    '🏗️',
    'from-indigo-500 to-blue-600'
),
(
    'SQL para Análise de Dados: do Básico ao Avançado! (2024)',
    'Udemy',
    'data',
    'ago 2024',
    NULL,
    'UC-570f0d15-5eb8-4e89-802e-e9b3d4bcf3c6',
    'https://www.udemy.com/certificate/UC-570f0d15-5eb8-4e89-802e-e9b3d4bcf3c6/',
    'Curso completo de SQL para análise de dados com aplicações práticas do básico ao avançado.',
    ARRAY['SQL', 'Análise de Dados', 'Banco de Dados', 'Queries'],
    '🗄️',
    'from-blue-500 to-indigo-600'
),
(
    'Manipulação e Análise de dados com Pandas - Python',
    'Udemy',
    'data',
    'ago 2024',
    NULL,
    'UC-1428d05c-5cb4-4203-9be5-872b12b15bef',
    'https://www.udemy.com/certificate/UC-1428d05c-5cb4-4203-9be5-872b12b15bef/',
    'Manipulação e análise de datasets com a biblioteca Pandas no Python.',
    ARRAY['Pandas', 'Python', 'Análise de Dados', 'Data Wrangling'],
    '🐼',
    'from-green-500 to-teal-600'
),
(
    'Power BI Completo - Do Básico ao Avançado',
    'Udemy',
    'data',
    'ago 2024',
    NULL,
    'UC-95933cd5-9ff1-444b-9bf3-e7fc545a6a1e',
    'https://www.udemy.com/certificate/UC-95933cd5-9ff1-444b-9bf3-e7fc545a6a1e/',
    'Treinamento completo de Power BI cobrindo DAX avançado, Power Query e modelagem de dados.',
    ARRAY['Power BI', 'DAX', 'Power Query', 'Modelagem de Dados'],
    '⚡',
    'from-purple-500 to-pink-600'
),
(
    'Analyze data with Power BI',
    'Microsoft',
    'data',
    'jul 2024',
    NULL,
    NULL,
    NULL,
    'Certificação Microsoft focada em análise de dados com Power BI, incluindo ETL e transformação de dados.',
    ARRAY['Power BI', 'ETL', 'Análise de Dados', 'Microsoft'],
    '📊',
    'from-yellow-400 to-orange-500'
),
(
    'Introdução à análise de dados da Microsoft',
    'Microsoft',
    'data',
    'jul 2024',
    NULL,
    NULL,
    NULL,
    'Certificação introdutória da Microsoft em análise de dados com Power BI.',
    ARRAY['Microsoft Power BI', 'Análise de Dados', 'Visualização'],
    '📈',
    'from-yellow-500 to-amber-600'
),
(
    'Power BI + SQLServer + Figma',
    'Udemy',
    'data',
    'jul 2024',
    NULL,
    'UC-14e4676c-9422-42ec-bb90-1e3717059ae6',
    'https://www.udemy.com/certificate/UC-14e4676c-9422-42ec-bb90-1e3717059ae6/',
    'Curso prático de Power BI com SQL Server para modelagem de dados e Figma para design de interfaces de dashboard.',
    ARRAY['Power BI', 'SQL Server', 'Figma', 'DAX', 'M', 'Modelagem de Dados'],
    '🎨',
    'from-purple-400 to-pink-500'
),
(
    'Jornada Inteligência Artificial da Hashtag',
    'Hashtag Treinamentos',
    'ai',
    'jul 2024',
    '8 horas',
    NULL,
    NULL,
    'Evento intensivo de 8 horas sobre Inteligência Artificial e algoritmos de aprendizado de máquina.',
    ARRAY['Inteligência Artificial', 'Machine Learning', 'Algoritmos'],
    '🧠',
    'from-indigo-400 to-purple-600'
),
(
    'Jornada Python da Hashtag',
    'Hashtag Treinamentos',
    'programming',
    'jul 2024',
    NULL,
    NULL,
    NULL,
    'Jornada prática de Python em 4 aulas cobrindo análise de dados, Machine Learning e IA.',
    ARRAY['Python', 'Análise de Dados', 'Machine Learning', 'IA'],
    '🐍',
    'from-green-400 to-blue-500'
),
(
    'Understanding LookML in Looker',
    'Google Cloud Skills Boost',
    'data',
    'jul 2024',
    NULL,
    '9700391',
    NULL,
    'Curso sobre LookML, linguagem de modelagem do Looker para criação de análises e métricas em SQL.',
    ARRAY['LookML', 'Looker', 'SQL', 'Banco de Dados'],
    '🔍',
    'from-blue-400 to-cyan-500'
),
(
    'Prepare Data for Looker Dashboards and Reports',
    'Google Cloud Skills Boost',
    'data',
    'jul 2024',
    NULL,
    '9686745',
    NULL,
    'Preparação e modelagem de dados para criação de dashboards e relatórios no Looker.',
    ARRAY['Looker', 'Dashboards', 'Banco de Dados', 'Data Preparation'],
    '📋',
    'from-teal-400 to-green-500'
),
(
    'Introduction to AI and Machine Learning on Google Cloud',
    'Google Cloud Skills Boost',
    'ai',
    'jun 2024',
    NULL,
    '9601536',
    NULL,
    'Introdução a IA e Machine Learning na Google Cloud, incluindo AutoML e ferramentas nativas de aprendizado de máquina.',
    ARRAY['Google Cloud', 'AutoML', 'Machine Learning', 'IA'],
    '☁️',
    'from-blue-500 to-indigo-600'
),
(
    'Inteligência Artificial: eleve sua produtividade e acelere sua carreira',
    'Escola Conquer',
    'ai',
    'mai 2024',
    NULL,
    NULL,
    NULL,
    'Curso prático sobre aplicação de IA para aumento de produtividade e aceleração de carreira.',
    ARRAY['Inteligência Artificial', 'Produtividade', 'Carreira'],
    '🚀',
    'from-orange-400 to-red-500'
),

-- 2023
(
    'Inteligência Artificial e Direito',
    'Sidérea Academy',
    'ai',
    'ago 2023',
    NULL,
    'f6f36596-6c5b-404d-b4cc-e6c70f2e0a31',
    NULL,
    'Curso sobre a interseção entre Inteligência Artificial e o campo jurídico, ética e regulamentação.',
    ARRAY['Inteligência Artificial', 'Direito', 'Ética em IA', 'Regulamentação'],
    '⚖️',
    'from-gray-500 to-slate-700'
),
(
    'Introdução à Análise de Dados - Microsoft Power BI',
    'Fundação Bradesco',
    'data',
    'jul 2023',
    NULL,
    '049BBBBC-FC60-4FCB-831D-EA23691FDA9F',
    NULL,
    'Certificação da Fundação Bradesco em análise de dados com Microsoft Power BI, ETL, DAX e Power Query.',
    ARRAY['Power BI', 'ETL', 'DAX', 'Power Query', 'Análise de Dados', 'Visualização', 'Microsoft'],
    '📊',
    'from-red-500 to-orange-600'
),
(
    'Introduction to Generative AI',
    'Google Cloud Skills Boost',
    'ai',
    'jun 2023',
    NULL,
    '3973800',
    NULL,
    'Curso introdutório sobre Inteligência Artificial Generativa, fundamentos e casos de uso.',
    ARRAY['IA Generativa', 'LLMs', 'Google Cloud', 'Machine Learning'],
    '🤖',
    'from-blue-400 to-blue-600'
),

-- 2022
(
    'CPA 10',
    'ANBIMA',
    'finance',
    'dez 2022',
    NULL,
    'V4B5_V6Y9_G7T1',
    NULL,
    'Certificação ANBIMA para profissionais que atuam na distribuição de produtos de investimento no mercado financeiro.',
    ARRAY['CPA 10', 'Investimentos', 'Mercado Financeiro', 'Habilidades Analíticas', 'Compliance'],
    '💰',
    'from-green-500 to-emerald-600'
),

-- 2019
(
    'Informática Administrativa',
    'CD6 - Centro de Desenvolvimento de Pessoas e Negócios',
    'other',
    'jun 2019',
    NULL,
    NULL,
    NULL,
    'Curso de informática administrativa com foco em ferramentas de escritório e Microsoft Excel.',
    ARRAY['Microsoft Excel', 'Informática', 'Habilidades Analíticas'],
    '💻',
    'from-gray-400 to-slate-500'
);