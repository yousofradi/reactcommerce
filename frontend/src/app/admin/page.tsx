"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [productsData, ordersData] = await Promise.all([
          api.getProducts(1, 1), // Just to get total
          api.getOrders()
        ]);
        
        const productsCount = productsData.total || 0;
        const ordersCount = ordersData.length || 0;
        const revenue = ordersData.reduce((acc: number, order: any) => acc + (order.paidAmount || 0), 0);
        
        setStats({
          products: productsCount,
          orders: ordersCount,
          revenue: revenue,
        });
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  const formatPrice = (p: number) => `${Number(p || 0).toLocaleString('ar-EG')} ج.م`;

  return (
    <div style={{ maxWidth: "1000px" }}>
      <h1 className="page-title">لوحة التحكم</h1>
      <p className="page-subtitle">نظرة عامة على أداء متجرك</p>

      <div className="grid grid-3 mb-24" id="stats">
        <div className="admin-card text-center">
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--primary)" }}>
            {isLoading ? "—" : stats.products}
          </div>
          <div className="text-muted mt-8">المنتجات</div>
        </div>
        <div className="admin-card text-center">
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--primary)" }}>
            {isLoading ? "—" : stats.orders}
          </div>
          <div className="text-muted mt-8">الطلبات</div>
        </div>
        <div className="admin-card text-center">
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--success)" }}>
            {isLoading ? "—" : formatPrice(stats.revenue)}
          </div>
          <div className="text-muted mt-8">الإيرادات</div>
        </div>
      </div>

      <div className="grid grid-2">
        <Link href="/admin/products" className="admin-card" style={{ display: "block", textDecoration: "none", transition: "box-shadow .2s" }}>
          <h3 style={{ marginBottom: "8px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: "middle" }}>
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>{" "}
            إدارة المنتجات
          </h3>
          <p className="text-muted">إضافة وتعديل وحذف منتجاتك</p>
        </Link>
        <Link href="/admin/orders" className="admin-card" style={{ display: "block", textDecoration: "none", transition: "box-shadow .2s" }}>
          <h3 style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            إدارة الطلبات
          </h3>
          <p className="text-muted">متابعة ومعالجة طلبات العملاء</p>
        </Link>
        <Link href="/admin/shipment" className="admin-card" style={{ display: "block", textDecoration: "none", transition: "box-shadow .2s" }}>
          <h3 style={{ marginBottom: "8px" }}>🚚 رسوم الشحن</h3>
          <p className="text-muted">إدارة تكاليف الشحن لكل محافظة</p>
        </Link>
        <Link href="/admin/order-form" className="admin-card" style={{ display: "block", textDecoration: "none", transition: "box-shadow .2s", borderColor: "var(--primary)", background: "var(--primary-light)" }}>
          <h3 style={{ marginBottom: "8px", color: "var(--primary)" }}>➕ إنشاء طلب جديد</h3>
          <p className="text-muted">إضافة طلب يدوي من لوحة التحكم</p>
        </Link>
      </div>
    </div>
  );
}
