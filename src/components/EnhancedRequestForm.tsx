import { useState } from 'react'
import { Upload, X, Calendar, Phone, User, MessageSquare, Camera, Clock } from 'lucide-react'

interface FormData {
  name: string
  phone: string
  service: string
  description: string
  preferredDate: Date | null
  preferredTime: string
  address: string
  urgency: string
}

interface EnhancedRequestFormProps {
  initialService?: string
  onSubmit?: (formData: FormData, photos: File[]) => void
}

export function EnhancedRequestForm({ initialService = '', onSubmit }: EnhancedRequestFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    service: initialService,
    description: '',
    preferredDate: null,
    preferredTime: '',
    address: '',
    urgency: 'normal'
  })
  
  const [photos, setPhotos] = useState<File[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  
  const serviceOptions = [
    { value: 'plumbing', label: 'Сантехнические работы' },
    { value: 'electrical', label: 'Электромонтажные работы' },
    { value: 'furniture', label: 'Сборка мебели' },
    { value: 'appliances', label: 'Ремонт бытовой техники' },
    { value: 'minor_repair', label: 'Мелкий ремонт' },
    { value: 'other', label: 'Другое' }
  ]
  
  const urgencyOptions = [
    { value: 'normal', label: 'Обычная (в течение дня)', multiplier: 1.0 },
    { value: 'urgent', label: 'Срочная (в течение 2-4 часов)', multiplier: 1.3 },
    { value: 'emergency', label: 'Аварийная (в течение часа)', multiplier: 1.5 }
  ]
  
  const timeSlots = [
    '8:00 - 10:00',
    '10:00 - 12:00', 
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00',
    '20:00 - 22:00'
  ]

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Удаляем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => {
      return file.type.startsWith('image/') && file.size < 10 * 1024 * 1024 // 10MB
    })
    
    if (validFiles.length + photos.length > 5) {
      setErrors(prev => ({ ...prev, photos: 'Максимум 5 фотографий' }))
      return
    }
    
    setPhotos(prev => [...prev, ...validFiles])
    setErrors(prev => ({ ...prev, photos: '' }))
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {}
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Укажите ваше имя'
      if (!formData.phone.trim()) newErrors.phone = 'Укажите номер телефона'
      if (!formData.service) newErrors.service = 'Выберите тип услуги'
    }
    
    if (step === 2) {
      if (!formData.description.trim()) newErrors.description = 'Опишите проблему'
      if (!formData.address.trim()) newErrors.address = 'Укажите адрес'
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

  const handleSubmit = async () => {
    if (!validateStep(2)) return
    
    setIsSubmitting(true)
    
    try {
      if (onSubmit) {
        await onSubmit(formData, photos)
      }
      
      // Здесь можно добавить отправку на сервер
      alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.')
      
      // Сброс формы
      setFormData({
        name: '',
        phone: '',
        service: '',
        description: '',
        preferredDate: null,
        preferredTime: '',
        address: '',
        urgency: 'normal'
      })
      setPhotos([])
      setCurrentStep(1)
    } catch (error) {
      alert('Ошибка отправки заявки. Пожалуйста, попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateWhatsAppMessage = () => {
    const service = serviceOptions.find(s => s.value === formData.service)?.label || formData.service
    const urgency = urgencyOptions.find(u => u.value === formData.urgency)?.label || 'Обычная'
    const date = formData.preferredDate ? formData.preferredDate.toLocaleDateString('ru-RU') : 'не указано'
    
    return `Здравствуйте! Хочу заказать услугу:

` +
           `👤 Имя: ${formData.name}
` +
           `📱 Телефон: ${formData.phone}
` +
           `🔧 Услуга: ${service}
` +
           `📝 Описание: ${formData.description}
` +
           `📍 Адрес: ${formData.address}
` +
           `📅 Желаемая дата: ${date}
` +
           `⏰ Время: ${formData.preferredTime || 'любое удобное'}
` +
           `🚨 Срочность: ${urgency}`
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
        {/* Шаг 1: Основная информация */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Основная информация</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Ваше имя
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Как к вам обращаться?"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Номер телефона
              </label>
              <input
                type="tel"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+7 (___)  ___-__-__"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тип услуги
              </label>
              <select
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.service ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
              >
                <option value="">Выберите тип услуги</option>
                {serviceOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Срочность
              </label>
              <div className="space-y-2">
                {urgencyOptions.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value={option.value}
                      checked={formData.urgency === option.value}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Шаг 2: Детали заказа */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Детали заказа</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Описание проблемы
              </label>
              <textarea
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Опишите подробно, что нужно сделать или какая возникла проблема..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Адрес
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Укажите точный адрес для выезда мастера"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Желаемая дата
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.preferredDate ? formData.preferredDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value ? new Date(e.target.value) : null)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Удобное время
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                >
                  <option value="">Любое время</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Загрузка фото */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Camera className="w-4 h-4 inline mr-1" />
                Фотографии проблемы (необязательно)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Нажмите для загрузки фотографий
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      PNG, JPG до 10MB (максимум 5 фото)
                    </p>
                  </div>
                </div>
              </div>
              {errors.photos && <p className="text-red-500 text-sm mt-1">{errors.photos}</p>}
              
              {/* Превью загруженных фото */}
              {photos.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Фото ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Шаг 3: Подтверждение */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Подтверждение заказа</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Детали вашего заказа:</h3>
              
              <div className="space-y-3 text-sm">
                <div><span className="font-medium">Имя:</span> {formData.name}</div>
                <div><span className="font-medium">Телефон:</span> {formData.phone}</div>
                <div><span className="font-medium">Услуга:</span> {serviceOptions.find(s => s.value === formData.service)?.label}</div>
                <div><span className="font-medium">Описание:</span> {formData.description}</div>
                <div><span className="font-medium">Адрес:</span> {formData.address}</div>
                <div><span className="font-medium">Дата:</span> {formData.preferredDate?.toLocaleDateString('ru-RU') || 'не указано'}</div>
                <div><span className="font-medium">Время:</span> {formData.preferredTime || 'любое'}</div>
                <div><span className="font-medium">Срочность:</span> {urgencyOptions.find(u => u.value === formData.urgency)?.label}</div>
                {photos.length > 0 && <div><span className="font-medium">Фотографий:</span> {photos.length}</div>}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? 'Отправка...' : 'Подтвердить заказ'}
              </button>
              
              <a
                href={`https://wa.me/77771234567?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
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