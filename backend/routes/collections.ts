import express, { Request, Response } from 'express';
import prisma from '../config/db';
// import adminAuth from '../middleware/adminAuth'; // TODO: Implement admin auth

const router = express.Router();

// ── Caching ──────────────────────────────────────────────
let collectionCache: any = null;
let cacheTime = 0;
const CACHE_DURATION = 30 * 1000; // 30 seconds

function clearCache() {
  collectionCache = null;
  cacheTime = 0;
}

export { router, clearCache };

router.get('/', async (req: Request, res: Response) => {
  try {
    const { admin } = req.query;
    if (admin !== 'true' && collectionCache && (Date.now() - cacheTime < CACHE_DURATION)) {
      return res.json(collectionCache);
    }
    
    const collections = await prisma.collection.findMany({
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    if (admin !== 'true') {
      collectionCache = collections;
      cacheTime = Date.now();
    }

    res.json(collections);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    let collection;
    
    // Check if ID looks like a UUID (Prisma's default) or just fallback to urlName search
    // We'll search both
    collection = await prisma.collection.findFirst({
      where: {
        OR: [
          { id: id },
          { urlName: id }
        ]
      }
    });

    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    res.json(collection);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin only routes
router.post('/delete/batch', async (req: Request, res: Response) => {
  try {
    const { collectionIds } = req.body;
    if (!Array.isArray(collectionIds)) return res.status(400).json({ error: 'collectionIds must be an array' });
    
    await prisma.collection.deleteMany({
      where: { id: { in: collectionIds } }
    });
    
    clearCache();
    res.json({ message: 'Collections deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const collection = await prisma.collection.create({
      data: {
        name: data.name,
        urlName: data.urlName || null,
        description: data.description || '',
        imageUrl: data.imageUrl || '',
        sortOrder: data.sortOrder || 0
      }
    });
    
    clearCache();
    res.status(201).json(collection);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const collection = await prisma.collection.update({
      where: { id: String(req.params.id) },
      data: {
        name: data.name,
        urlName: data.urlName,
        description: data.description,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder
      }
    });
    
    clearCache();
    res.json(collection);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.collection.delete({
      where: { id: String(req.params.id) }
    });
    
    clearCache();
    res.json({ message: 'Collection deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/reorder/batch', async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    if (!order || !Array.isArray(order)) {
      return res.status(400).json({ error: 'order array is required' });
    }
    
    // Prisma does not have bulkUpdate, so we use a transaction
    const ops = order.map(item => 
      prisma.collection.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder }
      })
    );
    
    await prisma.$transaction(ops);
    
    clearCache();
    res.json({ message: 'Collections reordered' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reorder collections' });
  }
});

export default router;
