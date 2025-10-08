#!/usr/bin/env python3
"""
Script para gerar uma versão estática do portfolio React
Converte os componentes JSX em HTML estático com CSS inline
"""

import os
import re

def create_static_html():
    """Cria uma versão HTML estática do portfolio"""
    
    # CSS compilado do Tailwind (versão simplificada)
    css_content = """
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', system-ui, sans-serif; line-height: 1.6; color: #1f2937; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 4rem 0; }
        .bg-primary { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
        .bg-secondary { background: linear-gradient(135deg, #10b981, #047857); }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-gray-900 { background-color: #111827; }
        .text-white { color: white; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-900 { color: #111827; }
        .text-center { text-align: center; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-3xl { font-size: 1.875rem; }
        .text-4xl { font-size: 2.25rem; }
        .text-5xl { font-size: 3rem; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .mb-16 { margin-bottom: 4rem; }
        .mt-8 { margin-top: 2rem; }
        .mt-16 { margin-top: 4rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .p-8 { padding: 2rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-xl { border-radius: 0.75rem; }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .gap-8 { gap: 2rem; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .space-y-6 > * + * { margin-top: 1.5rem; }
        .space-y-8 > * + * { margin-top: 2rem; }
        .btn { display: inline-flex; align-items: center; justify-content: center; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; text-decoration: none; transition: all 0.2s; }
        .btn-primary { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3); }
        .btn-outline { border: 2px solid #3b82f6; color: #3b82f6; background: transparent; }
        .btn-outline:hover { background: #3b82f6; color: white; }
        .card { background: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); padding: 1.5rem; }
        .card:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); transform: translateY(-5px); }
        .text-gradient { background: linear-gradient(135deg, #3b82f6, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f0f9ff, #ecfdf5); position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23000" opacity="0.05"/><circle cx="75" cy="75" r="1" fill="%23000" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>'); }
        .profile-img { width: 200px; height: 200px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #10b981); display: flex; align-items: center; justify-content: center; font-size: 4rem; font-weight: bold; color: white; margin: 0 auto 2rem; position: relative; }
        .profile-img::after { content: ''; position: absolute; bottom: 10px; right: 10px; width: 30px; height: 30px; background: #10b981; border-radius: 50%; border: 4px solid white; }
        .skill-bar { background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden; }
        .skill-progress { height: 100%; background: linear-gradient(90deg, #3b82f6, #10b981); border-radius: 4px; transition: width 2s ease; }
        .timeline { position: relative; }
        .timeline::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, #3b82f6, #10b981); transform: translateX(-50%); }
        .timeline-item { position: relative; margin-bottom: 3rem; }
        .timeline-dot { position: absolute; left: 50%; top: 1rem; width: 16px; height: 16px; background: #3b82f6; border-radius: 50%; border: 4px solid white; transform: translateX(-50%); z-index: 10; }
        .social-links a { display: inline-flex; align-items: center; justify-content: center; width: 3rem; height: 3rem; background: #f3f4f6; border-radius: 0.5rem; color: #6b7280; text-decoration: none; transition: all 0.2s; margin: 0 0.5rem; }
        .social-links a:hover { background: #3b82f6; color: white; transform: translateY(-2px); }
        .header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
        .nav { display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; }
        .nav-links { display: flex; gap: 2rem; }
        .nav-links a { color: #374151; text-decoration: none; font-weight: 500; transition: color 0.2s; }
        .nav-links a:hover { color: #3b82f6; }
        .logo { font-size: 1.5rem; font-weight: bold; background: linear-gradient(135deg, #3b82f6, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        @media (max-width: 768px) {
            .grid-cols-2, .grid-cols-3 { grid-template-columns: 1fr; }
            .text-5xl { font-size: 2.5rem; }
            .text-4xl { font-size: 2rem; }
            .nav-links { display: none; }
            .profile-img { width: 150px; height: 150px; font-size: 3rem; }
        }
        .animate-fade-in { animation: fadeIn 1s ease-in-out; }
        .animate-slide-up { animation: slideUp 1s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .loading { display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .loading-dots { display: inline-block; position: relative; width: 80px; height: 80px; }
        .loading-dots div { position: absolute; top: 33px; width: 13px; height: 13px; border-radius: 50%; background: #3b82f6; animation-timing-function: cubic-bezier(0, 1, 1, 0); }
        .loading-dots div:nth-child(1) { left: 8px; animation: loading1 0.6s infinite; }
        .loading-dots div:nth-child(2) { left: 8px; animation: loading2 0.6s infinite; }
        .loading-dots div:nth-child(3) { left: 32px; animation: loading2 0.6s infinite; }
        .loading-dots div:nth-child(4) { left: 56px; animation: loading3 0.6s infinite; }
        @keyframes loading1 { 0% { transform: scale(0); } 100% { transform: scale(1); } }
        @keyframes loading3 { 0% { transform: scale(1); } 100% { transform: scale(0); } }
        @keyframes loading2 { 0% { transform: translate(0, 0); } 100% { transform: translate(24px, 0); } }
    </style>
    """
    
    # HTML content
    html_content = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Portfolio pessoal de Malik Ribeiro Mourad - Analista de Dados e Desenvolvedor Web">
    <meta name="keywords" content="Malik Ribeiro, Analista de Dados, Power BI, SQL, Python, React, Desenvolvedor Web">
    <meta name="author" content="Malik Ribeiro Mourad">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://malikribeiro.github.io/">
    <meta property="og:title" content="Malik Ribeiro Mourad - Portfolio">
    <meta property="og:description" content="Analista de Dados na Copel especializado em Power BI, SQL, Python e desenvolvimento web">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://malikribeiro.github.io/">
    <meta property="twitter:title" content="Malik Ribeiro Mourad - Portfolio">
    <meta property="twitter:description" content="Analista de Dados na Copel especializado em Power BI, SQL, Python e desenvolvimento web">
    
    <title>Malik Ribeiro Mourad - Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    """ + css_content + """
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="nav">
            <div class="logo">MRM</div>
            <div class="nav-links">
                <a href="#hero">Início</a>
                <a href="#about">Sobre</a>
                <a href="#experience">Experiência</a>
                <a href="#projects">Projetos</a>
                <a href="#education">Formação</a>
                <a href="#certificates">Certificados</a>
                <a href="#contact">Contato</a>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section id="hero" class="hero">
        <div class="container text-center animate-fade-in">
            <div class="profile-img">MRM</div>
            <h1 class="text-5xl font-bold mb-4">
                Malik Ribeiro <span class="text-gradient">Mourad</span>
            </h1>
            <p class="text-xl text-gray-600 mb-6">
                Analista de Dados | Power BI, SQL, Python, Excel | Desenvolvedor BI
            </p>
            <p class="text-lg text-gray-600 mb-8">
                Aspirante a Desenvolvedor Web
            </p>
            <div class="flex flex-col gap-4 items-center mb-12">
                <a href="#contact" class="btn btn-primary">
                    Entre em Contato
                </a>
                <a href="#" class="btn btn-outline">
                    Download CV
                </a>
            </div>
            <div class="social-links">
                <a href="https://linkedin.com/in/malik-ribeiro-mourad" target="_blank" aria-label="LinkedIn">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                </a>
                <a href="https://github.com/MalikRibeiro" target="_blank" aria-label="GitHub">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>
                <a href="https://wa.me/5541999999999" target="_blank" aria-label="WhatsApp">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                </a>
                <a href="https://instagram.com/malikribeiro" target="_blank" aria-label="Instagram">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                </a>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section bg-gray-50">
        <div class="container">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4">
                    Sobre <span class="text-gradient">Mim</span>
                </h2>
                <p class="text-xl text-gray-600">
                    Conheça minha trajetória profissional e as tecnologias que domino
                </p>
            </div>
            
            <div class="grid grid-cols-2 gap-8 items-center">
                <div class="card">
                    <h3 class="text-2xl font-bold mb-6">Minha Jornada</h3>
                    <div class="space-y-6 text-gray-600">
                        <p>
                            Iniciei minha trajetória acadêmica cursando <strong>Administração de Empresas</strong> na FAE Centro Universitário. 
                            Durante a graduação, entrei na <strong>Copel Comercialização</strong>, onde atuei no front administrativo, 
                            prestando suporte para equipe de vendas.
                        </p>
                        <p>
                            No final do meu estágio na Copel Comercialização, fui convidado a contribuir com o projeto 
                            <strong>Copel Solar</strong>, o que me levou a aprofundar meus conhecimentos em Power BI, 
                            aplicando essa ferramenta na análise de dados para o projeto.
                        </p>
                        <p>
                            Após concluir minha graduação em Administração, decidi expandir meus conhecimentos em tecnologia 
                            e iniciei o curso de <strong>Análise e Desenvolvimento de Sistemas</strong> na Universidade Positivo. 
                            Esta nova formação me abriu as portas para atuar na área de TI da Copel, implementando automações com Python.
                        </p>
                    </div>
                </div>
                
                <div class="card">
                    <h3 class="text-2xl font-bold mb-6">Habilidades Técnicas</h3>
                    <div class="space-y-6">
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="font-medium">Power BI</span>
                                <span class="text-gray-600">90%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 90%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="font-medium">SQL</span>
                                <span class="text-gray-600">85%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 85%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="font-medium">Python</span>
                                <span class="text-gray-600">80%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 80%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="font-medium">Excel</span>
                                <span class="text-gray-600">95%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 95%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="font-medium">React</span>
                                <span class="text-gray-600">65%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 65%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="section">
        <div class="container">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4">
                    Experiência <span class="text-gradient">Profissional</span>
                </h2>
                <p class="text-xl text-gray-600">
                    Minha trajetória profissional na Copel e projetos desenvolvidos
                </p>
            </div>
            
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="card" style="margin-left: 60%;">
                        <h3 class="text-xl font-bold mb-2">Analista de Dados</h3>
                        <p class="text-primary-600 font-semibold mb-2">Copel</p>
                        <p class="text-gray-600 mb-4">2022 - Presente</p>
                        <p class="text-gray-600">
                            Atuo na área de TI da Copel, desenvolvendo soluções de Business Intelligence e automações com Python. 
                            Responsável por análise de dados, criação de dashboards em Power BI e implementação de processos automatizados.
                        </p>
                    </div>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="card" style="margin-right: 60%;">
                        <h3 class="text-xl font-bold mb-2">Analista de Dados - Projeto Copel Solar</h3>
                        <p class="text-primary-600 font-semibold mb-2">Copel Comercialização</p>
                        <p class="text-gray-600 mb-4">2021 - 2022</p>
                        <p class="text-gray-600">
                            Contribuição no projeto Copel Solar, focando na análise de dados de energia solar e criação de relatórios 
                            para acompanhamento de performance dos sistemas fotovoltaicos.
                        </p>
                    </div>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="card" style="margin-left: 60%;">
                        <h3 class="text-xl font-bold mb-2">Assistente Administrativo</h3>
                        <p class="text-primary-600 font-semibold mb-2">Copel Comercialização</p>
                        <p class="text-gray-600 mb-4">2020 - 2021</p>
                        <p class="text-gray-600">
                            Atuação no front administrativo prestando suporte para equipe de vendas. Responsável por organização de documentos, 
                            atendimento ao cliente e suporte em processos comerciais.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section bg-gray-50">
        <div class="container">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4">
                    Meus <span class="text-gradient">Projetos</span>
                </h2>
                <p class="text-xl text-gray-600">
                    Conheça alguns dos projetos que desenvolvi ao longo da minha carreira
                </p>
            </div>
            
            <div class="grid grid-cols-3 gap-8">
                <div class="card">
                    <div class="text-center mb-4">
                        <div class="text-4xl mb-2">🌞</div>
                        <h3 class="text-xl font-bold mb-2">Dashboard Copel Solar</h3>
                        <p class="text-gray-600 mb-4">
                            Dashboard completo para monitoramento de performance de sistemas fotovoltaicos, 
                            incluindo análise de geração, economia e sustentabilidade.
                        </p>
                        <div class="flex gap-2 mb-4">
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Power BI</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">DAX</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">SQL</span>
                        </div>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Concluído</span>
                    </div>
                </div>
                
                <div class="card">
                    <div class="text-center mb-4">
                        <div class="text-4xl mb-2">💰</div>
                        <h3 class="text-xl font-bold mb-2">Automação de Relatórios Financeiros</h3>
                        <p class="text-gray-600 mb-4">
                            Sistema automatizado para geração de relatórios financeiros mensais, 
                            reduzindo tempo de processamento de 8 horas para 30 minutos.
                        </p>
                        <div class="flex gap-2 mb-4">
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Python</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Pandas</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">SQL</span>
                        </div>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Concluído</span>
                    </div>
                </div>
                
                <div class="card">
                    <div class="text-center mb-4">
                        <div class="text-4xl mb-2">📈</div>
                        <h3 class="text-xl font-bold mb-2">Portal de Vendas BI</h3>
                        <p class="text-gray-600 mb-4">
                            Portal interativo para acompanhamento de vendas com KPIs, metas e análise de performance 
                            por vendedor e região.
                        </p>
                        <div class="flex gap-2 mb-4">
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Power BI</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">DAX</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">SharePoint</span>
                        </div>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Concluído</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="section">
        <div class="container">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4">
                    Formação <span class="text-gradient">Acadêmica</span>
                </h2>
                <p class="text-xl text-gray-600">
                    Minha jornada educacional e cursos de especialização
                </p>
            </div>
            
            <div class="grid grid-cols-2 gap-8">
                <div class="card">
                    <div class="flex items-center mb-6">
                        <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl mr-4">🎓</div>
                        <div>
                            <h3 class="text-xl font-bold">Análise e Desenvolvimento de Sistemas</h3>
                            <p class="text-primary-600 font-semibold">Universidade Positivo</p>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="flex justify-between">
                            <span class="text-gray-600">📅 2022 - 2024</span>
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Em Andamento</span>
                        </div>
                        <p class="text-gray-600">
                            Curso superior focado em desenvolvimento de software, análise de sistemas, banco de dados e metodologias ágeis.
                        </p>
                    </div>
                </div>
                
                <div class="card">
                    <div class="flex items-center mb-6">
                        <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-2xl mr-4">📊</div>
                        <div>
                            <h3 class="text-xl font-bold">Administração de Empresas</h3>
                            <p class="text-primary-600 font-semibold">FAE Centro Universitário</p>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="flex justify-between">
                            <span class="text-gray-600">📅 2018 - 2021</span>
                            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Concluído</span>
                        </div>
                        <p class="text-gray-600">
                            Graduação em Administração com foco em gestão empresarial, finanças e estratégia organizacional.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Certificates Section -->
    <section id="certificates" class="section bg-gray-50">
        <div class="container">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4">
                    Certificações <span class="text-gradient">Profissionais</span>
                </h2>
                <p class="text-xl text-gray-600">
                    Certificações e cursos que comprovam minha expertise técnica
                </p>
            </div>
            
            <div class="grid grid-cols-3 gap-6">
                <div class="card">
                    <div class="text-center">
                        <div class="text-4xl mb-2">📊</div>
                        <h3 class="text-lg font-bold mb-2">Microsoft Power BI Data Analyst</h3>
                        <p class="text-primary-600 font-semibold mb-2">Microsoft</p>
                        <p class="text-gray-600 text-sm mb-4">
                            Certificação que valida habilidades em análise de dados usando Microsoft Power BI.
                        </p>
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">2023</span>
                    </div>
                </div>
                
                <div class="card">
                    <div class="text-center">
                        <div class="text-4xl mb-2">🔍</div>
                        <h3 class="text-lg font-bold mb-2">Google Data Analytics Certificate</h3>
                        <p class="text-primary-600 font-semibold mb-2">Google</p>
                        <p class="text-gray-600 text-sm mb-4">
                            Programa completo de análise de dados do Google, cobrindo todo o processo analítico.
                        </p>
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">2023</span>
                    </div>
                </div>
                
                <div class="card">
                    <div class="text-center">
                        <div class="text-4xl mb-2">💰</div>
                        <h3 class="text-lg font-bold mb-2">CPA-10 - Certificação ANBIMA</h3>
                        <p class="text-primary-600 font-semibold mb-2">ANBIMA</p>
                        <p class="text-gray-600 text-sm mb-4">
                            Certificação para profissionais que atuam na distribuição de produtos de investimento.
                        </p>
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">2021</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section">
        <div class="container">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4">
                    Entre em <span class="text-gradient">Contato</span>
                </h2>
                <p class="text-xl text-gray-600">
                    Vamos conversar sobre oportunidades, projetos ou colaborações
                </p>
            </div>
            
            <div class="grid grid-cols-2 gap-12">
                <div>
                    <h3 class="text-2xl font-bold mb-6">Informações de Contato</h3>
                    <div class="space-y-6">
                        <div class="flex items-start space-x-4">
                            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-xl">📧</div>
                            <div>
                                <h4 class="font-semibold mb-1">Email</h4>
                                <a href="mailto:malik.ribeiro@email.com" class="text-primary-600 font-medium">
                                    malik.ribeiro@email.com
                                </a>
                                <p class="text-gray-500 text-sm">Envie um email para discussões profissionais</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start space-x-4">
                            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-xl">📱</div>
                            <div>
                                <h4 class="font-semibold mb-1">WhatsApp</h4>
                                <a href="https://wa.me/5541999999999" class="text-primary-600 font-medium">
                                    +55 (41) 99999-9999
                                </a>
                                <p class="text-gray-500 text-sm">Contato direto via WhatsApp</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start space-x-4">
                            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-xl">💼</div>
                            <div>
                                <h4 class="font-semibold mb-1">LinkedIn</h4>
                                <a href="https://linkedin.com/in/malik-ribeiro-mourad" class="text-primary-600 font-medium">
                                    linkedin.com/in/malik-ribeiro-mourad
                                </a>
                                <p class="text-gray-500 text-sm">Conecte-se comigo no LinkedIn</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start space-x-4">
                            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-xl">📍</div>
                            <div>
                                <h4 class="font-semibold mb-1">Localização</h4>
                                <span class="text-gray-600 font-medium">Curitiba, PR - Brasil</span>
                                <p class="text-gray-500 text-sm">Disponível para trabalho remoto ou presencial</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h3 class="text-2xl font-bold mb-6">Envie uma Mensagem</h3>
                    <form class="space-y-6">
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                                <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="Seu nome completo">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                <input type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="seu@email.com">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Assunto *</label>
                            <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="Assunto da mensagem">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Mensagem *</label>
                            <textarea required rows="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none" placeholder="Descreva sua mensagem, projeto ou oportunidade..."></textarea>
                        </div>
                        
                        <button type="submit" class="w-full btn btn-primary py-4 text-lg font-semibold">
                            Enviar Mensagem
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white">
        <div class="container py-12">
            <div class="text-center">
                <h3 class="text-2xl font-bold text-gradient mb-2">Malik Ribeiro Mourad</h3>
                <p class="text-gray-300 text-lg mb-4">Analista de Dados | Desenvolvedor BI | Aspirante a Dev Web</p>
                <p class="text-gray-400 mb-8">
                    Especialista em Power BI, SQL, Python e Excel na Copel. Estudante de Análise e Desenvolvimento de Sistemas.
                </p>
                
                <div class="social-links mb-8">
                    <a href="https://linkedin.com/in/malik-ribeiro-mourad" target="_blank" aria-label="LinkedIn">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <a href="https://github.com/MalikRibeiro" target="_blank" aria-label="GitHub">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                    <a href="https://wa.me/5541999999999" target="_blank" aria-label="WhatsApp">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                    </a>
                    <a href="https://instagram.com/malikribeiro" target="_blank" aria-label="Instagram">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                </div>
                
                <div class="text-gray-400 text-sm">
                    © 2024 Malik Ribeiro Mourad. Todos os direitos reservados.
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header background on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.9)';
                header.style.boxShadow = 'none';
            }
        });

        // Form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Obrigado pela mensagem! Retornarei em breve.');
            this.reset();
        });
    </script>
</body>
</html>"""
    
    return html_content

if __name__ == "__main__":
    html_content = create_static_html()
    
    # Save the static HTML file
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("✅ Site estático gerado com sucesso!")
    print("📁 Arquivo: index.html")
    print("🌐 Pronto para deploy!")

