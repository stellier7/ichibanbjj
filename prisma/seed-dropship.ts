import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding dropship products...');

  const dropshipProducts = [
    {
      name: 'Rashguard Ichiban - Logo Premium',
      description:
        'Rashguard de alta calidad con el logo de Ichiban. Perfecto para entrenamientos de BJJ, MMA, o grappling. Fabricado con material de compresión que absorbe la humedad y proporciona máxima movilidad. Diseño sublimado que no se desvanece.\n\n' +
        '✓ Logo Ichiban premium\n' +
        '✓ Material de secado rápido\n' +
        '✓ Protección UV\n' +
        '✓ Costuras reforzadas\n' +
        '✓ Ajuste de compresión',
      price: 1200.0, // HNL (~$48 USD)
      category: 'Rashguard',
      images: [
        'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800',
        'https://images.unsplash.com/photo-1580894908361-967195033215?w=800',
      ],
      stock: 0,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      active: true,
      isDropship: true,
      supplierName: 'China Sports Apparel Co.',
      supplierProductId: 'RASH-ICH-001',
      fulfillmentNotes:
        'Este producto se fabrica bajo pedido con el logo Ichiban. El tiempo de producción es de 7-10 días más el tiempo de envío internacional.',
      estimatedShippingDays: 15,
    },
    {
      name: 'Shorts Ichiban - Fight Shorts',
      description:
        'Shorts de entrenamiento profesional con el logo de Ichiban. Ideales para BJJ, MMA, Muay Thai y entrenamiento funcional. Diseño ligero y flexible con cintura elástica y cordón ajustable.\n\n' +
        '✓ Logo Ichiban bordado\n' +
        '✓ Material ligero y resistente\n' +
        '✓ Ranuras laterales para movilidad\n' +
        '✓ Velcro y cordón de seguridad\n' +
        '✓ Secado rápido',
      price: 950.0, // HNL (~$38 USD)
      category: 'Shorts',
      images: [
        'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
        'https://images.unsplash.com/photo-1598032895397-f0df2e752611?w=800',
      ],
      stock: 0,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      active: true,
      isDropship: true,
      supplierName: 'China Sports Apparel Co.',
      supplierProductId: 'SHORT-ICH-001',
      fulfillmentNotes:
        'Fabricado bajo pedido con logo Ichiban. Tiempo de producción 7-10 días más envío.',
      estimatedShippingDays: 15,
    },
    {
      name: 'Combo Ichiban - Rashguard + Shorts',
      description:
        '¡COMBO ESPECIAL! Ahorra comprando el set completo de Rashguard + Shorts con el logo de Ichiban. El combo perfecto para tu entrenamiento.\n\n' +
        'INCLUYE:\n' +
        '• 1 Rashguard Ichiban (Logo Premium)\n' +
        '• 1 Shorts Ichiban (Fight Shorts)\n' +
        '• Bolsa de transporte GRATIS\n\n' +
        '✓ Ahorra 300 Lempiras vs compra individual\n' +
        '✓ Diseño coordinado\n' +
        '✓ Ambas piezas con logo Ichiban\n' +
        '✓ Material de alta calidad\n' +
        '✓ Ideal para competencias',
      price: 1850.0, // HNL (~$75 USD) - discounted from 2150
      category: 'Combo',
      images: [
        'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800',
        'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800',
        'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
      ],
      stock: 0,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      active: true,
      isDropship: true,
      supplierName: 'China Sports Apparel Co.',
      supplierProductId: 'COMBO-ICH-001',
      fulfillmentNotes:
        'Set completo fabricado bajo pedido. Incluye rashguard y shorts con logo Ichiban más bolsa de regalo. Tiempo de producción 7-10 días más envío.',
      estimatedShippingDays: 15,
    },
    {
      name: 'Gi Ichiban - Kimono Completo BJJ',
      description:
        'Kimono (Gi) completo de Brazilian Jiu-Jitsu con el logo de Ichiban bordado. Fabricado con algodón pearl weave de 450 GSM para máxima durabilidad. Incluye chaqueta, pantalón y cinturón blanco.\n\n' +
        'INCLUYE:\n' +
        '• Chaqueta (Kimono top) con logo Ichiban\n' +
        '• Pantalón con cordón\n' +
        '• Cinturón blanco\n' +
        '• Bolsa de transporte\n\n' +
        '✓ Logo Ichiban bordado en pecho y hombros\n' +
        '✓ Material Pearl Weave 450 GSM\n' +
        '✓ Pre-encogido\n' +
        '✓ Costuras reforzadas triple costura\n' +
        '✓ Cumple regulaciones IBJJF\n' +
        '✓ Color: Blanco/Negro/Azul disponible',
      price: 2800.0, // HNL (~$113 USD)
      category: 'Gi',
      images: [
        'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800',
        'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      ],
      stock: 0,
      sizes: ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'],
      active: true,
      isDropship: true,
      supplierName: 'China Sports Apparel Co.',
      supplierProductId: 'GI-ICH-001',
      fulfillmentNotes:
        'Gi completo fabricado bajo pedido con logo Ichiban bordado. Tiempo de producción 10-14 días más envío internacional. Especificar color en notas del pedido (Blanco, Negro o Azul).',
      estimatedShippingDays: 18,
    },
  ];

  for (const product of dropshipProducts) {
    const created = await prisma.product.upsert({
      where: {
        id: 'dropship-' + product.supplierProductId,
      },
      update: product,
      create: {
        id: 'dropship-' + product.supplierProductId,
        ...product,
      },
    });
    console.log(`✓ Created/Updated: ${created.name}`);
  }

  console.log('✓ Dropship products seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding dropship products:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
