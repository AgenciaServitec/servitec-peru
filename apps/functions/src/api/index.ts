import cors from "cors";
import express from "express";

// @ts-ignore
import assistancesRoutes from "./assistances/routes/assistances.routes";
import {
  putBiometricAssistanceByDni,
  getUsersWithFingerprintTemplate,
  putUserFingerprintTemplate,
} from "./fingerprint/index.js";
// @ts-ignore
import quotationsRoutes from "./quotations/routes/quotations.routes";
// @ts-ignore
import usersRoutes from "./users/routes/users.routes";

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
