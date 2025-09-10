"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerChildren } from "@/components/animations/stagger-children";

export default function ServicesPage() {
  const serviceCategories = [
    {
      id: "quality",
      name: "Quality Assurance & Controls",
      link: "/services/quality-assurance",
      description: "Comprehensive quality inspection and control services for all engineering disciplines",
      services: [
        "Quality inspection of all engineering disciplines",
        "Ultrasonic Testing (UT)",
        "Magnetic Particle Testing (MT)",
        "Dye Penetrant Testing (PT)",
        "Visual Inspection (VT)",
        "Welders inspection and procedure testing",
        "Welder performance qualifications",
        "Coating/Painting inspection",
      ],
    },
    {
      id: "field",
      name: "Field/Industrial Inspection",
      link: "/services/field-industrial",
      description: "On-site inspection and NDT services for industrial facilities and equipment",
      services: [
        "Pipeline welding inspection and NDT",
        "On-stream wall thickness measurement",
        "Refinery equipment inspection",
        "Pressure vessels & drums inspection",
        "Storage tank inspection",
        "Heat exchangers inspection",
        "Piping & headers inspection",
        "Towers & reactors inspection",
      ],
    },
    {
      id: "specialized",
      name: "Specialized Services",
      link: "/services/specialized-services",
      description: "Advanced specialized inspection and testing services for complex applications",
      services: [
        "Vendor inspection and surveillance",
        "Pre-commissioning testing inspection",
        "Rope Access Inspection (LEEA-certified)",
        "Tank integrity inspections (API 653)",
        "Portable alloy analysis (PMI)",
        "Internal bore ultrasonic service",
        "Surface replication analysis",
        "Turnaround inspection services",
      ],
    },
    {
      id: "training",
      name: "Capacity Building Training",
      link: "/services/capacity-building",
      description: "Professional training and capacity building programs for technical expertise development",
      services: [
        "Customized technical training courses",
        "NDT certification programs",
        "Quality control inspection training",
        "Welding technology courses",
        "Case studies & practical exercises",
        "Educational videos and materials",
        "Professional requalification programs",
        "Industry-specific training solutions",
      ],
    },
    {
      id: "ndt",
      name: "Standard NDT Services",
      link: "/services/standard-ndt",
      description: "Comprehensive non-destructive testing using industry-standard techniques",
      services: [
        "Ultrasonic Testing (UT) - Contact techniques",
        "Magnetic Particle Testing (MT)",
        "Liquid Penetrant Testing (PT)",
        "Computerized ultrasonic mapping",
        "Storage tanks inspection",
        "Pipeline inspection services",
        "Leak detection and testing",
        "Surface wave methods",
      ],
    },  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Our Services
        </h1>

        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 text-center">
          AZ INTERNATIONAL provides comprehensive inspection, testing, and
          training services adhering to the highest international standards.
        </p>
      </FadeIn>      <FadeIn delay={200}>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category) => (
            <Card
              key={category.id}
              className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-l-4 border-blue-600 group cursor-pointer"
            >
              <a href={category.link} className="block h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900 group-hover:text-blue-700 transition-colors">
                    {category.name}
                  </CardTitle>
                  <p className="text-gray-600 mt-2">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {category.services.slice(0, 6).map((service, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{service}</span>
                      </li>
                    ))}
                    {category.services.length > 6 && (
                      <li className="text-sm text-blue-600 font-medium">
                        +{category.services.length - 6} more services...
                      </li>
                    )}
                  </ul>
                  <div className="text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                    Learn More →
                  </div>
                </CardContent>
              </a>
            </Card>
          ))}
        </StaggerChildren>
      </FadeIn>
    </div>
  );
}
