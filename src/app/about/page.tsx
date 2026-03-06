import Link from "next/link";

const timeline = [
  "主要做后端开发，日常使用golang，前端开发基本靠AI辅助，偶尔会写一些小工具和组件。",
  "关注工程可维护性，也会持续整理性能优化和组件设计相关经验。",
  "希望把这个博客做成长期更新的个人技术归档，而不是短期内容堆积。",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(214,211,209,0.08),transparent_26%),linear-gradient(180deg,#111111_0%,#151515_100%)] text-stone-100">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-12 sm:px-8 sm:py-16">
        <section className="border-b border-white/8 pb-10">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
            About Me
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            你好，我是一名后端开发者。
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-400">
            这个页面用来做简单介绍。我的主要兴趣在后端工程、系统设计和技术写作，所以博客内容也会围绕这些方向展开。
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
              Intro
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-100">
              我在这里写什么
            </h2>
          </div>
          <div className="space-y-4">
            {timeline.map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-5 text-base leading-8 text-stone-400"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
            Contact
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-stone-400">
            如果后面你要把这里扩展成完整个人站，这一页可以继续加入项目经历、技术栈、联系方式和社交链接。
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-stone-100 px-5 text-sm font-medium text-stone-950 transition hover:bg-stone-300"
          >
            返回首页
          </Link>
        </section>
      </div>
    </main>
  );
}