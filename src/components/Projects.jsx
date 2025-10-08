import React, { useState, useEffect, useRef } from 'react'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const categories = [
    { id: 'all', name: 'Todos', count: 8 },
    { id: 'powerbi', name: 'Power BI', count: 4 },
    { id: 'python', name: 'Python', count: 3 },
    { id: 'web', name: 'Web', count: 2 },
    { id: 'automation', name: 'Automação', count: 3 }
  ]

  const projects = [
    {
      id: 1,
      title: 'Dashboard Copel Solar',
      category: 'powerbi',
      description: 'Dashboard completo para monitoramento de performance de sistemas fotovoltaicos, incluindo análise de geração, economia e sustentabilidade.',
      image: '🌞',
      technologies: ['Power BI', 'DAX', 'Power Query', 'SQL'],
      features: [
        'Monitoramento em tempo real de geração de energia',
        'Análise de economia financeira por cliente',
        'Relatórios de sustentabilidade e CO2 evitado',
        'Comparativo de performance entre sistemas'
      ],
      status: 'Concluído',
      year: '2022',
      client: 'Copel',
      github: null,
      demo: null
    },
    {
      id: 2,
      title: 'Automação de Relatórios Financeiros',
      category: 'python',
      description: 'Sistema automatizado para geração de relatórios financeiros mensais, reduzindo tempo de processamento de 8 horas para 30 minutos.',
      image: '💰',
      technologies: ['Python', 'Pandas', 'Openpyxl', 'SQL Server'],
      features: [
        'Extração automática de dados do ERP',
        'Processamento e limpeza de dados',
        'Geração automática de gráficos e tabelas',
        'Envio automático por email'
      ],
      status: 'Concluído',
      year: '2023',
      client: 'Copel',
      github: 'https://github.com/MalikRibeiro/financial-automation',
      demo: null
    },
    {
      id: 3,
      title: 'Portal de Vendas BI',
      category: 'powerbi',
      description: 'Portal interativo para acompanhamento de vendas com KPIs, metas e análise de performance por vendedor e região.',
      image: '📈',
      technologies: ['Power BI', 'DAX', 'Power Query', 'SharePoint'],
      features: [
        'KPIs de vendas em tempo real',
        'Análise de performance por vendedor',
        'Comparativo de metas vs realizado',
        'Drill-down por região e produto'
      ],
      status: 'Concluído',
      year: '2022',
      client: 'Copel Comercialização',
      github: null,
      demo: null
    },
    {
      id: 4,
      title: 'Sistema de Controle de Estoque',
      category: 'python',
      description: 'Aplicação web para controle de estoque com alertas automáticos, relatórios e integração com sistema ERP.',
      image: '📦',
      technologies: ['Python', 'Flask', 'SQLite', 'HTML/CSS', 'JavaScript'],
      features: [
        'Cadastro e controle de produtos',
        'Alertas de estoque baixo',
        'Relatórios de movimentação',
        'Interface web responsiva'
      ],
      status: 'Em Desenvolvimento',
      year: '2024',
      client: 'Projeto Pessoal',
      github: 'https://github.com/MalikRibeiro/inventory-system',
      demo: 'https://inventory-demo.malikribeiro.dev'
    },
    {
      id: 5,
      title: 'Dashboard de RH',
      category: 'powerbi',
      description: 'Dashboard para análise de dados de recursos humanos incluindo turnover, absenteísmo e performance.',
      image: '👥',
      technologies: ['Power BI', 'DAX', 'Excel', 'Power Query'],
      features: [
        'Análise de turnover por departamento',
        'Métricas de absenteísmo',
        'Avaliação de performance',
        'Relatórios de treinamento'
      ],
      status: 'Concluído',
      year: '2023',
      client: 'Copel',
      github: null,
      demo: null
    },
    {
      id: 6,
      title: 'Automação de Emails',
      category: 'automation',
      description: 'Sistema para envio automático de relatórios por email com agendamento e personalização de conteúdo.',
      image: '📧',
      technologies: ['Python', 'SMTP', 'Schedule', 'Jinja2'],
      features: [
        'Agendamento de envios',
        'Templates personalizáveis',
        'Lista de destinatários dinâmica',
        'Log de envios e erros'
      ],
      status: 'Concluído',
      year: '2023',
      client: 'Copel',
      github: 'https://github.com/MalikRibeiro/email-automation',
      demo: null
    },
    {
      id: 7,
      title: 'Portfolio Pessoal',
      category: 'web',
      description: 'Site portfolio pessoal desenvolvido com React, Tailwind CSS e funcionalidades modernas.',
      image: '🌐',
      technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Vite'],
      features: [
        'Design responsivo',
        'Modo claro/escuro',
        'Animações suaves',
        'Formulário de contato'
      ],
      status: 'Concluído',
      year: '2024',
      client: 'Projeto Pessoal',
      github: 'https://github.com/MalikRibeiro/portfolio',
      demo: 'https://malikribeiro.github.io'
    },
    {
      id: 8,
      title: 'Análise de Dados COVID-19',
      category: 'python',
      description: 'Análise exploratória de dados da COVID-19 no Paraná com visualizações interativas.',
      image: '🦠',
      technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
      features: [
        'Análise temporal de casos',
        'Visualizações interativas',
        'Comparativo entre cidades',
        'Previsões estatísticas'
      ],
      status: 'Concluído',
      year: '2021',
      client: 'Projeto Acadêmico',
      github: 'https://github.com/MalikRibeiro/covid-analysis',
      demo: null
    }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const openProjectModal = (project) => {
    setSelectedProject(project)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Meus <span className="text-gradient">Projetos</span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Conheça alguns dos projetos que desenvolvi ao longo da minha carreira
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => openProjectModal(project)}
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              {/* Project Image/Icon */}
              <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-t-xl flex items-center justify-center">
                <div className="text-6xl">{project.image}</div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Concluído' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {project.year}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 btn-outline text-sm py-2 text-center"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 btn-primary text-sm py-2 text-center"
                    >
                      Demo
                    </a>
                  )}
                  {!project.github && !project.demo && (
                    <button className="flex-1 btn-primary text-sm py-2">
                      Ver Detalhes
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={closeProjectModal}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="h-64 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-8xl">{selectedProject.image}</div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cliente</h4>
                        <p className="text-gray-600 dark:text-gray-300">{selectedProject.client}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Ano</h4>
                        <p className="text-gray-600 dark:text-gray-300">{selectedProject.year}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Status</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedProject.status === 'Concluído' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {selectedProject.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Descrição</h4>
                        <p className="text-gray-600 dark:text-gray-300">{selectedProject.description}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Principais Funcionalidades</h4>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tecnologias</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        {selectedProject.github && (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline flex-1 text-center"
                          >
                            Ver no GitHub
                          </a>
                        )}
                        {selectedProject.demo && (
                          <a
                            href={selectedProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary flex-1 text-center"
                          >
                            Ver Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects

