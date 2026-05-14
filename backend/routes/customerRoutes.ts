import express, { Request, Response } from 'express';
import prisma from '../config/db';
// import adminAuth from '../middleware/adminAuth'; // TODO: Implement admin auth

const router = express.Router();

// GET /api/customers — List all unique customers with stats
router.get('/', async (req: Request, res: Response) => {
  try {
    const customers = await prisma.$queryRaw`
      SELECT 
        "customerPhone" as phone,
        MAX("customerName") as name,
        MAX("customerSecondPhone") as "secondPhone",
        MAX("customerGov") as government,
        MAX("customerAddress") as address,
        SUM("paidAmount") as "totalSpent",
        COUNT(*)::int as "orderCount",
        MAX("createdAt") as "lastOrderDate",
        MIN("createdAt") as "firstOrderDate"
      FROM "Order"
      GROUP BY "customerPhone"
      ORDER BY "lastOrderDate" DESC
    `;
    res.json(customers);
  } catch (err: any) {
    console.error('Fetch customers error:', err);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// GET /api/customers/:phone — Specific customer profile & history
router.get('/:phone', async (req: Request, res: Response) => {
  try {
    const phone = String(req.params.phone);
    
    // Get stats
    const statsArr: any[] = await prisma.$queryRaw`
      SELECT 
        "customerPhone" as phone,
        MAX("customerName") as name,
        MAX("customerSecondPhone") as "secondPhone",
        MAX("customerGov") as government,
        MAX("customerAddress") as address,
        MAX("customerNotes") as notes,
        SUM("paidAmount") as "totalSpent",
        COUNT(*)::int as "orderCount",
        MAX("createdAt") as "lastOrderDate",
        MIN("createdAt") as "firstOrderDate"
      FROM "Order"
      WHERE "customerPhone" = ${phone}
      GROUP BY "customerPhone"
    `;

    if (!statsArr || statsArr.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const customer = statsArr[0];

    // Get order history
    const orders = await prisma.order.findMany({
      where: { customerPhone: phone },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ customer, orders });
  } catch (err: any) {
    console.error('Fetch customer detail error:', err);
    res.status(500).json({ error: 'Failed to fetch customer details' });
  }
});

export default router;
