import routerfx from 'express-promise-router'
import categoriaRouter from './categoria'
import produtoRouter from './produto'
import { Router } from 'express'

const router=routerfx()

router.use('/categoria', categoriaRouter)
router.use('/produto',produtoRouter)

export default router
