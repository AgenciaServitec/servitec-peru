import cors from "cors";
import express from "express";

import assistancesRoutes from "./assistances/routes/assistances.routes";
import {
  getUsersWithFingerprintTemplate,
  putBiometricAssistanceByDni,
  putUserFingerprintTemplate,
} from "./fingerprint";
import quotationsRoutes from "./quotations/routes/quotations.routes";
import usersRoutes from "./users/routes/users.routes";
import identitiesRoutes from "./identities/routes/identities.routes";
import servicesRequestsRoutes from "./service-request/routes/servicesRequests.routes";
import webServicesRequestsRoutes from "./web-service-request/routes/webServicesRequests.routes";
import entriesRoutes from "./entries/routes/entries.routes";
import authRoutes from "./auth/routes/auth.routes";
import qrCodesRoutes from "./qr-codes/routes/qrCodes.routes";

const app: express.Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Welcome!").end());

app.use("/users", usersRoutes);
app.use("/assistances", assistancesRoutes);
app.use("/quotations", quotationsRoutes);
app.use("/services-requests", servicesRequestsRoutes);
app.use("/identities", identitiesRoutes);
app.use("/auth", authRoutes);
app.use("/web-services-requests", webServicesRequestsRoutes);
app.use("/entries", entriesRoutes);
app.use("/qr-codes", qrCodesRoutes);

app.put("/users/:dni/fingerprint", putUserFingerprintTemplate);
app.put("/fingerprint/assistances/:dni", putBiometricAssistanceByDni);
app.get("/fingerprint/verify", getUsersWithFingerprintTemplate);

export { app };
