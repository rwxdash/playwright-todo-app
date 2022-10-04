import { Redis } from '@upstash/redis'

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async (req, res) => {
    if (!req.query.todo) {
        return res.status(400).json({ message: 'Todo parameter required!' })
    }
    let todo = encodeURIComponent(req.query.todo)
    if (profanityCheck(todo)) {
        return res.status(400).json({ message: 'Todo input has a forbidden word!' })
    }

    const data = await redis.lpush('todo_oz', todo)
    return res.status(200).json(data);
}

function profanityCheck(item) {
    const wordList = [
        'bullshit',
        'damn',
        'douche',
        'stupid'
    ]

    return wordList.some(v => item.includes(v))
}
