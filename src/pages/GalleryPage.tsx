import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Calendar, MapPin, Wrench, Star, ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  category: string
  location: string
  date: string
  images: string[]
  difficulty: 'простой' | 'средний' | 'сложный'
  duration: string
  cost?: string
  client?: string
  rating: number
  services: string[]
}

const projects: Project[] = [
  {
    id: 'bathroom-renovation-almaty',
    title: 'Полная реконструкция ванной комнаты',
    description: 'Комплексная замена всей сантехники в ванной комнате: установка новой ванны, душевой кабины, унитаза, раковины. Прокладка новых труб водоснабжения и канализации.',
    category: 'сантехника',
    location: 'мкр. Коктем, Алматы',
    date: '2025-07-15',
    images: ['/images/service_illustration_1.png', '/images/service_illustration_2.png'],
    difficulty: 'сложный',
    duration: '5 дней',
    cost: '180,000 ₸',
    client: 'Валентин К.',
    rating: 5,
    services: ['Замена труб', 'Установка сантехники', 'Подключение канализации']
  },
  {
    id: 'kitchen-plumbing-setup',
    title: 'Установка кухонной сантехники',
    description: 'Установка мойки, смесителя, подключение посудомоечной и стиральной машины. Прокладка труб для подачи воды и отвода.',
    category: 'сантехника',
    location: 'ул. Абая, Алматы',
    date: '2025-07-10',
    images: ['/images/service_illustration_2.png'],
    difficulty: 'средний',
    duration: '2 дня',
    cost: '85,000 ₸',
    client: 'Жулдыз А.',
    rating: 5,
    services: ['Установка мойки', 'Подключение техники', 'Проводка труб']
  },
  {
    id: 'electrical-installation',
    title: 'Электромонтаж в новостройке',
    description: 'Комплексные электромонтажные работы: разводка электричества, установка розеток, выключателей, подключение освещения.',
    category: 'электрика',
    location: 'ЖК Северное сияние',
    date: '2025-06-28',
    images: ['/images/service_illustration_1.png'],
    difficulty: 'сложный',
    duration: '7 дней',
    cost: '220,000 ₸',
    client: 'Вячеслав П.',
    rating: 5,
    services: ['Разводка проводки', 'Установка розеток', 'Подключение освещения']
  },
  {
    id: 'emergency-pipe-repair',
    title: 'Аварийный ремонт трубы',
    description: 'Срочный ремонт прорвавшейся трубы отопления в квартире. Замена поврежденного участка, восстановление системы.',
    category: 'аварийный ремонт',
    location: 'мкр. Самал-2',
    date: '2025-06-20',
    images: ['/images/service_illustration_2.png'],
    difficulty: 'простой',
    duration: '4 часа',
    cost: '35,000 ₸',
    client: 'Шолпан М.',
    rating: 5,
    services: ['Замена труб', 'Аварийный ремонт']
  },
  {
    id: 'water-heater-installation',
    title: 'Установка водонагревателя',
    description: 'Установка и подключение накопительного водонагревателя на 80 литров, включая монтаж группы безопасности и УЗО.',
    category: 'сантехника',
    location: 'пр. Достык',
    date: '2025-06-15',
    images: ['/images/service_illustration_1.png'],
    difficulty: 'средний',
    duration: '1 день',
    cost: '45,000 ₸',
    client: 'Александр Л.',
    rating: 5,
    services: ['Установка водонагревателя', 'Электрическое подключение']
  },
  {
    id: 'kitchen-lighting',
    title: 'Установка подсветки кухни',
    description: 'Монтаж светодиодной подсветки рабочей зоны кухни, установка выключателей и диммеров.',
    category: 'электрика',
    location: 'мкр. Мамыр-7',
    date: '2025-06-10',
    images: ['/images/service_illustration_2.png'],
    difficulty: 'простой',
    duration: '3 часа',
    cost: '25,000 ₸',
    client: 'Сандугаш К.',
    rating: 4,
    services: ['Установка освещения', 'Электромонтаж']
  }
]

const categories = ['все', 'сантехника', 'электрика', 'аварийный ремонт']

