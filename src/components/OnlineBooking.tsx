import { useState, useEffect } from 'react'
import { Calendar, Clock, User, Phone, CreditCard, CheckCircle } from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
  price?: number
}

interface BookingData {
  name: string
  phone: string
  email: string
  service: string
  date: Date | null
  timeSlot: string
  duration: number
  totalPrice: number
  notes: string
}

const SERVICE_TYPES = [
  {
    id: 'plumbing_basic',
    name: 'Базовая сантехника',
    duration: 60,
    price: 8000,
    description: 'Установка смесителей, мелкий ремонт'
  },
  {
    id: 'plumbing_complex',
    name: 'Сложная сантехника',
    duration: 120,
    price: 15000,
    description: 'Установка сантехники, трубопроводы'
  },
  {
    id: 'electrical_basic',
    name: 'Базовая электрика',
    duration: 60,
    price: 7000,
    description: 'Розетки, выключатели, лампы'
  },
  {
    id: 'electrical_complex',
    name: 'Сложная электрика',
    duration: 180,
    price: 20000,
    description: 'Проводка, щиты, освещение'
  },
  {
    id: 'furniture',
    name: 'Сборка мебели',
    duration: 120,
    price: 12000,
    description: 'Шкафы, комоды, кровати'
  },
  {
    id: 'handyman',
    name: 'Муж на час',
    duration: 60,
    price: 5000,
    description: 'Мелкий ремонт, установка кронштейнов'
  }
]

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
]

