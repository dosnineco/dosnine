import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppChat() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
      {isVisible && (
        <a
          href="https://wa.me/message/5LXYP7EBAUHMD1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      )}
    </div>
  );
}
