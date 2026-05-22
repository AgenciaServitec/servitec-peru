import { renderHtmlTemplate, sendMail } from "../sendMail";
import { template } from "./templates";
import { ContactEntry } from "../../globalTypes";
import { fetchSite } from "../../_firebase/collections";

interface MailData {
  primaryColor: string;
  fullName: string;
  messageText: string;
  logoUrl: string;
  siteName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  whatsappUrl: string;
}

export const sendMailAdminContactEntry = async (
  contactEntry: ContactEntry
): Promise<void> => {
  const targetEmail = contactEntry?.client.email;

  if (!targetEmail) {
    console.warn(
      `[Mailer] No se pudo enviar el correo. La entrada ID: ${contactEntry?.id} no cuenta con un email de destino.`
    );
    return;
  }

  try {
    const site = contactEntry.siteId
      ? ((await fetchSite(contactEntry.siteId)) as any)
      : null;

    if (!site) {
      console.warn(
        `[Mailer] No se encontró el sitio con ID: ${contactEntry.siteId}. Se cancela el envío.`
      );
      return;
    }

    const htmlResult = renderHtmlTemplate(
      template.contactEntryEmailTemplate,
      mapMailData(contactEntry, site)
    );

    await sendMail({
      to: site?.notifications.mainReceiver,
      subject: `[Nueva Consulta] ${contactEntry.category} | Sitio: ${site.hostname}`,
      html: htmlResult,
    });
  } catch (error) {
    console.error(
      `[Mailer Error] Falla al procesar sendMailContactEntry para ID: ${contactEntry?.id}`,
      error
    );
  }
};

const mapMailData = (contactEntry: ContactEntry, site: any): MailData => ({
  primaryColor: site?.branding?.primaryColor || "",
  fullName: contactEntry?.client.fullName || "",
  messageText: contactEntry?.message || "",
  logoUrl: site?.branding.logo.url || "",
  siteName: site?.name || "",
  companyAddress: site?.businessInfo?.address || "",
  companyEmail: site?.notifications?.mainReceiver || "",
  companyPhone: site?.notifications?.phone?.number || "",
  facebookUrl: site?.businessInfo?.socialMedia?.facebook
    ? `https://www.facebook.com/${site?.businessInfo?.socialMedia?.facebook}`
    : "",
  instagramUrl: site?.businessInfo?.socialMedia?.instagram
    ? `https://www.instagram.com/${site?.businessInfo?.socialMedia?.instagram}`
    : "",
  linkedinUrl: site?.businessInfo?.socialMedia?.linkedin
    ? `https://www.linkedin.com/in/${site?.businessInfo?.socialMedia?.linkedin}`
    : "",
  whatsappUrl: site?.businessInfo?.socialMedia?.whatsapp
    ? `https://wa.me/${site?.businessInfo?.socialMedia?.whatsapp}`
    : "",
});
