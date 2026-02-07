'use client'
import Link from "next/link"
import { Button } from '@/components/ui/button'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'



const newsList = [
  {
    slug: "ai-conference",
    title: "AI Conference at MTI",
    excerpt:
      "MTI University hosted an international AI conference with experts from all over the world...",
  },
  {
    slug: "sports-day",
    title: "Annual Sports Day",
    excerpt:
      "Students participated in various sports competitions during the annual sports day...",
  },
]

export default function Home() {
  return (
    <div className="mt-24 flex justify-center">
      <div className="w-full max-w-6xl">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2000 }}
          pagination={{ clickable: true }}
          loop
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          {[
            '/slider/university1.webp',
            '/slider/university2.webp',
          ].map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-87.5 w-full">
                <Image
                  src={src}
                  alt="Campus"
                  fill
                  
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                  priority={index === 0}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Text */}
                <div className="absolute bottom-8 left-8 text-white">
                  <h2 className="text-2xl font-bold">
                    Welcome to CampusPulse
                  </h2>
                  <p className="mt-2 text-sm max-w-md">
                    Stay updated with campus news, events, and announcements.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


        {/* Announcement Section */}
        <section className="max-w-5xl mx-auto mt-16 px-4">
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-md p-8">

            <h2 className="text-2xl font-bold text-center text-red-500 mb-6 tracking-wide">
              ANNOUNCEMENT
            </h2>

            <p className="text-zinc-700 text-lg leading-relaxed text-center">
              The university announces the start of registration for the new academic
              semester. Students are advised to complete their registration before the
              deadline and follow the official announcements for updates regarding
              schedules, courses, and campus activities.
            </p>

          </div>
        </section>

        <section className="max-w-6xl mx-auto mt-16 px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
            Latest News
          </h2>

          <div className="flex flex-wrap -mx-3 gap-4 justify-center">
            {[
              {
                title: "International Conference on Innovation",
                excerpt:
                  "The university hosted an international conference bringing together researchers and scholars from around the world to discuss innovation and sustainable development.",
                link: "/news/ai-conference",
              },
              {
                title: "New Library Facilities Opened",
                excerpt:
                  "The university has officially opened new library facilities equipped with modern study spaces, digital resources, and collaborative areas for students.",
                link: "/news/sports-day",
              },
            ].map((news, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between w-full sm:w-[48%] transition-shadow duration-300 hover:shadow-lg"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 underline">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{news.excerpt}</p>
                </div>
                

                <Button asChild className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  <Link href={news.link}>
                    See More
                  </Link>
                </Button>

              </div>
            ))}
          </div>
        </section>





      </div>
    </div >
  )
}





