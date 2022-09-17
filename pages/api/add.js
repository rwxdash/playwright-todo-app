import { Redis } from '@upstash/redis'

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async (req, res) => {
    if (!req.query.todo) {
        return res.status(400).send("todo parameter required.")
    }
    let todo = encodeURIComponent(req.query.todo)

    if (profanityCheck(todo)) {
        return res.status(400).json({ message: 'Todo input has a forbidden word!' })
    }

    const data = await redis.lpush('todo_oz', todo)
    return res.status(200).json(data);
}

function profanityCheck(params) {
    const wordList = [
        'bullshit',
        'damn',
        'douche',
        'moron',
        'stupid',
        'shit'
    ]

    return wordList.some(v => params.includes(v))
}
