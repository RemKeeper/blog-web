import type { Metadata } from "next";

import { PostsSearchPanel } from "@/components/posts-search-panel";
import { posts, recentTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "所有文章 | Quiet Journal",
  description: "浏览全部技术文章的页面原型，包含搜索框、标签入口和 AI 搜索展示区。",
};

export default function PostsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(214,211,209,0.08),transparent_26%),linear-gradient(180deg,#111111_0%,#151515_100%)] text-stone-100">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
        <PostsSearchPanel posts={posts} recentTags={recentTags} />
      </div>
    </main>
  );
}
