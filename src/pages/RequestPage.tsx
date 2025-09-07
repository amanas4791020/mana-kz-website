import { SEOHelmet } from '../components/SEOHelmet'
import { EnhancedRequestForm } from '../components/EnhancedRequestForm'
import { WhatsAppWidget } from '../components/WhatsAppWidget'
import { FileText, Upload, Calendar, CheckCircle } from 'lucide-react'

export function RequestPage() {
  const handleFormSubmit = async (formData: any, photos: File[]) => {
    // Здесь будет логика отправки на сервер
    console.log('Данные формы:', formData)
    console.log('Фотографии:', photos)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHelmet
        title="Оставить заявку на вызов мастера | Мастер Манас Алматы"
        description="Оставьте заявку на вызов мастера в Алматы. Удобная форма с возможностью загрузки фото и выбора удобного времени."
        keywords="заявка мастер алматы, вызов сантехника, вызов электрика, онлайн заявка, мастер манас"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-blue-500 bg-opacity-20 rounded-full px-4 py-2 mb-6">
              <FileText className="w-5 h-5 mr-2" />
              <span className="font-medium">Онлайн заявка</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Оставить заявку на вызов мастера
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Удобная форма для быстрого оформления заявки. Мы свяжемся с вами в течение 5 минут
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Загрузка фото</h3>
                <p className="text-blue-100 text-sm">Прикрепите фото проблемы для точной оценки</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Выбор времени</h3>
                <p className="text-blue-100 text-sm">Укажите удобное для вас время визита</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Быстрая обработка</h3>
                <p className="text-blue-100 text-sm">Обрабатываем заявки в течение 5 минут</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <EnhancedRequestForm onSubmit={handleFormSubmit} />
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Почему стоит оставить заявку онлайн?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Удобство</h3>
                    <p className="text-gray-600">Оставьте заявку в любое время, не отвлекаясь от важных дел</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Точность</h3>
                    <p className="text-gray-600">Подробно опишите проблему и приложите фото для точной оценки</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Быстрая обратная связь</h3>
                    <p className="text-gray-600">Мы свяжемся с вами в течение 5 минут для уточнения деталей</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Планирование</h3>
                    <p className="text-gray-600">Выберите удобное время для визита мастера, мы подстроимся под ваш график</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Прозрачность</h3>
                    <p className="text-gray-600">Получите предварительную оценку стоимости еще до визита мастера</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Надежность</h3>
                    <p className="text-gray-600">Все ваши данные защищены, а качество работ гарантировано</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Нужна помощь прямо сейчас?
                </h3>
                <p className="text-gray-600 mb-6">
                  Позвоните нам по телефону или напишите в WhatsApp для мгновенной консультации
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:+77055535332" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                  >
                    ☎️ Позвонить: +7 705 553 53 32
                  </a>
                  <a 
                    href="https://wa.me/77055535332" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                  >
                    📱 Написать в WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  )
}