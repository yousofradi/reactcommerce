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
    <div className="container">
      <div className="flex-between mb-24">
        <div>
          <h1 className="page-title">المجموعات</h1>
          <p className="page-subtitle">إدارة تصنيفات المنتجات</p>
        </div>
        <Link href="/admin/collection-form" className="btn btn-primary">+ مجموعة جديدة</Link>
      </div>

      <div className="admin-card mb-24">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>الاسم</th>
                <th>عدد المنتجات</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="text-center">
                  <div className="spinner" style={{ margin: "0 auto" }}></div>
                </td></tr>
              ) : collections.length === 0 ? (
                <tr><td colSpan={4} className="text-center">لا توجد مجموعات</td></tr>
              ) : (
                collections.map((collection: any) => (
                  <tr key={collection.id}>
                    <td style={{ fontWeight: 600 }}>{collection.name}</td>
                    <td>{collection._count?.products || 0}</td>
                    <td>
                      <span className="badge badge-success">نشط</span>
                    </td>
                    <td>
                      <Link href={`/admin/collection-form?id=${collection.id}`} className="btn btn-secondary btn-sm">تعديل</Link>
                    </td>
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
