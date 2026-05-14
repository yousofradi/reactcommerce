import express, { Request, Response } from 'express';
import prisma from '../config/db';
// import adminAuth from '../middleware/adminAuth'; // TODO: Implement admin auth

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const webhooks = await prisma.webhook.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(webhooks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const webhook = await prisma.webhook.create({
      data: {
        url: data.url,
        events: data.events || [],
        secret: data.secret || null,
        active: data.active !== false
      }
    });
    res.status(201).json(webhook);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const webhook = await prisma.webhook.update({
      where: { id: String(req.params.id) },
      data: {
        url: data.url,
        events: data.events,
        secret: data.secret,
        active: data.active
      }
    });
    res.json(webhook);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.webhook.delete({
      where: { id: String(req.params.id) }
    });
    res.json({ message: 'Webhook deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
