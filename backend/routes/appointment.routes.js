import express from 'express';
import * as ctrl from '../controllers/appointment.controller.js';

const router = express.Router();

router.post('/',                  ctrl.createAppointment);
router.get('/',                   ctrl.getAllAppointments);
router.get('/latest',             ctrl.getLatestAppointments);
router.get('/status/:status',     ctrl.getByStatus);        // ← upcoming / completed / cancelled
router.get('/:id',                ctrl.getAppointmentById);
router.put('/:id',                ctrl.updateAppointment);
router.delete('/:id',             ctrl.deleteAppointment);

export default router;