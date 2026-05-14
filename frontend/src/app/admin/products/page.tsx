"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function AdminProductsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isBulkModalOpen, setBulkModalOpen] = useState(false);
  
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await api.getProducts(page, 20, true, "", search);
      setProducts(res.products || []);
      setTotalPages(res.totalPages || 1);
      setTotalProducts(res.total || 0);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div className="flex-between mb-24">
        <div>
          <h1 className="page-title">المنتجات</h1>
          <p className="page-subtitle">إدارة منتجات متجرك</p>
        </div>
        <div className="flex gap-12">
          <button className="btn btn-secondary" onClick={() => setBulkModalOpen(true)}>
            + إضافة عدة منتجات
          </button>
          <Link href="/admin/product-form" className="btn btn-primary">
            + إضافة منتج
          </Link>
        </div>
      </div>

      <div className="admin-card mb-24" style={{ padding: 0 }}>
        <div id="filter-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #f1f5f9", flexWrap: "wrap", gap: "16px" }}>
          <div className="order-tabs">
            <span
              className={`order-tab ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              الجميع <span className="tab-badge">{totalProducts}</span>
            </span>
            <span
              className={`order-tab ${filter === "variable" ? "active" : ""}`}
              onClick={() => setFilter("variable")}
            >
              متعدد <span className="tab-badge">0</span>
            </span>
          </div>

          <div style={{ position: "relative", width: "300px", maxWidth: "100%" }}>
            <input
              type="text"
              className="form-control"
              placeholder="البحث في المنتجات"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "40px" }}
            />
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </div>
        </div>

        <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
          <table className="products-table">
            <thead>
              <tr>
                <th style={{ width: "40px" }}><input type="checkbox" /></th>
                <th>الصورة</th>
                <th>الاسم</th>
                <th>السعر</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="text-center" style={{ padding: "40px 0" }}><div className="spinner"></div></td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={5} className="text-center" style={{ padding: "40px 0", color: "var(--text-muted)" }}>لا توجد منتجات</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td><input type="checkbox" /></td>
                    <td>
                      <img 
                        src={product.images && product.images[0] ? product.images[0] : "/placeholder.png"} 
                        alt={product.name} 
                        className="product-img-thumb"
                        style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover" }} 
                      />
                    </td>
                    <td>
                      <Link href={`/admin/product-form?id=${product.id}`} style={{ fontWeight: 600 }}>
                        {product.name}
                      </Link>
                    </td>
                    <td>{product.price} ج.م</td>
                    <td>
                      <span className={`badge ${product.isActive ? "badge-success" : "badge-warning"}`}>
                        {product.isActive ? "نشط" : "مسودة"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          <div className="pagination-bar">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button 
                className="btn btn-secondary btn-sm"
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                السابق
              </button>
              <select 
                className="form-control"
                style={{ width: "auto", height: "32px", padding: "0 8px" }}
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <button 
                className="btn btn-secondary btn-sm"
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                التالي
              </button>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span className="text-muted text-sm">أظهر</span>
              <select className="form-control" style={{ width: "auto", height: "32px", padding: "0 8px" }}>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span className="text-muted text-sm">المنتجات</span>
            </div>
          </div>
        </div>
      </div>

      {isBulkModalOpen && (
        <div className="modal-overlay open">
          <div className="modal-box" style={{ maxWidth: "520px" }}>
            <div className="modal-header">
              <h3 className="modal-title">استيراد منتجات من ملف CSV</h3>
              <button className="modal-close" onClick={() => setBulkModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <p className="text-muted text-sm mb-16">ارفع ملف CSV لاستيراد المنتجات.</p>
              <div className="form-group">
                <label className="form-label">ملف CSV</label>
                <input type="file" accept=".csv" className="form-control" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setBulkModalOpen(false)}>إلغاء</button>
              <button className="btn btn-primary">استيراد</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

