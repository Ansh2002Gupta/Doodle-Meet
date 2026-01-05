const checkEnvironmentConfig = () => {
    if(!process.env.PORT) throw new Error("PORT is not defined");
    if(!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    if(!process.env.MONGO_URL) throw new Error("MONGO_URL is not defined");
    if(!process.env.NODE_ENV) throw new Error("NODE_ENV is not defined");
    if(!process.env.JWT_EXPIRES_IN) throw new Error("JWT_EXPIRES_IN is not defined");
    if(!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
}

export default checkEnvironmentConfig;
