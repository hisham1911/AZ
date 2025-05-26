import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";

export default function Engineers() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Meet Our Leadership Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our distinguished engineers and industry experts with extensive
                local and international experience
              </p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
            </div>
          </FadeIn>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Prof. Dr. Hussein Abdelaziz Said Profile - Now on the left */}
            <FadeIn delay={200} direction="left">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative w-full h-80">
                  <Image
                    src="/images/Prof.Dr. Hussein abdelaziz Said.jpg"
                    alt="Prof. Dr. Hussein Abdelaziz Said"
                    fill
                    className="object-contain bg-gray-50"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    Prof. Dr. Hussein Abdelaziz Said
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">Chairman</p>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p className="flex items-start">
                      <span className="mr-2 text-blue-600">•</span>
                      Professor of Welding and Materials Engineering
                    </p>
                    <p className="flex items-start">
                      <span className="mr-2 text-blue-600">•</span>
                      Established welding plants in Egypt & Saudi Arabia
                    </p>
                    <p className="flex items-start">
                      <span className="mr-2 text-blue-600">•</span>
                      Expert in welding technologies & materials science
                    </p>
                    <p className="flex items-start">
                      <span className="mr-2 text-blue-600">•</span>
                      Leading authority in NDT training
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Dr. Waleed A. Mohrez Profile - Now on the right */}
            <FadeIn delay={300} direction="right">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative w-full h-80">
                  <Image
                    src="/images/Dr. Eng. Waleed A. Mohrez.jpg"
                    alt="Dr. Eng. Waleed A. Mohrez"
                    fill
                    className="object-contain bg-gray-50"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    Dr. Eng. Waleed A. Mohrez
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">
                    Chief Executive Officer (CEO)
                  </p>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p className="flex items-start">
                      <span className="mr-2 text-blue-600">•</span>
                      Doctorate in Materials Engineering from Japan
                    </p>
                    <p className="flex items-start">
                      <span className="mr-2 text-blue-600">•</span>
                      Associate Professor of Materials Engineering
                    </p>
                    <p className="flex items-start">
                      <span className="mr-2 text-blue-600">•</span>
                      20+ years of Construction Quality Management
                    </p>
                    <p className="flex items-start">
                      <span className="mr-2 text-blue-600">•</span>
                      Lloyd's Register Individual Consultant
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
