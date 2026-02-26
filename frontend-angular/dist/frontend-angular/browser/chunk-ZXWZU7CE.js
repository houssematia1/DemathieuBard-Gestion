import {
  ControleService,
  DECISION_META
} from "./chunk-N6SVYKEH.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-66T2SBBK.js";
import {
  ReactiveFormsModule
} from "./chunk-QKX6J2Q5.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-GQNMP4BQ.js";
import {
  MatTooltip,
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
  SlicePipe,
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
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-Y6YIWLLK.js";

// src/app/features/controles/controle-list/controle-list.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/plans", a0];
function ControleListComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.controles().length);
  }
}
function ControleListComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "mat-spinner", 10);
    \u0275\u0275elementEnd();
  }
}
function ControleListComponent_Conditional_14_For_18_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "button", 27);
    \u0275\u0275listener("click", function ControleListComponent_Conditional_14_For_18_Conditional_21_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const c_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.decide(c_r4, "VALIDE"));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Valider ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 28);
    \u0275\u0275listener("click", function ControleListComponent_Conditional_14_For_18_Conditional_21_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const c_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.decide(c_r4, "MODIFICATION_DEMANDEE"));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "edit_note");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 29);
    \u0275\u0275listener("click", function ControleListComponent_Conditional_14_For_18_Conditional_21_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const c_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.decide(c_r4, "REFUSE"));
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
  }
}
function ControleListComponent_Conditional_14_For_18_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ControleListComponent_Conditional_14_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 17)(1, "td")(2, "a", 18);
    \u0275\u0275listener("click", function ControleListComponent_Conditional_14_For_18_Template_a_click_2_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(3, "mat-icon", 19);
    \u0275\u0275text(4, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "slice");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 13)(8, "span", 20);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 14)(11, "span", 21)(12, "mat-icon", 22);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 23);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 24);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td", 25);
    \u0275\u0275listener("click", function ControleListComponent_Conditional_14_For_18_Template_td_click_20_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(21, ControleListComponent_Conditional_14_For_18_Conditional_21_Template, 11, 0, "div", 26)(22, ControleListComponent_Conditional_14_For_18_Conditional_22_Template, 2, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(21, _c0, c_r4.planId));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind3(6, 14, c_r4.planId, 0, 12), "\u2026 ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("externe", c_r4.typeControle === "EXTERNE");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r4.typeControle === "INTERNE" ? "CI" : "CE", " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r0.DECISION_META[c_r4.decision].color)("background", ctx_r0.DECISION_META[c_r4.decision].color + "1A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.DECISION_META[c_r4.decision].icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.DECISION_META[c_r4.decision].label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r4.remarque || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 18, c_r4.dateControle, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(21, c_r4.decision === "EN_ATTENTE" ? 21 : 22);
  }
}
function ControleListComponent_Conditional_14_ForEmpty_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 31)(2, "mat-icon");
    \u0275\u0275text(3, "fact_check");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Aucun contr\xF4le en attente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7, "Tous les plans sont trait\xE9s.");
    \u0275\u0275elementEnd()()();
  }
}
function ControleListComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "table", 12)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 13);
    \u0275\u0275text(7, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 14);
    \u0275\u0275text(9, "D\xE9cision");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Remarque");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 15);
    \u0275\u0275text(13, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 16);
    \u0275\u0275text(15, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275repeaterCreate(17, ControleListComponent_Conditional_14_For_18_Template, 23, 23, "tr", 17, _forTrack0, false, ControleListComponent_Conditional_14_ForEmpty_19_Template, 8, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r0.controles());
  }
}
function ControleListComponent_Conditional_15_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 42);
  }
}
function ControleListComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275listener("click", function ControleListComponent_Conditional_15_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelDecision());
    });
    \u0275\u0275elementStart(1, "div", 33);
    \u0275\u0275listener("click", function ControleListComponent_Conditional_15_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 34)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 35);
    \u0275\u0275listener("click", function ControleListComponent_Conditional_15_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelDecision());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 36)(9, "div", 37)(10, "label");
    \u0275\u0275text(11, "Remarque");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "textarea", 38, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 39)(15, "button", 40);
    \u0275\u0275listener("click", function ControleListComponent_Conditional_15_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelDecision());
    });
    \u0275\u0275text(16, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 41);
    \u0275\u0275listener("click", function ControleListComponent_Conditional_15_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r5);
      const remarkInput_r6 = \u0275\u0275reference(13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmDecision(remarkInput_r6.value));
    });
    \u0275\u0275template(18, ControleListComponent_Conditional_15_Conditional_18_Template, 1, 0, "mat-spinner", 42);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.pendingDecision() === "REFUSE" ? "Motif de refus" : "Modifications demand\xE9es");
    \u0275\u0275advance(13);
    \u0275\u0275classProp("refuse", ctx_r0.pendingDecision() === "REFUSE");
    \u0275\u0275property("disabled", ctx_r0.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(18, ctx_r0.submitting() ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.pendingDecision() === "REFUSE" ? "Refuser" : "Envoyer", " ");
  }
}
var ControleListComponent = class _ControleListComponent {
  constructor() {
    this.svc = inject(ControleService);
    this.auth = inject(AuthService);
    this.snack = inject(MatSnackBar);
    this.controles = signal([]);
    this.loading = signal(true);
    this.activeTab = signal("en-attente");
    this.showRemarkDialog = signal(false);
    this.pendingDecision = signal(null);
    this.pendingControle = signal(null);
    this.submitting = signal(false);
    this.DECISION_META = DECISION_META;
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    const userId = this.auth.currentUser()?.userId ?? "";
    this.svc.getEnAttente(userId).subscribe({
      next: (cs) => {
        this.controles.set(cs);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  setTab(tab) {
    this.activeTab.set(tab);
    this.load();
  }
  decide(c, decision) {
    if (decision === "VALIDE") {
      this.submitDecision(c, "VALIDE", void 0);
    } else {
      this.pendingControle.set(c);
      this.pendingDecision.set(decision);
      this.showRemarkDialog.set(true);
    }
  }
  cancelDecision() {
    this.showRemarkDialog.set(false);
    this.pendingControle.set(null);
    this.pendingDecision.set(null);
  }
  confirmDecision(remarque) {
    const c = this.pendingControle();
    const d = this.pendingDecision();
    if (!c || !d)
      return;
    this.submitDecision(c, d, remarque || void 0);
  }
  submitDecision(c, decision, remarque) {
    this.submitting.set(true);
    const payload = {
      decision,
      remarque
    };
    this.svc.applyDecision(c.id, payload).subscribe({
      next: (updated) => {
        this.controles.update((list) => list.map((x) => x.id === c.id ? updated : x));
        this.snack.open("D\xE9cision enregistr\xE9e", "OK", { duration: 3e3 });
        this.showRemarkDialog.set(false);
        this.pendingControle.set(null);
        this.pendingDecision.set(null);
        this.submitting.set(false);
        if (this.activeTab() === "en-attente") {
          this.controles.update((list) => list.filter((x) => x.id !== c.id));
        }
      },
      error: () => {
        this.snack.open("Erreur lors de la d\xE9cision", "Fermer", { duration: 4e3 });
        this.submitting.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function ControleListComponent_Factory(t) {
      return new (t || _ControleListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ControleListComponent, selectors: [["app-controle-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 16, vars: 9, consts: [["remarkInput", ""], [1, "page-wrap"], [1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "tab-bar"], [1, "tab", 3, "click"], [1, "tab-badge"], [1, "loader-wrap"], [1, "dialog-backdrop"], ["diameter", "36"], [1, "table-card"], [1, "data-table"], [1, "col-type"], [1, "col-decision"], [1, "col-date"], [1, "col-actions"], [1, "data-row"], [1, "plan-link", 3, "click", "routerLink"], [1, "link-icon"], [1, "type-tag"], [1, "decision-badge"], [1, "dec-icon"], [1, "rem-cell"], [1, "col-date", "text-muted"], [1, "col-actions", 3, "click"], [1, "inline-actions"], ["matTooltip", "Valider", 1, "dec-btn", "valide", 3, "click"], ["matTooltip", "Demander modification", 1, "dec-btn", "modif", 3, "click"], ["matTooltip", "Refuser", 1, "dec-btn", "refuse", 3, "click"], [1, "text-muted"], ["colspan", "6", 1, "empty-row"], [1, "dialog-backdrop", 3, "click"], [1, "dialog-box", 3, "click"], [1, "dialog-header"], [1, "dialog-close", 3, "click"], [1, "dialog-form"], [1, "field-group"], ["rows", "4", "placeholder", "D\xE9crire le motif ou les modifications \xE0 apporter\u2026", 1, "field-input", "field-textarea"], [1, "dialog-actions"], [1, "btn-cancel", 3, "click"], [1, "btn-submit", 3, "click", "disabled"], ["diameter", "16"]], template: function ControleListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h1", 3);
        \u0275\u0275text(4, "Contr\xF4les");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 5)(8, "button", 6);
        \u0275\u0275listener("click", function ControleListComponent_Template_button_click_8_listener() {
          return ctx.setTab("en-attente");
        });
        \u0275\u0275text(9, " En attente ");
        \u0275\u0275template(10, ControleListComponent_Conditional_10_Template, 2, 1, "span", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "button", 6);
        \u0275\u0275listener("click", function ControleListComponent_Template_button_click_11_listener() {
          return ctx.setTab("tous");
        });
        \u0275\u0275text(12, " Tous mes contr\xF4les ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(13, ControleListComponent_Conditional_13_Template, 2, 0, "div", 8)(14, ControleListComponent_Conditional_14_Template, 20, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275template(15, ControleListComponent_Conditional_15_Template, 20, 6, "div", 9);
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate2("", ctx.controles().length, " contr\xF4le", ctx.controles().length !== 1 ? "s" : "", " en attente");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.activeTab() === "en-attente");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(10, ctx.controles().length ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.activeTab() === "tous");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(13, ctx.loading() ? 13 : 14);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(15, ctx.showRemarkDialog() ? 15 : -1);
      }
    }, dependencies: [
      CommonModule,
      SlicePipe,
      DatePipe,
      RouterModule,
      RouterLink,
      ReactiveFormsModule,
      MatIconModule,
      MatIcon,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatTooltipModule,
      MatTooltip,
      MatSnackBarModule
    ], styles: ['\n\n.page-wrap[_ngcontent-%COMP%] {\n  max-width: 1100px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--db-text);\n  margin: 0;\n}\n.page-sub[_ngcontent-%COMP%] {\n  font-size: .85rem;\n  color: var(--db-text-secondary);\n  margin: 4px 0 0;\n}\n.tab-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  border-bottom: 2px solid var(--db-border);\n  margin-bottom: 20px;\n}\n.tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border: none;\n  background: none;\n  cursor: pointer;\n  font-size: .875rem;\n  font-weight: 500;\n  color: var(--db-text-secondary);\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  transition: all .15s;\n  &:hover {\n    color: var(--db-navy);\n  }\n  &.active {\n    color: var(--db-navy);\n    border-bottom-color: var(--db-navy);\n    font-weight: 600;\n  }\n}\n.tab-badge[_ngcontent-%COMP%] {\n  background: var(--db-orange);\n  color: #fff;\n  font-size: .65rem;\n  font-weight: 700;\n  padding: 1px 7px;\n  border-radius: 10px;\n  min-width: 20px;\n  text-align: center;\n}\n.loader-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.table-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid var(--db-border);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: .875rem;\n}\nthead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: #F8FAFC;\n  border-bottom: 1px solid var(--db-border);\n}\nth[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  font-size: .73rem;\n  font-weight: 600;\n  color: var(--db-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: .06em;\n  text-align: left;\n}\n.data-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--db-border);\n  &:last-child {\n    border-bottom: none;\n  }\n  &:hover {\n    background: #F8FAFC;\n  }\n}\ntd[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  vertical-align: middle;\n}\n.col-type[_ngcontent-%COMP%] {\n  width: 60px;\n}\n.col-decision[_ngcontent-%COMP%] {\n  width: 180px;\n}\n.col-date[_ngcontent-%COMP%] {\n  width: 110px;\n}\n.col-actions[_ngcontent-%COMP%] {\n  width: 200px;\n}\n.plan-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  color: var(--db-navy);\n  text-decoration: none;\n  font-family: "Courier New", monospace;\n  font-size: .82rem;\n  &:hover {\n    text-decoration: underline;\n  }\n}\n.link-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 16px;\n  height: 16px;\n}\n.type-tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 8px;\n  border-radius: 4px;\n  background: #EFF6FF;\n  color: var(--db-navy);\n  font-size: .78rem;\n  font-weight: 700;\n  font-family: "Courier New", monospace;\n  &.externe {\n    background: #EDE9FE;\n    color: #5B21B6;\n  }\n}\n.decision-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 3px 10px;\n  border-radius: 12px;\n  font-size: .78rem;\n  font-weight: 600;\n}\n.dec-icon[_ngcontent-%COMP%] {\n  font-size: .9rem;\n  width: 14px;\n  height: 14px;\n}\n.rem-cell[_ngcontent-%COMP%] {\n  font-size: .82rem;\n  color: var(--db-text-secondary);\n  max-width: 200px;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: var(--db-text-secondary);\n  font-size: .82rem;\n}\n.inline-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dec-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  border: none;\n  border-radius: 5px;\n  padding: 5px 10px;\n  font-size: .78rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all .12s;\n  mat-icon {\n    font-size: .9rem;\n    width: 14px;\n    height: 14px;\n  }\n  &.valide {\n    background: #D1FAE5;\n    color: #15803D;\n    &:hover {\n      background: #A7F3D0;\n    }\n  }\n  &.modif {\n    background: #EFF6FF;\n    color: #1D4ED8;\n    padding: 5px;\n    &:hover {\n      background: #DBEAFE;\n    }\n  }\n  &.refuse {\n    background: #FEE2E2;\n    color: #B91C1C;\n    padding: 5px;\n    &:hover {\n      background: #FECACA;\n    }\n  }\n}\n.empty-row[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 64px 16px !important;\n  color: var(--db-text-secondary);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  mat-icon {\n    font-size: 2.4rem;\n    opacity: .3;\n  }\n  small {\n    font-size: .8rem;\n    opacity: .7;\n  }\n}\n.dialog-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, .45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.dialog-box[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 10px;\n  width: 460px;\n  max-width: 95vw;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, .2);\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 24px 0;\n  h2 {\n    margin: 0;\n    font-size: 1.05rem;\n    font-weight: 700;\n    color: var(--db-text);\n  }\n}\n.dialog-close[_ngcontent-%COMP%] {\n  border: none;\n  background: none;\n  cursor: pointer;\n  color: var(--db-text-secondary);\n  padding: 4px;\n  border-radius: 4px;\n  display: flex;\n  &:hover {\n    background: #F3F4F6;\n  }\n}\n.dialog-form[_ngcontent-%COMP%] {\n  padding: 20px 24px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.field-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  font-weight: 600;\n  color: var(--db-text-secondary);\n}\n.field-input[_ngcontent-%COMP%] {\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  padding: 9px 12px;\n  font-size: .875rem;\n  color: var(--db-text);\n  outline: none;\n  font-family: inherit;\n  background: #fff;\n  &:focus {\n    border-color: var(--db-navy);\n  }\n}\n.field-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding-top: 16px;\n  border-top: 1px solid var(--db-border);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  padding: 9px 18px;\n  background: #fff;\n  cursor: pointer;\n  font-size: .875rem;\n  color: var(--db-text-secondary);\n  &:hover {\n    background: #F3F4F6;\n  }\n}\n.btn-submit[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: var(--db-navy);\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  padding: 9px 20px;\n  font-size: .875rem;\n  font-weight: 600;\n  cursor: pointer;\n  &.refuse {\n    background: #B91C1C;\n  }\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n}\n/*# sourceMappingURL=controle-list.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ControleListComponent, { className: "ControleListComponent", filePath: "src\\app\\features\\controles\\controle-list\\controle-list.component.ts", lineNumber: 298 });
})();
export {
  ControleListComponent
};
//# sourceMappingURL=chunk-ZXWZU7CE.js.map
