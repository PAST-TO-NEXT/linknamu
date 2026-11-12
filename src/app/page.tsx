import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

// 클릭 수는 페이지가 열린 뒤 LinkList가 /api/click 에서 한 번에 가져온다
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[26rem] flex-col px-6 pb-14 pt-20 sm:pt-24">
      <ThemeToggle />
      <ProfileHeader profile={profile} />
      <LinkList links={links} />
      <footer className="mt-auto pt-16 text-center text-xs tracking-wide text-stone-400 dark:text-stone-600">
        링크나무
      </footer>
    </main>
  );
}
