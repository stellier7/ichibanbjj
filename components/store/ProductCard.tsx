'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart, Truck } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <Link href={`/store/${product.id}`}>
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          {product.isDropship && (
            <div className="absolute top-2 right-2 z-10 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
              <Truck className="h-3 w-3" />
              Dropship
            </div>
          )}
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/store/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">
            {formatCurrency(Number(product.price), 'HNL')}
          </span>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Agregar
          </Button>
        </div>
        
        {product.stock > 0 ? (
          <p className="text-xs text-gray-500 mt-2">Stock: {product.stock}</p>
        ) : product.isDropship ? (
          <p className="text-xs text-blue-600 mt-2">
            Envío: {product.estimatedShippingDays || 15}-{(product.estimatedShippingDays || 15) + 10} días
          </p>
        ) : (
          <p className="text-xs text-red-500 mt-2">Agotado</p>
        )}
      </div>
    </div>
  );
}
