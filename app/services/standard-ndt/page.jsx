import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Award, Users, Zap, Search } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerChildren } from "@/components/animations/stagger-children";
import Image from "next/image";

export default function StandardNDTPage() {
  const services = [
    {
      title: "Ultrasonic Testing (UT) - Contact Techniques",
      description: "Comprehensive ultrasonic testing using contact techniques for precise defect detection and material characterization.",
      features: ["Contact transducers", "High resolution", "Deep penetration", "Real-time imaging"]
    },
    {
      title: "Longitudinal Wave for Thickness Measurements",
      description: "Accurate thickness measurement using longitudinal ultrasonic waves for corrosion monitoring and material assessment.",
      features: ["Precise measurements", "Corrosion monitoring", "Material assessment", "Digital readouts"]
    },
    {
      title: "Shear Wave for Weld Inspection",
      description: "Specialized shear wave ultrasonic testing for comprehensive weld inspection and defect detection.",
      features: ["Weld defect detection", "Crack identification", "Lack of fusion detection", "Angular beam inspection"]
    },
    {
      title: "Surface Wave Methods",
      description: "Surface wave ultrasonic testing for detecting surface and near-surface defects in various materials.",
      features: ["Surface defects", "Near-surface detection", "High sensitivity", "Rapid scanning"]
    },
    {
      title: "Magnetic Particle Testing (MT)",
      description: "Surface and subsurface defect detection in ferromagnetic materials using magnetic particle inspection techniques.",
      features: ["Surface defects", "Subsurface detection", "Wet and dry methods", "Fluorescent indication"]
    },
    {
      title: "Liquid Penetrant Testing (PT)",
      description: "Fluorescent and visible liquid penetrant testing methods for detecting surface-breaking defects.",
      features: ["Fluorescent methods", "Visible dye methods", "Surface crack detection", "High sensitivity"]
    },
    {
      title: "Computerized Ultrasonic Mapping Inspection",
      description: "Advanced computerized ultrasonic mapping for detailed corrosion mapping and thickness surveys.",
      features: ["Digital mapping", "Corrosion visualization", "Data analysis", "Trend monitoring"]
    },
    {
      title: "Complete Storage Tanks Inspection (Walls & Floors)",
      description: "Comprehensive storage tank inspection covering walls, floors, and roofs according to API standards.",
      features: ["Wall inspection", "Floor assessment", "Roof evaluation", "API compliance"]
    },
    {
      title: "Leak Detection and Testing",
      description: "Advanced leak detection services using various NDT methods to identify and locate leaks.",
      features: ["Multiple techniques", "Leak location", "Sensitivity testing", "Environmental safety"]
    },
    {
      title: "Pipeline Inspection",
      description: "Comprehensive pipeline inspection services using various NDT methods for integrity assessment.",
      features: ["Integrity assessment", "Corrosion detection", "Wall thickness", "Defect identification"]
    }
  ];

  const techniques = [
    {
      name: "Ultrasonic Testing (UT)",
      description: "High-frequency sound waves for internal defect detection",
      applications: ["Thickness measurement", "Weld inspection", "Crack detection", "Corrosion mapping"]
    },
    {
      name: "Magnetic Particle Testing (MT)", 
      description: "Magnetic field and particles for surface defect detection",
      applications: ["Surface cracks", "Subsurface defects", "Weld inspection", "Component testing"]
    },
    {
      name: "Liquid Penetrant Testing (PT)",
      description: "Liquid penetrant for surface-breaking defect detection",
      applications: ["Surface cracks", "Porosity", "Lack of fusion", "Component inspection"]
    },
    {
      name: "Visual Testing (VT)",
      description: "Direct and remote visual inspection techniques",
      applications: ["General inspection", "Weld quality", "Surface conditions", "Documentation"]
    }
  ];

  const standards = [
    "ASME Section V - Nondestructive Examination",
    "ASTM E165 - Liquid Penetrant Testing",
    "ASTM E709 - Magnetic Particle Testing",
    "ASTM E114 - Ultrasonic Testing",
    "ISO 9712 - NDT Personnel Qualification",
    "AWS D1.1 - Structural Welding Code",
    "API 510 - Pressure Vessel Inspection",
    "NACE Standards for Corrosion Control"
  ];

  const industries = [
    { name: "Oil & Gas", icon: "🛢️" },
    { name: "Petrochemical", icon: "⚗️" },
    { name: "Power Generation", icon: "⚡" },
    { name: "Aerospace", icon: "✈️" },
    { name: "Marine", icon: "🚢" },
    { name: "Construction", icon: "🏗️" }
  ];

  const equipment = [
    "Digital Ultrasonic Flaw Detectors",
    "Phased Array UT Systems",
    "Portable Magnetic Yokes",
    "UV-A Light Sources",
    "Penetrant Testing Kits",
    "Thickness Gauges",
    "Corrosion Mapping Systems",
    "Digital Documentation Systems"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-900 via-green-800 to-teal-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Standard NDT Services
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Comprehensive non-destructive testing services using industry-standard techniques 
                for reliable defect detection and material characterization
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  <Zap className="w-5 h-5 mr-2" />
                  Standard Methods
                </Badge>
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  <Search className="w-5 h-5 mr-2" />
                  Defect Detection
                </Badge>
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  <Shield className="w-5 h-5 mr-2" />
                  Proven Techniques
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
              Our Standard NDT Services
            </h2>
          </FadeIn>
          
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-l-4 border-green-600">
                <CardHeader>
                  <CardTitle className="text-lg text-green-900">{service.title}</CardTitle>
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

      {/* NDT Techniques */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">
              Standard NDT Techniques
            </h2>
          </FadeIn>
          
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {techniques.map((technique, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-green-900">{technique.name}</CardTitle>
                  <p className="text-gray-600">{technique.description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">Applications:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {technique.applications.map((app, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{app}</span>
                      </div>
                    ))}
                  </div>
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
                Standards & Compliance
              </h2>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {standards.map((standard, index) => (
                  <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
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
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12">
                NDT Equipment & Technology
              </h2>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipment.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <Search className="h-5 w-5 text-green-600" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-900 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">
              Need Reliable NDT Services?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our certified NDT professionals use proven standard techniques to ensure 
              the integrity and safety of your critical components and structures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="w-5 h-5 mr-2" />
                Get NDT Services
              </a>
              <a
                href="tel:+20222879691"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-900 transition-colors"
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
