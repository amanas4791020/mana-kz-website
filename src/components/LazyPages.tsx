import { lazy, Suspense } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

// Создаем lazy-загружаемые компоненты для code splitting
export const HomePage = lazy(() => import('../pages/HomePage').then(module => ({ default: module.HomePage })))
export const ServicesPage = lazy(() => import('../pages/ServicesPage').then(module => ({ default: module.ServicesPage })))
export const ServiceDetailPage = lazy(() => import('../pages/ServiceDetailPage').then(module => ({ default: module.ServiceDetailPage })))
export const BlogPage = lazy(() => import('../pages/BlogPage').then(module => ({ default: module.BlogPage })))
export const BlogPostPage = lazy(() => import('../pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })))
export const ReviewsPage = lazy(() => import('../pages/ReviewsPage').then(module => ({ default: module.ReviewsPage })))
export const AboutPage = lazy(() => import('../pages/AboutPage').then(module => ({ default: module.AboutPage })))
export const ContactPage = lazy(() => import('../pages/ContactPage').then(module => ({ default: module.ContactPage })))
export const FAQPage = lazy(() => import('../pages/FAQPage').then(module => ({ default: module.FAQPage })))
export const GalleryPage = lazy(() => import('../pages/GalleryPage').then(module => ({ default: module.GalleryPage })))
export const CalculatorPage = lazy(() => import('../pages/CalculatorPage').then(module => ({ default: module.CalculatorPage })))
export const RequestPage = lazy(() => import('../pages/RequestPage').then(module => ({ default: module.RequestPage })))
export const ServiceAreasPage = lazy(() => import('../pages/ServiceAreasPage').then(module => ({ default: module.ServiceAreasPage })))
export const BookingPage = lazy(() => import('../pages/BookingPage').then(module => ({ default: module.BookingPage })))

// Компонент загрузки
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Загружается...</p>
      </div>
    </div>
  )
}

// HOC для оборачивания lazy-компонентов
export function withLazyLoading<T extends object>(Component: React.ComponentType<T>) {
  return function LazyWrapper(props: T) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    )
  }
}

// Предварительная загрузка критически важных страниц
export function preloadCriticalPages() {
  // Предзагружаем главную страницу и страницу услуг
  setTimeout(() => {
    import('../pages/HomePage')
    import('../pages/ServicesPage')
    import('../pages/CalculatorPage')
  }, 1000)
}