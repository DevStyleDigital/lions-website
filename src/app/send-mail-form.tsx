"use client";
import { Button } from "@/components/ui/button";
import { Input, InputMask } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Instagram, Linkedin, Mail, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { WhatsApp } from "@/assets/whatsapp";

const profileFormSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	phone: z.string(),
	theme: z.string(),
	message: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const SendMailForm = () => {
	const [loading, setLoading] = useState(false);
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		mode: "onChange",
	});

	function onSubmit(data: ProfileFormValues) {
		setLoading(true);

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
			onSubmit={form.handleSubmit(onSubmit)}
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

			<Input required placeholder="Nome Completo*" className="w-full !mt-4" />

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
				showMask={false}
				placeholder="WhatsApp*"
				className="w-full"
			/>

			<Input
				required
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
					<Link className="bg-black rounded-full p-3 flex items-center justify-center" href="">
						<WhatsApp className="w-6 h-6" />
					</Link>
				</li>
				<li>
					<Link className="bg-black rounded-full p-3 flex items-center justify-center" href="">
            <Facebook className="w-6 h-6" />
					</Link>
				</li>
				<li>
					<Link className="bg-black rounded-full p-3 flex items-center justify-center" href="">
            <Instagram className="w-6 h-6" />
					</Link>
				</li>
				<li>
					<Link className="bg-black rounded-full p-3 flex items-center justify-center" href="">
            <Linkedin className="w-6 h-6" />
					</Link>
				</li>
				<li>
					<Link className="bg-black rounded-full p-3 flex items-center justify-center" href="">
						<Mail className="w-6 h-6" />
					</Link>
				</li>
			</ul>
		</form>
	);
};
