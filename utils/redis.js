// utils/redis.js
const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setexAsync = promisify(this.client.setex).bind(this.client);
        this.delAsync = promisify(this.client.del).bind(this.client);

        // Log any errors from the Redis client
        this.client.on('error', (err) => {
            console.error(`Redis client not connected to the server: ${err.message}`);
        });

        // Connect the client
        this.client.on('connect', () => {
            console.log('Redis client connected');
        });
    }

    // Check if Redis client is alive
    isAlive() {
        return this.client.connected;
    }

    // Get a value by key
    async get(key) {
        try {
            return await this.getAsync(key);
        } catch (err) {
            console.error('Error getting key from Redis:', err);
            return null;
        }
    }

    // Set a value with an expiration time (in seconds)
    async set(key, value, duration) {
        try {
            await this.setexAsync(key, duration, value);
        } catch (err) {
            console.error('Error setting key in Redis:', err);
        }
    }

    // Delete a key
    async del(key) {
        try {
            await this.delAsync(key);
        } catch (err) {
            console.error('Error deleting key from Redis:', err);
        }
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
