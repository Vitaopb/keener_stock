import { prisma } from '../../Database/database';

export class OutputProductsController {

  async register(req, res) {
    const { price, productId, quantity } = req.body;
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) 
      return res.status(404).json({ message: 'User not found' });

    const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
    if (!product)
      return res.status(404).json({ message: 'Product not found' });
    
    const output = await prisma.output_Product.create({
      data: {
        price,
        productId,
        quantity,
      },
      include: {
        product: {
          select: {
            name: true
          }
        }
      }
    })
    return res.status(201).json(output);
  } 

  async listAllProduct(req, res) {
    const { id, productId } = req.params;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user)
      return res.status(404).json({ message: 'User not found' });
    
    const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
    if (!product)
      return res.status(404).json({ message: 'Product not found' });
    
    const listAll = await prisma.output_Product.findMany({
      where: { productId: Number(productId) },
      include: {
        product: {
          select: {
            name: true
          }
        }
      }
    });
    return res.status(201).json(listAll);
  }

  async listAll(req, res) {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user)
      return res.status(404).json({ message: 'User not found' });
    
    const listAll = await prisma.output_Product.findMany({
      where: { userId: Number(id) },
      include: {
        product: {
          select: {
            name: true
          }
        }
      }
    });
  }
}




