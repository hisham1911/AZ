"use client";

import { lazy, Suspense } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { LazyImage } from "@/components/lazy-image";

// Import the clients data and UI components organized by industry sector
const clientsBySector = {
  "Energy & Power Sector": [
    {
      name: "Siemens Energy",
      logo: "/images/clients/siemens.svg",
      description: "Welding, Vibration analysis",
      additional: "BOGE CONSULTANT - Boge Compressor failure analysis",
    },
    {
      name: "Petromaint",
      logo: "/images/clients/petromaint.png",
      description: "Heat Treatment",
    },
    {
      name: "Power House",
      logo: "/images/clients/powerhouse.png",
      description: "NDT services (RT, UT) of super-heated water boilers",
    },
  ],
  "Oil & Gas Sector": [
    {
      name: "Egyptian Chinese Drilling Co",
      logo: "/images/clients/ecdc.png",
      description: "Third party inspection & technical consulting",
    },
    {
      name: "Sindbad Petroleum Service (SPS)",
      logo: "/images/clients/sps.png",
      description:
        "PMI and other NDT services; Phased arrays and pulse echo A scan of production facilities",
    },
    {
      name: "Maradive",
      logo: "/images/clients/maradive.png",
      description:
        "Long term internship (RT inspection) on offshore facilities",
    },
  ],
  "Steel & Metal Industry": [
    {
      name: "Al Ezz Flat Steel",
      logo: "/images/clients/al-ezz.png",
      description: "NDT services (RT, PT, MT, UT)",
    },
    {
      name: "Elkadesia For Engineering Industries",
      logo: "/images/clients/elkadesia.png",
      description:
        "Research and development of shielded metal arc welding electrodes (E6010, E6013, E7018), Fabrication of raw materials upgrading unit using 904L austenitic stainless steel, Welding, releasing and reporting of fabrication and inspection test plans",
    },
    {
      name: "EIPAl Egyptian International Co. for Aluminum Profiles",
      logo: "/images/clients/eipal.png",
      description: "R&D of aluminum extrusion processes",
    },
  ],
  "Construction & Infrastructure": [
    {
      name: "New Administrative Capital Stadium",
      logo: "/images/clients/nac-stadium.png",
      description: "Third party inspection",
    },
    {
      name: "Orascom",
      logo: "/images/clients/orascom.svg",
      description:
        "Third party inspection review and certification of NDT procedures",
    },
    {
      name: "Arab Contractor",
      logo: "/images/clients/arab-contractor.png",
      description: "NDT services (RT)",
    },
    {
      name: "Arab Swiss Engineering Company",
      logo: "/images/clients/arab-swiss.png",
      description: "NDT services (PT, MT, UT)",
    },
    {
      name: "EAST Engineering And Services Technology",
      logo: "/images/clients/east-engineering.png",
      description:
        "Third party inspection review and certification of NDT procedures",
    },
  ],
  "Manufacturing & Industrial": [
    {
      name: "SILO FOODS",
      logo: "/images/clients/silo-foods.jpg",
      description: "Food industry quality assurance",
    },
    {
      name: "Sinoma-CDI",
      logo: "/images/clients/sinoma-cdi.png",
      description:
        "PMI and other NDT services; Phased arrays and pulse echo A scan of production facilities",
    },
    {
      name: "Boysen Egypt",
      logo: "/images/clients/boysen.svg",
      description: "DT & NDT services",
      specialClass: "scale-[2.5]",
    },
    {
      name: "Maria Organization for Trade & Industry",
      logo: "/images/clients/maria-org.png",
      description:
        "Ultrasonic Tests (UT) on shelter lifting pad eyes (ABO MADY PROJECT)",
    },
    {
      name: "Total Solution",
      logo: "/images/clients/total-solution.png",
      description: "NDT services (RT, PT, MT, UT)",
    },
    {
      name: "TETRALIFT",
      logo: "/images/clients/tetralift.png",
      description: "NDT services (RT, PT, MT, UT)",
    },
    {
      name: "Ecco Associate",
      logo: "/images/clients/ecco-associate.png",
      description: "NDT services (RT, PT, MT, UT)",
    },
    {
      name: "Maire Tecnimont",
      logo: "/images/clients/maire-tecnimont.png",
      description: "PMI and other NDT services of production facilities",
    },
    {
      name: "MFE Middle East",
      logo: "/images/clients/mfe-middle-east.png",
      description: "NDT services (RT, PT, MT, UT)",
    },
    {
      name: "BALDWIN Engineering Co",
      logo: "/images/clients/baldwin-engineering.png",
      description:
        "PMI and other NDT services; Phased arrays and pulse echo A scan of production facilities",
    },
  ],
  "Chemical & Fertilizer Industry": [
    {
      name: "Egypt Fertilizer Factory",
      logo: "/images/clients/egypt-fertilizer.png",
      description: "Third party inspection",
    },
    {
      name: "Abou Zaabal",
      logo: "/images/clients/abou-zaabal.png",
      description:
        "NDT services (RT, PT, MT, UT) on storage tanks of phosphoric acid, tilting pan vacuum filter",
    },
  ],
  "Cement Industry": [
    {
      name: "Elsewedy Cement Company",
      logo: "/images/clients/elsewedy.png",
      description:
        "NDT services (RT, PT, MT, UT) on cement manufacturing equipment; gyratory crushers, apron feeders, storage surge bins",
    },
  ],
  "Consumer Goods": [
    {
      name: "Dabur Egypt Limited",
      logo: "/images/clients/dabur.png",
      description:
        "Evaluation of steel trusses design and extension of new trusses",
    },
  ],
  "Educational Institutions": [
    {
      name: "German University in Cairo (GUC)",
      logo: "/images/clients/guc.png",
      description:
        "Cladding of X-ray unit by lead alloy to comply with radiation protection specifications",
    },
    {
      name: "Port Said Engineers Syndicate",
      logo: "/images/clients/port-said-syndicate.png",
      description:
        "Capacity building courses of NDT methods to syndicate members",
    },
    {
      name: "Student Hostel of Al-Azhar University",
      logo: "/images/clients/al-azhar.png",
      description: "Fabrication of stainless steel ancillaries",
    },
    {
      name: "Mining and Metallurgical Center for Research and Development at Cairo University",
      logo: "/images/clients/cairo-university.png",
      description:
        "Collaborative protocol for failure analysis and corrosion protection advice for oil and gas sector production facilities",
    },
  ],
  "Training & Certification Bodies": [
    {
      name: "Egyptian Welding Academy (EWA)",
      logo: "/images/clients/ewa.png",
      description:
        "Collaborative protocol for capacity building training and NDT services (RT, PT, MT, UT)",
    },
    {
      name: "NSF",
      logo: "/images/clients/nsf.png",
      description:
        "Training of inspectors according to ASNT requirements for Visual inspection tests",
    },
    {
      name: "Lloyds Register",
      logo: "/images/clients/lloyds-register.png",
      description: "Preparation of welding procedures",
    },
    {
      name: "DSD",
      logo: "/images/clients/dsd.png",
      description:
        "Training of inspectors according to ASNT requirements (MT, PT, RT, VT, UT)",
    },
  ],
};

