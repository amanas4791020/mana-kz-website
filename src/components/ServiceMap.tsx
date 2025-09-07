import { useState, useCallback, useRef, useEffect } from 'react'
import { MapPin, Navigation, DollarSign } from 'lucide-react'

// Простой компонент карты без типизированного Google Maps
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyCO0kKndUNlmQi3B5mxy4dblg_8WYcuKuk'

// Центр Алматы
const ALMATY_CENTER = {
  lat: 43.238293,
  lng: 76.945465
}

// Зоны обслуживания по районам
const SERVICE_ZONES = [
  {
    id: 'center',
    name: 'Центр',
    center: { lat: 43.238293, lng: 76.945465 },
    radius: 3000,
    multiplier: 1.0,
    color: '#22c55e',
    description: 'Бесплатный выезд'
  },
  {
    id: 'almaly',
    name: 'Алмалинский район',
    center: { lat: 43.224542, lng: 76.916270 },
    radius: 4000,
    multiplier: 1.0,
    color: '#3b82f6',
    description: 'Бесплатный выезд'
  },
  {
    id: 'medeu',
    name: 'Медеуский район',
    center: { lat: 43.252076, lng: 76.970977 },
    radius: 5000,
    multiplier: 1.1,
    color: '#f59e0b',
    description: '+10% к стоимости'
  },
  {
    id: 'bostandyk',
    name: 'Бостандыкский район',
    center: { lat: 43.207022, lng: 76.980534 },
    radius: 6000,
    multiplier: 1.05,
    color: '#8b5cf6',
    description: '+5% к стоимости'
  },
  {
    id: 'auezov',
    name: 'Ауэзовский район',
    center: { lat: 43.205311, lng: 76.929008 },
    radius: 7000,
    multiplier: 1.1,
    color: '#f97316',
    description: '+10% к стоимости'
  },
  {
    id: 'zhetysu',
    name: 'Жетысуский район',
    center: { lat: 43.285431, lng: 76.916064 },
    radius: 6000,
    multiplier: 1.1,
    color: '#06b6d4',
    description: '+10% к стоимости'
  },
  {
    id: 'turksib',
    name: 'Турксибский район',
    center: { lat: 43.268877, lng: 76.855440 },
    radius: 8000,
    multiplier: 1.15,
    color: '#ef4444',
    description: '+15% к стоимости'
  },
  {
    id: 'nauryzbay',
    name: 'Наурызбайский район',
    center: { lat: 43.304417, lng: 76.895751 },
    radius: 9000,
    multiplier: 1.2,
    color: '#dc2626',
    description: '+20% к стоимости'
  }
]

interface ServiceMapProps {
  onLocationSelect?: (location: { lat: number; lng: number; zone?: any }) => void
  showPricing?: boolean
}

