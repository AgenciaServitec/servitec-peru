import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error(
      "DEBUG: La variable RESEND_API_KEY no se encuentra en el entorno."
    );
    return NextResponse.json(
      { error: "Configuración incompleta en el servidor" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const { fullName, email, document, phone, serviceRequested, message } =
      body;

    const { data, error } = await resend.emails.send({
      from: "Servitec <onboarding@resend.dev>",
      to: ["servitecperu266@gmail.com"],
      subject: `Nueva Solicitud: ${serviceRequested}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Nueva solicitud de contacto - Servitec</h2>
          <p><strong>Nombre:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Documento:</strong> ${document.type.toUpperCase()} ${document.number}</p>
          <p><strong>Teléfono:</strong> ${phone.prefix} ${phone.number}</p>
          <p><strong>Servicio:</strong> ${serviceRequested}</p>
          <hr />
          <p><strong>Mensaje Técnico:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: "Email enviado" }, { status: 200 });
  } catch (error) {
    console.error("Catch Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
