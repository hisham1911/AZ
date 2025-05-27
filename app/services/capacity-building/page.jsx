import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Award, Users, GraduationCap, BookOpen } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerChildren } from "@/components/animations/stagger-children";
import Image from "next/image";

export default function CapacityBuildingPage() {
  const services = [
    {
      title: "Customized Technical Training Courses",
      description: "Tailored training programs designed to meet specific industry requirements and skill development needs.",
      features: ["Custom curriculum", "Industry-specific content", "Flexible scheduling", "Expert instructors"]
    },
    {
      title: "Lectures and Group Discussions",
      description: "Interactive learning sessions combining theoretical knowledge with practical group discussions and peer learning.",
      features: ["Expert lectures", "Interactive discussions", "Peer learning", "Knowledge sharing"]
    },
    {
      title: "Case Studies & Practical Exercises",
      description: "Real-world case studies and hands-on practical exercises to reinforce learning and application.",
      features: ["Real case studies", "Hands-on practice", "Problem solving", "Application focused"]
    },
    {
      title: "Pre/Post-Tests and Quizzes",
      description: "Comprehensive assessment system with pre and post-training evaluations to measure learning progress.",
      features: ["Knowledge assessment", "Progress tracking", "Performance metrics", "Certification basis"]
    },
    {
      title: "Educational Videos",
      description: "Professional educational video content for visual learning and remote training capabilities.",
      features: ["Visual learning", "Remote access", "Replay capability", "Multi-format content"]
    },
    {
      title: "Requalification in NDT Techniques",
      description: "Periodic requalification training for NDT personnel to maintain certifications and update skills.",
      features: ["Certification renewal", "Skills update", "Compliance maintenance", "Continuous development"]
    },
    {
      title: "Capacity Building Courses in Quality Control Inspection",
      description: "Comprehensive capacity building programs focused on quality control inspection methodologies and best practices.",
      features: ["QC methodologies", "Best practices", "Industry standards", "Professional development"]
    },
    {
      title: "Training Methodology According to Required Qualifications",
      description: "Structured training approaches aligned with international qualification requirements and standards.",
      features: ["Standards compliance", "Qualification alignment", "Structured approach", "International recognition"]
    }
  ];

  const trainingAreas = [
    {
      title: "Non-Destructive Testing (NDT)",
      topics: ["Ultrasonic Testing", "Magnetic Particle Testing", "Penetrant Testing", "Visual Inspection", "Radiographic Testing"]
    },
    {
      title: "Quality Control & Assurance",
      topics: ["QC Procedures", "Inspection Methods", "Documentation", "Standards Compliance", "Audit Techniques"]
    },
    {
      title: "Welding Technology",
      topics: ["Welding Procedures", "Welder Qualification", "Weld Inspection", "Code Requirements", "Safety Practices"]
    },
    {
      title: "Industrial Inspection",
      topics: ["Equipment Inspection", "Pipeline Inspection", "Tank Inspection", "Pressure Vessel", "Maintenance Planning"]
    }
  ];

  const certifications = [
    "ASNT Level I, II, III Certification",
    "PCN/CSWIP Certification Programs",
    "AWS Certified Welding Inspector",
    "API 510/570/653 Certification",
    "ISO 9712 NDT Personnel Qualification",
    "NACE Coating Inspector Certification",
    "Company-Specific Certifications",
    "Continuous Professional Development"
  ];

  const methodology = [
    {
      phase: "Assessment",
      description: "Evaluate current skill levels and training needs",
      activities: ["Skills assessment", "Gap analysis", "Learning objectives", "Custom curriculum"]
    },
    {
      phase: "Training Delivery",
      description: "Execute comprehensive training programs",
      activities: ["Expert instruction", "Hands-on practice", "Interactive sessions", "Progress monitoring"]
    },
    {
      phase: "Evaluation",
      description: "Assess learning outcomes and certification",
      activities: ["Knowledge testing", "Practical assessment", "Certification", "Follow-up support"]
    }
  ];

  const industries = [
    { name: "Oil & Gas", icon: "🛢️" },
    { name: "Petrochemical", icon: "⚗️" },
    { name: "Power Generation", icon: "⚡" },
    { name: "Manufacturing", icon: "🏭" },
    { name: "Construction", icon: "🏗️" },
    { name: "Marine", icon: "🚢" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Capacity Building Training Services
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Professional training and capacity building programs to develop technical expertise 
                and enhance organizational capabilities in quality control and inspection
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Professional Training
                </Badge>
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Capacity Building
                </Badge>
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  <Award className="w-5 h-5 mr-2" />
                  Certification Programs
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
              Our Training Services
            </h2>
          </FadeIn>
          
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-l-4 border-indigo-600">
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-900">{service.title}</CardTitle>
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

      {/* Training Areas */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">
              Training Areas & Specializations
            </h2>
          </FadeIn>
          
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {trainingAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-indigo-900">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {area.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-600" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Training Methodology */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Training Methodology
            </h2>
          </FadeIn>
          
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {methodology.map((phase, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl text-indigo-900">{phase.phase}</CardTitle>
                  <p className="text-gray-600">{phase.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12">
                Certification Programs
              </h2>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {certifications.map((cert, index) => (
                  <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="h-5 w-5 text-indigo-600" />
                      <span className="font-medium text-sm">{cert}</span>
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
              Industries We Train
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

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">
              Ready to Build Your Team's Capabilities?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Invest in your team's professional development with our comprehensive training programs. 
              Contact us to discuss customized training solutions for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="w-5 h-5 mr-2" />
                Discuss Training Needs
              </a>
              <a
                href="tel:+20222879691"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-900 transition-colors"
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
