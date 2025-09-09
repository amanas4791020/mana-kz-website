import { Link } from 'react-router-dom'
import { Star, Phone, ArrowRight, Clock, Shield } from 'lucide-react'
import { ServiceCard } from '../components/ServiceCard'
import { SEOHelmet } from '../components/SEOHelmet'
import { LazyImage } from '../components/LazyImage'
import { getLocalBusinessSchema, getWebsiteSchema } from '../lib/seo-schemas'
import { useEffect, useState } from 'react'

interface Service {
  id: string
  title: string
  description: string
  price: string
  icon: string
  category?: string
}

interface Review {
  name: string
  age?: number
  rating: number
  comment: string
}

export function HomePage() {
  const [popularServices, setPopularServices] = useState<Service[]>([])
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    fetch('/data/services-full.json')
      .then(res => res.json())
      .then(data => {
        const services = [
          data.plumbing[0],
          data.electrical[0],
          data.plumbing[1],
          data.appliances[0]
        ]
        setPopularServices(services)
      })
      .catch(error => {
        console.error('Error loading services:', error)
      })

    fetch('/data/reviews.json')
      .then(res => res.json())
      .then(data => {
        setReviews(data.slice(0, 3))
      })
      .catch(error => {
        console.error('Error loading reviews:', error)
      })
  }, [])

  return (
    <div className="min-h-screen">
      <SEOHelmet
        title="Мастер Манас - Сантехник и Электрик в Алматы | Вызов 24/7"
        description="⚡ Профессиональный сантехник и электрик в Алматы ⚡ Быстрый выезд 24/7 ⚡ Гарантия на все работы ⚡ Честные цены ⚡ Опыт 7+ лет ⚡ Звоните: +7 705 553 53 32, +7 707 479 10 20"
        keywords="сантехник алматы, электрик алматы, вызов сантехника 24/7, ремонт сантехники алматы, электромонтаж алматы, установка смесителей, замена проводки, мастер на час"
        type="website"
        schemaData={{
          ...getWebsiteSchema(),
          ...getLocalBusinessSchema()
        }}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Сантехнические и электрические услуги в Алматы
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Мастер <strong className="text-blue-600">Манас</strong> — многолетний опыт, 
                гарантия качества, быстрый выезд и честные цены.
              </p>

              <div className="flex items-center space-x-8 py-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">7+</div>
                  <div className="text-sm text-gray-600">лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">готов к вызову</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+77055535332" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 text-center inline-block"
                >
                  <Phone className="w-5 h-5 inline mr-2" />
                  Вызвать мастера Манаса
                </a>
                <Link to="/uslugi" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 text-center">
                  Все услуги
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <LazyImage 
                  src="/images/master-manas.png" 
                  alt="Мастер Манас - профессиональный сантехник и электрик в Алматы" 
                  className="w-80 h-80 object-cover rounded-2xl shadow-2xl"
                  width={320}
                  height={320}
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <div>
                      <div className="font-bold text-gray-900">4.62/5</div>
                      <div className="text-sm text-gray-600">13 отзывов</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Популярные сантехнические и электрические услуги в Алматы
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Наиболее востребованные сантехнические и электрические услуги
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {popularServices.map(service => (
              <ServiceCard 
                key={service.id}
                {...service}
              />
            ))}
          </div>
          <div className="text-center">
            <Link 
              to="/uslugi" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Все услуги
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают сантехника-электрика Манаса в Алматы
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Быстрый выезд</h3>
              <p className="text-gray-600">Приезжаю в течение часа после вызова</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Гарантия качества</h3>
              <p className="text-gray-600">Предоставляю гарантию на все работы</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Профессионализм</h3>
              <p className="text-gray-600">Многолетний опыт и современные технологии</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Отзывы о работе сантехника и электрика в Алматы
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-xl font-semibold text-gray-700">4.62 из 5</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Нужны сантехнические или электрические услуги?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Звоните прямо сейчас! Быстрый выезд и гарантия качества.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+77055535332" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              <Phone className="w-5 h-5 inline mr-2" />
              +7 705 553 53 32
            </a>
            <a 
              href="tel:+77074791020" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              <Phone className="w-5 h-5 inline mr-2" />
              +7 707 479 10 20
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
