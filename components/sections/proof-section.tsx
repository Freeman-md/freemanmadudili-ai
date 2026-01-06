"use client";

import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { proofItems, type ProofItem } from "@/lib/data/proof-items";

type ProofCardProps = {
  item: ProofItem;
};

function ProofCard({ item }: ProofCardProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label={`Open ${item.title} details`}
          className="group relative flex aspect-3/4 w-full overflow-hidden rounded-none bg-slate-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
          />
          <div className="absolute inset-x-0 bottom-0 flex h-16 flex-col justify-end bg-black/45 px-5 py-4 text-white backdrop-blur-sm transition-all duration-300 ease-out sm:group-hover:h-32 sm:group-focus-visible:h-32">
            <h3 className="text-xl font-normal leading-6">{item.title}</h3>
            <p className="mt-2 hidden text-sm font-normal leading-6 text-white/80 opacity-0 transition-opacity duration-300 ease-out sm:block sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
              {item.shortDescription}
            </p>
            <p className="mt-2 hidden text-xs uppercase tracking-[0.18em] text-white/70 opacity-0 transition-opacity duration-300 ease-out sm:block sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
              {item.context}
            </p>
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent className="overflow-hidden">
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto w-full max-w-3xl px-6 pb-8 pt-6">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-1">
                <DrawerTitle className="leading-snug">
                  {item.title}
                </DrawerTitle>
                <DrawerDescription className="text-sm leading-6 text-slate-600">
                  {item.shortDescription}
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <button
                  type="button"
                  className="text-sm text-slate-500 transition hover:text-slate-700"
                >
                  Close
                </button>
              </DrawerClose>
            </div>
            <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={item.imageSrc}
                alt={`${item.title} preview`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 800px, 100vw"
              />
            </div>
            <div className="mt-6 space-y-5 text-sm text-slate-600">
              <div>
                <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">
                  Problem
                </span>
                <p className="mt-2 leading-6">
                  {item.detailedDescription.problem}
                </p>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">
                  Automated
                </span>
                <p className="mt-2 leading-6">
                  {item.detailedDescription.automated}
                </p>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">
                  Outcome
                </span>
                <p className="mt-2 leading-6">
                  {item.detailedDescription.outcome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

type ProofCarouselProps = {
  items: ProofItem[];
};

function ProofCarousel({ items }: ProofCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start", containScroll: "trimSnaps" }}
      className="relative w-full"
    >
      <CarouselContent className="ml-4 gap-4 sm:gap-5">
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-[82%] pl-0 sm:basis-[48%] lg:basis-[32%]"
          >
            <ProofCard item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 z-10 h-12 w-12 border-slate-300/80 bg-white/95 text-slate-800 shadow-md hover:bg-white hover:shadow-lg" />
      <CarouselNext className="right-4 z-10 h-12 w-12 border-slate-300/80 bg-white/95 text-slate-800 shadow-md hover:bg-white hover:shadow-lg" />
    </Carousel>
  );
}

export function ProofSection() {
  return (
    <Section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-3 text-center sm:text-left lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
              Proof
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Systems that replaced manual work
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Short demos showing how repetitive operations were turned into reliable workflows.
            </p>
          </div>
        </div>
      </Container>
      <div className="mt-10">
        <ProofCarousel items={proofItems} />
      </div>
    </Section>
  );
}
