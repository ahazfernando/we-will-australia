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

const FaqDark: React.FC = () => {
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
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
  }, [isMounted]);

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

  if (!isMounted) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-semibold mb-2 leading-tight px-2 text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-[#52c585] to-[#6ee7b7] bg-clip-text text-transparent">
              Frequently asked Questions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-3xl mx-auto px-4">
              Get comprehensive answers about our IT solutions, processes, and how
              we can help your business.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <Card className="bg-black/20 backdrop-blur-xl text-white rounded-2xl shadow-2xl p-6 text-left flex flex-col justify-between relative overflow-hidden border border-white/10 min-h-[300px]">
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                    Talk to our Specialists
                  </h3>
                  <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                    Let's discuss how we can enhance your IT infrastructure.
                  </p>
                </div>
                <div className="relative z-10">
                  <Link href="/contact">
                    <Button
                      variant="secondary"
                      className="bg-gradient-to-r from-[#00a067] to-[#52c585] text-black hover:from-[#52c585] hover:to-[#00a067] px-2.5 h-8 sm:h-9 text-xs rounded-lg font-medium w-auto min-w-[120px] sm:min-w-[140px] max-w-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4">
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-black/20 backdrop-blur-xl shadow-lg rounded-xl border border-white/10 px-5 py-4"
                  >
                    <div className="text-base sm:text-lg font-semibold text-white mb-2">
                      {faq.question}
                    </div>
                    <div className="text-sm sm:text-base text-white/80">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-semibold mb-2 leading-tight px-2 text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-[#52c585] to-[#6ee7b7] bg-clip-text text-transparent">
            Frequently asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-3xl mx-auto px-4">
            Get comprehensive answers about our IT solutions, processes, and how
            we can help your business.
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
              <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-teal-500/3 rounded-2xl"></div>
              
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-[#00a067]/20 via-[#52c585]/15 to-transparent rounded-full blur-3xl z-[1]"></div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-[#52c585]/25 via-[#00a067]/20 to-transparent rounded-full blur-2xl z-[1]"></div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/2 to-transparent rounded-2xl"></div>
              
              
              <div className="absolute top-0 -right-12 bottom-0 w-4/5 sm:-right-10 sm:w-3/5 lg:-right-8 lg:w-3/5 z-[2]">
                <Image
                  src="/about/it-solutions-image.png"
                  alt="Talk to our specialists"
                  fill
                  className="object-cover object-left"
                />
              </div>

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
                    className="bg-gradient-to-r from-[#00a067] to-[#52c585] text-black hover:from-[#52c585] hover:to-[#00a067] px-2.5 h-8 sm:h-9 text-xs rounded-lg font-medium w-auto min-w-[120px] sm:min-w-[140px] max-w-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300"
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
                key="it-solutions-faq"
                id="it-solutions-faq"
              >
                {faqData.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-black/20 backdrop-blur-xl shadow-lg hover:shadow-xl rounded-xl border border-white/10 px-5 py-1 sm:px-6 sm:py-0 transition-all duration-200 hover:border-[#00a067]/30"
                  >
                    <AccordionTrigger className="text-base sm:text-lg font-semibold text-white text-left hover:no-underline min-h-[60px] sm:h-[52px] py-4 sm:py-0 flex items-center hover:text-[#00a067] transition-colors duration-200">
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
