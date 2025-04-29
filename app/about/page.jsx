import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                About AZ INTERNATIONAL
              </h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <FadeIn delay={200} direction="right">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                  Company Overview
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  AZ International specializes in engineering inspection,
                  technical consultancy, and engineering training services,
                  adhering to the highest international standards in
                  Non-Destructive Testing (NDT), quality assurance, and welding.
                  Founded in 2012 by distinguished university professors and
                  industry experts with extensive local and international
                  experience.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300} direction="left">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                  Our Vision
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  To become a leading provider of inspection and technical
                  training services in the Arab world and actively contribute to
                  developing engineering competencies.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={400} direction="up">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To provide a training and consulting environment based on
                knowledge and experience that supports market requirements and
                improves the quality of operations and products.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={500} direction="up">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Our Expertise
              </h2>
              <p className="text-gray-700 leading-relaxed">
                AZ is a third-party inspection and capacity-building
                organization established in 2012, specializing in increasing the
                competencies of engineers and technicians involved in metal
                construction, oil and gas sectors. We provide high-quality
                Non-Destructive Testing (NDT), quality control, and inspection
                services.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={600} direction="up">
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Our Leadership Team
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Dr. Waleed A. Mohrez Profile */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                  <div
                    className="relative w-full"
                    style={{ paddingTop: "100%" }}
                  >
                    <Image
                      src="/images/Dr. Eng. Waleed A. Mohrez.jpg"
                      alt="Dr. Eng. Waleed A. Mohrez"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">
                      Dr. Eng. Waleed A. Mohrez
                    </h3>
                    <p className="text-blue-600 font-semibold mb-4">
                      Chief Executive Officer (CEO)
                    </p>
                    <div className="space-y-3 text-gray-700">
                      <p className="flex items-start">
                        <span className="mr-2">•</span>
                        Doctorate in Materials Engineering from the Muroran
                        Institute of Technology, Hokkaido, Japan.
                      </p>
                      <p className="flex items-start">
                        <span className="mr-2">•</span>
                        Associate Professor of Materials Engineering at the
                        Nuclear Materials Authority of Egypt.
                      </p>
                      <p className="flex items-start">
                        <span className="mr-2">•</span>
                        Professional Construction Quality Management Expert with
                        over 20 years of experience.
                      </p>
                      <p className="flex items-start">
                        <span className="mr-2">•</span>
                        Individual Consultant for Lloyd's Register (LR) for more
                        than 5 years.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prof. Dr. Hussein Abdelaziz Said Profile */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                  <div
                    className="relative w-full"
                    style={{ paddingTop: "100%" }}
                  >
                    <Image
                      src="/images/Prof.Dr. Hussein abdelaziz Said.jpg"
                      alt="Prof. Dr. Hussein Abdelaziz Said"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">
                      Prof. Dr. Hussein Abdelaziz Said
                    </h3>
                    <p className="text-blue-600 font-semibold mb-4">Chairman</p>
                    <div className="space-y-3 text-gray-700">
                      <p className="flex items-start">
                        <span className="mr-2">•</span>
                        Distinguished Professor of Welding and Materials
                        Engineering at the Faculty of Engineering.
                      </p>
                      <p className="flex items-start">
                        <span className="mr-2">•</span>
                        Key role in establishing welding electrodes
                        manufacturing plants in Egypt and Saudi Arabia.
                      </p>
                      <p className="flex items-start">
                        <span className="mr-2">•</span>
                        Expert in welding technologies, materials science, and
                        inspection methods.
                      </p>
                      <p className="flex items-start">
                        <span className="mr-2">•</span>
                        Leading authority in NDT training and technical
                        consultancy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
