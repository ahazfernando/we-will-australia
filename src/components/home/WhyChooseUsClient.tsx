"use client";

import React, { forwardRef } from "react";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const WhyChooseUsClient = forwardRef<HTMLElement, {}>((props, ref) => {
    return <WhyChooseUs ref={ref} />;
});

WhyChooseUsClient.displayName = "WhyChooseUsClient";

export default WhyChooseUsClient;
