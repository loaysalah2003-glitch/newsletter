'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

// Your mock news data (same as home page)
const mockNews = [
  { slug: "ai-conference", title: "AI Conference at MTI" },
  { slug: "sports-day", title: "Annual Sports Day" },
  { slug: "fun-day", title: "Annual Fun Day" },
  // ... add more
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const links = [
    { path: '/welcome', label: 'Welcome' },
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/categories', label: 'Categories' },
    { path: '/faq', label: 'FAQ' },
    { path: '/profile', label: 'Profile' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchQuery.trim().toLowerCase()
    if (!query) return

    // Try to find exact or near-exact match
    const matched = mockNews.find(
      (news) =>
        news.title.toLowerCase() === query ||
        news.slug.toLowerCase() === query ||
        news.title.toLowerCase().includes(query)
    )

    if (matched) {
      router.push(`/news/${matched.slug}`)
    } else {
      // Optional: fallback to search page or show toast
      alert(`No exact match found for "${searchQuery}". Try a different keyword.`)
      // Or: router.push(`/search?q=${encodeURIComponent(query)}`)
    }

    setSearchQuery('')
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo.jfif"
                alt="CampusPulse Logo"
                width={44}
                height={44}
                className="rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-xl bg-linear-to-br from-indigo-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              CampusPulse
            </span>
          </Link>

          {/* Desktop menu + Search */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <form onSubmit={handleSearch} className="relative w-72">
              <Input
                type="search"
                placeholder="Search news (e.g. AI Conference)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 bg-white/80 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500/30 rounded-full shadow-sm"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pt-4 pb-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/50 dark:border-slate-800/50">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-12 bg-white/80 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500/30 rounded-full shadow-sm w-full"
              />
              <button
                type="submit"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Mobile links */}
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="px-5 py-3 text-base font-medium text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
