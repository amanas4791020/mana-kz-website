import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, User, ArrowLeft, Share2, Phone, MessageSquare, Tag, ThumbsUp } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  author?: string
  readTime?: number
}

interface RelatedPost {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
}

const CATEGORIES = {
  советы: 'Советы',
  аварии: 'Аварийные ситуации', 
  установка: 'Установка оборудования',
  отопление: 'Отопление',
  электрика: 'Электрика',
  инструкции: 'Пошаговые инструкции',
  оборудование: 'Выбор оборудования'
}

const CATEGORY_COLORS = {
  советы: 'bg-blue-100 text-blue-700',
  аварии: 'bg-red-100 text-red-700',
  установка: 'bg-green-100 text-green-700',
  отопление: 'bg-orange-100 text-orange-700',
  электрика: 'bg-yellow-100 text-yellow-700',
  инструкции: 'bg-purple-100 text-purple-700',
  оборудование: 'bg-indigo-100 text-indigo-700'
}

export function BlogPostPage() {
  const { postId } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  useEffect(() => {
    fetch('/data/blog-posts-full.json')
      .then(res => res.json())
      .then((data: BlogPost[]) => {
        const foundPost = data.find(p => p.id === postId)
        setPost(foundPost || null)
        
        if (foundPost) {
          // Get related posts from the same category
          const related = data
            .filter(p => p.id !== postId && p.category === foundPost.category)
            .slice(0, 3)
          setRelatedPosts(related)
        }
        
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [postId])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, '').split(' ').length
    return Math.ceil(words / wordsPerMinute)
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = post?.title || ''
    
    switch (platform) {
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        alert('Ссылка скопирована в буфер обмена')
        break
    }
    setShareMenuOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Статья не найдена</h1>
          <p className="text-gray-600 mb-6">К сожалению, запрашиваемая статья не существует</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Вернуться к блогу
          </Link>
        </div>
      </div>
    )
  }

  const readTime = post.readTime || estimateReadTime(post.content)
  const categoryColor = CATEGORY_COLORS[post.category as keyof typeof CATEGORY_COLORS] || 'bg-gray-100 text-gray-700'

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Все статьи
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Article Header */}
              <div className="p-8 pb-6">
                <div className="flex items-center justify-between mb-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
                    <Tag className="w-4 h-4 inline mr-1" />
                    {CATEGORIES[post.category as keyof typeof CATEGORIES] || post.category}
                  </span>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShareMenuOpen(!shareMenuOpen)}
                      className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    
                    {shareMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                        <div className="py-1">
                          <button
                            onClick={() => handleShare('telegram')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Поделиться в Telegram
                          </button>
                          <button
                            onClick={() => handleShare('whatsapp')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Поделиться в WhatsApp
                          </button>
                          <button
                            onClick={() => handleShare('copy')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Копировать ссылку
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{post.author || 'Мастер Манас'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{readTime} мин чтения</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-blue-500 pl-6 bg-blue-50 p-4 rounded-r-lg">
                  {post.excerpt}
                </p>
              </div>
              
              {/* Article Content */}
              <div className="px-8 pb-8">
                <div 
                  className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.7'
                  }}
                />
              </div>
              
              {/* Article Footer */}
              <div className="px-8 pb-8 border-t">
                <div className="flex items-center justify-between pt-6">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      liked 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                    <span>{liked ? 'Спасибо!' : 'Полезная статья'}</span>
                  </button>
                  
                  <div className="text-sm text-gray-500">
                    Опубликовано: {formatDate(post.date)}
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Author Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center">
                  <img 
                    src="/images/master-manas.png" 
                    alt="Мастер Манас" 
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Мастер Манас</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Профессиональный сантехник и электрик с 7+ летним опытом работы в Алматы
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="tel:+77055535332"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center block text-sm"
                    >
                      <Phone className="w-4 h-4 inline mr-2" />
                      Позвонить
                    </a>
                    <a 
                      href="https://wa.me/77055535332"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center block text-sm"
                    >
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Содержание</h3>
                <div className="space-y-2">
                  {post.content.match(/<h3[^>]*>([^<]+)<\/h3>/g)?.map((heading, index) => {
                    const text = heading.replace(/<[^>]*>/g, '')
                    const id = text.toLowerCase().replace(/[^a-zA-Zа-яё\s]/g, '').replace(/\s+/g, '-')
                    return (
                      <a
                        key={index}
                        href={`#${id}`}
                        className="block text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
                      >
                        {text}
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Нужна помощь?</h3>
                <div className="space-y-3">
                  <Link
                    to="/uslugi"
                    className="block text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    → Посмотреть все услуги
                  </Link>
                  <Link
                    to="/kontakty"
                    className="block text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    → Связаться с мастером
                  </Link>
                  <Link
                    to="/otzyvy"
                    className="block text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    → Читать отзывы
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Похожие статьи</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-all hover:-translate-y-1 group"
                >
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${CATEGORY_COLORS[relatedPost.category as keyof typeof CATEGORY_COLORS]}`}>
                    {CATEGORIES[relatedPost.category as keyof typeof CATEGORIES]}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{formatDate(relatedPost.date)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}