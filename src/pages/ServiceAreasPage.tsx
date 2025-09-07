import { useState } from 'react'
import { SEOHelmet } from '../components/SEOHelmet'
import { ServiceMap } from '../components/ServiceMap'
import { WhatsAppWidget } from '../components/WhatsAppWidget'
import { MapPin, Clock, DollarSign, Phone } from 'lucide-react'

export function ServiceAreasPage() {
  const [selectedLocation, setSelectedLocation] = useState<any>(null)

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHelmet
        title="Карта обслуживания и зоны выезда | Мастер Манас Алматы"
        description="Карта обслуживания мастера Манаса в Алматы. Посмотрите зоны выезда, узнайте стоимость и время подачи мастера в вашем районе."
        keywords="зоны обслуживания алматы, карта выезда мастера, сантехник районы алматы, стоимость выезда мастера"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-blue-500 bg-opacity-20 rounded-full px-4 py-2 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="font-medium">Карта обслуживания</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Зоны обслуживания в Алматы
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Посмотрите на карте, обслуживаем ли мы ваш район и узнайте стоимость выезда мастера
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">8 районов</h3>
                <p className="text-blue-100 text-sm">Обслуживаем все основные районы Алматы</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">До 60 минут</h3>
                <p className="text-blue-100 text-sm">Максимальное время подачи мастера</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Прозрачное ценообразование</h3>
                <p className="text-blue-100 text-sm">Стоимость зависит от расстояния</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ServiceMap onLocationSelect={handleLocationSelect} showPricing={true} />
        </div>
      </section>

      {/* Selected Location Info */}
      {selectedLocation && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Информация о выбранном адресе:
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Адрес:</div>
                    <div className="text-gray-600">{selectedLocation.address}</div>
                  </div>
                </div>
                
                {selectedLocation.zone ? (
                  <>
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full mr-3 mt-0.5" style={{ backgroundColor: selectedLocation.zone.color }}></div>
                      <div>
                        <div className="font-medium text-gray-900">Район:</div>
                        <div className="text-gray-600">{selectedLocation.zone.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <DollarSign className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Стоимость выезда:</div>
                        <div className="text-gray-600">{selectedLocation.zone.description}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Время подачи:</div>
                        <div className="text-gray-600">30-60 минут в зависимости от загруженности</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-red-500 rounded-full mr-3 mt-0.5"></div>
                    <div>
                      <div className="font-medium text-red-700">Обслуживание недоступно</div>
                      <div className="text-red-600">К сожалению, мы не обслуживаем этот район</div>
                    </div>
                  </div>
                )}
              </div>
              
              {selectedLocation.zone && (
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a 
                    href="/zayavka" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                  >
                    Оставить заявку
                  </a>
                  <a 
                    href="tel:+77055535332" 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center inline-flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Позвонить
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Districts Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Подробная информация по районам
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Центральные районы */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <h3 className="font-semibold text-gray-900">Центральные</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Центр</div>
                  <div>• Алмалинский</div>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <div className="text-sm font-medium text-green-800">Бесплатный выезд</div>
                  <div className="text-xs text-green-600 mt-1">Время подачи: 30-45 мин</div>
                </div>
              </div>
              
              {/* Близкие районы */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                  <h3 className="font-semibold text-gray-900">Близкие</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Бостандыкский</div>
                </div>
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <div className="text-sm font-medium text-blue-800">+5% к стоимости</div>
                  <div className="text-xs text-blue-600 mt-1">Время подачи: 35-50 мин</div>
                </div>
              </div>
              
              {/* Удаленные районы */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                  <h3 className="font-semibold text-gray-900">Удаленные</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Медеуский</div>
                  <div>• Ауэзовский</div>
                  <div>• Жетысуский</div>
                </div>
                <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                  <div className="text-sm font-medium text-orange-800">+10% к стоимости</div>
                  <div className="text-xs text-orange-600 mt-1">Время подачи: 40-60 мин</div>
                </div>
              </div>
              
              {/* Окраины */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                  <h3 className="font-semibold text-gray-900">Окраины</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Турксибский</div>
                  <div>• Наурызбайский</div>
                </div>
                <div className="mt-4 p-3 bg-red-100 rounded-lg">
                  <div className="text-sm font-medium text-red-800">+15-20% к стоимости</div>
                  <div className="text-xs text-red-600 mt-1">Время подачи: 45-60 мин</div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                Почему стоимость выезда различается?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Расстояние</h4>
                  <p className="text-gray-600 text-sm">Чем дальше от центра, тем больше времени и топлива на дорогу</p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Время в пути</h4>
                  <p className="text-gray-600 text-sm">Учитываем загруженность дорог и время на передвижение</p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Оправданность</h4>
                  <p className="text-gray-600 text-sm">Надбавка оправдывает расходы на топливо и время</p>
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