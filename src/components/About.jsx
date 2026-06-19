import React, { useState, useEffect, useRef } from 'react'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
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

  const skills = [
    { name: 'Power BI', level: 90, color: 'bg-yellow-500' },
    { name: 'SQL', level: 85, color: 'bg-blue-500' },
    { name: 'Python', level: 80, color: 'bg-green-500' },
    { name: 'Excel', level: 95, color: 'bg-emerald-500' },
    { name: 'HTML/CSS', level: 75, color: 'bg-orange-500' },
    { name: 'JavaScript', level: 70, color: 'bg-purple-500' },
    { name: 'React', level: 65, color: 'bg-cyan-500' },
    { name: 'PHP', level: 60, color: 'bg-indigo-500' },
  ]

  const stats = [
    { number: '3+', label: 'Anos de Experiência' },
    { number: '10+', label: 'Projetos Concluídos' },
    { number: '15+', label: 'Certificações' },
    { number: '100%', label: 'Dedicação' },
  ]

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            Sobre <span className="text-gradient">Mim</span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            Conheça minha trajetória profissional e as tecnologias que domino
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Minha Jornada</h3>

              <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <p>
                  Iniciei minha trajetória acadêmica cursando <strong>Administração de Empresas</strong> na FAE Centro Universitário.
                  Durante a graduação, entrei na <strong>Copel Comercialização</strong>, onde atuei no suporte administrativo ao comercial
                  e integrei o projeto <strong>Copel Solar</strong>, aprofundando meus conhecimentos em Power BI.
                </p>

                <p>
                  Posteriormente, na área de <strong>TI da Copel</strong>, atuei no desenvolvimento de automações em Python
                  e criação de dashboards para diversas áreas, além de administrar o ambiente de serviços do Power BI.
                </p>

                <p>
                  Em seguida, atuei na <strong>Electra Comercializadora de Energia</strong>, onde desenvolvi automações em Python
                  para validação de dados com a CCEE, rotinas de envio de relatórios, extração de dados via RPA e dashboards
                  em Power BI para análise de carteira e risco.
                </p>

                <p>
                  Busco constantemente me atualizar em tecnologia e no mercado de energia, com certificações pela Google, Microsoft,
                  Udemy, Alura e CCEE. Também sou certificado <strong>CPA-10</strong> pela ANBIMA.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Habilidades Técnicas</h3>

              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${600 + index * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Focus */}
              <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                <h4 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
                  🎯 Foco Atual
                  <p className="text-primary-700 dark:text-primary-300 text-sm">
                    Aprofundando conhecimentos em análise de risco e mercado livre de energia, com foco em
                    Python para automação e modelagem quantitativa, SQL e Power BI.
                  </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center card p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Inovação</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sempre buscando soluções criativas e tecnologias emergentes para resolver problemas complexos.
              </p>
            </div>

            <div className="text-center card p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Eficiência</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Foco em automação e otimização de processos para maximizar produtividade e qualidade.
              </p>
            </div>

            <div className="text-center card p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aprendizado</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprometimento constante com o desenvolvimento pessoal e profissional através do estudo contínuo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

