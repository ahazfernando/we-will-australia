"use client";

import React from "react";

const InterviewProcess: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                        Interview process
                    </h2>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                        We've built a simple and consistent 4 step process to evaluate whether We Will Australia is the right fit for you and vice versa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <div className="relative">
                        <div className="border-l border-gray-200 h-full absolute left-0 top-0 hidden lg:block"></div>
                        <div className="pl-0 lg:pl-8">
                            <h3 className="text-xl font-bold text-black mb-4">
                                Screening
                            </h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                HR screens your CV and you will be shortlisted if you match the requirements
                            </p>
                            <div className="text-6xl font-bold text-black leading-none">
                                01
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="border-l border-gray-200 h-full absolute left-0 top-0 hidden lg:block"></div>
                        <div className="pl-0 lg:pl-8">
                            <h3 className="text-xl font-bold text-black mb-4">
                                Assignment
                            </h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Shortlisted candidates will receive an assignment to help us understand your expertise
                            </p>
                            <div className="text-6xl font-bold text-black leading-none">
                                02
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="border-l border-gray-200 h-full absolute left-0 top-0 hidden lg:block"></div>
                        <div className="pl-0 lg:pl-8">
                            <h3 className="text-xl font-bold text-black mb-4">
                                Interview
                            </h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Your communication, problem-solving and technical skills will be assessed one-on-one
                            </p>
                            <div className="text-6xl font-bold text-black leading-none">
                                03
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="pl-0 lg:pl-8">
                            <h3 className="text-xl font-bold text-black mb-4">
                                Offer
                            </h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                You will receive an email from HR within 3 to 4 days if you have gotten through
                            </p>
                            <div className="text-6xl font-bold text-black leading-none">
                                04
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InterviewProcess;