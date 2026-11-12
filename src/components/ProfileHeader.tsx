import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 입체감: 바깥 그림자 + 반투명 테두리 + 위쪽 하이라이트 */}
      <div className="relative rounded-full p-1.5 bg-white/50 shadow-[0_18px_40px_-16px_rgba(168,92,52,0.45),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-white/70 backdrop-blur-md dark:bg-white/5 dark:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)] dark:ring-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={112}
          height={112}
          className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1.5 rounded-full bg-gradient-to-b from-white/25 to-transparent"
        />
      </div>
      <h1 className="mt-6 text-[1.625rem] font-semibold tracking-[-0.02em] text-stone-800 dark:text-stone-50">
        {profile.name}
      </h1>
      <p className="mt-2 max-w-[18rem] text-[0.9375rem] leading-relaxed text-stone-500 break-keep text-balance dark:text-stone-400">
        {profile.bio}
      </p>
    </header>
  );
}
