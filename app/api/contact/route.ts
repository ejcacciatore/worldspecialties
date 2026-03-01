import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, country, products, story, website } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const subject =
      type === "vendor"
        ? `New Vendor Application: ${name} from ${country}`
        : `New Contact Form: ${name}`;

    const html = `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #1C1917;">${subject}</h2>
        <hr style="border-color: #e5e5e5;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name</strong></td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Email</strong></td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${country ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Country/Region</strong></td><td style="padding: 8px 0;">${country}</td></tr>` : ""}
          ${products ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Products</strong></td><td style="padding: 8px 0;">${products}</td></tr>` : ""}
          ${website ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Website</strong></td><td style="padding: 8px 0;"><a href="${website}">${website}</a></td></tr>` : ""}
        </table>
        ${
          story
            ? `<div style="margin-top: 16px;">
            <strong>Their Story:</strong>
            <div style="margin-top: 8px; padding: 16px; background: #f9f6f0; border-radius: 8px; line-height: 1.6;">
              ${story.replace(/\n/g, "<br/>")}
            </div>
          </div>`
            : ""
        }
      </div>
    `;

    await resend.emails.send({
      from: "World Specialties <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "hello@worldspecialties.com"],
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
