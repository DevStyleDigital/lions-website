"use client";
import Case1 from "assets/cases/1.png";
import Case2 from "assets/cases/2.png";
import Case3 from "assets/cases/3.png";
import Case4 from "assets/cases/4.png";
import Case5 from "assets/cases/5.png";
import Case6 from "assets/cases/6.png";
import Case7 from "assets/cases/7.png";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export const CasesCarousel = () => {
	return (
		<Carousel
			plugins={[Autoplay({ delay: 5000 })]}
			opts={{ align: "start", loop: true }}
			className="flex-1 relative max-w-screen-2xl w-[calc(100vw-4rem-4rem)] mx-auto md:px-18"
		>
			<CarouselContent className="h-full">
				{[
					{ src: Case1, alt: "" },
					{ src: Case2, alt: "" },
					{ src: Case3, alt: "" },
					{ src: Case4, alt: "" },
					{ src: Case5, alt: "" },
					{ src: Case6, alt: "" },
					{ src: Case7, alt: "" },
				].map((cases, i) => (
					<CarouselItem
						index={i}
						key={i.toString()}
						className="md:basis-1/3 relative flex flex-col h-[70vh] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 items-center justify-end"
					>
						<Image
							src={cases.src}
							alt={cases.alt}
							className="object-contain h-full w-auto overflow-hidden"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselNext />
			<CarouselPrevious />
		</Carousel>
	);
};
