import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Star } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">М</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Мастер Манас</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-300">4.62 (13 отзывов)</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Профессиональные сантехнические и электрические услуги в Алматы. 
              Многолетний опыт, гарантия качества, честные цены.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">15</div>
                <div className="text-xs text-gray-400">лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">500+</div>
                <div className="text-xs text-gray-400">заказов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">24/7</div>
                <div className="text-xs text-gray-400">доступность</div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Популярные услуги</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/uslugi/vyzov-santehnika" className="text-gray-300 hover:text-white transition-colors">Вызов сантехника</Link></li>
              <li><Link to="/uslugi/uslugi-elektrika" className="text-gray-300 hover:text-white transition-colors">Услуги электрика</Link></li>
              <li><Link to="/uslugi/ustanovka-smesitelya" className="text-gray-300 hover:text-white transition-colors">Установка смесителя</Link></li>
              <li><Link to="/uslugi/remont-boilera" className="text-gray-300 hover:text-white transition-colors">Ремонт бойлера</Link></li>
              <li><Link to="/uslugi/ustanovka-gazovogo-kotla" className="text-gray-300 hover:text-white transition-colors">Установка газового котла</Link></li>
              <li><Link to="/uslugi" className="text-blue-400 hover:text-blue-300 transition-colors">Все услуги →</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Главная</Link></li>
              <li><Link to="/uslugi" className="text-gray-300 hover:text-white transition-colors">Услуги</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Блог</Link></li>
              <li><Link to="/otzyvy" className="text-gray-300 hover:text-white transition-colors">Отзывы клиентов</Link></li>
              <li><Link to="/o-mne" className="text-gray-300 hover:text-white transition-colors">О мастере</Link></li>
              <li><Link to="/kontakty" className="text-gray-300 hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Контакты</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-0.5 text-blue-400" />
                <div className="space-y-1">
                  <a href="tel:+77055535332" className="text-gray-300 hover:text-white transition-colors block">+7 705 553 53 32</a>
                  <a href="tel:+77074791020" className="text-gray-300 hover:text-white transition-colors block">+7 707 479 10 20</a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-400" />
                <span className="text-gray-300">Алматы мкр Аксай 4-11</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 mt-0.5 text-blue-400" />
                <span className="text-gray-300">Ежедневно: 8:00 - 22:00</span>
              </div>
              <div className="pt-2">
                <a 
                  href="https://wa.me/77055535332" 
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Мастер Манас. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Профессиональные сантехнические и электрические услуги в Алматы</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
