export const config: Config = {
  common: {
    "node-mailer": {
      port: 465,
      host: "smtp.gmail.com",
      from: "Korekenke App",
      user: "korekenke.mil.pe@gmail.com",
      pass: "qfnd bxll yiww knsg",
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
        to: "nmoriano26@gmail.com",
        bcc: "galafloresangelemilio@gmail.com",
      },
      sendMailerNotifyDasRequest: {
        to: "nmoriano26@gmail.com",
        bcc: "galafloresangelemilio@gmail.com",
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
      domain: "https://servitec-peru.web.app",
      apiUrl: "https://api-servitec-peru.web.app",
    },
    mailer: {
      sendMailNotifyKorekenkeError: {
        to: "nmoriano26@gmail.com",
        bcc: "galafloresangelemilio@gmail.com",
      },
      sendMailerNotifyDasRequest: {
        to: "sanchesjasmin024@gmail.com",
        bcc: "gcunya1@gmail.com,beto1perk@gmail.com,nmoriano26@gmail.com",
      },
    },
    "api-peru-devs": {
      apiUrl: "https://api.perudevs.com/api/v1",
      token:
        "cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjcwMDVlOTI5ZmE0MTczZjYxMzIwM2M3",
    },
  },
};
