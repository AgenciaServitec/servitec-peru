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

const app: express.Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Welcome!").end());

app.use("/users", usersRoutes);
app.use("/assistances", assistancesRoutes);
app.use("/quotations", quotationsRoutes);
app.use("/identities", identitiesRoutes);

app.put("/users/:dni/fingerprint", putUserFingerprintTemplate);
app.put("/fingerprint/assistances/:dni", putBiometricAssistanceByDni);
app.get("/fingerprint/verify", getUsersWithFingerprintTemplate);

export { app };
