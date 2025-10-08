import React, { useState, useEffect, useRef } from 'react'

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeExperience, setActiveExperience] = useState(0)
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

  const experiences = [
    {
      id: 1,
      title: 'Analista de Dados',
      company: 'Copel',
      period: '2022 - Presente',
      location: 'Curitiba, PR',
      type: 'Tempo Integral',
      description: 'Atuo na área de TI da Copel, desenvolvendo soluções de Business Intelligence e automações com Python. Responsável por análise de dados, criação de dashboards em Power BI e implementação de processos automatizados.',
      achievements: [
        'Desenvolvimento de mais de 20 dashboards em Power BI para diferentes áreas da empresa',
        'Implementação de automações em Python que reduziram 70% do tempo de processamento de dados',
        'Criação de relatórios gerenciais que auxiliam na tomada de decisões estratégicas',
        'Treinamento de equipes internas em ferramentas de BI e análise de dados'
      ],
      technologies: ['Power BI', 'Python', 'SQL Server', 'Excel', 'DAX', 'Power Query'],
      logo: '⚡'
    },
    {
      id: 2,
      title: 'Analista de Dados - Projeto Copel Solar',
      company: 'Copel Comercialização',
      period: '2021 - 2022',
      location: 'Curitiba, PR',
      type: 'Projeto Especial',
      description: 'Contribuição no projeto Copel Solar, focando na análise de dados de energia solar e criação de relatórios para acompanhamento de performance dos sistemas fotovoltaicos.',
      achievements: [
        'Análise de dados de geração de energia solar de mais de 1000 clientes',
        'Criação de dashboards para monitoramento de performance dos sistemas',
        'Desenvolvimento de relatórios de economia e sustentabilidade',
        'Suporte na identificação de oportunidades de melhoria nos sistemas'
      ],
      technologies: ['Power BI', 'Excel', 'SQL', 'Power Query'],
      logo: '☀️'
    },
    {
      id: 3,
      title: 'Assistente Administrativo',
      company: 'Copel Comercialização',
      period: '2020 - 2021',
      location: 'Curitiba, PR',
      type: 'Estágio',
      description: 'Atuação no front administrativo prestando suporte para equipe de vendas. Responsável por organização de documentos, atendimento ao cliente e suporte em processos comerciais.',
      achievements: [
        'Organização e digitalização de mais de 5000 documentos comerciais',
        'Implementação de controles em Excel para acompanhamento de vendas',
        'Suporte no atendimento a clientes e resolução de demandas',
        'Auxílio na elaboração de propostas comerciais'
      ],
      technologies: ['Excel', 'Word', 'PowerPoint', 'Sistemas ERP'],
      logo: '📊'
    }
  ]

  return (
    <section id="experience" ref={sectionRef} className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Experiência <span className="text-gradient">Profissional</span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Minha trajetória profissional na Copel e projetos desenvolvidos
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Timeline Navigation */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {experiences.map((exp, index) => (
              <button
                key={exp.id}
                onClick={() => setActiveExperience(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeExperience === index
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {exp.period.split(' - ')[0]}
              </button>
            ))}
          </div>

          {/* Experience Details */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="card p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Company Info */}
                <div className="lg:col-span-1">
                  <div className="text-center lg:text-left">
                    <div className="text-6xl mb-4">
                      {experiences[activeExperience].logo}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {experiences[activeExperience].title}
                    </h3>
                    <p className="text-xl text-primary-600 dark:text-primary-400 font-semibold mb-2">
                      {experiences[activeExperience].company}
                    </p>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center justify-center lg:justify-start">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-1 12a2 2 0 002 2h6a2 2 0 002-2L16 7" />
                        </svg>
                        {experiences[activeExperience].period}
                      </div>
                      <div className="flex items-center justify-center lg:justify-start">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {experiences[activeExperience].location}
                      </div>
                      <div className="flex items-center justify-center lg:justify-start">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {experiences[activeExperience].type}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience Details */}
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Descrição
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {experiences[activeExperience].description}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Principais Conquistas
                      </h4>
                      <ul className="space-y-2">
                        {experiences[activeExperience].achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Tecnologias Utilizadas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experiences[activeExperience].technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Visual */}
          <div className={`mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}>
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-4 border-primary-500 rounded-full z-10"></div>
                    
                    {/* Content */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="glass p-4 rounded-lg">
                        <h5 className="font-semibold text-gray-900 dark:text-white">
                          {exp.title}
                        </h5>
                        <p className="text-primary-600 dark:text-primary-400 text-sm">
                          {exp.company}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          {exp.period}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience

