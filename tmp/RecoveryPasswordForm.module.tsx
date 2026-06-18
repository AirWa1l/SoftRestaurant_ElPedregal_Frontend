import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/recovery_password/RecoveryPasswordForm.tsx");const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport7_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=a3d32f18";
import { userService } from "/src/services/userService.ts";
import { InputText } from "/node_modules/.vite/deps/primereact_inputtext.js?v=a3d32f18";
import { Button } from "/node_modules/.vite/deps/primereact_button.js?v=a3d32f18";
import { Message } from "/node_modules/.vite/deps/primereact_message.js?v=a3d32f18";
import { classNames } from "/node_modules/.vite/deps/primereact_utils.js?v=a3d32f18";
import "/node_modules/primeicons/primeicons.css";
var _jsxFileName = "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/recovery_password/RecoveryPasswordForm.tsx";
import __vite__cjsImport7_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=a3d32f18";
var _s = $RefreshSig$();
const INITIAL_FORM = { email: "" };
function validate(form) {
	const errors = {};
	if (!form.email.trim()) {
		errors.email = "El correo es obligatorio";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
		errors.email = "Ingresa un correo válido";
	}
	return errors;
}
export function RecoveryPasswordForm({ onGoToLogin }) {
	_s();
	const [form, setForm] = useState(INITIAL_FORM);
	const [errors, setErrors] = useState({});
	const [apiError, setApiError] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	function handleChange(field, value) {
		setForm((prev) => ({
			...prev,
			[field]: value
		}));
		setApiError(null);
		if (errors[field]) {
			setErrors((prev) => {
				const next = { ...prev };
				delete next[field];
				return next;
			});
		}
	}
	async function handleSubmit(e) {
		e.preventDefault();
		setApiError(null);
		const validationErrors = validate(form);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) return;
		setIsSubmitting(true);
		try {
			const response = await userService.recoveryPassword(form);
			if (response.success) {
				setSubmitted(true);
			} else {
				setApiError(response.message);
			}
		} catch (error) {
			setApiError("Ocurrió un error inesperado al conectar con el servidor.");
		} finally {
			setIsSubmitting(false);
		}
	}
	// ── Pantalla de éxito ──────────────────────────────────────────────────────
	if (submitted) {
		return /* @__PURE__ */ _jsxDEV("div", {
			className: "w-full mx-auto p-4",
			children: /* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-column align-items-center gap-3 py-4 text-center",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex align-items-center justify-content-center w-4rem h-4rem border-circle bg-green-100",
						children: /* @__PURE__ */ _jsxDEV("i", { className: "pi pi-check-circle text-green-500 text-4xl" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("h3", {
						className: "m-0 text-xl font-bold text-900",
						children: "¡Enlace enviado!"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 80,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("p", {
						className: "m-0 text-sm text-600 max-w-20rem",
						children: [
							"Hemos enviado un enlace de recuperación a ",
							/* @__PURE__ */ _jsxDEV("strong", { children: form.email }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 82,
								columnNumber: 55
							}, this),
							". Revisa tu bandeja de entrada (y spam si es necesario)."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("p", {
						className: "m-0 text-xs text-600 mt-3",
						children: "El enlace expirará en 1 hora."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 85,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Button, {
						className: "mt-4 border-round-3xl font-bold w-full",
						label: "Volver al inicio de sesión",
						icon: "pi pi-sign-in",
						iconPos: "right",
						onClick: onGoToLogin
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 76,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 75,
			columnNumber: 7
		}, this);
	}
	const FooterLink = () => /* @__PURE__ */ _jsxDEV("div", {
		className: "text-center mt-4",
		children: /* @__PURE__ */ _jsxDEV("p", {
			className: "text-sm font-semibold text-600 m-0",
			children: [
				"¿Recordaste tu contraseña?",
				" ",
				/* @__PURE__ */ _jsxDEV("a", {
					onClick: onGoToLogin,
					className: "text-primary no-underline font-bold hover:underline cursor-pointer",
					children: "Inicia sesión"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 104,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 102,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 101,
		columnNumber: 5
	}, this);
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "w-full mx-auto p-4",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "text-center mb-4",
				children: [/* @__PURE__ */ _jsxDEV("h2", {
					className: "text-xl font-bold text-900 m-0 mb-2",
					children: "Recuperar contraseña"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 114,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("p", {
					className: "text-sm text-600 m-0",
					children: "Ingresa el correo asociado a tu cuenta para continuar."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 115,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 113,
				columnNumber: 7
			}, this),
			apiError && /* @__PURE__ */ _jsxDEV("div", {
				className: "mb-3",
				children: /* @__PURE__ */ _jsxDEV(Message, {
					severity: "error",
					text: apiError,
					className: "w-full justify-content-start"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 122,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 121,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV("form", {
				onSubmit: handleSubmit,
				noValidate: true,
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-column gap-2 mb-4",
					children: [
						/* @__PURE__ */ _jsxDEV("label", {
							className: "text-xs font-bold text-primary uppercase",
							htmlFor: "recovery-email",
							children: "Correo electrónico"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 128,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV(InputText, {
							id: "recovery-email",
							type: "email",
							className: classNames("w-full", { "p-invalid": errors.email }),
							placeholder: "correo@ejemplo.com",
							value: form.email,
							onChange: (e) => handleChange("email", e.target.value),
							autoComplete: "email",
							autoFocus: true,
							disabled: isSubmitting
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 11
						}, this),
						errors.email && /* @__PURE__ */ _jsxDEV("small", {
							className: "p-error",
							role: "alert",
							children: errors.email
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 127,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV(Button, {
					type: "submit",
					className: "w-full border-round-3xl font-bold",
					label: isSubmitting ? "Enviando..." : "Enviar enlace de recuperación",
					loading: isSubmitting,
					disabled: isSubmitting
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 147,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 126,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(FooterLink, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 156,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 112,
		columnNumber: 5
	}, this);
}
_s(RecoveryPasswordForm, "BqemQTAYpDcTrpzypg72fC2WXsQ=");
_c = RecoveryPasswordForm;
var _c;
$RefreshReg$(_c, "RecoveryPasswordForm");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/components/recovery_password/RecoveryPasswordForm.tsx?t=1781748810870";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/recovery_password/RecoveryPasswordForm.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/recovery_password/RecoveryPasswordForm.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/recovery_password/RecoveryPasswordForm.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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O0lBQXdCOzs7O2NBQzVFLHdCQUFDLEtBQUQ7S0FBRyxXQUFVO2VBQXVCO0lBRWpDOzs7O1lBQ0E7Ozs7OztHQUVKLFlBQ0Msd0JBQUMsT0FBRDtJQUFLLFdBQVU7Y0FDYix3QkFBQyxTQUFEO0tBQVMsVUFBUztLQUFRLE1BQU07S0FBVSxXQUFVO0lBQWdDOzs7OztHQUNqRjs7Ozs7R0FHUCx3QkFBQyxRQUFEO0lBQU0sVUFBVTtJQUFjO2NBQTlCLENBQ0Usd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZjtNQUNFLHdCQUFDLFNBQUQ7T0FBTyxXQUFVO09BQTJDLFNBQVE7aUJBQWlCO01BRTlFOzs7OztNQUNQLHdCQUFDLFdBQUQ7T0FDRSxJQUFHO09BQ0gsTUFBSztPQUNMLFdBQVcsV0FBVyxVQUFVLEVBQUUsYUFBYSxPQUFPLE1BQU0sQ0FBQztPQUM3RCxhQUFZO09BQ1osT0FBTyxLQUFLO09BQ1osV0FBVyxNQUFNLGFBQWEsU0FBUyxFQUFFLE9BQU8sS0FBSztPQUNyRCxjQUFhO09BQ2I7T0FDQSxVQUFVO01BQ1g7Ozs7O01BQ0EsT0FBTyxTQUNOLHdCQUFDLFNBQUQ7T0FBTyxXQUFVO09BQVUsTUFBSztpQkFBUyxPQUFPO01BQWE7Ozs7O0tBRTVEOzs7OztjQUVMLHdCQUFDLFFBQUQ7S0FDRSxNQUFLO0tBQ0wsV0FBVTtLQUNWLE9BQU8sZUFBZSxnQkFBZ0I7S0FDdEMsU0FBUztLQUNULFVBQVU7SUFDWDs7OztZQUNHOzs7Ozs7R0FFTix3QkFBQyxZQUFELENBQWE7Ozs7O0VBQ1Y7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIlJlY292ZXJ5UGFzc3dvcmRGb3JtLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdHlwZSBGb3JtRXZlbnQgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHR5cGUgeyBSZWNvdmVyeVBhc3N3b3JkRm9ybURhdGEsIFJlY292ZXJ5UGFzc3dvcmRGb3JtRXJyb3JzIH0gZnJvbSAnLi4vLi4vdHlwZXMvcmVjb3ZlcnlQYXNzd29yZCdcclxuaW1wb3J0IHsgdXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91c2VyU2VydmljZSdcclxuaW1wb3J0IHsgSW5wdXRUZXh0IH0gZnJvbSAncHJpbWVyZWFjdC9pbnB1dHRleHQnXHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3ByaW1lcmVhY3QvYnV0dG9uJ1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAncHJpbWVyZWFjdC9tZXNzYWdlJ1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSAncHJpbWVyZWFjdC91dGlscydcclxuaW1wb3J0ICdwcmltZWljb25zL3ByaW1laWNvbnMuY3NzJ1xyXG5cclxuY29uc3QgSU5JVElBTF9GT1JNOiBSZWNvdmVyeVBhc3N3b3JkRm9ybURhdGEgPSB7XHJcbiAgZW1haWw6ICcnLFxyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZShmb3JtOiBSZWNvdmVyeVBhc3N3b3JkRm9ybURhdGEpOiBSZWNvdmVyeVBhc3N3b3JkRm9ybUVycm9ycyB7XHJcbiAgY29uc3QgZXJyb3JzOiBSZWNvdmVyeVBhc3N3b3JkRm9ybUVycm9ycyA9IHt9XHJcblxyXG4gIGlmICghZm9ybS5lbWFpbC50cmltKCkpIHtcclxuICAgIGVycm9ycy5lbWFpbCA9ICdFbCBjb3JyZW8gZXMgb2JsaWdhdG9yaW8nXHJcbiAgfSBlbHNlIGlmICghL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC8udGVzdChmb3JtLmVtYWlsKSkge1xyXG4gICAgZXJyb3JzLmVtYWlsID0gJ0luZ3Jlc2EgdW4gY29ycmVvIHbDoWxpZG8nXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZXJyb3JzXHJcbn1cclxuXHJcbmludGVyZmFjZSBQcm9wcyB7XHJcbiAgb25Hb1RvTG9naW46ICgpID0+IHZvaWRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlY292ZXJ5UGFzc3dvcmRGb3JtKHsgb25Hb1RvTG9naW4gfTogUHJvcHMpIHtcclxuICBjb25zdCBbZm9ybSwgc2V0Rm9ybV0gPSB1c2VTdGF0ZTxSZWNvdmVyeVBhc3N3b3JkRm9ybURhdGE+KElOSVRJQUxfRk9STSlcclxuICBjb25zdCBbZXJyb3JzLCBzZXRFcnJvcnNdID0gdXNlU3RhdGU8UmVjb3ZlcnlQYXNzd29yZEZvcm1FcnJvcnM+KHt9KVxyXG4gIGNvbnN0IFthcGlFcnJvciwgc2V0QXBpRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbc3VibWl0dGVkLCBzZXRTdWJtaXR0ZWRdID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW2lzU3VibWl0dGluZywgc2V0SXNTdWJtaXR0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoZmllbGQ6IGtleW9mIFJlY292ZXJ5UGFzc3dvcmRGb3JtRGF0YSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgc2V0Rm9ybSgocHJldikgPT4gKHsgLi4ucHJldiwgW2ZpZWxkXTogdmFsdWUgfSkpXHJcbiAgICBzZXRBcGlFcnJvcihudWxsKVxyXG4gICAgaWYgKGVycm9yc1tmaWVsZF0pIHtcclxuICAgICAgc2V0RXJyb3JzKChwcmV2KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldiB9XHJcbiAgICAgICAgZGVsZXRlIG5leHRbZmllbGRdXHJcbiAgICAgICAgcmV0dXJuIG5leHRcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChlOiBGb3JtRXZlbnQpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgc2V0QXBpRXJyb3IobnVsbClcclxuXHJcbiAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3JzID0gdmFsaWRhdGUoZm9ybSlcclxuICAgIHNldEVycm9ycyh2YWxpZGF0aW9uRXJyb3JzKVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHZhbGlkYXRpb25FcnJvcnMpLmxlbmd0aCA+IDApIHJldHVyblxyXG5cclxuICAgIHNldElzU3VibWl0dGluZyh0cnVlKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1c2VyU2VydmljZS5yZWNvdmVyeVBhc3N3b3JkKGZvcm0pXHJcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgc2V0U3VibWl0dGVkKHRydWUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0QXBpRXJyb3IocmVzcG9uc2UubWVzc2FnZSlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgc2V0QXBpRXJyb3IoJ09jdXJyacOzIHVuIGVycm9yIGluZXNwZXJhZG8gYWwgY29uZWN0YXIgY29uIGVsIHNlcnZpZG9yLicpXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc1N1Ym1pdHRpbmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyDilIDilIAgUGFudGFsbGEgZGUgw6l4aXRvIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG4gIGlmIChzdWJtaXR0ZWQpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG14LWF1dG8gcC00XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLWNlbnRlciBnYXAtMyBweS00IHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXIgdy00cmVtIGgtNHJlbSBib3JkZXItY2lyY2xlIGJnLWdyZWVuLTEwMFwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJwaSBwaS1jaGVjay1jaXJjbGUgdGV4dC1ncmVlbi01MDAgdGV4dC00eGxcIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwibS0wIHRleHQteGwgZm9udC1ib2xkIHRleHQtOTAwXCI+wqFFbmxhY2UgZW52aWFkbyE8L2gzPlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibS0wIHRleHQtc20gdGV4dC02MDAgbWF4LXctMjByZW1cIj5cclxuICAgICAgICAgICAgSGVtb3MgZW52aWFkbyB1biBlbmxhY2UgZGUgcmVjdXBlcmFjacOzbiBhIDxzdHJvbmc+e2Zvcm0uZW1haWx9PC9zdHJvbmc+LiBcclxuICAgICAgICAgICAgUmV2aXNhIHR1IGJhbmRlamEgZGUgZW50cmFkYSAoeSBzcGFtIHNpIGVzIG5lY2VzYXJpbykuXHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtLTAgdGV4dC14cyB0ZXh0LTYwMCBtdC0zXCI+XHJcbiAgICAgICAgICAgIEVsIGVubGFjZSBleHBpcmFyw6EgZW4gMSBob3JhLlxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtdC00IGJvcmRlci1yb3VuZC0zeGwgZm9udC1ib2xkIHctZnVsbFwiXHJcbiAgICAgICAgICAgIGxhYmVsPVwiVm9sdmVyIGFsIGluaWNpbyBkZSBzZXNpw7NuXCJcclxuICAgICAgICAgICAgaWNvbj1cInBpIHBpLXNpZ24taW5cIlxyXG4gICAgICAgICAgICBpY29uUG9zPVwicmlnaHRcIlxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkdvVG9Mb2dpbn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgY29uc3QgRm9vdGVyTGluayA9ICgpID0+IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbXQtNFwiPlxyXG4gICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC02MDAgbS0wXCI+XHJcbiAgICAgICAgwr9SZWNvcmRhc3RlIHR1IGNvbnRyYXNlw7FhP3snICd9XHJcbiAgICAgICAgPGEgb25DbGljaz17b25Hb1RvTG9naW59IGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBuby11bmRlcmxpbmUgZm9udC1ib2xkIGhvdmVyOnVuZGVybGluZSBjdXJzb3ItcG9pbnRlclwiPlxyXG4gICAgICAgICAgSW5pY2lhIHNlc2nDs25cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvcD5cclxuICAgIDwvZGl2PlxyXG4gIClcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG14LWF1dG8gcC00XCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItNFwiPlxyXG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LTkwMCBtLTAgbWItMlwiPlJlY3VwZXJhciBjb250cmFzZcOxYTwvaDI+XHJcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LTYwMCBtLTBcIj5cclxuICAgICAgICAgIEluZ3Jlc2EgZWwgY29ycmVvIGFzb2NpYWRvIGEgdHUgY3VlbnRhIHBhcmEgY29udGludWFyLlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7YXBpRXJyb3IgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItM1wiPlxyXG4gICAgICAgICAgPE1lc3NhZ2Ugc2V2ZXJpdHk9XCJlcnJvclwiIHRleHQ9e2FwaUVycm9yfSBjbGFzc05hbWU9XCJ3LWZ1bGwganVzdGlmeS1jb250ZW50LXN0YXJ0XCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IG5vVmFsaWRhdGU+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sdW1uIGdhcC0yIG1iLTRcIj5cclxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXByaW1hcnkgdXBwZXJjYXNlXCIgaHRtbEZvcj1cInJlY292ZXJ5LWVtYWlsXCI+XHJcbiAgICAgICAgICAgIENvcnJlbyBlbGVjdHLDs25pY29cclxuICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICA8SW5wdXRUZXh0XHJcbiAgICAgICAgICAgIGlkPVwicmVjb3ZlcnktZW1haWxcIlxyXG4gICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3ctZnVsbCcsIHsgJ3AtaW52YWxpZCc6IGVycm9ycy5lbWFpbCB9KX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJjb3JyZW9AZWplbXBsby5jb21cIlxyXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybS5lbWFpbH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoJ2VtYWlsJywgZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJlbWFpbFwiXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1c1xyXG4gICAgICAgICAgICBkaXNhYmxlZD17aXNTdWJtaXR0aW5nfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHtlcnJvcnMuZW1haWwgJiYgKFxyXG4gICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwicC1lcnJvclwiIHJvbGU9XCJhbGVydFwiPntlcnJvcnMuZW1haWx9PC9zbWFsbD5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxCdXR0b25cclxuICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJvcmRlci1yb3VuZC0zeGwgZm9udC1ib2xkXCJcclxuICAgICAgICAgIGxhYmVsPXtpc1N1Ym1pdHRpbmcgPyAnRW52aWFuZG8uLi4nIDogJ0VudmlhciBlbmxhY2UgZGUgcmVjdXBlcmFjacOzbid9XHJcbiAgICAgICAgICBsb2FkaW5nPXtpc1N1Ym1pdHRpbmd9XHJcbiAgICAgICAgICBkaXNhYmxlZD17aXNTdWJtaXR0aW5nfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgIDxGb290ZXJMaW5rIC8+XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbn1cclxuIl19