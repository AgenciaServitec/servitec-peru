import cors from "cors";
import express from "express";

import assistancesRoutes from "./assistances/routes/assistances.routes.js";
import {
  getUsersWithFingerprintTemplate,
  putBiometricAssistanceByDni,
  putUserFingerprintTemplate,
} from "./fingerprint/index.js";
import quotationsRoutes from "./quotations/routes/quotations.routes.js";
import usersRoutes from "./users/routes/users.routes.js";

const app: express.Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Welcome!").end());

app.use("/users", usersRoutes);
app.use("/assistances", assistancesRoutes);
app.use("/quotations", quotationsRoutes);

app.put("/users/:dni/fingerprint", putUserFingerprintTemplate);
app.put("/fingerprint/assistances/:dni", putBiometricAssistanceByDni);
app.get("/fingerprint/verify", getUsersWithFingerprintTemplate);

export { app };
