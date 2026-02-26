import {
  ROLE_LABELS
} from "./chunk-DULWYKJS.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-C2W4MCSS.js";
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
  MatIconButton,
  MatIconModule,
  MatOption
} from "./chunk-EBLTBT5G.js";
import {
  AuthService,
  Router,
  RouterLink
} from "./chunk-YXL4TWJQ.js";
import {
  CommonModule,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-Y6YIWLLK.js";

// src/app/features/auth/register/register.component.ts
var _forTrack0 = ($index, $item) => $item.value;
function RegisterComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Nom obligatoire");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Pr\xE9nom obligatoire");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Email obligatoire");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Format invalide");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Mot de passe obligatoire");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Minimum 8 caract\xE8res");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_For_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r1 = ctx.$implicit;
    \u0275\u0275property("value", entry_r1.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(entry_r1.label);
  }
}
function RegisterComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "R\xF4le obligatoire");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275element(1, "div", 24);
    \u0275\u0275elementStart(2, "span", 25);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.pwdStrengthClass());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.pwdStrengthLabel());
  }
}
function RegisterComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMsg(), " ");
  }
}
function RegisterComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 21);
  }
}
function RegisterComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "CR\xC9ER MON COMPTE");
    \u0275\u0275elementEnd();
  }
}
var RegisterComponent = class _RegisterComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.snackBar = inject(MatSnackBar);
    this.loading = signal(false);
    this.showPwd = signal(false);
    this.errorMsg = signal("");
    this.roleEntries = Object.keys(ROLE_LABELS).map((value) => ({
      value,
      label: ROLE_LABELS[value]
    }));
    this.form = this.fb.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      motDePasse: ["", [Validators.required, Validators.minLength(8)]],
      role: ["PROJETEUR", Validators.required]
    });
  }
  togglePwd() {
    this.showPwd.update((v) => !v);
  }
  get f() {
    return this.form.controls;
  }
  pwdStrengthClass() {
    const pwd = this.f["motDePasse"].value ?? "";
    if (pwd.length < 8)
      return "weak";
    const strong = /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^a-zA-Z0-9]/.test(pwd);
    return strong ? "strong" : "medium";
  }
  pwdStrengthLabel() {
    const c = this.pwdStrengthClass();
    return c === "weak" ? "Faible" : c === "medium" ? "Moyen" : "Fort";
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMsg.set("");
    const v = this.form.value;
    this.auth.register({
      nom: v.nom,
      prenom: v.prenom,
      email: v.email,
      motDePasse: v.motDePasse,
      role: v.role
    }).subscribe({
      next: () => {
        this.snackBar.open("Compte cr\xE9\xE9 ! Connectez-vous.", "", { duration: 3e3, panelClass: "snack-success" });
        this.router.navigate(["/auth/login"]);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMsg.set(err.error?.message ?? "Erreur lors de la cr\xE9ation du compte");
      },
      complete: () => this.loading.set(false)
    });
  }
  static {
    this.\u0275fac = function RegisterComponent_Factory(t) {
      return new (t || _RegisterComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 59, vars: 14, consts: [[1, "register-wrapper"], [1, "accent-bar"], [1, "register-content"], [1, "register-header"], [1, "logo-box"], [1, "form-card"], [3, "ngSubmit", "formGroup"], [1, "field-row"], ["appearance", "outline"], ["matInput", "", "formControlName", "nom", "placeholder", "Dupont"], ["matInput", "", "formControlName", "prenom", "placeholder", "Jean"], ["appearance", "outline", 1, "full"], ["matInput", "", "type", "email", "formControlName", "email", "placeholder", "j.dupont@btp.fr"], ["matSuffix", ""], ["matInput", "", "formControlName", "motDePasse", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["formControlName", "role"], [3, "value"], [1, "pwd-strength"], [1, "error-banner"], ["mat-raised-button", "", "type", "submit", 1, "submit-btn", "db-btn-primary", 3, "disabled"], ["diameter", "20"], [1, "register-footer"], ["routerLink", "/auth/login", 1, "link"], [1, "strength-bar"], [1, "strength-label"]], template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "span");
        \u0275\u0275text(6, "D&B");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div")(8, "h1");
        \u0275\u0275text(9, "Cr\xE9er un compte");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "p");
        \u0275\u0275text(11, "Syst\xE8me de Gestion des Affaires BTP \u2014 Demathieu & Bard");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 5)(13, "form", 6);
        \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_13_listener() {
          return ctx.submit();
        });
        \u0275\u0275elementStart(14, "div", 7)(15, "mat-form-field", 8)(16, "mat-label");
        \u0275\u0275text(17, "Nom");
        \u0275\u0275elementEnd();
        \u0275\u0275element(18, "input", 9);
        \u0275\u0275template(19, RegisterComponent_Conditional_19_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "mat-form-field", 8)(21, "mat-label");
        \u0275\u0275text(22, "Pr\xE9nom");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 10);
        \u0275\u0275template(24, RegisterComponent_Conditional_24_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "mat-form-field", 11)(26, "mat-label");
        \u0275\u0275text(27, "Adresse email professionnelle");
        \u0275\u0275elementEnd();
        \u0275\u0275element(28, "input", 12);
        \u0275\u0275elementStart(29, "mat-icon", 13);
        \u0275\u0275text(30, "email");
        \u0275\u0275elementEnd();
        \u0275\u0275template(31, RegisterComponent_Conditional_31_Template, 2, 0, "mat-error")(32, RegisterComponent_Conditional_32_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "mat-form-field", 11)(34, "mat-label");
        \u0275\u0275text(35, "Mot de passe");
        \u0275\u0275elementEnd();
        \u0275\u0275element(36, "input", 14);
        \u0275\u0275elementStart(37, "button", 15);
        \u0275\u0275listener("click", function RegisterComponent_Template_button_click_37_listener() {
          return ctx.togglePwd();
        });
        \u0275\u0275elementStart(38, "mat-icon");
        \u0275\u0275text(39);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(40, RegisterComponent_Conditional_40_Template, 2, 0, "mat-error")(41, RegisterComponent_Conditional_41_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "mat-form-field", 11)(43, "mat-label");
        \u0275\u0275text(44, "R\xF4le");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "mat-select", 16);
        \u0275\u0275repeaterCreate(46, RegisterComponent_For_47_Template, 2, 2, "mat-option", 17, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275template(48, RegisterComponent_Conditional_48_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275template(49, RegisterComponent_Conditional_49_Template, 4, 3, "div", 18)(50, RegisterComponent_Conditional_50_Template, 4, 1, "div", 19);
        \u0275\u0275elementStart(51, "button", 20);
        \u0275\u0275template(52, RegisterComponent_Conditional_52_Template, 1, 0, "mat-spinner", 21)(53, RegisterComponent_Conditional_53_Template, 4, 0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(54, "div", 22)(55, "span");
        \u0275\u0275text(56, "D\xE9j\xE0 un compte ?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "a", 23);
        \u0275\u0275text(58, "Se connecter");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(6);
        \u0275\u0275conditional(19, ctx.f["nom"].hasError("required") && ctx.f["nom"].touched ? 19 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(24, ctx.f["prenom"].hasError("required") && ctx.f["prenom"].touched ? 24 : -1);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(31, ctx.f["email"].hasError("required") && ctx.f["email"].touched ? 31 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(32, ctx.f["email"].hasError("email") && ctx.f["email"].touched ? 32 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("type", ctx.showPwd() ? "text" : "password");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.showPwd() ? "visibility_off" : "visibility");
        \u0275\u0275advance();
        \u0275\u0275conditional(40, ctx.f["motDePasse"].hasError("required") && ctx.f["motDePasse"].touched ? 40 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(41, ctx.f["motDePasse"].hasError("minlength") && ctx.f["motDePasse"].touched ? 41 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.roleEntries);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(48, ctx.f["role"].hasError("required") && ctx.f["role"].touched ? 48 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(49, ctx.f["motDePasse"].value ? 49 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(50, ctx.errorMsg() ? 50 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading() || ctx.form.invalid);
        \u0275\u0275advance();
        \u0275\u0275conditional(52, ctx.loading() ? 52 : 53);
      }
    }, dependencies: [
      CommonModule,
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      FormGroupDirective,
      FormControlName,
      RouterLink,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatError,
      MatSuffix,
      MatInputModule,
      MatInput,
      MatButtonModule,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatSelectModule,
      MatSelect,
      MatOption,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatSnackBarModule
    ], styles: ["\n\n.register-wrapper[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  background: #F4F6F9;\n}\n.accent-bar[_ngcontent-%COMP%] {\n  width: 6px;\n  background:\n    linear-gradient(\n      180deg,\n      var(--db-orange) 0%,\n      var(--db-navy) 100%);\n  flex-shrink: 0;\n}\n.register-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 24px;\n}\n.register-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 32px;\n  width: 100%;\n  max-width: 540px;\n  .logo-box {\n    width: 52px;\n    height: 52px;\n    background: var(--db-navy);\n    border-radius: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: #fff;\n    font-weight: 800;\n    font-size: .9rem;\n    letter-spacing: -1px;\n    flex-shrink: 0;\n  }\n  h1 {\n    font-size: 1.6rem;\n    font-weight: 700;\n    color: var(--db-navy);\n    margin: 0 0 4px;\n    letter-spacing: -.02em;\n  }\n  p {\n    font-size: .85rem;\n    color: var(--db-text-secondary);\n    margin: 0;\n  }\n}\n.form-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 540px;\n  background: #fff;\n  border-radius: 12px;\n  padding: 36px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, .06);\n  border: 1px solid #E8EDF3;\n}\n.field-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.full[_ngcontent-%COMP%] {\n  width: 100%;\n}\nmat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 4px;\n}\n.pwd-strength[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin: -8px 0 12px;\n}\n.strength-bar[_ngcontent-%COMP%] {\n  height: 4px;\n  border-radius: 2px;\n  flex: 1;\n  transition: all .3s;\n  &.weak {\n    width: 33%;\n    background: #EF4444;\n  }\n  &.medium {\n    width: 66%;\n    background: #F59E0B;\n  }\n  &.strong {\n    width: 100%;\n    background: #22C55E;\n  }\n}\n.strength-label[_ngcontent-%COMP%] {\n  font-size: .75rem;\n  font-weight: 600;\n  color: var(--db-text-secondary);\n  min-width: 50px;\n}\n.error-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #FEE2E2;\n  color: #991B1B;\n  padding: 10px 14px;\n  border-radius: 6px;\n  font-size: .875rem;\n  margin-bottom: 16px;\n  border: 1px solid #FECACA;\n  mat-icon {\n    font-size: 1.1rem;\n    width: 18px;\n    height: 18px;\n  }\n}\n.submit-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 48px;\n  font-size: .9rem;\n  font-weight: 700;\n  letter-spacing: .06em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  margin-top: 8px;\n  border-radius: 6px !important;\n}\n.register-footer[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  font-size: .875rem;\n  color: var(--db-text-secondary);\n  display: flex;\n  gap: 6px;\n}\n.link[_ngcontent-%COMP%] {\n  color: var(--db-orange);\n  font-weight: 600;\n  text-decoration: none;\n  &:hover {\n    text-decoration: underline;\n  }\n}\n@media (max-width: 600px) {\n  .field-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-card[_ngcontent-%COMP%] {\n    padding: 24px 16px;\n  }\n}\n/*# sourceMappingURL=register.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src\\app\\features\\auth\\register\\register.component.ts", lineNumber: 304 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-OKRQKHCM.js.map
