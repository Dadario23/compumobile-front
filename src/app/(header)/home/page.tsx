"use client";
import CardQuoteDevice from "@/components/CardQuoteDevice";
import { CorouselHome } from "@/components/CorouselHome";

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0 mt-8">
      <div className="lg:w-1/2">
        <CorouselHome />
      </div>
      <div className="lg:w-1/2">
        <CardQuoteDevice />
      </div>
    </div>
  );
};

export default page;
