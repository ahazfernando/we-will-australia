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
    question: "What kind of IT solutions do you provide?",
    answer:
      "We offer a comprehensive suite of IT solutions including managed IT services, cloud solutions, cybersecurity, network infrastructure, and custom software development to meet your specific business needs.",
  },
  {
    question: "How do you ensure data security?",
    answer:
      "Security is our top priority. We implement multi-layered security protocols, including firewalls, encryption, regular security audits, and employee training to protect your data against threats.",
  },
  {
    question: "Can you help us migrate to the cloud?",
    answer:
      "Yes, we specialize in seamless cloud migration. Our team will assess your needs, plan the migration, and execute it with minimal downtime, ensuring a smooth transition to a more flexible and scalable infrastructure.",
  },
  {
    question: "Do you provide ongoing IT support?",
    answer:
      "Absolutely. We offer 24/7 monitoring and support to ensure your IT systems are always running optimally. Our proactive approach helps prevent issues before they impact your business.",
  },
  {
    question: "How can your IT solutions improve our business?",
    answer:
      "Our solutions are designed to increase efficiency, enhance security, reduce operational costs, and provide a scalable foundation for your business to grow and innovate.",
  },
];

const ITSolutionsFaq: React.FC = () => {
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
          <h2 className="font-semibold mb-2 leading-tight px-2 text-2xl sm:text-3xl md:text-4xl bg-gradient-to-br from-[#0d9488] via-[#14b8a6] to-[#5eead4] bg-clip-text text-transparent">
            Frequently asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Get comprehensive answers about our IT solutions, processes, and how
            we can help your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2">
            <Card
              className="bg-teal-500 text-white rounded-2xl shadow-2xl p-6 text-left flex flex-col justify-between transition-all duration-150 ease-out relative overflow-hidden"
              style={{
                height:
                  cardHeight && window.innerWidth >= 1024
                    ? `${cardHeight}px`
                    : "auto",
                minHeight: "300px",
              }}
            >
              <div className="absolute top-0 -right-12 bottom-0 w-4/5 sm:-right-10 sm:w-3/5 lg:-right-8 lg:w-3/5">
                <Image
                  src="/about/it-solutions-image.png"
                  alt="Talk to our specialists"
                  fill
                  className="object-cover object-left"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-950 via-5% to-transparent via-20% pointer-events-none z-[1]"></div>

              <div className="relative z-10 pr-[50%] sm:pr-[45%] lg:pr-[50%]">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                  Talk to our Specialists
                </h3>
                <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                  Let's discuss how we can enhance your IT infrastructure.
                </p>
              </div>

              <div className="relative z-10 pr-[50%] sm:pr-[45%] lg:pr-[50%]">
                <Link href="/contact">
                  <Button
                    variant="secondary"
                    className="bg-white text-teal-700 hover:bg-gray-200 px-2.5 h-8 sm:h-9 text-xs rounded-lg font-medium w-auto min-w-[120px] sm:min-w-[140px] max-w-full"
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
                    className="bg-white shadow-lg hover:shadow-xl rounded-xl border border-gray-200/80 px-5 py-1 sm:px-6 sm:py-0 transition-all duration-200 hover:border-teal-200"
                  >
                    <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800 text-left hover:no-underline min-h-[60px] sm:h-[52px] py-4 sm:py-0 flex items-center hover:text-teal-700 transition-colors duration-200">
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

export default ITSolutionsFaq;