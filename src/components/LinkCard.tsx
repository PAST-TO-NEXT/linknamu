"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  initialClicks: number;
};

export default function LinkCard({ link, initialClicks }: Props) {
  const [clicks, setClicks] = useState(initialClicks);

  const handleClick = () => {
    setClicks((c) => c + 1);
    const body = JSON.stringify({ id: link.id });
    // 페이지를 떠나도 요청이 끊기지 않도록 sendBeacon 우선 사용
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/click", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group flex items-center gap-4 rounded-[1.75rem] border border-white/70 bg-white/45 px-6 py-5 shadow-[0_10px_30px_-18px_rgba(140,80,45,0.35),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_16px_36px_-20px_rgba(140,80,45,0.4),inset_0_1px_0_rgba(255,255,255,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] dark:hover:bg-white/[0.09]"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[1.0625rem] font-semibold tracking-[-0.01em] text-stone-800 dark:text-stone-100">
          {link.title}
        </p>
        {link.description && (
          <p className="mt-0.5 truncate text-sm text-stone-500 dark:text-stone-400">{link.description}</p>
        )}
      </div>
      <span
        className="shrink-0 text-xs tabular-nums text-stone-400 dark:text-stone-500"
        title="클릭 수"
        aria-label={`클릭 ${clicks}회`}
      >
        {clicks.toLocaleString("ko-KR")}
      </span>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="h-4 w-4 shrink-0 text-stone-400 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-stone-600 dark:text-stone-500 dark:group-hover:text-stone-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 11 11 5M6 5h5v5" />
      </svg>
    </a>
  );
}
