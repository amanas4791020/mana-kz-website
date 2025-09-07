import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { FloatingElements } from './components/FloatingElements'
import { 
  withLazyLoading,
  HomePage,
  ServicesPage,
  ServiceDetailPage,
  BlogPage,
  BlogPostPage,
  ReviewsPage,
  AboutPage,
  ContactPage,
  FAQPage,
  GalleryPage,
  CalculatorPage,
  RequestPage,
  ServiceAreasPage,
  BookingPage,
  preloadCriticalPages
} from './components/LazyPages'
import './App.css'

// Оборачиваем компоненты в withLazyLoading для оптимизации
const LazyHomePage = withLazyLoading(HomePage)
const LazyServicesPage = withLazyLoading(ServicesPage)
const LazyServiceDetailPage = withLazyLoading(ServiceDetailPage)
const LazyBlogPage = withLazyLoading(BlogPage)
const LazyBlogPostPage = withLazyLoading(BlogPostPage)
const LazyReviewsPage = withLazyLoading(ReviewsPage)
const LazyAboutPage = withLazyLoading(AboutPage)
const LazyContactPage = withLazyLoading(ContactPage)
const LazyFAQPage = withLazyLoading(FAQPage)
const LazyGalleryPage = withLazyLoading(GalleryPage)
const LazyCalculatorPage = withLazyLoading(CalculatorPage)
const LazyRequestPage = withLazyLoading(RequestPage)
const LazyServiceAreasPage = withLazyLoading(ServiceAreasPage)
const LazyBookingPage = withLazyLoading(BookingPage)

function App() {
  useEffect(() => {
    // Предзагружаем критически важные страницы после загрузки приложения
    preloadCriticalPages()
  }, [])

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LazyHomePage />} />
            <Route path="/uslugi" element={<LazyServicesPage />} />
            <Route path="/uslugi/:serviceId" element={<LazyServiceDetailPage />} />
            <Route path="/blog" element={<LazyBlogPage />} />
            <Route path="/blog/:postId" element={<LazyBlogPostPage />} />
            <Route path="/otzyvy" element={<LazyReviewsPage />} />
            <Route path="/o-mne" element={<LazyAboutPage />} />
            <Route path="/galereya" element={<LazyGalleryPage />} />
            <Route path="/faq" element={<LazyFAQPage />} />
            <Route path="/kontakty" element={<LazyContactPage />} />
            <Route path="/kalkulyator" element={<LazyCalculatorPage />} />
            <Route path="/zayavka" element={<LazyRequestPage />} />
            <Route path="/zony-obsluzhivaniya" element={<LazyServiceAreasPage />} />
            <Route path="/bronirovanie" element={<LazyBookingPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingElements />
      </div>
    </Router>
  )
}

export default App
