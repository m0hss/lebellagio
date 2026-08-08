import { PageShell } from "@/components/page-shell"
import { HeroSection } from "@/components/home/hero-section"
import { AboutSection } from "@/components/home/about-section"
import { MenuPreviewSection } from "@/components/home/menu-preview-section"
import { ReviewsSection } from "@/components/home/reviews-section"
import { ReservationCtaSection } from "@/components/home/reservation-cta-section"
import { OrderCtaSection } from "@/components/home/order-cta-section"
import { HoursSection } from "@/components/home/hours-section"
import { MapSection } from "@/components/home/map-section"
import { ContactSection } from "@/components/home/contact-section"

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <AboutSection />
      <MenuPreviewSection />
      <ReviewsSection />
      <ReservationCtaSection />
      <OrderCtaSection />
      <HoursSection />
      <MapSection />
      <ContactSection />
    </PageShell>
  )
}
