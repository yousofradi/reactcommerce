let API_BASE_VAL = process.env.NEXT_PUBLIC_API_URL;
if (API_BASE_VAL && !API_BASE_VAL.endsWith('/api')) {
  API_BASE_VAL = API_BASE_VAL.replace(/\/$/, '') + '/api';
}
const API_BASE = API_BASE_VAL;

class ApiClient {
  private _adminKey(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminKey') || '';
    }
    return '';
  }

  private async _request(path: string, opts: any = {}) {
    const cacheKey = `api_cache_${path}`;
    if (opts.useCache && typeof window !== 'undefined') {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const { data, time } = JSON.parse(cached);
        if (Date.now() - time < 60000) return data; // 1 min cache
      }
    }

    const headers: any = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    if (opts.admin) headers['x-admin-key'] = this._adminKey();

    const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

    if (opts.useCache && typeof window !== 'undefined') {
      sessionStorage.setItem(cacheKey, JSON.stringify({ data, time: Date.now() }));
    }
    return data;
  }

  // Products
  getProducts(page?: number, limit?: number, admin: boolean = true, collectionId: string = '', search: string = '', variable: string = '') {
    let url = `/products?admin=${admin}`;
    if (page) url += `&page=${page}`;
    if (limit) url += `&limit=${limit}`;
    if (collectionId) url += `&collectionId=${collectionId}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (variable) url += `&variable=${variable}`;
    return this._request(url, { useCache: !admin });
  }

  searchProducts(query: string) {
    return this._request(`/products?admin=false&search=${encodeURIComponent(query)}`);
  }

  getProductsByCollection(collectionId: string) {
    return this._request(`/products?collectionId=${collectionId}`);
  }

  getProduct(id: string) {
    return this._request(`/products/${id}`);
  }

  getProductByHandle(handle: string) {
    return this._request(`/products/handle/${handle}`);
  }

  createProduct(data: any) {
    return this._request('/products', { method: 'POST', body: JSON.stringify(data), admin: true });
  }

  updateProduct(id: string, data: any) {
    return this._request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data), admin: true });
  }

  deleteProduct(id: string) {
    return this._request(`/products/${id}`, { method: 'DELETE', admin: true });
  }

  deleteProductsBatch(productIds: string[]) {
    return this._request('/products/delete/batch', { method: 'POST', body: JSON.stringify({ productIds }), admin: true });
  }

  deactivateProductsBatch(productIds: string[]) {
    return this._request('/products/deactivate/batch', { method: 'POST', body: JSON.stringify({ productIds }), admin: true });
  }

  reorderProducts(order: { id: string; sortOrder: number }[]) {
    return this._request('/products/reorder/batch', { method: 'PUT', body: JSON.stringify({ order }), admin: true });
  }

  // Collections
  getCollections() {
    return this._request('/collections', { useCache: true });
  }

  getCollection(id: string) {
    return this._request(`/collections/${id}`);
  }

  createCollection(data: any) {
    return this._request('/collections', { method: 'POST', body: JSON.stringify(data), admin: true });
  }

  updateCollection(id: string, data: any) {
    return this._request(`/collections/${id}`, { method: 'PUT', body: JSON.stringify(data), admin: true });
  }

  deleteCollection(id: string) {
    return this._request(`/collections/${id}`, { method: 'DELETE', admin: true });
  }

  deleteCollectionsBatch(collectionIds: string[]) {
    return this._request('/collections/delete/batch', { method: 'POST', body: JSON.stringify({ collectionIds }), admin: true });
  }

  // Orders
  createOrder(data: any) {
    return this._request('/orders', { method: 'POST', body: JSON.stringify(data) });
  }

  getOrders(archived = false) {
    return this._request(`/orders?archived=${archived}`, { admin: true });
  }

  getOrder(id: string) {
    return this._request(`/orders/${id}`, { admin: true });
  }

  getPublicOrder(id: string) {
    return this._request(`/orders/public/${id}`);
  }

  updateOrder(id: string, data: any) {
    return this._request(`/orders/${id}`, { method: 'PUT', body: JSON.stringify(data), admin: true });
  }

  deleteOrder(id: string) {
    return this._request(`/orders/${id}`, { method: 'DELETE', admin: true });
  }

  archiveOrders(orderIds: string[]) {
    return this._request('/orders/archive/batch', { method: 'POST', body: JSON.stringify({ orderIds }), admin: true });
  }

  unarchiveOrders(orderIds: string[]) {
    return this._request('/orders/unarchive/batch', { method: 'POST', body: JSON.stringify({ orderIds }), admin: true });
  }

  cancelOrder(id: string) {
    return this._request(`/orders/${id}/cancel`, { method: 'POST', admin: true });
  }

  cancelOrdersBatch(orderIds: string[]) {
    return this._request('/orders/cancel/batch', { method: 'POST', body: JSON.stringify({ orderIds }), admin: true });
  }

  deleteOrdersBatch(orderIds: string[]) {
    return this._request('/orders/delete/batch', { method: 'POST', body: JSON.stringify({ orderIds }), admin: true });
  }

  // Customers
  getCustomers() {
    return this._request('/customers', { admin: true });
  }

  getCustomer(phone: string) {
    return this._request(`/customers/${phone}`, { admin: true });
  }

  // Shipping
  getShipping() {
    return this._request('/shipping', { useCache: true });
  }

  getPublicShipping() {
    return this.getShipping();
  }

  getZones(cityId: string) {
    return this._request(`/shipping/zones/${cityId}`, { useCache: true });
  }

  getShippingList() {
    return this._request('/shipping/list', { admin: true });
  }

  createShipping(data: any) {
    return this._request('/shipping', { method: 'POST', body: JSON.stringify(data), admin: true });
  }

  updateShipping(id: string, data: any) {
    return this._request(`/shipping/${id}`, { method: 'PUT', body: JSON.stringify(data), admin: true });
  }

  deleteShipping(id: string) {
    return this._request(`/shipping/${id}`, { method: 'DELETE', admin: true });
  }

  // Webhooks
  getWebhooks() {
    return this._request('/webhooks', { admin: true });
  }

  createWebhook(data: any) {
    return this._request('/webhooks', { method: 'POST', body: JSON.stringify(data), admin: true });
  }

  updateWebhook(id: string, data: any) {
    return this._request(`/webhooks/${id}`, { method: 'PUT', body: JSON.stringify(data), admin: true });
  }

  deleteWebhook(id: string) {
    return this._request(`/webhooks/${id}`, { method: 'DELETE', admin: true });
  }

  // Settings
  getSetting(key: string) {
    return this._request(`/settings/${key}`, { useCache: true });
  }

  updateSetting(key: string, value: any) {
    return this._request(`/settings/${key}`, { method: 'POST', body: JSON.stringify({ value }), admin: true });
  }

  async checkAdmin() {
    try {
      await this._request('/orders', { admin: true });
      return true;
    } catch {
      return false;
    }
  }

  uploadFile(file: File, onProgress?: (percent: number) => void): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE}/upload`, true);
      xhr.setRequestHeader('x-admin-key', this._adminKey());

      if (onProgress && xhr.upload) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            onProgress(percentComplete);
          }
        });
      }

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (e) {
            resolve({});
          }
        } else {
          try {
            reject(new Error(JSON.parse(xhr.responseText).error));
          } catch (e) {
            reject(new Error('Upload failed'));
          }
        }
      };

      xhr.onerror = () => reject(new Error('Network Error'));

      const formData = new FormData();
      formData.append('image', file);
      xhr.send(formData);
    });
  }

  importProducts(file: File, deleteAll: boolean, onProgress?: (percent: number) => void): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE}/products/import`, true);
      xhr.setRequestHeader('x-admin-key', this._adminKey());

      if (onProgress && xhr.upload) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            onProgress(percentComplete);
          }
        });
      }

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (e) {
            resolve({});
          }
        } else {
          try {
            reject(new Error(JSON.parse(xhr.responseText).error));
          } catch (e) {
            reject(new Error('Import failed'));
          }
        }
      };

      xhr.onerror = () => reject(new Error('Network Error'));

      const formData = new FormData();
      formData.append('file', file);
      formData.append('deleteAll', String(deleteAll));
      xhr.send(formData);
    });
  }
}

export const api = new ApiClient();
