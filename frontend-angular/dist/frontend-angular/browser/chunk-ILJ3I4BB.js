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
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-QKX6J2Q5.js";
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
  ActivatedRoute,
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
  ɵɵpipeBind4,
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
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-Y6YIWLLK.js";

// src/app/features/affaires/affaire-detail/affaire-detail.component.ts
var _forTrack0 = ($index, $item) => $item.date;
var _forTrack1 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/plans", a0];
function AffaireDetailComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "mat-spinner", 7);
    \u0275\u0275elementEnd();
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r1.description);
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.openEditDialog());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Modifier ");
    \u0275\u0275elementEnd();
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_38_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.openPlanDialog());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Nouveau plan ");
    \u0275\u0275elementEnd();
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "mat-spinner", 29);
    \u0275\u0275elementEnd();
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_40_For_17_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 41);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r6.derniereVersion.indice);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" v", p_r6.derniereVersion.numeroVersion, "");
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_40_For_17_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_40_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 32)(1, "td")(2, "span", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "span", 34);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275template(8, AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_40_For_17_Conditional_8_Template, 4, 2)(9, AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_40_For_17_Conditional_9_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td")(11, "span", 35);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 36);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 37);
    \u0275\u0275listener("click", function AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_40_For_17_Template_td_click_16_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(17, "div", 38)(18, "button", 39)(19, "mat-icon");
    \u0275\u0275text(20, "chevron_right");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(18, _c0, p_r6.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r6.nom);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r2.TYPE_PLAN[p_r6.typePlan].color)("background", ctx_r2.TYPE_PLAN[p_r6.typePlan].bg);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r6.typePlan, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(8, p_r6.derniereVersion ? 8 : 9);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("color", ctx_r2.STATUT_PLAN[p_r6.statut].color)("background", ctx_r2.STATUT_PLAN[p_r6.statut].bg);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.STATUT_PLAN[p_r6.statut].label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 15, p_r6.dateCreation, "dd/MM/yyyy"));
    \u0275\u0275advance(4);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(20, _c0, p_r6.id));
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_40_ForEmpty_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 42)(2, "mat-icon");
    \u0275\u0275text(3, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Aucun plan pour cette affaire");
    \u0275\u0275elementEnd()()();
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "table", 31)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Dernier indice");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Date cr\xE9ation");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_40_For_17_Template, 21, 22, "tr", 32, _forTrack1, false, AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_40_ForEmpty_18_Template, 6, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r2.plans());
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_0_For_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275element(1, "div", 43);
    \u0275\u0275elementStart(2, "div", 44)(3, "span", 45);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 46);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 47);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const h_r7 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(h_r7.action);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(h_r7.details);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 3, h_r7.date, "dd/MM/yyyy HH:mm"));
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_0_ForEmpty_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1, "Aucun historique.");
    \u0275\u0275elementEnd();
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9)(2, "span", 10);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1", 11);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_6_Template, 2, 1, "p", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 13)(8, "span", 14);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_10_Template, 4, 0, "button", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 16)(12, "div", 17)(13, "div", 18);
    \u0275\u0275text(14, "Date de d\xE9but");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 19);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 17)(19, "div", 18);
    \u0275\u0275text(20, "Date de fin pr\xE9vue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 19);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 17)(25, "div", 18);
    \u0275\u0275text(26, "Cr\xE9\xE9e par");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 19);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 17)(30, "div", 18);
    \u0275\u0275text(31, "Derni\xE8re modification");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 19);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 20)(36, "h2", 21);
    \u0275\u0275text(37, "Plans");
    \u0275\u0275elementEnd();
    \u0275\u0275template(38, AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_38_Template, 4, 0, "button", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275template(39, AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_39_Template, 2, 0, "div", 5)(40, AffaireDetailComponent_Conditional_9_Conditional_0_Conditional_40_Template, 19, 1);
    \u0275\u0275elementStart(41, "div", 23)(42, "h2", 21);
    \u0275\u0275text(43, "Historique");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 24);
    \u0275\u0275repeaterCreate(45, AffaireDetailComponent_Conditional_9_Conditional_0_For_46_Template, 10, 6, "div", 25, _forTrack0, false, AffaireDetailComponent_Conditional_9_Conditional_0_ForEmpty_47_Template, 2, 0, "p", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r1 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r1.reference);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r1.nom);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, a_r1.description ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r2.STATUT_AFFAIRE[a_r1.statut].color)("background", ctx_r2.STATUT_AFFAIRE[a_r1.statut].bg);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.STATUT_AFFAIRE[a_r1.statut].label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(10, ctx_r2.canManage() ? 10 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(17, 16, a_r1.dateDebut, "dd MMMM yyyy", "", "fr"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(a_r1.dateFin ? \u0275\u0275pipeBind4(23, 21, a_r1.dateFin, "dd MMMM yyyy", "", "fr") : "Non d\xE9finie");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(a_r1.creePar);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(34, 26, a_r1.dateDerniereModification, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(38, ctx_r2.canCreate() ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(39, ctx_r2.loadingPlans() ? 39 : 40);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(a_r1.historique);
  }
}
function AffaireDetailComponent_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 36);
    \u0275\u0275text(1, "Affaire introuvable.");
    \u0275\u0275elementEnd();
  }
}
function AffaireDetailComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AffaireDetailComponent_Conditional_9_Conditional_0_Template, 48, 29)(1, AffaireDetailComponent_Conditional_9_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, (tmp_1_0 = ctx_r2.affaire()) ? 0 : 1, tmp_1_0);
  }
}
function AffaireDetailComponent_Conditional_10_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", s_r9);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.STATUT_AFFAIRE[s_r9].label);
  }
}
function AffaireDetailComponent_Conditional_10_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 65);
  }
}
function AffaireDetailComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275listener("click", function AffaireDetailComponent_Conditional_10_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeEditDialog());
    });
    \u0275\u0275elementStart(1, "div", 49);
    \u0275\u0275listener("click", function AffaireDetailComponent_Conditional_10_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 50)(3, "h2");
    \u0275\u0275text(4, "Modifier l'affaire");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 51);
    \u0275\u0275listener("click", function AffaireDetailComponent_Conditional_10_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeEditDialog());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "form", 52);
    \u0275\u0275listener("ngSubmit", function AffaireDetailComponent_Conditional_10_Template_form_ngSubmit_8_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.submitEdit());
    });
    \u0275\u0275elementStart(9, "div", 53)(10, "label");
    \u0275\u0275text(11, "Nom ");
    \u0275\u0275elementStart(12, "span", 54);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(14, "input", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 53)(16, "label");
    \u0275\u0275text(17, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "textarea", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 57)(20, "div", 53)(21, "label");
    \u0275\u0275text(22, "Date d\xE9but");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "input", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 53)(25, "label");
    \u0275\u0275text(26, "Date fin");
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "input", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 53)(29, "label");
    \u0275\u0275text(30, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "select", 60);
    \u0275\u0275repeaterCreate(32, AffaireDetailComponent_Conditional_10_For_33_Template, 2, 2, "option", 61, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 62)(35, "button", 63);
    \u0275\u0275listener("click", function AffaireDetailComponent_Conditional_10_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeEditDialog());
    });
    \u0275\u0275text(36, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 64);
    \u0275\u0275template(38, AffaireDetailComponent_Conditional_10_Conditional_38_Template, 1, 0, "mat-spinner", 65);
    \u0275\u0275text(39, " Enregistrer ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("formGroup", ctx_r2.editForm);
    \u0275\u0275advance(24);
    \u0275\u0275repeater(ctx_r2.statutKeys);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r2.editForm.invalid || ctx_r2.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(38, ctx_r2.submitting() ? 38 : -1);
  }
}
function AffaireDetailComponent_Conditional_11_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", t_r11);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", t_r11, " \u2014 ", ctx_r2.TYPE_PLAN[t_r11].label, "");
  }
}
function AffaireDetailComponent_Conditional_11_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 65);
  }
}
function AffaireDetailComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275listener("click", function AffaireDetailComponent_Conditional_11_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closePlanDialog());
    });
    \u0275\u0275elementStart(1, "div", 49);
    \u0275\u0275listener("click", function AffaireDetailComponent_Conditional_11_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 50)(3, "h2");
    \u0275\u0275text(4, "Nouveau plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 51);
    \u0275\u0275listener("click", function AffaireDetailComponent_Conditional_11_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closePlanDialog());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "form", 52);
    \u0275\u0275listener("ngSubmit", function AffaireDetailComponent_Conditional_11_Template_form_ngSubmit_8_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.submitPlan());
    });
    \u0275\u0275elementStart(9, "div", 53)(10, "label");
    \u0275\u0275text(11, "Nom ");
    \u0275\u0275elementStart(12, "span", 54);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(14, "input", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 53)(16, "label");
    \u0275\u0275text(17, "Type de plan ");
    \u0275\u0275elementStart(18, "span", 54);
    \u0275\u0275text(19, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "select", 67);
    \u0275\u0275repeaterCreate(21, AffaireDetailComponent_Conditional_11_For_22_Template, 2, 3, "option", 61, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 53)(24, "label");
    \u0275\u0275text(25, "Commentaire (version initiale)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "textarea", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 62)(28, "button", 63);
    \u0275\u0275listener("click", function AffaireDetailComponent_Conditional_11_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closePlanDialog());
    });
    \u0275\u0275text(29, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 64);
    \u0275\u0275template(31, AffaireDetailComponent_Conditional_11_Conditional_31_Template, 1, 0, "mat-spinner", 65);
    \u0275\u0275text(32, " Cr\xE9er le plan ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("formGroup", ctx_r2.planForm);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r2.typePlanKeys);
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", ctx_r2.planForm.invalid || ctx_r2.submittingPlan());
    \u0275\u0275advance();
    \u0275\u0275conditional(31, ctx_r2.submittingPlan() ? 31 : -1);
  }
}
var AffaireDetailComponent = class _AffaireDetailComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.affaireSvc = inject(AffaireService);
    this.planSvc = inject(PlanService);
    this.auth = inject(AuthService);
    this.snack = inject(MatSnackBar);
    this.fb = inject(FormBuilder);
    this.affaire = signal(null);
    this.plans = signal([]);
    this.loading = signal(true);
    this.loadingPlans = signal(true);
    this.showEditDialog = signal(false);
    this.showPlanDialog = signal(false);
    this.submitting = signal(false);
    this.submittingPlan = signal(false);
    this.STATUT_AFFAIRE = STATUT_AFFAIRE;
    this.STATUT_PLAN = STATUT_PLAN;
    this.TYPE_PLAN = TYPE_PLAN;
    this.statutKeys = Object.keys(STATUT_AFFAIRE);
    this.typePlanKeys = Object.keys(TYPE_PLAN);
    this.editForm = this.fb.group({
      nom: ["", Validators.required],
      description: [""],
      dateDebut: ["", Validators.required],
      dateFin: [""],
      statut: [""]
    });
    this.planForm = this.fb.group({
      nom: ["", Validators.required],
      typePlan: ["COF", Validators.required],
      commentaire: [""]
    });
  }
  canManage() {
    const r = this.auth.userRole();
    return r === "ADMIN" || r === "CHEF_PROJET";
  }
  canCreate() {
    const r = this.auth.userRole();
    return ["ADMIN", "CHEF_PROJET", "PROJETEUR"].includes(r ?? "");
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.affaireSvc.getById(id).subscribe({
      next: (a) => {
        this.affaire.set(a);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
    this.planSvc.getByAffaire(id).subscribe({
      next: (p) => {
        this.plans.set(p);
        this.loadingPlans.set(false);
      },
      error: () => this.loadingPlans.set(false)
    });
  }
  openEditDialog() {
    const a = this.affaire();
    this.editForm.patchValue({
      nom: a.nom,
      description: a.description ?? "",
      dateDebut: a.dateDebut?.slice(0, 10) ?? "",
      dateFin: a.dateFin?.slice(0, 10) ?? "",
      statut: a.statut
    });
    this.showEditDialog.set(true);
  }
  closeEditDialog() {
    this.showEditDialog.set(false);
  }
  submitEdit() {
    if (this.editForm.invalid)
      return;
    this.submitting.set(true);
    const v = this.editForm.value;
    const id = this.affaire().id;
    const payload = {
      nom: v.nom,
      description: v.description || void 0,
      dateDebut: v.dateDebut,
      dateFin: v.dateFin || void 0,
      statut: v.statut
    };
    this.affaireSvc.update(id, payload).subscribe({
      next: (updated) => {
        this.affaire.set(updated);
        this.snack.open("Affaire mise \xE0 jour", "OK", { duration: 3e3 });
        this.closeEditDialog();
        this.submitting.set(false);
      },
      error: () => {
        this.snack.open("Erreur lors de la mise \xE0 jour", "Fermer", { duration: 4e3 });
        this.submitting.set(false);
      }
    });
  }
  openPlanDialog() {
    this.planForm.reset({ typePlan: "COF" });
    this.showPlanDialog.set(true);
  }
  closePlanDialog() {
    this.showPlanDialog.set(false);
  }
  submitPlan() {
    if (this.planForm.invalid)
      return;
    this.submittingPlan.set(true);
    const v = this.planForm.value;
    const payload = {
      affaireId: this.affaire().id,
      nom: v.nom,
      typePlan: v.typePlan,
      commentaire: v.commentaire || void 0
    };
    this.planSvc.create(payload).subscribe({
      next: (p) => {
        this.plans.update((list) => [p, ...list]);
        this.snack.open("Plan cr\xE9\xE9 avec succ\xE8s", "OK", { duration: 3e3 });
        this.closePlanDialog();
        this.submittingPlan.set(false);
      },
      error: () => {
        this.snack.open("Erreur lors de la cr\xE9ation", "Fermer", { duration: 4e3 });
        this.submittingPlan.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function AffaireDetailComponent_Factory(t) {
      return new (t || _AffaireDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AffaireDetailComponent, selectors: [["app-affaire-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 12, vars: 4, consts: [[1, "page-wrap"], [1, "breadcrumb"], ["routerLink", "/affaires", 1, "bc-link"], [1, "bc-sep"], [1, "bc-cur"], [1, "loader-wrap"], [1, "dialog-backdrop"], ["diameter", "36"], [1, "affaire-header"], [1, "affaire-meta"], [1, "affaire-ref"], [1, "affaire-nom"], [1, "affaire-desc"], [1, "header-right"], [1, "statut-badge"], [1, "btn-edit"], [1, "info-grid"], [1, "info-card"], [1, "info-label"], [1, "info-val"], [1, "section-header"], [1, "section-title"], [1, "btn-add-plan"], [1, "section-header", 2, "margin-top", "32px"], [1, "historique-list"], [1, "hist-row"], [1, "text-muted", 2, "padding", "16px 0"], [1, "btn-edit", 3, "click"], [1, "btn-add-plan", 3, "click"], ["diameter", "28"], [1, "table-card"], [1, "data-table"], [1, "data-row", 3, "routerLink"], [1, "plan-nom"], [1, "type-badge"], [1, "statut-pill"], [1, "text-muted"], [1, "col-actions", 3, "click"], [1, "row-actions"], [1, "action-btn", 3, "routerLink"], [1, "indice-badge"], [1, "ver-num"], ["colspan", "6", 1, "empty-row"], [1, "hist-dot"], [1, "hist-body"], [1, "hist-action"], [1, "hist-details"], [1, "hist-date"], [1, "dialog-backdrop", 3, "click"], [1, "dialog-box", 3, "click"], [1, "dialog-header"], [1, "dialog-close", 3, "click"], [1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "field-group"], [1, "req"], ["formControlName", "nom", 1, "field-input"], ["formControlName", "description", "rows", "3", 1, "field-input", "field-textarea"], [1, "field-row"], ["formControlName", "dateDebut", "type", "date", 1, "field-input"], ["formControlName", "dateFin", "type", "date", 1, "field-input"], ["formControlName", "statut", 1, "field-input", "field-select"], [3, "value"], [1, "dialog-actions"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "submit", 1, "btn-submit", 3, "disabled"], ["diameter", "16"], ["formControlName", "nom", "placeholder", "Ex: Plan coffrage RDC", 1, "field-input"], ["formControlName", "typePlan", 1, "field-input", "field-select"], ["formControlName", "commentaire", "rows", "2", 1, "field-input", "field-textarea"]], template: function AffaireDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
        \u0275\u0275text(3, "Affaires");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "mat-icon", 3);
        \u0275\u0275text(5, "chevron_right");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "span", 4);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, AffaireDetailComponent_Conditional_8_Template, 2, 0, "div", 5)(9, AffaireDetailComponent_Conditional_9_Template, 2, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, AffaireDetailComponent_Conditional_10_Template, 40, 3, "div", 6)(11, AffaireDetailComponent_Conditional_11_Template, 33, 3, "div", 6);
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate((tmp_0_0 = (tmp_0_0 = ctx.affaire()) == null ? null : tmp_0_0.reference) !== null && tmp_0_0 !== void 0 ? tmp_0_0 : "\u2026");
        \u0275\u0275advance();
        \u0275\u0275conditional(8, ctx.loading() ? 8 : 9);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(10, ctx.showEditDialog() ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(11, ctx.showPlanDialog() ? 11 : -1);
      }
    }, dependencies: [
      CommonModule,
      DatePipe,
      RouterModule,
      RouterLink,
      ReactiveFormsModule,
      \u0275NgNoValidate,
      NgSelectOption,
      \u0275NgSelectMultipleOption,
      DefaultValueAccessor,
      SelectControlValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      FormGroupDirective,
      FormControlName,
      MatIconModule,
      MatIcon,
      MatButtonModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatSnackBarModule
    ], styles: ['\n\n.page-wrap[_ngcontent-%COMP%] {\n  max-width: 1100px;\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-bottom: 20px;\n  font-size: .85rem;\n}\n.bc-link[_ngcontent-%COMP%] {\n  color: var(--db-navy);\n  text-decoration: none;\n  &:hover {\n    text-decoration: underline;\n  }\n}\n.bc-sep[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--db-text-secondary);\n}\n.bc-cur[_ngcontent-%COMP%] {\n  color: var(--db-text-secondary);\n}\n.loader-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.affaire-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  gap: 16px;\n}\n.affaire-ref[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: .82rem;\n  font-weight: 600;\n  color: var(--db-navy);\n  background: #EFF6FF;\n  padding: 2px 8px;\n  border-radius: 4px;\n  display: inline-block;\n  margin-bottom: 8px;\n}\n.affaire-nom[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 700;\n  margin: 0 0 4px;\n  color: var(--db-text);\n}\n.affaire-desc[_ngcontent-%COMP%] {\n  font-size: .9rem;\n  color: var(--db-text-secondary);\n  margin: 0;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-shrink: 0;\n}\n.statut-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 5px 14px;\n  border-radius: 20px;\n  font-size: .8rem;\n  font-weight: 600;\n}\n.btn-edit[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  padding: 7px 14px;\n  background: #fff;\n  cursor: pointer;\n  font-size: .875rem;\n  font-weight: 500;\n  color: var(--db-text);\n  mat-icon {\n    font-size: 1rem;\n    width: 16px;\n    height: 16px;\n  }\n  &:hover {\n    background: #F3F4F6;\n  }\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n  margin-bottom: 28px;\n}\n.info-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid var(--db-border);\n  border-radius: 8px;\n  padding: 14px 16px;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-size: .73rem;\n  font-weight: 600;\n  color: var(--db-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: .06em;\n  margin-bottom: 6px;\n}\n.info-val[_ngcontent-%COMP%] {\n  font-size: .9rem;\n  font-weight: 500;\n  color: var(--db-text);\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  margin: 0;\n  color: var(--db-text);\n}\n.btn-add-plan[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  background: var(--db-navy);\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  padding: 8px 14px;\n  font-size: .82rem;\n  font-weight: 600;\n  cursor: pointer;\n  mat-icon {\n    font-size: 1rem;\n    width: 16px;\n    height: 16px;\n  }\n  &:hover {\n    background: var(--db-navy-darker, #091B2E);\n  }\n}\n.table-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid var(--db-border);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: .875rem;\n}\nthead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: #F8FAFC;\n  border-bottom: 1px solid var(--db-border);\n}\nth[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  font-size: .73rem;\n  font-weight: 600;\n  color: var(--db-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: .06em;\n  text-align: left;\n}\n.data-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--db-border);\n  cursor: pointer;\n  transition: background .1s;\n  &:last-child {\n    border-bottom: none;\n  }\n  &:hover {\n    background: #F8FAFC;\n  }\n  &:hover .row-actions {\n    opacity: 1;\n  }\n}\ntd[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  vertical-align: middle;\n}\n.plan-nom[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--db-text);\n}\n.type-badge[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: .78rem;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 4px;\n}\n.indice-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  background: var(--db-navy);\n  color: #fff;\n  font-weight: 700;\n  font-size: .85rem;\n}\n.ver-num[_ngcontent-%COMP%] {\n  font-size: .78rem;\n  color: var(--db-text-secondary);\n}\n.statut-pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 10px;\n  border-radius: 12px;\n  font-size: .75rem;\n  font-weight: 600;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: var(--db-text-secondary);\n  font-size: .82rem;\n}\n.col-actions[_ngcontent-%COMP%] {\n  width: 60px;\n}\n.row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  opacity: 0;\n  transition: opacity .1s;\n}\n.action-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border-radius: 4px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  color: var(--db-text-secondary);\n  mat-icon {\n    font-size: 1.1rem;\n    width: 18px;\n    height: 18px;\n  }\n  &:hover {\n    background: #EFF6FF;\n    color: var(--db-navy);\n  }\n}\n.empty-row[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 16px !important;\n  color: var(--db-text-secondary);\n  mat-icon {\n    font-size: 1.8rem;\n    opacity: .4;\n    display: block;\n    margin: 0 auto 8px;\n  }\n}\n.historique-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.hist-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 10px 0;\n  border-bottom: 1px solid var(--db-border);\n  &:last-child {\n    border-bottom: none;\n  }\n}\n.hist-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--db-navy);\n  margin-top: 6px;\n  flex-shrink: 0;\n}\n.hist-body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.hist-action[_ngcontent-%COMP%] {\n  font-size: .875rem;\n  font-weight: 600;\n  color: var(--db-text);\n}\n.hist-details[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  color: var(--db-text-secondary);\n}\n.hist-date[_ngcontent-%COMP%] {\n  font-size: .78rem;\n  color: var(--db-text-secondary);\n  white-space: nowrap;\n}\n.dialog-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, .45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.dialog-box[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 10px;\n  width: 520px;\n  max-width: 95vw;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, .2);\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 24px 0;\n  h2 {\n    margin: 0;\n    font-size: 1.1rem;\n    font-weight: 700;\n    color: var(--db-text);\n  }\n}\n.dialog-close[_ngcontent-%COMP%] {\n  border: none;\n  background: none;\n  cursor: pointer;\n  color: var(--db-text-secondary);\n  padding: 4px;\n  border-radius: 4px;\n  display: flex;\n  &:hover {\n    background: #F3F4F6;\n  }\n}\n.dialog-form[_ngcontent-%COMP%] {\n  padding: 20px 24px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.field-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.field-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  font-weight: 600;\n  color: var(--db-text-secondary);\n}\n.req[_ngcontent-%COMP%] {\n  color: #B91C1C;\n}\n.field-input[_ngcontent-%COMP%] {\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  padding: 9px 12px;\n  font-size: .875rem;\n  color: var(--db-text);\n  outline: none;\n  font-family: inherit;\n  background: #fff;\n  &:focus {\n    border-color: var(--db-navy);\n  }\n}\n.field-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 68px;\n}\n.field-select[_ngcontent-%COMP%] {\n  appearance: auto;\n}\n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 4px;\n  padding-top: 16px;\n  border-top: 1px solid var(--db-border);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  padding: 9px 18px;\n  background: #fff;\n  cursor: pointer;\n  font-size: .875rem;\n  color: var(--db-text-secondary);\n  &:hover {\n    background: #F3F4F6;\n  }\n}\n.btn-submit[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: var(--db-navy);\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  padding: 9px 20px;\n  font-size: .875rem;\n  font-weight: 600;\n  cursor: pointer;\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n  &:not(:disabled):hover {\n    background: var(--db-navy-darker, #091B2E);\n  }\n}\n@media (max-width: 768px) {\n  .info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .affaire-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=affaire-detail.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AffaireDetailComponent, { className: "AffaireDetailComponent", filePath: "src\\app\\features\\affaires\\affaire-detail\\affaire-detail.component.ts", lineNumber: 459 });
})();
export {
  AffaireDetailComponent
};
//# sourceMappingURL=chunk-ILJ3I4BB.js.map
