
// Extended news data (same slugs as home page + more details)
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Share2, Heart, Bookmark, User } from "lucide-react"

// Your news data
const newsData = [
  {
    slug: "ai-conference",
    title: "AI Conference at MTI Draws Global Experts",
    category: "Technology",
    date: "February 28, 2026",
    readTime: "8 min read",
    author: "Dr. Hesham ElDeeb",
    excerpt: "MTI University hosted an international AI conference with experts from all over the world discussing the latest advancements in artificial intelligence and machine learning applications in education.",
    fullContent: `
The two-day conference brought together over 450 researchers, professors, industry leaders and students from 28 countries.

Key highlights:
• Keynote by Prof. Maria Gonzalez: "AI for Sustainable Education in 2030"
• Panel on Ethical AI in University Governance
• 62 research paper presentations (45 accepted)
• Launch of MTI AI Innovation Lab (Fall 2026 opening announced)

The event concluded with the signing of 4 international collaboration agreements and a student hackathon prize ceremony.
    `,
    image: "/newsimage/conference.jpg"
  },
  {
    slug: "sports-day",
    title: "MTI Wins Big at Annual Inter-University Sports Day",
    category: "Sports",
    date: "February 25, 2026",
    readTime: "6 min read",
    author: "Sports Committee",
    excerpt: "Students participated in various sports competitions during the annual sports day, promoting teamwork, health, and university spirit across all faculties.",
    fullContent: `
This year's theme "One Campus – One Spirit" saw record participation of 1,400+ students.

Events included:
• Inter-faculty football & basketball finals
• 100m sprint, long jump, relay races
• Tug-of-war, volleyball tournament
• Faculty vs students fun matches

Winners received trophies and medals during the closing ceremony attended by the university president and deans.
    `,
    image: "/newsimage/sport.jpg",
  },
  {
    slug: "fun-day",
    title: "Annual Fun Day Brings Record Attendance",
    category: "Campus Life",
    date: "February 22, 2026",
    readTime: "5 min read",
    author: "Student Activities",
    excerpt: "A day full of games, music, food stalls and entertainment for all students and staff.",
    fullContent: `
The annual Fun Day featured:
• Live music performances
• Food trucks and BBQ zone
• Giant games (Jenga, twister, sack race)
• Photo booths and carnival games
• Raffle draw with prizes

Over 2,000 attendees enjoyed a relaxing day of laughter and community bonding.
    `,
    image: "/newsimage/funday.jpg"
  },
]

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const article = newsData.find((item) => item.slug === slug)

  if (!article) {
    notFound()
  }

  const related = newsData.filter((item) => item.slug !== slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-2"
          asChild
        >
          <Link href="/">
            <ArrowLeft size={18} /> Back to Edition
          </Link>
        </Button>

        {/* Hero / Lead Image + Headline */}
        <div className="relative h-130 md:h-155 rounded-3xl overflow-hidden mb-12 shadow-2xl">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-zinc-800 to-black" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 text-white">
            <div className="uppercase text-xs tracking-[4px] font-medium mb-4 opacity-90">
              {article.category.toUpperCase()}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight drop-shadow-2xl">
              {article.title}
            </h1>

            <div className="mt-8 flex items-center gap-6 text-sm md:text-base opacity-90">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {article.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                By {article.author}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Column */}
          <div className="lg:col-span-8">
            <article className="prose prose-zinc dark:prose-invert max-w-none text-[17px] leading-relaxed">
              {/* Lead / Excerpt with drop-cap */}
              <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-black first-letter:dark:text-white first-letter:float-left first-letter:mr-4 first-letter:-mt-2 text-2xl font-medium text-zinc-800 dark:text-zinc-200">
                {article.excerpt}
              </p>

              <div className="whitespace-pre-line mt-10 text-zinc-800 dark:text-zinc-200">
                {article.fullContent}
              </div>
            </article>

            {/* Action Bar */}
            <div className="mt-16 flex items-center gap-4 border-t border-zinc-300 dark:border-zinc-700 pt-8">
              <Button variant="outline" size="lg" className="gap-3 text-base">
                <Bookmark className="h-5 w-5" /> Save for Later
              </Button>
              <Button variant="outline" size="lg" className="gap-3 text-base">
                <Share2 className="h-5 w-5" /> Share
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start space-y-10">
            <div className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
              <div className="uppercase text-xs tracking-widest text-zinc-500 mb-3">About the Author</div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">{article.author}</p>
                  <p className="text-xs text-zinc-500">Faculty of computer science</p>
                </div>
              </div>
            </div>

            <div className="text-xs uppercase tracking-widest text-zinc-500 border-t border-zinc-300 dark:border-zinc-700 pt-6">
              This article was originally published in the CampusPulse Daily Edition
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-zinc-300 dark:border-zinc-700">
            <div className="uppercase text-xs tracking-[2px] font-medium text-zinc-500 mb-8">
              More Stories from CampusPulse
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/news/${rel.slug}`}
                  className="group"
                >
                  <div className={`aspect-video w-full rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-slate-700 dark:to-slate-800 mb-5 overflow-hidden`}>
                    {rel.image && (
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        width={600}
                        height={340}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <h3 className="font-semibold text-2xl leading-tight group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors line-clamp-3">
                    {rel.title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}