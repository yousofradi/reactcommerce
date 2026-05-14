"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="container">
      <div className="breadcrumbs" id="breadcrumb-container" style={{ display: isLoading ? "none" : "block" }}>
        <Link href="/">الرئيسية</Link>
        <span>›</span>
        <span id="breadcrumb-name">المنتج</span>
      </div>

      {isLoading ? (
        <div id="product-loading">
          <div className="skeleton skeleton-breadcrumb"></div>
          <div className="product-detail-layout">
            <div>
              <div className="skeleton skeleton-img"></div>
              <div className="product-gallery-thumbs" style={{ marginTop: "12px" }}>
                <div className="skeleton skeleton-thumb"></div>
                <div className="skeleton skeleton-thumb"></div>
                <div className="skeleton skeleton-thumb"></div>
                <div className="skeleton skeleton-thumb"></div>
              </div>
            </div>
            <div className="product-detail-info">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-price"></div>
              <div className="skeleton skeleton-desc"></div>
              <div className="product-purchase-row">
                <div className="skeleton" style={{ width: "120px", height: "48px", borderRadius: "12px" }}></div>
                <div className="skeleton skeleton-btn"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="product-detail">
          {/* Real product details will go here */}
        </div>
      )}

      <div id="related-products-container" className="hidden" style={{ paddingTop: "40px", borderTop: "1px solid #e2e8f0", marginTop: "40px" }}>
        <h2 className="home-section-title">منتجات مشابهة</h2>
        <div className="products-grid" id="related-products-grid" style={{ "--cols": 5 } as any}></div>
      </div>
    </div>
  );
}
