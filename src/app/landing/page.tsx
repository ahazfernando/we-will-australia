"use client";

import React from "react";
import LandingHero from "@/components/landing/LandingHero";
import { SparklesPreview } from "@/components/landing/LandingHero";
import LandingPackages from "@/components/landing/LandingPackages";
import WorldMapDemo from "@/components/landing/LandingConnect";

export default function LandingPage() {
  return (
    <main>
      {/* Second component: Sparkles preview visual */}
      <section>
        <SparklesPreview />
      </section>
      <section>
        <WorldMapDemo />
      </section>
      <section>
        <LandingPackages />
      </section>
    </main>
  );
}


