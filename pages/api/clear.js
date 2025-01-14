import { Redis } from '@upstash/redis'

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async (_, res) => {
    // const data = await redis.ltrim('todo_oz', -1, 0)
    const data = await redis.del('todo_oz')
    return res.status(200).json(data);
}
