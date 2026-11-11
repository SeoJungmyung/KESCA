require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use('/uploads', express.static(path.resolve('uploads')));

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/businesses', require('./routes/businessRoutes'));
app.use('/api/certifications', require('./routes/certificationRoutes'));
app.use('/api/standards', require('./routes/standardRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.use(errorHandler);
module.exports = app;
