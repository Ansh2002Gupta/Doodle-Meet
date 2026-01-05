const checkEnvironmentConfig = () => {
  if (!process.env.PORT) throw new Error("PORT is not defined");
  if (!process.env.MONGODB_USERNAME)
    throw new Error("MONGODB_USERNAME is not defined");
  if (!process.env.MONGODB_PASSWORD)
    throw new Error("MONGODB_PASSWORD is not defined");
  if (!process.env.MONGODB_HOSTNAME)
    throw new Error("MONGODB_HOSTNAME is not defined");
  if (!process.env.MONGODB_APPNAME)
    throw new Error("MONGODB_APPNAME is not defined");
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  if (!process.env.NODE_ENV) throw new Error("NODE_ENV is not defined");
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
};

export default checkEnvironmentConfig;
