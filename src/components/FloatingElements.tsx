import { Phone } from 'lucide-react'
import { WhatsAppWidget } from './WhatsAppWidget'

export function FloatingElements() {
  return (
    <>
      {/* WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Phone Button */}
      <a
        href="tel:+77055535332"
        className="fixed bottom-24 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Позвонить
        </span>
      </a>
    </>
  )
}
