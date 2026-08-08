import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileActionBar } from "@/components/mobile-action-bar"
import { ChatBubble } from "@/components/chat-bubble/chat-bubble"

interface PageShellProps {
  children: React.ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">{children}</main>
      <Footer />
      <MobileActionBar />
      <ChatBubble />
    </div>
  )
}
