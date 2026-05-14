"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isBulkMenuOpen, setBulkMenuOpen] = useState(false);

  return (
    <div style={{ maxWidth: "1300px" }}>
      <div className="flex-between mb-24 align-center">
        <div>
          <h1 className="page-title" style={{ marginBottom: 0, fontSize: "1.5rem", color: "#1e293b", fontWeight: 700 }}>
            الطلبات
          </h1>
        </div>
        <div className="page-actions-container" style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/admin/order-form" className="btn btn-primary" style={{ gap: "6px", borderRadius: "20px", padding: "8px 20px", fontWeight: 600 }}>
            + أنشئ طلب
          </Link>
          <button className="btn btn-primary" style={{ gap: "6px", borderRadius: "20px", padding: "8px 20px", fontWeight: 600 }}>
            شحن الطلبات
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: "middle" }}>
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </button>
          <button className="btn btn-secondary" style={{ gap: "6px", borderRadius: "20px", padding: "8px 20px", background: "#fff", border: "1px solid #e2e8f0", color: "#475569", fontWeight: 600 }}>
            الفواتير
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: "middle" }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
        {/* Filter Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #f1f5f9", flexWrap: "wrap", gap: "16px" }}>
          <div className="order-tabs">
            <span
              className={`order-tab ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              الجميع <span className="tab-badge">0</span>
            </span>
            <span
              className={`order-tab ${filter === "pending" ? "active" : ""}`}
              onClick={() => setFilter("pending")}
            >
              بانتظار التجهيز <span className="tab-badge">0</span>
            </span>
            <span
              className={`order-tab ${filter === "archived" ? "active" : ""}`}
              onClick={() => setFilter("archived")}
            >
              الأرشيف
            </span>
          </div>
          <div style={{ position: "relative", width: "300px", maxWidth: "100%" }}>
            <input
              type="text"
              placeholder="البحث والتصنيفات"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "8px 16px", paddingLeft: "40px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.9rem" }}
            />
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper orders-table-wrap" style={{ boxShadow: "none", borderRadius: 0, margin: 0, border: "none" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right" }}>
            <thead>
              <tr>
                <th style={{ width: "40px", textAlign: "center" }}>
                  <input type="checkbox" style={{ width: "16px", height: "16px", borderRadius: "4px", accentColor: "#0f766e" }} />
                </th>
                <th style={{ textAlign: "center" }}>رقم</th>
                <th style={{ textAlign: "center" }}>العميل</th>
                <th style={{ textAlign: "center" }}>المنتجات</th>
                <th style={{ textAlign: "center" }}>الحالة</th>
                <th style={{ textAlign: "center" }}>الدفع</th>
                <th style={{ textAlign: "center" }}>الإجمالي</th>
                <th style={{ textAlign: "center" }}>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="text-center" style={{ padding: "32px" }}>
                  <div className="spinner"></div>
                </td>
              </tr>
              {/* Order rows will go here */}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderTop: "1px solid #f1f5f9", background: "#fff" }}>
          <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
            عدد الطلبات: <span>0</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button className="btn btn-sm" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              السابق
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <select style={{ border: "1px solid #e2e8f0", borderRadius: "6px", padding: "4px 8px", appearance: "none", textAlign: "center", minWidth: "50px" }}>
              <option value="1">1</option>
            </select>
            <button className="btn btn-sm" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
