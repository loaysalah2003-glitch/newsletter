/*import { notFound } from "next/navigation"

type News = {
  slug: string
  title: string
  content: string
}

const NEWS: News[] = [
  {
    slug: "ai-conference",
    title: "AI Conference at MTI",
    content:
      "MTI University hosted an international AI conference with experts from all over the world...",
  },
  {
    slug: "sports-day",
    title: "Annual Sports Day",
    content:
      "Students participated in various sports competitions during the annual sports day...",
  },
]

export default function NewsPage({
  params,
}: {
  params: { slug: string }
}) {
  const news = NEWS.find((n) => n.slug === params.slug)

  if (!news) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">{news.title}</h1>
      <p className="text-lg text-zinc-700 leading-relaxed">
        {news.content}
      </p>
    </div>
  )
}
*/

/*import { notFound } from "next/navigation";

type News = {
  slug: string;
  title: string;
  content: string;
};

const NEWS: News[] = [
  {
    slug: "ai-conference",
    title: "AI Conference at MTI",
    content:
      "MTI University hosted an international AI conference with experts from all over the world...",
  },
  {
    slug: "sports-day",
    title: "Annual Sports Day",
    content:
      "Students participated in various sports competitions during the annual sports day...",
  },
];

interface NewsPageProps {
  params: { slug: string };
}

export default function NewsPage({ params }: NewsPageProps) {
  const news = NEWS.find((n) => n.slug === params.slug);

  if (!news) {
    notFound(); // <- This triggers the 404
  }

  return (
    <div className="max-w-3xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">{news.title}</h1>
      <p className="text-lg text-zinc-700 leading-relaxed">{news.content}</p>
    </div>
  );
}*/

// news/[slug]/page.tsx
/*import { notFound } from "next/navigation";




type News = {
  slug: string;
  title: string;
  content: string;
};

const NEWS: News[] = [
  {
    slug: "ai-conference",
    title: "AI Conference at MTI",
    content:
      "MTI University hosted an international AI conference with experts from all over the world...",
  },
  {
    slug: "sports-day",
    title: "Annual Sports Day",
    content:
      "Students participated in various sports competitions during the annual sports day...",
  },
];

export default function NewsPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log("Params received:", params); // <-- check this
  const news = NEWS.find((n) => n.slug === params.slug);

  if (!news) {
    console.log("News not found!"); // <-- check this
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">{news.title}</h1>
      <p className="text-lg text-zinc-700 leading-relaxed">{news.content}</p>
    </div>
  );
}*/

'use client'

import { notFound } from "next/navigation";

// Define the type for your news
type News = {
  slug: string;
  title: string;
  content: string;
};

// Mocked news data
const NEWS: News[] = [
  {
    slug: "ai-conference",
    title: "AI Conference at MTI",
    content:
      "MTI University hosted an international AI conference with experts from all over the world...",
  },
  {
    slug: "sports-day",
    title: "Annual Sports Day",
    content:
      "Students participated in various sports competitions during the annual sports day...",
  },
];

// Props type for this page
type NewsPageProps = {
  params: { slug: string };
};

export default function NewsPage({ params }: NewsPageProps) {
  // Debug: check params
  console.log("Params received:", params);

  // Find the news matching the slug
  const news = NEWS.find((n) => n.slug === params.slug);

  if (!news) {
    console.log("News not found!");
    notFound(); // Next.js will show 404
  }

  return (
    <div className="max-w-3xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">{news.title}</h1>
      <p className="text-lg text-zinc-700 leading-relaxed">{news.content}</p>
    </div>
  );
}


