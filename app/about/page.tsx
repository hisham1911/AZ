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
                </h2>                <p className="text-gray-700 leading-relaxed">
                  AZ is a third party inspection and capacity building body,
                  aiming to increase the capacity building of technicians and
                  engineers who are working in the field of metal construction,
                  oil and gas services, as well we are providing the NDT and
                  quality inspection services. AZ was established in 2012 to
                  create high reliable certification body acquiring interactive
                  experience in the field of quality control inspection and
                  capacity building courses.
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
              </h2>              <p className="text-gray-700 leading-relaxed">
                AZ is a third-party inspection and capacity-building
                organization established in 2012, aiming to increase the capacity
                building of technicians and engineers who are working in the
                field of metal construction, oil and gas services. We seek to
                provide highly qualitative services to develop human resources
                interested in working in steel fabrication and construction in oil
                and gas, chemical, fertilizers, cement, and electrical power
                plants sectors.
              </p>            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
