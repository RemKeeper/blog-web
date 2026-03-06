"use client";

import { useDeferredValue, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const initialMarkdown = `# 从一次慢查询开始

线上接口响应时间突然从 120ms 上升到 1.4s，我通常会先按下面的顺序排查：

1. 看调用链里是不是数据库查询时间异常。
2. 确认最近是否有索引、SQL 或数据量变化。
3. 对照执行计划，判断问题出在扫描范围还是排序阶段。

## 我会记录什么

- 问题出现的背景
- 排查顺序和判断依据
- 最终修复动作
- 这次排查对后续工程实践的影响

> 技术文章真正有价值的部分，通常不是结论，而是过程里的取舍。



\`\`\`go
ctx, cancel := context.WithTimeout(ctx, 200*time.Millisecond)
defer cancel()

rows, err := db.QueryContext(ctx, query)
if err != nil {
    return err
}
\`\`\`
`;

const initialTags = ["Go", "性能", "排障"];

export function PostEditor() {
  const [title, setTitle] = useState("一次慢查询排查的完整记录");
  const [summary, setSummary] = useState(
    "把一次真实线上问题整理成可复用的排查清单，方便后续继续沉淀成系列文章。"
  );
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(initialTags);

  const deferredMarkdown = useDeferredValue(markdown);

  const addTag = (rawValue: string) => {
    const value = rawValue.trim();

    if (!value || tags.includes(value)) {
      return;
    }

    setTags((current) => [...current, value]);
    setTagInput("");
  };

  const removeTag = (target: string) => {
    setTags((current) => current.filter((tag) => tag !== target));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-7">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
            Editor
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-100">
            博客发布页面
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-stone-400">
            这是发布页原型。你可以在这里编写 Markdown 正文、整理摘要，并维护文章标签，右侧会同步展示渲染效果。
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-stone-400" htmlFor="post-title">
              文章标题
            </label>
            <input
              id="post-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-stone-100 placeholder:text-stone-500 focus:border-white/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-stone-400" htmlFor="post-summary">
              摘要
            </label>
            <textarea
              id="post-summary"
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              rows={3}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-stone-100 placeholder:text-stone-500 focus:border-white/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-stone-400" htmlFor="post-tags">
              标签
            </label>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-stone-300 transition hover:border-white/20 hover:text-white"
                  >
                    #{tag} ×
                  </button>
                ))}
              </div>
              <input
                id="post-tags"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === ",") {
                    event.preventDefault();
                    addTag(tagInput);
                  }
                }}
                onBlur={() => addTag(tagInput)}
                placeholder="输入标签后按 Enter 或逗号"
                className="mt-3 h-11 w-full bg-transparent px-1 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-stone-400" htmlFor="post-markdown">
              Markdown 正文
            </label>
            <textarea
              id="post-markdown"
              value={markdown}
              onChange={(event) => setMarkdown(event.target.value)}
              rows={20}
              className="min-h-[420px] w-full rounded-[1.5rem] border border-white/10 bg-[#0d0d0d] px-4 py-4 font-mono text-sm leading-7 text-stone-200 placeholder:text-stone-600 focus:border-white/20 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-white/8 pt-4">
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-full bg-stone-100 px-5 text-sm font-medium text-stone-950 transition hover:bg-stone-300"
          >
            保存草稿
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-full border border-white/10 px-5 text-sm text-stone-300 transition hover:border-white/20 hover:text-white"
          >
            预览发布
          </button>
        </div>
      </section>

      <section className="space-y-5 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
              Preview
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-100">
              {title || "未命名文章"}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-stone-400">
              {summary || "这里会显示文章摘要。"}
            </p>
          </div>
          <div className="text-right text-sm text-stone-500">
            <p>Markdown Render</p>
            <p className="mt-2">草稿预览</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 text-sm text-stone-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <article className="space-y-5 text-base leading-8 text-stone-300">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-semibold tracking-tight text-stone-100">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="pt-4 text-2xl font-semibold tracking-tight text-stone-100">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="pt-3 text-xl font-semibold tracking-tight text-stone-100">
                  {children}
                </h3>
              ),
              p: ({ children }) => <p className="text-stone-300">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc space-y-2 pl-6 text-stone-300">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal space-y-2 pl-6 text-stone-300">{children}</ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l border-white/15 pl-4 text-stone-400 italic">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isBlock = Boolean(className);

                if (isBlock) {
                  return (
                    <code className="block overflow-x-auto rounded-2xl bg-black/30 px-4 py-3 font-mono text-sm text-stone-200">
                      {children}
                    </code>
                  );
                }

                return (
                  <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm text-stone-200">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => <pre className="my-4">{children}</pre>,
            }}
          >
            {deferredMarkdown}
          </ReactMarkdown>
        </article>
      </section>
    </div>
  );
}
