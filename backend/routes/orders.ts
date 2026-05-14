import express, { Request, Response } from 'express';
import prisma from '../config/db';

const router = express.Router();

// GET all orders
router.get('/', async (req: Request, res: Response) => {
  try {
    const { archived } = req.query;
    
    const where: any = {};
    if (archived === 'true') {
      where.archived = true;
    } else if (archived === 'false') {
      where.archived = false;
    }

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET single order
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.findUnique({
      where: { orderId: String(req.params.id) }
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create order
router.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    // Generate a simple Order ID for now (in production you'd use a sequence/counter)
    const orderId = `Order-${Math.floor(Math.random() * 100000)}`;

    const order = await prisma.order.create({
      data: {
        orderId,
        customerName: data.customer?.name || '',
        customerPhone: data.customer?.phone || '',
        customerSecondPhone: data.customer?.secondPhone || '',
        customerAddress: data.customer?.address || '',
        customerGov: data.customer?.government || '',
        customerZone: data.customer?.zone || '',
        customerNotes: data.customer?.notes || '',
        
        items: data.items || [],
        
        discount: data.discount || 0,
        totalPrice: data.totalPrice || 0,
        shippingFee: data.shippingFee || 0,
        paymentMethod: data.paymentMethod || 'cash',
        paid: data.paid || false,
        paidAmount: data.paidAmount || 0,
        status: data.status || 'pending',
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
