"use client";

import React from "react";
import { NumberTicker } from "../ui/number-ticker";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    value: 100,
    suffix: "%",
    title: "Customer Satisfaction",
    description:
      "Our clients' success is our priority — we aim to exceed expectations every time.",
  },
  {
    value: 5,
    suffix: "+",
    title: "States where we serve",
    description:
      "No matter where you are in Australia, our services are accessible and reliable",
  },
  {
    value: 300,
    suffix: "+",
    title: "Successful Clients",
    description:
      "Proven results with hundreds of businesses in 6 Months trusting us to deliver real outcomes.",
  },
  {
    value: 50,
    suffix: "+",
    title: "Exclusive Partnerships",
    description:
      "We collaborate with leading companies to provide special benefits for our loyal clients.",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Businesses Choose Us
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Connecting cities and regions through strategic expertise,
            exceptional talent, and innovative solutions that drive results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-black text-white rounded-3xl shadow-lg">
              <CardContent className="text-center p-6">
                <div className="text-5xl font-bold text-white mb-3">
                  <NumberTicker
                    value={stat.value}
                    className="text-5xl font-bold text-white"
                    delay={index * 0.2}
                  />
                  <span>{stat.suffix}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {stat.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
