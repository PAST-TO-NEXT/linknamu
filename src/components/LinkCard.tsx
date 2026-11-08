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
      className="group flex items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-gray-900 dark:ring-white/10"
    >
      <div className="min-w-0">
        <p className="truncate font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
          {link.title}
        </p>
        {link.description && (
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">{link.description}</p>
        )}
      </div>
      <span
        className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
        title="클릭 수"
      >
        {clicks.toLocaleString("ko-KR")} 클릭
      </span>
    </a>
  );
}
