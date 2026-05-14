import express, { Request, Response } from 'express';
import prisma from '../config/db';

const router = express.Router();

// GET all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const { admin, search, page, limit, collectionId, variable } = req.query;
    
    // Pagination
    const take = limit ? parseInt(limit as string) : undefined;
    const skip = page && take ? (parseInt(page as string) - 1) * take : undefined;

    // Filters
    const where: any = {};
    if (admin !== 'true') {
      where.active = true;
      where.status = 'active';
    }
    if (search) {
      where.name = { contains: search as string, mode: 'insensitive' };
    }
    if (collectionId) {
      where.OR = [
        { primaryCollectionId: collectionId as string },
        { collections: { some: { id: collectionId as string } } }
      ];
    }
    if (variable === 'true') {
      where.AND = [
        ...(where.AND || []),
        {
          OR: [
            { NOT: { variants: { equals: [] } } },
            { NOT: { options: { equals: [] } } }
          ]
        }
      ];
    }

    const products = await prisma.product.findMany({
      where,
      take,
      skip,
      orderBy: { sortOrder: 'asc' },
    });

    const total = await prisma.product.count({ where });

    if (page || limit) {
      res.json({
        products,
        total,
        page: parseInt(page as string) || 1,
        pages: take ? Math.ceil(total / take) : 1
      });
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET single product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: String(req.params.id) }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET single product by handle
router.get('/handle/:handle', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { handle: String(req.params.handle) }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by handle:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create product
router.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    // Convert related IDs if needed, but for now just raw creation
    const product = await prisma.product.create({
      data: {
        name: data.name,
        handle: data.handle || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        basePrice: data.basePrice,
        salePrice: data.salePrice || null,
        imageUrl: data.imageUrl || null,
        images: data.images || [],
        description: data.description || '',
        primaryCollectionId: data.collectionId || null,
        options: data.options || [],
        variants: data.variants || [],
        quantity: data.quantity || null,
        sortOrder: data.sortOrder || 0,
        active: data.active !== false,
        status: data.status || 'active'
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
