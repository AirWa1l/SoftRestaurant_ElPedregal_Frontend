import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/login/LoginForm.tsx");const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport8_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=a3d32f18";
import { userService } from "/src/services/userService.ts";
import { InputText } from "/node_modules/.vite/deps/primereact_inputtext.js?v=a3d32f18";
import { Password } from "/node_modules/.vite/deps/primereact_password.js?v=a3d32f18";
import { Button } from "/node_modules/.vite/deps/primereact_button.js?v=a3d32f18";
import { Message } from "/node_modules/.vite/deps/primereact_message.js?v=a3d32f18";
import { classNames } from "/node_modules/.vite/deps/primereact_utils.js?v=a3d32f18";
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=a3d32f18";
var _jsxFileName = "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/login/LoginForm.tsx";
import __vite__cjsImport8_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=a3d32f18";
var _s = $RefreshSig$();
const INITIAL_FORM = {
	email: "",
	password: ""
};
function validate(form) {
	const errors = {};
	if (!form.email.trim()) {
		errors.email = "El correo es obligatorio";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
		errors.email = "Ingresa un correo válido";
	}
	if (!form.password) {
		errors.password = "La contraseña es obligatoria";
	}
	return errors;
}
export function LoginForm({ onGoToRecovery, onGoToRegister }) {
	_s();
	const navigate = useNavigate();
	const [form, setForm] = useState(INITIAL_FORM);
	const [errors, setErrors] = useState({});
	const [apiError, setApiError] = useState(null);
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
			const response = await userService.login(form);
			if (response.success) {
				navigate("/home");
			} else {
				setApiError(response.message);
			}
		} catch {
			setApiError("Ocurrió un error inesperado al conectar con el servidor.");
		} finally {
			setIsSubmitting(false);
		}
	}
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "w-full mx-auto p-4",
		children: [
			/* @__PURE__ */ _jsxDEV("h2", {
				className: "text-center font-bold text-3xl text-900 m-0 mb-2",
				children: "Iniciar sesión"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 86,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("p", {
				className: "text-center text-sm m-0 mb-5 text-600 font-medium",
				children: "Accede a tu cuenta para continuar."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 87,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("form", {
				onSubmit: handleSubmit,
				noValidate: true,
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-column gap-2 mb-3",
						children: [
							/* @__PURE__ */ _jsxDEV("label", {
								className: "text-xs font-bold text-primary uppercase",
								htmlFor: "login-email",
								children: "Correo electrónico"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 93,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV(InputText, {
								id: "login-email",
								type: "email",
								className: classNames({ "p-invalid": errors.email }),
								placeholder: "correo@ejemplo.com",
								value: form.email,
								onChange: (e) => handleChange("email", e.target.value),
								autoComplete: "email"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 96,
								columnNumber: 11
							}, this),
							errors.email && /* @__PURE__ */ _jsxDEV("small", {
								className: "p-error block mt-1",
								role: "alert",
								children: errors.email
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 106,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-column gap-2 mb-3",
						children: [
							/* @__PURE__ */ _jsxDEV("label", {
								className: "text-xs font-bold text-primary uppercase",
								htmlFor: "login-password",
								children: "Contraseña"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 113,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV(Password, {
								id: "login-password",
								inputClassName: "w-full",
								className: classNames({ "p-invalid": errors.password }),
								toggleMask: true,
								feedback: false,
								placeholder: "Tu contraseña",
								value: form.password,
								onChange: (e) => handleChange("password", e.target.value),
								autoComplete: "current-password"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 116,
								columnNumber: 11
							}, this),
							errors.password && /* @__PURE__ */ _jsxDEV("small", {
								className: "p-error block mt-1",
								role: "alert",
								children: errors.password
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 9
					}, this),
					apiError && /* @__PURE__ */ _jsxDEV("div", {
						className: "mb-4",
						children: /* @__PURE__ */ _jsxDEV(Message, {
							severity: "error",
							text: apiError,
							className: "w-full justify-content-start border-round-xl p-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Button, {
						type: "submit",
						className: "w-full mt-4 border-round-3xl font-bold",
						label: isSubmitting ? "Ingresando…" : "Iniciar sesión",
						loading: isSubmitting
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 144,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-column align-items-center justify-center gap-3 mt-4",
						children: /* @__PURE__ */ _jsxDEV("p", {
							className: "text-center text-sm font-semibold text-600 m-0",
							children: [
								"¿Olvidaste tu contraseña?",
								" ",
								/* @__PURE__ */ _jsxDEV("a", {
									onClick: onGoToRecovery,
									className: "text-primary no-underline font-bold hover:underline transition-colors transition-duration-150",
									children: "Recuperar contraseña"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 154,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-column align-items-center justify-center gap-3 mt-4",
						children: /* @__PURE__ */ _jsxDEV("p", {
							className: "text-center text-sm font-semibold text-600 m-0",
							children: [
								"¿No tienes una cuenta?",
								" ",
								/* @__PURE__ */ _jsxDEV("a", {
									onClick: onGoToRegister,
									className: "text-primary no-underline font-bold hover:underline transition-colors transition-duration-150",
									children: "Registrarme"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 163,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 161,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 160,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 91,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 85,
		columnNumber: 5
	}, this);
}
_s(LoginForm, "/xh7uAnI2Rsy3GxJ9PQx631tftk=", false, function() {
	return [useNavigate];
});
_c = LoginForm;
var _c;
$RefreshReg$(_c, "LoginForm");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/components/login/LoginForm.tsx?t=1781748907532";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/login/LoginForm.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/login/LoginForm.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/login/LoginForm.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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V0FBVyxXQUFXLEVBQUUsYUFBYSxPQUFPLFNBQVMsQ0FBQztRQUN0RDtRQUNBLFVBQVU7UUFDVixhQUFZO1FBQ1osT0FBTyxLQUFLO1FBQ1osV0FBVyxNQUFNLGFBQWEsWUFBWSxFQUFFLE9BQU8sS0FBSztRQUN4RCxjQUFhO09BQ2Q7Ozs7O09BQ0EsT0FBTyxZQUNOLHdCQUFDLFNBQUQ7UUFBTyxXQUFVO1FBQXFCLE1BQUs7a0JBQ3hDLE9BQU87T0FDSDs7Ozs7TUFFTjs7Ozs7O0tBRUosWUFDQyx3QkFBQyxPQUFEO01BQUssV0FBVTtnQkFDYix3QkFBQyxTQUFEO09BQ0UsVUFBUztPQUNULE1BQU07T0FDTixXQUFVO01BQ1g7Ozs7O0tBQ0U7Ozs7O0tBR1Asd0JBQUMsUUFBRDtNQUNFLE1BQUs7TUFDTCxXQUFVO01BQ1YsT0FBTyxlQUFlLGdCQUFnQjtNQUN0QyxTQUFTO0tBQ1Y7Ozs7O0tBRUQsd0JBQUMsT0FBRDtNQUFLLFdBQVU7Z0JBQ1gsd0JBQUMsS0FBRDtPQUFHLFdBQVU7aUJBQWI7UUFBOEQ7UUFDcEM7UUFDMUIsd0JBQUMsS0FBRDtTQUFHLFNBQVM7U0FBZ0IsV0FBVTttQkFBZ0c7UUFFbkk7Ozs7O09BQ0E7Ozs7OztLQUNGOzs7OztLQUVMLHdCQUFDLE9BQUQ7TUFBSyxXQUFVO2dCQUNYLHdCQUFDLEtBQUQ7T0FBRyxXQUFVO2lCQUFiO1FBQThEO1FBQ3ZDO1FBQ3ZCLHdCQUFDLEtBQUQ7U0FBRyxTQUFTO1NBQWdCLFdBQVU7bUJBQWdHO1FBRW5JOzs7OztPQUNBOzs7Ozs7S0FDRjs7Ozs7SUFFRDs7Ozs7O0VBQ0g7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkxvZ2luRm9ybS50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHR5cGUgeyBMb2dpbkZvcm1EYXRhLCBMb2dpbkZvcm1FcnJvcnMgfSBmcm9tICcuLi8uLi90eXBlcy9sb2dpbidcclxuaW1wb3J0IHsgdXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91c2VyU2VydmljZSdcclxuaW1wb3J0IHsgSW5wdXRUZXh0IH0gZnJvbSAncHJpbWVyZWFjdC9pbnB1dHRleHQnXHJcbmltcG9ydCB7IFBhc3N3b3JkIH0gZnJvbSAncHJpbWVyZWFjdC9wYXNzd29yZCdcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAncHJpbWVyZWFjdC9idXR0b24nXHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdwcmltZXJlYWN0L21lc3NhZ2UnXHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tICdwcmltZXJlYWN0L3V0aWxzJ1xyXG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXHJcblxyXG5cclxuY29uc3QgSU5JVElBTF9GT1JNOiBMb2dpbkZvcm1EYXRhID0ge1xyXG4gIGVtYWlsOiAnJyxcclxuICBwYXNzd29yZDogJycsXHJcbn1cclxuXHJcbmludGVyZmFjZSBQcm9wcyB7XHJcbiAgb25Hb1RvUmVjb3Zlcnk6ICgpID0+IHZvaWRcclxuICBvbkdvVG9SZWdpc3RlcjogKCkgPT4gdm9pZFxyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZShmb3JtOiBMb2dpbkZvcm1EYXRhKTogTG9naW5Gb3JtRXJyb3JzIHtcclxuICBjb25zdCBlcnJvcnM6IExvZ2luRm9ybUVycm9ycyA9IHt9XHJcblxyXG4gIGlmICghZm9ybS5lbWFpbC50cmltKCkpIHtcclxuICAgIGVycm9ycy5lbWFpbCA9ICdFbCBjb3JyZW8gZXMgb2JsaWdhdG9yaW8nXHJcbiAgfSBlbHNlIGlmICghL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC8udGVzdChmb3JtLmVtYWlsKSkge1xyXG4gICAgZXJyb3JzLmVtYWlsID0gJ0luZ3Jlc2EgdW4gY29ycmVvIHbDoWxpZG8nXHJcbiAgfVxyXG5cclxuICBpZiAoIWZvcm0ucGFzc3dvcmQpIHtcclxuICAgIGVycm9ycy5wYXNzd29yZCA9ICdMYSBjb250cmFzZcOxYSBlcyBvYmxpZ2F0b3JpYSdcclxuICB9XHJcblxyXG4gIHJldHVybiBlcnJvcnNcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIExvZ2luRm9ybSh7IG9uR29Ub1JlY292ZXJ5LCBvbkdvVG9SZWdpc3RlciB9OiBQcm9wcykge1xyXG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKVxyXG4gIGNvbnN0IFtmb3JtLCBzZXRGb3JtXSA9IHVzZVN0YXRlPExvZ2luRm9ybURhdGE+KElOSVRJQUxfRk9STSlcclxuICBjb25zdCBbZXJyb3JzLCBzZXRFcnJvcnNdID0gdXNlU3RhdGU8TG9naW5Gb3JtRXJyb3JzPih7fSlcclxuICBjb25zdCBbYXBpRXJyb3IsIHNldEFwaUVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW2lzU3VibWl0dGluZywgc2V0SXNTdWJtaXR0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoZmllbGQ6IGtleW9mIExvZ2luRm9ybURhdGEsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHNldEZvcm0oKHByZXYpID0+ICh7IC4uLnByZXYsIFtmaWVsZF06IHZhbHVlIH0pKVxyXG4gICAgc2V0QXBpRXJyb3IobnVsbClcclxuXHJcbiAgICBpZiAoZXJyb3JzW2ZpZWxkXSkge1xyXG4gICAgICBzZXRFcnJvcnMoKHByZXYpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2IH1cclxuICAgICAgICBkZWxldGUgbmV4dFtmaWVsZF1cclxuICAgICAgICByZXR1cm4gbmV4dFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlU3VibWl0KGU6IFJlYWN0LkZvcm1FdmVudDxIVE1MRm9ybUVsZW1lbnQ+KSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIHNldEFwaUVycm9yKG51bGwpXHJcblxyXG4gICAgY29uc3QgdmFsaWRhdGlvbkVycm9ycyA9IHZhbGlkYXRlKGZvcm0pXHJcbiAgICBzZXRFcnJvcnModmFsaWRhdGlvbkVycm9ycylcclxuXHJcbiAgICBpZiAoT2JqZWN0LmtleXModmFsaWRhdGlvbkVycm9ycykubGVuZ3RoID4gMCkgcmV0dXJuXHJcblxyXG4gICAgc2V0SXNTdWJtaXR0aW5nKHRydWUpXHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1c2VyU2VydmljZS5sb2dpbihmb3JtKVxyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcclxuICAgICAgICBuYXZpZ2F0ZSgnL2hvbWUnKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldEFwaUVycm9yKHJlc3BvbnNlLm1lc3NhZ2UpXHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICBzZXRBcGlFcnJvcignT2N1cnJpw7MgdW4gZXJyb3IgaW5lc3BlcmFkbyBhbCBjb25lY3RhciBjb24gZWwgc2Vydmlkb3IuJylcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzU3VibWl0dGluZyhmYWxzZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBteC1hdXRvIHAtNFwiPlxyXG4gICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgZm9udC1ib2xkIHRleHQtM3hsIHRleHQtOTAwIG0tMCBtYi0yXCI+SW5pY2lhciBzZXNpw7NuPC9oMj5cclxuICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgdGV4dC1zbSBtLTAgbWItNSB0ZXh0LTYwMCBmb250LW1lZGl1bVwiPlxyXG4gICAgICAgIEFjY2VkZSBhIHR1IGN1ZW50YSBwYXJhIGNvbnRpbnVhci5cclxuICAgICAgPC9wPlxyXG5cclxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gbm9WYWxpZGF0ZT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2x1bW4gZ2FwLTIgbWItM1wiPlxyXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtcHJpbWFyeSB1cHBlcmNhc2VcIiBodG1sRm9yPVwibG9naW4tZW1haWxcIj5cclxuICAgICAgICAgICAgQ29ycmVvIGVsZWN0csOzbmljb1xyXG4gICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgIDxJbnB1dFRleHRcclxuICAgICAgICAgICAgaWQ9XCJsb2dpbi1lbWFpbFwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7ICdwLWludmFsaWQnOiBlcnJvcnMuZW1haWwgfSl9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiY29ycmVvQGVqZW1wbG8uY29tXCJcclxuICAgICAgICAgICAgdmFsdWU9e2Zvcm0uZW1haWx9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlQ2hhbmdlKCdlbWFpbCcsIGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgYXV0b0NvbXBsZXRlPVwiZW1haWxcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHtlcnJvcnMuZW1haWwgJiYgKFxyXG4gICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwicC1lcnJvciBibG9jayBtdC0xXCIgcm9sZT1cImFsZXJ0XCI+XHJcbiAgICAgICAgICAgICAge2Vycm9ycy5lbWFpbH1cclxuICAgICAgICAgICAgPC9zbWFsbD5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbHVtbiBnYXAtMiBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1wcmltYXJ5IHVwcGVyY2FzZVwiIGh0bWxGb3I9XCJsb2dpbi1wYXNzd29yZFwiPlxyXG4gICAgICAgICAgICBDb250cmFzZcOxYVxyXG4gICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgIDxQYXNzd29yZFxyXG4gICAgICAgICAgICBpZD1cImxvZ2luLXBhc3N3b3JkXCJcclxuICAgICAgICAgICAgaW5wdXRDbGFzc05hbWU9XCJ3LWZ1bGxcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoeyAncC1pbnZhbGlkJzogZXJyb3JzLnBhc3N3b3JkIH0pfVxyXG4gICAgICAgICAgICB0b2dnbGVNYXNrXHJcbiAgICAgICAgICAgIGZlZWRiYWNrPXtmYWxzZX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUdSBjb250cmFzZcOxYVwiXHJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtLnBhc3N3b3JkfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgncGFzc3dvcmQnLCBlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImN1cnJlbnQtcGFzc3dvcmRcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHtlcnJvcnMucGFzc3dvcmQgJiYgKFxyXG4gICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwicC1lcnJvciBibG9jayBtdC0xXCIgcm9sZT1cImFsZXJ0XCI+XHJcbiAgICAgICAgICAgICAge2Vycm9ycy5wYXNzd29yZH1cclxuICAgICAgICAgICAgPC9zbWFsbD5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHthcGlFcnJvciAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTRcIj5cclxuICAgICAgICAgICAgPE1lc3NhZ2VcclxuICAgICAgICAgICAgICBzZXZlcml0eT1cImVycm9yXCJcclxuICAgICAgICAgICAgICB0ZXh0PXthcGlFcnJvcn1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwganVzdGlmeS1jb250ZW50LXN0YXJ0IGJvcmRlci1yb3VuZC14bCBwLTJcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbXQtNCBib3JkZXItcm91bmQtM3hsIGZvbnQtYm9sZFwiXHJcbiAgICAgICAgICBsYWJlbD17aXNTdWJtaXR0aW5nID8gJ0luZ3Jlc2FuZG/igKYnIDogJ0luaWNpYXIgc2VzacOzbid9XHJcbiAgICAgICAgICBsb2FkaW5nPXtpc1N1Ym1pdHRpbmd9XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMyBtdC00XCI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LTYwMCBtLTBcIj5cclxuICAgICAgICAgICAgwr9PbHZpZGFzdGUgdHUgY29udHJhc2XDsWE/eycgJ31cclxuICAgICAgICAgICAgPGEgb25DbGljaz17b25Hb1RvUmVjb3Zlcnl9IGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBuby11bmRlcmxpbmUgZm9udC1ib2xkIGhvdmVyOnVuZGVybGluZSB0cmFuc2l0aW9uLWNvbG9ycyB0cmFuc2l0aW9uLWR1cmF0aW9uLTE1MFwiPlxyXG4gICAgICAgICAgICAgICAgUmVjdXBlcmFyIGNvbnRyYXNlw7FhXHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0zIG10LTRcIj5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgdGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtNjAwIG0tMFwiPlxyXG4gICAgICAgICAgICDCv05vIHRpZW5lcyB1bmEgY3VlbnRhP3snICd9XHJcbiAgICAgICAgICAgIDxhIG9uQ2xpY2s9e29uR29Ub1JlZ2lzdGVyfSBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgbm8tdW5kZXJsaW5lIGZvbnQtYm9sZCBob3Zlcjp1bmRlcmxpbmUgdHJhbnNpdGlvbi1jb2xvcnMgdHJhbnNpdGlvbi1kdXJhdGlvbi0xNTBcIj5cclxuICAgICAgICAgICAgICAgIFJlZ2lzdHJhcm1lXHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59XHJcbiJdfQ==