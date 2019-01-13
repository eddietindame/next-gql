import * as dotenv from 'dotenv'
import * as express from 'express'
import * as next from 'next'
import * as expressGraphql from 'express-graphql'
import * as mongoose from 'mongoose'
import { buildSchema } from 'graphql'

dotenv.config()

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        const schema = buildSchema(`
            type Query {
                message: String
                add(num1: Int!, num2: Int!): Int
            }
        `)

        const rootValue = {
            message: () => 'Hello World!',
            add: ({ num1, num2 }) => num1 + num2
        }

        server.use('/graphql', expressGraphql({
            schema,
            rootValue,
            graphiql: true
        }))

        server.get('/a', (req, res) => {
            return app.render(req, res, '/b', req.query)
        })

        server.get('/b', (req, res) => {
            return app.render(req, res, '/a', req.query)
        })

        server.get('/posts/:id', (req, res) => {
            return app.render(req, res, '/posts', { id: req.params.id })
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fzaky.mongodb.net/test?retryWrites=true`)
            .then(() => {
                server.listen(port, err => {
                    if (err) throw err
                    console.log(`> Ready on http://localhost:${port}`)
                })
            })
            .catch(error => { console.log(error) })
    })
