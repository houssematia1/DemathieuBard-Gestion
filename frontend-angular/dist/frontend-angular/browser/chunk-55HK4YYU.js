import {
  HttpClient,
  HttpParams,
  environment,
  inject,
  ɵɵdefineInjectable
} from "./chunk-Y6YIWLLK.js";

// src/app/core/services/user.service.ts
var UserService = class _UserService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = `${environment.apiUrl}/api/users`;
  }
  getAll(page = 0, size = 20) {
    const params = new HttpParams().set("page", page).set("size", size);
    return this.http.get(this.base, { params });
  }
  getMe() {
    return this.http.get(`${this.base}/me`);
  }
  getById(id) {
    return this.http.get(`${this.base}/${id}`);
  }
  update(id, payload) {
    return this.http.put(`${this.base}/${id}`, payload);
  }
  updateRole(id, payload) {
    return this.http.put(`${this.base}/${id}/role`, payload);
  }
  desactiver(id) {
    return this.http.delete(`${this.base}/${id}`);
  }
  reactiver(id) {
    return this.http.put(`${this.base}/${id}/reactiver`, {});
  }
  static {
    this.\u0275fac = function UserService_Factory(t) {
      return new (t || _UserService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
  }
};

export {
  UserService
};
//# sourceMappingURL=chunk-55HK4YYU.js.map
