"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [name, phone] = await Promise.all([
          api.getSetting("storeName"),
          api.getSetting("storePhone")
        ]);
        setStoreName(name?.value || "");
        setStorePhone(phone?.value || "");
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Promise.all([
        api.updateSetting("storeName", storeName),
        api.updateSetting("storePhone", storePhone)
      ]);
      alert("تم حفظ الإعدادات");
    } catch (err) {
      alert("فشل حفظ الإعدادات");
    }
  };

  return (
    <div className="container">
      <div className="flex-between mb-24">
        <div>
          <h1 className="page-title">إعدادات المتجر</h1>
          <p className="page-subtitle">تعديل معلومات المتجر الأساسية</p>
        </div>
      </div>

      <div className="admin-card mb-24">
        {isLoading ? (
          <div className="text-center p-40"><div className="spinner"></div></div>
        ) : (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">اسم المتجر</label>
              <input 
                type="text" 
                className="form-control" 
                value={storeName} 
                onChange={(e) => setStoreName(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">رقم الهاتف (واتساب)</label>
              <input 
                type="text" 
                className="form-control" 
                value={storePhone} 
                onChange={(e) => setStorePhone(e.target.value)} 
              />
            </div>
            <div className="form-actions mt-24 flex-end">
              <button type="submit" className="btn btn-primary">حفظ الإعدادات</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
