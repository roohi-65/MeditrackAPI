import express from 'express';
import {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
} from '../controllers/medicine.controller.js';

const router = express.Router();

router.post('/',      createMedicine);
router.get('/',       getAllMedicines);
router.get('/:id',    getMedicineById);
router.put('/:id',    updateMedicine);
router.delete('/:id', deleteMedicine);

export default router;