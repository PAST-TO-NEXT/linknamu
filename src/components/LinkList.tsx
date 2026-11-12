"use client";

import { useCallback, useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 표시
  const [counts, setCounts] = useState<Counts>({});

  // 페이지가 열리면 모든 링크의 클릭 수를 한 번에 가져온다
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/click", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { counts?: Counts }) => {
        const fetched = data.counts ?? {};
        // 응답 도착 전에 클릭한 값이 덮어써지지 않도록 큰 값을 유지
        setCounts((prev) => {
          const next: Counts = { ...fetched };
          for (const [id, n] of Object.entries(prev)) next[id] = Math.max(n, fetched[id] ?? 0);
          return next;
        });
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error("[clicks] 클릭 수 조회 실패:", err);
      });
    return () => controller.abort();
  }, []);

  const handleClick = useCallback((id: string) => {
    // 즉시 +1 표시 (낙관적 업데이트)
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    // keepalive: 새 탭으로 이동하거나 페이지를 떠나도 요청이 끝까지 전송됨
    fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { count?: number }) => {
        if (typeof data.count !== "number") return;
        const count = data.count;
        // 서버가 돌려준 실제 값으로 맞춤
        setCounts((prev) => ({ ...prev, [id]: Math.max(prev[id] ?? 0, count) }));
      })
      .catch((err) => console.error("[clicks] 클릭 수 저장 실패:", err));
  }, []);

  return (
    <ul className="mt-12 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} clicks={counts[link.id] ?? 0} onClick={handleClick} />
        </li>
      ))}
    </ul>
  );
}
