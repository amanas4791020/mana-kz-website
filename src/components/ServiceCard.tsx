import { Link } from 'react-router-dom'
import { Star, Phone } from 'lucide-react'

interface ServiceCardProps {
  id: string
  title: string
  description: string
  price: string
  icon: string
  category?: string
  categoryName?: string
}

export function ServiceCard({ id, title, description, price, category, categoryName }: ServiceCardProps) {
  const getCategoryColor = (category?: string) => {
    switch(category) {
      case 'emergency': return 'bg-red-100 text-red-700'
      case 'installation': return 'bg-blue-100 text-blue-700'
      case 'repair': return 'bg-green-100 text-green-700'
      case 'diagnostics': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryName = (category?: string) => {
    switch(category) {
      case 'emergency': return 'Срочно'
      case 'installation': return 'Установка'
      case 'repair': return 'Ремонт'
      case 'diagnostics': return 'Диагностика'
      case 'general': return 'Общие услуги'
      default: return categoryName || 'Услуга'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all hover:-translate-y-1 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              {category && (
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                  {getCategoryName(category)}
                </span>
              )}
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600">4.62</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-blue-600">{price}</span>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to={`/uslugi/${id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium text-center transition-colors"
          >
            Подробнее
          </Link>
          <a
            href="tel:+77055535332"
            className="flex items-center justify-center w-12 h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}