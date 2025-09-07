import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, Send, User, Mail, MessageSquare, Camera, CheckCircle, X } from 'lucide-react'

interface Review {
  name: string
  age?: number
  rating: number
  comment: string
  date?: string
  avatar?: string
}

interface NewReview {
  name: string
  email: string
  rating: number
  comment: string
  photo?: File
}

const AVATAR_COLORS = [
  'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
  'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
]

function getAvatarColor(index: number) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length]
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

function StarRating({ rating, onRatingChange, readonly = false, size = 'md' }: {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}) {
  const [hoverRating, setHoverRating] = useState(0)
  
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[size]

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating)
        return (
          <Star
            key={star}
            className={`${sizeClass} ${isFilled ? 'text-yellow-400 fill-current' : 'text-gray-300'} ${
              !readonly ? 'cursor-pointer hover:scale-110 transition-transform' : ''
            }`}
            onClick={() => !readonly && onRatingChange?.(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
          />
        )
      })}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'недавно'
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(index)}`}>
          {getInitials(review.name)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{review.name}</h3>
              {review.age && (
                <p className="text-sm text-gray-600">{review.age} лет</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <StarRating rating={review.rating} readonly size="sm" />
              <span className="text-sm text-gray-600">({review.rating}.0)</span>
            </div>
          </div>
          <p className="text-gray-700 mb-2">{review.comment}</p>
          <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
        </div>
      </div>
    </div>
  )
}

export function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [newReview, setNewReview] = useState<NewReview>({
    name: '',
    email: '',
    rating: 0,
    comment: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/data/reviews.json')
      .then(res => res.json())
      .then(data => {
        // Add dates to existing reviews
        const reviewsWithDates = data.map((review: Review, index: number) => ({
          ...review,
          date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
        }))
        setReviews(reviewsWithDates)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!newReview.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения'
    } else if (newReview.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа'
    }
    
    if (!newReview.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newReview.email)) {
      newErrors.email = 'Введите корректный email адрес'
    }
    
    if (newReview.rating === 0) {
      newErrors.rating = 'Пожалуйста, поставьте оценку'
    }
    
    if (!newReview.comment.trim()) {
      newErrors.comment = 'Комментарий обязателен для заполнения'
    } else if (newReview.comment.trim().length < 10) {
      newErrors.comment = 'Комментарий должен содержать минимум 10 символов'
    } else if (newReview.comment.trim().length > 500) {
      newErrors.comment = 'Комментарий не должен превышать 500 символов'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const reviewToAdd: Review = {
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString()
      }
      
      setReviews([reviewToAdd, ...reviews])
      setNewReview({ name: '', email: '', rating: 0, comment: '' })
      setShowForm(false)
      setSubmitting(false)
      setSubmitSuccess(true)
      
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, photo: 'Можно загружать только изображения' })
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, photo: 'Размер файла не должен превышать 5MB' })
        return
      }
      setNewReview({ ...newReview, photo: file })
      setErrors({ ...errors, photo: '' })
    }
  }

  const averageRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '5.0'
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(r => r.rating === rating).length
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
    return { rating, count, percentage }
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-blue-600 hover:text-blue-700">
                Главная
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium">Отзывы</span>
            </li>
          </ol>
        </nav>

        {/* Success Message */}
        {submitSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Спасибо за ваш отзыв!</span>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Отзывы клиентов
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Что говорят наши клиенты о качестве работы мастера Манаса
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center lg:text-left">
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <div>
                  <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating}</div>
                  <StarRating rating={Math.round(parseFloat(averageRating))} readonly size="lg" />
                  <p className="text-gray-600 mt-2">{reviews.length} отзывов</p>
                </div>
                <div className="flex-1 w-full lg:w-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Распределение оценок</h3>
                  <div className="space-y-2">
                    {ratingDistribution.map(({ rating, count, percentage }) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 w-6">{rating}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Поделитесь своим опытом
                </h3>
                <p className="text-gray-600 mb-6">
                  Ваш отзыв поможет другим клиентам сделать правильный выбор
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Оставить отзыв</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Оставить отзыв</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ваше имя"
                    />
                  </div>
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={newReview.email}
                      onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Rating Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваша оценка *
                  </label>
                  <div className="flex items-center space-x-4">
                    <StarRating 
                      rating={newReview.rating} 
                      onRatingChange={(rating) => setNewReview({ ...newReview, rating })} 
                      size="lg"
                    />
                    {newReview.rating > 0 && (
                      <span className="text-sm text-gray-600">({newReview.rating} из 5)</span>
                    )}
                  </div>
                  {errors.rating && <p className="text-red-600 text-sm mt-1">{errors.rating}</p>}
                </div>

                {/* Comment Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваш отзыв *
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      errors.comment ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Расскажите о вашем опыте работы с мастером Манасом..."
                  />
                  <div className="flex justify-between mt-1">
                    <div>
                      {errors.comment && <p className="text-red-600 text-sm">{errors.comment}</p>}
                    </div>
                    <p className="text-sm text-gray-500">{newReview.comment.length}/500</p>
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Фото (опционально)
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors flex items-center space-x-2">
                      <Camera className="w-4 h-4" />
                      <span>Выбрать файл</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {newReview.photo && (
                      <span className="text-sm text-green-600">{newReview.photo.name}</span>
                    )}
                  </div>
                  {errors.photo && <p className="text-red-600 text-sm mt-1">{errors.photo}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
                    disabled={submitting}
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    {submitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Отправить отзыв</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Все отзывы ({reviews.length})</h2>
          
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Пока нет отзывов</h3>
              <p className="text-gray-600">Будьте первым, кто оставит отзыв о работе мастера Манаса</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Готовы заказать услугу?</h2>
          <p className="text-blue-100 mb-6">
            Присоединяйтесь к довольным клиентам мастера Манаса
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+77055535332" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              📞 +7 705 553 53 32
            </a>
            <a 
              href="https://wa.me/77055535332"
              target="_blank"
              rel="noopener noreferrer" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              💬 Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}