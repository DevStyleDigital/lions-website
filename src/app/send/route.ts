import { readFile } from "fs/promises";
import { type NextRequest } from "next/server";
import { join } from "path";
import { mail } from "services/mail";

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		if (!data) throw { message: "no-data" };

		if (!Object.values(data).length) throw "";
		let htmlTemplate = await readFile(
			join(process.cwd(), "src/assets/mail", "mail.html"),
			"utf-8",
		);
		const { theme, ...form } = data;

		for (const [key, value] of Object.entries(form)) {
			htmlTemplate = htmlTemplate.replaceAll(
				`{{${key.toUpperCase()}}}`,
				value as string,
			);
		}

		await mail.transporter.sendMail({
			to: "",
			from: { name: "Message from Website", address: process.env.MAIL || '' },
			replyTo: data.email,
			subject: `Website: ${theme}`,
			html: htmlTemplate,
		});
		return Response.json({ status: "sended" });
	} catch (err: any) {
		return Response.json(
			{ error: { statusCode: 500, message: err.message } },
			{ status: 500 },
		);
	}
}