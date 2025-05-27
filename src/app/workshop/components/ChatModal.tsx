// ChatModal.tsx
import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { toast } from "sonner";

interface ChatModalProps {
  socket: any;
  carId: string;
  senderId: string;
  receiverId: string;
  onClose: () => void;
}
type Message = {
  _id?: string;
  car: string;
  sender: string;
  receiver: string;
  content: string;
  createdAt?: string;
};
const ChatModal = ({
  socket,
  carId,
  senderId,
  receiverId,
  onClose,
}: ChatModalProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch chat history
    const fetchMessages = async () => {
      const res = await fetch(siteConfig.links.chat + carId, {
        credentials: "include",
      });
      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();

    socket.on("receive", (msg: Message) => {
      if (msg.car === carId) setMessages((prev) => [...prev, msg]);
      toast.info(msg.content + " from client :" + msg.sender);
    });

    return () => {
      socket.off("receive");
    };
  }, [carId, socket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const msg = {
      carId,
      sender: senderId,
      receiver: receiverId,
      content: input.trim(),
      createdAt:new Date()
    };
    socket.emit("send", msg);
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl w-full max-w-md h-[70vh] flex flex-col">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">
            Chat for Car #{carId.slice(-4)}
          </h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex-1 overflow-y-auto mt-2 mb-2">
          {messages.map((m, i) => {
            const time = new Date(m.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div
                key={i}
                className={`p-2 my-1 rounded-md max-w-[75%] flex flex-col text-sm ${
                  m.sender === senderId
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
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-md px-2 py-1"
            placeholder="Type a message"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
