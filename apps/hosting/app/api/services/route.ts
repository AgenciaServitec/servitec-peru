export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { captchaToken } = body;

    if (!captchaToken) {
      return new Response("Token ausente", { status: 400 });
    }

    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY!,
          response: captchaToken,
        }),
      }
    );

    const verification = await verifyResponse.json();

    if (!verification.success || verification.score < 0.5) {
      return new Response("Fallo en la validación de seguridad", {
        status: 403,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response("Error interno", { status: 500 });
  }
}
