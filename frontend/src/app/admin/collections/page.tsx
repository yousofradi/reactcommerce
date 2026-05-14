"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getCollections();
        setCollections(data || []);
      } catch (err) {
        console.error("Failed to load collections", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div className="flex-between mb-24">
        <div>
          <h1 className="page-title" style={{ marginBottom: "4px" }}>المجموعات</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>تنظيم منتجاتك في مجموعات</p>
        </div>
        <Link href="/admin/collection-form" className="btn btn-primary">+ إضافة مجموعة</Link>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
        <div className="table-wrapper" style={{ boxShadow: "none", borderRadius: 0, margin: 0, border: "none" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right" }}>
            <thead>
              <tr>
                <th>الصورة</th>
                <th>الاسم</th>
                <th>عدد المنتجات</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={3} className="text-center" style={{ padding: "40px 0" }}><div className="spinner" style={{ margin: "0 auto" }}></div></td></tr>
              ) : collections.length === 0 ? (
                <tr><td colSpan={3} className="text-center" style={{ padding: "40px 0", color: "var(--text-muted)" }}>لا توجد مجموعات</td></tr>
              ) : (
                collections.map((col: any) => (
                  <tr key={col.id}>
                    <td>
                      <img
                        src={col.imageUrl || "/placeholder.png"}
                        alt={col.name}
                        style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover" }}
                      />
                    </td>
                    <td>
                      <Link href={`/admin/collection-form?id=${col.id}`} style={{ fontWeight: 600, color: "var(--primary)", textDecoration: "none" }}>
                        {col.name}
                      </Link>
                    </td>
                    <td>{col.products?.length || col._count?.products || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
