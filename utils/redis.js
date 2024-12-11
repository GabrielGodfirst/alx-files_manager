// utils/redis.js
const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        
        // Log any errors from the Redis client
        this.client.on('error', (err) => {
            console.error('Redis client error:', err);
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
    get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, result) => {
                if (err) {
                    console.error('Error getting key from Redis:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    // Set a value with an expiration time (in seconds)
    set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'EX', duration, (err) => {
                if (err) {
                    console.error('Error setting key in Redis:', err);
                    return reject(err);
                }
                resolve();
            });
        });
    }

    // Delete a key
    del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err) => {
                if (err) {
                    console.error('Error deleting key from Redis:', err);
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
