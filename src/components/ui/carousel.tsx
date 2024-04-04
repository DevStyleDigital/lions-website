"use client";

import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { flushSync } from "react-dom";

type CarouselProps = {
	opts?: any;
	plugins?: any[];
	orientation?: "horizontal" | "vertical";
	setApi?: (api: any) => void;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
	slidesInView: number[];
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />");
	}

	return context;
}

const Carousel = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
	(
		{
			orientation = "horizontal",
			opts,
			setApi,
			plugins,
			className,
			children,
			...props
		},
		ref,
	) => {
		const [carouselRef, api] = useEmblaCarousel(
			{
				...opts,
				axis: orientation === "horizontal" ? "x" : "y",
			},
			plugins,
		);
		const [canScrollPrev, setCanScrollPrev] = React.useState(false);
		const [canScrollNext, setCanScrollNext] = React.useState(false);

		const [slidesInView, setSlidesInView] = React.useState<number[]>([]);
		const onScroll = React.useCallback(() => {
			if (!api) return;

			const engine = api.internalEngine();
			const first = engine.index.get();
			const slidesAmount = api.slideNodes();

			function getNext(n: number) {
				return first + n === slidesAmount.length
					? 0
					: first + n ===  slidesAmount.length + 1
					  ? 1
					  : first + n ===  slidesAmount.length + 2
						  ? 2
						  : first + n;
			}

			setSlidesInView([first, getNext(1), getNext(2), getNext(3)]);
		}, [api, setSlidesInView]);

		const onSelect = React.useCallback(
			(api: any) => {
				if (!api) {
					return;
				}

				setCanScrollPrev(api.canScrollPrev());
				setCanScrollNext(api.canScrollNext());
			},
			[setCanScrollPrev, setCanScrollNext],
		);

		const scrollPrev = React.useCallback(() => {
			api?.scrollPrev();
		}, [api]);

		const scrollNext = React.useCallback(() => {
			api?.scrollNext();
		}, [api]);

		const handleKeyDown = React.useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				if (event.key === "ArrowLeft") {
					event.preventDefault();
					scrollPrev();
				} else if (event.key === "ArrowRight") {
					event.preventDefault();
					scrollNext();
				}
			},
			[scrollPrev, scrollNext],
		);

		React.useEffect(() => {
			if (!api || !setApi) {
				return;
			}

			setApi(api);
		}, [api, setApi]);

		React.useEffect(() => {
			if (!api) {
				return;
			}

			onSelect(api);
			onScroll();
			api.on("reInit", (ev) => {
				onSelect(ev);
				onScroll();
			});
			api.on("select", onSelect);
			api.on("scroll", () => {
				flushSync(() => onScroll());
			});

			return () => {
				api?.off("select", onSelect);
				api.off("scroll", () => {
					flushSync(() => onScroll());
				});
			};
		}, [api, onSelect, onScroll]);

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					api: api,
					opts,
					orientation:
						orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext,
					slidesInView,
				}}
			>
				<div
					ref={ref}
					onKeyDownCapture={handleKeyDown}
					className={cn("relative", className)}
					role="region"
					aria-roledescription="carousel"
					{...props}
				>
					{children}
				</div>
			</CarouselContext.Provider>
		);
	},
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div ref={carouselRef} className="overflow-hidden">
			<div
				ref={ref}
				className={cn(
					"flex",
					orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
					className,
				)}
				{...props}
			/>
		</div>
	);
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & { index: number }
>(({ className, index, ...props }, ref) => {
	const { orientation, slidesInView } = useCarousel();

	return (
		<div
			ref={ref}
			role="group"
			aria-roledescription="slide"
			className={cn(
				"min-w-0 shrink-0 grow-0 basis-full transition-opacity",
				orientation === "horizontal" ? "pl-4" : "pt-4",
				slidesInView.length && slidesInView[slidesInView.length - 1] === index
					? "max-xl:opacity-0"
					: "",
				slidesInView.length && slidesInView.includes(index)
					? "xl:opacity-100"
					: "opacity-0",
				className,
			)}
			{...props}
		/>
	);
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button>
>(({ className, variant = "ghost", size = "icon", ...props }, ref) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn(
				"absolute  h-8 w-8 rounded-full",
				orientation === "horizontal"
					? "-left-12 top-1/2 -translate-y-1/2"
					: "-top-12 left-1/2 -translate-x-1/2 rotate-90",
				className,
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<svg
				width="21"
				height="39"
				viewBox="0 0 21 39"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>{""}</title>
				<path
					d="M21 1.33333V37.1263C21 38.0114 19.9348 38.4602 19.3015 37.8419L0.742131 19.7245C0.336711 19.3287 0.340741 18.6755 0.751014 18.2847L19.3103 0.609195C19.947 0.00285399 21 0.454137 21 1.33333Z"
					fill="url(#arrow-linear)"
				/>
				<defs>
					<linearGradient
						id="arrow-linear"
						x1="10.5"
						y1="-1"
						x2="10.5"
						y2="39.5"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#FD9141" />
						<stop offset="1" stopColor="#F76B32" />
					</linearGradient>
				</defs>
			</svg>

			<span className="sr-only">Item anterior</span>
		</Button>
	);
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button>
>(({ className, variant = "ghost", size = "icon", ...props }, ref) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn(
				"absolute h-8 w-8 rounded-full",
				orientation === "horizontal"
					? "-right-12 top-1/2 -translate-y-1/2"
					: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
				className,
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<svg
				width="21"
				height="39"
				viewBox="0 0 21 39"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="rotate-180"
			>
				<title>{""}</title>
				<path
					d="M21 1.33333V37.1263C21 38.0114 19.9348 38.4602 19.3015 37.8419L0.742131 19.7245C0.336711 19.3287 0.340741 18.6755 0.751014 18.2847L19.3103 0.609195C19.947 0.00285399 21 0.454137 21 1.33333Z"
					fill="url(#arrow-linear)"
				/>
				<defs>
					<linearGradient
						id="arrow-linear"
						x1="10.5"
						y1="-1"
						x2="10.5"
						y2="39.5"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#FD9141" />
						<stop offset="1" stopColor="#F76B32" />
					</linearGradient>
				</defs>
			</svg>
			<span className="sr-only">Próximo item</span>
		</Button>
	);
});
CarouselNext.displayName = "CarouselNext";

export {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
};
