import {
  PlanService,
  STATUT_PLAN,
  TYPE_PLAN
} from "./chunk-LT2EFETR.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-GQNMP4BQ.js";
import {
  MatTooltipModule
} from "./chunk-UN5BBLKZ.js";
import "./chunk-S2QNGY54.js";
import {
  MatButtonModule,
  MatIcon,
  MatIconModule
} from "./chunk-EBLTBT5G.js";
import {
  AuthService,
  RouterLink,
  RouterModule
} from "./chunk-YXL4TWJQ.js";
import {
  CommonModule,
  DatePipe,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-Y6YIWLLK.js";

// src/app/features/plans/plan-list/plan-list.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/plans", a0];
function PlanListComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function PlanListComponent_For_15_Template_button_click_0_listener() {
      const t_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setType(t_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("color", ctx_r2.filterType() === t_r2 ? ctx_r2.TYPE_PLAN[t_r2].color : "")("background", ctx_r2.filterType() === t_r2 ? ctx_r2.TYPE_PLAN[t_r2].bg : "")("border-color", ctx_r2.filterType() === t_r2 ? ctx_r2.TYPE_PLAN[t_r2].color + "66" : "");
    \u0275\u0275classProp("active", ctx_r2.filterType() === t_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r2, " ");
  }
}
function PlanListComponent_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function PlanListComponent_For_23_Template_button_click_0_listener() {
      const s_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setStatut(s_r5));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.filterStatut() === s_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.STATUT_PLAN[s_r5].label, " ");
  }
}
function PlanListComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "mat-spinner", 13);
    \u0275\u0275elementEnd();
  }
}
function PlanListComponent_Conditional_25_For_17_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "span", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 33);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r7.derniereVersion.indice);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("v", p_r7.derniereVersion.numeroVersion, "");
  }
}
function PlanListComponent_Conditional_25_For_17_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function PlanListComponent_Conditional_25_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 20)(1, "td")(2, "div", 21)(3, "span", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 23);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td", 16)(8, "span", 24);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 17);
    \u0275\u0275template(11, PlanListComponent_Conditional_25_For_17_Conditional_11_Template, 5, 2, "div", 25)(12, PlanListComponent_Conditional_25_For_17_Conditional_12_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "div", 26)(15, "span", 27);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "td", 28);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td", 29);
    \u0275\u0275listener("click", function PlanListComponent_Conditional_25_For_17_Template_td_click_20_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(21, "div", 30)(22, "button", 31)(23, "mat-icon");
    \u0275\u0275text(24, "chevron_right");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(19, _c0, p_r7.id));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r7.nom);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Affaire ", p_r7.affaireId, "");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r2.TYPE_PLAN[p_r7.typePlan].color)("background", ctx_r2.TYPE_PLAN[p_r7.typePlan].bg);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r7.typePlan, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(11, p_r7.derniereVersion ? 11 : 12);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("border-left-color", ctx_r2.STATUT_PLAN[p_r7.statut].color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r2.STATUT_PLAN[p_r7.statut].color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.STATUT_PLAN[p_r7.statut].label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 16, p_r7.dateCreation, "dd/MM/yyyy"));
    \u0275\u0275advance(4);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(21, _c0, p_r7.id));
  }
}
function PlanListComponent_Conditional_25_ForEmpty_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 35)(2, "mat-icon");
    \u0275\u0275text(3, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Aucun plan trouv\xE9");
    \u0275\u0275elementEnd()()();
  }
}
function PlanListComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "table", 15)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Nom du plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 16);
    \u0275\u0275text(7, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 17);
    \u0275\u0275text(9, "Indice");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 18);
    \u0275\u0275text(13, "Cr\xE9\xE9 le");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "th", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, PlanListComponent_Conditional_25_For_17_Template, 25, 23, "tr", 20, _forTrack0, false, PlanListComponent_Conditional_25_ForEmpty_18_Template, 6, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r2.filtered());
  }
}
var PlanListComponent = class _PlanListComponent {
  constructor() {
    this.svc = inject(PlanService);
    this.auth = inject(AuthService);
    this.plans = signal([]);
    this.loading = signal(true);
    this.filterType = signal(null);
    this.filterStatut = signal(null);
    this.TYPE_PLAN = TYPE_PLAN;
    this.STATUT_PLAN = STATUT_PLAN;
    this.typePlanKeys = Object.keys(TYPE_PLAN);
    this.statutPlanKeys = Object.keys(STATUT_PLAN);
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.svc.search(this.filterType() ?? void 0, this.filterStatut() ?? void 0).subscribe({
      next: (p) => {
        this.plans.set(p);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  filtered() {
    return this.plans();
  }
  setType(t) {
    this.filterType.set(t);
    this.load();
  }
  setStatut(s) {
    this.filterStatut.set(s);
    this.load();
  }
  static {
    this.\u0275fac = function PlanListComponent_Factory(t) {
      return new (t || _PlanListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanListComponent, selectors: [["app-plan-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 26, vars: 5, consts: [[1, "page-wrap"], [1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "filters-row"], [1, "filter-group"], [1, "filter-label"], [1, "filter-chips"], [1, "chip", 3, "click"], [1, "chip", "type-chip", 3, "active", "color", "background", "borderColor"], [1, "chip", 3, "active"], [1, "loader-wrap"], [1, "chip", "type-chip", 3, "click"], ["diameter", "36"], [1, "table-card"], [1, "data-table"], [1, "col-type"], [1, "col-indice"], [1, "col-date"], [1, "col-actions"], [1, "data-row", 3, "routerLink"], [1, "plan-cell"], [1, "plan-nom"], [1, "plan-affaire"], [1, "type-badge"], [1, "indice-cell"], [1, "statut-left-border"], [1, "statut-label"], [1, "col-date", "text-muted"], [1, "col-actions", 3, "click"], [1, "row-actions"], [1, "action-btn", 3, "routerLink"], [1, "indice-circle"], [1, "ver-num"], [1, "text-muted"], ["colspan", "6", 1, "empty-row"]], template: function PlanListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "Plans");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Tous les plans de toutes les affaires");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 4)(8, "div", 5)(9, "span", 6);
        \u0275\u0275text(10, "Type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 7)(12, "button", 8);
        \u0275\u0275listener("click", function PlanListComponent_Template_button_click_12_listener() {
          return ctx.setType(null);
        });
        \u0275\u0275text(13, "Tous");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(14, PlanListComponent_For_15_Template, 2, 9, "button", 9, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 5)(17, "span", 6);
        \u0275\u0275text(18, "Statut");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 7)(20, "button", 8);
        \u0275\u0275listener("click", function PlanListComponent_Template_button_click_20_listener() {
          return ctx.setStatut(null);
        });
        \u0275\u0275text(21, "Tous");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(22, PlanListComponent_For_23_Template, 2, 3, "button", 10, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(24, PlanListComponent_Conditional_24_Template, 2, 0, "div", 11)(25, PlanListComponent_Conditional_25_Template, 19, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275classProp("active", ctx.filterType() === null);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.typePlanKeys);
        \u0275\u0275advance(6);
        \u0275\u0275classProp("active", ctx.filterStatut() === null);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.statutPlanKeys);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(24, ctx.loading() ? 24 : 25);
      }
    }, dependencies: [CommonModule, DatePipe, RouterModule, RouterLink, MatIconModule, MatIcon, MatButtonModule, MatProgressSpinnerModule, MatProgressSpinner, MatTooltipModule], styles: ['\n\n.page-wrap[_ngcontent-%COMP%] {\n  max-width: 1200px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--db-text);\n  margin: 0;\n}\n.page-sub[_ngcontent-%COMP%] {\n  font-size: .85rem;\n  color: var(--db-text-secondary);\n  margin: 4px 0 0;\n}\n.filters-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.filter-label[_ngcontent-%COMP%] {\n  font-size: .75rem;\n  font-weight: 700;\n  color: var(--db-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: .06em;\n  white-space: nowrap;\n  width: 44px;\n}\n.filter-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.chip[_ngcontent-%COMP%] {\n  border: 1px solid var(--db-border);\n  border-radius: 20px;\n  padding: 4px 12px;\n  font-size: .78rem;\n  font-weight: 500;\n  cursor: pointer;\n  background: #fff;\n  color: var(--db-text-secondary);\n  transition: all .12s;\n  &:hover {\n    border-color: var(--db-navy);\n    color: var(--db-navy);\n  }\n  &.active {\n    background: var(--db-navy);\n    color: #fff;\n    border-color: var(--db-navy);\n  }\n  &.type-chip.active {\n    font-family: "Courier New", monospace;\n    font-weight: 700;\n  }\n}\n.loader-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.table-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid var(--db-border);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: .875rem;\n}\nthead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: #F8FAFC;\n  border-bottom: 1px solid var(--db-border);\n}\nth[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  font-size: .73rem;\n  font-weight: 600;\n  color: var(--db-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: .06em;\n  text-align: left;\n}\n.data-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--db-border);\n  cursor: pointer;\n  transition: background .1s;\n  &:last-child {\n    border-bottom: none;\n  }\n  &:hover {\n    background: #F8FAFC;\n  }\n  &:hover .row-actions {\n    opacity: 1;\n  }\n}\ntd[_ngcontent-%COMP%] {\n  padding: 11px 16px;\n  vertical-align: middle;\n}\n.col-type[_ngcontent-%COMP%] {\n  width: 80px;\n}\n.col-indice[_ngcontent-%COMP%] {\n  width: 90px;\n}\n.col-date[_ngcontent-%COMP%] {\n  width: 110px;\n}\n.col-actions[_ngcontent-%COMP%] {\n  width: 60px;\n}\n.plan-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.plan-nom[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--db-text);\n}\n.plan-affaire[_ngcontent-%COMP%] {\n  font-size: .75rem;\n  color: var(--db-text-secondary);\n}\n.type-badge[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: .8rem;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 4px;\n  display: inline-block;\n}\n.indice-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.indice-circle[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: var(--db-navy);\n  color: #fff;\n  font-weight: 800;\n  font-size: .9rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ver-num[_ngcontent-%COMP%] {\n  font-size: .75rem;\n  color: var(--db-text-secondary);\n}\n.statut-left-border[_ngcontent-%COMP%] {\n  padding-left: 10px;\n  border-left: 3px solid;\n}\n.statut-label[_ngcontent-%COMP%] {\n  font-size: .82rem;\n  font-weight: 600;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: var(--db-text-secondary);\n  font-size: .82rem;\n}\n.row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  opacity: 0;\n  transition: opacity .1s;\n}\n.action-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border-radius: 4px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  color: var(--db-text-secondary);\n  mat-icon {\n    font-size: 1.1rem;\n    width: 18px;\n    height: 18px;\n  }\n  &:hover {\n    background: #EFF6FF;\n    color: var(--db-navy);\n  }\n}\n.empty-row[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 16px !important;\n  color: var(--db-text-secondary);\n  mat-icon {\n    font-size: 1.8rem;\n    opacity: .4;\n    display: block;\n    margin: 0 auto 8px;\n  }\n}\n/*# sourceMappingURL=plan-list.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanListComponent, { className: "PlanListComponent", filePath: "src\\app\\features\\plans\\plan-list\\plan-list.component.ts", lineNumber: 228 });
})();
export {
  PlanListComponent
};
//# sourceMappingURL=chunk-NXFP6CDI.js.map
