import { NextResponse } from "next/server";
import { getClickCounts, incrementClick, validLinkIds } from "@/lib/clicks";
import { isMongoConfigured } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// GET /api/click → { counts: { [linkId]: number } }
export async function GET() {
  const counts = await getClickCounts();
  return NextResponse.json({ counts });
}

// POST /api/click  body: { id: string } → { id, count }
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  if (typeof id !== "string" || !validLinkIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "클릭 수 저장소가 설정되지 않았습니다." }, { status: 503 });
  }

  try {
    const count = await incrementClick(id);
    return NextResponse.json({ id, count });
  } catch (err) {
    console.error("[clicks] 클릭 수 저장 실패:", err);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
