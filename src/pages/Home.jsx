import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import Featured from '@/components/sections/Featured';
import HowItWorks from '@/components/sections/HowItWorks';
import Trust from '@/components/sections/Trust';
import Testimonials from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';

/** Página inicial: apenas compõe as seções, sem lógica própria. */
export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Featured />
      <HowItWorks />
      <Trust />
      <Testimonials />
      <Faq />
    </>
  );
}
