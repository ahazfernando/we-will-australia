"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";

const faqData = [
  {
    question: "What types of roles do you recruit for?",
    answer:
      "We specialize in a wide range of roles, including executive search, technology, finance, marketing, and sales. We can tailor our search to your specific industry needs.",
  },
  {
    question: "What is your recruitment process?",
    answer:
      "Our process includes an in-depth consultation, candidate sourcing and screening, interviews, and offer management. We partner with you every step of the way to ensure a perfect fit.",
  },
  {
    question: "How do you find qualified candidates?",
    answer:
      "We use a multi-channel approach that includes our extensive talent network, targeted advertising, direct sourcing, and industry referrals to find the best candidates.",
  },
  {
    question: "Do you offer support with onboarding?",
    answer:
      "Yes, we can assist with the onboarding process to ensure a smooth transition for your new hire, setting them up for success from day one.",
  },
  {
    question: "What are your fees for recruitment services?",
    answer:
      "Our fees are competitive and vary based on the scope of the search. We offer both contingent and retained search options to best suit your needs.",
  },
];

const RecruitmentFaq: React.FC = () => {
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardHeight = () => {
      if (accordionRef.current) {
        const accordionHeight = accordionRef.current.offsetHeight;
        setCardHeight(accordionHeight);
      }
    };
    updateCardHeight();
    let resizeObserver: ResizeObserver;

    if (accordionRef.current) {
      resizeObserver = new ResizeObserver((entries) => {
        requestAnimationFrame(updateCardHeight);
      });
      resizeObserver.observe(accordionRef.current);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  const handleAccordionChange = () => {
    if (accordionRef.current) {
      const accordionHeight = accordionRef.current.offsetHeight;
      setCardHeight(accordionHeight);
    }
    requestAnimationFrame(() => {
      if (accordionRef.current) {
        const accordionHeight = accordionRef.current.offsetHeight;
        setCardHeight(accordionHeight);
      }
    });
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-semibold mb-2 leading-tight px-2 text-2xl sm:text-3xl md:text-4xl bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
            Frequently asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Get comprehensive answers about our recruitment services, processes,
            and how we can help build your team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2">
            <Card
              className="bg-blue-950 text-white rounded-2xl shadow-2xl p-6 text-left flex flex-col justify-between transition-all duration-150 ease-out relative overflow-hidden"
              style={{
                height:
                  cardHeight && window.innerWidth >= 1024
                    ? `${cardHeight}px`
                    : "auto",
                minHeight: "300px",
              }}
            >
              <div className="absolute top-0 -right-16 bottom-0 w-4/5 sm:-right-14 sm:w-3/5 lg:-right-12 lg:w-3/5">
                <Image
                  src="/about/recruitement-image.png"
                  alt="Talk to our specialists"
                  fill
                  className="object-cover object-left"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] via-[#1e3a8a] via-15% to-[#1e3a8a]/10 via-30% to-transparent pointer-events-none z-[1]"></div>

              <div className="relative z-10 pr-[50%] sm:pr-[45%] lg:pr-[50%]">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                  Talk to our Specialists
                </h3>
                <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                  Let's discuss how we can find the perfect talent for your business.
                </p>
              </div>

              <div className="relative z-10 pr-[50%] sm:pr-[45%] lg:pr-[50%]">
                <Link href="/contact">
                  <Button
                    variant="secondary"
                    className="bg-white text-[#1e3a8a] hover:bg-gray-200 px-2.5 h-8 sm:h-9 text-xs rounded-lg font-medium w-auto min-w-[120px] sm:min-w-[140px] max-w-full"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
          <div className="lg:col-span-4">
            <div ref={accordionRef}>
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-4"
                onValueChange={handleAccordionChange}
              >
                {faqData.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white shadow-lg hover:shadow-xl rounded-xl border border-gray-200/80 px-5 py-1 sm:px-6 sm:py-0 transition-all duration-200 hover:border-blue-200"
                  >
                    <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800 text-left hover:no-underline min-h-[60px] sm:h-[52px] py-4 sm:py-0 flex items-center hover:text-blue-700 transition-colors duration-200">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-gray-600 pb-5 pt-2 sm:py-4 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentFaq;