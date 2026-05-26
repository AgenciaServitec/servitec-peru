interface SmtpDetailsResult {
  from: string;
  smtpConfig:
    | {
        service: string;
        user: string;
        pass: string;
      }
    | undefined;
}

export const getSiteSmtpDetails = (site: any): SmtpDetailsResult => {
  const smtpConfig = site?.smtpConfig;

  const isCustomSmtpActive =
    site?.customSmtp &&
    smtpConfig?.service &&
    smtpConfig?.user &&
    smtpConfig?.pass;

  const from = isCustomSmtpActive
    ? `"${site.name}" <${smtpConfig.user}>`
    : `"Servitec Perú" <notificaciones@servitecperu.com>`;

  return {
    from,
    smtpConfig: isCustomSmtpActive
      ? {
          service: smtpConfig.service,
          user: smtpConfig.user,
          pass: smtpConfig.pass,
        }
      : undefined,
  };
};
