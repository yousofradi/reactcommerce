"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminOrderFormPage() {
  const [customerMode, setCustomerMode] = useState<"existing" | "new">("existing");
  const [isProductsModalOpen, setProductsModalOpen] = useState(false);
  const [isDiscountModalOpen, setDiscountModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  
  return (
    <div style={{ maxWidth: "1100px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <h1 className="page-title" style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/admin/orders" style={{ fontSize: "1.1rem", color: "var(--text-main)", textDecoration: "none", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
            الطلبات
          </Link>
        </h1>
        <button type="button" className="btn btn-primary" style={{ padding: "10px 24px", borderRadius: "12px", fontWeight: 700, boxShadow: "var(--shadow-md)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px" }}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          حفظ الطلب
        </button>
      </div>

      <div className="order-create-layout" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", alignItems: "start" }}>
        
        {/* LEFT COLUMN */}
        <div>
          {/* Products */}
          <div className="info-card mb-24" style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", marginBottom: "24px", overflow: "hidden" }}>
            <div className="info-card-header" style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fafafa" }}>
              <h3 style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)" }}>المنتجات</h3>
            </div>
            <div className="info-card-body" style={{ padding: 0 }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", background: "#fff" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setProductsModalOpen(true)} style={{ background: "#fff", color: "var(--primary)", border: "1px solid var(--primary)", display: "flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "8px", fontSize: "0.85rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>+</span> إضافة منتجات
                </button>
              </div>
              <div id="cart-items-container">
                <div className="empty-cart" style={{ textAlign: "center", padding: "48px 24px", color: "var(--text-muted)" }}>
                  <div className="empty-cart-icon" style={{ fontSize: "3rem", marginBottom: "12px" }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "6px", color: "var(--text-main)" }}>السلة فارغة</h3>
                  <p style={{ fontSize: "0.9rem" }}>ابحث عن منتج أعلاه لإضافته</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="info-card" style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", marginBottom: "24px", overflow: "hidden" }}>
            <div className="info-card-header" style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fafafa" }}>
              <h3 style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)" }}>بيانات العميل</h3>
            </div>
            <div className="info-card-body" style={{ padding: "20px" }}>
              <div className="customer-type-toggle" style={{ display: "flex", gap: "24px", marginBottom: "20px", justifyContent: "flex-start", borderBottom: "1px solid #f1f5f9", paddingBottom: "16px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600, color: "#475569", fontSize: "0.95rem" }}>
                  <input type="radio" name="customer_type" value="existing" checked={customerMode === "existing"} onChange={() => setCustomerMode("existing")} style={{ width: "20px", height: "20px", accentColor: "var(--primary)", cursor: "pointer" }} />
                  بيانات العميل
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600, color: "#475569", fontSize: "0.95rem" }}>
                  <input type="radio" name="customer_type" value="new" checked={customerMode === "new"} onChange={() => setCustomerMode("new")} style={{ width: "20px", height: "20px", accentColor: "var(--primary)", cursor: "pointer" }} />
                  عميل جديد
                </label>
              </div>

              {customerMode === "existing" && (
                <div className="customer-select-wrapper" style={{ position: "relative", marginTop: "12px", marginBottom: "24px" }}>
                  <div className="customer-search-container" style={{ position: "relative", background: "#fff", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "10px 16px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                    <input type="text" className="customer-search-input" placeholder="ابحث عن أو اختر عميل" style={{ border: "none", outline: "none", flex: 1, fontSize: "0.95rem", padding: 0, background: "transparent", textAlign: "right" }} />
                  </div>
                </div>
              )}

              <div id="customer-fields">
                <div className="form-group">
                  <label className="form-label">الاسم الكامل *</label>
                  <input type="text" className="form-control" placeholder="اسم العميل" required />
                </div>
                <div className="grid grid-2" style={{ gap: "16px", marginBottom: "16px" }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">رقم الهاتف *</label>
                    <input type="tel" className="form-control" placeholder="01xxxxxxxxx" required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">رقم هاتف آخر</label>
                    <input type="tel" className="form-control" placeholder="اختياري" />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">المحافظة (المدينة) *</label>
                <select className="form-control" required>
                  <option value="">اختر المدينة</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">المنطقة *</label>
                <input type="text" className="form-control" placeholder="اختر أو ابحث عن المنطقة" required />
              </div>
              <div className="form-group">
                <label className="form-label">العنوان التفصيلي *</label>
                <textarea className="form-control" required rows={2} placeholder="الشارع، الحي، المدينة..."></textarea>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">ملاحظات</label>
                <textarea className="form-control" rows={2} placeholder="أي ملاحظات إضافية..."></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <div className="info-card order-summary-card" style={{ position: "sticky", top: "24px", background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", overflow: "hidden" }}>
            <div className="info-card-header" style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", background: "#fafafa" }}>
              <h3 style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)" }}>ملخص الطلب</h3>
            </div>
            <div className="info-card-body" style={{ padding: "20px" }}>
              <div className="summary-line" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", fontSize: "0.95rem" }}>
                <span style={{ color: "var(--text-muted)" }}>المجموع الفرعي</span>
                <span style={{ fontWeight: 600 }}>0 ج.م</span>
              </div>
              <div className="summary-line" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", fontSize: "0.95rem" }}>
                <span style={{ color: "var(--text-muted)" }}>رسوم الشحن</span>
                <span>0 ج.م</span>
              </div>

              <div className="order-discount-section" style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>
                <label style={{ fontSize: "0.9rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>خصم / زيادة الطلب:</label>
                <input type="number" className="form-control" placeholder="0" style={{ flex: 1, padding: "6px 10px", fontSize: "0.9rem", maxWidth: "80px" }} />
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>ج.م</span>
              </div>

              <div className="summary-total" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid var(--border-color)", paddingTop: "14px", marginTop: "14px", fontSize: "1.25rem", fontWeight: 700 }}>
                <span>الإجمالي</span>
                <span style={{ color: "var(--primary)" }}>0 ج.م</span>
              </div>

              <div style={{ marginTop: "24px", marginBottom: "8px" }}>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "12px", color: "var(--text-main)" }}>طريقة الدفع *</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label className="payment-method-card selected" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", border: "2px solid var(--primary)", borderRadius: "var(--radius)", cursor: "pointer", background: "#eff6ff" }}>
                    <input type="radio" name="payment" value="vodafone_cash" defaultChecked style={{ accentColor: "var(--primary)", width: "18px", height: "18px" }} />
                    <span style={{ fontSize: "1.4rem" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                        <line x1="12" y1="18" x2="12.01" y2="18"></line>
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>فودافون كاش</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Vodafone Cash</div>
                    </div>
                  </label>
                  <label className="payment-method-card" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", border: "2px solid var(--border-color)", borderRadius: "var(--radius)", cursor: "pointer", background: "var(--bg-card)" }}>
                    <input type="radio" name="payment" value="instapay" style={{ accentColor: "var(--primary)", width: "18px", height: "18px" }} />
                    <span style={{ fontSize: "1.4rem" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>إنستاباي</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>InstaPay</div>
                    </div>
                  </label>
                </div>
              </div>

              <div style={{ marginTop: "20px", marginBottom: "16px", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
                <label style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "8px" }}>تم دفعه مسبقاً (اختياري)</label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input type="number" className="form-control" min="0" placeholder="0" style={{ flex: 1 }} />
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>ج.م</span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "6px", marginBottom: 0 }}>أدخل المبلغ إذا تم تحويله مسبقاً (مثل الدفع عبر واتساب).</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modals placeholders */}
      {isProductsModalOpen && (
        <div className="modal-overlay" style={{ display: "flex", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, alignItems: "center", justifyContent: "center" }}>
          <div className="modal-box" style={{ background: "#fff", borderRadius: "var(--radius-lg)", width: "90%", maxWidth: "600px", maxHeight: "600px", display: "flex", flexDirection: "column" }}>
            <div className="modal-header" style={{ padding: "12px 20px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button className="modal-close" onClick={() => setProductsModalOpen(false)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "var(--text-muted)" }}>×</button>
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>إضافة منتجات</h3>
              <div style={{ width: "24px" }}></div>
            </div>
            <div className="modal-body" style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
              <p>Product list will appear here.</p>
            </div>
            <div className="modal-footer" style={{ padding: "16px 20px", borderTop: "1px solid var(--border-color)", display: "flex", gap: "12px" }}>
              <button className="btn btn-secondary" onClick={() => setProductsModalOpen(false)} style={{ flex: 1, background: "#fff" }}>إلغاء</button>
              <button className="btn btn-primary" style={{ flex: 1 }}>أضف منتج</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
