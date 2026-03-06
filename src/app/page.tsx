import Link from "next/link";

import { featuredPosts } from "@/lib/posts";

const topics = [
  "Go 服务开发",
  "系统设计",
  "性能与可维护性",
  "技术写作与复盘",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(214,211,209,0.08),transparent_26%),linear-gradient(180deg,#111111_0%,#151515_100%)] text-stone-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-12 sm:px-8 sm:py-16">
        <section className="border-b border-white/8 pb-12">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
            Personal Tech Blog
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-stone-100 sm:text-5xl lg:text-6xl">
            分享后端开发、工程实践和一些值得留下的技术笔记。
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-400">
            这个博客主要记录我在实际项目中的思考和总结，内容会尽量直接，少一点包装，多一点可复用的经验。
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-stone-400">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-white/10 px-4 py-2"
              >
                {topic}
              </span>
            ))}
          </div>
          <div className="mt-8 flex gap-4">
            <Link
              href="/posts"
              className="inline-flex h-11 items-center rounded-full bg-stone-100 px-5 text-sm font-medium text-stone-950 transition hover:bg-stone-300"
            >
              查看全部文章
            </Link>
            <Link
              href="/about"
              className="inline-flex h-11 items-center rounded-full border border-white/10 px-5 text-sm text-stone-300 transition hover:border-white/20 hover:text-white"
            >
              了解作者
            </Link>
          </div>
        </section>

        <section id="posts" className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
              Recent Posts
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-100">
              最近文章
            </h2>
            <p className="mt-4 max-w-sm text-base leading-8 text-stone-400">
              这里会持续整理项目中的问题、方案选择和实现细节。
            </p>
          </div>

          <div className="space-y-4">
            {featuredPosts.map((post) => (
              <article
                key={post.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                      {post.category}
                    </p>
                    <h4 className="mt-3 text-2xl font-semibold tracking-tight text-stone-100">
                      {post.title}
                    </h4>
                  </div>
                  <p className="text-sm text-stone-500">{post.date}</p>
                </div>
                <p className="mt-4 max-w-2xl text-base leading-8 text-stone-400">
                  {post.excerpt}
                </p>
                <Link href="/posts" className="mt-6 inline-flex text-sm text-stone-300 transition hover:text-white">
                  在文章页查看
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/8 pt-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                Writing Focus
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-100">
                内容会尽量贴近真实项目。
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-stone-400">
              我会把这里当作个人技术沉淀的出口，写组件设计、项目结构、性能问题、重构决策，也写一些做完项目之后值得记录的复盘。
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
