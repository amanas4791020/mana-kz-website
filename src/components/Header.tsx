import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Menu, X, MapPin, Clock } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Алматы</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Ежедневно: 8:00 - 22:00</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+77055535332" className="hover:underline font-medium">+7 705 553 53 32</a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+77074791020" className="hover:underline font-medium">+7 707 479 10 20</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">М</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Мастер Манас</h1>
                <p className="text-sm text-gray-600">Сантехник • Электрик • Алматы</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Главная</Link>
              <div className="relative group">
                <Link to="/uslugi" className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
                  Услуги
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {/* Dropdown */}
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4 space-y-2">
                    <Link to="/uslugi?category=plumbing" className="block text-sm text-gray-700 hover:text-blue-600 py-1">Сантехнические услуги</Link>
                    <Link to="/uslugi?category=electrical" className="block text-sm text-gray-700 hover:text-blue-600 py-1">Электрические услуги</Link>
                    <Link to="/uslugi?category=gas_heating" className="block text-sm text-gray-700 hover:text-blue-600 py-1">Газ и отопление</Link>
                    <Link to="/uslugi?category=appliances" className="block text-sm text-gray-700 hover:text-blue-600 py-1">Бытовая техника</Link>
                  </div>
                </div>
              </div>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Блог</Link>
              <Link to="/galereya" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Галерея</Link>
              <Link to="/otzyvy" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Отзывы</Link>
              <Link to="/o-mne" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">О мастере</Link>
              <div className="relative group">
                <span className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer flex items-center">
                  Инструменты
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                {/* Dropdown */}
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4 space-y-2">
                    <Link to="/kalkulyator" className="block text-sm text-gray-700 hover:text-blue-600 py-1">Калькулятор стоимости</Link>
                    <Link to="/zayavka" className="block text-sm text-gray-700 hover:text-blue-600 py-1">Оставить заявку</Link>
                    <Link to="/bronirovanie" className="block text-sm text-gray-700 hover:text-blue-600 py-1">Онлайн-бронирование</Link>
                    <Link to="/zony-obsluzhivaniya" className="block text-sm text-gray-700 hover:text-blue-600 py-1">Карта обслуживания</Link>
                  </div>
                </div>
              </div>
              <Link to="/faq" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">FAQ</Link>
              <Link to="/kontakty" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Контакты</Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                Вызвать мастера
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Главная</Link>
              <Link to="/uslugi" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Услуги</Link>
              <Link to="/kalkulyator" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Калькулятор</Link>
              <Link to="/zayavka" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Заявка</Link>
              <Link to="/bronirovanie" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Бронирование</Link>
              <Link to="/zony-obsluzhivaniya" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Карта</Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Блог</Link>
              <Link to="/galereya" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Галерея</Link>
              <Link to="/otzyvy" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Отзывы</Link>
              <Link to="/o-mne" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>О мастере</Link>
              <Link to="/faq" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
              <Link to="/kontakty" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Контакты</Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <a href="tel:+77055535332" className="text-blue-600 font-medium">+7 705 553 53 32</a>
                <a href="tel:+77074791020" className="text-blue-600 font-medium">+7 707 479 10 20</a>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium w-full">
                Вызвать мастера
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
