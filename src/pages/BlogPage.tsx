import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Calendar, Clock, User, Search, Tag, ArrowRight } from 'lucide-react'
import { SEOHelmet } from '../components/SEOHelmet'

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

const CATEGORIES = {
  all: 'Все статьи',
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

function BlogCard({ post }: { post: BlogPost }) {
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

  const readTime = post.readTime || estimateReadTime(post.content)
  const categoryColor = CATEGORY_COLORS[post.category as keyof typeof CATEGORY_COLORS] || 'bg-gray-100 text-gray-700'

  return (
    <article className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all hover:-translate-y-1 group">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
            {CATEGORIES[post.category as keyof typeof CATEGORIES] || post.category}
          </span>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{readTime} мин</span>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          <Link to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <User className="w-4 h-4" />
            <span>{post.author || 'Мастер Манас'}</span>
          </div>
          <Link 
            to={`/blog/${post.id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:underline transition-colors"
          >
            Читать далее
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('/data/blog-posts-full.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', selectedCategory)
    }
    setSearchParams(searchParams, { replace: true })
  }, [selectedCategory])

  const getFilteredPosts = () => {
    let filteredPosts = posts
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === selectedCategory)
    }
    
    // Filter by search term
    if (searchTerm) {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Sort by date (newest first)
    return filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const getCategoryCounts = () => {
    const counts: Record<string, number> = { all: posts.length }
    posts.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1
    })
    return counts
  }

  const filteredPosts = getFilteredPosts()
  const categoryCounts = getCategoryCounts()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <SEOHelmet
        title="Блог сантехника и электрика | Советы и инструкции от мастера Манаса"
        description="🔧 Полезный блог сантехника и электрика из Алматы ⚡ Советы по ремонту ⚡ Инструкции по установке ⚡ Рекомендации от профессионала с 7+ летним опытом"
        keywords="блог сантехника, советы электрика, инструкции по ремонту, установка сантехники, ремонт электрики алматы"
        type="website"
        url="https://master-manas.kz/blog"
      />
      
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
              <span className="text-gray-900 font-medium">Блог</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Блог сантехника и электрика в Алматы
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Полезные советы, инструкции и рекомендации по сантехнике, электрике и ремонту от профессионала
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Search */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Поиск статей
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Поиск по блогу..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Категории
                </h3>
                <div className="space-y-2">
                  {Object.entries(CATEGORIES).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                        selectedCategory === key 
                          ? 'bg-blue-100 text-blue-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{label}</span>
                      <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {categoryCounts[key] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Популярные статьи
                </h3>
                <div className="space-y-3">
                  {posts.slice(0, 3).map(post => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="block group"
                    >
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(post.date).toLocaleDateString('ru-RU')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Найдено статей: <span className="font-semibold">{filteredPosts.length}</span>
                {searchTerm && (
                  <span> по запросу "<span className="font-semibold">{searchTerm}</span>"</span>
                )}
              </p>
            </div>

            {/* Posts Grid */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Статьи не найдены</h3>
                <p className="text-gray-600 mb-4">
                  Попробуйте изменить параметры поиска или выберите другую категорию
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Показать все статьи
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Хотите получать новые статьи?</h2>
          <p className="text-blue-100 mb-6">
            Следите за нашими обновлениями и получайте полезные советы от мастера Манаса
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+77055535332" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              📞 Связаться с мастером
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