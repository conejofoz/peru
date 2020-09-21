import routerx from 'express-promise-router'
import vendaController from '../controllers/VendaController'
import auth from '../middlewares/auth'

const router=routerx()

router.post('/add', auth.verifyVendedor, vendaController.add)
router.get('/query', auth.verifyVendedor, vendaController.query)
router.get('/list', auth.verifyVendedor, vendaController.list)
/*
router.put('/update', auth.verifyDepositeiro, vendaController.update)
router.delete('/remove', auth.verifyDepositeiro, vendaController.remove)
*/
router.put('/activate', auth.verifyVendedor, vendaController.activate)
router.put('/deactivate', auth.verifyVendedor, vendaController.deactivate)


export default router