"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [nameData, phoneData] = await Promise.allSettled([
          api.getSetting("storeName"),
          api.getSetting("storePhone")
        ]);
        if (nameData.status === "fulfilled") setStoreName(nameData.value?.value || "");
        if (phoneData.status === "fulfilled") setStorePhone(phoneData.value?.value || "");
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        api.updateSetting("storeName", storeName),
        api.updateSetting("storePhone", storePhone)
      ]);
      alert("تم الحفظ بنجاح");
    } catch (err) {
      console.error("Failed to save settings", err);
      alert("حدث خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <div className="mb-24">
        <h1 className="page-title" style={{ marginBottom: "4px" }}>إعدادات المتجر</h1>
        <p className="page-subtitle" style={{ marginBottom: 0 }}>تخصيص إعدادات متجرك</p>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}><div className="spinner" style={{ margin: "0 auto" }}></div></div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label className="form-label">اسم المتجر</label>
            <input
              type="text"
              className="form-control"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="أدخل اسم المتجر"
            />
          </div>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label className="form-label">هاتف المتجر</label>
            <input
              type="text"
              className="form-control"
              value={storePhone}
              onChange={(e) => setStorePhone(e.target.value)}
              placeholder="أدخل رقم الهاتف"
            />
          </div>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? "جارٍ الحفظ..." : "حفظ الإعدادات"}
          </button>
        </div>
      )}
    </div>
  );
}
