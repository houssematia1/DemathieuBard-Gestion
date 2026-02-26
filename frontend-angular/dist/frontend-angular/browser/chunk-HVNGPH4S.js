import {
  HttpClient,
  HttpParams,
  environment,
  inject,
  ɵɵdefineInjectable
} from "./chunk-Y6YIWLLK.js";

// src/app/core/services/affaire.service.ts
var AffaireService = class _AffaireService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = `${environment.apiUrl}/api/affaires`;
  }
  getAll(page = 0, size = 20) {
    const params = new HttpParams().set("page", page).set("size", size);
    return this.http.get(this.base, { params });
  }
  search(nom, statut, page = 0, size = 20) {
    let params = new HttpParams().set("page", page).set("size", size);
    if (nom)
      params = params.set("nom", nom);
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
  getHistorique(id) {
    return this.http.get(`${this.base}/${id}/historique`);
  }
  static {
    this.\u0275fac = function AffaireService_Factory(t) {
      return new (t || _AffaireService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AffaireService, factory: _AffaireService.\u0275fac, providedIn: "root" });
  }
};

// src/app/core/models/affaire.model.ts
var STATUT_AFFAIRE = {
  EN_COURS: { label: "En cours", color: "#1D4ED8", bg: "#EFF6FF" },
  TERMINEE: { label: "Termin\xE9e", color: "#15803D", bg: "#F0FDF4" },
  SUSPENDUE: { label: "Suspendue", color: "#B45309", bg: "#FFFBEB" },
  ANNULEE: { label: "Annul\xE9e", color: "#6B7280", bg: "#F3F4F6" }
};

export {
  AffaireService,
  STATUT_AFFAIRE
};
//# sourceMappingURL=chunk-HVNGPH4S.js.map
