import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { SEOHelmet } from '../components/SEOHelmet'

export function ContactPage() {
  return (
    <>
      <SEOHelmet
        title="Контакты - Мастер Манас | Сантехник и Электрик в Алматы"
        description="Контактная информация мастера Манаса. Телефоны: +77055535332, +77074791020. Адрес: Алматы мкр Аксай 4-11. Быстрый выезд и консультации."
        keywords="контакты мастер манас, адрес сантехника алматы, телефон электрика алматы, мкр аксай"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Контакты
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Свяжитесь со мной для консультации или вызова мастера
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Cards */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  Как со мной связаться
                </h2>

                {/* Phone */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Телефоны для связи
                      </h3>
                      <div className="space-y-2">
                        <a 
                          href="tel:+77055535332"
                          className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-lg"
                        >
                          +7 705 553 53 32
                        </a>
                        <a 
                          href="tel:+77074791020"
                          className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-lg"
                        >
                          +7 707 479 10 20
                        </a>
                      </div>
                      <p className="text-gray-600 mt-2">
                        Звоните в любое время для экстренных вызовов
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Адрес
                      </h3>
                      <p className="text-gray-700 text-lg font-medium">
                        Алматы мкр Аксай 4-11
                      </p>
                      <p className="text-gray-600 mt-2">
                        Выезжаю по всему городу Алматы
                      </p>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Режим работы
                      </h3>
                      <p className="text-gray-700 text-lg font-medium">
                        Ежедневно: 8:00 - 22:00
                      </p>
                      <p className="text-gray-600 mt-2">
                        В экстренных случаях - круглосуточно
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        WhatsApp
                      </h3>
                      <a 
                        href="https://wa.me/77055535332"
                        className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Написать в WhatsApp
                      </a>
                      <p className="text-gray-600 mt-2">
                        Быстрое общение и отправка фото проблемы
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Быстрая заявка
                </h2>
                <p className="text-gray-600 mb-6">
                  Оставьте заявку, и я свяжусь с вами в ближайшее время
                </p>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Необходимая услуга
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Выберите услугу</option>
                      <option value="plumbing">Сантехнические работы</option>
                      <option value="electrical">Электромонтажные работы</option>
                      <option value="repair">Ремонт и обслуживание</option>
                      <option value="consultation">Консультация</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Описание проблемы
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Опишите вашу проблему или требуемую услугу"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Отправить заявку
                  </button>
                </form>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Мастер Манас</strong> - ваш надежный сантехник и электрик в Алматы. 
                    Быстрый выезд, качественная работа, честные цены!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Нужна срочная помощь?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Звоните прямо сейчас! Быстрый выезд и профессиональное решение любых проблем
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:+77055535332"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                +7 705 553 53 32
              </a>
              <a 
                href="tel:+77074791020"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                +7 707 479 10 20
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
