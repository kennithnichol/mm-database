const authConfig = {
    secret: process.env.MMDB_APP_SECRET,
    tokenExpiryTime: 300,
    redisServerPort: process.env.MMDB_REDIS_PORT || 6379,
    redisServerURL: process.env.MMDB_REDIS_URL,
    redisConnectionString: process.env.REDIS_URL
}

export { authConfig }