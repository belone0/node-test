import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

const database = new DatabasePostgres();

server.post("/videos", async (request, reply) => {
    const {title, description, duration} = request.body
    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get("/videos", async (request, reply) => {

    const search = request.query.search
    const videos = database.list(search)
    
    return videos
})

server.put("/videos/:id", async (request, reply) => {
    const id = request.params.id 
    const { title, description, duration } = request.body

    const video = database.update(id, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete("/videos/:id", async (request, reply) => {
    database.delete(request.params.id)

    return reply.status(204).send()
})

server.listen({ port: process.env.PORT ?? 3000})