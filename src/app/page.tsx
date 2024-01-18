import AboutBg from "@/assets/about-bg.png";
import AboutVetor from "@/assets/about-vetor.png";
import LionManBg from "@/assets/bg-lion-man.png";
import casesBg from "@/assets/cases-bg.png";
import { clients } from "@/assets/clients";
import ClientsBg from "@/assets/clients-bg.png";
import HeroBg from "@/assets/hero-bg.png";
import LionMan from "@/assets/lion-man.png";
import Lion from "@/assets/lion.png";
import TeamVetor from "@/assets/team-vetor.png";
import Image from "next/image";
import { CasesCarousel } from "./cases-carousel";
import { TeamCarousel } from "./team-carousel";

const Page = () => {
	return (
		<main>
			<section className="relative" id="home">
				<div className="max-w-screen-xl mx-auto">
					<div className="absolute z-10 top-1/2 -translate-y-1/2 max-lg:text-center max-lg:left-1/2 max-lg:-translate-x-1/2">
						<h1 className="font-bold">
							Lions Brazil
							<br /> Comunicação
						</h1>
						<h2 className="text-white mt-4">
							Transformando ideias <br />
							em projetos de <b>sucesso</b>
						</h2>
					</div>
				</div>
				<div className="relative">
					<Image
						priority
						className="w-fit h-full absolute right-0 lg:w-[60%] object-cover mix-blend-luminosity opacity-50"
						src={Lion}
						alt=""
					/>
					<hr
						aria-hidden
						className="border-transparent border-b-white border max-w-screen-xl w-[calc(100%-2rem)] h-0 bottom-40 absolute left-[calc(50%+1rem)] -translate-x-1/2"
					/>
					<Image
						priority
						className="object-cover object-[63%_top] h-screen w-full"
						src={HeroBg}
						alt="Um Leão olhando para o horizonte"
					/>
				</div>
			</section>
			<section className="relative h-screen" id="about">
				<div className="max-w-screen-xl mx-auto flex items-center h-full sm:px-8 px-4">
					<p className="lg:max-w-[60%] max-lg:text-center">
						Com mais de <b>25 anos de experiência</b> em diversas frentes de
						trabalho, conhecimento profissional em ampla área da comunicação,
						decidimos criar a <b>LIONS BR</b>
						<br />
						<br />
						Uma agência que leva em seu nome suas principais características,
						<b>domínio e segurança!</b> com o objetivo de trazer um novo olhar
						para o mercado criativo.
						<br />
						<br />
						Com a missão de conectar a sua marca, unindo criatividade, cultura e
						tecnologia, nosso objetivo é envolver as pessoas através de
						mensagens bem elaboradas, compreendendo todos os sentimentos e
						posicionando <b>nossos clientes para o topo!</b>
					</p>
				</div>
				<div className="absolute h-[inherit] right-0 top-0 -z-10 max-lg:opacity-20">
					<Image
						priority
						className="w-fit h-full absolute"
						src={LionManBg}
						alt=""
					/>
					<Image
						priority
						className="w-fit h-full relative object-cover"
						src={LionMan}
						alt="Um Leão olhando para o horizonte"
					/>
				</div>
			</section>
			<section className="relative">
				<div className="max-w-screen-xl mx-auto">
					<div className="absolute lg:max-w-[50%] sm:px-8 px-4 max-lg:text-center max-lg:left-0 text-white z-10 top-1/2 -translate-y-1/2">
						<h1>
							Comprometimento
							<br /> e talento <b>destacando</b> <br />
							sua marca
						</h1>
						<p className="mt-4">
							Acreditamos que uma Agência moderna deve entender os desafios
							atuais da comunicação e ter capacidade de oferecer soluções à
							altura desses novos tempos.
						</p>
					</div>
				</div>
				<div className="relative">
					<Image
						priority
						className="w-full h-[20%] bottom-0 absolute"
						src={AboutVetor}
						alt=""
					/>
					<Image
						priority
						className="object-cover h-screen object-right-top w-full"
						src={AboutBg}
						alt=""
					/>
				</div>
			</section>
			<section className="relative bg-black h-screen">
				<Image
					priority
					className="w-full h-[60%] top-20 object-cover object-top absolute z-0"
					src={TeamVetor}
					alt=""
				/>
				<div className="text-center flex flex-col text-white w-full">
					<h1 className="text-4xl pt-20">
						Time<b>LIONS</b>
					</h1>
					<TeamCarousel />
				</div>
			</section>
			<section className="relative min-h-screen" id="clients">
				<Image
					priority
					className="w-full sm:h-[90%] bottom-0 object-bottom absolute z-0"
					src={ClientsBg}
					alt=""
				/>
				<div className="text-center flex flex-col w-full max-w-screen-xl mx-auto sm:pb-64 pb-32">
					<h1 className="text-4xl pt-20 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
						Clientes <b>atendidos</b>
					</h1>
					<ul className="flex flex-wrap justify-center mt-10">
						{clients.map((image) => (
							<li key={image[1]}>
								<Image alt={image[1]} src={image[0]} className="h-40 w-auto" />
							</li>
						))}
					</ul>
				</div>
			</section>
			<section className="relative bg-black h-screen" id="cases">
				<Image
					priority
					className="w-auto h-full top-0 right-0 object-cover object-top absolute z-0"
					src={casesBg}
					alt=""
				/>
				<div className="text-center flex flex-col relative text-white w-full">
					<h1 className="text-4xl pt-20">
						Cases de <b>Sucesso</b>
					</h1>
					<CasesCarousel />
				</div>
			</section>
		</main>
	);
};

export default Page;
