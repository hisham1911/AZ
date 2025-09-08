import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Award, Users, Cog, Settings } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerChildren } from "@/components/animations/stagger-children";
import Image from "next/image";

export default function SpecializedServicesPage() {
  const services = [
    {
      title: "Vendor Inspection (Manufactured & Fabricated Equipment)",
      description: "Comprehensive inspection of vendor-manufactured and fabricated equipment to ensure quality and compliance before delivery.",
      features: ["Pre-delivery inspection", "Quality verification", "Compliance checking", "Documentation review"]
    },
    {
      title: "Pre-commissioning Testing Inspection",
      description: "Thorough inspection and testing services before commissioning to ensure system readiness and safety.",
      features: ["System verification", "Safety testing", "Performance validation", "Commissioning support"]
    },
    {
      title: "Weld Engineering and Inspection",
      description: "Advanced welding engineering services including procedure development and comprehensive inspection.",
      features: ["Weld procedure engineering", "Joint design", "Quality assessment", "Code compliance"]
    },
    {
      title: "Assessment of Welder Performance",
      description: "Comprehensive evaluation and certification of welder skills and performance according to international standards.",
      features: ["Skill assessment", "Performance evaluation", "Certification", "Continuous monitoring"]
    },
    {
      title: "Laboratory Analysis of Materials and Mechanical Testing",
      description: "Complete laboratory services for material analysis and mechanical testing to verify properties and performance.",
      features: ["Material composition", "Mechanical properties", "Failure analysis", "Certification testing"]
    },
    {
      title: "Quality Control and Quality Assurance",
      description: "Comprehensive QC/QA services ensuring consistent quality throughout project lifecycle.",
      features: ["Process control", "Quality planning", "Inspection protocols", "Audit services"]
    },
    {
      title: "Mining and Metallurgical Services",
      description: "Specialized services for mining and metallurgical industries including equipment inspection and process evaluation.",
      features: ["Mining equipment inspection", "Metallurgical analysis", "Process optimization", "Safety compliance"]
    },
    {
      title: "Rope Access Inspection (LEEA-certified)",
      description: "LEEA-certified rope access inspection services for hard-to-reach areas and structures.",
      features: ["LEEA certification", "Height access", "Confined spaces", "Specialized inspection"]
    },
    {
      title: "Tank Integrity Inspections (API Standard 653)",
      description: "Complete tank integrity assessment following API 653 standards for storage tank inspection.",
      features: ["API 653 compliance", "Integrity assessment", "Floor inspection", "Shell evaluation"]
    },
    {
      title: "On-stream Inspection Program",
      description: "Continuous inspection services for operating equipment without shutdown, maintaining production efficiency.",
      features: ["Non-intrusive inspection", "Real-time monitoring", "Production continuity", "Risk assessment"]
    },
    {
      title: "Portable Alloy Analysis (PMI)",
      description: "On-site portable alloy analysis for material verification and quality control using advanced PMI technology.",
      features: ["Material verification", "Alloy identification", "Chemical composition", "Real-time results"]
    },
    {
      title: "Vendor Surveillance Program",
      description: "Comprehensive vendor surveillance services ensuring quality throughout the manufacturing process.",
      features: ["Manufacturing oversight", "Quality monitoring", "Process verification", "Compliance assurance"]
    },
    {
      title: "Internal Bore Ultrasonic Service",
      description: "Specialized ultrasonic inspection of internal bore surfaces for corrosion and defect detection.",
      features: ["Internal inspection", "Bore analysis", "Corrosion detection", "Dimensional verification"]
    },
    {
      title: "Surface Replication",
      description: "Advanced surface replication techniques for microstructural analysis and material characterization.",
      features: ["Microstructure analysis", "Surface characterization", "Material evaluation", "Damage assessment"]
    },
    {
      title: "Mid-wall Creep Fissure Detector",
      description: "Specialized detection of mid-wall creep fissures in high-temperature service equipment.",
      features: ["Creep detection", "High-temperature service", "Early warning", "Preventive maintenance"]
    },
    {
      title: "Heat Exchanger Inspection Program",
      description: "Comprehensive heat exchanger inspection including tube testing and performance evaluation.",
      features: ["Tube inspection", "Performance analysis", "Efficiency optimization", "Maintenance planning"]
    },
    {
      title: "Wet Magnetic Inspection Program",
      description: "Specialized wet magnetic particle inspection for enhanced defect detection in critical components.",
      features: ["Enhanced sensitivity", "Surface defects", "Subsurface detection", "Critical components"]
    },
    {
      title: "Turnaround Inspection",
      description: "Comprehensive inspection services during plant turnarounds ensuring efficient and safe restart operations.",
      features: ["Shutdown inspection", "Maintenance support", "Safety verification", "Restart preparation"]
    }
  ];

  const standards = [
    "API 510 - Pressure Vessel Inspection",
    "API 570 - Piping Inspection",
    "API 653 - Tank Inspection",
    "ASME Section V - NDT Standards",
    "AWS D1.1 - Structural Welding",
    "LEEA - Lifting Equipment Engineers Association",
    "NACE - Corrosion Standards",
    "ISO 9712 - NDT Personnel Qualification"
  ];

  const industries = [
    { name: "Oil & Gas", icon: "🛢️" },
    { name: "Petrochemical", icon: "⚗️" },
    { name: "Power Generation", icon: "⚡" },
    { name: "Mining", icon: "⛏️" },
    { name: "Marine", icon: "🚢" },
    { name: "Manufacturing", icon: "🏭" }
  ];

  const equipment = [
    "Portable PMI Analyzers",
    "Ultrasonic Testing Equipment",
    "Surface Replication Tools",
    "Creep Detection Systems",
    "Rope Access Equipment",
    "Advanced Metallurgical Microscopes",
    "Wet Magnetic Testing Units",
    "Digital Documentation Systems"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Specialized Services
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Advanced specialized inspection and testing services for complex industrial applications, 
                providing expert solutions for unique challenges
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  <Cog className="w-5 h-5 mr-2" />
                  Specialized Techniques
                </Badge>
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  <Settings className="w-5 h-5 mr-2" />
                  Advanced Solutions
                </Badge>
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  <Shield className="w-5 h-5 mr-2" />
                  Expert Services
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
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Specialized Services
            </h2>
          </FadeIn>
          
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-l-4 border-purple-600">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Standards Compliance */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12">
                Standards & Certifications
              </h2>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {standards.map((standard, index) => (
                  <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-sm">{standard}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">
              Industries We Serve
            </h2>
          </FadeIn>
          
          <FadeIn delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
              {industries.map((industry, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-2">{industry.icon}</div>
                  <h3 className="font-semibold text-sm">{industry.name}</h3>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Equipment & Technology */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12">
                Specialized Equipment & Technology
              </h2>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipment.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <Cog className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">
              Need Specialized Inspection Solutions?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our specialized services team is ready to tackle your most complex inspection 
              and testing challenges with advanced techniques and expert knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="w-5 h-5 mr-2" />
                Discuss Your Requirements
              </a>
              <a
                href="tel:+20222879691"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-900 transition-colors"
              >
                Call: (02) 22-8-79-691
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
