import express, { Request, Response } from 'express';
import prisma from '../config/db';
// import adminAuth from '../middleware/adminAuth'; // TODO: Implement admin auth

const router = express.Router();

router.get('/paymentMethods', async (req: Request, res: Response) => {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: 'admin_global_settings' }
    });

    const value: any = setting?.value || {};
    res.json(value.paymentMethods || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:key', async (req: Request, res: Response) => {
  if (req.params.key === 'pwa' || req.params.key === 'paymentMethods') return; 
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: String(req.params.key) }
    });
    res.json(setting ? { key: setting.key, value: setting.value } : null);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:key', async (req: Request, res: Response) => {
  try {
    const setting = await prisma.setting.upsert({
      where: { key: String(req.params.key) },
      update: { value: req.body.value },
      create: { key: String(req.params.key), value: req.body.value }
    });
    res.json({ key: setting.key, value: setting.value });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/pwa/manifest.json', async (req: Request, res: Response) => {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: 'admin_global_settings' }
    });
    const value: any = setting?.value || {};
    
    const logoUrl = value.storeLogo || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    const storeName = value.storeName || 'admin Store';

    const manifest = {
      id: "admin-v1",
      name: storeName,
      short_name: storeName.slice(0, 10),
      description: "Store Management Dashboard",
      start_url: "/admin/index.html",
      scope: "/admin/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#64748b",
      orientation: "portrait",
      icons: [
        {
          src: logoUrl,
          sizes: "192x192",
          type: "image/png",
          purpose: "any"
        },
        {
          src: logoUrl,
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    };

    res.header('Content-Type', 'application/manifest+json');
    res.header('Access-Control-Allow-Origin', '*');
    res.json(manifest);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
