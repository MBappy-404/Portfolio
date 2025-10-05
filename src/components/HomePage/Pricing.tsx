"use client";
import Image from "next/image";
import React from "react";
 

// TypeScript interfaces
interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  pricePeriod: string | null;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  isPopular: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

// SVG Icon for included features
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// SVG Icon for excluded features
const TimesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// Pricing Plans based on your skills
const pricingPlans: PricingPlan[] = [
  {
    name: "Starter Website",
    price: "$299",
    pricePeriod: "one-time",
    description:
      "Best for small businesses & individuals who need a modern landing page.",
    features: [
      { text: "Responsive UI (React + Next.js)", included: true },
      { text: "Tailwind CSS Styling", included: true },
      { text: "Framer Motion Animations", included: true },
      { text: "Basic SEO Setup", included: true },
      { text: "Backend Integration", included: false },
      { text: "Database (MongoDB/SQL)", included: false },
    ],
    buttonText: "Get Started",
    isPopular: false,
  },
  {
    name: "Professional WebApp",
    price: "$799",
    pricePeriod: "project",
    description: "For startups & growing teams who need scalable web apps.",
    features: [
      {
        text: "Fullstack Development (React, Next.js, Node.js, Express)",
        included: true,
      },
      { text: "Database (MongoDB, Mongoose, SQL)", included: true },
      { text: "Authentication (JWT)", included: true },
      { text: "API Integration & Optimization", included: true },
      { text: "Advanced Animations (Framer Motion)", included: true },
      { text: "Deployment (Vercel, Netlify, Render)", included: true },
    ],
    buttonText: "Start Project",
    isPopular: true,
  },
  {
    name: "Enterprise Solution",
    price: "Custom",
    pricePeriod: null,
    description: "Tailored solutions for global clients with complex needs.",
    features: [
      { text: "Custom Web Applications", included: true },
      { text: "Scalable Architecture with Node.js & Express", included: true },
      { text: "Advanced Database Design (SQL + NoSQL)", included: true },
      { text: "SSO & Secure Auth with JWT", included: true },
      { text: "24/7 Support & Maintenance", included: true },
      { text: "UI/UX Design with Figma", included: true },
      { text: "Custom Deployment (Cloud, Vercel)", included: true },
    ],
    buttonText: "Contact Me",
    isPopular: false,
  },
];

// Individual Pricing Card Component
const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const cardClasses = `
    bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs
    border rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-2xl
    ${
      plan.isPopular
        ? "border-2 border-indigo-500 dark:border-indigo-400 relative shadow-lg shadow-indigo-500/20 dark:shadow-indigo-400/20"
        : "border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600"
    }
  `;

  const buttonClasses = `
  w-full py-3 px-6 rounded-lg cursor-pointer   font-medium mt-auto transition-all duration-300
  border border-transparent focus:outline-none 
  ${
    plan.isPopular
      ? "bg-[#6c2bd9]  dark:bg-[#6c2bd9] text-white shadow-lg shadow-indigo-500/30 dark:shadow-indigo-600/30 hover:bg-transparent hover:text-gray-800 hover:border-[#6c2bd9] dark:hover:bg-transparent dark:hover:text-white focus:ring-indigo-500 dark:focus:ring-indigo-400"
      : `
        bg-gray-200 hover:bg-[#6c2bd9] hover:dark:bg-[#6c2bd9]  dark:bg-zinc-800/70  
        text-slate-800 dark:text-zinc-200 hover:text-white
        border border-gray-300 dark:border-zinc-600
        backdrop-blur-sm hover:shadow-md dark:hover:shadow-lg dark:hover:border-transparent hover:border-transparent
      `
  }
`;


  return (
      
    <div className={cardClasses}>
      {plan.isPopular && (
        <div className="absolute top-0 right-4 -mt-3 bg-indigo-500 dark:bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          MOST POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-4">
        {plan.name}
      </h3>
      <p className="text-gray-800 dark:text-zinc-100 text-4xl font-bold mb-2">
        {plan.price}
        {plan.pricePeriod && (
          <span className="text-lg text-gray-500 dark:text-zinc-400 font-medium">
            {" "}
            {plan.pricePeriod}
          </span>
        )}
      </p>
      <p className="text-gray-600 dark:text-zinc-400 mb-8 text-sm h-10">
        {plan.description}
      </p>
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature: PricingFeature, index: number) => (
          <li
            key={index}
            className={`flex items-center ${
              feature.included
                ? "text-gray-700 dark:text-zinc-300"
                : "text-gray-400 dark:text-zinc-500"
            }`}
          >
            {feature.included ? <CheckIcon /> : <TimesIcon />}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      <button className={buttonClasses}>{plan.buttonText} </button>
    </div>
    
  );
};

// Main Pricing Section Component
const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="relative py-16 sm:py-24 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108, 43, 217, 0.15), transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-zinc-100 mb-6 tracking-tight">
            Service Pricing
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Flexible plans designed for startups, businesses, and enterprises
            worldwide. Get high-quality development with modern tech stack.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan: PricingPlan, index: number) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        {/* Extra info */}
        <div className="text-center mt-16 max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 dark:text-zinc-500 mb-4">
            All projects include 1 month free support after delivery.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-zinc-400">
            <span className="flex items-center">
              <CheckIcon />
              Cancel anytime
            </span>
            <span className="flex items-center">
              <CheckIcon />
              24/7 client support
            </span>
            <span className="flex items-center">
              <CheckIcon />
              Global delivery
            </span>
          </div>
        </div>
      </div>
       
       
      

     

   
    </section>
  );
};

export default PricingSection;
