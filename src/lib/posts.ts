export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
};

export const posts: BlogPost[] = [
  {
    slug: "reduce-service-complexity",
    title: "把服务写小一点，系统会更稳定",
    excerpt:
      "复盘我在 Go 服务里拆分职责、收敛依赖和降低变更风险的几个实际做法。",
    category: "工程",
    date: "03 Mar 2026",
    readTime: "6 min",
    tags: ["Go", "架构", "重构"],
    featured: true,
  },
  {
    slug: "project-structure-that-scales",
    title: "我如何设计一个可长期维护的项目目录结构",
    excerpt:
      "目录结构的目标不是看起来完整，而是让新需求进入时不会立即打破原有边界。",
    category: "后端",
    date: "24 Feb 2026",
    readTime: "8 min",
    tags: ["项目结构", "Go", "工程化"],
    featured: true,
  },
  {
    slug: "technical-blog-writing",
    title: "技术博客适合写什么，不适合写什么",
    excerpt:
      "技术分享更有价值的部分，往往是问题背景、权衡过程和失败记录，而不是结论本身。",
    category: "写作",
    date: "18 Feb 2026",
    readTime: "5 min",
    tags: ["技术写作", "复盘", "分享"],
    featured: true,
  },
  {
    slug: "grpc-timeout-design",
    title: "gRPC 超时策略应该放在哪一层",
    excerpt:
      "接口层、服务层和下游客户端都能设置超时，但真正稳定的做法不是每层都随便加一个数字。",
    category: "系统设计",
    date: "10 Feb 2026",
    readTime: "7 min",
    tags: ["gRPC", "超时", "系统设计"],
  },
  {
    slug: "query-performance-checklist",
    title: "一次查询变慢之后，我会先检查什么",
    excerpt:
      "从索引、执行计划、缓存到调用链，我把常用排查顺序整理成了一个固定清单。",
    category: "性能",
    date: "06 Feb 2026",
    readTime: "7 min",
    tags: ["MySQL", "性能", "排障"],
  },
  {
    slug: "redis-not-always-cache",
    title: "Redis 不是加上去就会更快",
    excerpt:
      "缓存命中率、失效策略和一致性成本，如果不提前想清楚，Redis 只会把问题藏起来。",
    category: "架构",
    date: "30 Jan 2026",
    readTime: "6 min",
    tags: ["Redis", "缓存", "系统设计"],
  },
  {
    slug: "log-field-conventions",
    title: "日志字段统一之后，排障效率为什么会突然提高",
    excerpt:
      "很多排障问题并不是监控不够，而是日志结构长期不统一，导致上下文无法串联。",
    category: "可观测性",
    date: "23 Jan 2026",
    readTime: "4 min",
    tags: ["日志", "可观测性", "排障"],
  },
  {
    slug: "ai-coding-boundaries",
    title: "我怎样把 AI 用在编码里，而不是把判断交给 AI",
    excerpt:
      "AI 适合加快试探和整理，但系统边界、代码质量和最终取舍仍然需要开发者负责。",
    category: "效率",
    date: "16 Jan 2026",
    readTime: "5 min",
    tags: ["AI", "开发效率", "工作流"],
  },
  {
    slug: "api-error-contract",
    title: "接口错误码为什么需要像协议一样被设计",
    excerpt:
      "错误码如果只是临时补出来的字符串，最后会变成客户端和服务端都难以维护的灰区。",
    category: "API 设计",
    date: "08 Jan 2026",
    readTime: "6 min",
    tags: ["API", "错误处理", "协议"],
  },
];

export const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);

export const recentTags = [
  "Go",
  "架构",
  "系统设计",
  "性能",
  "AI",
  "技术写作",
];

export const keywordHints = [
  "项目结构",
  "超时",
  "缓存",
  "日志",
  "错误码",
  "重构",
];
