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
    <main className="mx-auto flex min-h-screen w-full max-w-[26rem] flex-col px-6 pb-14 pt-20 sm:pt-24">
      <ThemeToggle />
      <ProfileHeader profile={profile} />
      <ul className="mt-12 flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} initialClicks={counts[link.id] ?? 0} />
          </li>
        ))}
      </ul>
      <footer className="mt-auto pt-16 text-center text-xs tracking-wide text-stone-400 dark:text-stone-600">
        링크나무
      </footer>
    </main>
  );
}
