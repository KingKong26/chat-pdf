"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle, PlusCircle, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import SubscriptionButton from "./SubscriptionButton";
import { useRouter } from "next/navigation";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const handleDelete = async (chat_id: number) => {
    try {
      const { data, status } = await axios.post("/api/delete-chat", {
        chat_id,
      });
      const index = chats.findIndex((item) => item.id === chat_id) - 1;

      router.replace("/chat/" + chats[index].id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full overflow-auto h-screen p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>
      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn(
                "rounded-lg px-3 py-2 text-slate-300 flex items-center",
                {
                  "bg-blue-600 text-white": chat.id === chatId,
                  "hover:text-white": chat.id !== chatId,
                }
              )}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>

              <Trash
                className="h-5 w-5"
                onClick={(event) => {
                  event.preventDefault();
                  handleDelete(chat.id);
                }}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 ">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link href={"/"}>Home</Link>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <SubscriptionButton isPro={isPro} />
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
