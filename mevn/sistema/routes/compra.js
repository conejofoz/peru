import routerx from 'express-promise-router'
import compraController from '../controllers/CompraController'
import auth from '../middlewares/auth'

const router=routerx()

router.post('/add', auth.verifyDepositeiro, compraController.add)
router.get('/query', auth.verifyDepositeiro, compraController.query)
router.get('/list', auth.verifyDepositeiro, compraController.list)
router.get('/grafico12meses', auth.verifyUsuario, compraController.grafico12Meses)
router.get('/consultaDatas', auth.verifyUsuario, compraController.consultaDatas)
/*
router.put('/update', auth.verifyDepositeiro, compraController.update)
router.delete('/remove', auth.verifyDepositeiro, compraController.remove)
*/
router.put('/activate', auth.verifyDepositeiro, compraController.activate)
router.put('/deactivate', auth.verifyDepositeiro, compraController.deactivate)


export default router