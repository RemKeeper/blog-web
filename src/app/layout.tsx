import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiet Journal",
  description: "一个专注前端、工程实践与技术思考的个人博客。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={cn("font-sans", jetbrainsMono.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <header className="border-b border-white/8">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5 sm:px-8">
            <div className="flex items-center gap-5 text-sm text-stone-300">
              <Link
                href="/about"
                className="transition hover:text-white"
              >
                关于我
              </Link>
              <Link
                href="/write"
                className="transition hover:text-white"
              >
                写文章
              </Link>
            </div>
            <Link
              href="/"
              className="text-sm uppercase tracking-[0.24em] text-stone-500 transition hover:text-stone-200"
            >
              Quiet Journal
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
