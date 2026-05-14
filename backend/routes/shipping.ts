import express, { Request, Response } from 'express';
import prisma from '../config/db';
// import adminAuth from '../middleware/adminAuth'; // TODO: Implement admin auth

const router = express.Router();

// GET /api/shipping — return all governorates (minimal data)
router.get('/', async (req: Request, res: Response) => {
  try {
    const fees = await prisma.shipping.findMany({
      select: {
        id: true,
        city: true,
        cityOtherName: true,
        fee: true
      }
    });
    res.json(fees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/shipping/zones/:cityId — return zones for a gov
router.get('/zones/:cityId', async (req: Request, res: Response) => {
  try {
    const cityId = req.params.cityId as string;
    
    const gov = await prisma.shipping.findFirst({
      where: {
        OR: [
          { id: cityId },
          { city: cityId },
          { cityOtherName: cityId }
        ]
      },
      select: { zones: true }
    });

    if (!gov) return res.status(404).json({ error: 'Governorate not found' });
    res.json(gov.zones || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get raw DB objects
router.get('/list', async (req: Request, res: Response) => {
  try {
    const fees = await prisma.shipping.findMany({
      orderBy: { city: 'asc' }
    });
    res.json(fees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Update fee and zones
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { fee, zones } = req.body;
    const updateData: any = {};
    if (fee !== undefined) updateData.fee = fee;
    if (zones !== undefined) updateData.zones = zones;

    const shipping = await prisma.shipping.update({
      where: { id: String(req.params.id) },
      data: updateData
    });
    res.json(shipping);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Admin: Add new city
router.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const shipping = await prisma.shipping.create({
      data: {
        city: data.city,
        cityOtherName: data.cityOtherName || null,
        bostaCityId: data.bostaCityId || null,
        fee: data.fee || 0,
        zones: data.zones || []
      }
    });
    res.status(201).json(shipping);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Admin: Delete city
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.shipping.delete({
      where: { id: String(req.params.id) }
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Bulk update all to a single fee
router.post('/bulk-update', async (req: Request, res: Response) => {
  try {
    const { fee } = req.body;
    if (fee == null || isNaN(fee)) return res.status(400).json({ error: 'Valid fee is required' });

    await prisma.shipping.updateMany({
      data: { fee: Number(fee) }
    });
    res.json({ success: true, message: 'All shipping fees updated' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
