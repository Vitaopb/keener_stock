import { prisma } from '../../database';

export class CreateMovementController {
  async handle(req, res) {
    try {
      const { type, price, serialNumber, quantity, productId } = req.body;
      const { userId } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
      let movement = await prisma.movement.findUnique({ where: { serialNumber } });
      
      if(!['entry', 'exit'].includes(type)) {
        return res.status(400).json({
           error: 'Invalid type',
           type: 'entry or exit'
        });
      }

      if (movement) 
        return res.status(400).json({ error: 'Invalid serial number' });
      
      if (!product || !user) {
        const missedArgument = !product ? 'product not found' : 'user not found';
        return res.status(404).json({ message: missedArgument });
      }


      movement = await prisma.movement.create({
        data: {
          type,
          price,
          quantity,
          serialNumber,
          productId: product.id,
          userId: user.id
        },
        include: {
          product: {
            select: { name: true },
          },
          user: {
            select: { name: true },
          }
        }
      });
      
      return res.status(200).json({ message: 'Moviment created', movement });
    } catch (error) {
      console.log(error);
    }
  }
}