import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { WaveAnimation } from "@/components/animations/wave-animation";

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1">
            <FadeIn delay={200} duration={800}>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
                Engineering Excellence & Technical Expertise
              </h1>
            </FadeIn>
            <FadeIn delay={400} duration={800}>
              <p className="text-sm md:text-base text-gray-300 mb-6 leading-relaxed">
                AZ is a third party inspection and capacity building body,
                aiming to increase the capacity building of technicians and
                engineers working in metal construction, oil and gas services.
                We provide NDT and quality inspection services since 2012.
              </p>
            </FadeIn>
          </div>

          {/* Right Side - Image */}
          <div className="order-1 lg:order-2">
            <FadeIn delay={300} duration={800} direction="right">
              <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/engineer-industrial.png"
                  alt="Engineer at industrial facility"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>{" "}
      {/* Wave Animation - Positioned at the bottom with proper z-index and height */}
      <div className="absolute bottom-0 left-0 right-0 z-[60] h-16 md:h-20 lg:h-24 pointer-events-none">
        <WaveAnimation className="w-full h-full" data-inverted="true" />
      </div>
    </div>
  );
}
