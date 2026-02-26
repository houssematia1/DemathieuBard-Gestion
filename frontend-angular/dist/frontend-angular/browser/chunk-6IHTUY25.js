import {
  MatDialogModule
} from "./chunk-I7JXHFN4.js";
import {
  MatSelectModule
} from "./chunk-C2W4MCSS.js";
import {
  MatInputModule
} from "./chunk-5O2E2F2I.js";
import {
  MatFormFieldModule
} from "./chunk-UJXEUIG5.js";
import {
  AffaireService,
  STATUT_AFFAIRE
} from "./chunk-HVNGPH4S.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-66T2SBBK.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-Y6YIWLLK.js";

// src/app/features/affaires/affaire-list/affaire-list.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/affaires", a0];
function AffaireListComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function AffaireListComponent_For_19_Template_button_click_0_listener() {
      const s_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.setFilter(s_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r4.filterStatut() === s_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.STATUT_AFFAIRE[s_r4].label, " ");
  }
}
function AffaireListComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "mat-spinner", 15);
    \u0275\u0275elementEnd();
  }
}
function AffaireListComponent_Conditional_23_For_17_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "slice");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind3(2, 2, a_r7.description, 0, 60), "", a_r7.description.length > 60 ? "\u2026" : "", "");
  }
}
function AffaireListComponent_Conditional_23_For_17_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function AffaireListComponent_Conditional_23_For_17_Conditional_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const a_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.confirmDelete(a_r7));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete_outline");
    \u0275\u0275elementEnd()();
  }
}
function AffaireListComponent_Conditional_23_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 23)(1, "td", 18)(2, "span", 25);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 19)(5, "span", 26);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, AffaireListComponent_Conditional_23_For_17_Conditional_7_Template, 3, 6, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 20)(9, "span", 28);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 21);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 21);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 29);
    \u0275\u0275listener("click", function AffaireListComponent_Conditional_23_For_17_Template_td_click_17_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(18, "div", 30)(19, "button", 31)(20, "mat-icon");
    \u0275\u0275text(21, "chevron_right");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(22, AffaireListComponent_Conditional_23_For_17_Conditional_22_Template, 3, 0, "button", 32);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const a_r7 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(19, _c0, a_r7.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r7.reference);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r7.nom);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, a_r7.description ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r4.STATUT_AFFAIRE[a_r7.statut].color)("background", ctx_r4.STATUT_AFFAIRE[a_r7.statut].bg);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.STATUT_AFFAIRE[a_r7.statut].label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 13, a_r7.dateDebut, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r7.dateFin ? \u0275\u0275pipeBind2(16, 16, a_r7.dateFin, "dd/MM/yyyy") : "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(21, _c0, a_r7.id));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(22, ctx_r4.canManage() ? 22 : -1);
  }
}
function AffaireListComponent_Conditional_23_ForEmpty_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 34)(2, "mat-icon");
    \u0275\u0275text(3, "inbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Aucune affaire trouv\xE9e");
    \u0275\u0275elementEnd()()();
  }
}
function AffaireListComponent_Conditional_23_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "button", 35);
    \u0275\u0275listener("click", function AffaireListComponent_Conditional_23_Conditional_19_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.goPage(ctx_r4.page() - 1));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "chevron_left");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 36);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 35);
    \u0275\u0275listener("click", function AffaireListComponent_Conditional_23_Conditional_19_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.goPage(ctx_r4.page() + 1));
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "chevron_right");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r4.page() === 0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("Page ", ctx_r4.page() + 1, " / ", ctx_r4.totalPages(), "");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r4.page() >= ctx_r4.totalPages() - 1);
  }
}
function AffaireListComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "table", 17)(2, "thead")(3, "tr")(4, "th", 18);
    \u0275\u0275text(5, "R\xE9f\xE9rence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 19);
    \u0275\u0275text(7, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 20);
    \u0275\u0275text(9, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 21);
    \u0275\u0275text(11, "D\xE9but");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 21);
    \u0275\u0275text(13, "Fin");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "th", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, AffaireListComponent_Conditional_23_For_17_Template, 23, 23, "tr", 23, _forTrack0, false, AffaireListComponent_Conditional_23_ForEmpty_18_Template, 6, 0, "tr");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(19, AffaireListComponent_Conditional_23_Conditional_19_Template, 9, 4, "div", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r4.affaires());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(19, ctx_r4.totalPages() > 1 ? 19 : -1);
  }
}
function AffaireListComponent_Conditional_24_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "Nom requis");
    \u0275\u0275elementEnd();
  }
}
function AffaireListComponent_Conditional_24_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 53);
  }
}
function AffaireListComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275listener("click", function AffaireListComponent_Conditional_24_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.closeDialog());
    });
    \u0275\u0275elementStart(1, "div", 38);
    \u0275\u0275listener("click", function AffaireListComponent_Conditional_24_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 39)(3, "h2");
    \u0275\u0275text(4, "Nouvelle affaire");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 40);
    \u0275\u0275listener("click", function AffaireListComponent_Conditional_24_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.closeDialog());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "form", 41);
    \u0275\u0275listener("ngSubmit", function AffaireListComponent_Conditional_24_Template_form_ngSubmit_8_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.submitCreate());
    });
    \u0275\u0275elementStart(9, "div", 42)(10, "label");
    \u0275\u0275text(11, "Nom ");
    \u0275\u0275elementStart(12, "span", 43);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(14, "input", 44);
    \u0275\u0275template(15, AffaireListComponent_Conditional_24_Conditional_15_Template, 2, 0, "span", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 42)(17, "label");
    \u0275\u0275text(18, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "textarea", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 47)(21, "div", 42)(22, "label");
    \u0275\u0275text(23, "Date d\xE9but ");
    \u0275\u0275elementStart(24, "span", 43);
    \u0275\u0275text(25, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(26, "input", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 42)(28, "label");
    \u0275\u0275text(29, "Date fin pr\xE9vue");
    \u0275\u0275elementEnd();
    \u0275\u0275element(30, "input", 49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 50)(32, "button", 51);
    \u0275\u0275listener("click", function AffaireListComponent_Conditional_24_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.closeDialog());
    });
    \u0275\u0275text(33, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 52);
    \u0275\u0275template(35, AffaireListComponent_Conditional_24_Conditional_35_Template, 1, 0, "mat-spinner", 53);
    \u0275\u0275text(36, " Cr\xE9er l'affaire ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("formGroup", ctx_r4.form);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(15, ((tmp_3_0 = ctx_r4.form.get("nom")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r4.form.get("nom")) == null ? null : tmp_3_0.touched) ? 15 : -1);
    \u0275\u0275advance(19);
    \u0275\u0275property("disabled", ctx_r4.form.invalid || ctx_r4.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(35, ctx_r4.submitting() ? 35 : -1);
  }
}
var AffaireListComponent = class _AffaireListComponent {
  constructor() {
    this.svc = inject(AffaireService);
    this.auth = inject(AuthService);
    this.snack = inject(MatSnackBar);
    this.fb = inject(FormBuilder);
    this.affaires = signal([]);
    this.loading = signal(true);
    this.total = signal(0);
    this.page = signal(0);
    this.totalPages = signal(1);
    this.filterStatut = signal(null);
    this.searchNom = signal("");
    this.showDialog = signal(false);
    this.submitting = signal(false);
    this.STATUT_AFFAIRE = STATUT_AFFAIRE;
    this.statutKeys = Object.keys(STATUT_AFFAIRE);
    this.form = this.fb.group({
      nom: ["", Validators.required],
      description: [""],
      dateDebut: ["", Validators.required],
      dateFin: [""]
    });
  }
  canManage() {
    const r = this.auth.userRole();
    return r === "ADMIN" || r === "CHEF_PROJET";
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    const nom = this.searchNom();
    const statut = this.filterStatut() ?? void 0;
    const obs = nom || statut ? this.svc.search(nom || void 0, statut, this.page(), 20) : this.svc.getAll(this.page(), 20);
    obs.subscribe({
      next: (r) => {
        this.affaires.set(r.content);
        this.total.set(r.totalElements);
        this.totalPages.set(r.totalPages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  onSearch(val) {
    this.searchNom.set(val);
    this.page.set(0);
    this.load();
  }
  setFilter(s) {
    this.filterStatut.set(s);
    this.page.set(0);
    this.load();
  }
  goPage(p) {
    this.page.set(p);
    this.load();
  }
  openCreateDialog() {
    this.form.reset();
    this.showDialog.set(true);
  }
  closeDialog() {
    this.showDialog.set(false);
  }
  submitCreate() {
    if (this.form.invalid)
      return;
    this.submitting.set(true);
    const v = this.form.value;
    const payload = {
      nom: v.nom,
      description: v.description || void 0,
      dateDebut: v.dateDebut,
      dateFin: v.dateFin || void 0
    };
    this.svc.create(payload).subscribe({
      next: () => {
        this.snack.open("Affaire cr\xE9\xE9e avec succ\xE8s", "OK", { duration: 3e3 });
        this.closeDialog();
        this.page.set(0);
        this.load();
        this.submitting.set(false);
      },
      error: () => {
        this.snack.open("Erreur lors de la cr\xE9ation", "Fermer", { duration: 4e3 });
        this.submitting.set(false);
      }
    });
  }
  confirmDelete(a) {
    if (!confirm(`Supprimer l'affaire ${a.reference} ?`))
      return;
    this.svc.delete(a.id).subscribe({
      next: () => {
        this.snack.open("Affaire supprim\xE9e", "OK", { duration: 3e3 });
        this.load();
      },
      error: () => this.snack.open("Erreur lors de la suppression", "Fermer", { duration: 4e3 })
    });
  }
  static {
    this.\u0275fac = function AffaireListComponent_Factory(t) {
      return new (t || _AffaireListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AffaireListComponent, selectors: [["app-affaire-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 25, vars: 6, consts: [["searchInput", ""], [1, "page-wrap"], [1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "btn-create", 3, "click"], [1, "filters-row"], [1, "search-wrap"], [1, "search-icon"], ["placeholder", "Rechercher par nom\u2026", 1, "search-input", 3, "input"], [1, "filter-chips"], [1, "chip", 3, "active"], [1, "chip", 3, "click"], [1, "loader-wrap"], [1, "dialog-backdrop"], ["diameter", "36"], [1, "table-card"], [1, "data-table"], [1, "col-ref"], [1, "col-nom"], [1, "col-statut"], [1, "col-date"], [1, "col-actions"], [1, "data-row", 3, "routerLink"], [1, "pagination"], [1, "ref-code"], [1, "nom-text"], [1, "desc-text"], [1, "statut-pill"], [1, "col-actions", 3, "click"], [1, "row-actions"], ["matTooltip", "Voir le d\xE9tail", 1, "action-btn", 3, "routerLink"], ["matTooltip", "Supprimer", 1, "action-btn", "danger"], ["matTooltip", "Supprimer", 1, "action-btn", "danger", 3, "click"], ["colspan", "6", 1, "empty-row"], [1, "page-btn", 3, "click", "disabled"], [1, "page-info"], [1, "dialog-backdrop", 3, "click"], [1, "dialog-box", 3, "click"], [1, "dialog-header"], [1, "dialog-close", 3, "click"], [1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "field-group"], [1, "req"], ["formControlName", "nom", "placeholder", "Ex: Construction Tour A", 1, "field-input"], [1, "field-error"], ["formControlName", "description", "placeholder", "Description de l'affaire\u2026", "rows", "3", 1, "field-input", "field-textarea"], [1, "field-row"], ["formControlName", "dateDebut", "type", "date", 1, "field-input"], ["formControlName", "dateFin", "type", "date", 1, "field-input"], [1, "dialog-actions"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "submit", 1, "btn-submit", 3, "disabled"], ["diameter", "16"]], template: function AffaireListComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h1", 3);
        \u0275\u0275text(4, "Affaires");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 5);
        \u0275\u0275listener("click", function AffaireListComponent_Template_button_click_7_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.openCreateDialog());
        });
        \u0275\u0275elementStart(8, "mat-icon");
        \u0275\u0275text(9, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(10, " Nouvelle affaire ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 6)(12, "div", 7)(13, "mat-icon", 8);
        \u0275\u0275text(14, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "input", 9, 0);
        \u0275\u0275listener("input", function AffaireListComponent_Template_input_input_15_listener() {
          \u0275\u0275restoreView(_r1);
          const searchInput_r2 = \u0275\u0275reference(16);
          return \u0275\u0275resetView(ctx.onSearch(searchInput_r2.value));
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "div", 10);
        \u0275\u0275repeaterCreate(18, AffaireListComponent_For_19_Template, 2, 3, "button", 11, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementStart(20, "button", 12);
        \u0275\u0275listener("click", function AffaireListComponent_Template_button_click_20_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.setFilter(null));
        });
        \u0275\u0275text(21, " Tous ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(22, AffaireListComponent_Conditional_22_Template, 2, 0, "div", 13)(23, AffaireListComponent_Conditional_23_Template, 20, 2);
        \u0275\u0275elementEnd();
        \u0275\u0275template(24, AffaireListComponent_Conditional_24_Template, 37, 4, "div", 14);
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate2("", ctx.total(), " affaire", ctx.total() !== 1 ? "s" : "", " au total");
        \u0275\u0275advance(12);
        \u0275\u0275repeater(ctx.statutKeys);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.filterStatut() === null);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(22, ctx.loading() ? 22 : 23);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(24, ctx.showDialog() ? 24 : -1);
      }
    }, dependencies: [CommonModule, SlicePipe, DatePipe, RouterModule, RouterLink, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatIconModule, MatIcon, MatButtonModule, MatTooltipModule, MatTooltip, MatDialogModule, MatSnackBarModule, MatProgressSpinnerModule, MatProgressSpinner, MatFormFieldModule, MatInputModule, MatSelectModule], styles: ['\n\n.page-wrap[_ngcontent-%COMP%] {\n  max-width: 1200px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--db-text);\n  margin: 0;\n}\n.page-sub[_ngcontent-%COMP%] {\n  font-size: .85rem;\n  color: var(--db-text-secondary);\n  margin: 4px 0 0;\n}\n.btn-create[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: var(--db-navy);\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  padding: 10px 18px;\n  font-size: .875rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background .15s;\n  mat-icon {\n    font-size: 1.1rem;\n    width: 18px;\n    height: 18px;\n  }\n  &:hover {\n    background: var(--db-navy-darker, #091B2E);\n  }\n}\n.filters-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.search-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 10px;\n  font-size: 1.1rem;\n  color: var(--db-text-secondary);\n  pointer-events: none;\n}\n.search-input[_ngcontent-%COMP%] {\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  padding: 8px 12px 8px 36px;\n  font-size: .875rem;\n  width: 260px;\n  outline: none;\n  background: #fff;\n  color: var(--db-text);\n  &:focus {\n    border-color: var(--db-navy);\n  }\n}\n.filter-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.chip[_ngcontent-%COMP%] {\n  border: 1px solid var(--db-border);\n  border-radius: 20px;\n  padding: 4px 14px;\n  font-size: .8rem;\n  font-weight: 500;\n  cursor: pointer;\n  background: #fff;\n  color: var(--db-text-secondary);\n  transition: all .12s;\n  &:hover {\n    border-color: var(--db-navy);\n    color: var(--db-navy);\n  }\n  &.active {\n    background: var(--db-navy);\n    color: #fff;\n    border-color: var(--db-navy);\n  }\n}\n.loader-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.table-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid var(--db-border);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: .875rem;\n}\nthead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: #F8FAFC;\n  border-bottom: 1px solid var(--db-border);\n}\nth[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  font-size: .75rem;\n  font-weight: 600;\n  color: var(--db-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: .06em;\n  text-align: left;\n  white-space: nowrap;\n}\n.data-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--db-border);\n  cursor: pointer;\n  transition: background .1s;\n  &:last-child {\n    border-bottom: none;\n  }\n  &:hover {\n    background: #F8FAFC;\n  }\n  &:hover .row-actions {\n    opacity: 1;\n  }\n}\ntd[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  vertical-align: middle;\n}\n.col-ref[_ngcontent-%COMP%] {\n  width: 160px;\n}\n.col-statut[_ngcontent-%COMP%] {\n  width: 140px;\n}\n.col-date[_ngcontent-%COMP%] {\n  width: 120px;\n}\n.col-actions[_ngcontent-%COMP%] {\n  width: 80px;\n}\n.ref-code[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: .82rem;\n  font-weight: 600;\n  color: var(--db-navy);\n  background: #EFF6FF;\n  padding: 2px 8px;\n  border-radius: 4px;\n}\n.col-nom[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.nom-text[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--db-text);\n}\n.desc-text[_ngcontent-%COMP%] {\n  font-size: .78rem;\n  color: var(--db-text-secondary);\n}\n.statut-pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 10px;\n  border-radius: 12px;\n  font-size: .75rem;\n  font-weight: 600;\n}\n.row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  justify-content: flex-end;\n  opacity: 0;\n  transition: opacity .1s;\n}\n.action-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  border-radius: 4px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  color: var(--db-text-secondary);\n  transition: all .12s;\n  mat-icon {\n    font-size: 1.1rem;\n    width: 18px;\n    height: 18px;\n  }\n  &:hover {\n    background: #EFF6FF;\n    color: var(--db-navy);\n  }\n  &.danger:hover {\n    background: #FEF2F2;\n    color: #B91C1C;\n  }\n}\n.empty-row[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 16px !important;\n  color: var(--db-text-secondary);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  mat-icon {\n    font-size: 2rem;\n    opacity: .4;\n  }\n}\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 12px;\n  border-top: 1px solid var(--db-border);\n}\n.page-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  background: #fff;\n  cursor: pointer;\n  color: var(--db-text-secondary);\n  &:disabled {\n    opacity: .4;\n    cursor: not-allowed;\n  }\n  &:not(:disabled):hover {\n    border-color: var(--db-navy);\n    color: var(--db-navy);\n  }\n}\n.page-info[_ngcontent-%COMP%] {\n  font-size: .82rem;\n  color: var(--db-text-secondary);\n}\n.dialog-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, .45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.dialog-box[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 10px;\n  width: 520px;\n  max-width: 95vw;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, .2);\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 24px 0;\n  h2 {\n    margin: 0;\n    font-size: 1.1rem;\n    font-weight: 700;\n    color: var(--db-text);\n  }\n}\n.dialog-close[_ngcontent-%COMP%] {\n  border: none;\n  background: none;\n  cursor: pointer;\n  color: var(--db-text-secondary);\n  padding: 4px;\n  border-radius: 4px;\n  display: flex;\n  &:hover {\n    background: #F3F4F6;\n  }\n}\n.dialog-form[_ngcontent-%COMP%] {\n  padding: 20px 24px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.field-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.field-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  font-weight: 600;\n  color: var(--db-text-secondary);\n}\n.req[_ngcontent-%COMP%] {\n  color: #B91C1C;\n}\n.field-input[_ngcontent-%COMP%] {\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  padding: 9px 12px;\n  font-size: .875rem;\n  color: var(--db-text);\n  outline: none;\n  font-family: inherit;\n  &:focus {\n    border-color: var(--db-navy);\n  }\n}\n.field-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 72px;\n}\n.field-error[_ngcontent-%COMP%] {\n  font-size: .75rem;\n  color: #B91C1C;\n}\n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 4px;\n  padding-top: 16px;\n  border-top: 1px solid var(--db-border);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  padding: 9px 18px;\n  background: #fff;\n  cursor: pointer;\n  font-size: .875rem;\n  color: var(--db-text-secondary);\n  &:hover {\n    background: #F3F4F6;\n  }\n}\n.btn-submit[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: var(--db-navy);\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  padding: 9px 20px;\n  font-size: .875rem;\n  font-weight: 600;\n  cursor: pointer;\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n  &:not(:disabled):hover {\n    background: var(--db-navy-darker, #091B2E);\n  }\n}\n/*# sourceMappingURL=affaire-list.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AffaireListComponent, { className: "AffaireListComponent", filePath: "src\\app\\features\\affaires\\affaire-list\\affaire-list.component.ts", lineNumber: 375 });
})();
export {
  AffaireListComponent
};
//# sourceMappingURL=chunk-6IHTUY25.js.map
