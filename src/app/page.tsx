import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";

// 클릭 수를 매 요청마다 최신으로 보여주기 위해 동적 렌더링
export const dynamic = "force-dynamic";

export default async function Home() {
  const counts = await getClickCounts();

  return (
    <main className="mx-auto flex w-full max-w-md flex-col px-4 py-12 sm:py-16">
      <ThemeToggle />
      <ProfileHeader profile={profile} />
      <ul className="mt-8 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} initialClicks={counts[link.id] ?? 0} />
          </li>
        ))}
      </ul>
      <footer className="mt-12 text-center text-xs text-gray-400 dark:text-gray-600">🌳 링크나무</footer>
    </main>
  );
}
