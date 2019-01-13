import * as dotenv from 'dotenv'
import * as express from 'express'
import * as next from 'next'
import * as expressGraphql from 'express-graphql'
import * as mongoose from 'mongoose'

import { schema } from './schema'
import { rootValue } from './resolvers'

dotenv.config()

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

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

        mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fzaky.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
            .then(() => {
                server.listen(port, err => {
                    if (err) throw err
                    console.log(`> Ready on http://localhost:${port}`)
                })
            })
            .catch(error => { throw error })
    })
