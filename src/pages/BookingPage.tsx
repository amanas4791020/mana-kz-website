import { useState } from 'react'
import { SEOHelmet } from '../components/SEOHelmet'
import { OnlineBooking } from '../components/OnlineBooking'
import { WhatsAppWidget } from '../components/WhatsAppWidget'
import { Calendar, Clock, CreditCard, CheckCircle, Star, Shield } from 'lucide-react'

export function BookingPage() {
  const [bookingData, setBookingData] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHelmet
        title="Онлайн бронирование мастера | Мастер Манас Алматы"
        description="Онлайн бронирование вызова мастера в Алматы. Выберите удобное время, забронируйте сантехника или электрика на конкретное время."
        keywords="онлайн бронирование мастера, запись к сантехнику алматы, бронь электрика, мастер манас запись"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-blue-500 bg-opacity-20 rounded-full px-4 py-2 mb-6">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="font-medium">Онлайн бронирование</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Забронируйте мастера онлайн
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Выберите услугу, дату и время, которое вам удобно. Мы гарантируем точность и качество выполнения всех работ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Легкое бронирование</h3>
                <p className="text-blue-100 text-sm">Простая форма в 3 шага</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Гибкое время</h3>
                <p className="text-blue-100 text-sm">Выберите удобное время</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Прозрачные цены</h3>
                <p className="text-blue-100 text-sm">Знаете стоимость заранее</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Мгновенное подтверждение</h3>
                <p className="text-blue-100 text-sm">Ответ в течение 5 минут</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <OnlineBooking />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Преимущества онлайн-бронирования
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Планирование заранее</h3>
                <p className="text-gray-600">Забронируйте мастера на удобное для вас время и планируйте свой день заранее</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Экономия времени</h3>
                <p className="text-gray-600">Не нужно ждать ответа по телефону - бронируйте в любое время суток</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Прозрачность цен</h3>
                <p className="text-gray-600">Узнайте точную стоимость услуг еще до приезда мастера</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Мгновенное подтверждение</h3>
                <p className="text-gray-600">Получаете мгновенное подтверждение бронирования и SMS-напоминание</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Качество гарантировано</h3>
                <p className="text-gray-600">Опыт 7+ лет, собственные инструменты и гарантия на все работы</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Надежность</h3>
                <p className="text-gray-600">Все ваши данные защищены, а выполнение брони гарантировано</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Услуги, доступные для бронирования
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Базовая сантехника</h3>
                  <span className="text-blue-600 font-bold">8,000 ₸</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Установка смесителей, мелкий ремонт</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>60 минут</span>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Сложная сантехника</h3>
                  <span className="text-blue-600 font-bold">15,000 ₸</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Установка сантехники, трубопроводы</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>120 минут</span>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Базовая электрика</h3>
                  <span className="text-blue-600 font-bold">7,000 ₸</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Розетки, выключатели, лампы</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>60 минут</span>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Сложная электрика</h3>
                  <span className="text-blue-600 font-bold">20,000 ₸</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Проводка, щиты, освещение</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>180 минут</span>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Сборка мебели</h3>
                  <span className="text-blue-600 font-bold">12,000 ₸</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Шкафы, комоды, кровати</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>120 минут</span>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Муж на час</h3>
                  <span className="text-blue-600 font-bold">5,000 ₸</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Мелкий ремонт, установка кронштейнов</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>60 минут</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <div className="inline-flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-6 py-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-yellow-600 text-sm font-bold">!</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-yellow-800">Обратите внимание</div>
                  <div className="text-sm text-yellow-700">Окончательная стоимость может измениться после осмотра мастером</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Widget */}
      <WhatsAppWidget bookingData={bookingData} />
    </div>
  )
}