export function OnlineBooking() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: null,
    timeSlot: '',
    duration: 60,
    totalPrice: 0,
    notes: ''
  })
  
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)

  // Мок данные занятых слотов (в реальном проекте будут загружаться с сервера)
  const BOOKED_SLOTS: { [key: string]: string[] } = {
    [new Date().toDateString()]: ['10:00', '14:00', '16:00'],
    [new Date(Date.now() + 86400000).toDateString()]: ['09:00', '13:00', '18:00']
  }

  const generateTimeSlots = (selectedDate: Date, serviceDuration: number) => {
    const dateString = selectedDate.toDateString()
    const bookedSlots = BOOKED_SLOTS[dateString] || []
    
    return TIME_SLOTS.map(time => ({
      time,
      available: !bookedSlots.includes(time)
    }))
  }

  useEffect(() => {
    if (bookingData.date && bookingData.duration) {
      const slots = generateTimeSlots(bookingData.date, bookingData.duration)
      setAvailableSlots(slots)
    }
  }, [bookingData.date, bookingData.duration])

  const handleInputChange = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
    
    // Автоматический расчет стоимости при выборе услуги
    if (field === 'service') {
      const service = SERVICE_TYPES.find(s => s.id === value)
      if (service) {
        setBookingData(prev => ({
          ...prev,
          duration: service.duration,
          totalPrice: service.price
        }))
      }
    }
    
    // Удаляем ошибки при изменении
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {}
    
    if (step === 1) {
      if (!bookingData.name.trim()) newErrors.name = 'Укажите ваше имя'
      if (!bookingData.phone.trim()) newErrors.phone = 'Укажите номер телефона'
      if (!bookingData.service) newErrors.service = 'Выберите услугу'
    }
    
    if (step === 2) {
      if (!bookingData.date) newErrors.date = 'Выберите дату'
      if (!bookingData.timeSlot) newErrors.timeSlot = 'Выберите время'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleBookingSubmit = async () => {
    if (!validateStep(2)) return
    
    setIsLoading(true)
    
    try {
      // Здесь будет отправка на сервер
      await new Promise(resolve => setTimeout(resolve, 2000)) // Имитация запроса
      
      setIsBookingConfirmed(true)
      setCurrentStep(4)
    } catch (error) {
      alert('Ошибка при создании брони. Попробуйте еще раз.')
    } finally {
      setIsLoading(false)
    }
  }

  const generateWhatsAppBookingMessage = () => {
    const service = SERVICE_TYPES.find(s => s.id === bookingData.service)
    const date = bookingData.date?.toLocaleDateString('ru-RU')
    
    return `Здравствуйте! Хотел бы забронировать услугу:

` +
           `👤 Имя: ${bookingData.name}
` +
           `📱 Телефон: ${bookingData.phone}
` +
           `🔧 Услуга: ${service?.name}
` +
           `📅 Дата: ${date}
` +
           `⏰ Время: ${bookingData.timeSlot}
` +
           `⏱️ Продолжительность: ${bookingData.duration} мин
` +
           `💰 Стоимость: ${bookingData.totalPrice.toLocaleString()} ₸
` +
           `${bookingData.notes ? `📝 Примечания: ${bookingData.notes}` : ''}`
  }

  if (isBookingConfirmed) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Бронирование подтверждено!</h2>
        <p className="text-gray-600 mb-6">
          Мы свяжемся с вами в ближайшее время для подтверждения всех деталей.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">Детали бронирования:</h3>
          <div className="text-sm space-y-1">
            <div><strong>Услуга:</strong> {SERVICE_TYPES.find(s => s.id === bookingData.service)?.name}</div>
            <div><strong>Дата:</strong> {bookingData.date?.toLocaleDateString('ru-RU')}</div>
            <div><strong>Время:</strong> {bookingData.timeSlot}</div>
            <div><strong>Стоимость:</strong> {bookingData.totalPrice.toLocaleString()} ₸</div>
          </div>
        </div>
        <button
          onClick={() => {
            setIsBookingConfirmed(false)
            setCurrentStep(1)
            setBookingData({
              name: '',
              phone: '',
              email: '',
              service: '',
              date: null,
              timeSlot: '',
              duration: 60,
              totalPrice: 0,
              notes: ''
            })
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Создать новое бронирование
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      {/* Прогресс */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`h-1 w-16 ${
              currentStep > 1 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <div className={`h-1 w-16 ${
              currentStep > 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Шаг 1: Личные данные и услуга */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Личные данные и услуга</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Ваше имя *
                </label>
                <input
                  type="text"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={bookingData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Как к вам обращаться?"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Телефон *
                </label>
                <input
                  type="tel"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+7 (___)  ___-__-__"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (необязательно)
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={bookingData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Выберите услугу *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICE_TYPES.map(service => (
                  <label key={service.id} className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                    bookingData.service === service.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={bookingData.service === service.id}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      className="sr-only"
                    />
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {service.duration} мин
                        </span>
                        <span className="font-semibold text-blue-600">
                          {service.price.toLocaleString()} ₸
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
            </div>
          </div>
        )}

        {/* Шаг 2: Дата и время */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Выберите дату и время</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Дата обслуживания *
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={bookingData.date ? bookingData.date.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleInputChange('date', e.target.value ? new Date(e.target.value) : null)}
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Время начала *
                </label>
                {bookingData.date ? (
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {availableSlots.map(slot => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        className={`p-2 text-sm rounded border transition-all ${
                          bookingData.timeSlot === slot.time
                            ? 'bg-blue-600 text-white border-blue-600'
                            : slot.available
                              ? 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                              : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() => handleInputChange('timeSlot', slot.time)}
                      >
                        {slot.time}
                        {!slot.available && (
                          <div className="text-xs">Занято</div>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm p-4 border border-gray-200 rounded-lg">
                    Сначала выберите дату
                  </div>
                )}
                {errors.timeSlot && <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дополнительные пожелания
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
                value={bookingData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Опишите особенности работы или пожелания..."
              />
            </div>
          </div>
        )}

        {/* Шаг 3: Подтверждение */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Подтверждение бронирования</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Детали вашего бронирования:</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Клиент:</span>
                  <span>{bookingData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Телефон:</span>
                  <span>{bookingData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Услуга:</span>
                  <span>{SERVICE_TYPES.find(s => s.id === bookingData.service)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Дата:</span>
                  <span>{bookingData.date?.toLocaleDateString('ru-RU')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Время:</span>
                  <span>{bookingData.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Продолжительность:</span>
                  <span>{bookingData.duration} мин</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Общая стоимость:</span>
                  <span className="text-blue-600">{bookingData.totalPrice.toLocaleString()} ₸</span>
                </div>
              </div>
              
              {bookingData.notes && (
                <div className="mt-4 pt-4 border-t">
                  <span className="font-medium">Примечания:</span>
                  <p className="text-gray-600 mt-1">{bookingData.notes}</p>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Обратите внимание:</strong> Окончательная стоимость может измениться в зависимости от сложности работ. Мастер сообщит точную цену после осмотра.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleBookingSubmit}
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Обработка...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Подтвердить бронирование
                  </>
                )}
              </button>
              
              <a
                href={`https://wa.me/77771234567?text=${encodeURIComponent(generateWhatsAppBookingMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center flex items-center justify-center"
              >
                Отправить в WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Кнопки навигации */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              onClick={handlePrevStep}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Назад
            </button>
          )}
          
          {currentStep < 3 && (
            <button
              onClick={handleNextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
            >
              Далее
            </button>
          )}
        </div>
      </div>
    </div>
  )
}