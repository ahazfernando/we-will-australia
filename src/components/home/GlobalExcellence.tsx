import React from "react";
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Vortex } from "@/components/ui/vortex";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import Sparkles from "@/components/ui/sparkles";

const features = [
  {
    Icon: FileTextIcon,
    name: "Customer Satisfaction",
    description: "We prioritize your success with dedicated support and personalized solutions.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <Vortex
          backgroundColor="transparent"
          particleCount={200}
          baseHue={280}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
      </div>
    ),
  },
  {
    Icon: BellIcon,
    name: "Communication",
    description: "Stay connected with real-time updates and transparent communication channels.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <OrbitingCircles
          className="w-full h-full"
          reverse
          radius={30}
          duration={20}
          delay={20}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: "Digital Transformation",
    description: "Leverage cutting-edge technology to modernize and scale your business operations.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <Sparkles
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#ffffff"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
      </div>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "On Time",
    description: "Deliver projects and solutions within agreed timelines with precision and reliability.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <Vortex
          backgroundColor="transparent"
          particleCount={150}
          baseHue={60}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20" />
      </div>
    ),
  },
];

const GlobalExcellence: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Global Excellence
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Experience world-class services with our commitment to excellence, 
            innovation, and customer satisfaction across all our solutions.
          </p>
        </div>
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default GlobalExcellence;
