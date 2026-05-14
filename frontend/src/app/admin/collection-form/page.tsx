"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";

function CollectionFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  const [formData, setFormData] = useState({
    name: "",
    urlName: "",
    description: "",
    imageUrl: "",
    sortOrder: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const load = async () => {
        try {
          const data = await api.getCollection(id);
          setFormData(data);
        } catch (err) {
          console.error("Failed to load collection", err);
        }
      };
      load();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await api.updateCollection(id, formData);
      } else {
        await api.createCollection(formData);
      }
      router.push("/admin/collections");
    } catch (err) {
      alert("فشل حفظ المجموعة");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <h1 className="page-title">{id ? "تعديل مجموعة" : "إضافة مجموعة جديدة"}</h1>
      
      <form onSubmit={handleSubmit} className="admin-card" style={{ padding: "24px" }}>
        <div className="form-group mb-24">
          <label className="form-label">اسم المجموعة</label>
          <input 
            type="text" 
            className="form-control" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
        </div>
        
        <div className="form-group mb-24">
          <label className="form-label">الاسم في الرابط (Slug)</label>
          <input 
            type="text" 
            className="form-control" 
            value={formData.urlName || ""}
            onChange={(e) => setFormData({...formData, urlName: e.target.value})}
            placeholder="e.g. summer-collection" 
          />
        </div>

        <div className="form-group mb-24">
          <label className="form-label">الوصف</label>
          <textarea 
            className="form-control" 
            rows={4}
            value={formData.description || ""}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>

        <div className="form-group mb-24">
          <label className="form-label">رابط الصورة</label>
          <input 
            type="text" 
            className="form-control" 
            value={formData.imageUrl || ""}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
          />
        </div>

        <div className="flex gap-12" style={{ justifyContent: "flex-end" }}>
          <button type="button" className="btn btn-secondary" onClick={() => router.back()}>إلغاء</button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "جاري الحفظ..." : "حفظ المجموعة"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CollectionFormPage() {
  return (
    <Suspense fallback={<div className="text-center p-40"><div className="spinner"></div></div>}>
      <CollectionFormContent />
    </Suspense>
  );
}
