/*import { notFound } from "next/navigation"

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!slug) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold">
      
        Category: {slug}
      </h1>
    </div>
  )
}*/
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays, Clock } from "lucide-react"

const categories = [
  {
    slug: "technology",
    title: "Technology",
    description: "Latest innovations, AI research, cybersecurity, and digital transformation happening at MTI University.",
    news: [
      { 
        title: "AI Research Breakthrough at MTI", 
        excerpt: "University researchers develop new multimodal AI model that outperforms current benchmarks in reasoning and vision tasks.", 
        date: "Feb 5, 2026", 
        readTime: "8 min" 
      },
      { 
        title: "Cybersecurity Summit 2026", 
        excerpt: "Leading experts share strategies to protect campus networks from emerging quantum threats.", 
        date: "Jan 28, 2026", 
        readTime: "7 min" 
      },
      { 
        title: "New High-Performance Computing Cluster", 
        excerpt: "State-of-the-art GPU cluster now available for student research and machine learning courses.", 
        date: "Jan 15, 2026", 
        readTime: "5 min" 
      },
      { 
        title: "Blockchain & Web3 Course Launched", 
        excerpt: "New elective on decentralized finance attracts record enrollment this semester.", 
        date: "Dec 20, 2025", 
        readTime: "6 min" 
      },
      { 
        title: "Quantum Computing Workshop Series", 
        excerpt: "Hands-on labs using Qiskit and real quantum hardware simulation.", 
        date: "Nov 10, 2025", 
        readTime: "9 min" 
      },
      { 
        title: "AR Campus Navigation App Released", 
        excerpt: "New augmented reality app helps freshmen navigate classrooms and facilities.", 
        date: "Oct 15, 2025", 
        readTime: "4 min" 
      },
    ],
  },
  {
    slug: "sports",
    title: "Sports",
    description: "University teams, tournaments, fitness events, and the vibrant sports culture at MTI.",
    news: [
      { 
        title: "Annual Inter-Faculty Sports Festival", 
        excerpt: "Record participation across 15 sports with Computer Science winning the overall trophy.", 
        date: "Feb 8, 2026", 
        readTime: "6 min" 
      },
      { 
        title: "MTI Football Team Wins Regional Cup", 
        excerpt: "Dramatic 3–2 victory in the final against rival university.", 
        date: "Jan 30, 2026", 
        readTime: "5 min" 
      },
      { 
        title: "New Olympic-Standard Athletics Track", 
        excerpt: "Modern synthetic track and field facilities now open for training and competitions.", 
        date: "Jan 20, 2026", 
        readTime: "4 min" 
      },
      { 
        title: "Women's Basketball League Champions", 
        excerpt: "Undefeated season ends with championship title and MVP award.", 
        date: "Dec 18, 2025", 
        readTime: "5 min" 
      },
      { 
        title: "Campus Fitness Challenge Results", 
        excerpt: "Over 1,200 students participated — top performers recognized in grand ceremony.", 
        date: "Nov 25, 2025", 
        readTime: "4 min" 
      },
      { 
        title: "Swimming Team Breaks Records", 
        excerpt: "Three new university records set at the national student championships.", 
        date: "Nov 12, 2025", 
        readTime: "5 min" 
      },
    ],
  },
]

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="relative min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12 md:py-16 px-5 sm:px-8 lg:px-12">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Back button + Header */}
        <div className="mb-10 md:mb-14">
          <Button
            variant="ghost"
            className="mb-8 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            asChild
          >
            <Link href="/categories" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Categories
            </Link>
          </Button>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            {category.title}
          </h1>

          <p className="mt-5 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-4xl">
            {category.description}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {category.news.map((newsItem, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/70 dark:border-slate-700/50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image placeholder */}
              <div className="relative h-48 md:h-56 bg-linear-to-br from-indigo-100 to-blue-100 dark:from-slate-700 dark:to-slate-600">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-medium">
                  [News Image]
                </div>
                <div className="absolute top-4 left-4 px-4 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-xs font-medium text-indigo-700 dark:text-indigo-300">
                  {category.title}
                </div>
              </div>

              <div className="p-6 md:p-7">
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    {newsItem.date || "Recent"}
                  </div>
                  
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {newsItem.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 line-clamp-3 mb-6">
                  {newsItem.excerpt}
                </p>

                <Button
                  variant="ghost"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 p-0 group-hover:translate-x-1 transition-transform"
                  asChild
                >
                  <Link href={`/news/${category.slug}-${idx}`}>
                    Read Full Story →
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" asChild>
            <Link href="/news">
              View All University News →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}



