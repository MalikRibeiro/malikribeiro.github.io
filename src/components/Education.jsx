import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

const Education = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [education, setEducation] = useState([])
  const [courses, setCourses] = useState([])
  const [loadingEdu, setLoadingEdu] = useState(true)
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [errorEdu, setErrorEdu] = useState(null)
  const [errorCourses, setErrorCourses] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) }
  }, [])

  // Fetch formal education
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoadingEdu(true)
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('id')
        if (error) throw error
        setEducation(data || [])
      } catch (err) {
        console.error('Erro ao buscar educação:', err)
        setErrorEdu('Não foi possível carregar os dados de formação.')
      } finally {
        setLoadingEdu(false)
      }
    }
    fetchEducation()
  }, [])

  // Fetch courses / certifications (limit 6 for this section)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true)
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('date', { ascending: false })
          .limit(6)
        if (error) throw error
        setCourses(data || [])
      } catch (err) {
        console.error('Erro ao buscar cursos:', err)
        setErrorCourses('Não foi possível carregar os cursos.')
      } finally {
        setLoadingCourses(false)
      }
    }
    fetchCourses()
  }, [])

  const Spinner = () => (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  )

  return (
    <section id="education" ref={sectionRef} className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Formação <span className="text-gradient">Acadêmica</span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Minha jornada educacional e cursos de especialização
          </p>
        </div>

        {/* Formal Education */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Ensino Superior
          </h3>

          {loadingEdu ? (
            <Spinner />
          ) : errorEdu ? (
            <div className="text-center py-8 text-red-500 dark:text-red-400">
              <p>⚠️ {errorEdu}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {education.map((edu) => (
                <div key={edu.id} className="card p-8 hover:shadow-xl transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${edu.color || 'from-blue-500 to-purple-600'} rounded-full flex items-center justify-center text-2xl mr-4`}>
                      {edu.logo}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-primary-600 dark:text-primary-400 font-semibold">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        📅 {edu.period}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        edu.status === 'Concluído'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {edu.status}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {edu.description}
                    </p>
                  </div>

                  {/* Subjects */}
                  {edu.subjects?.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Principais Disciplinas
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {edu.subjects.map((subject, subIndex) => (
                          <div key={subIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {subject}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Courses and Certifications */}
        <div className={`transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Cursos e Especializações
          </h3>

          {loadingCourses ? (
            <Spinner />
          ) : errorCourses ? (
            <div className="text-center py-8 text-red-500 dark:text-red-400">
              <p>⚠️ {errorCourses}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="card p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Badge */}
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{course.badge}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      parseInt(course.date) >= 2025
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : parseInt(course.date) >= 2023
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {course.date}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                      {course.issuer}
                    </p>
                    {course.duration && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        Duração: {course.duration}
                      </p>
                    )}
                  </div>

                  {/* Skills */}
                  {course.skills?.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                        Habilidades Adquiridas
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {course.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Learning Philosophy */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="card p-8 max-w-4xl mx-auto">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Filosofia de Aprendizado
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Acredito que o aprendizado é um processo contínuo e essencial para o crescimento profissional.
              Busco constantemente me atualizar com as últimas tecnologias e tendências do mercado,
              combinando conhecimento teórico com aplicação prática em projetos reais.
              Minha abordagem é sempre hands-on, aprendendo fazendo e compartilhando conhecimento com a comunidade.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Foco</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Aprendizado direcionado às necessidades do mercado
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔄</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Continuidade</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Atualização constante com novas tecnologias
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🤝</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Compartilhamento</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Troca de conhecimento com a comunidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
