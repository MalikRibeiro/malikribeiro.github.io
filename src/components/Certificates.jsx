import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

const PAGE_SIZE = 9

const Certificates = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [certificates, setCertificates] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categories, setCategories] = useState([{ id: 'all', name: 'Todos', count: 0 }])
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) }
  }, [])

  // Initial fetch (resets when category changes)
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        setLoading(true)
        setPage(0)

        // Count total for selected category
        let countQuery = supabase.from('certificates').select('id', { count: 'exact', head: true })
        if (selectedCategory !== 'all') countQuery = countQuery.eq('category', selectedCategory)
        const { count } = await countQuery
        setTotal(count || 0)

        // Fetch first page
        let dataQuery = supabase
          .from('certificates')
          .select('*')
          .order('date', { ascending: false })
          .range(0, PAGE_SIZE - 1)
        if (selectedCategory !== 'all') dataQuery = dataQuery.eq('category', selectedCategory)
        const { data, error: err } = await dataQuery
        if (err) throw err
        setCertificates(data || [])
      } catch (err) {
        console.error('Erro ao buscar certificados:', err)
        setError('Não foi possível carregar os certificados.')
      } finally {
        setLoading(false)
      }
    }
    fetchInitial()
  }, [selectedCategory])

  // Build dynamic category list once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('certificates').select('category')
      if (!data) return
      const counts = {}
      data.forEach(({ category }) => {
        counts[category] = (counts[category] || 0) + 1
      })
      const categoryLabels = {
        data: 'Dados & BI',
        programming: 'Programação',
        cloud: 'Cloud',
        finance: 'Finanças',
        management: 'Gestão',
        other: 'Outros'
      }
      const dynamicCats = Object.entries(counts).map(([id, count]) => ({
        id,
        name: categoryLabels[id] || id,
        count
      }))
      setCategories([
        { id: 'all', name: 'Todos', count: data.length },
        ...dynamicCats.sort((a, b) => b.count - a.count)
      ])
    }
    fetchCategories()
  }, [])

  const loadMore = async () => {
    const nextPage = page + 1
    try {
      setLoadingMore(true)
      let dataQuery = supabase
        .from('certificates')
        .select('*')
        .order('date', { ascending: false })
        .range(nextPage * PAGE_SIZE, nextPage * PAGE_SIZE + PAGE_SIZE - 1)
      if (selectedCategory !== 'all') dataQuery = dataQuery.eq('category', selectedCategory)
      const { data, error: err } = await dataQuery
      if (err) throw err
      setCertificates(prev => [...prev, ...(data || [])])
      setPage(nextPage)
    } catch (err) {
      console.error('Erro ao carregar mais:', err)
    } finally {
      setLoadingMore(false)
    }
  }

  const hasMore = certificates.length < total

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
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 dark:text-red-400">
            <p>⚠️ {error}</p>
          </div>
        ) : (
          <>
            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {certificates.map((cert, index) => (
                <div
                  key={cert.id}
                  className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Certificate Header */}
                  <div className={`h-32 bg-gradient-to-r ${cert.color || 'from-primary-400 to-secondary-500'} flex items-center justify-center relative`}>
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
                    {cert.skills?.length > 0 && (
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
                    )}

                    {/* Credential Info */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          {cert.credential_id ? `ID: ${cert.credential_id}` : ''}
                        </span>
                        {cert.verification_url && (
                          <a
                            href={cert.verification_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center"
                          >
                            Verificar
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="btn-primary px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loadingMore ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Carregando...
                    </span>
                  ) : (
                    `Ver mais (${total - certificates.length} restantes)`
                  )}
                </button>
              </div>
            )}
          </>
        )}

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
                <div className="text-3xl font-bold text-gradient mb-2">{total || '15'}+</div>
                <div className="text-gray-600 dark:text-gray-300">Certificações</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">{(categories.length - 1) || 5}</div>
                <div className="text-gray-600 dark:text-gray-300">Áreas de Expertise</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-300">Horas de Estudo</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">2026</div>
                <div className="text-gray-600 dark:text-gray-300">Última Certificação</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificates
