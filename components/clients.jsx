import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FadeIn } from "@/components/animations/fade-in";
import { LazyImage } from "@/components/lazy-image";
import { useState } from "react";

export default function Clients() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState(null);
  const clients = [
    {
      name: "Siemens Energy",
      logo: "/images/clients/siemens.svg",
      description: "Welding & vibration analysis",
    },
    {
      name: "Orascom",
      logo: "/images/clients/orascom.svg",
      description: "Third-party inspection",
    },
    {
      name: "Sinoma-CDI",
      logo: "/images/clients/sinoma-cdi.png",
      description: "PMI & phased array services",
    },
    {
      name: "Al Ezz Flat Steel",
      logo: "/images/clients/al-ezz.png",
      description: "RT, PT, MT, UT",
    },
    {
      name: "Boysen Egypt",
      logo: "/images/clients/boysen.svg",
      description: "DT & NDT services",
      specialClass: "scale-[2.5]",
    },
    {
      name: "Egyptian Chinese Drilling Co",
      logo: "/images/clients/ecdc.png",
      description: "Technical consulting",
    },
    {
      name: "Elsewedy Cement Company",
      logo: "/images/clients/elsewedy.png",
      description: "Inspection of manufacturing equipment",
    },
    {
      name: "German University in Cairo",
      logo: "/images/clients/guc.png",
      description: "Radiation protection cladding",
    },
    {
      name: "SILO FOODS",
      logo: "/images/clients/silo-foods.jpg",
      description: "Food industry quality assurance",
    },
  ];

  const handleDotClick = (index) => {
    if (api) {
      api.scrollTo(index);
      setCurrentSlide(index);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Clients</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're proud to work with leading organizations across various
            industries, providing them with reliable engineering and inspection
            services.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="relative">
            <Carousel
              className="max-w-6xl mx-auto"
              setApi={(api) => {
                setApi(api);
                api?.on("select", () => {
                  setCurrentSlide(api.selectedScrollSnap());
                });
              }}
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {clients.map((client, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full bg-white">
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <div className="relative h-32 w-56 mb-4 flex items-center justify-center">
                          <LazyImage
                            src={client.logo}
                            alt={`${client.name} logo`}
                            width={224}
                            height={128}
                            className={`object-contain transition-all duration-300 max-w-full max-h-full ${
                              client.specialClass || ""
                            }`}
                            fallback="/placeholder.svg"
                          />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                          {client.name}
                        </h3>
                        <p className="text-gray-600 text-center text-sm">
                          {client.description}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
