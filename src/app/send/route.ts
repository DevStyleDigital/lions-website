import { join } from "path";
import { readFile } from "fs/promises";
import { mail } from "@/services/mail";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		if (!data) throw { message: "no-data" };

		if (!Object.values(data).length) throw "";
		let htmlTemplate = await readFile(
			join(process.cwd(), "src/assets/mail", "mail.html"),
			"utf-8",
		);

		for (const [key, value] of Object.entries(data)) {
			htmlTemplate = htmlTemplate.replaceAll(
				`{{${key.toUpperCase()}}}`,
				value as string,
			);
		}

		await mail.transporter.sendMail({
			to: "contato@lionsbrazil.com.br",
			from: { name: data.name, address: process.env.MAIL || "" },
			replyTo: data.email,
			subject: "Mensagem do Website",
			html: htmlTemplate,
		});
		return Response.json({ status: "sended" });
	} catch (err) {
		const e = err as { message: string };
		return Response.json(
			{ error: { statusCode: 500, message: e.message } },
			{ status: 500 },
		);
	}
}
