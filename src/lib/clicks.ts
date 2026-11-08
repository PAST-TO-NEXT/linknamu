import { links } from "@/data/profile";
import { getDb, isMongoConfigured } from "./mongodb";

type ClickDoc = { _id: string; count: number };

const COLLECTION = "clicks";

export const validLinkIds = new Set(links.map((l) => l.id));

/** 링크별 클릭 수. DB가 없거나 실패하면 빈 객체를 돌려줘 페이지는 정상 표시된다. */
export async function getClickCounts(): Promise<Record<string, number>> {
  if (!isMongoConfigured()) return {};
  try {
    const db = await getDb();
    const docs = await db.collection<ClickDoc>(COLLECTION).find({}).toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch (err) {
    console.error("[clicks] 클릭 수 조회 실패:", err);
    return {};
  }
}

export async function incrementClick(id: string): Promise<number> {
  const db = await getDb();
  const doc = await db
    .collection<ClickDoc>(COLLECTION)
    .findOneAndUpdate({ _id: id }, { $inc: { count: 1 } }, { upsert: true, returnDocument: "after" });
  return doc?.count ?? 1;
}
