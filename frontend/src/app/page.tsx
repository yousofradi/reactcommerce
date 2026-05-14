"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, collectionsData] = await Promise.all([
          api.getProducts(1, 10, false), // public products
          api.getCollections()
        ]);
        
        setProducts(productsRes.products || []);
        setCollections(collectionsData || []);
      } catch (err) {
        console.error("Failed to load storefront data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <div id="home-content">
        {loading ? (
          <>
            {/* Optimized Skeleton Loader matching original style */}
            <div className="skeleton-section" style={{ marginBottom: "40px" }}>
              <div className="skeleton skeleton-title" style={{ width: "160px", marginBottom: "24px" }}></div>
              <div className="products-grid" style={{ "--cols": 2 } as React.CSSProperties}>
                {[1, 2].map((i) => (
                  <div key={i} className="store-product-card" style={{ border: "none", boxShadow: "none" }}>
                    <div className="skeleton" style={{ width: "100%", height: "280px", borderRadius: "12px" }}></div>
                    <div style={{ padding: "16px 0" }}>
                      <div className="skeleton skeleton-text" style={{ width: "80%" }}></div>
                      <div className="skeleton skeleton-text" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="skeleton-section">
              <div className="skeleton skeleton-title" style={{ width: "120px", marginBottom: "24px" }}></div>
              <div className="cat-grid">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton" style={{ aspectRatio: "1/1", borderRadius: "12px" }}></div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            {/* Collections Section */}
            {collections.length > 0 && (
              <div className="home-section">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h2 className="home-section-title" style={{ margin: 0 }}>تسوق حسب القسم</h2>
                  <Link href="/products" className="view-all-link">عرض الكل</Link>
                </div>
                <div className="cat-grid">
                  {collections.map((col: any) => (
                    <Link href={`/products?collection=${col.id}`} key={col.id} className="cat-card">
                      <div className="cat-img-wrapper">
                        <img 
                          src={col.imageUrl || "/placeholder.png"} 
                          alt={col.name} 
                          className="cat-img"
                        />
                      </div>
                      <h3 className="cat-title">{col.name}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Products Section */}
            {products.length > 0 && (
              <div className="home-section" style={{ marginTop: "40px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h2 className="home-section-title" style={{ margin: 0 }}>وصل حديثاً</h2>
                  <Link href="/products" className="view-all-link">عرض الكل</Link>
                </div>
                <div className="products-grid" style={{ "--cols": 2 } as React.CSSProperties}>
                  {products.map((product: any) => (
                    <div key={product.id} className="store-product-card">
                      <Link href={`/product/${product.handle || product.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                        <div className="product-img" style={{ backgroundImage: `url(${product.images?.[0] || '/placeholder.png'})` }}></div>
                        <div className="product-info">
                          <h3 className="product-title">{product.name}</h3>
                          <div className="product-price">{product.price} ج.م</div>
                        </div>
                      </Link>
                      <div className="product-info" style={{ paddingTop: 0 }}>
                        <button className="btn btn-primary btn-block">أضف للسلة</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
