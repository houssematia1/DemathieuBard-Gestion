import {
  MatDivider,
  MatDividerModule
} from "./chunk-KNFVNI7Z.js";
import {
  MatCardModule
} from "./chunk-GWXPGDVF.js";
import {
  UserService
} from "./chunk-55HK4YYU.js";
import {
  ROLE_LABELS
} from "./chunk-DULWYKJS.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-5O2E2F2I.js";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatSuffix
} from "./chunk-UJXEUIG5.js";
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
import "./chunk-S2QNGY54.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule
} from "./chunk-EBLTBT5G.js";
import {
  AuthService
} from "./chunk-YXL4TWJQ.js";
import {
  CommonModule,
  DatePipe,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-Y6YIWLLK.js";

// src/app/features/users/user-profile/user-profile.component.ts
function UserProfileComponent_Conditional_6_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Nom obligatoire");
    \u0275\u0275elementEnd();
  }
}
function UserProfileComponent_Conditional_6_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Pr\xE9nom obligatoire");
    \u0275\u0275elementEnd();
  }
}
function UserProfileComponent_Conditional_6_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Email obligatoire");
    \u0275\u0275elementEnd();
  }
}
function UserProfileComponent_Conditional_6_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Format invalide");
    \u0275\u0275elementEnd();
  }
}
function UserProfileComponent_Conditional_6_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.saveError(), " ");
  }
}
function UserProfileComponent_Conditional_6_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 28);
  }
}
function UserProfileComponent_Conditional_6_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
  }
}
function UserProfileComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 6)(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 7);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(12, "mat-divider");
    \u0275\u0275elementStart(13, "div", 8)(14, "div", 9)(15, "mat-icon");
    \u0275\u0275text(16, "email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div")(18, "label");
    \u0275\u0275text(19, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 9)(23, "mat-icon");
    \u0275\u0275text(24, "badge");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div")(26, "label");
    \u0275\u0275text(27, "Identifiant");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 10);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 9)(31, "mat-icon");
    \u0275\u0275text(32, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div")(34, "label");
    \u0275\u0275text(35, "Membre depuis");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "span");
    \u0275\u0275text(37);
    \u0275\u0275pipe(38, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 9)(40, "mat-icon");
    \u0275\u0275text(41, "manage_accounts");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div")(43, "label");
    \u0275\u0275text(44, "R\xF4le syst\xE8me");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span");
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(47, "div", 11)(48, "div", 12)(49, "mat-icon");
    \u0275\u0275text(50, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "h3");
    \u0275\u0275text(52, "Modifier mes informations");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "form", 13);
    \u0275\u0275listener("ngSubmit", function UserProfileComponent_Conditional_6_Template_form_ngSubmit_53_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveProfile());
    });
    \u0275\u0275elementStart(54, "div", 14)(55, "mat-form-field", 15)(56, "mat-label");
    \u0275\u0275text(57, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275element(58, "input", 16);
    \u0275\u0275template(59, UserProfileComponent_Conditional_6_Conditional_59_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "mat-form-field", 15)(61, "mat-label");
    \u0275\u0275text(62, "Pr\xE9nom");
    \u0275\u0275elementEnd();
    \u0275\u0275element(63, "input", 17);
    \u0275\u0275template(64, UserProfileComponent_Conditional_6_Conditional_64_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "mat-form-field", 18)(66, "mat-label");
    \u0275\u0275text(67, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(68, "input", 19);
    \u0275\u0275elementStart(69, "mat-icon", 20);
    \u0275\u0275text(70, "email");
    \u0275\u0275elementEnd();
    \u0275\u0275template(71, UserProfileComponent_Conditional_6_Conditional_71_Template, 2, 0, "mat-error")(72, UserProfileComponent_Conditional_6_Conditional_72_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div", 21)(74, "label");
    \u0275\u0275text(75, "R\xF4le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "div", 22)(77, "span");
    \u0275\u0275text(78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "span", 23);
    \u0275\u0275text(80, "Contactez un administrateur pour changer votre r\xF4le");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(81, UserProfileComponent_Conditional_6_Conditional_81_Template, 4, 1, "div", 24);
    \u0275\u0275elementStart(82, "div", 25)(83, "button", 26);
    \u0275\u0275listener("click", function UserProfileComponent_Conditional_6_Template_button_click_83_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetForm());
    });
    \u0275\u0275text(84, " Annuler ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "button", 27);
    \u0275\u0275template(86, UserProfileComponent_Conditional_6_Conditional_86_Template, 1, 0, "mat-spinner", 28)(87, UserProfileComponent_Conditional_6_Conditional_87_Template, 2, 0);
    \u0275\u0275text(88, " Enregistrer ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.initials());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.user().prenom, " ", ctx_r1.user().nom, "");
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("role-badge ", ctx_r1.user().role, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.ROLE_LABELS[ctx_r1.user().role]);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.user().actif ? "actif" : "inactif");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.user().actif ? "\u25CF Actif" : "\u25CB Inactif", " ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.user().email);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.user().id);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(38, 26, ctx_r1.user().dateCreation, "MMMM yyyy", "", "fr"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.ROLE_LABELS[ctx_r1.user().role]);
    \u0275\u0275advance(7);
    \u0275\u0275property("formGroup", ctx_r1.editForm);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(59, ctx_r1.f["nom"].hasError("required") && ctx_r1.f["nom"].touched ? 59 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(64, ctx_r1.f["prenom"].hasError("required") && ctx_r1.f["prenom"].touched ? 64 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(71, ctx_r1.f["email"].hasError("required") && ctx_r1.f["email"].touched ? 71 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(72, ctx_r1.f["email"].hasError("email") && ctx_r1.f["email"].touched ? 72 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275classMapInterpolate1("role-badge ", ctx_r1.user().role, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.ROLE_LABELS[ctx_r1.user().role]);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(81, ctx_r1.saveError() ? 81 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving() || ctx_r1.editForm.invalid || !ctx_r1.editForm.dirty);
    \u0275\u0275advance();
    \u0275\u0275conditional(86, ctx_r1.saving() ? 86 : 87);
  }
}
function UserProfileComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "mat-spinner", 30);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Chargement du profil...");
    \u0275\u0275elementEnd()();
  }
}
var UserProfileComponent = class _UserProfileComponent {
  constructor() {
    this.userSvc = inject(UserService);
    this.auth = inject(AuthService);
    this.fb = inject(FormBuilder);
    this.snackBar = inject(MatSnackBar);
    this.ROLE_LABELS = ROLE_LABELS;
    this.user = signal(null);
    this.saving = signal(false);
    this.saveError = signal("");
    this.editForm = this.fb.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]]
    });
  }
  get f() {
    return this.editForm.controls;
  }
  ngOnInit() {
    this.userSvc.getMe().subscribe({
      next: (u) => {
        this.user.set(u);
        this.editForm.patchValue({ nom: u.nom, prenom: u.prenom, email: u.email });
      }
    });
  }
  initials() {
    const u = this.user();
    return u ? (u.prenom[0] + u.nom[0]).toUpperCase() : "DB";
  }
  resetForm() {
    const u = this.user();
    if (u)
      this.editForm.patchValue({ nom: u.nom, prenom: u.prenom, email: u.email });
    this.editForm.markAsPristine();
    this.saveError.set("");
  }
  saveProfile() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    const u = this.user();
    if (!u)
      return;
    this.saving.set(true);
    this.saveError.set("");
    const v = this.editForm.value;
    this.userSvc.update(u.id, { nom: v.nom, prenom: v.prenom, email: v.email }).subscribe({
      next: (updated) => {
        this.user.set(updated);
        this.editForm.markAsPristine();
        this.saving.set(false);
        this.snackBar.open("Profil mis \xE0 jour !", "", { duration: 3e3, panelClass: "snack-success" });
      },
      error: (err) => {
        this.saving.set(false);
        this.saveError.set(err.error?.message ?? "Erreur lors de la sauvegarde");
      }
    });
  }
  static {
    this.\u0275fac = function UserProfileComponent_Factory(t) {
      return new (t || _UserProfileComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserProfileComponent, selectors: [["app-user-profile"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 1, consts: [[1, "profile-page"], [1, "page-header"], [1, "profile-grid"], [1, "identity-card", "db-card"], [1, "avatar-section"], [1, "big-avatar"], [1, "avatar-info"], [1, "status-badge"], [1, "info-list"], [1, "info-item"], [1, "id-value"], [1, "edit-card", "db-card"], [1, "card-title"], [3, "ngSubmit", "formGroup"], [1, "field-row"], ["appearance", "outline"], ["matInput", "", "formControlName", "nom"], ["matInput", "", "formControlName", "prenom"], ["appearance", "outline", 1, "full"], ["matInput", "", "type", "email", "formControlName", "email"], ["matSuffix", ""], [1, "readonly-field"], [1, "readonly-value"], [1, "readonly-hint"], [1, "error-banner"], [1, "form-actions"], ["mat-stroked-button", "", "type", "button", 1, "db-btn-outline", 3, "click"], ["mat-raised-button", "", "type", "submit", 1, "db-btn-primary", 3, "disabled"], ["diameter", "18"], [1, "loading-state"], ["diameter", "48"]], template: function UserProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Mon Profil");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p");
        \u0275\u0275text(5, "G\xE9rez vos informations personnelles");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, UserProfileComponent_Conditional_6_Template, 89, 31, "div", 2)(7, UserProfileComponent_Conditional_7_Template, 4, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(6, ctx.user() ? 6 : 7);
      }
    }, dependencies: [CommonModule, DatePipe, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatFormFieldModule, MatFormField, MatLabel, MatError, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconModule, MatIcon, MatCardModule, MatDividerModule, MatDivider, MatSnackBarModule, MatProgressSpinnerModule, MatProgressSpinner], styles: ["\n\n.profile-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  h1 {\n    font-size: 1.5rem;\n    font-weight: 700;\n    color: var(--db-navy);\n    margin: 0 0 4px;\n  }\n  p {\n    color: var(--db-text-secondary);\n    margin: 0;\n    font-size: .9rem;\n  }\n}\n.profile-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 300px 1fr;\n  gap: 20px;\n  align-items: start;\n}\n.db-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, .06);\n  border: 1px solid #E8EDF3;\n  overflow: hidden;\n}\n.identity-card[_ngcontent-%COMP%] {\n  padding: 28px 24px;\n}\n.avatar-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding-bottom: 24px;\n  text-align: center;\n}\n.big-avatar[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--db-navy) 0%,\n      #2D5A87 100%);\n  color: #fff;\n  font-size: 1.75rem;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 12px rgba(27, 58, 92, .3);\n}\n.avatar-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  h2 {\n    font-size: 1.1rem;\n    font-weight: 700;\n    color: var(--db-text);\n    margin: 0;\n  }\n}\n.info-list[_ngcontent-%COMP%] {\n  padding-top: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  mat-icon {\n    color: var(--db-text-light);\n    font-size: 1.1rem;\n    width: 1.1rem;\n    height: 1.1rem;\n    margin-top: 2px;\n    flex-shrink: 0;\n  }\n  div {\n    display: flex;\n    flex-direction: column;\n    gap: 1px;\n  }\n  label {\n    font-size: .72rem;\n    font-weight: 600;\n    color: var(--db-text-light);\n    text-transform: uppercase;\n    letter-spacing: .05em;\n  }\n  span {\n    font-size: .875rem;\n    color: var(--db-text);\n    font-weight: 500;\n    word-break: break-all;\n  }\n}\n.id-value[_ngcontent-%COMP%] {\n  font-family: monospace !important;\n  font-size: .75rem !important;\n  color: var(--db-text-secondary) !important;\n}\n.edit-card[_ngcontent-%COMP%] {\n  padding: 28px;\n}\n.card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 24px;\n  mat-icon {\n    color: var(--db-orange);\n  }\n  h3 {\n    font-size: 1rem;\n    font-weight: 700;\n    color: var(--db-text);\n    margin: 0;\n  }\n}\n.field-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.full[_ngcontent-%COMP%] {\n  width: 100%;\n}\nmat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 4px;\n}\n.readonly-field[_ngcontent-%COMP%] {\n  padding: 12px 0 16px;\n  label {\n    font-size: .78rem;\n    font-weight: 600;\n    color: var(--db-text-secondary);\n    text-transform: uppercase;\n    letter-spacing: .05em;\n    display: block;\n    margin-bottom: 8px;\n  }\n}\n.readonly-value[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.readonly-hint[_ngcontent-%COMP%] {\n  font-size: .78rem;\n  color: var(--db-text-light);\n  font-style: italic;\n}\n.error-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #FEE2E2;\n  color: #991B1B;\n  padding: 10px 14px;\n  border-radius: 6px;\n  font-size: .875rem;\n  margin-bottom: 16px;\n  border: 1px solid #FECACA;\n  mat-icon {\n    font-size: 1.1rem;\n    width: 18px;\n    height: 18px;\n  }\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 60px;\n  color: var(--db-text-secondary);\n}\n@media (max-width: 900px) {\n  .profile-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .field-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=user-profile.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserProfileComponent, { className: "UserProfileComponent", filePath: "src\\app\\features\\users\\user-profile\\user-profile.component.ts", lineNumber: 372 });
})();
export {
  UserProfileComponent
};
//# sourceMappingURL=chunk-JKI2NMEF.js.map
