import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import RoiCalculator from "@/components/RoiCalculator";
import {
  VideoSection,
  ProblemSection,
  ServicesSection,
  ProcessSection,
  TestimonialsSection,
  BlogTeaser,
  FaqSection,
  NewsletterSection,
} from "@/components/Sections";
import { safeFetch } from "@/sanity/client";
import {
  settingsQuery,
  servicesQuery,
  testimonialsQuery,
  faqsQuery,
  postPreviewsQuery,
} from "@/sanity/queries";
import {
  fallbackSettings,
  fallbackServices,
  fallbackTestimonials,
  fallbackFaqs,
  fallbackPosts,
  type SiteSettings,
  type Service,
  type Testimonial,
  type Faq,
  type PostPreview,
} from "@/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, services, testimonials, faqs, posts] = await Promise.all([
    safeFetch<SiteSettings>(settingsQuery, fallbackSettings),
    safeFetch<Service[]>(servicesQuery, fallbackServices),
    safeFetch<Testimonial[]>(testimonialsQuery, fallbackTestimonials),
    safeFetch<Faq[]>(faqsQuery, fallbackFaqs),
    safeFetch<PostPreview[]>(postPreviewsQuery, fallbackPosts),
  ]);

  const s = { ...fallbackSettings, ...settings };

  return (
    <>
      <Header logoUrl={s.logoUrl} />
      <main>
        <Hero settings={s} />
        <VideoSection settings={s} />
        <ProblemSection />
        <RoiCalculator />
        <ServicesSection services={services} />
        <ProcessSection />
        <TestimonialsSection testimonials={testimonials} />
        <BlogTeaser posts={posts} />
        <FaqSection faqs={faqs} />
        <NewsletterSection settings={s} />
        <ContactSection contactEmail={s.contactEmail} />
      </main>
      <Footer contactEmail={s.contactEmail} logoUrl={s.logoUrl} />
    </>
  );
}
