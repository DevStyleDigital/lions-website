"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "components/ui/form";
import { Input, InputMask } from "components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { cn } from "utils/cn";
import * as z from "zod";

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
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn("flex flex-col gap-8 mt-16", {
					"pointer-events-none opacity-60": loading,
				})}
			>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Nome Completo*"
										className="w-full"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<InputMask
										mask="+55 (99) 99999-9999"
										showMask={false}
										placeholder="WhatsApp*"
										className="w-full"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

          <FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Endereço de Email*"
										className="w-full"
                    type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
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
				<Button
					variant="outline"
					className="text-primary w-fit self-center px-8"
				>
					Enviar <Send className="w-4 h-4 ml-2 mt-1" />
				</Button>
			</form>
		</Form>
	);
};
