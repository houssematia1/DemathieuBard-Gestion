import {
  ControleService,
  DECISION_META
} from "./chunk-N6SVYKEH.js";
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-Y6YIWLLK.js";

// src/app/features/plans/plan-detail/plan-detail.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.idVersion;
var _forTrack2 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/affaires", a0];
function PlanDetailComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 7);
    \u0275\u0275text(1, "Affaire");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "mat-icon", 3);
    \u0275\u0275text(3, "chevron_right");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c0, ctx_r0.plan().affaireId));
  }
}
function PlanDetailComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "mat-spinner", 8);
    \u0275\u0275elementEnd();
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Indice ", p_r2.derniereVersion.indice, "");
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275element(1, "div", 27);
    \u0275\u0275elementStart(2, "span", 28);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r3 = ctx.$implicit;
    const p_r2 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("done", ctx_r0.STATUT_PLAN[p_r2.statut].step >= step_r3.step)("current", p_r2.statut === step_r3.key);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.STATUT_PLAN[step_r3.key].label);
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.soumettre());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "send");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Soumettre \xE0 contr\xF4le ");
    \u0275\u0275elementEnd();
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openVersionDialog());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Nouvelle version ");
    \u0275\u0275elementEnd();
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openControleDialog());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "fact_check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Cr\xE9er un contr\xF4le ");
    \u0275\u0275elementEnd();
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.applyVisa());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Apposer le visa ");
    \u0275\u0275elementEnd();
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_For_21_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 35);
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_For_21_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(v_r8.commentaire);
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_For_21_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 41)(1, "mat-icon");
    \u0275\u0275text(2, "attach_file");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Voir le fichier ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", v_r8.fichierUrl, \u0275\u0275sanitizeUrl);
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_For_21_Conditional_16_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "mat-icon", 46);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275styleProp("color", ctx_r0.DECISION_META[c_r9.decision].color)("border-color", ctx_r0.DECISION_META[c_r9.decision].color + "44");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.DECISION_META[c_r9.decision].icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", c_r9.typeControle === "INTERNE" ? "CI" : "CE", " \u2014 ", ctx_r0.DECISION_META[c_r9.decision].label, "");
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_For_21_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275repeaterCreate(1, PlanDetailComponent_Conditional_10_Conditional_0_For_21_Conditional_16_For_2_Template, 5, 7, "div", 44, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.controlesByVersion(v_r8.idVersion));
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "div", 34);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PlanDetailComponent_Conditional_10_Conditional_0_For_21_Conditional_4_Template, 1, 0, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 36)(6, "div", 37)(7, "span", 38);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 39);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, PlanDetailComponent_Conditional_10_Conditional_0_For_21_Conditional_12_Template, 2, 1, "p", 40)(13, PlanDetailComponent_Conditional_10_Conditional_0_For_21_Conditional_13_Template, 4, 1, "a", 41);
    \u0275\u0275elementStart(14, "span", 42);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(16, PlanDetailComponent_Conditional_10_Conditional_0_For_21_Conditional_16_Template, 3, 0, "div", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r8 = ctx.$implicit;
    const \u0275$index_91_r10 = ctx.$index;
    const \u0275$count_91_r11 = ctx.$count;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("latest", \u0275$index_91_r10 === \u0275$count_91_r11 - 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r8.indice);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, !(\u0275$index_91_r10 === \u0275$count_91_r11 - 1) ? 4 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Version ", v_r8.numeroVersion, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 10, v_r8.dateUpload, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(12, v_r8.commentaire ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(13, v_r8.fichierUrl ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Par : ", v_r8.uploadePar, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(16, ctx_r0.controlesByVersion(v_r8.idVersion).length ? 16 : -1);
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_ForEmpty_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "Aucune version disponible.");
    \u0275\u0275elementEnd();
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_23_For_19_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56)(1, "button", 57);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_23_For_19_Conditional_18_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r13);
      const c_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.decide(c_r14, "VALIDE"));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "check");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 58);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_23_For_19_Conditional_18_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r13);
      const c_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.decide(c_r14, "REFUSE"));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "close");
    \u0275\u0275elementEnd()()();
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_23_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 50)(1, "td")(2, "span", 51);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "span", 52);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td")(8, "span", 53)(9, "mat-icon", 54);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 25);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 25);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 55);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_23_For_19_Template_td_click_17_listener($event) {
      \u0275\u0275restoreView(_r12);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(18, PlanDetailComponent_Conditional_10_Conditional_0_Conditional_23_For_19_Conditional_18_Template, 7, 0, "div", 56);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r14 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r14.typeControle);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.versionLabel(c_r14.versionId));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r0.DECISION_META[c_r14.decision].color)("background", ctx_r0.DECISION_META[c_r14.decision].color + "18");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.DECISION_META[c_r14.decision].icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.DECISION_META[c_r14.decision].label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r14.remarque || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(16, 11, c_r14.dateControle, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(18, ctx_r0.canDecide(c_r14) ? 18 : -1);
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 47);
    \u0275\u0275text(1, "Contr\xF4les");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 48)(3, "table", 49)(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Version");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "D\xE9cision");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Remarque");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275repeaterCreate(18, PlanDetailComponent_Conditional_10_Conditional_0_Conditional_23_For_19_Template, 19, 14, "tr", 50, _forTrack2);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r0.controles());
  }
}
function PlanDetailComponent_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "div", 11)(3, "span", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, PlanDetailComponent_Conditional_10_Conditional_0_Conditional_5_Template, 2, 1, "span", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h1", 14);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 15)(9, "div", 16);
    \u0275\u0275repeaterCreate(10, PlanDetailComponent_Conditional_10_Conditional_0_For_11_Template, 4, 5, "div", 17, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 18);
    \u0275\u0275template(13, PlanDetailComponent_Conditional_10_Conditional_0_Conditional_13_Template, 4, 0, "button", 19)(14, PlanDetailComponent_Conditional_10_Conditional_0_Conditional_14_Template, 4, 0, "button", 20)(15, PlanDetailComponent_Conditional_10_Conditional_0_Conditional_15_Template, 4, 0, "button", 20)(16, PlanDetailComponent_Conditional_10_Conditional_0_Conditional_16_Template, 4, 0, "button", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "h2", 22);
    \u0275\u0275text(18, "Versions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 23);
    \u0275\u0275repeaterCreate(20, PlanDetailComponent_Conditional_10_Conditional_0_For_21_Template, 17, 13, "div", 24, _forTrack1, false, PlanDetailComponent_Conditional_10_Conditional_0_ForEmpty_22_Template, 2, 0, "p", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, PlanDetailComponent_Conditional_10_Conditional_0_Conditional_23_Template, 20, 0);
  }
  if (rf & 2) {
    const p_r2 = ctx;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("color", ctx_r0.TYPE_PLAN[p_r2.typePlan].color)("background", ctx_r0.TYPE_PLAN[p_r2.typePlan].bg);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", p_r2.typePlan, " \u2014 ", ctx_r0.TYPE_PLAN[p_r2.typePlan].label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(5, p_r2.derniereVersion ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r2.nom);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.statutSteps);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(13, ctx_r0.canSoumettre(p_r2) ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(14, ctx_r0.canAddVersion(p_r2) ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(15, ctx_r0.canControler(p_r2) ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(16, ctx_r0.canViser(p_r2) ? 16 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(p_r2.versions);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(23, ctx_r0.controles().length ? 23 : -1);
  }
}
function PlanDetailComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, PlanDetailComponent_Conditional_10_Conditional_0_Template, 24, 14);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, (tmp_1_0 = ctx_r0.plan()) ? 0 : -1, tmp_1_0);
  }
}
function PlanDetailComponent_Conditional_11_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 70);
  }
}
function PlanDetailComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_11_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeVersionDialog());
    });
    \u0275\u0275elementStart(1, "div", 60);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_11_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 61)(3, "h2");
    \u0275\u0275text(4, "Nouvelle version");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 62);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_11_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeVersionDialog());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "form", 63);
    \u0275\u0275listener("ngSubmit", function PlanDetailComponent_Conditional_11_Template_form_ngSubmit_8_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitVersion());
    });
    \u0275\u0275elementStart(9, "div", 64)(10, "label");
    \u0275\u0275text(11, "Commentaire");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "textarea", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 64)(14, "label");
    \u0275\u0275text(15, "URL du fichier");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 67)(18, "button", 68);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_11_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeVersionDialog());
    });
    \u0275\u0275text(19, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 69);
    \u0275\u0275template(21, PlanDetailComponent_Conditional_11_Conditional_21_Template, 1, 0, "mat-spinner", 70);
    \u0275\u0275text(22, " Cr\xE9er la version ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("formGroup", ctx_r0.versionForm);
    \u0275\u0275advance(12);
    \u0275\u0275property("disabled", ctx_r0.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(21, ctx_r0.submitting() ? 21 : -1);
  }
}
function PlanDetailComponent_Conditional_12_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 70);
  }
}
function PlanDetailComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_12_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeControleDialog());
    });
    \u0275\u0275elementStart(1, "div", 60);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_12_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r16);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 61)(3, "h2");
    \u0275\u0275text(4, "Cr\xE9er un contr\xF4le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 62);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeControleDialog());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "form", 63);
    \u0275\u0275listener("ngSubmit", function PlanDetailComponent_Conditional_12_Template_form_ngSubmit_8_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitControle());
    });
    \u0275\u0275elementStart(9, "div", 64)(10, "label");
    \u0275\u0275text(11, "Type de contr\xF4le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 71)(13, "option", 72);
    \u0275\u0275text(14, "Contr\xF4le Interne");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 73);
    \u0275\u0275text(16, "Contr\xF4le Externe");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 64)(18, "label");
    \u0275\u0275text(19, "ID du contr\xF4leur ");
    \u0275\u0275elementStart(20, "span", 74);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(22, "input", 75);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 67)(24, "button", 68);
    \u0275\u0275listener("click", function PlanDetailComponent_Conditional_12_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeControleDialog());
    });
    \u0275\u0275text(25, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 69);
    \u0275\u0275template(27, PlanDetailComponent_Conditional_12_Conditional_27_Template, 1, 0, "mat-spinner", 70);
    \u0275\u0275text(28, " Lancer le contr\xF4le ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("formGroup", ctx_r0.controleForm);
    \u0275\u0275advance(18);
    \u0275\u0275property("disabled", ctx_r0.controleForm.invalid || ctx_r0.submittingControle());
    \u0275\u0275advance();
    \u0275\u0275conditional(27, ctx_r0.submittingControle() ? 27 : -1);
  }
}
var PlanDetailComponent = class _PlanDetailComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.planSvc = inject(PlanService);
    this.controleSvc = inject(ControleService);
    this.auth = inject(AuthService);
    this.snack = inject(MatSnackBar);
    this.fb = inject(FormBuilder);
    this.plan = signal(null);
    this.controles = signal([]);
    this.loading = signal(true);
    this.showVersionDialog = signal(false);
    this.showControleDialog = signal(false);
    this.submitting = signal(false);
    this.submittingControle = signal(false);
    this.STATUT_PLAN = STATUT_PLAN;
    this.TYPE_PLAN = TYPE_PLAN;
    this.DECISION_META = DECISION_META;
    this.statutSteps = [
      { key: "BROUILLON", step: 0 },
      { key: "EN_CONTROLE", step: 1 },
      { key: "VALIDE", step: 2 },
      { key: "VISE", step: 3 }
    ];
    this.versionForm = this.fb.group({
      commentaire: [""],
      fichierUrl: [""]
    });
    this.controleForm = this.fb.group({
      typeControle: ["INTERNE"],
      controleurId: ["", Validators.required]
    });
  }
  get userId() {
    return this.auth.currentUser()?.userId ?? "";
  }
  get role() {
    return this.auth.userRole() ?? "";
  }
  canSoumettre(p) {
    return p.statut === "BROUILLON" && ["PROJETEUR", "EMETTEUR"].includes(this.role);
  }
  canAddVersion(p) {
    return p.statut === "REFUSE" && ["PROJETEUR", "EMETTEUR"].includes(this.role);
  }
  canControler(p) {
    return p.statut === "EN_CONTROLE" && ["CONTROLEUR_INTERNE", "CONTROLEUR_EXTERNE", "ADMIN"].includes(this.role);
  }
  canViser(p) {
    return p.statut === "VALIDE" && ["RESPONSABLE_VISA", "ADMIN"].includes(this.role);
  }
  canDecide(c) {
    return c.decision === "EN_ATTENTE" && ["CONTROLEUR_INTERNE", "CONTROLEUR_EXTERNE", "ADMIN"].includes(this.role);
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.planSvc.getById(id).subscribe({
      next: (p) => {
        this.plan.set(p);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
    this.controleSvc.getByPlan(id).subscribe({
      next: (cs) => this.controles.set(cs),
      error: () => {
      }
    });
  }
  controlesByVersion(versionId) {
    return this.controles().filter((c) => c.versionId === versionId);
  }
  versionLabel(versionId) {
    const v = this.plan()?.versions.find((x) => x.idVersion === versionId);
    return v ? `v${v.numeroVersion} (${v.indice})` : versionId;
  }
  soumettre() {
    const id = this.plan().id;
    this.planSvc.soumettre(id).subscribe({
      next: (p) => {
        this.plan.set(p);
        this.snack.open("Plan soumis \xE0 contr\xF4le", "OK", { duration: 3e3 });
      },
      error: () => this.snack.open("Erreur lors de la soumission", "Fermer", { duration: 4e3 })
    });
  }
  openVersionDialog() {
    this.versionForm.reset();
    this.showVersionDialog.set(true);
  }
  closeVersionDialog() {
    this.showVersionDialog.set(false);
  }
  submitVersion() {
    this.submitting.set(true);
    const v = this.versionForm.value;
    this.planSvc.addVersion(this.plan().id, {
      commentaire: v.commentaire || void 0,
      fichierUrl: v.fichierUrl || void 0
    }).subscribe({
      next: (p) => {
        this.plan.set(p);
        this.snack.open("Nouvelle version cr\xE9\xE9e", "OK", { duration: 3e3 });
        this.closeVersionDialog();
        this.submitting.set(false);
      },
      error: () => {
        this.snack.open("Erreur", "Fermer", { duration: 4e3 });
        this.submitting.set(false);
      }
    });
  }
  openControleDialog() {
    this.controleForm.reset({ typeControle: "INTERNE" });
    this.showControleDialog.set(true);
  }
  closeControleDialog() {
    this.showControleDialog.set(false);
  }
  submitControle() {
    if (this.controleForm.invalid)
      return;
    this.submittingControle.set(true);
    const f = this.controleForm.value;
    const p = this.plan();
    const payload = {
      planId: p.id,
      versionId: p.derniereVersion.idVersion,
      typeControle: f.typeControle,
      controleurId: f.controleurId
    };
    this.controleSvc.create(payload).subscribe({
      next: (c) => {
        this.controles.update((list) => [...list, c]);
        this.snack.open("Contr\xF4le cr\xE9\xE9", "OK", { duration: 3e3 });
        this.closeControleDialog();
        this.submittingControle.set(false);
      },
      error: () => {
        this.snack.open("Erreur", "Fermer", { duration: 4e3 });
        this.submittingControle.set(false);
      }
    });
  }
  decide(c, decision) {
    const remarque = decision !== "VALIDE" ? prompt("Remarque (optionnelle) :") ?? void 0 : void 0;
    const payload = { decision, remarque };
    this.controleSvc.applyDecision(c.id, payload).subscribe({
      next: (updated) => {
        this.controles.update((list) => list.map((x) => x.id === c.id ? updated : x));
        this.snack.open("D\xE9cision enregistr\xE9e", "OK", { duration: 3e3 });
        this.planSvc.getById(this.plan().id).subscribe((p) => this.plan.set(p));
      },
      error: () => this.snack.open("Erreur", "Fermer", { duration: 4e3 })
    });
  }
  applyVisa() {
    if (!confirm("Apposer le visa sur ce plan ?"))
      return;
    this.controleSvc.applyVisa(this.controles().at(-1)?.id ?? "", {}).subscribe({
      next: () => {
        this.snack.open("Visa appliqu\xE9", "OK", { duration: 3e3 });
        this.planSvc.getById(this.plan().id).subscribe((p) => this.plan.set(p));
      },
      error: () => this.snack.open("Erreur lors du visa", "Fermer", { duration: 4e3 })
    });
  }
  static {
    this.\u0275fac = function PlanDetailComponent_Factory(t) {
      return new (t || _PlanDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanDetailComponent, selectors: [["app-plan-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 13, vars: 5, consts: [[1, "page-wrap"], [1, "breadcrumb"], ["routerLink", "/affaires", 1, "bc-link"], [1, "bc-sep"], [1, "bc-cur"], [1, "loader-wrap"], [1, "dialog-backdrop"], [1, "bc-link", 3, "routerLink"], ["diameter", "36"], [1, "plan-header"], [1, "plan-meta"], [1, "plan-badges"], [1, "type-badge"], [1, "indice-tag"], [1, "plan-nom"], [1, "header-right"], [1, "statut-step"], [1, "step-item", 3, "done", "current"], [1, "actions-bar"], [1, "btn-action", "primary"], [1, "btn-action"], [1, "btn-action", "accent"], [1, "section-title"], [1, "versions-list"], [1, "version-card", 3, "latest"], [1, "text-muted"], [1, "step-item"], [1, "step-dot"], [1, "step-label"], [1, "btn-action", "primary", 3, "click"], [1, "btn-action", 3, "click"], [1, "btn-action", "accent", 3, "click"], [1, "version-card"], [1, "ver-left"], [1, "ver-indice"], [1, "ver-line"], [1, "ver-body"], [1, "ver-header"], [1, "ver-title"], [1, "ver-date"], [1, "ver-comment"], ["target", "_blank", 1, "ver-file", 3, "href"], [1, "ver-by"], [1, "ver-controles"], [1, "controle-chip", 3, "color", "borderColor"], [1, "controle-chip"], [1, "chip-icon"], [1, "section-title", 2, "margin-top", "28px"], [1, "table-card"], [1, "data-table"], [1, "data-row"], [1, "type-tag"], [1, "ver-ref"], [1, "decision-badge"], [1, "dec-icon"], [3, "click"], [1, "row-actions-inline"], ["matTooltip", "Valider", 1, "dec-btn", "valide", 3, "click"], ["matTooltip", "Refuser", 1, "dec-btn", "refuse", 3, "click"], [1, "dialog-backdrop", 3, "click"], [1, "dialog-box", 3, "click"], [1, "dialog-header"], [1, "dialog-close", 3, "click"], [1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "field-group"], ["formControlName", "commentaire", "rows", "3", "placeholder", "Modifications apport\xE9es\u2026", 1, "field-input", "field-textarea"], ["formControlName", "fichierUrl", "placeholder", "https://\u2026", 1, "field-input"], [1, "dialog-actions"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "submit", 1, "btn-submit", 3, "disabled"], ["diameter", "16"], ["formControlName", "typeControle", 1, "field-input", "field-select"], ["value", "INTERNE"], ["value", "EXTERNE"], [1, "req"], ["formControlName", "controleurId", "placeholder", "ID utilisateur", 1, "field-input"]], template: function PlanDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
        \u0275\u0275text(3, "Affaires");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "mat-icon", 3);
        \u0275\u0275text(5, "chevron_right");
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, PlanDetailComponent_Conditional_6_Template, 4, 3);
        \u0275\u0275elementStart(7, "span", 4);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, PlanDetailComponent_Conditional_9_Template, 2, 0, "div", 5)(10, PlanDetailComponent_Conditional_10_Template, 1, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275template(11, PlanDetailComponent_Conditional_11_Template, 23, 3, "div", 6)(12, PlanDetailComponent_Conditional_12_Template, 29, 3, "div", 6);
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_1_0;
        \u0275\u0275advance(6);
        \u0275\u0275conditional(6, ((tmp_0_0 = ctx.plan()) == null ? null : tmp_0_0.affaireId) ? 6 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate((tmp_1_0 = (tmp_1_0 = ctx.plan()) == null ? null : tmp_1_0.nom) !== null && tmp_1_0 !== void 0 ? tmp_1_0 : "\u2026");
        \u0275\u0275advance();
        \u0275\u0275conditional(9, ctx.loading() ? 9 : 10);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(11, ctx.showVersionDialog() ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(12, ctx.showControleDialog() ? 12 : -1);
      }
    }, dependencies: [CommonModule, DatePipe, RouterModule, RouterLink, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatIconModule, MatIcon, MatButtonModule, MatTooltipModule, MatTooltip, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule], styles: ['\n\n.page-wrap[_ngcontent-%COMP%] {\n  max-width: 1100px;\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-bottom: 20px;\n  font-size: .85rem;\n}\n.bc-link[_ngcontent-%COMP%] {\n  color: var(--db-navy);\n  text-decoration: none;\n  &:hover {\n    text-decoration: underline;\n  }\n}\n.bc-sep[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--db-text-secondary);\n}\n.bc-cur[_ngcontent-%COMP%] {\n  color: var(--db-text-secondary);\n}\n.loader-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.plan-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 16px;\n  gap: 20px;\n}\n.plan-badges[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 10px;\n}\n.type-badge[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: .82rem;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 4px;\n}\n.indice-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2px 10px;\n  border-radius: 12px;\n  background: var(--db-navy);\n  color: #fff;\n  font-size: .78rem;\n  font-weight: 700;\n}\n.plan-nom[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 700;\n  margin: 0;\n  color: var(--db-text);\n}\n.statut-step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0;\n  background: #fff;\n  border: 1px solid var(--db-border);\n  border-radius: 8px;\n  padding: 12px 20px;\n  gap: 6px;\n}\n.step-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  padding: 0 12px;\n  position: relative;\n  &:not(:last-child)::after {\n    content: "";\n    position: absolute;\n    right: -6px;\n    top: 8px;\n    width: 12px;\n    height: 2px;\n    background: var(--db-border);\n  }\n  &.done .step-dot {\n    background: var(--db-navy);\n  }\n  &.current .step-dot {\n    background: var(--db-orange);\n    box-shadow: 0 0 0 4px rgba(232, 68, 14, .2);\n  }\n}\n.step-dot[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  background: #D1D5DB;\n  transition: all .2s;\n}\n.step-label[_ngcontent-%COMP%] {\n  font-size: .7rem;\n  color: var(--db-text-secondary);\n  white-space: nowrap;\n}\n.actions-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n}\n.btn-action[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  padding: 8px 16px;\n  background: #fff;\n  cursor: pointer;\n  font-size: .875rem;\n  font-weight: 500;\n  color: var(--db-text);\n  mat-icon {\n    font-size: 1rem;\n    width: 16px;\n    height: 16px;\n  }\n  &:hover {\n    background: #F3F4F6;\n  }\n  &.primary {\n    background: var(--db-navy);\n    color: #fff;\n    border-color: transparent;\n    &:hover {\n      background: var(--db-navy-darker, #091B2E);\n    }\n  }\n  &.accent {\n    background: #15803D;\n    color: #fff;\n    border-color: transparent;\n    &:hover {\n      background: #166534;\n    }\n  }\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  margin: 0 0 12px;\n  color: var(--db-text);\n}\n.versions-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.version-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  padding: 12px 0;\n  &.latest .ver-body {\n    background: #FFFBEB;\n    border-color: #FCD34D;\n  }\n}\n.ver-left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0;\n  width: 44px;\n  flex-shrink: 0;\n}\n.ver-indice[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: var(--db-navy);\n  color: #fff;\n  font-weight: 800;\n  font-size: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.ver-line[_ngcontent-%COMP%] {\n  flex: 1;\n  width: 2px;\n  background: var(--db-border);\n  margin: 4px auto;\n}\n.ver-body[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 1px solid var(--db-border);\n  border-radius: 8px;\n  padding: 12px 16px;\n  background: #fff;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 12px;\n}\n.ver-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.ver-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--db-text);\n}\n.ver-date[_ngcontent-%COMP%] {\n  font-size: .78rem;\n  color: var(--db-text-secondary);\n}\n.ver-comment[_ngcontent-%COMP%] {\n  font-size: .85rem;\n  color: var(--db-text-secondary);\n  margin: 0;\n}\n.ver-file[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: .82rem;\n  color: var(--db-navy);\n  text-decoration: none;\n  mat-icon {\n    font-size: .9rem;\n    width: 14px;\n    height: 14px;\n  }\n  &:hover {\n    text-decoration: underline;\n  }\n}\n.ver-by[_ngcontent-%COMP%] {\n  font-size: .75rem;\n  color: var(--db-text-secondary);\n}\n.ver-controles[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 4px;\n}\n.controle-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  border: 1px solid;\n  border-radius: 12px;\n  padding: 2px 10px;\n  font-size: .75rem;\n  font-weight: 600;\n}\n.chip-icon[_ngcontent-%COMP%] {\n  font-size: .85rem;\n  width: 14px;\n  height: 14px;\n}\n.table-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid var(--db-border);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: .875rem;\n}\nthead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: #F8FAFC;\n  border-bottom: 1px solid var(--db-border);\n}\nth[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  font-size: .73rem;\n  font-weight: 600;\n  color: var(--db-text-secondary);\n  text-transform: uppercase;\n  letter-spacing: .06em;\n  text-align: left;\n}\n.data-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--db-border);\n  &:last-child {\n    border-bottom: none;\n  }\n  &:hover {\n    background: #F8FAFC;\n  }\n}\ntd[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  vertical-align: middle;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: var(--db-text-secondary);\n  font-size: .82rem;\n}\n.type-tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 4px;\n  background: #EFF6FF;\n  color: var(--db-navy);\n  font-size: .78rem;\n  font-weight: 600;\n}\n.ver-ref[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: .78rem;\n  color: var(--db-text-secondary);\n}\n.decision-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 3px 10px;\n  border-radius: 12px;\n  font-size: .78rem;\n  font-weight: 600;\n}\n.dec-icon[_ngcontent-%COMP%] {\n  font-size: .9rem;\n  width: 14px;\n  height: 14px;\n}\n.row-actions-inline[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.dec-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border-radius: 4px;\n  border: none;\n  cursor: pointer;\n  mat-icon {\n    font-size: 1rem;\n    width: 16px;\n    height: 16px;\n  }\n  &.valide {\n    background: #D1FAE5;\n    color: #15803D;\n    &:hover {\n      background: #A7F3D0;\n    }\n  }\n  &.refuse {\n    background: #FEE2E2;\n    color: #B91C1C;\n    &:hover {\n      background: #FECACA;\n    }\n  }\n}\n.dialog-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, .45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.dialog-box[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 10px;\n  width: 480px;\n  max-width: 95vw;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, .2);\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 24px 0;\n  h2 {\n    margin: 0;\n    font-size: 1.1rem;\n    font-weight: 700;\n    color: var(--db-text);\n  }\n}\n.dialog-close[_ngcontent-%COMP%] {\n  border: none;\n  background: none;\n  cursor: pointer;\n  color: var(--db-text-secondary);\n  padding: 4px;\n  border-radius: 4px;\n  display: flex;\n  &:hover {\n    background: #F3F4F6;\n  }\n}\n.dialog-form[_ngcontent-%COMP%] {\n  padding: 20px 24px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.field-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  font-weight: 600;\n  color: var(--db-text-secondary);\n}\n.req[_ngcontent-%COMP%] {\n  color: #B91C1C;\n}\n.field-input[_ngcontent-%COMP%] {\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  padding: 9px 12px;\n  font-size: .875rem;\n  color: var(--db-text);\n  outline: none;\n  font-family: inherit;\n  background: #fff;\n  &:focus {\n    border-color: var(--db-navy);\n  }\n}\n.field-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 72px;\n}\n.field-select[_ngcontent-%COMP%] {\n  appearance: auto;\n}\n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 4px;\n  padding-top: 16px;\n  border-top: 1px solid var(--db-border);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  padding: 9px 18px;\n  background: #fff;\n  cursor: pointer;\n  font-size: .875rem;\n  color: var(--db-text-secondary);\n  &:hover {\n    background: #F3F4F6;\n  }\n}\n.btn-submit[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: var(--db-navy);\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  padding: 9px 20px;\n  font-size: .875rem;\n  font-weight: 600;\n  cursor: pointer;\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n  &:not(:disabled):hover {\n    background: var(--db-navy-darker, #091B2E);\n  }\n}\n/*# sourceMappingURL=plan-detail.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanDetailComponent, { className: "PlanDetailComponent", filePath: "src\\app\\features\\plans\\plan-detail\\plan-detail.component.ts", lineNumber: 471 });
})();
export {
  PlanDetailComponent
};
//# sourceMappingURL=chunk-BK2XFF52.js.map
