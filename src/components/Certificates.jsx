import React, { useState, useEffect, useRef } from 'react'

const Certificates = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
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
    { id: 'all', name: 'Todos', count: 15 },
    { id: 'data', name: 'Dados & BI', count: 6 },
    { id: 'programming', name: 'Programação', count: 4 },
    { id: 'cloud', name: 'Cloud', count: 3 },
    { id: 'finance', name: 'Finanças', count: 2 }
  ]

  const certificates = [
    {
      id: 1,
      title: 'Microsoft Certified: Power BI Data Analyst Associate',
      issuer: 'Microsoft',
      category: 'data',
      date: '2023',
      credentialId: 'PL-300',
      verificationUrl: 'https://learn.microsoft.com/api/credentials/share/pt-br/MalikRibeiro/ABC123',
      description: 'Certificação que valida habilidades em análise de dados usando Microsoft Power BI.',
      skills: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
      badge: '📊',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 2,
      title: 'Google Data Analytics Professional Certificate',
      issuer: 'Google',
      category: 'data',
      date: '2023',
      credentialId: 'GDA-2023-001',
      verificationUrl: 'https://coursera.org/verify/professional-cert/ABC123',
      description: 'Programa completo de análise de dados do Google, cobrindo todo o processo analítico.',
      skills: ['Google Analytics', 'SQL', 'Tableau', 'R Programming'],
      badge: '🔍',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 3,
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      category: 'cloud',
      date: '2024',
      credentialId: 'AWS-CP-001',
      verificationUrl: 'https://aws.amazon.com/verification/ABC123',
      description: 'Certificação fundamental da AWS que valida conhecimentos básicos de cloud computing.',
      skills: ['AWS', 'Cloud Computing', 'EC2', 'S3'],
      badge: '☁️',
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 4,
      title: 'Python for Data Science and AI',
      issuer: 'IBM',
      category: 'programming',
      date: '2022',
      credentialId: 'IBM-PY-001',
      verificationUrl: 'https://coursera.org/verify/ABC123',
      description: 'Curso abrangente de Python aplicado à ciência de dados e inteligência artificial.',
      skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
      badge: '🐍',
      color: 'from-green-400 to-blue-500'
    },
    {
      id: 5,
      title: 'CPA-10 - Certificação ANBIMA',
      issuer: 'ANBIMA',
      category: 'finance',
      date: '2021',
      credentialId: 'CPA10-2021-001',
      verificationUrl: 'https://anbima.com.br/verificacao/ABC123',
      description: 'Certificação para profissionais que atuam na distribuição de produtos de investimento.',
      skills: ['Investimentos', 'Mercado Financeiro', 'Compliance', 'Ética'],
      badge: '💰',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 6,
      title: 'Microsoft Azure Fundamentals',
      issuer: 'Microsoft',
      category: 'cloud',
      date: '2024',
      credentialId: 'AZ-900',
      verificationUrl: 'https://learn.microsoft.com/api/credentials/share/pt-br/MalikRibeiro/DEF456',
      description: 'Certificação que demonstra conhecimentos fundamentais sobre serviços de nuvem do Azure.',
      skills: ['Azure', 'Cloud Services', 'Virtual Machines', 'Storage'],
      badge: '🌐',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 7,
      title: 'SQL Server Database Administration',
      issuer: 'Microsoft',
      category: 'data',
      date: '2023',
      credentialId: 'MCSA-SQL',
      verificationUrl: 'https://learn.microsoft.com/api/credentials/share/pt-br/MalikRibeiro/GHI789',
      description: 'Certificação em administração de banco de dados SQL Server.',
      skills: ['SQL Server', 'T-SQL', 'Database Design', 'Performance Tuning'],
      badge: '🗄️',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 8,
      title: 'React - The Complete Guide',
      issuer: 'Udemy',
      category: 'programming',
      date: '2024',
      credentialId: 'UC-REACT-001',
      verificationUrl: 'https://udemy.com/certificate/ABC123',
      description: 'Curso completo de React incluindo hooks, context, Redux e Next.js.',
      skills: ['React', 'JavaScript', 'Redux', 'Next.js'],
      badge: '⚛️',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      id: 9,
      title: 'Tableau Desktop Specialist',
      issuer: 'Tableau',
      category: 'data',
      date: '2023',
      credentialId: 'TDS-2023-001',
      verificationUrl: 'https://tableau.com/verify/ABC123',
      description: 'Certificação que valida habilidades fundamentais em visualização de dados com Tableau.',
      skills: ['Tableau', 'Data Visualization', 'Dashboard Design', 'Analytics'],
      badge: '📈',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 10,
      title: 'Google Cloud Platform Fundamentals',
      issuer: 'Google Cloud',
      category: 'cloud',
      date: '2024',
      credentialId: 'GCP-FUND-001',
      verificationUrl: 'https://cloud.google.com/certification/verify/ABC123',
      description: 'Introdução aos serviços e conceitos fundamentais do Google Cloud Platform.',
      skills: ['Google Cloud', 'Compute Engine', 'BigQuery', 'Cloud Storage'],
      badge: '🌤️',
      color: 'from-yellow-400 to-red-500'
    },
    {
      id: 11,
      title: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      category: 'programming',
      date: '2023',
      credentialId: 'FCC-JS-001',
      verificationUrl: 'https://freecodecamp.org/certification/malikribeiro/javascript-algorithms-and-data-structures',
      description: 'Certificação em algoritmos e estruturas de dados usando JavaScript.',
      skills: ['JavaScript', 'Algorithms', 'Data Structures', 'Problem Solving'],
      badge: '🔧',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 12,
      title: 'Excel Expert - Advanced Functions',
      issuer: 'Microsoft',
      category: 'data',
      date: '2022',
      credentialId: 'MOS-EXL-001',
      verificationUrl: 'https://learn.microsoft.com/api/credentials/share/pt-br/MalikRibeiro/JKL012',
      description: 'Certificação avançada em Excel incluindo funções complexas, macros e VBA.',
      skills: ['Excel', 'VBA', 'Macros', 'Advanced Functions'],
      badge: '📋',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 13,
      title: 'Scrum Master Certified',
      issuer: 'Scrum Alliance',
      category: 'programming',
      date: '2024',
      credentialId: 'CSM-2024-001',
      verificationUrl: 'https://scrumalliance.org/verify/ABC123',
      description: 'Certificação em metodologia ágil Scrum para gestão de projetos de software.',
      skills: ['Scrum', 'Agile', 'Project Management', 'Team Leadership'],
      badge: '🏃‍♂️',
      color: 'from-indigo-400 to-purple-600'
    },
    {
      id: 14,
      title: 'CFA Institute Investment Foundations',
      issuer: 'CFA Institute',
      category: 'finance',
      date: '2022',
      credentialId: 'CFA-IF-001',
      verificationUrl: 'https://cfainstitute.org/verify/ABC123',
      description: 'Programa introdutório sobre fundamentos de investimentos e ética profissional.',
      skills: ['Investment Analysis', 'Portfolio Management', 'Ethics', 'Financial Markets'],
      badge: '📊',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: 15,
      title: 'Power Query and Power Pivot Expert',
      issuer: 'ExcelExposure',
      category: 'data',
      date: '2023',
      credentialId: 'PQ-PP-001',
      verificationUrl: 'https://excelexposure.com/verify/ABC123',
      description: 'Especialização avançada em Power Query e Power Pivot para análise de dados.',
      skills: ['Power Query', 'Power Pivot', 'Data Transformation', 'DAX'],
      badge: '⚡',
      color: 'from-purple-500 to-pink-600'
    }
  ]

  const filteredCertificates = selectedCategory === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory)

  return (
    <section id="certificates" ref={sectionRef} className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Certificações <span className="text-gradient">Profissionais</span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Certificações e cursos que comprovam minha expertise técnica
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

        {/* Certificates Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {filteredCertificates.map((cert, index) => (
            <div
              key={cert.id}
              className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              {/* Certificate Header */}
              <div className={`h-32 bg-gradient-to-r ${cert.color} flex items-center justify-center relative`}>
                <div className="text-5xl">{cert.badge}</div>
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium text-gray-700 dark:text-gray-300">
                  {cert.date}
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {cert.title}
                </h3>
                
                <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">
                  {cert.issuer}
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Habilidades
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Credential Info */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      ID: {cert.credentialId}
                    </span>
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center"
                    >
                      Verificar
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`mt-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="card p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Estatísticas de Certificações
            </h3>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">15+</div>
                <div className="text-gray-600 dark:text-gray-300">Certificações</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">5</div>
                <div className="text-gray-600 dark:text-gray-300">Áreas de Expertise</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-300">Horas de Estudo</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">2024</div>
                <div className="text-gray-600 dark:text-gray-300">Última Certificação</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-800">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Sempre Aprendendo
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Mantenho-me constantemente atualizado com as últimas tecnologias e tendências do mercado. 
              Atualmente estudando para as certificações AWS Solutions Architect e Microsoft Azure Data Engineer.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium">
                🎯 Próxima: AWS Solutions Architect
              </span>
              <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium">
                📚 Estudando: Azure Data Engineer
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificates

