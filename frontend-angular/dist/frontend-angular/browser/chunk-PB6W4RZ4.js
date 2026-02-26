import {
  HttpClient,
  HttpParams,
  environment,
  inject,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-Y6YIWLLK.js";

// src/app/core/services/notification.service.ts
var NotificationService = class _NotificationService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = `${environment.apiUrl}/api/notifications`;
    this.unreadCount = signal(0);
  }
  getByUser(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get(this.base, { params });
  }
  getNonLues(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get(`${this.base}/non-lues`, { params });
  }
  getCount(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get(`${this.base}/count`, { params }).pipe(tap((r) => this.unreadCount.set(r.count)));
  }
  marquerLue(id) {
    return this.http.put(`${this.base}/${id}/lue`, {});
  }
  marquerToutesLues(userId) {
    const params = new HttpParams().set("userId", userId);
    return this.http.put(`${this.base}/tout-lire`, {}, { params }).pipe(tap(() => this.unreadCount.set(0)));
  }
  static {
    this.\u0275fac = function NotificationService_Factory(t) {
      return new (t || _NotificationService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
  }
};

export {
  NotificationService
};
//# sourceMappingURL=chunk-PB6W4RZ4.js.map
