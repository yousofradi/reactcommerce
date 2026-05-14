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
    ? customers.filter((c: any) => 
        (c.name && c.name.includes(search)) || 
        (c.customerName && c.customerName.includes(search)) ||
        (c.phone && c.phone.includes(search)) ||
        (c.customerPhone && c.customerPhone.includes(search))
      )
    : customers;

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div className="flex-between mb-24">
        <div>
          <h1 className="page-title">العملاء</h1>
          <p className="page-subtitle">إدارة عملائك</p>
        </div>
      </div>

      <div className="admin-card mb-24" style={{ padding: 0 }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
          <input
            type="text"
            className="form-control"
            placeholder="البحث في العملاء..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
        </div>
        <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
          <table>
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
                <tr><td colSpan={4} className="text-center" style={{ padding: "40px 0" }}><div className="spinner"></div></td></tr>
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

