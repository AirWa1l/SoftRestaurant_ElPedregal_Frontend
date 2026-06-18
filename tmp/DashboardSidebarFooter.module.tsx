import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/layout/DashboardSidebarFooter.tsx");const _jsxDEV = __vite__cjsImport3_react_jsxDevRuntime["jsxDEV"];import { Button } from "/node_modules/.vite/deps/primereact_button.js?v=a3d32f18";
import { LogoutButton } from "/src/components/layout/LogoutButton.tsx";
import { ROLE_LABELS } from "/src/utils/roles.ts";
var _jsxFileName = "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/layout/DashboardSidebarFooter.tsx";
import __vite__cjsImport3_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=a3d32f18";
export function DashboardSidebarFooter({ currentUser, onGoToEditProfile }) {
	const userInitials = currentUser?.initials ?? "--";
	const userName = currentUser?.name ?? "Cargando usuario...";
	const userRole = currentUser ? ROLE_LABELS[currentUser.role] : "Sin rol";
	return /* @__PURE__ */ _jsxDEV("footer", {
		className: "dashboard-sidebar__footer",
		id: "contacto",
		children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "dashboard-user-card",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: "dashboard-user",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "dashboard-user__avatar",
					children: userInitials
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("p", {
					className: "dashboard-user__name",
					children: userName
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 22,
					columnNumber: 13
				}, this), /* @__PURE__ */ _jsxDEV("p", {
					className: "dashboard-user__role",
					children: userRole
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 23,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 21,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV(Button, {
				type: "button",
				icon: "pi pi-cog",
				rounded: true,
				text: true,
				severity: "secondary",
				"aria-label": "Editar perfil",
				className: "dashboard-profile-button",
				onClick: onGoToEditProfile
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 27,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 7
		}, this), /* @__PURE__ */ _jsxDEV(LogoutButton, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 39,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 5
	}, this);
}
_c = DashboardSidebarFooter;
var _c;
$RefreshReg$(_c, "DashboardSidebarFooter");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/components/layout/DashboardSidebarFooter.tsx?t=1781748752550";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/layout/DashboardSidebarFooter.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/layout/DashboardSidebarFooter.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/layout/DashboardSidebarFooter.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxjQUFjO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBRTdCLFNBQVMsbUJBQW1COzs7QUFPNUIsT0FBTyxTQUFTLHVCQUF1QixFQUFFLGFBQWEscUJBQTRCO0NBQ2hGLE1BQU0sZUFBZSxhQUFhLFlBQVk7Q0FDOUMsTUFBTSxXQUFXLGFBQWEsUUFBUTtDQUN0QyxNQUFNLFdBQVcsY0FBYyxZQUFZLFlBQVksUUFBUTtDQUUvRCxPQUNFLHdCQUFDLFVBQUQ7RUFBUSxXQUFVO0VBQTRCLElBQUc7WUFBakQsQ0FDRSx3QkFBQyxPQUFEO0dBQUssV0FBVTthQUFmLENBQ0Usd0JBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZixDQUNFLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQTBCO0lBQWtCOzs7O2NBQzNELHdCQUFDLE9BQUQsYUFDRSx3QkFBQyxLQUFEO0tBQUcsV0FBVTtlQUF3QjtJQUFZOzs7O2NBQ2pELHdCQUFDLEtBQUQ7S0FBRyxXQUFVO2VBQXdCO0lBQVk7Ozs7WUFDOUM7Ozs7WUFDRjs7Ozs7YUFFTCx3QkFBQyxRQUFEO0lBQ0UsTUFBSztJQUNMLE1BQUs7SUFDTDtJQUNBO0lBQ0EsVUFBUztJQUNULGNBQVc7SUFDWCxXQUFVO0lBQ1YsU0FBUztHQUNWOzs7O1dBQ0U7Ozs7O1lBRUwsd0JBQUMsY0FBRCxDQUFlOzs7O1VBQ1Q7Ozs7OztBQUVaIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkRhc2hib2FyZFNpZGViYXJGb290ZXIudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3ByaW1lcmVhY3QvYnV0dG9uJ1xyXG5pbXBvcnQgeyBMb2dvdXRCdXR0b24gfSBmcm9tICcuL0xvZ291dEJ1dHRvbidcclxuaW1wb3J0IHR5cGUgeyBDdXJyZW50VXNlciB9IGZyb20gJy4uLy4uL3R5cGVzL3Byb2ZpbGUnXHJcbmltcG9ydCB7IFJPTEVfTEFCRUxTIH0gZnJvbSAnLi4vLi4vdXRpbHMvcm9sZXMnXHJcblxyXG5pbnRlcmZhY2UgUHJvcHMge1xyXG4gIGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlciB8IG51bGxcclxuICBvbkdvVG9FZGl0UHJvZmlsZTogKCkgPT4gdm9pZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRGFzaGJvYXJkU2lkZWJhckZvb3Rlcih7IGN1cnJlbnRVc2VyLCBvbkdvVG9FZGl0UHJvZmlsZSB9OiBQcm9wcykge1xyXG4gIGNvbnN0IHVzZXJJbml0aWFscyA9IGN1cnJlbnRVc2VyPy5pbml0aWFscyA/PyAnLS0nXHJcbiAgY29uc3QgdXNlck5hbWUgPSBjdXJyZW50VXNlcj8ubmFtZSA/PyAnQ2FyZ2FuZG8gdXN1YXJpby4uLidcclxuICBjb25zdCB1c2VyUm9sZSA9IGN1cnJlbnRVc2VyID8gUk9MRV9MQUJFTFNbY3VycmVudFVzZXIucm9sZV0gOiAnU2luIHJvbCdcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxmb290ZXIgY2xhc3NOYW1lPVwiZGFzaGJvYXJkLXNpZGViYXJfX2Zvb3RlclwiIGlkPVwiY29udGFjdG9cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXNoYm9hcmQtdXNlci1jYXJkXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXNoYm9hcmQtdXNlclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXNoYm9hcmQtdXNlcl9fYXZhdGFyXCI+e3VzZXJJbml0aWFsc308L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRhc2hib2FyZC11c2VyX19uYW1lXCI+e3VzZXJOYW1lfTwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGFzaGJvYXJkLXVzZXJfX3JvbGVcIj57dXNlclJvbGV9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxCdXR0b25cclxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgaWNvbj1cInBpIHBpLWNvZ1wiXHJcbiAgICAgICAgICByb3VuZGVkXHJcbiAgICAgICAgICB0ZXh0XHJcbiAgICAgICAgICBzZXZlcml0eT1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICBhcmlhLWxhYmVsPVwiRWRpdGFyIHBlcmZpbFwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJkYXNoYm9hcmQtcHJvZmlsZS1idXR0b25cIlxyXG4gICAgICAgICAgb25DbGljaz17b25Hb1RvRWRpdFByb2ZpbGV9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8TG9nb3V0QnV0dG9uIC8+XHJcbiAgICA8L2Zvb3Rlcj5cclxuICApXHJcbn0iXX0=