import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/modules/routes'
import globalErrorHandler from './app/modules/middleware/globalErrorHandler'
import notFound from './app/modules/middleware/notFound'
import cookieParser from 'cookie-parser'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))

// root application route
app.use('/api', router)

// test routes
app.get('/', (req: Request, res: Response) => {
  const a = 'hello world'

  res.send(a)
})

// global error handler middleware
app.use(globalErrorHandler)

// not found route middleware
app.use(notFound)

export default app
