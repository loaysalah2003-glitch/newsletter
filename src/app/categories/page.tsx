'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"

const categories = [
  {
    slug: "technology",
    title: "Technology",
    description: "Latest innovations, AI research, cybersecurity, and digital transformation on campus.",
    news: [
      { 
        title: "AI Research Breakthrough", 
        excerpt: "New AI models developed by university researchers promise to revolutionise personalised learning.",
        image: "/news/ai-research.jpg" 
      },
      { 
        title: "Cybersecurity Workshop", 
        excerpt: "Hands-on session equips students with tools to defend against modern digital threats.",
        image: "/news/cyber-workshop.jpg" 
      },
      { 
        title: "New Computer Labs", 
        excerpt: "State-of-the-art labs with latest hardware now open for Computer Science students.",
        image: "/news/new-labs.jpg" 
      },
    ],
  },
  {
    slug: "sports",
    title: "Sports",
    description: "University teams, tournaments, fitness events, and campus sports life.",
    news: [
      { 
        title: "Annual Sports Day", 
        excerpt: "Record participation as students compete across 15 different athletic events.",
        image: "/news/sports-day.jpg" 
      },
      { 
        title: "Football Team Wins", 
        excerpt: "MTI football team defeats Cairo University 3-2 in thrilling final.",
        image: "/news/football-win.jpg" 
      },
      { 
        title: "New Gym Facilities", 
        excerpt: "Modern gym and fitness centre now open 24/7 for all students and staff.",
        image: "/news/new-gym.jpg" 
      },
    ],
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif mt-20">


      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="border-b border-zinc-300 dark:border-zinc-700 pb-10 mb-16">
          <div className="uppercase text-xs tracking-[4px] text-zinc-500 mb-3">INSIDE TODAY’S PAPER</div>
          <h1 className="text-6xl font-bold tracking-tight text-black dark:text-white">Categories &amp; Sections</h1>
          <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Find the stories that matter to you. Browse by section or dive straight into the latest updates.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-20">
          {categories.map((category) => (
            <section key={category.slug} className="border-b border-zinc-300 dark:border-zinc-700 pb-16 last:border-none last:pb-0">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <div className="uppercase tracking-[3px] text-xs text-zinc-500 mb-2">SECTION</div>
                  <h2 className="text-5xl font-bold text-black dark:text-white tracking-tight">
                    {category.title}
                  </h2>
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-black dark:border-white text-base px-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  asChild
                >
                  <Link href={`/categories/${category.slug}`}>
                    All {category.title} Stories →
                  </Link>
                </Button>
              </div>

              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mb-10">
                {category.description}
              </p>

              {/* Horizontal News Previews – Newspaper Style */}
              <div className="overflow-x-auto pb-8 scrollbar-hide">
                <div className="flex gap-8 min-w-max">
                  {category.news.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/news/${category.slug}-${idx}`} // you can improve slug logic later
                      className="group block w-80 shrink-0"
                    >
                      <div className="relative h-56 bg-zinc-200 dark:bg-zinc-800 overflow-hidden border border-zinc-300 dark:border-zinc-700 rounded-none">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-400 tracking-widest">
                            [PHOTO]
                          </div>
                        )}
                      </div>

                      <div className="mt-6">
                        <h3 className="font-bold text-2xl leading-tight text-black dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors line-clamp-3">
                          {item.title}
                        </h3>
                        <p className="mt-4 text-[15px] text-zinc-600 dark:text-zinc-400 line-clamp-4 leading-relaxed">
                          {item.excerpt}
                        </p>
                        <div className="mt-6 text-xs uppercase tracking-[2px] text-zinc-500 group-hover:text-black dark:group-hover:text-white">
                          READ FULL STORY →
                        </div>
                      </div>
                    </Link>
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