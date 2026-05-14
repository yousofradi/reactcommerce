"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminProductFormPage() {
  const [activeTab, setActiveTab] = useState("general");
  
  return (
    <div style={{ maxWidth: "1000px" }}>
      <div className="flex-between mb-24">
        <h1 className="page-title" style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/admin/products" style={{ fontSize: "1.1rem", color: "var(--text-main)", textDecoration: "none", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
            المنتجات
          </Link>
        </h1>
        <button type="button" className="btn btn-primary" style={{ padding: "10px 24px", borderRadius: "12px", fontWeight: 700, boxShadow: "var(--shadow-md)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px" }}>
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          حفظ المنتج
        </button>
      </div>

      <div className="order-create-layout" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", alignItems: "start" }}>
        {/* LEFT COLUMN: Main info */}
        <div>
          <div className="info-card mb-24" style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", marginBottom: "24px", overflow: "hidden" }}>
            <div className="info-card-body" style={{ padding: "20px" }}>
              <div className="form-group">
                <label className="form-label">الاسم الكامل *</label>
                <input type="text" className="form-control" placeholder="مثال: تيشرت قطني أسود" required />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">الوصف</label>
                <textarea className="form-control" rows={5} placeholder="وصف تفصيلي للمنتج..."></textarea>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="info-card mb-24" style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", marginBottom: "24px", overflow: "hidden" }}>
            <div className="info-card-header" style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", background: "#fafafa" }}>
              <h3 style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 600 }}>الصور</h3>
            </div>
            <div className="info-card-body" style={{ padding: "20px" }}>
              <div style={{ padding: "40px", border: "2px dashed var(--border-color)", borderRadius: "var(--radius-lg)", textAlign: "center", cursor: "pointer", background: "var(--bg-body)" }}>
                <div style={{ fontSize: "2rem", color: "var(--primary)", marginBottom: "10px" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div style={{ fontWeight: 600, color: "var(--text-main)", marginBottom: "4px" }}>أضف صور للمنتج</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>يمكنك رفع صور أو اختيار من المعرض</div>
              </div>
              
              <div className="images-list" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginTop: "16px" }}>
                {/* Images will populate here */}
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="info-card mb-24" style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", marginBottom: "24px", overflow: "hidden" }}>
            <div className="info-card-header" style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", background: "#fafafa", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 600 }}>الخيارات (المقاسات، الألوان...)</h3>
            </div>
            <div className="info-card-body" style={{ padding: "20px" }}>
              <button type="button" className="btn btn-secondary" style={{ width: "100%", borderStyle: "dashed" }}>
                + إضافة خيار
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Organization & Pricing */}
        <div>
          {/* Status */}
          <div className="info-card mb-24" style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", marginBottom: "24px", overflow: "hidden" }}>
            <div className="info-card-header" style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", background: "#fafafa" }}>
              <h3 style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 600 }}>الحالة</h3>
            </div>
            <div className="info-card-body" style={{ padding: "20px" }}>
              <select className="form-control">
                <option value="active">نشط</option>
                <option value="draft">مسودة</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="info-card mb-24" style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", marginBottom: "24px", overflow: "hidden" }}>
            <div className="info-card-header" style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", background: "#fafafa" }}>
              <h3 style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 600 }}>التسعير</h3>
            </div>
            <div className="info-card-body" style={{ padding: "20px" }}>
              <div className="form-group">
                <label className="form-label">السعر *</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                  <input type="number" className="form-control" placeholder="0.00" style={{ border: "none", borderRadius: 0 }} />
                  <span style={{ padding: "0 12px", background: "var(--bg-body)", color: "var(--text-muted)", borderRight: "1px solid var(--border-color)", fontSize: "0.9rem" }}>ج.م</span>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">السعر قبل الخصم (اختياري)</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                  <input type="number" className="form-control" placeholder="0.00" style={{ border: "none", borderRadius: 0 }} />
                  <span style={{ padding: "0 12px", background: "var(--bg-body)", color: "var(--text-muted)", borderRight: "1px solid var(--border-color)", fontSize: "0.9rem" }}>ج.م</span>
                </div>
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="info-card mb-24" style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", marginBottom: "24px", overflow: "hidden" }}>
            <div className="info-card-header" style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", background: "#fafafa" }}>
              <h3 style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 600 }}>التنظيم</h3>
            </div>
            <div className="info-card-body" style={{ padding: "20px" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">المجموعات</label>
                <div className="select-box" style={{ minHeight: "44px", padding: "6px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-surface)" }}>
                  <input type="text" placeholder="ابحث عن مجموعات..." style={{ border: "none", outline: "none", background: "transparent", fontSize: "0.95rem", flex: 1, minWidth: "100px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
