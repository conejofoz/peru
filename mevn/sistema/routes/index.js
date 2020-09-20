import routerfx from 'express-promise-router'
import categoriaRouter from './categoria'
import produtoRouter from './produto'
import usuarioRouter from './usuario'
import pessoaRouter from './pessoa'
import compraRouter from './compra'
import { Router } from 'express'

const router=routerfx()

router.use('/categoria', categoriaRouter)
router.use('/produto',produtoRouter)
router.use('/usuario', usuarioRouter)
router.use('/pessoa', pessoaRouter)
router.use('/compra', compraRouter)

export default router
