import { useState } from 'react'
import { MessageCircle, X, Calculator, Calendar, Clock, MapPin } from 'lucide-react'

interface WhatsAppWidgetProps {
  phoneNumber?: string
  defaultMessage?: string
  calculatorData?: {
    service: string
    price: { min: number; max: number }
    details: any
  }
  bookingData?: {
    service: string
    date: Date
    time: string
    price: number
  }
}

type MessageType = 'general' | 'calculator' | 'booking' | 'emergency'

const QUICK_MESSAGES = {
  general: 'Здравствуйте! Меня интересуют ваши услуги.',
  emergency: 'Здравствуйте! Мне срочно нужен мастер! Можно ли приехать сегодня?',
  pricing: 'Здравствуйте! Можно узнать стоимость услуг?',
  consultation: 'Здравствуйте! Можно ли получить бесплатную консультацию?',
  master_call: 'Здравствуйте! Нужен мастер для выполнения работ. Когда можете приехать?',
  price_inquiry: 'Добрый день! Хотел бы узнать стоимость ваших услуг.'
}

export function WhatsAppWidget({
  phoneNumber = '77771234567',
  defaultMessage = QUICK_MESSAGES.general,
  calculatorData,
  bookingData
}: WhatsAppWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedMessageType, setSelectedMessageType] = useState<MessageType>('general')
  const [customMessage, setCustomMessage] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const generateCalculatorMessage = () => {
    if (!calculatorData) return QUICK_MESSAGES.general
    
    const { service, price, details } = calculatorData
    
    return `Здравствуйте! Просчитал стоимость услуги на вашем сайте:

` +
           `🔧 Услуга: ${service}
` +
           `💰 Расчетная стоимость: ${price.min === price.max ? `${price.min.toLocaleString()} ₸` : `${price.min.toLocaleString()} - ${price.max.toLocaleString()} ₸`}
` +
           `${details?.quantity ? `🔢 Количество: ${details.quantity} ${details.unit}\n` : ''}` +
           `${details?.district ? `📍 Район: ${details.district}\n` : ''}` +
           `${details?.urgency ? `⏰ Срочность: ${details.urgency}\n` : ''}` +
           `${details?.complexity ? `🛠️ Сложность: ${details.complexity}\n` : ''}\n` +
           `Можно ли выехать для оценки работ?`
  }

  const generateBookingMessage = () => {
    if (!bookingData) return QUICK_MESSAGES.general
    
    return `Здравствуйте! Хочу забронировать услугу:

` +
           `🔧 Услуга: ${bookingData.service}
` +
           `📅 Дата: ${bookingData.date.toLocaleDateString('ru-RU')}
` +
           `⏰ Время: ${bookingData.time}
` +
           `💰 Стоимость: ${bookingData.price.toLocaleString()} ₸

` +
           `Подтвердите, пожалуйста, бронирование.`
  }

  const getCurrentMessage = () => {
    if (showCustomInput) return customMessage
    
    switch (selectedMessageType) {
      case 'calculator':
        return calculatorData ? generateCalculatorMessage() : QUICK_MESSAGES.pricing
      case 'booking':
        return bookingData ? generateBookingMessage() : QUICK_MESSAGES.general
      case 'emergency':
        return QUICK_MESSAGES.emergency
      default:
        return QUICK_MESSAGES.general
    }
  }

  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    setIsExpanded(false)
  }

  const handleQuickMessage = (type: MessageType) => {
    setSelectedMessageType(type)
    setShowCustomInput(false)
    openWhatsApp(getCurrentMessage())
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Расширенное меню */}
      {isExpanded && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 overflow-hidden transform transition-all duration-300 animate-slideInUp">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white p-4 relative">
            {/* Декоративные элементы */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-400 to-transparent opacity-20 rounded-full transform translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400 to-transparent opacity-15 rounded-full transform -translate-x-12 translate-y-12" />
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Написать мастеру</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                    <span className="text-blue-100 text-xs">Онлайн</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white hover:text-blue-200 transition-colors duration-200 p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-blue-100 text-sm mt-3 relative z-10">
              Отвечаем обычно в течение 5 минут
            </p>
          </div>

          <div className="p-4">
            {/* Быстрые сообщения */}
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-medium text-gray-700">Быстрые сообщения:</h4>
              
              {/* Вызов мастера */}
              <button
                onClick={() => {
                  setSelectedMessageType('general')
                  setShowCustomInput(false)
                  openWhatsApp(QUICK_MESSAGES.master_call)
                }}
                className="w-full text-left p-3 rounded-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 transform hover:scale-105 hover:shadow-md"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-blue-800">Вызов мастера</span>
                    <div className="text-xs text-blue-600">Быстрый выезд на объект</div>
                  </div>
                </div>
              </button>

              {/* Консультация */}
              <button
                onClick={() => {
                  setSelectedMessageType('general')
                  setShowCustomInput(false)
                  openWhatsApp(QUICK_MESSAGES.consultation)
                }}
                className="w-full text-left p-3 rounded-lg border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-200 transform hover:scale-105 hover:shadow-md"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-orange-800">Консультация</span>
                    <div className="text-xs text-orange-600">Бесплатная консультация</div>
                  </div>
                </div>
              </button>

              {/* Узнать цену */}
              <button
                onClick={() => {
                  setSelectedMessageType('general')
                  setShowCustomInput(false)
                  openWhatsApp(QUICK_MESSAGES.price_inquiry)
                }}
                className="w-full text-left p-3 rounded-lg border-2 border-green-200 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-200 transform hover:scale-105 hover:shadow-md"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <Calculator className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-green-800">Узнать цену</span>
                    <div className="text-xs text-green-600">Расчет стоимости услуг</div>
                  </div>
                </div>
              </button>

              {calculatorData && (
                <button
                  onClick={() => handleQuickMessage('calculator')}
                  className="w-full text-left p-3 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Calculator className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-700">Отправить расчет</span>
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    {calculatorData.price.min === calculatorData.price.max 
                      ? `${calculatorData.price.min.toLocaleString()} ₸` 
                      : `${calculatorData.price.min.toLocaleString()} - ${calculatorData.price.max.toLocaleString()} ₸`
                    }
                  </div>
                </button>
              )}

              {bookingData && (
                <button
                  onClick={() => handleQuickMessage('booking')}
                  className="w-full text-left p-3 rounded-lg border border-green-200 bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-700">Подтвердить бронь</span>
                  </div>
                  <div className="text-xs text-green-600 mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {bookingData.date.toLocaleDateString('ru-RU')} в {bookingData.time}
                  </div>
                </button>
              )}

              <button
                onClick={() => handleQuickMessage('emergency')}
                className="w-full text-left p-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-600 rounded-full mr-2 animate-pulse" />
                  <span className="text-sm font-medium text-red-700">Срочный вызов</span>
                </div>
                <div className="text-xs text-red-600 mt-1">
                  Аварийная ситуация
                </div>
              </button>
            </div>

            {/* Произвольное сообщение */}
            <div className="border-t pt-4">
              {!showCustomInput ? (
                <button
                  onClick={() => setShowCustomInput(true)}
                  className="w-full text-center p-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Написать свое сообщение...
                </button>
              ) : (
                <div className="space-y-3">
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none"
                    rows={3}
                    placeholder="Напишите ваше сообщение..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        if (customMessage.trim()) {
                          openWhatsApp(customMessage)
                        }
                      }}
                      disabled={!customMessage.trim()}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Отправить
                    </button>
                    <button
                      onClick={() => {
                        setShowCustomInput(false)
                        setCustomMessage('')
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Контактная информация */}
            <div className="border-t pt-4 mt-4">
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Онлайн сейчас
                </div>
                <div>Удобное время: 8:00 - 22:00</div>
                <div>Аварийные вызовы: круглосуточно</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Основная кнопка */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group relative transform hover:scale-110 animate-bounce hover:animate-none"
      >
        {isExpanded ? (
          <X className="w-6 h-6 transition-transform duration-200" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
            {(calculatorData || bookingData) && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            )}
            
            {/* Пульсирующие кольца */}
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping" />
          </>
        )}
        
        {/* Тултип */}
        {!isExpanded && (
          <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-800 to-blue-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
            <div className="absolute top-1/2 left-full w-0 h-0 border-l-4 border-l-blue-800 border-t-2 border-b-2 border-t-transparent border-b-transparent transform -translate-y-1/2" />
            {calculatorData
              ? 'Отправить расчет'
              : bookingData
                ? 'Подтвердить бронь'
                : 'Написать в WhatsApp'
            }
          </span>
        )}
      </button>
    </div>
  )
}