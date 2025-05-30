import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { RevealText } from "@/components/animations/reveal-text";
import { WaveAnimation } from "@/components/animations/wave-animation";

export default function Hero() {
  return (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/engineer-industrial.png"
          alt="Engineer at industrial facility"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col items-center mb-8">
          {/* تم حذف الشعار هنا */}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <RevealText text="Engineering Excellence & Technical Expertise" />
          </h1>          <FadeIn delay={500} duration={800}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              AZ is a third party inspection and capacity building body, aiming to increase the capacity building of technicians and engineers working in metal construction, oil and gas services. We provide NDT and quality inspection services since 2012.
            </p>
          </FadeIn>


        </div>
      </div>

      {/* Wave Animation - Positioned at the bottom but inverted */}
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-16 md:h-24">
        <WaveAnimation className="w-full h-full" data-inverted="true" />
      </div>
    </div>
  );
}
