import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Award, Users, Microscope, ClipboardCheck } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerChildren } from "@/components/animations/stagger-children";
import Image from "next/image";

export default function QualityAssurancePage() {
  const services = [
    {
      title: "Quality Inspection of All Engineering Disciplines",
      description: "Comprehensive quality inspection services covering all engineering disciplines according to international standards.",
      features: ["Multi-disciplinary expertise", "International standards compliance", "Detailed reporting", "Expert recommendations"]
    },
    {
      title: "Ultrasonic Testing (UT)",
      description: "Advanced ultrasonic testing for detecting internal flaws and measuring thickness with high precision.",
      features: ["Internal flaw detection", "Thickness measurement", "Contact techniques", "Computerized reporting"]
    },
    {
      title: "Magnetic Particle Testing (MT)",
      description: "Surface and near-surface defect detection in ferromagnetic materials using magnetic particle inspection.",
      features: ["Surface crack detection", "Subsurface defects", "Wet and dry methods", "Fluorescent techniques"]
    },
    {
      title: "Dye Penetrant Testing (PT)",
      description: "Liquid penetrant testing for detecting surface-breaking defects in non-porous materials.",
      features: ["Surface defect detection", "Fluorescent and visible dyes", "Post-emulsifiable systems", "Solvent removable"]
    },
    {
      title: "Visual Inspection (VT)",
      description: "Direct and remote visual inspection services using advanced optical equipment and techniques.",
      features: ["Direct visual inspection", "Remote visual inspection", "Borescope inspection", "Digital documentation"]
    },
    {
      title: "Welders Inspection and Procedure Testing",
      description: "Comprehensive welder qualification and welding procedure specification (WPS) development and testing.",
      features: ["WPS development", "Procedure qualification", "Performance testing", "Certification documentation"]
    },
    {
      title: "Welder Performance Qualifications",
      description: "Assessment and certification of welder performance according to international welding standards.",
      features: ["Performance assessment", "Skill certification", "Standards compliance", "Ongoing monitoring"]
    },
    {
      title: "Coating/Painting Inspection",
      description: "Complete coating and painting inspection services from surface preparation to final application.",
      features: ["Surface preparation", "Application monitoring", "Thickness measurement", "Adhesion testing"]
    }
  ];

  const standards = [
    "ASME Boiler and Pressure Vessel Code",
    "API Standards (API 570, 510, 653)",
    "AWS Welding Standards",
    "ASTM Testing Standards",
    "ISO 9000 Quality Management",
    "NACE Corrosion Standards",
    "ASNT Personnel Qualification",
    "EN European Standards"
  ];

  const industries = [
    { name: "Oil & Gas", icon: "🛢️", description: "Refineries, petrochemical plants, offshore platforms" },
    { name: "Power Generation", icon: "⚡", description: "Power plants, electrical infrastructure" },
    { name: "Manufacturing", icon: "⚙️", description: "Industrial equipment, machinery" },
    { name: "Construction", icon: "🏗️", description: "Steel structures, building construction" },
    { name: "Chemical", icon: "🧪", description: "Chemical processing, fertilizer plants" },
    { name: "Marine", icon: "🚢", description: "Shipbuilding, offshore structures" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Shield className="h-16 w-16 text-blue-300 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  Quality Assurance & Controls
                </h1>
              </div>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Comprehensive quality inspection services covering all engineering disciplines with 
                adherence to the highest international standards in Non-Destructive Testing (NDT), 
                quality assurance, and welding inspection.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="bg-blue-800 text-blue-100 text-sm py-2 px-4">
                  ASNT Certified
                </Badge>
                <Badge variant="secondary" className="bg-blue-800 text-blue-100 text-sm py-2 px-4">
                  ISO 9000 Compliant
                </Badge>
                <Badge variant="secondary" className="bg-blue-800 text-blue-100 text-sm py-2 px-4">
                  API Standards
                </Badge>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Our QA/QC Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive quality assurance and control services designed to ensure 
                the highest standards of safety, reliability, and performance in your operations.
              </p>
            </div>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-blue-600">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                International Standards & Certifications
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our services comply with the most stringent international standards to ensure 
                quality, safety, and reliability in all our inspections and certifications.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {standards.map((standard, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition-colors duration-300">
                  <p className="text-sm font-medium text-gray-800">{standard}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Industries We Serve
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our quality assurance services support critical operations across diverse industrial sectors.
              </p>
            </div>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {industries.map((industry, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{industry.name}</h3>
                  <p className="text-gray-600 text-sm">{industry.description}</p>
                </CardContent>
              </Card>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Equipment & Technology */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <Microscope className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                State-of-the-Art Equipment
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We utilize the latest technology and equipment to deliver accurate, reliable, and efficient inspection services.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="border-l-4 border-blue-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="h-6 w-6 text-blue-600" />
                    Advanced NDT Equipment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Digital ultrasonic flaw detectors</li>
                    <li>• Portable magnetic particle testing units</li>
                    <li>• Fluorescent penetrant inspection systems</li>
                    <li>• High-resolution borescopes and videoscopes</li>
                    <li>• Computerized thickness measurement systems</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-green-600" />
                    Calibration & Certification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• All equipment regularly calibrated</li>
                    <li>• Traceable calibration certificates</li>
                    <li>• NIST-traceable standards</li>
                    <li>• Equipment validation procedures</li>
                    <li>• Comprehensive maintenance programs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Ensure Quality Excellence?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Contact our quality assurance experts today to discuss how we can help maintain 
              the highest standards in your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
                Get Quote
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
                Learn More
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}