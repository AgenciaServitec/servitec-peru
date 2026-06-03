export const config: Config = {
  common: {
    "node-mailer": {
      port: 465,
      host: "smtp.gmail.com",
      from: "Servitec Perú System",
      user: "servitecperu266@gmail.com",
      pass: "fwyi vqys frut kixw",
    },
  },
  development: {
    version: "0.0.1",
    hosting: {
      domain: "https://servitec-peru.web.app",
      apiUrl: "https://api-servitec-peru.web.app",
    },
    mailer: {
      sendMailNotifyKorekenkeError: {
        to: "galafloresangelemilio@gmail.com",
        bcc: "",
      },
      sendMailerNotifyDasRequest: {
        to: "galafloresangelemilio@gmail.com",
        bcc: "",
      },
    },
    "api-peru-devs": {
      apiUrl: "https://api.perudevs.com/api/v1",
      token:
        "cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjcwMDVlOTI5ZmE0MTczZjYxMzIwM2M3",
    },
  },
  production: {
    version: "0.0.1",
    hosting: {
      domain: "https://platform.servitecperu.com",
      apiUrl: "https://api.servitecperu.com",
    },
    mailer: {
      sendMailNotifyKorekenkeError: {
        to: "galafloresangelemilio@gmail.com",
        bcc: "",
      },
      sendMailerNotifyDasRequest: {
        to: "galafloresangelemilio@gmail.com",
        bcc: "",
      },
    },
    "api-peru-devs": {
      apiUrl: "https://api.perudevs.com/api/v1",
      token:
        "cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjcwMDVlOTI5ZmE0MTczZjYxMzIwM2M3",
    },
  },
};