// Create a flat array of all clients for the grid view
const allClients = Object.values(clientsBySector).flat();

// Simple loading component
const SimpleLoading = () => (
  <div className="py-16 flex justify-center">
    <div className="animate-spin h-8 w-8 border-2 border-blue-600 rounded-full border-t-transparent"></div>
  </div>
);

export default function ClientsPage() {
  return (
    <main className="min-h-screen">
      {/* Clients Page Header */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-bounce delay-500" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-700/30 rounded-full border border-blue-400/30 mb-6">
              <span className="text-blue-200 text-sm font-medium">
                🌍 Global Partnerships
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Our International Clients
            </h1>
            <p className="text-lg md:text-xl max-w-4xl mx-auto mb-8 text-blue-100 leading-relaxed">
              We've built lasting partnerships with leading organizations across{" "}
              <span className="font-semibold text-white">
                8+ industry sectors
              </span>
              , providing them with world-class engineering, inspection, and
              technical consulting services.
            </p>

            {/* Enhanced Industry Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { name: "Energy & Power", icon: "⚡" },
                { name: "Oil & Gas", icon: "🛢️" },
                { name: "Steel & Metal", icon: "🔩" },
                { name: "Construction", icon: "🏗️" },
                { name: "Manufacturing", icon: "⚙️" },
                { name: "Chemical", icon: "🧪" },
                { name: "Education", icon: "🎓" },
                { name: "Training", icon: "📚" },
              ].map((sector, index) => (
                <FadeIn key={sector.name} delay={100 + index * 50}>
                  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 px-4 py-2 rounded-full border border-white/20 hover:border-white/40 text-sm font-medium">
                    <span className="text-lg">{sector.icon}</span>
                    {sector.name}
                  </span>
                </FadeIn>
              ))}
            </div>

            {/* Stats Preview */}
            <FadeIn delay={400}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {Object.keys(clientsBySector).length}+
                  </div>
                  <div className="text-blue-200 text-sm">Industries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {allClients.length}+
                  </div>
                  <div className="text-blue-200 text-sm">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    15+
                  </div>
                  <div className="text-blue-200 text-sm">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    100%
                  </div>
                  <div className="text-blue-200 text-sm">Quality</div>
                </div>
              </div>
            </FadeIn>
          </FadeIn>
        </div>
      </section>

      {/* Clients by Sector Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-12 md:mb-16 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-4">
              <span className="text-blue-800 text-sm font-medium">
                🤝 Trusted Partnerships
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry Leaders <span className="text-blue-600">Trust Us</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our work spans across multiple industries, providing specialized
              engineering and inspection services to leading organizations
              worldwide.
            </p>
          </FadeIn>

          {Object.entries(clientsBySector).map(
            ([sector, clients], sectorIndex) => {
              const sectorIcons = {
                "Energy & Power Sector": "⚡",
                "Oil & Gas Sector": "🛢️",
                "Steel & Metal Industry": "🔩",
                "Construction & Infrastructure": "🏗️",
                "Manufacturing & Industrial": "⚙️",
                "Chemical & Fertilizer Industry": "🧪",
                "Cement Industry": "🏭",
                "Consumer Goods": "📦",
                "Educational Institutions": "🎓",
                "Training & Certification Bodies": "📚",
              };

              return (
                <FadeIn
                  key={sector}
                  delay={200 + sectorIndex * 100}
                  className="mb-16"
                >
                  <div className="relative">
                    {/* Sector Header with Enhanced Design */}
                    <div className="flex items-center justify-center mb-8">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
                      <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200 mx-4">
                        <span className="text-2xl">
                          {sectorIcons[sector] || "🏢"}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                          {sector}
                        </h3>
                        <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                          {clients.length}{" "}
                          {clients.length === 1 ? "client" : "clients"}
                        </div>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
                    </div>

                    {/* Enhanced Client Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {clients.map((client, index) => (
                        <FadeIn key={index} delay={300 + index * 50}>
                          <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white h-[400px] md:h-[450px]">
                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1px] rounded-lg">
                              <div className="bg-white rounded-lg h-full w-full"></div>
                            </div>

                            <CardContent className="relative z-10 flex flex-col items-center justify-between p-6 md:p-8 h-full">
                              {/* Logo Container with Enhanced Styling */}
                              <div className="relative mb-4 group-hover:scale-105 transition-transform duration-300 flex justify-center flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                                <div className="relative h-20 md:h-24 w-full max-w-[180px] p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
                                  <LazyImage
                                    src={client.logo}
                                    alt={`${client.name} logo`}
                                    width={180}
                                    height={96}
                                    className={`object-contain w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-500 ${
                                      client.specialClass || ""
                                    }`}
                                    fallback="/placeholder.svg"
                                  />
                                </div>
                              </div>

                              {/* Client Name with Better Typography */}
                              <h4 className="font-bold text-lg mb-3 text-center text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight min-h-[3rem] flex items-center justify-center flex-shrink-0">
                                {client.name}
                              </h4>

                              {/* Services Description with Enhanced Styling */}
                              <div className="text-center space-y-3 flex-1 flex flex-col justify-center">
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex-1 flex flex-col justify-center">
                                  <div className="flex items-center justify-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="font-semibold text-blue-800 text-xs uppercase tracking-wide">
                                      Services
                                    </span>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  </div>
                                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                                    {client.description}
                                  </p>
                                </div>

                                {client.additional && (
                                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-2">
                                    <p className="text-xs text-blue-700 font-medium italic line-clamp-2">
                                      💡 {client.additional}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Partnership Badge */}
                              <div className="mt-3 pt-3 border-t border-gray-100 w-full flex-shrink-0">
                                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                  <span>Active Partnership</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            }
          )}

          {/* Enhanced Industry Overview Stats */}
          <FadeIn delay={800} className="mt-20">
            <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-2xl shadow-2xl p-8 md:p-12 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-400/20 rounded-full blur-lg animate-bounce delay-1000" />

              <div className="relative z-10">
                <div className="text-center mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Our Global Impact 🌍
                  </h3>
                  <p className="text-blue-200 text-lg">
                    Delivering excellence across industries worldwide
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {[
                    {
                      value: `${Object.keys(clientsBySector).length}+`,
                      label: "Industry Sectors",
                      icon: "🏭",
                      description: "Diverse expertise",
                    },
                    {
                      value: `${allClients.length}+`,
                      label: "Satisfied Clients",
                      icon: "🤝",
                      description: "Global partnerships",
                    },
                    {
                      value: "15+",
                      label: "Years Experience",
                      icon: "📅",
                      description: "Proven track record",
                    },
                    {
                      value: "100%",
                      label: "Quality Assurance",
                      icon: "✅",
                      description: "Excellence guaranteed",
                    },
                  ].map((stat, index) => (
                    <FadeIn key={index} delay={900 + index * 100}>
                      <div className="text-center group hover:scale-105 transition-transform duration-300">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-colors duration-300">
                          <div className="text-3xl mb-2">{stat.icon}</div>
                          <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                            {stat.value}
                          </div>
                          <div className="text-blue-200 font-medium text-sm mb-1">
                            {stat.label}
                          </div>
                          <div className="text-blue-300 text-xs opacity-80">
                            {stat.description}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
              <span className="text-green-800 text-sm font-medium">
                💬 Client Testimonials
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              What Our <span className="text-blue-600">Clients Say</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our clients' satisfaction is our greatest achievement. Here's what
              industry leaders say about our services.
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Testimonial 1 - Siemens Energy */}
              <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <svg
                      className="w-8 h-8 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                    "The team at AZ Engineering has provided exceptional
                    inspection services for our critical equipment. Their
                    attention to detail and technical expertise has helped us
                    maintain the highest standards of quality."
                  </blockquote>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-sm">SE</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Project Manager
                      </p>
                      <p className="text-sm text-gray-600">Siemens Energy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 2 - Orascom */}
              <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                    "We've been working with AZ Engineering for over three years
                    now, and their third-party inspection services have
                    consistently exceeded our expectations. Their team is
                    responsive, professional, and thorough."
                  </blockquote>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-sm">OC</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Quality Control Director
                      </p>
                      <p className="text-sm text-gray-600">Orascom</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 3 - Al Ezz Flat Steel */}
              <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white md:col-span-2 lg:col-span-1">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <svg
                      className="w-8 h-8 text-purple-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                    "AZ Engineering's expertise in NDT services and their
                    comprehensive approach to quality control has been
                    instrumental in our manufacturing operations. Highly
                    recommended for their professionalism."
                  </blockquote>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-sm">AE</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Operations Manager
                      </p>
                      <p className="text-sm text-gray-600">Al Ezz Flat Steel</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeIn>

          {/* CTA Section */}
          <FadeIn delay={400} className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Experience the same level of excellence that has made us the
                trusted partner for industry leaders worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-colors duration-300">
                  Get Started Today
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-full transition-colors duration-300">
                  View Our Services
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
