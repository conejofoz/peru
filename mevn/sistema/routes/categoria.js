import routerx from 'express-promise-router'
import categoriaController from '../controllers/CategoriaController'
import auth from '../middlewares/auth'

const router=routerx()

router.post('/add', auth.verifyDepositeiro, categoriaController.add)
router.get('/query', auth.verifyDepositeiro, categoriaController.query)
router.get('/list', auth.verifyDepositeiro, categoriaController.list)
router.put('/update', auth.verifyDepositeiro, categoriaController.update)
router.delete('/remove', auth.verifyDepositeiro, categoriaController.remove)
router.put('/activate', auth.verifyDepositeiro, categoriaController.activate)
router.put('/deactivate', auth.verifyDepositeiro, categoriaController.deactivate)


export default router