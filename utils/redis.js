// utils/redis.js
import redis from 'redis';

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        
        // Error handling for Redis client
        this.client.on('error', (err) => {
            console.error('Redis client error:', err);
        });
    }

    // Check if Redis client is alive
    isAlive() {
        return this.client.connected;
    }

    // Get the value from Redis by key
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    // Set the value in Redis with expiration
    async set(key, value, durationInSeconds) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, durationInSeconds, value, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    // Delete a value from Redis by key
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;

