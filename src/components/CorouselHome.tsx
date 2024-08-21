"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

// Importa las nuevas imágenes
import mobileApp from "../assets/apps.svg";
import choreList from "../assets/chore_list.svg";
import Fixing from "../assets/fixing.svg";
import inSync from "../assets/in_sync.svg";

export function CorouselHome() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  // Lista de las nuevas imágenes
  const images = [mobileApp, choreList, Fixing, inSync];

  return (
    <div className="p-4">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image src={image} alt={`Carousel Image ${index + 1}`} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
