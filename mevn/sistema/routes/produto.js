import routerx from 'express-promise-router'
import produtoController from '../controllers/ProdutoController'

const router=routerx()

router.post('/add', produtoController.add)
router.get('/query',produtoController.query)
router.get('/list',produtoController.list)
router.put('/update',produtoController.update)
router.delete('/remove',produtoController.remove)
router.put('/activate',produtoController.activate)
router.put('/deactivate',produtoController.deactivate)


export default router