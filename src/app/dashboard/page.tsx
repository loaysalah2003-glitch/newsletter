'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { User, Loader2, AlertCircle, Newspaper, RefreshCcw } from 'lucide-react'

// خريطة التصنيفات
const categoryLabels: Record<string, string> = {
  events: "Campus Events",
  sports: "Sports",
  tech: "Technology",
  research: "Research",
  announcements: "Announcements",
  clubs: "Student Clubs",
}

interface NewsArticle {
  article_id: number;
  title: string;
  summary: string;
  photo: string | null;
  scraped_at?: string;
  category?: string;
}

export default function DashboardPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [userInterests, setUserInterests] = useState<string[]>([])
  const [userName, setUserName] = useState<string>("Student")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const NEWSLETTER_ID = 1 

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // نستخدم 127.0.0.1 مع إضافة timestamp لمنع المتصفح من كاش الخطأ القديم
      const timestamp = new Date().getTime();
      const url = `http://127.0.0.1:8000/grid/dashboard/${NEWSLETTER_ID}?t=${timestamp}`;
      
      console.log("Attempting to fetch from:", url);

      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors', // ضروري جداً لتجاوز جدار حماية المتصفح
        headers: {
          'Accept': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json()
      
      // التأكد من شكل البيانات المستلمة
      if (Array.isArray(data)) {
        setArticles(data)
      } else if (data && data.details && Array.isArray(data.details)) {
        setArticles(data.details)
      } else {
        setArticles([])
      }

    } catch (err: any) {
      console.error("Fetch Execution Error:", err)
      setError("تعذر الاتصال بالباكيند. تأكد من تفعيل CORS في FastAPI (main.py) وتشغيل السيرفر.")
    } finally {
      setLoading(false)
    }
  }, [NEWSLETTER_ID])

  useEffect(() => {
    // تحميل بيانات المستخدم من الذاكرة المحلية
    const savedProfile = localStorage.getItem('userProfile')
    const savedInterests = localStorage.getItem('userNewsPreferences')

    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile)
        if (parsed.name) setUserName(parsed.name.split(' ')[0])
      } catch (e) { console.error("Profile parsing error") }
    }

    if (savedInterests) {
      try {
        setUserInterests(JSON.parse(savedInterests))
      } catch (e) { console.error("Interests parsing error") }
    }

    loadDashboard()
  }, [loadDashboard])

  // ترتيب الأخبار حسب اهتمامات الطالب
  const sortedArticles = [...articles].sort((a, b) => {
    const aMatch = a.category && userInterests.includes(a.category) ? 1 : 0
    const bMatch = b.category && userInterests.includes(b.category) ? 1 : 0
    return bMatch - aMatch
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-zinc-800" />
          <p className="font-serif italic text-zinc-600">Gathering today's headlines...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] font-serif text-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header - تصميم جريدة كلاسيكي */}
        <header className="mb-16 mt-10 space-y-8 border-b border-zinc-300 pb-10">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-1 font-sans font-bold">Subscriber: {userName}</p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">The CampusPulse</h1>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold uppercase border-b border-zinc-900 mb-1 font-sans italic">Edition No. {NEWSLETTER_ID}</p>
              <p className="text-sm italic font-sans">{new Date().toDateString()}</p>
            </div>
          </div>
        </header>

        {/* تنبيه الخطأ مع زر إعادة المحاولة */}
        {error && (
          <div className="mb-10 p-5 bg-white border-l-4 border-red-500 shadow-sm flex items-center justify-between font-sans">
            <div className="flex items-center gap-4 text-red-700">
              <AlertCircle className="h-6 w-6" />
              <div>
                <p className="font-bold text-lg">خطأ في الاتصال</p>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="border-red-200 hover:bg-red-50"
              onClick={() => loadDashboard()}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              تحديث الاتصال
            </Button>
          </div>
        )}

        {/* شبكة الأخبار */}
        <main className="mb-20">
          {sortedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {sortedArticles.map((article) => (
                <NewsItem key={article.article_id} article={article} />
              ))}
            </div>
          ) : (
            !error && (
              <div className="text-center py-24 border-2 border-dashed border-zinc-300 rounded-xl bg-zinc-50/50">
                <Newspaper className="h-16 w-16 mx-auto text-zinc-200 mb-4" />
                <p className="text-zinc-500 italic text-xl font-sans">لا توجد أخبار منشورة حالياً في هذا العدد.</p>
              </div>
            )
          )}
        </main>
      </div>
    </div>
  )
}

function NewsItem({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.article_id}`} className="group block space-y-5">
      <div className="relative aspect-video overflow-hidden bg-zinc-200 rounded-sm shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        <Image
          src={article.photo || "/newsimage/placeholder.jpg"}
          alt={article.title}
          fill
          unoptimized={true}
          style={{ filter: 'grayscale(20%)' }}
          className="object-cover group-hover:filter-none transition-all duration-700 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-600 font-black font-sans">
          {categoryLabels[article.category || ''] || "CAMPUS NEWS"}
        </p>
        <h3 className="text-2xl font-bold leading-[1.1] decoration-zinc-400 group-hover:underline underline-offset-8 decoration-1">
          {article.title}
        </h3>
        <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3 font-sans">
          {article.summary}
        </p>
        <div className="pt-2 border-t border-zinc-200 flex justify-between items-center font-sans">
            <p className="text-[11px] text-zinc-400 italic">
              {article.scraped_at ? new Date(article.scraped_at).toLocaleDateString() : 'Today'}
            </p>
            <span className="text-[11px] font-bold uppercase text-zinc-500 tracking-wider">اقرأ المزيد +</span>
        </div>
      </div>
    </Link>
  )
}