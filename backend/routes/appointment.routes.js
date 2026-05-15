import express from 'express';
import * as ctrl from '../controllers/appointment.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/',                  protect, ctrl.createAppointment);
router.get('/',                   protect, ctrl.getAllAppointments);
router.get('/latest',             protect, ctrl.getLatestAppointments);
router.get('/status/:status',     protect, ctrl.getByStatus);
router.get('/:id',                protect, ctrl.getAppointmentById);
router.put('/:id',                protect, ctrl.updateAppointment);
router.delete('/:id',             protect, ctrl.deleteAppointment);

export default router;