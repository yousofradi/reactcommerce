"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function AdminShipmentPage() {
  const [shipping, setShipping] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getShippingList();
        setShipping(data || []);
      } catch (err) {
        console.error("Failed to load shipping", err);
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
          <h1 className="page-title">إعدادات الشحن</h1>
          <p className="page-subtitle">إدارة رسوم الشحن للمحافظات والمدن</p>
        </div>
        <button className="btn btn-primary">+ إضافة منطقة شحن</button>
      </div>

      <div className="admin-card mb-24">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>المنطقة / المحافظة</th>
                <th>سعر الشحن</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={3} className="text-center"><div className="spinner"></div></td></tr>
              ) : shipping.length === 0 ? (
                <tr><td colSpan={3} className="text-center">لا توجد مناطق شحن</td></tr>
              ) : (
                shipping.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.governorate}</td>
                    <td>{item.price} ج.م</td>
                    <td>
                      <button className="btn btn-secondary btn-sm">تعديل</button>
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
