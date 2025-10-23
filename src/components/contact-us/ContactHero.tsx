import React from "react";

const ContactHero: React.FC = () => {
  return (
    <section className="pt-32 pb-2 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-black mb-6">
            Contact us
          </h1>
          <p className="text-lg text-black max-w-4xl mx-auto">
            Interested in working with us? Let us know your expectations and specific needs.<br />
            Reach out today, and let's explore how we can collaborate effectively!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
