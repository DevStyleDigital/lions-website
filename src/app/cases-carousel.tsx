"use client";
import Case1 from "@/assets/cases/1.png";
import Case2 from "@/assets/cases/2.png";
import Case3 from "@/assets/cases/3.png";
import Case4 from "@/assets/cases/4.png";
import Case5 from "@/assets/cases/5.png";
import Case6 from "@/assets/cases/6.png";
import Case7 from "@/assets/cases/7.png";
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
					{ src: Case1, alt: "Bella Make Store" },
					{ src: Case2, alt: "Festa do Peão de Salto de Pirapora 2023" },
					{ src: Case3, alt: "Humor exótico" },
					{ src: Case4, alt: "Leiturança" },
					{ src: Case5, alt: "Marcha Para Jesus" },
					{ src: Case6, alt: "Rejoy" },
					{ src: Case7, alt: "TratyVet" },
				].map((cases, i) => (
					<CarouselItem
						index={i}
						key={i.toString()}
						className="md:basis-1/3 relative flex flex-col h-[70vh] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 items-center justify-center"
					>
						<Image
							src={cases.src}
							alt={cases.alt}
							className="object-contain h-auto w-auto overflow-hidden"
						/>
            <p className="p-2 max-h-2 text-base">{cases.alt}</p>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselNext />
			<CarouselPrevious />
		</Carousel>
	);
};
