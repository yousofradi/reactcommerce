"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getProducts(1, 50, false);
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="container py-24">
      <h1 className="page-title text-center mb-40">كل المنتجات</h1>
      
      {isLoading ? (
        <div className="text-center py-80"><div className="spinner"></div></div>
      ) : products.length === 0 ? (
        <div className="text-center py-80 text-muted">لا توجد منتجات حالياً</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img 
                  src={product.images?.[0] || product.imageUrl || "/placeholder.png"} 
                  alt={product.name} 
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  {product.salePrice ? (
                    <>
                      <span className="price-new">{product.salePrice} ج.م</span>
                      <span className="price-old">{product.basePrice} ج.م</span>
                    </>
                  ) : (
                    <span>{product.basePrice} ج.م</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
