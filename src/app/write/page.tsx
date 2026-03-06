import type { Metadata } from "next";

import { PostEditor } from "@/components/post-editor";

export const metadata: Metadata = {
  title: "写文章 | Quiet Journal",
  description: "博客发布页原型，支持 Markdown 预览和标签编辑。",
};

export default function WritePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(214,211,209,0.08),transparent_26%),linear-gradient(180deg,#111111_0%,#151515_100%)] text-stone-100">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
        <PostEditor />
      </div>
    </main>
  );
}