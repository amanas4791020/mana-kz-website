import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Phone, Star, ArrowLeft, CheckCircle, Clock, Shield, Wrench, Eye, X, Camera, DollarSign, FileText } from 'lucide-react'
import { SEOHelmet } from '../components/SEOHelmet'
import { getServiceSchema } from '../lib/seo-schemas'

interface Service {
  id: string
  title: string
  description: string
  price: string
  icon: string
  category?: string
}

export function ServiceDetailPage() {
  const { serviceId } = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [relatedServices, setRelatedServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [galleryData, setGalleryData] = useState<any>(null)
  const [servicesData, setServicesData] = useState<any>(null)

  useEffect(() => {
    // Load all data concurrently
    Promise.all([
      fetch('/data/services-full.json').then(res => res.json()),
      fetch('/data/gallery.json').then(res => res.json()),
      fetch('/data/services.json').then(res => res.json())
    ])
      .then(([servicesFullData, galleryDataRes, servicesDataRes]) => {
        // Find the service
        let foundService = null
        let serviceCategory = ''
        
        for (const [category, services] of Object.entries(servicesFullData)) {
          const found = (services as Service[]).find(s => s.id === serviceId)
          if (found) {
            foundService = found
            serviceCategory = category
            break
          }
        }
        
        setService(foundService)
        setGalleryData(galleryDataRes)
        setServicesData(servicesDataRes)
        
        // Get related services from the same category
        if (foundService && serviceCategory && servicesFullData[serviceCategory as keyof typeof servicesFullData]) {
          const related = (servicesFullData[serviceCategory as keyof typeof servicesFullData] as Service[])
            .filter(s => s.id !== serviceId)
            .slice(0, 3)
          setRelatedServices(related)
        }
        
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [serviceId])

  const getServiceDetails = (serviceId: string) => {
    if (!galleryData || !servicesData) {
      return {
        features: [
          'Профессиональное выполнение',
          'Качественные материалы',
          'Гарантия на работы',
          'Быстрый выезд',
          'Честные цены'
        ],
        process: [
          'Консультация по телефону',
          'Выезд мастера',
          'Диагностика и оценка',
          'Выполнение работ',
          'Проверка качества'
        ],
        examples: [],
        pricing: {
          'Консультация': 'Бесплатно',
          'Выезд мастера': 'Бесплатно',
          'Выполнение работ': 'по договоренности'
        }
      }
    }

    // Get work examples from gallery data
    const examples = galleryData.work_examples?.filter((ex: any) => 
      ex.service_id === serviceId
    ) || []

    // Get service-specific features and process
    const serviceSpecificData = {
      'vyzov-santehnika': {
        features: [
          'Выезд в течение часа',
          'Диагностика проблем',
          'Устранение протечек',
          'Прочистка засоров',
          'Аварийный ремонт'
        ],
        process: [
          'Звонок и описание проблемы',
          'Выезд мастера в течение часа',
          'Диагностика и оценка работ',
          'Согласование цены',
          'Выполнение ремонта',
          'Проверка качества работ'
        ],
        pricing: {
          'Выезд мастера': 'Бесплатно',
          'Диагностика': '1,000 ₸',
          'Устранение протечки': 'от 3,000 ₸',
          'Прочистка засора': 'от 2,500 ₸',
          'Аварийный ремонт': 'от 4,000 ₸'
        }
      },
      'ustanovka-smesitelya': {
        features: [
          'Демонтаж старого смесителя',
          'Подготовка места установки',
          'Установка нового смесителя',
          'Подключение к водопроводу',
          'Проверка герметичности',
          'Гарантия 1 год'
        ],
        process: [
          'Выбор и покупка смесителя',
          'Вызов мастера',
          'Демонтаж старого оборудования',
          'Установка нового смесителя',
          'Тестирование работы',
          'Уборка рабочего места'
        ],
        pricing: {
          'Установка обычного смесителя': '4,000 ₸',
          'Установка смесителя с душем': '5,000 ₸',
          'Демонтаж старого': '1,500 ₸',
          'Дополнительные материалы': 'по себестоимости'
        }
      },
      'ustanovka-lyustry': {
        features: [
          'Демонтаж старого светильника',
          'Подготовка электропроводки',
          'Установка крепления',
          'Подключение к электросети',
          'Проверка работы',
          'Настройка освещения'
        ],
        process: [
          'Отключение электричества',
          'Демонтаж старого светильника',
          'Проверка проводки',
          'Установка крепления',
          'Подключение люстры',
          'Тестирование работы'
        ],
        pricing: {
          'Установка люстры': 'от 3,000 ₸',
          'Демонтаж старой': '1,000 ₸',
          'Проверка проводки': '500 ₸',
          'Дополнительные работы': 'по договоренности'
        }
      }
    }

    const serviceData = serviceSpecificData[serviceId as keyof typeof serviceSpecificData] || {
      features: [
        'Профессиональное выполнение',
        'Качественные материалы', 
        'Гарантия на работы',
        'Быстрый выезд',
        'Честные цены'
      ],
      process: [
        'Консультация по телефону',
        'Выезд мастера',
        'Диагностика и оценка',
        'Выполнение работ',
        'Проверка качества'
      ],
      pricing: {
        'Консультация': 'Бесплатно',
        'Выезд мастера': 'Бесплатно', 
        'Выполнение работ': 'по договоренности'
      }
    }

    return {
      ...serviceData,
      examples: examples.length > 0 ? examples : [
        {
          title: 'Пример выполненной работы',
          image: '/images/service_illustration_1.png',
          description: 'Качественное выполнение работ'
        }
      ]
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <Wrench className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Услуга не найдена</h1>
          <p className="text-gray-600 mb-6">К сожалению, запрашиваемая услуга не существует</p>
          <Link 
            to="/uslugi" 
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Все услуги
          </Link>
        </div>
      </div>
    )
  }

  const serviceDetails = getServiceDetails(service.id)
  
  const getCategoryName = (category?: string) => {
    switch(category) {
      case 'emergency': return 'Срочно'
      case 'installation': return 'Установка'
      case 'repair': return 'Ремонт'
      case 'diagnostics': return 'Диагностика'
      case 'general': return 'Общие услуги'
      default: return null
    }
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      {service && (
        <SEOHelmet
          title={`${service.title} в Алматы - ${service.price} | Мастер Манас`}
          description={`${service.description} Быстрый выезд в день обращения. Гарантия на все работы. Цена: ${service.price}. Звоните: +7-747-430-31-81`}
          keywords={`${service.title.toLowerCase()}, ${service.title} алматы, ${service.title} цена, сантехник алматы, электрик алматы`}
          type="article"
          url={`https://master-manas.kz/uslugi/${serviceId}`}
          schemaData={getServiceSchema(service)}
        />
      )}
      
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-blue-600 hover:text-blue-700">
                Главная
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <Link to="/uslugi" className="text-blue-600 hover:text-blue-700">
                Услуги
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium">
                {service?.title || 'Загрузка...'}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="text-right ml-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {service.price}
                  </div>
                  {service.category && (
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {getCategoryName(service.category)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-6 border-t">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600 font-medium">Быстрый выезд</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600 font-medium">Гарантия качества</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">4.62 из 5</span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Что включено в услугу</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceDetails.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Как проходит работа</h2>
              <div className="space-y-4">
                {serviceDetails.process.map((step: string, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="pt-1">
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Examples */}
            {serviceDetails.examples && serviceDetails.examples.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Camera className="w-6 h-6 mr-3 text-blue-600" />
                  Примеры выполненных работ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceDetails.examples.map((example: any, index: number) => (
                    <div 
                      key={index} 
                      className="group cursor-pointer rounded-lg overflow-hidden border hover:shadow-lg transition-all"
                      onClick={() => setSelectedImage(example.image)}
                    >
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img 
                          src={example.image} 
                          alt={example.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder-work.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{example.title}</h3>
                        <p className="text-sm text-gray-600">{example.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Pricing */}
            {serviceDetails.pricing && (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="w-6 h-6 mr-3 text-blue-600" />
                  Подробные цены
                </h2>
                <div className="space-y-4">
                  {Object.entries(serviceDetails.pricing).map(([service, price]) => (
                    <div key={service} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700 font-medium">{service}</span>
                      <span className="text-blue-600 font-bold text-lg">{price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    ℹ️ Итоговая стоимость работ рассчитывается индивидуально после осмотра объекта.
                  </p>
                </div>
              </div>
            )}

            {/* How to Order */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                Как заказать услугу
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">По телефону</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <p className="text-gray-700">Позвоните по номеру</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <p className="text-gray-700">Опишите вашу проблему</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <p className="text-gray-700">Получите консультацию</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <p className="text-gray-700">Договоритесь о времени визита</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <a 
                      href="tel:+77055535332"
                      className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      <Phone className="w-5 h-5 inline mr-2" />
                      +7 705 553 53 32
                    </a>
                    <a 
                      href="tel:+77074791020"
                      className="block border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      <Phone className="w-5 h-5 inline mr-2" />
                      +7 707 479 10 20
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Через WhatsApp</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <p className="text-gray-700">Напишите в WhatsApp</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <p className="text-gray-700">Опришите фото проблемы</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <p className="text-gray-700">Получите оценку стоимости</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <p className="text-gray-700">Запланируйте визит</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a 
                      href="https://wa.me/77055535332"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      📱 Написать в WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Почему выбирают мастера Манаса</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">7+ лет опыта</h3>
                      <p className="text-gray-600">Многолетний опыт работы в сфере сантехники и электрики</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Быстрый выезд</h3>
                      <p className="text-gray-600">Выезжаем в течение часа после звонка</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Гарантия</h3>
                      <p className="text-gray-600">Предоставляем гарантию на все выполненные работы</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Высокий рейтинг</h3>
                      <p className="text-gray-600">4.62 из 5 звезд по отзывам клиентов</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Заказать услугу</h3>
              <div className="space-y-3">
                <a 
                  href="tel:+77055535332"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center block"
                >
                  <Phone className="w-5 h-5 inline mr-2" />
                  +7 705 553 53 32
                </a>
                <a 
                  href="tel:+77074791020"
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg font-medium transition-colors text-center block"
                >
                  <Phone className="w-5 h-5 inline mr-2" />
                  +7 707 479 10 20
                </a>
                <a 
                  href="https://wa.me/77055535332"
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📱 WhatsApp
                </a>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center font-medium">
                  ⏰ Работаем ежедневно
                </p>
                <p className="text-sm text-gray-600 text-center">
                  с 8:00 до 22:00
                </p>
              </div>
            </div>

            {/* Master Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Мастер Манас</h3>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/images/master-manas.png" 
                  alt="Мастер Манас" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <span className="font-bold text-gray-900">4.62</span>
                  </div>
                  <p className="text-sm text-gray-600">(13 отзывов)</p>
                  <p className="text-sm font-medium text-blue-600">7+ лет опыта</p>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Профессиональный сантехник</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Сертифицированный электрик</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Многолетний опыт работы</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Гарантия на все работы</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Похожие услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map(relatedService => (
                <Link
                  key={relatedService.id}
                  to={`/uslugi/${relatedService.id}`}
                  className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-all hover:-translate-y-1 group"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {relatedService.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {relatedService.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      {relatedService.price}
                    </span>
                    <span className="text-blue-600 text-sm font-medium group-hover:underline">
                      Подробнее →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Остались вопросы?</h2>
          <p className="text-blue-100 mb-6">
            Получите бесплатную консультацию по телефону или WhatsApp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+77055535332" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              📞 +7 705 553 53 32
            </a>
            <a 
              href="https://wa.me/77055535332"
              target="_blank"
              rel="noopener noreferrer" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              💬 Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-4xl p-4">
            <img 
              src={selectedImage} 
              alt="Пример работы" 
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}