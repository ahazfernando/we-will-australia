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
    question: "What services does We Will Australia offer?",
    answer:
      "Strategic Marketing, Recruitment Solutions, IT Solutions, and Business Consulting. Each service can work independently or as part of an integrated growth strategy.",
  },
  {
    question: "Do you work with businesses outside of Victoria?",
    answer:
      "Yes, we partner with businesses globally to help them achieve their growth objectives through our comprehensive range of services.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on the scope and complexity. We provide a detailed project plan with estimated timelines after our initial consultation.",
  },
  {
    question: "Can we use multiple services together?",
    answer:
      "Absolutely. Our strength lies in integrating our services to provide a holistic solution that addresses all aspects of your business growth.",
  },
  {
    question: "How do you measure success and ROI?",
    answer:
      "We establish key performance indicators (KPIs) at the outset of every project and provide regular, transparent reporting to track progress and measure return on investment.",
  },
];

const FaqDark: React.FC = () => {
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

    // Also schedule an update for the next frame to catch any animation
    requestAnimationFrame(() => {
      if (accordionRef.current) {
        const accordionHeight = accordionRef.current.offsetHeight;
        setCardHeight(accordionHeight);
      }
    });
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-semibold mb-2 leading-tight px-2 text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-[#CEC2EB] to-[#EBE8FC] bg-clip-text text-transparent">
            Frequently asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-3xl mx-auto px-4">
            Get comprehensive answers about our services, processes, timelines,
            and how we can help your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2">
            <Card
              className="bg-black/20 backdrop-blur-xl text-white rounded-2xl shadow-2xl p-6 text-left flex flex-col justify-between transition-all duration-150 ease-out relative overflow-hidden border border-white/10"
              style={{
                height:
                  cardHeight && window.innerWidth >= 1024
                    ? `${cardHeight}px`
                    : "auto",
                minHeight: "300px",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-purple-500/3 rounded-2xl"></div>
              
              <div className="absolute top-0 -right-12 bottom-0 w-4/5 sm:-right-10 sm:w-3/5 lg:-right-8 lg:w-3/5">
                <Image
                  src="/about/marketing-imgv2.png"
                  alt="Talk to our specialists"
                  fill
                  className="object-cover object-left opacity-100"
                />
              </div>
              
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-[#CEC2EB]/8 via-[#BA64FF]/5 to-transparent rounded-full blur-3xl z-0"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-tl from-[#EBE8FC]/10 via-[#CEC2EB]/8 to-transparent rounded-full blur-2xl z-0"></div>

              <div className="relative z-10 pr-[50%] sm:pr-[45%] lg:pr-[50%]">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                  Talk to our Specialists
                </h3>
                <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                  Let's discuss how we can transform your business together.
                </p>
              </div>

              <div className="relative z-10 pr-[50%] sm:pr-[45%] lg:pr-[50%]">
                <Link href="/contact">
                  <Button
                    variant="secondary"
                    className="bg-[#CEC2EB] text-black hover:bg-[#EBE8FC] px-2.5 h-8 sm:h-9 text-xs rounded-lg font-medium w-auto min-w-[120px] sm:min-w-[140px] max-w-full"
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
                    className="bg-black/20 backdrop-blur-xl shadow-lg hover:shadow-xl rounded-xl border border-white/10 px-5 py-1 sm:px-6 sm:py-0 transition-all duration-200 hover:border-[#CEC2EB]/50"
                  >
                    <AccordionTrigger className="text-base sm:text-lg font-semibold text-white text-left hover:no-underline min-h-[60px] sm:h-[52px] py-4 sm:py-0 flex items-center hover:text-[#CEC2EB] transition-colors duration-200">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-white/80 pb-5 pt-2 sm:py-4 leading-relaxed">
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

export default FaqDark;
