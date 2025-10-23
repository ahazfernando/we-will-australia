"use client";

import React, { forwardRef } from "react";
import ServicesSection from "@/components/home/ServicesSection";

const ServicesSectionClient = forwardRef<HTMLElement, {}>((props, ref) => {
    return <ServicesSection ref={ref} />;
});

ServicesSectionClient.displayName = "ServicesSectionClient";

export default ServicesSectionClient;
