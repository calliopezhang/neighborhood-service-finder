const express = require('express');
const Service = require('../models/Service');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('A token is required for authentication');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid Token');
        req.userId = decoded.id;
        next();
    });
};

// Create a service
router.post('/', authMiddleware, async (req, res) => {
    const { name, description, address, contact } = req.body;
    const service = new Service({ name, description, address, contact, userId: req.userId });
    await service.save();
    res.status(201).json(service);
});

// Get all services
router.get('/', async (req, res) => {
    const services = await Service.find();
    res.json(services);
});

// Update a service
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    if (service.userId.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' });

    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedService);
});

// Delete a service
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    if (service.userId.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' });

    await Service.findByIdAndDelete(id);
    res.status(204).send();
});

module.exports = router;
