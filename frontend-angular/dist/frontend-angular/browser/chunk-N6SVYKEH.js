import {
  HttpClient,
  HttpParams,
  environment,
  inject,
  ɵɵdefineInjectable
} from "./chunk-Y6YIWLLK.js";

// src/app/core/services/controle.service.ts
var ControleService = class _ControleService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = `${environment.apiUrl}/api/controles`;
  }
  getByPlan(planId) {
    const params = new HttpParams().set("planId", planId);
    return this.http.get(this.base, { params });
  }
  getById(id) {
    return this.http.get(`${this.base}/${id}`);
  }
  getEnAttente(controleurId) {
    const params = new HttpParams().set("controleurId", controleurId);
    return this.http.get(`${this.base}/en-attente`, { params });
  }
  create(payload) {
    return this.http.post(this.base, payload);
  }
  applyDecision(id, payload) {
    return this.http.put(`${this.base}/${id}/decision`, payload);
  }
  addCommentaire(id, payload) {
    return this.http.post(`${this.base}/${id}/commentaires`, payload);
  }
  applyVisa(id, payload) {
    return this.http.post(`${this.base}/${id}/visa`, payload);
  }
  static {
    this.\u0275fac = function ControleService_Factory(t) {
      return new (t || _ControleService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ControleService, factory: _ControleService.\u0275fac, providedIn: "root" });
  }
};

// src/app/core/models/controle.model.ts
var DECISION_META = {
  EN_ATTENTE: { label: "En attente", color: "#B45309", icon: "hourglass_empty" },
  VALIDE: { label: "Valid\xE9", color: "#15803D", icon: "check_circle" },
  REFUSE: { label: "Refus\xE9", color: "#B91C1C", icon: "cancel" },
  MODIFICATION_DEMANDEE: { label: "Modification demand\xE9e", color: "#1D4ED8", icon: "edit_note" }
};

export {
  ControleService,
  DECISION_META
};
//# sourceMappingURL=chunk-N6SVYKEH.js.map
