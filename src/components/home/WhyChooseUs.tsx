import React, { forwardRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PerformanceOptimizedBorderBeam } from "@/components/ui/performance-optimized-border-beam";

const features = [
  {
    badge: '"Data First"',
    value: "100%",
    title: "Data-Driven Decisions",
    description:
        "We use insights and analytics to guide strategies that deliver measurable results for your business.",
  },
  {
    badge: '"Global Reach"',
    value: "Global",
    title: "& Local Talent",
    description:
        "Access the right people for every role — from local experts to international specialists — to drive your business forward.",
  },
  {
    badge: '"Made for You"',
    value: "Custom",
    title: "Tailored Solutions",
    description:
        "Every business is unique. Our services are customized to fit your goals, challenges, and growth plans.",
  },
  {
    badge: '"All-in-One"',
    value: "The",
    title: "One-Stop Solution",
    description:
        "Marketing, recruitment, IT, and business operations — all under one roof, so you can focus on what matters most.",
  },
];

const WhyChooseUs = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Businesses Choose Us
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by businesses in both cities and regions, we bring the right
            mix of expertise, talent, and innovation to help you thrive —
            wherever you’re based.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative bg-black text-white rounded-3xl shadow-lg overflow-hidden"
            >
              <CardHeader>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white w-fit"
                >
                  {feature.badge}
                </Badge>
              </CardHeader>
              <CardContent className="text-left mt-4">
                <p className="text-4xl font-semibold mb-1">{feature.value}</p>
                <CardTitle className="text-lg font-semibold mb-2">
                  {feature.title}
                </CardTitle>
                <p className="text-white/80">{feature.description}</p>
              </CardContent>
              <PerformanceOptimizedBorderBeam 
                duration={12} 
                size={80} 
                colorFrom="#ffffff" 
                colorTo="#64748b" 
                delay={index * 1}
                borderWidth={2}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

WhyChooseUs.displayName = "WhyChooseUs";

export default WhyChooseUs;
