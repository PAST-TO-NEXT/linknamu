import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={profile.image}
        alt={`${profile.name} 프로필 사진`}
        width={112}
        height={112}
        className="h-28 w-28 rounded-full object-cover shadow-lg ring-4 ring-white dark:ring-gray-800"
      />
      <h1 className="mt-4 text-2xl font-bold">{profile.name}</h1>
      <p className="mt-1 text-gray-600 dark:text-gray-400">{profile.bio}</p>
    </header>
  );
}
