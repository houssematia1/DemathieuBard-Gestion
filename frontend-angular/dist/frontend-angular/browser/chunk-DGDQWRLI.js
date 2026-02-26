import {
  MatChipsModule,
  MatProgressBarModule
} from "./chunk-ZHJBSUS6.js";
import {
  MatCardModule
} from "./chunk-GWXPGDVF.js";
import {
  UserService
} from "./chunk-55HK4YYU.js";
import {
  ROLE_LABELS
} from "./chunk-DULWYKJS.js";
import "./chunk-UJXEUIG5.js";
import "./chunk-QKX6J2Q5.js";
import {
  MatButtonModule,
  MatIcon,
  MatIconModule
} from "./chunk-EBLTBT5G.js";
import {
  AuthService,
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
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-Y6YIWLLK.js";

// src/app/features/dashboard/dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.id;
function DashboardComponent_For_12_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const stat_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("up", stat_r1.trendUp)("down", !stat_r1.trendUp);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.trendUp ? "trending_up" : "trending_down");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", stat_r1.trend, " ");
  }
}
function DashboardComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 24)(5, "span", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 26);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, DashboardComponent_For_12_Conditional_9_Template, 4, 6, "div", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    \u0275\u0275styleProp("--accent", stat_r1.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", stat_r1.color + "18");
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", stat_r1.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(stat_r1.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(stat_r1.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, stat_r1.trend ? 9 : -1);
  }
}
function DashboardComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 29)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 30)(5, "span", 31);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 32);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 33);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", item_r2.color + "18");
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", item_r2.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.subtitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.time);
  }
}
function DashboardComponent_For_30_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "soon");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 34)(1, "div", 35)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 36);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, DashboardComponent_For_30_Conditional_6_Template, 2, 0, "span", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r3 = ctx.$implicit;
    \u0275\u0275classProp("disabled-btn", action_r3.disabled);
    \u0275\u0275property("routerLink", action_r3.disabled ? null : action_r3.route)("title", action_r3.disabled ? "Bient\xF4t disponible" : "");
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", action_r3.color + "15");
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", action_r3.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(action_r3.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(action_r3.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, action_r3.disabled ? 6 : -1);
  }
}
function DashboardComponent_Conditional_31_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 42)(4, "span", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 44);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r4 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (user_r4.prenom[0] + user_r4.nom[0]).toUpperCase(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", user_r4.prenom, " ", user_r4.nom, "");
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("role-badge ", user_r4.role, " small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.ROLE_LABELS[user_r4.role]);
    \u0275\u0275advance();
    \u0275\u0275classMap(user_r4.actif ? "actif" : "inactif");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r4.actif ? "Actif" : "Inactif", " ");
  }
}
function DashboardComponent_Conditional_31_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275repeaterCreate(1, DashboardComponent_Conditional_31_Conditional_6_For_2_Template, 10, 10, "div", 40, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.recentUsers());
  }
}
function DashboardComponent_Conditional_31_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "mat-icon");
    \u0275\u0275text(2, "group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Chargement...");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 8)(2, "h3");
    \u0275\u0275text(3, "Utilisateurs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 38);
    \u0275\u0275text(5, "Voir tout \u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, DashboardComponent_Conditional_31_Conditional_6_Template, 3, 0, "div", 39)(7, DashboardComponent_Conditional_31_Conditional_7_Template, 5, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275conditional(6, ctx_r4.recentUsers().length > 0 ? 6 : 7);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.userSvc = inject(UserService);
    this.ROLE_LABELS = ROLE_LABELS;
    this.recentUsers = signal([]);
    this.stats = [
      { label: "Affaires actives", value: "\u2014", icon: "business", color: "#1B3A5C", trend: "+2 ce mois", trendUp: true },
      { label: "Plans en contr\xF4le", value: "\u2014", icon: "description", color: "#E8440E", trend: "3 en attente", trendUp: false },
      { label: "Contr\xF4les valid\xE9s", value: "\u2014", icon: "fact_check", color: "#22C55E", trend: "+5 cette semaine", trendUp: true },
      { label: "Utilisateurs actifs", value: "\u2014", icon: "group", color: "#3B82F6" }
    ];
    this.activities = [
      { id: 1, icon: "person_add", color: "#22C55E", title: "Compte admin cr\xE9\xE9", subtitle: "admin@btp.fr \u2014 ADMIN", time: "\xC0 l'instant" },
      { id: 2, icon: "group", color: "#3B82F6", title: "Utilisateurs d\xE9mo initialis\xE9s", subtitle: "6 comptes cr\xE9\xE9s automatiquement", time: "D\xE9marrage" },
      { id: 3, icon: "check_circle", color: "#E8440E", title: "User Service op\xE9rationnel", subtitle: "Port 8084 \u2014 JWT + MongoDB", time: "Phase 2" },
      { id: 4, icon: "cloud_done", color: "#1B3A5C", title: "Eureka Server en ligne", subtitle: "Service Discovery actif", time: "Phase 1" },
      { id: 5, icon: "settings", color: "#6B7280", title: "API Gateway configur\xE9", subtitle: "Port 8080 \u2014 JWT filter actif", time: "Phase 1" }
    ];
    this.quickActions = [
      { label: "Affaires", icon: "business", color: "#1B3A5C", route: "/affaires", disabled: true },
      { label: "Plans", icon: "description", color: "#E8440E", route: "/plans", disabled: true },
      { label: "Contr\xF4les", icon: "fact_check", color: "#22C55E", route: "/controles", disabled: true },
      { label: "Utilisateurs", icon: "group", color: "#3B82F6", route: "/users", disabled: false },
      { label: "Mon profil", icon: "person", color: "#8B5CF6", route: "/profile", disabled: false },
      { label: "Notifications", icon: "notifications", color: "#F59E0B", route: "/notifications", disabled: true }
    ];
  }
  firstName() {
    return this.auth.currentUser()?.prenom ?? "Utilisateur";
  }
  roleLabel() {
    const r = this.auth.userRole();
    return r ? ROLE_LABELS[r] : "";
  }
  ngOnInit() {
    if (this.auth.hasRole("ADMIN")) {
      this.userSvc.getAll(0, 5).subscribe({
        next: (page) => {
          this.recentUsers.set(page.content);
          this.stats[3].value = page.totalElements;
        }
      });
    }
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 68, vars: 6, consts: [[1, "dashboard"], [1, "welcome-section"], [1, "welcome-text"], [1, "welcome-badge"], [1, "stats-grid"], [1, "stat-card", 3, "--accent"], [1, "main-grid"], [1, "db-card", "activity-card"], [1, "card-header"], [1, "card-subtitle"], [1, "activity-list"], [1, "activity-item"], [1, "right-panels"], [1, "db-card", "quick-card"], [1, "quick-grid"], [1, "quick-btn", 3, "routerLink", "disabled-btn", "title"], [1, "db-card", "users-mini-card"], [1, "phases-banner"], [1, "phase-item", "done"], [1, "phase-separator"], [1, "phase-item", "current"], [1, "phase-item", "pending"], [1, "stat-card"], [1, "stat-icon"], [1, "stat-body"], [1, "stat-value"], [1, "stat-label"], [1, "stat-trend", 3, "up", "down"], [1, "stat-trend"], [1, "act-icon"], [1, "act-body"], [1, "act-title"], [1, "act-sub"], [1, "act-time"], [1, "quick-btn", 3, "routerLink", "title"], [1, "qbtn-icon"], [1, "qbtn-label"], [1, "qbtn-soon"], ["routerLink", "/users", 1, "card-link"], [1, "users-mini-list"], [1, "user-mini-item"], [1, "user-mini-avatar"], [1, "user-mini-info"], [1, "user-mini-name"], [1, "status-badge"], [1, "empty-state"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Bienvenue sur le Syst\xE8me de Gestion des Affaires BTP \u2014 Demathieu & Bard");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 3)(8, "span");
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "div", 4);
        \u0275\u0275repeaterCreate(11, DashboardComponent_For_12_Template, 10, 10, "div", 5, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 6)(14, "div", 7)(15, "div", 8)(16, "h3");
        \u0275\u0275text(17, "Activit\xE9 r\xE9cente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "span", 9);
        \u0275\u0275text(19, "Derni\xE8res actions dans le syst\xE8me");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 10);
        \u0275\u0275repeaterCreate(21, DashboardComponent_For_22_Template, 11, 8, "div", 11, _forTrack1);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "div", 12)(24, "div", 13)(25, "div", 8)(26, "h3");
        \u0275\u0275text(27, "Acc\xE8s rapides");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "div", 14);
        \u0275\u0275repeaterCreate(29, DashboardComponent_For_30_Template, 7, 11, "button", 15, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(31, DashboardComponent_Conditional_31_Template, 8, 1, "div", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "div", 17)(33, "div", 18)(34, "mat-icon");
        \u0275\u0275text(35, "check_circle");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "span");
        \u0275\u0275text(37, "Infrastructure");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(38, "div", 19);
        \u0275\u0275elementStart(39, "div", 18)(40, "mat-icon");
        \u0275\u0275text(41, "check_circle");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "span");
        \u0275\u0275text(43, "User Service");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(44, "div", 19);
        \u0275\u0275elementStart(45, "div", 20)(46, "mat-icon");
        \u0275\u0275text(47, "radio_button_checked");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "span");
        \u0275\u0275text(49, "Frontend Auth");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(50, "div", 19);
        \u0275\u0275elementStart(51, "div", 21)(52, "mat-icon");
        \u0275\u0275text(53, "radio_button_unchecked");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "span");
        \u0275\u0275text(55, "Affaires & Plans");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(56, "div", 19);
        \u0275\u0275elementStart(57, "div", 21)(58, "mat-icon");
        \u0275\u0275text(59, "radio_button_unchecked");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "span");
        \u0275\u0275text(61, "Contr\xF4les & Visas");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(62, "div", 19);
        \u0275\u0275elementStart(63, "div", 21)(64, "mat-icon");
        \u0275\u0275text(65, "radio_button_unchecked");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "span");
        \u0275\u0275text(67, "Notifications");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1("Bonjour, ", ctx.firstName(), " \u{1F44B}");
        \u0275\u0275advance(4);
        \u0275\u0275classMapInterpolate1("role-badge ", ctx.auth.userRole(), "");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.roleLabel());
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.stats);
        \u0275\u0275advance(10);
        \u0275\u0275repeater(ctx.activities);
        \u0275\u0275advance(8);
        \u0275\u0275repeater(ctx.quickActions);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(31, ctx.auth.hasRole("ADMIN") ? 31 : -1);
      }
    }, dependencies: [
      CommonModule,
      RouterLink,
      MatCardModule,
      MatIconModule,
      MatIcon,
      MatButtonModule,
      MatProgressBarModule,
      MatChipsModule
    ], styles: ["\n\n.dashboard[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.welcome-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  h1 {\n    font-size: 1.6rem;\n    font-weight: 700;\n    color: var(--db-navy);\n    margin: 0 0 4px;\n    letter-spacing: -.02em;\n  }\n  p {\n    margin: 0;\n    color: var(--db-text-secondary);\n    font-size: .9rem;\n  }\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 16px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 10px;\n  padding: 20px;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, .06);\n  border: 1px solid #E8EDF3;\n  border-left: 3px solid var(--accent);\n  transition: box-shadow .2s;\n  &:hover {\n    box-shadow: 0 4px 12px rgba(0, 0, 0, .08);\n  }\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  mat-icon {\n    font-size: 1.4rem;\n    width: 1.4rem;\n    height: 1.4rem;\n  }\n}\n.stat-body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.stat-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.75rem;\n  font-weight: 800;\n  color: var(--db-text);\n  letter-spacing: -.03em;\n  line-height: 1;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  color: var(--db-text-secondary);\n  font-weight: 500;\n  margin-top: 3px;\n  display: block;\n}\n.stat-trend[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  font-size: .75rem;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 20px;\n  mat-icon {\n    font-size: .9rem;\n    width: .9rem;\n    height: .9rem;\n  }\n  &.up {\n    color: #065F46;\n    background: #D1FAE5;\n  }\n  &.down {\n    color: #991B1B;\n    background: #FEE2E2;\n  }\n}\n.main-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 360px;\n  gap: 20px;\n  align-items: start;\n}\n.db-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, .06);\n  border: 1px solid #E8EDF3;\n  overflow: hidden;\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 18px 20px 14px;\n  border-bottom: 1px solid #F0F4F8;\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  h3 {\n    font-size: .95rem;\n    font-weight: 700;\n    color: var(--db-text);\n    margin: 0;\n  }\n}\n.card-subtitle[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  color: var(--db-text-secondary);\n}\n.card-link[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  color: var(--db-orange);\n  font-weight: 600;\n  text-decoration: none;\n}\n.activity-list[_ngcontent-%COMP%] {\n  padding: 8px 0;\n}\n.activity-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 20px;\n  transition: background .15s;\n  &:hover {\n    background: #F8FAFC;\n  }\n}\n.act-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  mat-icon {\n    font-size: 1.1rem;\n    width: 1.1rem;\n    height: 1.1rem;\n  }\n}\n.act-body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.act-title[_ngcontent-%COMP%] {\n  font-size: .875rem;\n  font-weight: 500;\n  color: var(--db-text);\n}\n.act-sub[_ngcontent-%COMP%] {\n  font-size: .78rem;\n  color: var(--db-text-secondary);\n  margin-top: 1px;\n}\n.act-time[_ngcontent-%COMP%] {\n  font-size: .75rem;\n  color: var(--db-text-light);\n  white-space: nowrap;\n}\n.right-panels[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.quick-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  padding: 16px;\n}\n.quick-btn[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 16px 12px;\n  border: 1px solid #E8EDF3;\n  border-radius: 8px;\n  background: #FAFBFC;\n  cursor: pointer;\n  transition: all .15s;\n  position: relative;\n  &:hover:not(.disabled-btn) {\n    border-color: var(--db-orange);\n    background: var(--db-orange-light, #FDE9E3);\n  }\n  &.disabled-btn {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n}\n.qbtn-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  mat-icon {\n    font-size: 1.2rem;\n    width: 1.2rem;\n    height: 1.2rem;\n  }\n}\n.qbtn-label[_ngcontent-%COMP%] {\n  font-size: .78rem;\n  font-weight: 600;\n  color: var(--db-text);\n  text-align: center;\n}\n.qbtn-soon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  font-size: .58rem;\n  background: #E2E8F0;\n  color: #64748B;\n  padding: 1px 5px;\n  border-radius: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n}\n.users-mini-list[_ngcontent-%COMP%] {\n  padding: 8px 0;\n}\n.user-mini-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 16px;\n  transition: background .15s;\n  &:hover {\n    background: #F8FAFC;\n  }\n}\n.user-mini-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: var(--db-navy);\n  color: #fff;\n  font-size: .75rem;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.user-mini-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.user-mini-name[_ngcontent-%COMP%] {\n  font-size: .85rem;\n  font-weight: 500;\n  color: var(--db-text);\n}\n.role-badge.small[_ngcontent-%COMP%] {\n  font-size: .65rem;\n  padding: 1px 6px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  color: var(--db-text-light);\n  font-size: .85rem;\n  mat-icon {\n    font-size: 2rem;\n    width: 2rem;\n    height: 2rem;\n    opacity: .4;\n  }\n}\n.phases-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0;\n  background: var(--db-navy);\n  border-radius: 10px;\n  padding: 16px 24px;\n  overflow-x: auto;\n}\n.phase-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  white-space: nowrap;\n  font-size: .8rem;\n  font-weight: 600;\n  padding: 0 16px;\n  mat-icon {\n    font-size: 1rem;\n    width: 1rem;\n    height: 1rem;\n  }\n  &.done {\n    color: #4ADE80;\n  }\n  &.current {\n    color: var(--db-orange);\n  }\n  &.pending {\n    color: rgba(255, 255, 255, .35);\n  }\n}\n.phase-separator[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 1px;\n  background: rgba(255, 255, 255, .2);\n  flex-shrink: 0;\n}\n@media (max-width: 1100px) {\n  .main-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 600px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .welcome-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\features\\dashboard\\dashboard.component.ts", lineNumber: 486 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-DGDQWRLI.js.map
