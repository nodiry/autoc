// components/chatBox.tsx
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { siteConfig } from "@/config/site";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  carId: string;
  userId: string;
  dealerId: string;
  role: "buyer" | "dealer";
  chatEnabled: boolean;
};

type Message = {
  _id?: string;
  car: string;
  sender: string;
  receiver: string;
  content: string;
  createdAt?: string;
};

export default function ChatBox({
  carId,
  userId,
  dealerId,
  role,
  chatEnabled,
}: Props) {
  const socketRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const receiverId = role === "buyer" ? dealerId : userId;

  useEffect(() => {
    if (!chatEnabled || !open) return;

    socketRef.current = io(siteConfig.ws.chat, {
      auth: { userId },
      withCredentials: true,
    });

    socketRef.current.on("receive", (msg: Message) => {
      if (msg.car === carId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [carId, userId, chatEnabled, open]);

  useEffect(() => {
    if (!chatEnabled || !open) return;

    axios
      .get(siteConfig.links.chat + carId, { withCredentials: true })
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, [carId, chatEnabled, open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const message = {
      carId,
      sender: userId,
      receiver: receiverId,
      content: input.trim(),
      createdAt:new Date().toString()
    };

    socketRef.current.emit("send", message);
    setMessages((prev) => [...prev, { ...message, car: carId }]);
    setInput("");
  };

  if (!chatEnabled) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Chat</Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] max-w-sm h-[90%] flex flex-col p-0 overflow-hidden">
        <div className="bg-blue-600 text-white p-3 font-semibold text-center">
          Live Chat
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
          {messages.map((m, i) => {
            const time = new Date(m.createdAt || "").toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div
                key={i}
                className={`p-2 my-1 rounded-md max-w-[75%] flex flex-col text-sm ${
                  m.sender === userId
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-200"
                }`}
              >
                <span className="text-xs opacity-70 mb-1">{time}</span>
                {m.content}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        <div className="flex p-2 border-t gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-md px-2 py-1 text-sm"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md"
          >
            Send
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
