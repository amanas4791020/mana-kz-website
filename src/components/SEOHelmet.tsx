import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  schemaData?: Record<string, any>
}

export function SEOHelmet({
  title = 'Мастер Манас - Сантехник и Электрик в Алматы',
  description = 'Профессиональные сантехнические и электрические услуги в Алматы. Быстрый выезд, гарантия качества, честные цены. Звоните 24/7!',
  keywords = 'сантехник алматы, электрик алматы, вызов сантехника, ремонт сантехники, установка электрики',
  image = '/images/master-manas.png',
  url = window.location.href,
  type = 'website',
  schemaData
}: SEOProps) {
  
  useEffect(() => {
    // Устанавливаем основные мета-теги
    document.title = title
    
    const metaTags = [
      // Основные мета-теги
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'ru' },
      
      // Мобильные мета-теги
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      
      // Open Graph теги
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'Мастер Манас' },
      { property: 'og:locale', content: 'ru_RU' },
      
      // Twitter теги
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      // Telegram теги
      { property: 'telegram:channel', content: '@master_manas_almaty' },
      
      // Дополнительные теги для SEO
      { name: 'author', content: 'Мастер Манас' },
      { name: 'geo.region', content: 'KZ-75' },
      { name: 'geo.placename', content: 'Алматы' },
      { name: 'geo.position', content: '43.238949;76.889709' },
      { name: 'ICBM', content: '43.238949, 76.889709' },
      
      // Yandex
      { name: 'yandex-verification', content: 'verification_code_here' }
    ]
    
    // Удаляем существующие мета-теги
    const existingMetaTags = document.querySelectorAll('meta[name], meta[property]')
    existingMetaTags.forEach(tag => {
      const name = tag.getAttribute('name') || tag.getAttribute('property')
      if (name && metaTags.some(meta => meta.name === name || meta.property === name)) {
        tag.remove()
      }
    })
    
    // Добавляем новые мета-теги
    metaTags.forEach(meta => {
      const metaTag = document.createElement('meta')
      if ('name' in meta) {
        metaTag.setAttribute('name', meta.name)
      } else if ('property' in meta) {
        metaTag.setAttribute('property', meta.property)
      }
      metaTag.setAttribute('content', meta.content)
      document.head.appendChild(metaTag)
    })
    
    // Добавляем canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
    
    // Добавляем структурированные данные JSON-LD
    if (schemaData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]')
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.setAttribute('type', 'application/ld+json')
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(schemaData)
    }
    
  }, [title, description, keywords, image, url, type, schemaData])
  
  return null
}