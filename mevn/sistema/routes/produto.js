import routerx from 'express-promise-router'
import produtoController from '../controllers/ProdutoController'
import auth from '../middlewares/auth'

const router=routerx()

router.post('/add', auth.verifyDepositeiro, produtoController.add)
router.get('/query', auth.verifyDepositeiro, produtoController.query)
router.get('/list', auth.verifyDepositeiro, produtoController.list)
router.put('/update', auth.verifyDepositeiro, produtoController.update)
router.delete('/remove', auth.verifyDepositeiro, produtoController.remove)
router.put('/activate', auth.verifyDepositeiro, produtoController.activate)
router.put('/deactivate', auth.verifyDepositeiro, produtoController.deactivate)


export default router