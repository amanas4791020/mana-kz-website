import { useState, useEffect } from 'react'
import { Calculator, MapPin, Clock, AlertCircle, MessageCircle } from 'lucide-react'

interface PricingData {
  [category: string]: {
    [subcategory: string]: {
      [service: string]: {
        min: number
        max: number
        unit: string
      }
    } | { min: number; max: number; unit: string }
  }
}

interface Districts {
  [key: string]: {
    multiplier: number
    name: string
  }
}

interface UrgencyLevels {
  [key: string]: {
    multiplier: number
    name: string
  }
}

interface ComplexityLevels {
  [key: string]: {
    multiplier: number
    name: string
  }
}

interface ServiceCalculatorProps {
  onCalculationComplete?: (result: { price: { min: number; max: number }; details: any }) => void
}

export function ServiceCalculator({ onCalculationComplete }: ServiceCalculatorProps) {
  const [pricingData, setPricingData] = useState<PricingData>({} as PricingData)
  const [districts, setDistricts] = useState<Districts>({} as Districts)
  const [urgencyLevels, setUrgencyLevels] = useState<UrgencyLevels>({} as UrgencyLevels)
  const [complexityLevels, setComplexityLevels] = useState<ComplexityLevels>({} as ComplexityLevels)
  const [loading, setLoading] = useState(true)
  
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedDistrict, setSelectedDistrict] = useState('center')
  const [selectedUrgency, setSelectedUrgency] = useState('normal')
  const [selectedComplexity, setSelectedComplexity] = useState('simple')
  const [calculatedPrice, setCalculatedPrice] = useState<{ min: number; max: number } | null>(null)

  useEffect(() => {
    fetch('/data/pricing.json')
      .then(res => res.json())
      .then(data => {
        setPricingData(data)
        setDistricts(data.districts || {})
        setUrgencyLevels(data.urgency || {})
        setComplexityLevels(data.complexity || {})
        setLoading(false)
      })
      .catch(error => {
        console.error('Ошибка загрузки данных о ценах:', error)
        setLoading(false)
      })
  }, [])

  const categoryNames: { [key: string]: string } = {
    plumbing: 'Сантехнические услуги',
    electrical: 'Электромонтажные работы',
    furniture: 'Сборка и установка мебели',
    minor_repairs: 'Мелкий бытовой ремонт'
  }

  const subcategoryNames: { [key: string]: { [key: string]: string } } = {
    plumbing: {
      installation: 'Установка сантехники',
      pipes: 'Работы с трубопроводами'
    },
    electrical: {
      basic: 'Базовые работы',
      lighting: 'Освещение',
      complex: 'Сложные работы'
    },
    furniture: {
      cabinet: 'Корпусная мебель',
      kitchen: 'Кухонная мебель',
      office: 'Офисная мебель',
      hourly_rate: 'Почасовая работа'
    },
    minor_repairs: {
      hourly: 'Почасовые услуги',
      specific: 'Конкретные работы'
    }
  }

  const serviceNames: { [key: string]: string } = {
    // Сантехника - Установка
    toilet: 'Установка унитаза',
    bathtub_simple: 'Установка простой ванны',
    bathtub_plastic: 'Установка пластиковой ванны',
    bathtub_hydro: 'Установка ванны с гидромассажем',
    shower_cabin: 'Установка душевой кабины',
    bidet: 'Установка биде',
    mixer: 'Установка смесителей',
    water_heater: 'Установка водонагревателей',
    water_meter: 'Установка счетчиков воды',
    towel_dryer: 'Установка полотенцесушителей',
    // Сантехника - Трубы
    water_pipe: 'Монтаж водопроводных труб',
    sewer_pipe: 'Монтаж канализационных труб',
    // Электрика - Базовые
    socket_switch: 'Установка розеток и выключателей',
    outlet_box: 'Монтаж подрозетников',
    bulb_replacement: 'Замена лампочек',
    spot_light: 'Подключение точечных светильников',
    // Электрика - Освещение
    chandelier: 'Установка люстр',
    wall_light: 'Установка настенных светильников',
    spot_light_install: 'Монтаж точечных светильников',
    chandelier_assembly: 'Сборка люстр',
    // Электрика - Сложные
    wire_routing_concrete: 'Штробление в бетоне',
    wire_routing_brick: 'Штробление в кирпиче',
    wire_routing_drywall: 'Штробление в гипсокартоне',
    electrical_panel: 'Установка электрощитов',
    wiring_installation: 'Монтаж электропроводки',
    // Мебель - Корпусная
    dresser: 'Комоды и тумбы',
    wardrobe_standard: 'Шкафы корпусные стандартные',
    wardrobe_sliding: 'Шкафы-купе',
    bed: 'Кровати',
    // Мебель - Кухонная
    kitchen_set: 'Сборка кухонного гарнитура',
    kitchen_full: 'Установка кухни под ключ',
    cooktop: 'Монтаж варочной панели',
    sink: 'Установка кухонной мойки',
    // Мебель - Офисная
    desk: 'Офисные столы',
    office_furniture: 'Сборка офисной мебели',
    hallway: 'Сборка прихожей',
    // Мелкий ремонт - Почасовые
    handyman: 'Мелкий бытовой ремонт',
    husband_hour: 'Муж на час',
    private_master: 'Частные мастера',
    // Мелкий ремонт - Конкретные
    drilling: 'Сверление стен',
    bracket: 'Установка кронштейнов',
    mirror_hanging: 'Навеска зеркал и картин',
    dryer_install: 'Установка сушилки для белья',
    hooks_hangers: 'Навеска крючков и вешалок',
    curtain_rod: 'Монтаж карнизов'
  }

  const calculatePrice = () => {
    if (!selectedCategory || !selectedSubcategory || !selectedService) return

    const category = pricingData[selectedCategory]
    if (!category) return

    let serviceData: { min: number; max: number; unit: string } | undefined

    if (selectedSubcategory === 'hourly_rate' && selectedCategory === 'furniture') {
      serviceData = category.hourly_rate as { min: number; max: number; unit: string }
    } else {
      const subcategory = category[selectedSubcategory] as { [key: string]: { min: number; max: number; unit: string } }
      if (subcategory) {
        serviceData = subcategory[selectedService]
      }
    }

    if (!serviceData) return

    const districtMultiplier = districts[selectedDistrict]?.multiplier || 1.0
    const urgencyMultiplier = urgencyLevels[selectedUrgency]?.multiplier || 1.0
    const complexityMultiplier = complexityLevels[selectedComplexity]?.multiplier || 1.0
    
    const totalMultiplier = districtMultiplier * urgencyMultiplier * complexityMultiplier
    
    const baseMin = serviceData.min * quantity
    const baseMax = serviceData.max * quantity
    
    const finalMin = Math.round(baseMin * totalMultiplier)
    const finalMax = Math.round(baseMax * totalMultiplier)

    const result = { min: finalMin, max: finalMax }
    setCalculatedPrice(result)

    if (onCalculationComplete) {
      onCalculationComplete({
        price: result,
        details: {
          service: serviceNames[selectedService] || selectedService,
          quantity,
          district: districts[selectedDistrict]?.name,
          urgency: urgencyLevels[selectedUrgency]?.name,
          complexity: complexityLevels[selectedComplexity]?.name,
          unit: serviceData.unit
        }
      })
    }
  }

  useEffect(() => {
    if (selectedCategory && selectedSubcategory && selectedService) {
      calculatePrice()
    }
  }, [selectedCategory, selectedSubcategory, selectedService, quantity, selectedDistrict, selectedUrgency, selectedComplexity])

  const getSubcategories = () => {
    if (!selectedCategory || !pricingData[selectedCategory]) return []
    const category = pricingData[selectedCategory]
    return Object.keys(category).filter(key => !['districts', 'urgency', 'complexity'].includes(key))
  }

  const getServices = () => {
    if (!selectedCategory || !selectedSubcategory) return []
    
    if (selectedSubcategory === 'hourly_rate' && selectedCategory === 'furniture') {
      return ['hourly_rate']
    }
    
    const category = pricingData[selectedCategory]
    if (!category) return []
    
    const subcategory = category[selectedSubcategory] as { [key: string]: any }
    if (!subcategory) return []
    
    return Object.keys(subcategory)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Загрузка калькулятора...</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Заголовок */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 p-6 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-400 to-transparent opacity-20 rounded-full transform translate-x-16 -translate-y-16" />
        <div className="flex items-center relative z-10">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Калькулятор стоимости</h2>
            <p className="text-blue-100 text-sm">Точный расчет цен на услуги в Алматы</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">

      <div className="space-y-6">
        {/* Выбор категории */}
        <div className="transform transition-all duration-300 hover:scale-105">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            Категория услуг
          </label>
          <select 
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gradient-to-r from-gray-50 to-white hover:shadow-md"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setSelectedSubcategory('')
              setSelectedService('')
              setCalculatedPrice(null)
            }}
          >
            <option value="">Выберите категорию услуг</option>
            {Object.keys(categoryNames).map(key => (
              <option key={key} value={key}>{categoryNames[key]}</option>
            ))}
          </select>
        </div>

        {/* Выбор подкатегории */}
        {selectedCategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип работ
            </label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedSubcategory}
              onChange={(e) => {
                setSelectedSubcategory(e.target.value)
                setSelectedService('')
                setCalculatedPrice(null)
              }}
            >
              <option value="">Выберите тип работ</option>
              {getSubcategories().map(key => (
                <option key={key} value={key}>
                  {subcategoryNames[selectedCategory]?.[key] || key}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Выбор услуги */}
        {selectedSubcategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Конкретная услуга
            </label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value)
              }}
            >
              <option value="">Выберите услугу</option>
              {getServices().map(key => (
                <option key={key} value={key}>
                  {serviceNames[key] || key}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Количество */}
        {selectedService && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Количество
              </label>
              <input 
                type="number" 
                min="1" 
                max="100" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>

            {/* Район */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Район Алматы
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                {Object.entries(districts).map(([key, district]) => (
                  <option key={key} value={key}>{district.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Срочность и сложность */}
        {selectedService && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Срочность
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
              >
                {Object.entries(urgencyLevels).map(([key, urgency]) => (
                  <option key={key} value={key}>{urgency.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                Сложность работ
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedComplexity}
                onChange={(e) => setSelectedComplexity(e.target.value)}
              >
                {Object.entries(complexityLevels).map(([key, complexity]) => (
                  <option key={key} value={key}>{complexity.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Результат расчета */}
      {calculatedPrice && (
        <div className="mt-8 transform transition-all duration-500 animate-slideInUp">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
            {/* Декоративные элементы */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-400 to-transparent opacity-30 rounded-full transform translate-x-16 -translate-y-16 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400 to-transparent opacity-20 rounded-full transform -translate-x-12 translate-y-12" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Расчет стоимости</h3>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2 animate-pulse">
                    {calculatedPrice.min === calculatedPrice.max 
                      ? `${calculatedPrice.min.toLocaleString()} ₸`
                      : `${calculatedPrice.min.toLocaleString()} - ${calculatedPrice.max.toLocaleString()} ₸`
                    }
                  </div>
                  <div className="text-blue-100 text-sm">
                    Окончательная стоимость может варьироваться
                  </div>
                </div>
              </div>
              
              {/* Кнопка отправить в WhatsApp */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => {
                    const message = `Здравствуйте! Просчитал стоимость услуги на вашем сайте:\n\nСтоимость: ${calculatedPrice.min === calculatedPrice.max ? `${calculatedPrice.min.toLocaleString()} ₸` : `${calculatedPrice.min.toLocaleString()} - ${calculatedPrice.max.toLocaleString()} ₸`}\n\nМожно ли выехать для оценки работ?`
                    const whatsappUrl = `https://wa.me/77771234567?text=${encodeURIComponent(message)}`
                    window.open(whatsappUrl, '_blank')
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Отправить в WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}