export function ServiceMap({ onLocationSelect, showPricing = true }: ServiceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lng: number
    address?: string
    zone?: any
  } | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Загрузка Google Maps API
  const loadGoogleMaps = useCallback(() => {
    if (window.google) {
      initializeMap()
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.onload = () => {
      setIsLoaded(true)
      initializeMap()
    }
    document.head.appendChild(script)
  }, [])

  // Инициализация карты
  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google) return

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: ALMATY_CENTER,
      zoom: 11,
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true
    })

    // Добавление зон обслуживания
    SERVICE_ZONES.forEach(zone => {
      // Круг зоны
      new window.google.maps.Circle({
        map: mapInstance,
        center: zone.center,
        radius: zone.radius,
        fillColor: zone.color,
        fillOpacity: 0.1,
        strokeColor: zone.color,
        strokeOpacity: 0.4,
        strokeWeight: 2,
        clickable: false
      })

      // Маркер центра зоны
      new window.google.maps.Marker({
        map: mapInstance,
        position: zone.center,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: zone.color,
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2
        },
        title: zone.name
      })
    })

    // Обработчик клика по карте
    mapInstance.addListener('click', async (e: any) => {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      
      setIsLoading(true)
      
      try {
        const zone = getZoneByLocation(lat, lng)
        let address = 'Адрес не определен'
        
        const geocoder = new window.google.maps.Geocoder()
        const response = await new Promise((resolve, reject) => {
          geocoder.geocode(
            { location: { lat, lng } },
            (results: any, status: string) => {
              if (status === 'OK' && results && results.length > 0) {
                resolve(results[0].formatted_address)
              } else {
                reject(status)
              }
            }
          )
        })
        
        if (response) {
          address = response as string
        }
        
        const locationData = { lat, lng, address, zone }
        setSelectedLocation(locationData)
        
        // Удаляем предыдущий маркер
        if ((mapInstance as any).clickMarker) {
          (mapInstance as any).clickMarker.setMap(null)
        }
        
        // Добавляем новый маркер
        const marker = new window.google.maps.Marker({
          map: mapInstance,
          position: { lat, lng },
          animation: window.google.maps.Animation.BOUNCE,
          title: 'Выбранное местоположение'
        })
        
        ;(mapInstance as any).clickMarker = marker
        
        // Информационное окно
        const infoWindow = new window.google.maps.InfoWindow({
          content: createInfoWindowContent(locationData)
        })
        
        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker)
        })
        
        infoWindow.open(mapInstance, marker)
        
        if (onLocationSelect) {
          onLocationSelect(locationData)
        }
      } catch (error) {
        console.error('Ошибка геокодирования:', error)
      } finally {
        setIsLoading(false)
      }
    })

    setMap(mapInstance)
  }, [])

  // Определение зоны по координатам
  const getZoneByLocation = (lat: number, lng: number) => {
    for (const zone of SERVICE_ZONES) {
      const distance = getDistance(
        { lat, lng },
        zone.center
      )
      if (distance <= zone.radius) {
        return zone
      }
    }
    return null
  }

  // Расчет расстояния между двумя точками
  const getDistance = (point1: { lat: number; lng: number }, point2: { lat: number; lng: number }) => {
    const R = 6371000 // Радиус Земли в метрах
    const dLat = (point2.lat - point1.lat) * Math.PI / 180
    const dLng = (point2.lng - point1.lng) * Math.PI / 180
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Загрузка карты при монтировании компонента
  useEffect(() => {
    loadGoogleMaps()
  }, [])
  const createInfoWindowContent = (locationData: { lat: number; lng: number; address?: string; zone?: any }) => {
    const { address, zone } = locationData
    
    return `
      <div style="padding: 12px; max-width: 300px; font-family: system-ui, sans-serif;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">
          ${zone ? zone.name : 'Вне зоны обслуживания'}
        </h3>
        
        <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
          <strong>Адрес:</strong> ${address}
        </div>
        
        ${zone ? `
          <div style="font-size: 14px; margin-bottom: 4px;">
            <span style="color: #059669; font-weight: 500;">💰 ${zone.description}</span>
          </div>
          
          <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">
            Коэффициент: ${zone.multiplier}x
          </div>
          
          <div style="background: #dbeafe; padding: 8px; border-radius: 6px; font-size: 12px; color: #1e40af;">
            Обычное время подачи: 30-60 мин
          </div>
        ` : `
          <div style="font-size: 14px; color: #dc2626;">
            К сожалению, мы не обслуживаем этот район. Пожалуйста, свяжитесь с нами для уточнения.
          </div>
        `}
      </div>
    `
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Карта обслуживания Алматы</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Кликните на карте</span>
          </div>
        </div>
        
        {showPricing && (
          <div className="mt-4 text-sm text-gray-600">
            Нажмите на карте, чтобы узнать стоимость выезда в ваш район
          </div>
        )}
      </div>
      
      <div className="relative">
        <div 
          ref={mapRef}
          className="w-full h-[500px] rounded-xl bg-gray-100 border border-gray-200"
          style={{ minHeight: '500px' }}
        />
        
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-xl">
            <div className="bg-white px-4 py-2 rounded-lg shadow flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Определение адреса...
            </div>
          </div>
        )}
        
        {!isLoaded && !window.google && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <div className="text-gray-600">Загрузка карты...</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Легенда */}
      {showPricing && (
        <div className="p-6 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-3">Зоны обслуживания и стоимость выезда:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {SERVICE_ZONES.map(zone => (
              <div key={zone.id} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2 border-2 border-white shadow" 
                  style={{ backgroundColor: zone.color }}
                ></div>
                <div>
                  <div className="font-medium text-gray-700">{zone.name}</div>
                  <div className="text-gray-500">{zone.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}