"use client";

import { useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]); // Mock empty cart initially

  return (
    <div className="container" style={{ paddingBottom: "60px" }}>
      <h1 className="page-title">سلة التسوق</h1>
      <p className="page-subtitle" id="cart-subtitle">راجع منتجاتك قبل إتمام الشراء</p>

      {items.length === 0 ? (
        <div id="cart-empty" style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🛒</div>
          <h3 style={{ marginBottom: "6px" }}>سلة التسوق فارغة</h3>
          <p className="text-muted" style={{ marginBottom: "16px" }}>ابدأ التسوق لإضافة منتجات</p>
          <Link href="/products" className="btn btn-primary">تصفح المنتجات</Link>
        </div>
      ) : (
        <div id="cart-items" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Cart items map will go here */}
          {items.map((item, idx) => (
            <div key={idx} className="cart-item">
              <img className="cart-item-img" src={item.imageUrl} alt={item.name} />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-options">{item.selectedOptions}</div>
                <div className="cart-item-price">{item.unitPrice} للوحدة</div>
              </div>
              <div className="cart-item-actions">
                <div className="qty-control">
                  <button className="qty-btn">−</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button className="qty-btn">+</button>
                </div>
                <strong>{item.unitPrice * item.quantity} ج.م</strong>
                <button className="btn btn-danger btn-sm">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div id="cart-footer" className="mt-24" style={{ maxWidth: "400px", marginRight: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.15rem", fontWeight: 700, padding: "16px 0", borderTop: "1px solid #eee" }}>
            <span>المجموع</span>
            <span id="cart-total">0 ج.م</span>
          </div>
          <Link href="/checkout" className="btn btn-primary btn-block" style={{ padding: "14px", fontSize: "1rem", background: "var(--primary)", borderColor: "var(--primary)" }}>
            إتمام الشراء ←
          </Link>
        </div>
      )}
    </div>
  );
}
