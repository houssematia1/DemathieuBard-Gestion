import {
  NotificationService
} from "./chunk-PB6W4RZ4.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-66T2SBBK.js";
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
  __spreadProps,
  __spreadValues,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-Y6YIWLLK.js";

// src/app/features/notifications/notification-panel/notification-panel.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function NotificationPanelComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r0.unread(), " non lue", ctx_r0.unread() > 1 ? "s" : "", "");
  }
}
function NotificationPanelComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Tout est lu ");
  }
}
function NotificationPanelComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function NotificationPanelComponent_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.markAllRead());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "done_all");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Tout marquer comme lu ");
    \u0275\u0275elementEnd();
  }
}
function NotificationPanelComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "mat-spinner", 11);
    \u0275\u0275elementEnd();
  }
}
function NotificationPanelComponent_Conditional_19_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(n_r4.typeEntite);
  }
}
function NotificationPanelComponent_Conditional_19_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 24);
  }
}
function NotificationPanelComponent_Conditional_19_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 26);
    \u0275\u0275listener("click", function NotificationPanelComponent_Conditional_19_For_2_Conditional_14_Template_a_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "open_in_new");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const n_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", ctx_r0.entityRoute(n_r4));
  }
}
function NotificationPanelComponent_Conditional_19_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275listener("click", function NotificationPanelComponent_Conditional_19_For_2_Template_div_click_0_listener() {
      const n_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.markRead(n_r4));
    });
    \u0275\u0275elementStart(1, "div", 16)(2, "mat-icon", 17);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 18)(5, "p", 19);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 20);
    \u0275\u0275template(8, NotificationPanelComponent_Conditional_19_For_2_Conditional_8_Template, 2, 1, "span", 21);
    \u0275\u0275elementStart(9, "span", 22);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 23);
    \u0275\u0275template(13, NotificationPanelComponent_Conditional_19_For_2_Conditional_13_Template, 1, 0, "span", 24)(14, NotificationPanelComponent_Conditional_19_For_2_Conditional_14_Template, 3, 1, "a", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const n_r4 = ctx.$implicit;
    \u0275\u0275classProp("unread", !n_r4.lu);
    \u0275\u0275advance();
    \u0275\u0275classProp("type-both", n_r4.type === "BOTH")("type-email", n_r4.type === "EMAIL");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", n_r4.type === "EMAIL" ? "email" : n_r4.type === "BOTH" ? "notifications_active" : "notifications", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(n_r4.message);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(8, n_r4.typeEntite ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 12, n_r4.dateEnvoi, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(13, !n_r4.lu ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(14, n_r4.referenceEntite ? 14 : -1);
  }
}
function NotificationPanelComponent_Conditional_19_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "mat-icon");
    \u0275\u0275text(2, "notifications_none");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Aucune notification");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6, "Vous serez notifi\xE9 des changements importants ici.");
    \u0275\u0275elementEnd()();
  }
}
function NotificationPanelComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275repeaterCreate(1, NotificationPanelComponent_Conditional_19_For_2_Template, 15, 15, "div", 13, _forTrack0, false, NotificationPanelComponent_Conditional_19_ForEmpty_3_Template, 7, 0, "div", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.displayed());
  }
}
var NotificationPanelComponent = class _NotificationPanelComponent {
  constructor() {
    this.svc = inject(NotificationService);
    this.auth = inject(AuthService);
    this.snack = inject(MatSnackBar);
    this.notifications = signal([]);
    this.loading = signal(true);
    this.showAll = signal(true);
  }
  get unread() {
    return this.svc.unreadCount;
  }
  displayed() {
    return this.showAll() ? this.notifications() : this.notifications().filter((n) => !n.lu);
  }
  ngOnInit() {
    const userId = this.auth.currentUser()?.userId ?? "";
    if (!userId) {
      this.loading.set(false);
      return;
    }
    this.svc.getByUser(userId).subscribe({
      next: (ns) => {
        this.notifications.set(ns);
        this.svc.unreadCount.set(ns.filter((n) => !n.lu).length);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  markRead(n) {
    if (n.lu)
      return;
    this.svc.marquerLue(n.id).subscribe({
      next: (updated) => {
        this.notifications.update((list) => list.map((x) => x.id === n.id ? updated : x));
        this.svc.unreadCount.update((v) => Math.max(0, v - 1));
      },
      error: () => {
      }
    });
  }
  markAllRead() {
    const userId = this.auth.currentUser()?.userId ?? "";
    this.svc.marquerToutesLues(userId).subscribe({
      next: () => {
        this.notifications.update((list) => list.map((n) => __spreadProps(__spreadValues({}, n), { lu: true })));
        this.svc.unreadCount.set(0);
        this.snack.open("Toutes les notifications marqu\xE9es comme lues", "OK", { duration: 3e3 });
      },
      error: () => {
      }
    });
  }
  entityRoute(n) {
    const id = n.referenceEntite ?? "";
    switch (n.typeEntite) {
      case "PLAN":
        return ["/plans", id];
      case "CONTROLE":
        return ["/controles"];
      case "AFFAIRE":
        return ["/affaires", id];
      default:
        return ["/notifications"];
    }
  }
  static {
    this.\u0275fac = function NotificationPanelComponent_Factory(t) {
      return new (t || _NotificationPanelComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationPanelComponent, selectors: [["app-notification-panel"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 20, vars: 9, consts: [[1, "page-wrap"], [1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "unread-count"], [1, "btn-read-all"], [1, "tab-bar"], [1, "tab", 3, "click"], [1, "tab-count"], [1, "loader-wrap"], [1, "btn-read-all", 3, "click"], ["diameter", "36"], [1, "notif-list"], [1, "notif-row", 3, "unread"], [1, "empty-state"], [1, "notif-row", 3, "click"], [1, "notif-icon-wrap"], [1, "notif-icon"], [1, "notif-body"], [1, "notif-msg"], [1, "notif-meta"], [1, "entite-tag"], [1, "notif-date"], [1, "notif-right"], [1, "unread-dot"], ["matTooltip", "Voir l'\xE9l\xE9ment", 1, "notif-link", 3, "routerLink"], ["matTooltip", "Voir l'\xE9l\xE9ment", 1, "notif-link", 3, "click", "routerLink"]], template: function NotificationPanelComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "Notifications");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275template(6, NotificationPanelComponent_Conditional_6_Template, 2, 2, "span", 4)(7, NotificationPanelComponent_Conditional_7_Template, 1, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, NotificationPanelComponent_Conditional_8_Template, 4, 0, "button", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 6)(10, "button", 7);
        \u0275\u0275listener("click", function NotificationPanelComponent_Template_button_click_10_listener() {
          return ctx.showAll.set(true);
        });
        \u0275\u0275text(11, " Toutes ");
        \u0275\u0275elementStart(12, "span", 8);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "button", 7);
        \u0275\u0275listener("click", function NotificationPanelComponent_Template_button_click_14_listener() {
          return ctx.showAll.set(false);
        });
        \u0275\u0275text(15, " Non lues ");
        \u0275\u0275elementStart(16, "span", 8);
        \u0275\u0275text(17);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(18, NotificationPanelComponent_Conditional_18_Template, 2, 0, "div", 9)(19, NotificationPanelComponent_Conditional_19_Template, 4, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(6, ctx.unread() ? 6 : 7);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(8, ctx.unread() > 0 ? 8 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.showAll());
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.notifications().length);
        \u0275\u0275advance();
        \u0275\u0275classProp("active", !ctx.showAll());
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.unread());
        \u0275\u0275advance();
        \u0275\u0275conditional(18, ctx.loading() ? 18 : 19);
      }
    }, dependencies: [CommonModule, DatePipe, RouterModule, RouterLink, MatIconModule, MatIcon, MatButtonModule, MatProgressSpinnerModule, MatProgressSpinner, MatTooltipModule, MatTooltip, MatSnackBarModule], styles: ["\n\n.page-wrap[_ngcontent-%COMP%] {\n  max-width: 800px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--db-text);\n  margin: 0;\n}\n.page-sub[_ngcontent-%COMP%] {\n  font-size: .85rem;\n  color: var(--db-text-secondary);\n  margin: 4px 0 0;\n}\n.unread-count[_ngcontent-%COMP%] {\n  color: var(--db-orange);\n  font-weight: 700;\n}\n.btn-read-all[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  border: 1px solid var(--db-border);\n  border-radius: 6px;\n  padding: 8px 14px;\n  background: #fff;\n  cursor: pointer;\n  font-size: .82rem;\n  font-weight: 500;\n  color: var(--db-text-secondary);\n  mat-icon {\n    font-size: 1rem;\n    width: 16px;\n    height: 16px;\n  }\n  &:hover {\n    background: #F3F4F6;\n    color: var(--db-text);\n  }\n}\n.tab-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  border-bottom: 2px solid var(--db-border);\n  margin-bottom: 16px;\n}\n.tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 9px 20px;\n  border: none;\n  background: none;\n  cursor: pointer;\n  font-size: .875rem;\n  font-weight: 500;\n  color: var(--db-text-secondary);\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  transition: all .15s;\n  &:hover {\n    color: var(--db-navy);\n  }\n  &.active {\n    color: var(--db-navy);\n    border-bottom-color: var(--db-navy);\n    font-weight: 600;\n  }\n}\n.tab-count[_ngcontent-%COMP%] {\n  background: #F3F4F6;\n  color: var(--db-text-secondary);\n  font-size: .7rem;\n  font-weight: 600;\n  padding: 1px 7px;\n  border-radius: 10px;\n}\n.loader-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.notif-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n  border: 1px solid var(--db-border);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.notif-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 14px;\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--db-border);\n  cursor: pointer;\n  transition: background .1s;\n  &:last-child {\n    border-bottom: none;\n  }\n  &:hover {\n    background: #F8FAFC;\n  }\n  &.unread {\n    background: #FFFBF5;\n    border-left: 3px solid var(--db-orange);\n  }\n}\n.notif-icon-wrap[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  background: #EFF6FF;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  &.type-email {\n    background: #F0FDF4;\n  }\n  &.type-both {\n    background: #FFFBEB;\n  }\n}\n.notif-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: var(--db-navy);\n  .type-email & {\n    color: #15803D;\n  }\n  .type-both & {\n    color: #B45309;\n  }\n}\n.notif-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.notif-msg[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-size: .875rem;\n  color: var(--db-text);\n  line-height: 1.4;\n  .unread & {\n    font-weight: 500;\n  }\n}\n.notif-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.entite-tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 1px 8px;\n  border-radius: 10px;\n  background: #EFF6FF;\n  color: var(--db-navy);\n  font-size: .7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: .04em;\n}\n.notif-date[_ngcontent-%COMP%] {\n  font-size: .78rem;\n  color: var(--db-text-secondary);\n}\n.notif-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.unread-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--db-orange);\n}\n.notif-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--db-text-secondary);\n  text-decoration: none;\n  mat-icon {\n    font-size: 1rem;\n    width: 16px;\n    height: 16px;\n  }\n  &:hover {\n    color: var(--db-navy);\n  }\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 72px 24px;\n  gap: 10px;\n  text-align: center;\n  color: var(--db-text-secondary);\n  mat-icon {\n    font-size: 3rem;\n    opacity: .25;\n  }\n  span {\n    font-size: .9rem;\n    font-weight: 500;\n  }\n  small {\n    font-size: .8rem;\n    opacity: .7;\n  }\n}\n/*# sourceMappingURL=notification-panel.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationPanelComponent, { className: "NotificationPanelComponent", filePath: "src\\app\\features\\notifications\\notification-panel\\notification-panel.component.ts", lineNumber: 203 });
})();
export {
  NotificationPanelComponent
};
//# sourceMappingURL=chunk-FFZVN2R6.js.map
