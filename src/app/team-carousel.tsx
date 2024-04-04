"use client";
import teamNameBg from "@/assets/team-name-bg.webp";
import People1 from "@/assets/team/1.webp";
import People10 from "@/assets/team/10.webp";
import People11 from "@/assets/team/11.webp";
import People12 from "@/assets/team/12.webp";
import People13 from "@/assets/team/13.webp";
import People2 from "@/assets/team/2.webp";
import People3 from "@/assets/team/3.webp";
import People4 from "@/assets/team/4.webp";
import People5 from "@/assets/team/5.webp";
import People6 from "@/assets/team/6.webp";
import People7 from "@/assets/team/7.webp";
import People8 from "@/assets/team/8.webp";
import People9 from "@/assets/team/9.webp";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export const TeamCarousel = () => {
	return (
		<Carousel
			plugins={[Autoplay({ delay: 5000 })]}
			opts={{ align: "start", loop: true }}
			className="flex-1 relative max-w-screen-2xl w-[calc(100vw-4rem-4rem)] mx-auto md:px-18"
		>
			<Image
				src={teamNameBg}
				alt=""
				className="absolute -bottom-8 max-w-[100vw] w-[2036px] h-32 left-1/2 -translate-x-[50%] z-10 px-8 max-lg:bg-[linear-gradient(270deg,_#F6652E_0%,_#FA7A38_100%)]"
			/>
			<CarouselContent className="h-full relative z-10 lg:-space-x-12 lg:ml-8">
				{[
					{ src: People1, name: "Caroline Lima", role: "Diretora Executiva" },
					{ src: People2, name: "Felipe Noris", role: "Diretor de Marketing" },
					{
						src: People3,
						name: "João Vinícius Lencioni",
						role: "Diretor de Arte",
					},
					{ src: People4, name: "Bruna Almeida", role: "Coordenadora Geral" },
					{ src: People5, name: "Guilherme Sanches", role: "Designer Gráfico" },
					{ src: People6, name: "Regina Calhau", role: "Designer Gráfico" },
					{ src: People7, name: "Mateus Antunes", role: "Designer Gráfico" },
					{ src: People8, name: "Rodrigo Phudym", role: "Motion Designer" },
					{ src: People9, name: "Wilian Noris", role: "Motion Designer" },
					{ src: People10, name: "Emanuelle Eduarda", role: "Jornalista" },
					{ src: People11, name: "Gabriele Moreschi", role: "Social Media" },
					{ src: People12, name: "Flávio Alvarenga", role: "Roteirista" },
					{ src: People13, name: "Dayane Bezerra", role: "Administrativo" },
				].map((people, i) => (
					<CarouselItem
						index={i}
						key={i.toString()}
						className="md:basis-1/3 relative flex flex-col h-[620px] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 items-center justify-end"
					>
						<Image
							src={people.src}
							alt=""
							className="w-[30rem] max-w-[30rem] object-[0_25rem] object-cover left-0 z-0 mb-24"
						/>

						<div className="ml-12 text-black absolute">
							<h3 className="text-2xl font-bold">{people.name}</h3>
							<p className="text-base">{people.role}</p>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselNext className="xl:-translate-x-16 z-30" />
			<CarouselPrevious />
		</Carousel>
	);
};
