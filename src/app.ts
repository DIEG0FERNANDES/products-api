import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

import { productsRouter } from './routes/products'
import { swaggerOptions } from './config/swagger'
import './data-source'

export const app = express();

app.use(cors());
app.use(express.json())
app.use(logger('dev'))

app.use('/products', productsRouter)

const specs = swaggerJSDoc(swaggerOptions)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.get('/', (_req: any, res: { send: (arg0: string) => any }) => res.send('Products API'))
