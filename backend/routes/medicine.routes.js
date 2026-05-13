import express from 'express';
import * as ctrl from '../controllers/medicine.controller.js';

const router = express.Router();

router.post('/',          ctrl.createMedicine);
router.get('/',           ctrl.getAllMedicines);
router.get('/latest',     ctrl.getLatestMedicines);
router.get('/active',     ctrl.getActiveMedicines);     // ← endDate in future
router.get('/expired',    ctrl.getExpiredMedicines);    // ← endDate in past
router.get('/:id',        ctrl.getMedicineById);
router.put('/:id',        ctrl.updateMedicine);
router.delete('/:id',     ctrl.deleteMedicine);

export default router;