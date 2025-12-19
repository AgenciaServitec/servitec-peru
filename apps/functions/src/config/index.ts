import { config } from "./config";

const projectId = process.env.GCLOUD_PROJECT;

const currentEnvironment =
  projectId === "servitec-peru" ? "production" : "development";

const isProduction = currentEnvironment === "production";

const environmentConfig: EnvironmentConfig = {
  ...config[currentEnvironment],
  ...config.common,
};

export { isProduction, environmentConfig, config };
