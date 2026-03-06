"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { BlogPost } from "@/lib/posts";
import { keywordHints } from "@/lib/posts";

type PostsSearchPanelProps = {
  posts: BlogPost[];
  recentTags: string[];
};

export function PostsSearchPanel({ posts, recentTags }: PostsSearchPanelProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const trimmedQuery = query.trim();
  const isAiMode = trimmedQuery.startsWith("/ai");

  const previewAiMatches = useMemo(() => posts.slice(0, 3), [posts]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
        setFocused(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded]);

  return (
    <div className="space-y-8">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded(true)}
        className={`fixed left-4 top-24 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-[#111111]/90 px-4 py-3 text-left text-stone-200 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-[#181818] sm:left-6 sm:top-28 ${expanded ? "pointer-events-none -translate-x-6 opacity-0" : "translate-x-0 opacity-100"}`}
      >
        <span className="inline-flex size-2 rounded-full bg-stone-300" />
        <span className="text-sm">搜索文章</span>
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px] transition duration-300 ${expanded ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => {
          setExpanded(false);
          setFocused(false);
        }}
      />

      <div
        className={`fixed left-4 right-4 top-24 z-50 origin-top-left rounded-[1.75rem] border border-white/10 bg-[#111111]/96 p-5 shadow-[0_32px_120px_rgba(0,0,0,0.42)] backdrop-blur transition-all duration-300 sm:left-6 sm:right-auto sm:top-28 sm:w-[32rem] sm:p-6 ${expanded ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-4 scale-95 opacity-0"}`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                Search
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-100">
                所有文章
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setExpanded(false);
                setFocused(false);
              }}
              className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-stone-400 transition hover:border-white/20 hover:text-white"
            >
              关闭
            </button>
          </div>

          <div className="space-y-3">
            <input
              autoFocus={expanded}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                window.setTimeout(() => setFocused(false), 120);
              }}
              placeholder="搜索标题、标签，或输入 /ai 你的问题"
              className="h-13 w-full rounded-full border border-white/10 bg-black/20 px-5 text-sm text-stone-100 placeholder:text-stone-500 focus:border-white/20 focus:outline-none"
            />

            {(focused || trimmedQuery.length === 0) && (
              <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-4">
                <div className="flex flex-wrap gap-2">
                  {recentTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => setQuery(tag)}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-stone-300 transition hover:border-white/20 hover:text-white"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {keywordHints.map((keyword) => (
                    <button
                      key={keyword}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => setQuery(keyword)}
                      className="rounded-full bg-white/[0.05] px-3 py-1.5 text-sm text-stone-400 transition hover:bg-white/[0.08] hover:text-stone-200"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-stone-500">
                  这里只保留页面效果预览。聚焦后可以点最近标签查看交互状态，输入 /ai 加空格后跟问题会切换到 AI 搜索展示样式。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isAiMode ? (
        <section className="space-y-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
              AI Search
            </p>
            <p className="mt-3 text-base leading-8 text-stone-300">
              这里是 AI 搜索结果区的视觉预览。后续你接入后端后，可以把自然语言问题映射成文章推荐、标签召回或全文检索结果。
            </p>
            <p className="mt-2 text-sm text-stone-500">
              示例命令：/ai 如何设计稳定的缓存策略
            </p>
          </div>

          <div className="space-y-4">
            {previewAiMatches.map((post, index) => (
              <article
                key={post.slug}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                      AI 推荐 {index + 1}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-100">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-sm text-stone-500">{post.date}</p>
                </div>
                <p className="mt-4 text-base leading-8 text-stone-400">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-sm text-stone-500">
                  这里可以展示 AI 给出的推荐原因、问题摘要或相关文章解释。
                </p>
                <div className="mt-5 flex items-center gap-3 text-sm text-stone-400">
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span>{post.tags.join(" / ")}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center justify-between text-sm text-stone-500">
            <span>共 {posts.length} 篇文章</span>
            <Link href="/" className="transition hover:text-stone-200">
              返回首页
            </Link>
          </div>
          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                      {post.category}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-100">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-sm text-stone-500">{post.date}</p>
                </div>
                <p className="mt-4 text-base leading-8 text-stone-400">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-stone-400">
                  <span>{post.readTime}</span>
                  <span className="text-stone-600">·</span>
                  {post.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-stone-400 transition hover:border-white/20 hover:text-stone-100"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
