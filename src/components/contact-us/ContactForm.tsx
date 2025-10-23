"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./ContactForm.css";

const ContactFormSection: React.FC = () => {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [inquiry, setInquiry] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage("");
    setIsError(false);

    if (!name || !email || !service || !inquiry) {
      setFormMessage("Please fill out all required fields.");
      setIsError(true);
      return;
    }

    setIsLoading(true);

    try {
      await addDoc(collection(db, "inquiries"), {
        inquirerName: name,
        service: service,
        inquirerEmail: email,
        inquirerPhone: phone,
        inquiryMessage: inquiry,
        submittedAt: serverTimestamp(),
      });

      setFormMessage("Your inquiry has been sent successfully!");
      setIsError(false);
      // Reset form fields
      setName("");
      setService("");
      setEmail("");
      setPhone("");
      setInquiry("");
    } catch (error) {
      console.error("Error submitting inquiry: ", error);
      setFormMessage("Something went wrong. Please try again later.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-20 pb-8 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-lg rounded-xl border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enter Name */}
            <div>
              <label htmlFor="name" className="block text-base font-semibold text-black mb-1">
                Enter Name
              </label>
              <Input
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="border-gray-300 rounded-md"
              />
            </div>

            {/* Required Service */}
            <div>
              <Label className="block text-base font-semibold text-black mb-3">
                Required Service
              </Label>
              <RadioGroup
                value={service}
                onValueChange={setService}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Marketing Services" id="marketing" />
                  <Label htmlFor="marketing" className="text-sm text-gray-700 cursor-pointer">
                    Marketing Services
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Recruitment" id="recruitment" />
                  <Label htmlFor="recruitment" className="text-sm text-gray-700 cursor-pointer">
                    Recruitment
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="IT Solutions" id="it-solutions" />
                  <Label htmlFor="it-solutions" className="text-sm text-gray-700 cursor-pointer">
                    IT Solutions
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Enter Email */}
            <div>
              <label htmlFor="email" className="block text-base font-semibold text-black mb-1">
                Enter Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="border-gray-300 rounded-md"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-base font-semibold text-black mb-1">
                Phone Number
              </label>
              <PhoneInput
                id="phone"
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone}
                defaultCountry="AU"
                className="phone-input"
                disabled={isLoading}
                international
                withCountryCallingCode
              />
            </div>

            {/* Enter your Inquiry */}
            <div>
              <label htmlFor="inquiry" className="block text-base font-semibold text-black mb-1">
                Enter your Inquiry
              </label>
              <Textarea
                id="inquiry"
                placeholder="Send us your message"
                rows={5}
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                disabled={isLoading}
                className="border-gray-300 rounded-md resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-md font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Make an Inquiry"}
            </Button>

            {/* Form Message */}
            {formMessage && (
              <p className={`text-sm text-center ${isError ? "text-red-500" : "text-green-500"}`}>
                {formMessage}
              </p>
            )}
          </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
