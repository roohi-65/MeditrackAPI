import Appointment from '../models/appointment.model.js';

export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({
      message: '✅ Appointment booked successfully!',
      data: appointment
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const allowed = ['upcoming', 'completed', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Use: upcoming, completed, cancelled' });
    }
    const appointments = await Appointment.find({ status }).sort({ date: 1 });
    res.json({
      message: `📅 ${appointments.length} ${status} appointment(s) found`,
      count: appointments.length,
      data: appointments
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLatestAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.json({
      message: '🕐 Latest 5 appointments',
      count: appointments.length,
      data: appointments
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json({
      message: '✅ Appointment updated successfully!',
      data: appointment
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: '🗑️ Appointment cancelled successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};