import { prisma } from '../../database';

export class ListAllMovementsController {
  async handle(req, res) {
    try {
      const { userId } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
  
      if (!user) {
        const missedArgument = !product ? 'product not found' : '';
        return res.status(404).json({ message: 'user not found' });
      }
  
      const movement = await prisma.movement.findMany({ 
        where: { userId: user.id },
        include: {
          product: {
            select: { name: true },
          },
          user: { select: { name: true } }
        }
      });
      return res.status(200).json(movement);
    } catch (error) {
      console.log(error);
    }
  }
}