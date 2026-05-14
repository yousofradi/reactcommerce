import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import compression from 'compression';
import prisma from './config/db'; // Import Prisma client

const app = express();

// ── Middleware ───────────────────────────────────────────
app.use(compression()); // gzip all responses

// ── CORS Configuration ──────────────────────────────────
const corsOptions = {
  origin: true, // Reflect request origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
  exposedHeaders: ['Content-Disposition'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '5mb' }));

// ── Routes ──────────────────────────────────────────────
// TODO: Convert these route files to TypeScript and Prisma
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import shippingRoutes from './routes/shipping';
import collectionRoutes from './routes/collections';
import webhookRoutes from './routes/webhooks';
import settingsRoutes from './routes/settings';
// import seedRoutes from './routes/seed';
import uploadRoutes from './routes/upload';
import customerRoutes from './routes/customerRoutes';
// import notificationRoutes from './routes/notifications';

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/settings', settingsRoutes);
// app.use('/api/seed', seedRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/customers', customerRoutes);
// app.use('/api/notifications', notificationRoutes);

// Serve static uploads with long cache
app.use('/uploads', express.static('uploads', {
  maxAge: '30d',
  immutable: true
}));

// ── Root route ──────────────────────────────────────────
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'eCommerce API is running (TypeScript + Prisma)',
    endpoints: {
      health: 'GET /api/health',
      products: 'GET /api/products',
      collections: 'GET /api/collections',
      shipping: 'GET /api/shipping',
      orders: 'POST /api/orders'
    }
  });
});

// ── Health check ────────────────────────────────────────
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    // Ping DB to ensure connection is alive
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('Database health check failed:', err);
    res.status(500).json({ status: 'error', database: 'disconnected', timestamp: new Date().toISOString() });
  }
});

// ── 404 handler ─────────────────────────────────────────
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Error handler ───────────────────────────────────────
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start ───────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (TypeScript)`);
});
