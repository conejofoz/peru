import routerfx from 'express-promise-router'
import categoriaRouter from './categoria'
import { Router } from 'express'

const router=routerfx()

router.use('/categoria', categoriaRouter)

export default router
