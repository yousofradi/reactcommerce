"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function AdminProductsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isBulkModalOpen, setBulkModalOpen] = useState(false);
  const [isBulkMenuOpen, setBulkMenuOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1
  });

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await api.getProducts(
        pagination.page,
        pagination.limit,
        true,
        "",
        search,
        filter === "variable" ? "true" : ""
      );
      setProducts(data.products || []);
      setPagination(prev => ({ ...prev, total: data.total, pages: data.pages }));
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [pagination.page, pagination.limit, filter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    loadProducts();
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length && products.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const bulkAction = async (action: string) => {
    if (!selectedIds.length) return;
    setBulkMenuOpen(false);
    try {
      if (action === 'delete') {
        if (confirm(`هل أنت متأكد من حذف ${selectedIds.length} منتج؟`)) {
          await api.deleteProductsBatch(selectedIds);
          setSelectedIds([]);
          loadProducts();
        }
      } else {
        alert("سيتم تفعيل هذا الإجراء قريباً");
      }
    } catch (err) {
      alert("فشل تنفيذ الإجراء");
    }
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div className="flex-between mb-24">
        <div>
          <h1 className="page-title" style={{ marginBottom: "4px" }}>المنتجات</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>إدارة منتجات متجرك</p>
        </div>
        <div className="flex gap-12">
          <button className="btn btn-secondary" onClick={() => setBulkModalOpen(true)}>+ إضافة عدة منتجات</button>
          <Link href="/admin/product-form" className="btn btn-primary">+ إضافة منتج</Link>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
        {!selectedIds.length ? (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #f1f5f9", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }} className="order-tabs">
              <span
                className={`order-tab ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                الجميع <span className="tab-badge">{pagination.total}</span>
              </span>
              <span
                className={`order-tab ${filter === "variable" ? "active" : ""}`}
                onClick={() => setFilter("variable")}
              >
                متعدد <span className="tab-badge">0</span>
              </span>
            </div>

            <div style={{ position: "relative", width: "300px", maxWidth: "100%" }}>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="البحث في المنتجات"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: "40px" }}
                />
              </form>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              </span>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #f1f5f9", background: "#fff", gap: "12px" }}>
            <button
              className="btn btn-primary"
              onClick={() => setSelectedIds([])}
              style={{ borderRadius: "20px", padding: "8px 16px", border: "none", background: "var(--primary)", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}
            >
              تم تحديد <span id="selected-count-badge">{selectedIds.length}</span>
              <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: "4px", width: "18px", height: "18px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>-</span>
            </button>
            <div style={{ position: "relative" }}>
              <button
                className="btn btn-secondary"
                onClick={() => setBulkMenuOpen(!isBulkMenuOpen)}
                style={{ borderRadius: "20px", padding: "8px 16px", border: "1px solid #e2e8f0", background: "#fff", color: "#475569", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}
              >
                إجراءات
                <span style={{ fontSize: "0.8rem", marginTop: "2px" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg></span>
              </button>
              {isBulkMenuOpen && (
                <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "8px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 10px 25px -3px rgba(0,0,0,0.15)", width: "220px", zIndex: 100, overflow: "hidden", padding: "6px" }}>
                  <button onClick={() => bulkAction('active')} style={{ width: "100%", textAlign: "right", padding: "12px 14px", background: "none", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "0.95rem", fontFamily: "inherit" }}>
                    اجعله نشط
                  </button>
                  <button onClick={() => bulkAction('draft')} style={{ width: "100%", textAlign: "right", padding: "12px 14px", background: "none", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "0.95rem", fontFamily: "inherit" }}>
                    اجعله غير نشط
                  </button>
                  <div style={{ height: "1px", background: "#e2e8f0", margin: "4px 0" }}></div>
                  <button onClick={() => bulkAction('delete')} style={{ width: "100%", textAlign: "right", padding: "12px 14px", background: "none", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", color: "#ef4444", fontSize: "0.95rem", fontFamily: "inherit", fontWeight: 600 }}>
                    حذف المنتجات
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
          <table className="products-table">
            <thead>
              <tr>
                <th style={{ width: "40px" }}>
                  <input
                    type="checkbox"
                    checked={selectedIds.length === products.length && products.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
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
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                      />
                    </td>
                    <td>
                      <img
                        src={product.imageUrl || (product.images && product.images[0]) || "/placeholder.png"}
                        alt=""
                        style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }}
                      />
                    </td>
                    <td>
                      <Link href={`/admin/product-form?id=${product.id}`} style={{ fontWeight: 600, color: "#1e293b", textDecoration: "none" }}>
                        {product.name}
                      </Link>
                    </td>
                    <td>{product.salePrice ? product.salePrice : product.basePrice} ج.م</td>
                    <td>
                      <span className={`status-badge ${product.active ? "success" : "neutral"}`}>
                        {product.active ? "نشط" : "مسودة"}
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
                disabled={pagination.page <= 1}
                onClick={() => setPagination(p => ({ ...p, page: Math.max(1, p.page - 1) }))}
              >
                السابق
              </button>
              <select
                className="form-control"
                style={{ width: "auto", height: "32px", padding: "0 8px" }}
                value={pagination.page}
                onChange={(e) => setPagination(p => ({ ...p, page: Number(e.target.value) }))}
              >
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <button
                className="btn btn-secondary btn-sm"
                disabled={pagination.page >= pagination.pages}
                onClick={() => setPagination(p => ({ ...p, page: Math.min(pagination.pages, p.page + 1) }))}
              >
                التالي
              </button>
            </div>
          </div>
        </div>
      </div>

      {isBulkModalOpen && (
        <div className="modal-overlay open">
          <div className="modal-box" style={{ maxWidth: "520px" }}>
            <div className="modal-header">
              <h3 className="modal-title">استيراد منتجات</h3>
              <button className="modal-close" onClick={() => setBulkModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <input type="file" className="form-control" />
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
