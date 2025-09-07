// Структурированные данные для различных типов страниц

// Основная информация о бизнесе
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Мастер Манас - Сантехнические и Электрические Услуги",
  "description": "Профессиональные сантехнические и электрические услуги в Алматы. Быстрый выезд, гарантия качества, честные цены.",
  "url": "https://master-manas.kz",
  "telephone": "+7-747-430-31-81",
  "priceRange": "$$",
  "currenciesAccepted": "KZT",
  "paymentAccepted": "Cash, Card",
  "hasMap": "https://maps.google.com/maps?q=Алматы",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Обслуживаем все районы",
    "addressLocality": "Алматы",
    "addressCountry": "KZ",
    "postalCode": "050000"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.238949,
    "longitude": 76.889709
  },
  "openingHours": "Mo-Su 00:00-24:00",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "13"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 43.238949,
      "longitude": 76.889709
    },
    "geoRadius": "50000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Сантехнические и электрические услуги",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Сантехнические услуги",
          "description": "Установка, ремонт сантехники, вызов сантехника"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Электрические услуги",
          "description": "Электромонтаж, ремонт электрики, установка освещения"
        }
      }
    ]
  }
})

// Схема для услуг
export const getServiceSchema = (service: any) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.description,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Мастер Манас",
    "telephone": "+7-747-430-31-81",
    "url": "https://master-manas.kz"
  },
  "areaServed": {
    "@type": "City",
    "name": "Алматы"
  },
  "offers": {
    "@type": "Offer",
    "price": service.price,
    "priceCurrency": "KZT",
    "availability": "https://schema.org/InStock"
  },
  "category": service.category || "Home Services",
  "serviceType": service.category || "Maintenance"
})

// Схема для отзывов
export const getReviewSchema = (reviews: any[]) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Мастер Манас",
  "review": reviews.map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.name
    },
    "datePublished": review.date || new Date().toISOString(),
    "reviewBody": review.comment,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5"
    }
  }))
})

// Схема для статьи блога
export const getBlogPostSchema = (post: any) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.excerpt,
  "articleBody": post.content?.replace(/<[^>]*>/g, ''), // удаляем HTML теги
  "datePublished": post.date,
  "dateModified": post.date,
  "author": {
    "@type": "Person",
    "name": post.author || "Мастер Манас"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Мастер Манас",
    "logo": {
      "@type": "ImageObject",
      "url": "https://master-manas.kz/images/master-manas.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://master-manas.kz/blog/${post.id}`
  },
  "articleSection": post.category || "Советы"
})

// Схема для FAQ
export const getFAQSchema = (faqs: any[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})

// Схема для страницы услуг
export const getServicesPageSchema = (services: any[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Сантехнические и электрические услуги в Алматы",
  "description": "Полный перечень услуг сантехника и электрика",
  "numberOfItems": services.length,
  "itemListElement": services.map((service, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "offers": {
        "@type": "Offer",
        "price": service.price,
        "priceCurrency": "KZT"
      }
    }
  }))
})

// Хлебные крошки
export const getBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
})

// Схема для главной страницы
export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Мастер Манас - Сантехник и Электрик в Алматы",
  "description": "Профессиональные сантехнические и электрические услуги в Алматы",
  "url": "https://master-manas.kz",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://master-manas.kz/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "sameAs": [
    "https://www.instagram.com/master_manas_almaty",
    "https://wa.me/77474303181"
  ]
})