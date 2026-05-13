import Medicine from '../models/medicine.model.js';

export const createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json({
      message: '✅ Medicine added successfully!',
      data: medicine
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLatestMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.json({
      message: '🕐 Latest 5 medicines added',
      count: medicines.length,
      data: medicines
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getActiveMedicines = async (req, res) => {
  try {
    const today = new Date();
    const medicines = await Medicine.find({
      $or: [
        { endDate: { $gte: today } },
        { endDate: null },
        { endDate: { $exists: false } }
      ]
    }).sort({ startDate: 1 });
    res.json({
      message: `💊 ${medicines.length} active medicine(s) found`,
      count: medicines.length,
      data: medicines
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getExpiredMedicines = async (req, res) => {
  try {
    const today = new Date();
    const medicines = await Medicine.find({
      endDate: { $lt: today, $exists: true, $ne: null }
    }).sort({ endDate: -1 });
    res.json({
      message: `⚠️ ${medicines.length} expired medicine(s) found`,
      count: medicines.length,
      data: medicines
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json({
      message: '✅ Medicine updated successfully!',
      data: medicine
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json({ message: '🗑️ Medicine deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};