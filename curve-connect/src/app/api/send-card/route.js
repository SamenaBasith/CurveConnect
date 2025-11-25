import { Resend } from "resend";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // required for fs on Vercel

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { recipientEmail, message, signature, cardSrc } = await req.json();

    if (!recipientEmail || !message || !signature || !cardSrc) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    // resolve path in /public
    const cleanSrc = cardSrc.replace(/^\//, "");
    const filePath = path.join(process.cwd(), "public", cleanSrc);
    const imageBuffer = fs.readFileSync(filePath);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipientEmail,
      subject: "Your Greeting Card",
      html: `<p>${message}</p><p>— ${signature}</p>`,
      attachments: [
        {
          filename: cleanSrc.split("/").pop(),
          content: imageBuffer,
        },
      ],
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Send error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}





