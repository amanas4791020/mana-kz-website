import { useState } from 'react'
import { SEOHelmet } from '../components/SEOHelmet'
import { ServiceCalculator } from '../components/ServiceCalculator'
import { WhatsAppWidget } from '../components/WhatsAppWidget'
import { Calculator, Star, TrendingUp, Shield } from 'lucide-react'

interface CalculationResult {
  price: { min: number; max: number }
  details: any
}

export function CalculatorPage() {
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)

  const handleCalculationComplete = (result: CalculationResult) => {
    setCalculationResult(result)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHelmet
        title="Калькулятор стоимости услуг | Мастер Манас Алматы"
        description="Онлайн калькулятор стоимости сантехнических и электромонтажных работ в Алматы. Рассчитайте цену услуг мастера Манаса за 5 минут."
        keywords="калькулятор стоимости, расчет цены услуг, сантехник цены алматы, электрик расценки, мастер манас"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-blue-500 bg-opacity-20 rounded-full px-4 py-2 mb-6">
              <Calculator className="w-5 h-5 mr-2" />
              <span className="font-medium">Онлайн калькулятор</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Калькулятор стоимости услуг
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Рассчитайте стоимость сантехнических и электромонтажных работ в Алматы с учетом всех факторов
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Актуальные цены</h3>
                <p className="text-blue-100 text-sm">Основано на рыночных данных 2025 года</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Точные расчеты</h3>
                <p className="text-blue-100 text-sm">Учитываем все факторы ценообразования</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Прозрачность</h3>
                <p className="text-blue-100 text-sm">Никаких скрытых платежей и накруток</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ServiceCalculator onCalculationComplete={handleCalculationComplete} />
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Как формируется стоимость услуг?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Тип работ</h3>
                <p className="text-gray-600 text-sm">Основной фактор ценообразования</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Район</h3>
                <p className="text-gray-600 text-sm">Стоимость выезда по районам</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Срочность</h3>
                <p className="text-gray-600 text-sm">Надбавка за срочность</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Сложность</h3>
                <p className="text-gray-600 text-sm">Техническая сложность работ</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Почему стоит обратиться к мастеру Манасу?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Опыт 7+ лет</h4>
                      <p className="text-gray-600 text-sm">Большой опыт в сантехнике и электрике</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Гарантия качества</h4>
                      <p className="text-gray-600 text-sm">Предоставляем гарантию на все виды работ</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Честные цены</h4>
                      <p className="text-gray-600 text-sm">Никаких скрытых платежей и накруток</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Быстрый выезд</h4>
                      <p className="text-gray-600 text-sm">Приезжаем в течение часа после вызова</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Собственные инструменты</h4>
                      <p className="text-gray-600 text-sm">Всегда с собой полный набор профессиональных инструментов</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Работа 24/7</h4>
                      <p className="text-gray-600 text-sm">Аварийные вызовы в любое время суток</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Widget */}
      <WhatsAppWidget 
        calculatorData={calculationResult ? {
          service: calculationResult.details?.service || 'Услуга',
          price: calculationResult.price,
          details: calculationResult.details
        } : undefined}
      />
    </div>
  )
}