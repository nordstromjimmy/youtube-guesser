import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

const filePath = join(process.cwd(), "src/data/songs/songs.json");

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const file = await readFile(filePath, "utf-8");
    const existing = JSON.parse(file);

    // Basic validation
    if (!body.id || !body.artist || !body.song) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for duplicate
    if (existing.find((e: any) => e.id === body.id)) {
      return NextResponse.json(
        { error: "Video already exists" },
        { status: 409 }
      );
    }

    const updated = [...existing, body];
    await writeFile(filePath, JSON.stringify(updated, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save song:", err);
    return NextResponse.json(
      { error: "Failed to write file" },
      { status: 500 }
    );
  }
}
