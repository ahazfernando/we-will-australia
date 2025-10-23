"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const PolicyTermsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('terms');

  const sections = [
    { id: 'terms', title: 'Terms of Service', number: '1' },
    { id: 'privacy', title: 'Privacy Policy', number: '2' },
    { id: 'refund', title: 'Refund Policy', number: '3' },
    { id: 'service-time', title: 'Service Time Info', number: '4' },
    { id: 'eta', title: 'Project ETA', number: '5' },
    { id: 'support', title: 'Support Policy', number: '6' },
    { id: 'liability', title: 'Limitation of Liability', number: '7' },
    { id: 'intellectual', title: 'Intellectual Property', number: '8' },
    { id: 'contact', title: 'Contact Information', number: '9' },
  ];
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-12">
              <div className="relative h-80 w-full rounded-[32px] overflow-hidden">
              <Image
                src="/about/thieka.png"
                alt="Policy, Terms and Conditions"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <Badge
                  variant="outline"
                  className="py-1 px-4 pr-4 flex items-center gap-2 mb-3 bg-white/20 backdrop-blur-sm shadow-sm rounded-[24px] text-white border-white/30 mx-auto w-fit"
                >
                  <span>Legal Information</span>
                </Badge>
                <h1 className="text-4xl font-bold text-white mb-3">
                  Policy, Terms and Conditions
                </h1>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">
                  Comprehensive legal information covering our services, policies, and terms of engagement
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
                <Card className="sticky top-8 rounded-[32px]">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">Table of Contents</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          activeSection === section.id
                            ? 'bg-gray-100 text-gray-900 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium">{section.number}.</span>
                          <span className="text-sm">{section.title}</span>
                        </div>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
                <Card className="rounded-[32px]">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    {activeSection === 'terms' && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Terms of Service</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">1.1 Overview</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                Welcome to We Will Australia (WWA). These terms and conditions outline the rules and regulations 
                                for the use of our professional services platform. By accessing and using our services, you accept 
                                these terms and conditions in full.
                              </p>
                              <p>
                                Our platform connects professionals, businesses, and communities across Australia, providing 
                                marketing services, recruitment solutions, IT consulting, and business development opportunities. 
                                We are committed to fostering innovation and professional growth in the Australian market.
                              </p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">1.2 Service Terms</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                By using our services, you represent and warrant that you are at least 18 years of age and have 
                                the legal capacity to enter into these terms. If you are under 18, you must have parental or 
                                guardian consent to use our services.
                              </p>
                              
                              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6">
                                <div className="space-y-3">
                                  <div className="flex items-start">
                                    <span className="text-yellow-600 font-bold mr-3">1.2.1</span>
                                    <p className="text-gray-800">
                                      You must not transmit any worms, viruses, or any code of a destructive nature through our platform.
                                    </p>
                                  </div>
                                  <div className="flex items-start">
                                    <span className="text-yellow-600 font-bold mr-3">1.2.2</span>
                                    <p className="text-gray-800">
                                      A breach or violation of any of these Terms will result in an immediate termination of your Services.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeSection === 'privacy' && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Privacy Policy</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">2.1 Data Collection</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                We are committed to protecting your privacy and personal information. Our collection, use, 
                                and disclosure of personal information is governed by the Australian Privacy Principles 
                                and applicable privacy laws.
                              </p>
                              <p>
                                We collect information that you provide directly to us, such as when you create an account, 
                                use our services, or contact us for support. We also collect information automatically 
                                when you use our platform, including your IP address, browser type, and usage patterns.
                              </p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">2.2 Data Protection</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                We implement appropriate technical and organizational measures to protect your personal 
                                information against unauthorized access, alteration, disclosure, or destruction.
                              </p>
                              <p>
                                We use industry-standard encryption to protect data transmission and storage. However, 
                                no method of transmission over the internet or electronic storage is 100% secure.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeSection === 'refund' && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Refund Policy</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1 Refund Eligibility</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                We Will Australia offers refunds under specific circumstances within 30 days of service delivery. 
                                Refunds are considered on a case-by-case basis and must meet our refund criteria.
                              </p>
                              <p>
                                To be eligible for a refund, services must not have been completed or delivered, and the request 
                                must be made within the specified timeframe.
                              </p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2 Refund Process</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                Refund requests must be submitted in writing to our support team with detailed reasoning. 
                                Processing time is typically 5-10 business days after approval.
                              </p>
                              <p>
                                Refunds will be processed using the same payment method used for the original transaction, 
                                unless otherwise specified.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeSection === 'service-time' && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Service Time Information</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">4.1 Business Hours</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                Our standard business hours are Monday to Friday, 9:00 AM to 6:00 PM (AEST). 
                                Emergency support is available 24/7 for critical issues.
                              </p>
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-blue-800 font-medium">Service Response Times:</p>
                                <ul className="mt-2 space-y-1 text-blue-700">
                                  <li>• General inquiries: Within 24 hours</li>
                                  <li>• Technical support: Within 4 hours</li>
                                  <li>• Emergency issues: Within 1 hour</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">4.2 Service Availability</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                We strive to maintain 99.9% uptime for our digital services. Scheduled maintenance 
                                is typically performed during off-peak hours with advance notice.
                              </p>
                              <p>
                                Service interruptions due to circumstances beyond our control (force majeure) 
                                are not considered service failures.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeSection === 'eta' && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Project ETA & Timelines</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">5.1 Project Delivery Times</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                Project timelines vary based on scope and complexity. We provide detailed project 
                                schedules during the consultation phase and maintain regular communication throughout.
                              </p>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-green-800 font-medium">Typical Project Timelines:</p>
                                <ul className="mt-2 space-y-1 text-green-700">
                                  <li>• Website Development: 2-8 weeks</li>
                                  <li>• Marketing Campaigns: 1-4 weeks</li>
                                  <li>• IT Solutions: 1-6 weeks</li>
                                  <li>• Recruitment Services: 2-12 weeks</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">5.2 Timeline Adjustments</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                Project timelines may be adjusted due to scope changes, client feedback delays, 
                                or unforeseen technical challenges. We communicate any changes promptly.
                              </p>
                              <p>
                                Rush projects may incur additional fees and are subject to availability 
                                of our development team.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeSection === 'support' && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Support Policy</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">6.1 Support Channels</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                We provide multiple support channels to ensure you receive timely assistance 
                                for your business needs.
                              </p>
                              <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-purple-800 font-medium">Available Support Channels:</p>
                                <ul className="mt-2 space-y-1 text-purple-700">
                                  <li>• Email: info@wewillaustralia.com.au</li>
                                  <li>• Phone: Available during business hours</li>
                                  <li>• Live Chat: On our website</li>
                                  <li>• Video Consultations: Scheduled appointments</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">6.2 Support Levels</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                Support is provided based on your service level agreement. Premium clients 
                                receive priority support and dedicated account management.
                              </p>
                              <p>
                                Training and documentation are provided for all services to ensure 
                                you can maximize the value of our solutions.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeSection === 'liability' && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Limitation of Liability</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">7.1 Liability Limitations</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                To the maximum extent permitted by law, We Will Australia shall not be liable for any 
                                indirect, incidental, special, consequential, or punitive damages, including but not 
                                limited to loss of profits, data, or use, arising out of or relating to your use of our services.
                              </p>
                              <p>
                                Our total liability to you for any claims arising out of or relating to these terms 
                                or our services shall not exceed the amount you paid us for the services in the 
                                twelve months preceding the claim.
                              </p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">7.2 Force Majeure</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                We shall not be liable for any failure or delay in performance under these terms 
                                which is due to fire, flood, earthquake, elements of nature, or acts of God, 
                                acts of war, terrorism, or other causes beyond our reasonable control.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeSection === 'intellectual' && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Intellectual Property</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">8.1 Ownership Rights</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                All content, trademarks, service marks, trade names, logos, and other intellectual property 
                                displayed on our platform are the property of We Will Australia or our licensors. You may 
                                not use, reproduce, or distribute any content without our express written permission.
                              </p>
                              <p>
                                You retain ownership of any content you submit to our platform, but you grant us a 
                                non-exclusive, royalty-free license to use, modify, and distribute such content in 
                                connection with our services.
                              </p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">8.2 Third-Party Content</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                Our platform may include third-party software components that are subject to their 
                                own license terms. These licenses are available for review and govern your use 
                                of such components.
                              </p>
                              <p>
                                We respect intellectual property rights and expect our users to do the same. 
                                If you believe your rights have been infringed, please contact us immediately.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeSection === 'contact' && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Contact Information</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">9.1 General Contact</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                If you have any questions about these terms and conditions, please contact us at:
                              </p>
                              <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="font-medium text-gray-900 mb-2">We Will Australia</p>
                                <p className="text-gray-700">Email: info@wewillaustralia.com.au</p>
                                <p className="text-gray-700">Website: www.wewillaustralia.com.au</p>
                                <p className="text-gray-700">Business Hours: Monday - Friday, 9:00 AM - 6:00 PM (AEST)</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">9.2 Legal Notices</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                              <p>
                                These terms and conditions are effective as of the date of your acceptance and will 
                                remain in effect until terminated by either party.
                              </p>
                              <p>
                                Any legal notices or formal communications should be sent to our registered business 
                                address and will be considered received within 5 business days of posting.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyTermsPage;
