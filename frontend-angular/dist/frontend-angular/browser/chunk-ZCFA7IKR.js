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
  MatIconModule
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
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-Y6YIWLLK.js";

// src/app/features/auth/login/login.component.ts
function LoginComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "L'email est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Format d'email invalide");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Le mot de passe est obligatoire");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.errorMsg());
  }
}
function LoginComponent_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 33);
  }
}
function LoginComponent_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "login");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "SE CONNECTER");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.snackBar = inject(MatSnackBar);
    this.loading = signal(false);
    this.showPassword = signal(false);
    this.errorMsg = signal("");
    this.form = this.fb.group({
      email: ["admin@btp.fr", [Validators.required, Validators.email]],
      motDePasse: ["Admin@123", [Validators.required]]
    });
  }
  togglePassword() {
    this.showPassword.update((v) => !v);
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMsg.set("");
    const { email, motDePasse } = this.form.value;
    this.auth.login({ email, motDePasse }).subscribe({
      next: () => {
        this.snackBar.open("Connexion r\xE9ussie !", "", { duration: 2e3, panelClass: "snack-success" });
        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMsg.set(err.error?.message ?? "Email ou mot de passe incorrect");
      },
      complete: () => this.loading.set(false)
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 99, vars: 9, consts: [[1, "login-wrapper"], [1, "left-panel"], [1, "panel-overlay"], [1, "panel-content"], [1, "db-logo"], [1, "logo-icon"], [1, "sep"], [1, "logo-label"], [1, "amp"], [1, "tagline"], [1, "highlight"], [1, "stats-row"], [1, "stat-item"], [1, "stat-value"], [1, "stat-label"], [1, "stat-divider"], [1, "sectors"], [1, "sector-tag"], [1, "grid-pattern"], [1, "right-panel"], [1, "form-card"], [1, "form-header"], [1, "form-icon"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z", "fill", "#E8440E"], ["autocomplete", "on", 3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "field"], ["matInput", "", "type", "email", "formControlName", "email", "placeholder", "nom@demathieu-bard.fr", "autocomplete", "email"], ["matSuffix", "", 1, "field-icon"], ["matInput", "", "formControlName", "motDePasse", "autocomplete", "current-password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], [1, "error-banner"], ["mat-raised-button", "", "type", "submit", 1, "submit-btn", "db-btn-primary", 3, "disabled"], ["diameter", "20", "color", "accent"], [1, "form-footer"], ["routerLink", "/auth/register", 1, "link"], [1, "demo-hint"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275element(2, "div", 2);
        \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "span");
        \u0275\u0275text(7, "D");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "span", 6);
        \u0275\u0275text(9, "&");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "B");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 7)(13, "span");
        \u0275\u0275text(14, "DEMATHIEU");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "span", 8);
        \u0275\u0275text(16, "& BARD");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(17, "div", 9)(18, "h1");
        \u0275\u0275text(19, "B\xE2tisseurs");
        \u0275\u0275element(20, "br");
        \u0275\u0275elementStart(21, "span", 10);
        \u0275\u0275text(22, "d'avenir");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "p");
        \u0275\u0275text(24, "Depuis plus de 100 ans, nous construisons les infrastructures de demain.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "div", 11)(26, "div", 12)(27, "span", 13);
        \u0275\u0275text(28, "100+");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "span", 14);
        \u0275\u0275text(30, "Ann\xE9es d'expertise");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(31, "div", 15);
        \u0275\u0275elementStart(32, "div", 12)(33, "span", 13);
        \u0275\u0275text(34, "5000+");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "span", 14);
        \u0275\u0275text(36, "Collaborateurs");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(37, "div", 15);
        \u0275\u0275elementStart(38, "div", 12)(39, "span", 13);
        \u0275\u0275text(40, "500+");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "span", 14);
        \u0275\u0275text(42, "Projets actifs");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(43, "div", 16)(44, "span", 17);
        \u0275\u0275text(45, "G\xE9nie Civil");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "span", 17);
        \u0275\u0275text(47, "B\xE2timent");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "span", 17);
        \u0275\u0275text(49, "Travaux Sp\xE9ciaux");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "span", 17);
        \u0275\u0275text(51, "Fondations");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(52, "div", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "div", 19)(54, "div", 20)(55, "div", 21)(56, "div", 22);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(57, "svg", 23);
        \u0275\u0275element(58, "path", 24);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(59, "div")(60, "h2");
        \u0275\u0275text(61, "Connexion");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "p");
        \u0275\u0275text(63, "Acc\xE9dez \xE0 votre espace de gestion BTP");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(64, "form", 25);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_64_listener() {
          return ctx.submit();
        });
        \u0275\u0275elementStart(65, "mat-form-field", 26)(66, "mat-label");
        \u0275\u0275text(67, "Adresse email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(68, "input", 27);
        \u0275\u0275elementStart(69, "mat-icon", 28);
        \u0275\u0275text(70, "email");
        \u0275\u0275elementEnd();
        \u0275\u0275template(71, LoginComponent_Conditional_71_Template, 2, 0, "mat-error")(72, LoginComponent_Conditional_72_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "mat-form-field", 26)(74, "mat-label");
        \u0275\u0275text(75, "Mot de passe");
        \u0275\u0275elementEnd();
        \u0275\u0275element(76, "input", 29);
        \u0275\u0275elementStart(77, "button", 30);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_77_listener() {
          return ctx.togglePassword();
        });
        \u0275\u0275elementStart(78, "mat-icon");
        \u0275\u0275text(79);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(80, LoginComponent_Conditional_80_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275template(81, LoginComponent_Conditional_81_Template, 5, 1, "div", 31);
        \u0275\u0275elementStart(82, "button", 32);
        \u0275\u0275template(83, LoginComponent_Conditional_83_Template, 1, 0, "mat-spinner", 33)(84, LoginComponent_Conditional_84_Template, 4, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(85, "div", 34)(86, "span");
        \u0275\u0275text(87, "Pas encore de compte ?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(88, "a", 35);
        \u0275\u0275text(89, "Cr\xE9er un compte");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(90, "div", 36)(91, "span");
        \u0275\u0275text(92, "Compte admin :");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(93, "code");
        \u0275\u0275text(94, "admin@btp.fr");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "span");
        \u0275\u0275text(96, "/");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(97, "code");
        \u0275\u0275text(98, "Admin@123");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        let tmp_5_0;
        \u0275\u0275advance(64);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(71, ((tmp_1_0 = ctx.form.get("email")) == null ? null : tmp_1_0.hasError("required")) && ((tmp_1_0 = ctx.form.get("email")) == null ? null : tmp_1_0.touched) ? 71 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(72, ((tmp_2_0 = ctx.form.get("email")) == null ? null : tmp_2_0.hasError("email")) && ((tmp_2_0 = ctx.form.get("email")) == null ? null : tmp_2_0.touched) ? 72 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("type", ctx.showPassword() ? "text" : "password");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.showPassword() ? "visibility_off" : "visibility");
        \u0275\u0275advance();
        \u0275\u0275conditional(80, ((tmp_5_0 = ctx.form.get("motDePasse")) == null ? null : tmp_5_0.hasError("required")) && ((tmp_5_0 = ctx.form.get("motDePasse")) == null ? null : tmp_5_0.touched) ? 80 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(81, ctx.errorMsg() ? 81 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading() || ctx.form.invalid);
        \u0275\u0275advance();
        \u0275\u0275conditional(83, ctx.loading() ? 83 : 84);
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
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatSnackBarModule
    ], styles: ['\n\n.login-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  font-family: "Inter", sans-serif;\n}\n.left-panel[_ngcontent-%COMP%] {\n  flex: 1.1;\n  position: relative;\n  background:\n    linear-gradient(\n      145deg,\n      #0A1929 0%,\n      #0F2540 40%,\n      #1B3A5C 75%,\n      #1E4976 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  padding: 48px;\n}\n.panel-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(\n      ellipse at 20% 80%,\n      rgba(232, 68, 14, .12) 0%,\n      transparent 55%),\n    radial-gradient(\n      ellipse at 80% 20%,\n      rgba(27, 58, 92, .5) 0%,\n      transparent 55%);\n  pointer-events: none;\n}\n.grid-pattern[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, .03) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, .03) 1px,\n      transparent 1px);\n  background-size: 40px 40px;\n  pointer-events: none;\n}\n.panel-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 460px;\n  width: 100%;\n  color: #fff;\n}\n.db-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 48px;\n}\n.logo-icon[_ngcontent-%COMP%] {\n  background: var(--db-orange);\n  width: 52px;\n  height: 52px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 900;\n  font-size: 1.15rem;\n  color: #fff;\n  letter-spacing: -2px;\n  flex-shrink: 0;\n  .sep {\n    font-size: .85rem;\n    opacity: .8;\n  }\n}\n.logo-label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  font-size: .8rem;\n  font-weight: 800;\n  letter-spacing: .15em;\n  .amp {\n    color: rgba(255, 255, 255, .55);\n    font-size: .7rem;\n    margin-top: 1px;\n  }\n}\n.tagline[_ngcontent-%COMP%] {\n  margin-bottom: 44px;\n  h1 {\n    font-size: clamp(2.2rem, 4vw, 3rem);\n    font-weight: 800;\n    line-height: 1.15;\n    margin: 0 0 16px;\n    letter-spacing: -.03em;\n    color: #fff;\n    .highlight {\n      color: var(--db-orange);\n    }\n  }\n  p {\n    font-size: 1rem;\n    color: rgba(255, 255, 255, .6);\n    line-height: 1.6;\n    margin: 0;\n    max-width: 340px;\n  }\n}\n.stats-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  margin-bottom: 32px;\n}\n.stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 800;\n  color: #fff;\n  letter-spacing: -.03em;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: .7rem;\n  color: rgba(255, 255, 255, .45);\n  letter-spacing: .04em;\n}\n.stat-divider[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 36px;\n  background: rgba(255, 255, 255, .15);\n}\n.sectors[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.sector-tag[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, .2);\n  color: rgba(255, 255, 255, .7);\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: .75rem;\n  font-weight: 500;\n  letter-spacing: .03em;\n  transition: all .2s;\n  &:hover {\n    border-color: var(--db-orange);\n    color: var(--db-orange);\n  }\n}\n.right-panel[_ngcontent-%COMP%] {\n  flex: 0.9;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 48px 40px;\n  background: #F8FAFC;\n}\n.form-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  background: #fff;\n  border-radius: 12px;\n  padding: 40px;\n  box-shadow: 0 4px 24px rgba(0, 0, 0, .06), 0 1px 4px rgba(0, 0, 0, .04);\n  border: 1px solid #E8EDF3;\n}\n.form-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 14px;\n  margin-bottom: 32px;\n  .form-icon {\n    width: 48px;\n    height: 48px;\n    background: #FDE9E3;\n    border-radius: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n  }\n  h2 {\n    font-size: 1.4rem;\n    font-weight: 700;\n    color: #0F2540;\n    margin: 0 0 4px;\n    letter-spacing: -.02em;\n  }\n  p {\n    font-size: .85rem;\n    color: #6B7A8D;\n    margin: 0;\n  }\n}\n.field[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 8px;\n  .field-icon {\n    color: #A0AEB9;\n  }\n}\n.error-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #FEE2E2;\n  color: #991B1B;\n  padding: 10px 14px;\n  border-radius: 6px;\n  font-size: .875rem;\n  font-weight: 500;\n  margin-bottom: 16px;\n  border: 1px solid #FECACA;\n  mat-icon {\n    font-size: 1.1rem;\n    width: 18px;\n    height: 18px;\n  }\n}\n.submit-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 48px;\n  font-size: .9rem;\n  font-weight: 700;\n  letter-spacing: .06em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  margin-top: 8px;\n  border-radius: 6px !important;\n}\n.form-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n  font-size: .875rem;\n  color: #6B7A8D;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.link[_ngcontent-%COMP%] {\n  color: var(--db-orange);\n  font-weight: 600;\n  text-decoration: none;\n  &:hover {\n    text-decoration: underline;\n  }\n}\n.demo-hint[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 10px 14px;\n  background: #F0F4F8;\n  border-radius: 6px;\n  font-size: .78rem;\n  color: #5A6A7E;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  code {\n    background: #E2E8F0;\n    padding: 1px 6px;\n    border-radius: 4px;\n    font-family: monospace;\n    color: #1B3A5C;\n    font-weight: 600;\n  }\n}\n@media (max-width: 900px) {\n  .login-wrapper[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .left-panel[_ngcontent-%COMP%] {\n    padding: 32px 24px;\n    min-height: 220px;\n    flex: none;\n  }\n  .stats-row[_ngcontent-%COMP%], .sectors[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .tagline[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.8rem;\n  }\n  .right-panel[_ngcontent-%COMP%] {\n    padding: 24px 16px;\n  }\n  .form-card[_ngcontent-%COMP%] {\n    padding: 28px 20px;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\features\\auth\\login\\login.component.ts", lineNumber: 484 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-ZCFA7IKR.js.map
