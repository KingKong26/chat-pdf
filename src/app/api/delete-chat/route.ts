import { db } from "@/lib/db";
import { chats, messages } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { chat_id } = body;
    console.log(chat_id);
    const message = await db
      .delete(messages)
      .where(eq(messages.chatId, chat_id));

    console.log("message", message);
    const chat = await db.delete(chats).where(eq(chats.id, chat_id));
    console.log("chat", chat);
    return NextResponse.json(
      {
        chat_id: chat,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
