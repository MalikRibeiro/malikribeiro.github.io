# Guia de Deploy - Portfolio Malik Ribeiro Mourad

## 🚀 Opções de Deploy

### 1. GitHub Pages (Recomendado para início)

#### Vantagens
- ✅ Gratuito
- ✅ HTTPS automático
- ✅ Deploy automático via Git
- ✅ Domínio personalizado suportado

#### Passos para Deploy

1. **Preparar Repositório**
```bash
# Clone o repositório atual
git clone https://github.com/MalikRibeiro/malikribeiro.github.io.git
cd malikribeiro.github.io

# Substitua os arquivos pelos novos
cp index_optimized.html index.html
cp styles.css .
cp dark-mode.js .
cp contact.php .
cp sw.js .
cp site.webmanifest .
```

2. **Configurar GitHub Pages**
- Vá para Settings > Pages
- Source: Deploy from a branch
- Branch: main / root
- Save

3. **Configurar Domínio Personalizado (Opcional)**
```bash
# Adicione arquivo CNAME
echo "malikribeiro.dev" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

#### Limitações
- ❌ Não suporta PHP (formulário de contato não funcionará)
- ❌ Apenas arquivos estáticos

### 2. Netlify (Recomendado para funcionalidades completas)

#### Vantagens
- ✅ Suporte a formulários sem backend
- ✅ Functions serverless
- ✅ Deploy automático
- ✅ HTTPS gratuito
- ✅ CDN global

#### Passos para Deploy

1. **Conectar Repositório**
- Acesse [netlify.com](https://netlify.com)
- "New site from Git"
- Conecte seu repositório GitHub

2. **Configurar Build**
```yaml
# netlify.toml
[build]
  command = "cp index_optimized.html index.html"
  publish = "."

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/contact"
  to = "/.netlify/functions/contact"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

3. **Configurar Formulário (Netlify Forms)**
```html
<!-- Substitua o form em index_optimized.html -->
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden">
    <label>Don't fill this out: <input name="bot-field" /></label>
  </p>
  <!-- Resto do formulário -->
</form>
```

### 3. Vercel

#### Vantagens
- ✅ Deploy ultra-rápido
- ✅ Edge functions
- ✅ Analytics integrado
- ✅ Domínio personalizado

#### Passos para Deploy

1. **Instalar Vercel CLI**
```bash
npm i -g vercel
```

2. **Configurar Projeto**
```json
// vercel.json
{
  "builds": [
    {
      "src": "contact.php",
      "use": "@vercel/php"
    }
  ],
  "routes": [
    {
      "src": "/contact",
      "dest": "/contact.php"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

3. **Deploy**
```bash
vercel --prod
```

### 4. Hospedagem Tradicional (cPanel/WHM)

#### Para Hospedagens com PHP

1. **Upload via FTP/SFTP**
```bash
# Usando rsync
rsync -avz --delete ./ user@host:/public_html/
```

2. **Configurar .htaccess**
```apache
# .htaccess
RewriteEngine On

# HTTPS Redirect
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Gzip Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache Headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Security Headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

## 🔧 Configurações Pós-Deploy

### 1. Google Analytics

```html
<!-- Substitua GA_TRACKING_ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 2. Google Search Console

1. **Adicionar Propriedade**
   - Acesse [search.google.com/search-console](https://search.google.com/search-console)
   - Adicione sua URL
   - Verifique via HTML tag ou DNS

2. **Enviar Sitemap**
```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://malikribeiro.dev/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://malikribeiro.dev/#about</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Adicione outras páginas -->
</urlset>
```

### 3. Configurar Email (Formulário de Contato)

#### Para PHP
```php
// contact.php - Configurar SMTP
$to = 'malik.ribeiro@email.com';
$headers = [
    'From: noreply@malikribeiro.dev',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];
```

#### Para Netlify Forms
- Acesse Netlify Dashboard > Forms
- Configure notificações por email
- Adicione webhook se necessário

### 4. Monitoramento

#### Uptime Monitoring
```javascript
// Adicione ao final do index_optimized.html
<script>
// Ping para monitoramento
setInterval(() => {
  fetch('/health-check.php')
    .catch(() => console.log('Site offline'));
}, 300000); // 5 minutos
</script>
```

#### Performance Monitoring
```javascript
// Core Web Vitals
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

function sendToAnalytics(metric) {
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_label: metric.id,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## 🔒 Segurança

### 1. Headers de Segurança

```nginx
# nginx.conf
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;";
```

### 2. Rate Limiting (PHP)

```php
// rate-limit.php
session_start();
$max_requests = 5;
$time_window = 300; // 5 minutos

if (!isset($_SESSION['requests'])) {
    $_SESSION['requests'] = [];
}

$now = time();
$_SESSION['requests'] = array_filter($_SESSION['requests'], function($time) use ($now, $time_window) {
    return ($now - $time) < $time_window;
});

if (count($_SESSION['requests']) >= $max_requests) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests']);
    exit;
}

$_SESSION['requests'][] = $now;
```

## 📊 Otimização Contínua

### 1. Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.8.x
          lhci autorun
```

### 2. Performance Budget

```json
// budget.json
[
  {
    "path": "/*",
    "timings": [
      {
        "metric": "interactive",
        "budget": 3000
      },
      {
        "metric": "first-meaningful-paint",
        "budget": 1000
      }
    ],
    "resourceSizes": [
      {
        "resourceType": "script",
        "budget": 125
      },
      {
        "resourceType": "total",
        "budget": 300
      }
    ]
  }
]
```

## 🚀 Checklist de Deploy

### Pré-Deploy
- [ ] Testar localmente
- [ ] Validar HTML/CSS
- [ ] Verificar links quebrados
- [ ] Testar formulário de contato
- [ ] Verificar responsividade
- [ ] Testar modo escuro/claro

### Deploy
- [ ] Configurar domínio
- [ ] Habilitar HTTPS
- [ ] Configurar redirects
- [ ] Testar em produção
- [ ] Verificar Service Worker
- [ ] Testar PWA install

### Pós-Deploy
- [ ] Configurar Google Analytics
- [ ] Adicionar ao Search Console
- [ ] Enviar sitemap
- [ ] Configurar monitoramento
- [ ] Testar performance
- [ ] Verificar SEO

## 📞 Suporte

Para problemas de deploy:

1. **Verifique os logs** do serviço de hospedagem
2. **Teste localmente** antes de fazer deploy
3. **Consulte a documentação** da plataforma escolhida
4. **Entre em contato** se precisar de ajuda específica

---

**Boa sorte com o deploy! 🚀**

