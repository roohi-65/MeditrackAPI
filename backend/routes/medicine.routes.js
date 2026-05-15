import express from 'express';
import * as ctrl from '../controllers/medicine.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/',          protect, ctrl.createMedicine);
router.get('/',           protect, ctrl.getAllMedicines);
router.get('/latest',     protect, ctrl.getLatestMedicines);
router.get('/active',     protect, ctrl.getActiveMedicines);
router.get('/expired',    protect, ctrl.getExpiredMedicines);
router.get('/:id',        protect, ctrl.getMedicineById);
router.put('/:id',        protect, ctrl.updateMedicine);
router.delete('/:id',     protect, ctrl.deleteMedicine);

export default router;