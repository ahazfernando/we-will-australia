"use client";

import React, { forwardRef } from "react";
import Newsletter from "@/components/layout/NewsLetter";

const NewsletterClient = forwardRef<HTMLElement>((props, ref) => {
    return <Newsletter ref={ref} />;
});

NewsletterClient.displayName = "NewsletterClient";

export default NewsletterClient;