const difficultyColors = {
  'простой': 'bg-green-100 text-green-700',
  'средний': 'bg-yellow-100 text-yellow-700',
  'сложный': 'bg-red-100 text-red-700'
}

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('все')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'все' || project.category === selectedCategory
  )

  const getCategoryCount = (category: string) => {
    if (category === 'все') return projects.length
    return projects.filter(p => p.category === category).length
  }

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject && currentImageIndex < selectedProject.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
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
              <span className="text-gray-900 font-medium">Галерея работ</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Галерея выполненных работ
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Примеры качественно выполненных проектов по сантехнике, электрике и аварийному ремонту. 
            Каждая работа выполнена с гарантией и соблюдением всех технических требований.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Категории работ</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                        selectedCategory === category 
                          ? 'bg-blue-100 text-blue-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="capitalize">{category}</span>
                      <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {getCategoryCount(category)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Статистика</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Всего проектов:</span>
                    <span className="font-bold text-blue-600">{projects.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Средний рейтинг:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-yellow-600">
                        {(projects.reduce((sum, p) => sum + p.rating, 0) / projects.length).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Довольных клиентов:</span>
                    <span className="font-bold text-green-600">100%</span>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3">Нужен похожий проект?</h3>
                <p className="text-blue-700 mb-4 text-sm">
                  Обсудим ваш проект и рассчитаем стоимость работ
                </p>
                <Link 
                  to="/kontakty" 
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Связаться со мной
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Показано проектов: <span className="font-semibold">{filteredProjects.length}</span>
                {selectedCategory !== 'все' && (
                  <span> в категории "<span className="font-semibold capitalize">{selectedCategory}</span>"</span>
                )}
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 group">
                  {/* Project Image */}
                  <div className="relative aspect-video bg-gray-200 overflow-hidden">
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <button 
                        onClick={() => openModal(project)}
                        className="bg-white bg-opacity-0 group-hover:bg-opacity-90 text-white group-hover:text-gray-900 p-3 rounded-full transition-all duration-300 transform scale-0 group-hover:scale-100"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full capitalize">
                        {project.category}
                      </span>
                    </div>
                    {/* Difficulty Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[project.difficulty]}`}>
                        {project.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(project.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Wrench className="w-4 h-4 mr-2" />
                        <span>{project.duration}</span>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.services.slice(0, 2).map((service, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {service}
                          </span>
                        ))}
                        {project.services.length > 2 && (
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            +{project.services.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between">
                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${
                              star <= project.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      
                      {/* Cost */}
                      {project.cost && (
                        <span className="text-blue-600 font-bold text-sm">
                          {project.cost}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Проекты не найдены</h3>
                <p className="text-gray-600 mb-4">
                  В выбранной категории пока нет завершенных проектов
                </p>
                <button
                  onClick={() => setSelectedCategory('все')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Показать все проекты
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Images */}
                  <div>
                    <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                      <img 
                        src={selectedProject.images[currentImageIndex]} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                      {selectedProject.images.length > 1 && (
                        <>
                          <button 
                            onClick={prevImage}
                            disabled={currentImageIndex === 0}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full disabled:opacity-50"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={nextImage}
                            disabled={currentImageIndex === selectedProject.images.length - 1}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full disabled:opacity-50"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                    {selectedProject.images.length > 1 && (
                      <div className="flex space-x-2">
                        {selectedProject.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-16 h-12 rounded border-2 overflow-hidden ${
                              index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
                            }`}
                          >
                            <img 
                              src={selectedProject.images[index]} 
                              alt={`${selectedProject.title} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div>
                    <p className="text-gray-700 mb-6">{selectedProject.description}</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Категория:</span>
                        <span className="font-medium capitalize">{selectedProject.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Сложность:</span>
                        <span className={`font-medium px-2 py-1 rounded text-sm ${difficultyColors[selectedProject.difficulty]}`}>
                          {selectedProject.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Длительность:</span>
                        <span className="font-medium">{selectedProject.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Местоположение:</span>
                        <span className="font-medium">{selectedProject.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Дата завершения:</span>
                        <span className="font-medium">{formatDate(selectedProject.date)}</span>
                      </div>
                      {selectedProject.cost && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Стоимость:</span>
                          <span className="font-bold text-blue-600">{selectedProject.cost}</span>
                        </div>
                      )}
                      {selectedProject.client && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Клиент:</span>
                          <span className="font-medium">{selectedProject.client}</span>
                        </div>
                      )}
                    </div>

                    {/* Services */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-2">Выполненные работы:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.services.map((service, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Оценка клиента:</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-5 h-5 ${
                                star <= selectedProject.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                          <span className="font-medium ml-2">{selectedProject.rating}/5</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="border-t pt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Нужен похожий проект?</h4>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a 
                          href="tel:+77771234567" 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                        >
                          Позвонить сейчас
                        </a>
                        <Link 
                          to="/kontakty" 
                          className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors text-center flex items-center justify-center"
                        >
                          Все контакты
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}