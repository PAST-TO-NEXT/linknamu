export type Profile = {
  name: string;
  bio: string;
  image: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

// TODO: 보여주기용 더미 값입니다. 실제 내용으로 교체하세요.
// 사진은 public/ 폴더에 넣고 image 경로를 바꾸면 됩니다.
export const profile: Profile = {
  name: "민현이",
  bio: "세계 최강 바이브코더",
  image: "/profile.svg",
};

// TODO: url을 내 계정 주소로 교체하세요. (예: https://github.com/내아이디)
// id는 클릭 수 집계 키로 쓰이므로 바꾸지 마세요.
export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com", description: "코드 저장소" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com", description: "경력 및 프로필" },
  { id: "blog", title: "Blog", url: "https://example.com/blog", description: "개발 기록" },
];
