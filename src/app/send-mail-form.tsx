"use client";
import { WhatsApp } from "@/assets/whatsapp";
import { Button } from "@/components/ui/button";
import { Input, InputMask } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { Facebook, Instagram, Linkedin, Mail, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export const SendMailForm = () => {
	const [loading, setLoading] = useState(false);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function onSubmit(ev: any) {
		setLoading(true);
		const data = {
			name: ev.currentTarget.name.value,
			phone: ev.currentTarget.phone.value,
			email: ev.currentTarget.email.value,
		};

		fetch("/api/send", { body: JSON.stringify(data), method: "POST" })
			.then((res) => {
				toast.success("Seu email foi enviado!");
				return res;
			})
			.catch(() => {
				toast.error("Ops... algo aconteceu!");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<form
			onSubmit={onSubmit}
			className={cn(
				"w-full md:max-w-xl flex flex-col space-y-8 max-md:bg-[#F7732E] sm:px-8 px-4 max-md:py-10 max-md:pb-20",
				{
					"pointer-events-none opacity-60": loading,
				},
			)}
		>
			<h2 className="text-4xl text-center md:w-fit">
				<b>Entre em contato</b>
			</h2>

			<Input
				required
				placeholder="Nome Completo*"
				name="name"
				className="w-full !mt-4"
			/>

			<InputMask
				mask={[
					"(",
					/\d/,
					/\d/,
					")",
					" ",
					"9",
					/\d/,
					/\d/,
					/\d/,
					/\d/,
					"-",
					/\d/,
					/\d/,
					/\d/,
					/\d/,
				]}
				required
				name="phone"
				showMask={false}
				placeholder="WhatsApp*"
				className="w-full"
			/>

			<Input
				required
				name="email"
				placeholder="Endereço de Email*"
				className="w-full"
				type="email"
			/>

			{/* <FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea placeholder="Sua mensagem*" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				  /> */}
			<Button size="lg" className="">
				Enviar <Send className="w-6 h-6 ml-4 mb-1 mt-1" />
			</Button>

			<ul className="flex items-center flex-wrap max-md:justify-center gap-4">
				<li>
					<Link
						className="bg-black rounded-full p-3 flex items-center justify-center"
						href="https://api.whatsapp.com/send?phone=5515998146238"
            target="_blank"
					>
						<WhatsApp className="w-6 h-6" />
					</Link>
				</li>
				<li>
					<Link
						className="bg-black rounded-full p-3 flex items-center justify-center"
						href="https://www.facebook.com/lionsbrazil.ag"
            target="_blank"
					>
						<Facebook className="w-6 h-6" />
					</Link>
				</li>
				<li>
					<Link
						className="bg-black rounded-full p-3 flex items-center justify-center"
						href="https://www.instagram.com/lionsbrazil.ag/"
            target="_blank"
					>
						<Instagram className="w-6 h-6" />
					</Link>
				</li>
				<li>
					<Link
						className="bg-black rounded-full p-3 flex items-center justify-center"
						href="https://www.linkedin.com/in/lions-brazil-7289b8289/"
            target="_blank"
					>
						<Linkedin className="w-6 h-6" />
					</Link>
				</li>
				<li>
					<Link
						className="bg-black rounded-full p-3 flex items-center justify-center"
						href="mailto:contato@lionsbrazil.com.br"
            target="_blank"
					>
						<Mail className="w-6 h-6" />
					</Link>
				</li>
			</ul>
		</form>
	);
};
