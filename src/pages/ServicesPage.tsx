import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ServiceCard } from '../components/ServiceCard'
import { SEOHelmet } from '../components/SEOHelmet'
import { getServicesPageSchema } from '../lib/seo-schemas'
import { Filter, Search } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  price: string
  icon: string
  category?: string
}

interface ServicesData {
  plumbing: Service[]
  electrical: Service[]
  gas_heating: Service[]
  appliances: Service[]
}

const categoryNames = {
  plumbing: 'Сантехнические услуги',
  electrical: 'Электрические услуги', 
  gas_heating: 'Газ и отопление',
  appliances: 'Бытовая техника'
}

// Встраиваем данные услуг прямо в код для быстрой загрузки
const servicesData: ServicesData = {
  "plumbing": [
    {"id": "vyzov-santehnika", "title": "Вызов сантехника", "description": "Экстренный выезд квалифицированного специалиста для диагностики и устранения сантехнических неисправностей любой сложности. Доступен круглосуточно.", "price": "от 3500 тг", "icon": "wrench", "category": "emergency"},
    {"id": "ustanovka-smesitelya", "title": "Установка смесителя", "description": "Профессиональная установка смесителей любой сложности с гарантией качества.", "price": "от 5000 тг", "icon": "droplet", "category": "installation"},
    {"id": "remont-smesitelya", "title": "Ремонт смесителя", "description": "Качественный ремонт шаровых и вентильных смесителей с заменой комплектующих.", "price": "от 3500 тг", "icon": "settings", "category": "repair"},
    {"id": "remont-dushevih-kabin", "title": "Ремонт душевых кабин", "description": "Устранение неисправностей, замена комплектующих, герметизация душевых кабин.", "price": "от 6000 тг", "icon": "home", "category": "repair"},
    {"id": "ustanovka-vanny", "title": "Установка ванны", "description": "Демонтаж старой и установка новой ванны любого типа - чугунной, акриловой, стальной.", "price": "от 12000 тг", "icon": "container", "category": "installation"},
    {"id": "ustanovka-unitaza", "title": "Установка унитаза", "description": "Демонтаж, установка и подключение унитаза к канализационной системе.", "price": "от 8000 тг", "icon": "archive", "category": "installation"}
  ],
  "electrical": [
    {"id": "uslugi-elektrika", "title": "Услуги электрика", "description": "Полный спектр электромонтажных работ любой сложности в квартирах и домах.", "price": "от 2500 тг", "icon": "zap", "category": "general"},
    {"id": "remont-provodki", "title": "Устранение неисправностей в электропроводке", "description": "Диагностика и ремонт электропроводки, поиск и устранение коротких замыканий.", "price": "от 4000 тг", "icon": "activity", "category": "repair"},
    {"id": "ustanovka-lyustry", "title": "Установка и ремонт люстры", "description": "Монтаж, демонтаж, ремонт люстр, бра и других осветительных приборов.", "price": "от 3000 тг", "icon": "sun", "category": "installation"},
    {"id": "ustanovka-rozetok", "title": "Установка выключателей и розеток", "description": "Монтаж, замена, перенос розеток и выключателей. Установка влагозащищенных розеток.", "price": "от 2000 тг", "icon": "power", "category": "installation"}
  ],
  "gas_heating": [
    {"id": "ustanovka-gazovogo-kotla", "title": "Установка газового котла", "description": "Профессиональный монтаж газовых котлов отопления с соблюдением всех норм безопасности.", "price": "от 25000 тг", "icon": "flame", "category": "installation"},
    {"id": "ustanovka-gazovoi-plity", "title": "Установка газовой плиты", "description": "Подключение газовых плит к магистральному газу и баллонному газу.", "price": "от 8000 тг", "icon": "square", "category": "installation"}
  ],
  "appliances": [
    {"id": "remont-boilera", "title": "Ремонт бойлера", "description": "Ремонт электрических и газовых водонагревателей, замена ТЭНов, очистка от накипи.", "price": "от 5000 тг", "icon": "battery", "category": "repair"},
    {"id": "ustanovka-filtra-vody", "title": "Установка фильтра для воды", "description": "Монтаж систем водоочистки, фильтров обратного осмоса, проточных фильтров.", "price": "от 5500 тг", "icon": "filter", "category": "installation"}
  ]
}

export function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all')
  const [searchTerm, setSearchTerm] = useState('')

  // Используем встроенные данные вместо загрузки через fetch
  const services = servicesData

  useEffect(() => {
    if (selectedCategory === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', selectedCategory)
    }
    setSearchParams(searchParams, { replace: true })
  }, [selectedCategory])

  const getAllServices = () => {
    const allServices = []
    for (const [category, serviceList] of Object.entries(services)) {
      allServices.push(...serviceList.map(service => ({
        ...service,
        categoryName: categoryNames[category as keyof typeof categoryNames]
      })))
    }
    return allServices
  }

  const getFilteredServices = () => {
    let filteredServices = []
    
    if (selectedCategory === 'all') {
      filteredServices = getAllServices()
    } else {
      filteredServices = services[selectedCategory as keyof ServicesData]?.map(service => ({
        ...service,
        categoryName: categoryNames[selectedCategory as keyof typeof categoryNames]
      })) || []
    }

    // Apply search filter
    if (searchTerm) {
      filteredServices = filteredServices.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filteredServices
  }

  const filteredServices = getFilteredServices()

  const allServices = getAllServices()
  
  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <SEOHelmet
        title="Сантехнические и электрические услуги в Алматы | Цены 2025"
        description="🔧 Все виды сантехнических и электрических услуг в Алматы ⚡ Вызов мастера 24/7 ⚡ Установка, ремонт сантехники и электрики ⚡ Актуальные цены 2025 ⚡ Гарантия"
        keywords="услуги сантехника алматы, услуги электрика алматы, цены на сантехнику, ремонт электрики алматы, установка сантехники, вызов электрика"
        type="website"
        url="https://master-manas.kz/uslugi"
        schemaData={getServicesPageSchema(allServices)}
      />
      
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
              <span className="text-gray-900 font-medium">Услуги</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Сантехнические и электрические услуги в Алматы
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Профессиональные сантехнические и электрические услуги в Алматы. 
            Быстрый выезд, гарантия качества, честные цены.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск услуг..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 mr-2 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">Категории услуг</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Все услуги ({getAllServices().length})
              </button>
              <button
                onClick={() => setSelectedCategory('plumbing')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'plumbing' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Сантехника ({services.plumbing.length})
              </button>
              <button
                onClick={() => setSelectedCategory('electrical')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'electrical' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Электрика ({services.electrical.length})
              </button>
              <button
                onClick={() => setSelectedCategory('gas_heating')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'gas_heating' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Газ и отопление ({services.gas_heating.length})
              </button>
              <button
                onClick={() => setSelectedCategory('appliances')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'appliances' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Бытовая техника ({services.appliances.length})
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Найдено услуг: <span className="font-semibold">{filteredServices.length}</span>
            {searchTerm && (
              <span> по запросу "<span className="font-semibold">{searchTerm}</span>"</span>
            )}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map(service => (
            <ServiceCard 
              key={service.id}
              {...service}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              По вашему запросу услуги не найдены.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Показать все услуги
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Не нашли нужную услугу?</h2>
          <p className="text-blue-100 mb-6">
            Звоните! Мастер Манас выполняет любые сантехнические и электрические работы
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+77055535332" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              +7 705 553 53 32
            </a>
            <a 
              href="tel:+77074791020" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              +7 707 479 10 20
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
