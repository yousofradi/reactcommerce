"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getCustomers();
        setCustomers(data || []);
      } catch (err) {
        console.error("Failed to load customers", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const filtered = search
    ? customers.filter((c: any) => c.name?.includes(search) || c.phone?.includes(search))
    : customers;

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div className="flex-between mb-24">
        <div>
          <h1 className="page-title" style={{ marginBottom: "4px" }}>العملاء</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>إدارة عملائك</p>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
          <input
            type="text"
            placeholder="البحث في العملاء..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", maxWidth: "300px", padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.9rem" }}
          />
        </div>
        <div className="table-wrapper" style={{ boxShadow: "none", borderRadius: 0, margin: 0, border: "none" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right" }}>
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الهاتف</th>
                <th>المحافظة</th>
                <th>عدد الطلبات</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="text-center" style={{ padding: "40px 0" }}><div className="spinner" style={{ margin: "0 auto" }}></div></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="text-center" style={{ padding: "40px 0", color: "var(--text-muted)" }}>لا يوجد عملاء</td></tr>
              ) : (
                filtered.map((customer: any, idx: number) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{customer.name || customer.customerName}</td>
                    <td>{customer.phone || customer.customerPhone}</td>
                    <td>{customer.gov || customer.customerGov || "-"}</td>
                    <td>{customer.orderCount || customer.totalOrders || 0}</td>
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
