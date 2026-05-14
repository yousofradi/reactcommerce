"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function AdminShipmentPage() {
  const [cities, setCities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getShipping();
        setCities(data || []);
      } catch (err) {
        console.error("Failed to load shipping", err);
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
          <h1 className="page-title" style={{ marginBottom: "4px" }}>الشحن</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>إدارة مناطق ورسوم الشحن</p>
        </div>
        <button className="btn btn-primary">+ إضافة منطقة</button>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
        <div className="table-wrapper" style={{ boxShadow: "none", borderRadius: 0, margin: 0, border: "none" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right" }}>
            <thead>
              <tr>
                <th>المحافظة</th>
                <th>رسوم الشحن</th>
                <th>المناطق</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={3} className="text-center" style={{ padding: "40px 0" }}><div className="spinner" style={{ margin: "0 auto" }}></div></td></tr>
              ) : cities.length === 0 ? (
                <tr><td colSpan={3} className="text-center" style={{ padding: "40px 0", color: "var(--text-muted)" }}>لا توجد مناطق شحن</td></tr>
              ) : (
                cities.map((city: any) => (
                  <tr key={city.id}>
                    <td style={{ fontWeight: 600 }}>{city.city}</td>
                    <td>{city.fee} ج.م</td>
                    <td>{Array.isArray(city.zones) ? city.zones.length : 0} منطقة</td>
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
