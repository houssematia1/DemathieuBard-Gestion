import {
  HttpClient,
  HttpParams,
  environment,
  inject,
  ɵɵdefineInjectable
} from "./chunk-Y6YIWLLK.js";

// src/app/core/services/plan.service.ts
var PlanService = class _PlanService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = `${environment.apiUrl}/api/plans`;
  }
  getByAffaire(affaireId) {
    const params = new HttpParams().set("affaireId", affaireId);
    return this.http.get(this.base, { params });
  }
  search(typePlan, statut) {
    let params = new HttpParams();
    if (typePlan)
      params = params.set("typePlan", typePlan);
    if (statut)
      params = params.set("statut", statut);
    return this.http.get(`${this.base}/search`, { params });
  }
  getById(id) {
    return this.http.get(`${this.base}/${id}`);
  }
  create(payload) {
    return this.http.post(this.base, payload);
  }
  update(id, payload) {
    return this.http.put(`${this.base}/${id}`, payload);
  }
  delete(id) {
    return this.http.delete(`${this.base}/${id}`);
  }
  addVersion(id, payload) {
    return this.http.post(`${this.base}/${id}/versions`, payload);
  }
  getVersions(id) {
    return this.http.get(`${this.base}/${id}/versions`);
  }
  soumettre(id) {
    return this.http.post(`${this.base}/${id}/soumettre`, {});
  }
  getHistorique(id) {
    return this.http.get(`${this.base}/${id}/historique`);
  }
  static {
    this.\u0275fac = function PlanService_Factory(t) {
      return new (t || _PlanService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlanService, factory: _PlanService.\u0275fac, providedIn: "root" });
  }
};

// src/app/core/models/plan.model.ts
var TYPE_PLAN = {
  COF: { label: "Coffrage", color: "#92400E", bg: "#FEF3C7" },
  FER: { label: "Ferraillage", color: "#1E40AF", bg: "#DBEAFE" },
  NCAL: { label: "Note de calcul", color: "#5B21B6", bg: "#EDE9FE" },
  EXE: { label: "Ex\xE9cution", color: "#065F46", bg: "#D1FAE5" },
  SYN: { label: "Synth\xE8se", color: "#831843", bg: "#FCE7F3" }
};
var STATUT_PLAN = {
  BROUILLON: { label: "Brouillon", color: "#6B7280", bg: "#F3F4F6", step: 0 },
  EN_CONTROLE: { label: "En contr\xF4le", color: "#B45309", bg: "#FFFBEB", step: 1 },
  VALIDE: { label: "Valid\xE9", color: "#15803D", bg: "#F0FDF4", step: 2 },
  REFUSE: { label: "Refus\xE9", color: "#B91C1C", bg: "#FEF2F2", step: 1 },
  VISE: { label: "Vis\xE9", color: "#1D4ED8", bg: "#EFF6FF", step: 3 }
};

export {
  PlanService,
  TYPE_PLAN,
  STATUT_PLAN
};
//# sourceMappingURL=chunk-LT2EFETR.js.map
