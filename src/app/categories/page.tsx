'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Newspaper } from "lucide-react"

const categories = [
  {
    slug: "technology",
    title: "Technology",
    description: "Latest innovations, AI research, cybersecurity, and digital transformation on campus.",
    news: [
      { title: "AI Research Breakthrough", excerpt: "New AI models developed by university researchers..." },
      { title: "Cybersecurity Workshop", excerpt: "A hands-on workshop focused on modern security threats..." },
      { title: "New Computer Labs", excerpt: "State-of-the-art labs opened for CS students..." },
    ],
  },
  {
    slug: "sports",
    title: "Sports",
    description: "University teams, tournaments, fitness events, and campus sports life.",
    news: [
      { title: "Annual Sports Day", excerpt: "Students competed in various athletic events..." },
      { title: "Football Team Wins", excerpt: "The university football team secured first place..." },
      { title: "New Gym Facilities", excerpt: "Modern gym equipment now available for students..." },
    ],
  },
]

export default function CategoriesPage() {
  return (
    <div className="relative min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-16 md:py-20 px-5 sm:px-8 lg:px-12">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16 md:mb-20">
         

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-5">
            Categories
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Discover the latest news and updates in the areas that interest you most.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16 md:space-y-20">
          {categories.map((category) => (
            <section key={category.slug} className="space-y-8">
              {/* Category Header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                    {category.title}
                  </h2>
                  <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-xl">
                    {category.description}
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                  asChild
                >
                  <Link href={`/categories/${category.slug}`}>
                    Explore all {category.title} →
                  </Link>
                </Button>
              </div>

              {/* Horizontal scrollable news preview */}
              <div className="overflow-x-auto pb-6 scrollbar-hide">
                <div className="flex gap-6 min-w-max">
                  {category.news.map((item, idx) => (
                    <div
                      key={idx}
                      className="w-80 shrink-0 bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/70 dark:border-slate-700/50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Image placeholder */}
                      <div className="relative h-48 bg-linear-to-br from-indigo-100 to-blue-100 dark:from-slate-700 dark:to-slate-600">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-medium">
                          [News Image]
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-base line-clamp-3">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}