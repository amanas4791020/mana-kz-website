import { Star, Award, Clock, Users, Wrench, Phone, MapPin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const skills = [
  { name: 'Сантехнические работы', level: 95, years: '8+ лет' },
  { name: 'Электромонтаж', level: 90, years: '6+ лет' },
  { name: 'Установка оборудования', level: 92, years: '7+ лет' },
  { name: 'Аварийный ремонт', level: 88, years: '5+ лет' }
]

const achievements = [
  { icon: Users, title: '500+', subtitle: 'Довольных клиентов' },
  { icon: Award, title: '4.8/5', subtitle: 'Средний рейтинг' },
  { icon: Clock, title: '24/7', subtitle: 'Аварийная служба' },
  { icon: Wrench, title: '1000+', subtitle: 'Выполненных работ' }
]

const certifications = [
  'Сертификат электробезопасности до 1000В',
  'Удостоверение сантехника 4 разряда',
  'Свидетельство о повышении квалификации',
  'Лицензия на работу с газовым оборудованием'
]

const testimonials = [
  {
    name: 'Валентин',
    age: 54,
    rating: 5,
    comment: 'Отличный мастер, как профессионал. С удовольствием буду обращаться.'
  },
  {
    name: 'Жулдыз',
    age: 45,
    rating: 5,
    comment: 'Вот что значит настоящий профессионал своего дела. Обращайтесь, не пожалеете.'
  },
  {
    name: 'Вячеслав',
    age: 34,
    rating: 5,
    comment: 'Выражаю большую благодарность Манасу за работу. Пришел вовремя, без опозданий.'
  }
]

export function AboutPage() {
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
              <span className="text-gray-900 font-medium">О мастере</span>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Photo and Basic Info */}
            <div className="p-8">
              <div className="flex flex-col items-center text-center">
                <img 
                  src="/images/master-manas.png" 
                  alt="Мастер Манас" 
                  className="w-48 h-48 rounded-full object-cover border-4 border-blue-100 mb-6"
                />
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Мастер Манас
                </h1>
                <p className="text-xl text-blue-600 mb-4">Сантехник-универсал в Алматы</p>
                <div className="flex items-center space-x-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className="w-5 h-5 fill-yellow-400 text-yellow-400" 
                    />
                  ))}
                  <span className="ml-2 text-gray-600">4.8 из 5 (500+ отзывов)</span>
                </div>
              </div>
            </div>

            {/* Experience and Contact */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Опыт и квалификация</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">15 лет в сфере</p>
                    <p className="text-gray-600">Профессиональный опыт</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">500+ клиентов</p>
                    <p className="text-gray-600">Довольных заказчиков</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">24/7 вызовы</p>
                    <p className="text-gray-600">Аварийная служба</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Алматы и пригород</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div className="space-y-1">
                    <div>+77055535332</div>
                    <div>+77074791020</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>amanas4791020@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">О мастере</h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  Здравствуйте! Меня зовут Манас, и я профессиональный сантехник с более чем 15-летним опытом работы в Алматы. 
                  За эти годы я помог сотням семей решить проблемы с водоснабжением, канализацией и сантехническим оборудованием.
                </p>
                
                <p>
                  Моя специализация включает в себя не только классические сантехнические работы, но и электромонтаж, 
                  установку бытовой техники, аварийный ремонт. Я работаю как с частными клиентами, так и с организациями, 
                  всегда стремясь к максимальному качеству и надежности выполняемых работ.
                </p>
                
                <p>
                  Особое внимание уделяю качеству материалов и современным технологиям. Использую только проверенные 
                  комплектующие от надежных производителей, что позволяет гарантировать долговечность всех выполненных работ.
                </p>
                
                <p>
                  Для меня важен индивидуальный подход к каждому клиенту. Я всегда готов проконсультировать, 
                  объяснить суть проблемы простыми словами и предложить оптимальное решение с учетом вашего бюджета.
                </p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Достижения</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {achievement.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {achievement.subtitle}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Профессиональные навыки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <span className="text-sm text-gray-600">{skill.years}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  {skill.level}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Сертификаты и документы</h2>
            <ul className="space-y-3">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Philosophy */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Принципы работы</h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Пунктуальность</p>
                  <p className="text-gray-600 text-sm">Всегда прихожу вовремя, уважаю ваше время</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Честные цены</p>
                  <p className="text-gray-600 text-sm">Никаких скрытых доплат, все расценки обговариваются заранее</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Гарантия качества</p>
                  <p className="text-gray-600 text-sm">Даю гарантию на все виды выполняемых работ</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Аккуратность</p>
                  <p className="text-gray-600 text-sm">Бережно отношусь к вашему имуществу, убираю за собой</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Отзывы клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${
                        star <= testimonial.rating 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{testimonial.name}</p>
                  {testimonial.age && <p>{testimonial.age} лет</p>}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link 
              to="/otzyvy" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Все отзывы
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Готов помочь с вашими задачами!</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Не важно, нужен ли вам срочный ремонт или плановая установка оборудования - 
            обращайтесь в любое время. Работаю быстро, качественно и с гарантией.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+77771234567" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Позвонить сейчас
            </a>
            <Link 
              to="/kontakty" 
              className="bg-blue-500 hover:bg-blue-400 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Все контакты
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}