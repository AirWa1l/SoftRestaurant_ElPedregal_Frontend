import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/register/RegisterForm.tsx");const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport7_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=a3d32f18";
import { userService } from "/src/services/userService.ts";
import { InputText } from "/node_modules/.vite/deps/primereact_inputtext.js?v=a3d32f18";
import { Password } from "/node_modules/.vite/deps/primereact_password.js?v=a3d32f18";
import { Button } from "/node_modules/.vite/deps/primereact_button.js?v=a3d32f18";
import { Message } from "/node_modules/.vite/deps/primereact_message.js?v=a3d32f18";
import { classNames } from "/node_modules/.vite/deps/primereact_utils.js?v=a3d32f18";
var _jsxFileName = "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/register/RegisterForm.tsx";
import __vite__cjsImport7_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=a3d32f18";
var _s = $RefreshSig$();
const INITIAL_FORM = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	password: "",
	confirmPassword: ""
};
function getPasswordStrength(password) {
	if (!password) return {
		level: 0,
		label: "",
		className: ""
	};
	let score = 0;
	if (password.length >= 8) score++;
	if (/[A-Z]/.test(password)) score++;
	if (/[0-9]/.test(password)) score++;
	if (/[^A-Za-z0-9]/.test(password)) score++;
	const map = {
		1: {
			label: "Débil",
			className: "strength-weak"
		},
		2: {
			label: "Regular",
			className: "strength-fair"
		},
		3: {
			label: "Buena",
			className: "strength-good"
		},
		4: {
			label: "Fuerte",
			className: "strength-strong"
		}
	};
	return {
		level: score,
		...map[score] ?? {
			label: "Débil",
			className: "strength-weak"
		}
	};
}
function validate(form) {
	const errors = {};
	if (!form.firstName.trim()) {
		errors.firstName = "El nombre es obligatorio";
	}
	if (!form.lastName.trim()) {
		errors.lastName = "El apellido es obligatorio";
	}
	if (!form.email.trim()) {
		errors.email = "El correo es obligatorio";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
		errors.email = "Ingresa un correo válido";
	}
	if (!form.phone.trim()) {
		errors.phone = "El teléfono es obligatorio";
	} else if (!/^[+]?\d[\d\s\-()]{6,}$/.test(form.phone)) {
		errors.phone = "Ingresa un teléfono válido";
	}
	if (!form.password) {
		errors.password = "La contraseña es obligatoria";
	} else if (form.password.length < 8) {
		errors.password = "Mínimo 8 caracteres";
	}
	if (!form.confirmPassword) {
		errors.confirmPassword = "Confirma tu contraseña";
	} else if (form.password !== form.confirmPassword) {
		errors.confirmPassword = "Las contraseñas no coinciden";
	}
	return errors;
}
export function RegisterForm({ onGoToLogin }) {
	_s();
	const [form, setForm] = useState(INITIAL_FORM);
	const [errors, setErrors] = useState({});
	const [apiError, setApiError] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const strength = getPasswordStrength(form.password);
	function handleChange(field, value) {
		setForm((prev) => ({
			...prev,
			[field]: value
		}));
		setApiError(null);
		// Clear error on change
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
			const { confirmPassword, ...payload } = form;
			const response = await userService.register(payload);
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
	if (submitted) {
		return /* @__PURE__ */ _jsxDEV("div", {
			className: "w-full max-w-30rem mx-auto p-5 border-round-2xl shadow-4 surface-card border-1 surface-border",
			children: /* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-column align-items-center gap-3 py-4 text-center",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex align-items-center justify-content-center w-4rem h-4rem border-circle bg-green-100 text-green-600 text-3xl font-bold",
						children: "✓"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("h3", {
						className: "m-0 text-xl font-bold text-900",
						children: "¡Registro exitoso!"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 137,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("p", {
						className: "m-0 text-sm text-600 font-medium max-w-25rem",
						children: "Tu cuenta ha sido creada correctamente. Pronto recibirás un correo de confirmación."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 138,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 133,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 132,
			columnNumber: 7
		}, this);
	}
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "w-full mx-auto p-4",
		children: [
			/* @__PURE__ */ _jsxDEV("h2", {
				className: "text-center font-bold text-3xl text-900 m-0 mb-2",
				children: "Crear cuenta"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 148,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("p", {
				className: "text-center text-sm m-0 mb-5 text-600 font-medium",
				children: "Únete a la familia El Pedregal y disfruta beneficios exclusivos."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 149,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("form", {
				onSubmit: handleSubmit,
				noValidate: true,
				id: "register-form",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "col-12 md:col-6 flex flex-column gap-2 mb-3",
							children: [
								/* @__PURE__ */ _jsxDEV("label", {
									className: "text-xs font-bold text-primary uppercase",
									htmlFor: "register-firstName",
									children: "Nombre"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 157,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV(InputText, {
									id: "register-firstName",
									className: classNames({ "p-invalid": errors.firstName }),
									placeholder: "Tu nombre",
									value: form.firstName,
									onChange: (e) => handleChange("firstName", e.target.value),
									autoComplete: "given-name"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 160,
									columnNumber: 13
								}, this),
								errors.firstName && /* @__PURE__ */ _jsxDEV("small", {
									className: "p-error block mt-1",
									role: "alert",
									children: errors.firstName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 169,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "col-12 md:col-6 flex flex-column gap-2 mb-3",
							children: [
								/* @__PURE__ */ _jsxDEV("label", {
									className: "text-xs font-bold text-primary uppercase",
									htmlFor: "register-lastName",
									children: "Apellido"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 174,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV(InputText, {
									id: "register-lastName",
									className: classNames({ "p-invalid": errors.lastName }),
									placeholder: "Tu apellido",
									value: form.lastName,
									onChange: (e) => handleChange("lastName", e.target.value),
									autoComplete: "family-name"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 177,
									columnNumber: 13
								}, this),
								errors.lastName && /* @__PURE__ */ _jsxDEV("small", {
									className: "p-error block mt-1",
									role: "alert",
									children: errors.lastName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 186,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 173,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 155,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-column gap-2 mb-3",
						children: [
							/* @__PURE__ */ _jsxDEV("label", {
								className: "text-xs font-bold text-primary uppercase",
								htmlFor: "register-email",
								children: "Correo electrónico"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 193,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV(InputText, {
								id: "register-email",
								type: "email",
								className: classNames({ "p-invalid": errors.email }),
								placeholder: "correo@ejemplo.com",
								value: form.email,
								onChange: (e) => handleChange("email", e.target.value),
								autoComplete: "email"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 196,
								columnNumber: 11
							}, this),
							errors.email && /* @__PURE__ */ _jsxDEV("small", {
								className: "p-error block mt-1",
								role: "alert",
								children: errors.email
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 192,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-column gap-2 mb-3",
						children: [
							/* @__PURE__ */ _jsxDEV("label", {
								className: "text-xs font-bold text-primary uppercase",
								htmlFor: "register-phone",
								children: "Teléfono"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 212,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV(InputText, {
								id: "register-phone",
								type: "tel",
								className: classNames({ "p-invalid": errors.phone }),
								placeholder: "+57 300 000 0000",
								value: form.phone,
								onChange: (e) => handleChange("phone", e.target.value),
								autoComplete: "tel"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 11
							}, this),
							errors.phone && /* @__PURE__ */ _jsxDEV("small", {
								className: "p-error block mt-1",
								role: "alert",
								children: errors.phone
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 225,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 211,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "col-12 md:col-6 flex flex-column gap-2 mb-3",
							children: [
								/* @__PURE__ */ _jsxDEV("label", {
									className: "text-xs font-bold text-primary uppercase",
									htmlFor: "register-password",
									children: "Contraseña"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 233,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV(Password, {
									id: "register-password",
									inputClassName: "w-full",
									className: classNames({ "p-invalid": errors.password }),
									toggleMask: true,
									feedback: false,
									placeholder: "Mínimo 8 caracteres",
									value: form.password,
									onChange: (e) => handleChange("password", e.target.value),
									autoComplete: "new-password"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 236,
									columnNumber: 13
								}, this),
								errors.password && /* @__PURE__ */ _jsxDEV("small", {
									className: "p-error block mt-1",
									role: "alert",
									children: errors.password
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 248,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 232,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "col-12 md:col-6 flex flex-column gap-2 mb-3",
							children: [
								/* @__PURE__ */ _jsxDEV("label", {
									className: "text-xs font-bold text-primary uppercase",
									htmlFor: "register-confirmPassword",
									children: "Confirmar contraseña"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 254,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV(Password, {
									id: "register-confirmPassword",
									inputClassName: "w-full",
									className: classNames({ "p-invalid": errors.confirmPassword }),
									toggleMask: true,
									feedback: false,
									placeholder: "Repite tu contraseña",
									value: form.confirmPassword,
									onChange: (e) => handleChange("confirmPassword", e.target.value),
									autoComplete: "new-password"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 257,
									columnNumber: 13
								}, this),
								errors.confirmPassword && /* @__PURE__ */ _jsxDEV("small", {
									className: "p-error block mt-1",
									role: "alert",
									children: errors.confirmPassword
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 269,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 253,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 230,
						columnNumber: 9
					}, this),
					form.password && /* @__PURE__ */ _jsxDEV("div", {
						className: "mb-3",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex gap-2 animate-duration-200",
							"aria-hidden": "true",
							children: [
								1,
								2,
								3,
								4
							].map((i) => /* @__PURE__ */ _jsxDEV("div", { className: classNames("flex-1 h-1 border-round-sm transition-colors transition-duration-300", {
								"bg-gray-300": i > strength.level,
								"bg-red-500": i <= strength.level && strength.className === "strength-weak",
								"bg-orange-500": i <= strength.level && strength.className === "strength-fair",
								"bg-green-500": i <= strength.level && strength.className === "strength-good",
								"bg-green-600": i <= strength.level && strength.className === "strength-strong"
							}) }, i, false, {
								fileName: _jsxFileName,
								lineNumber: 279,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 277,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: classNames("text-xs font-bold mt-2 block", {
								"text-red-500": strength.className === "strength-weak",
								"text-orange-500": strength.className === "strength-fair",
								"text-green-500": strength.className === "strength-good",
								"text-green-600": strength.className === "strength-strong"
							}),
							children: strength.label
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 291,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 276,
						columnNumber: 11
					}, this),
					apiError && /* @__PURE__ */ _jsxDEV("div", {
						className: "mb-4",
						children: /* @__PURE__ */ _jsxDEV(Message, {
							severity: "error",
							text: apiError,
							className: "w-full justify-content-start border-round-xl p-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 304,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 303,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Button, {
						type: "submit",
						className: "w-full mt-4 border-round-3xl font-bold",
						id: "register-submit",
						label: isSubmitting ? "Creando cuenta…" : "Crear cuenta",
						loading: isSubmitting
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 313,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 153,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-column align-items-center justify-center gap-3 mt-4",
				children: /* @__PURE__ */ _jsxDEV("p", {
					className: "text-center text-sm font-semibold text-600 m-0",
					children: [
						"¿Ya tienes cuenta?",
						" ",
						/* @__PURE__ */ _jsxDEV("a", {
							onClick: onGoToLogin,
							className: "text-primary no-underline font-bold hover:underline transition-colors transition-duration-150",
							children: "Inicia sesión"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 325,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 323,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 322,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 147,
		columnNumber: 5
	}, this);
}
_s(RegisterForm, "BqemQTAYpDcTrpzypg72fC2WXsQ=");
_c = RegisterForm;
var _c;
$RefreshReg$(_c, "RegisterForm");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/components/register/RegisterForm.tsx?t=1781748867138";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/register/RegisterForm.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/register/RegisterForm.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/register/RegisterForm.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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QVU7ZUFBYjtNQUE4RDtNQUN6QztNQUNuQix3QkFBQyxLQUFEO09BQUcsU0FBUztPQUFhLFdBQVU7aUJBQWdHO01BRWhJOzs7OztLQUNGOzs7Ozs7R0FDQTs7Ozs7RUFFRjs7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiUmVnaXN0ZXJGb3JtLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgdHlwZSB7IFJlZ2lzdGVyRm9ybURhdGEsIFJlZ2lzdGVyRm9ybUVycm9ycyB9IGZyb20gJy4uLy4uL3R5cGVzL3JlZ2lzdGVyJ1xyXG5pbXBvcnQgeyB1c2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3VzZXJTZXJ2aWNlJ1xyXG5pbXBvcnQgeyBJbnB1dFRleHQgfSBmcm9tICdwcmltZXJlYWN0L2lucHV0dGV4dCdcclxuaW1wb3J0IHsgUGFzc3dvcmQgfSBmcm9tICdwcmltZXJlYWN0L3Bhc3N3b3JkJ1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICdwcmltZXJlYWN0L2J1dHRvbidcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ3ByaW1lcmVhY3QvbWVzc2FnZSdcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gJ3ByaW1lcmVhY3QvdXRpbHMnXHJcblxyXG5jb25zdCBJTklUSUFMX0ZPUk06IFJlZ2lzdGVyRm9ybURhdGEgPSB7XHJcbiAgZmlyc3ROYW1lOiAnJyxcclxuICBsYXN0TmFtZTogJycsXHJcbiAgZW1haWw6ICcnLFxyXG4gIHBob25lOiAnJyxcclxuICBwYXNzd29yZDogJycsXHJcbiAgY29uZmlybVBhc3N3b3JkOiAnJyxcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UGFzc3dvcmRTdHJlbmd0aChwYXNzd29yZDogc3RyaW5nKTogeyBsZXZlbDogbnVtYmVyOyBsYWJlbDogc3RyaW5nOyBjbGFzc05hbWU6IHN0cmluZyB9IHtcclxuICBpZiAoIXBhc3N3b3JkKSByZXR1cm4geyBsZXZlbDogMCwgbGFiZWw6ICcnLCBjbGFzc05hbWU6ICcnIH1cclxuXHJcbiAgbGV0IHNjb3JlID0gMFxyXG4gIGlmIChwYXNzd29yZC5sZW5ndGggPj0gOCkgc2NvcmUrK1xyXG4gIGlmICgvW0EtWl0vLnRlc3QocGFzc3dvcmQpKSBzY29yZSsrXHJcbiAgaWYgKC9bMC05XS8udGVzdChwYXNzd29yZCkpIHNjb3JlKytcclxuICBpZiAoL1teQS1aYS16MC05XS8udGVzdChwYXNzd29yZCkpIHNjb3JlKytcclxuXHJcbiAgY29uc3QgbWFwOiBSZWNvcmQ8bnVtYmVyLCB7IGxhYmVsOiBzdHJpbmc7IGNsYXNzTmFtZTogc3RyaW5nIH0+ID0ge1xyXG4gICAgMTogeyBsYWJlbDogJ0TDqWJpbCcsIGNsYXNzTmFtZTogJ3N0cmVuZ3RoLXdlYWsnIH0sXHJcbiAgICAyOiB7IGxhYmVsOiAnUmVndWxhcicsIGNsYXNzTmFtZTogJ3N0cmVuZ3RoLWZhaXInIH0sXHJcbiAgICAzOiB7IGxhYmVsOiAnQnVlbmEnLCBjbGFzc05hbWU6ICdzdHJlbmd0aC1nb29kJyB9LFxyXG4gICAgNDogeyBsYWJlbDogJ0Z1ZXJ0ZScsIGNsYXNzTmFtZTogJ3N0cmVuZ3RoLXN0cm9uZycgfSxcclxuICB9XHJcblxyXG4gIHJldHVybiB7IGxldmVsOiBzY29yZSwgLi4uKG1hcFtzY29yZV0gPz8geyBsYWJlbDogJ0TDqWJpbCcsIGNsYXNzTmFtZTogJ3N0cmVuZ3RoLXdlYWsnIH0pIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGUoZm9ybTogUmVnaXN0ZXJGb3JtRGF0YSk6IFJlZ2lzdGVyRm9ybUVycm9ycyB7XHJcbiAgY29uc3QgZXJyb3JzOiBSZWdpc3RlckZvcm1FcnJvcnMgPSB7fVxyXG5cclxuICBpZiAoIWZvcm0uZmlyc3ROYW1lLnRyaW0oKSkge1xyXG4gICAgZXJyb3JzLmZpcnN0TmFtZSA9ICdFbCBub21icmUgZXMgb2JsaWdhdG9yaW8nXHJcbiAgfVxyXG5cclxuICBpZiAoIWZvcm0ubGFzdE5hbWUudHJpbSgpKSB7XHJcbiAgICBlcnJvcnMubGFzdE5hbWUgPSAnRWwgYXBlbGxpZG8gZXMgb2JsaWdhdG9yaW8nXHJcbiAgfVxyXG5cclxuICBpZiAoIWZvcm0uZW1haWwudHJpbSgpKSB7XHJcbiAgICBlcnJvcnMuZW1haWwgPSAnRWwgY29ycmVvIGVzIG9ibGlnYXRvcmlvJ1xyXG4gIH0gZWxzZSBpZiAoIS9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvLnRlc3QoZm9ybS5lbWFpbCkpIHtcclxuICAgIGVycm9ycy5lbWFpbCA9ICdJbmdyZXNhIHVuIGNvcnJlbyB2w6FsaWRvJ1xyXG4gIH1cclxuXHJcbiAgaWYgKCFmb3JtLnBob25lLnRyaW0oKSkge1xyXG4gICAgZXJyb3JzLnBob25lID0gJ0VsIHRlbMOpZm9ubyBlcyBvYmxpZ2F0b3JpbydcclxuICB9IGVsc2UgaWYgKCEvXlsrXT9cXGRbXFxkXFxzXFwtKCldezYsfSQvLnRlc3QoZm9ybS5waG9uZSkpIHtcclxuICAgIGVycm9ycy5waG9uZSA9ICdJbmdyZXNhIHVuIHRlbMOpZm9ubyB2w6FsaWRvJ1xyXG4gIH1cclxuXHJcbiAgaWYgKCFmb3JtLnBhc3N3b3JkKSB7XHJcbiAgICBlcnJvcnMucGFzc3dvcmQgPSAnTGEgY29udHJhc2XDsWEgZXMgb2JsaWdhdG9yaWEnXHJcbiAgfSBlbHNlIGlmIChmb3JtLnBhc3N3b3JkLmxlbmd0aCA8IDgpIHtcclxuICAgIGVycm9ycy5wYXNzd29yZCA9ICdNw61uaW1vIDggY2FyYWN0ZXJlcydcclxuICB9XHJcblxyXG4gIGlmICghZm9ybS5jb25maXJtUGFzc3dvcmQpIHtcclxuICAgIGVycm9ycy5jb25maXJtUGFzc3dvcmQgPSAnQ29uZmlybWEgdHUgY29udHJhc2XDsWEnXHJcbiAgfSBlbHNlIGlmIChmb3JtLnBhc3N3b3JkICE9PSBmb3JtLmNvbmZpcm1QYXNzd29yZCkge1xyXG4gICAgZXJyb3JzLmNvbmZpcm1QYXNzd29yZCA9ICdMYXMgY29udHJhc2XDsWFzIG5vIGNvaW5jaWRlbidcclxuICB9XHJcblxyXG4gIHJldHVybiBlcnJvcnNcclxufVxyXG5cclxuaW50ZXJmYWNlIFByb3BzIHtcclxuICBvbkdvVG9Mb2dpbjogKCkgPT4gdm9pZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVnaXN0ZXJGb3JtKHsgb25Hb1RvTG9naW4gfTogUHJvcHMpIHtcclxuICBjb25zdCBbZm9ybSwgc2V0Rm9ybV0gPSB1c2VTdGF0ZTxSZWdpc3RlckZvcm1EYXRhPihJTklUSUFMX0ZPUk0pXHJcbiAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlPFJlZ2lzdGVyRm9ybUVycm9ycz4oe30pXHJcbiAgY29uc3QgW2FwaUVycm9yLCBzZXRBcGlFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtzdWJtaXR0ZWQsIHNldFN1Ym1pdHRlZF0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICBjb25zdCBbaXNTdWJtaXR0aW5nLCBzZXRJc1N1Ym1pdHRpbmddID0gdXNlU3RhdGUoZmFsc2UpXHJcblxyXG4gIGNvbnN0IHN0cmVuZ3RoID0gZ2V0UGFzc3dvcmRTdHJlbmd0aChmb3JtLnBhc3N3b3JkKVxyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoZmllbGQ6IGtleW9mIFJlZ2lzdGVyRm9ybURhdGEsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHNldEZvcm0oKHByZXYpID0+ICh7IC4uLnByZXYsIFtmaWVsZF06IHZhbHVlIH0pKVxyXG4gICAgc2V0QXBpRXJyb3IobnVsbClcclxuXHJcbiAgICAvLyBDbGVhciBlcnJvciBvbiBjaGFuZ2VcclxuICAgIGlmIChlcnJvcnNbZmllbGRdKSB7XHJcbiAgICAgIHNldEVycm9ycygocHJldikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXYgfVxyXG4gICAgICAgIGRlbGV0ZSBuZXh0W2ZpZWxkXVxyXG4gICAgICAgIHJldHVybiBuZXh0XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoZTogUmVhY3QuRm9ybUV2ZW50KSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIHNldEFwaUVycm9yKG51bGwpXHJcblxyXG4gICAgY29uc3QgdmFsaWRhdGlvbkVycm9ycyA9IHZhbGlkYXRlKGZvcm0pXHJcbiAgICBzZXRFcnJvcnModmFsaWRhdGlvbkVycm9ycylcclxuXHJcbiAgICBpZiAoT2JqZWN0LmtleXModmFsaWRhdGlvbkVycm9ycykubGVuZ3RoID4gMCkgcmV0dXJuXHJcblxyXG4gICAgc2V0SXNTdWJtaXR0aW5nKHRydWUpXHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBjb25maXJtUGFzc3dvcmQsIC4uLnBheWxvYWQgfSA9IGZvcm1cclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1c2VyU2VydmljZS5yZWdpc3RlcihwYXlsb2FkKVxyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcclxuICAgICAgICBzZXRTdWJtaXR0ZWQodHJ1ZSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRBcGlFcnJvcihyZXNwb25zZS5tZXNzYWdlKVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBzZXRBcGlFcnJvcignT2N1cnJpw7MgdW4gZXJyb3IgaW5lc3BlcmFkbyBhbCBjb25lY3RhciBjb24gZWwgc2Vydmlkb3IuJylcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzU3VibWl0dGluZyhmYWxzZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChzdWJtaXR0ZWQpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LTMwcmVtIG14LWF1dG8gcC01IGJvcmRlci1yb3VuZC0yeGwgc2hhZG93LTQgc3VyZmFjZS1jYXJkIGJvcmRlci0xIHN1cmZhY2UtYm9yZGVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLWNlbnRlciBnYXAtMyBweS00IHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXIgdy00cmVtIGgtNHJlbSBib3JkZXItY2lyY2xlIGJnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTYwMCB0ZXh0LTN4bCBmb250LWJvbGRcIj5cclxuICAgICAgICAgICAg4pyTXHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJtLTAgdGV4dC14bCBmb250LWJvbGQgdGV4dC05MDBcIj7CoVJlZ2lzdHJvIGV4aXRvc28hPC9oMz5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm0tMCB0ZXh0LXNtIHRleHQtNjAwIGZvbnQtbWVkaXVtIG1heC13LTI1cmVtXCI+XHJcbiAgICAgICAgICAgIFR1IGN1ZW50YSBoYSBzaWRvIGNyZWFkYSBjb3JyZWN0YW1lbnRlLiBQcm9udG8gcmVjaWJpcsOhcyB1biBjb3JyZW8gZGUgY29uZmlybWFjacOzbi5cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbXgtYXV0byBwLTRcIj5cclxuICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGZvbnQtYm9sZCB0ZXh0LTN4bCB0ZXh0LTkwMCBtLTAgbWItMlwiPkNyZWFyIGN1ZW50YTwvaDI+XHJcbiAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtc20gbS0wIG1iLTUgdGV4dC02MDAgZm9udC1tZWRpdW1cIj5cclxuICAgICAgICDDmm5ldGUgYSBsYSBmYW1pbGlhIEVsIFBlZHJlZ2FsIHkgZGlzZnJ1dGEgYmVuZWZpY2lvcyBleGNsdXNpdm9zLlxyXG4gICAgICA8L3A+XHJcblxyXG4gICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSBub1ZhbGlkYXRlIGlkPVwicmVnaXN0ZXItZm9ybVwiPlxyXG4gICAgICAgIHsvKiBOYW1lIHJvdyAqL31cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIG1kOmNvbC02IGZsZXggZmxleC1jb2x1bW4gZ2FwLTIgbWItM1wiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1wcmltYXJ5IHVwcGVyY2FzZVwiIGh0bWxGb3I9XCJyZWdpc3Rlci1maXJzdE5hbWVcIj5cclxuICAgICAgICAgICAgICBOb21icmVcclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPElucHV0VGV4dFxyXG4gICAgICAgICAgICAgIGlkPVwicmVnaXN0ZXItZmlyc3ROYW1lXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoeyAncC1pbnZhbGlkJzogZXJyb3JzLmZpcnN0TmFtZSB9KX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlR1IG5vbWJyZVwiXHJcbiAgICAgICAgICAgICAgdmFsdWU9e2Zvcm0uZmlyc3ROYW1lfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlQ2hhbmdlKCdmaXJzdE5hbWUnLCBlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPVwiZ2l2ZW4tbmFtZVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIHtlcnJvcnMuZmlyc3ROYW1lICYmIChcclxuICAgICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwicC1lcnJvciBibG9jayBtdC0xXCIgcm9sZT1cImFsZXJ0XCI+e2Vycm9ycy5maXJzdE5hbWV9PC9zbWFsbD5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIG1kOmNvbC02IGZsZXggZmxleC1jb2x1bW4gZ2FwLTIgbWItM1wiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1wcmltYXJ5IHVwcGVyY2FzZVwiIGh0bWxGb3I9XCJyZWdpc3Rlci1sYXN0TmFtZVwiPlxyXG4gICAgICAgICAgICAgIEFwZWxsaWRvXHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxJbnB1dFRleHRcclxuICAgICAgICAgICAgICBpZD1cInJlZ2lzdGVyLWxhc3ROYW1lXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoeyAncC1pbnZhbGlkJzogZXJyb3JzLmxhc3ROYW1lIH0pfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVHUgYXBlbGxpZG9cIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXtmb3JtLmxhc3ROYW1lfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlQ2hhbmdlKCdsYXN0TmFtZScsIGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJmYW1pbHktbmFtZVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIHtlcnJvcnMubGFzdE5hbWUgJiYgKFxyXG4gICAgICAgICAgICAgIDxzbWFsbCBjbGFzc05hbWU9XCJwLWVycm9yIGJsb2NrIG10LTFcIiByb2xlPVwiYWxlcnRcIj57ZXJyb3JzLmxhc3ROYW1lfTwvc21hbGw+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgey8qIEVtYWlsICovfVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbHVtbiBnYXAtMiBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1wcmltYXJ5IHVwcGVyY2FzZVwiIGh0bWxGb3I9XCJyZWdpc3Rlci1lbWFpbFwiPlxyXG4gICAgICAgICAgICBDb3JyZW8gZWxlY3Ryw7NuaWNvXHJcbiAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgPElucHV0VGV4dFxyXG4gICAgICAgICAgICBpZD1cInJlZ2lzdGVyLWVtYWlsXCJcclxuICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHsgJ3AtaW52YWxpZCc6IGVycm9ycy5lbWFpbCB9KX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJjb3JyZW9AZWplbXBsby5jb21cIlxyXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybS5lbWFpbH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoJ2VtYWlsJywgZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJlbWFpbFwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAge2Vycm9ycy5lbWFpbCAmJiAoXHJcbiAgICAgICAgICAgIDxzbWFsbCBjbGFzc05hbWU9XCJwLWVycm9yIGJsb2NrIG10LTFcIiByb2xlPVwiYWxlcnRcIj57ZXJyb3JzLmVtYWlsfTwvc21hbGw+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7LyogUGhvbmUgKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sdW1uIGdhcC0yIG1iLTNcIj5cclxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXByaW1hcnkgdXBwZXJjYXNlXCIgaHRtbEZvcj1cInJlZ2lzdGVyLXBob25lXCI+XHJcbiAgICAgICAgICAgIFRlbMOpZm9ub1xyXG4gICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgIDxJbnB1dFRleHRcclxuICAgICAgICAgICAgaWQ9XCJyZWdpc3Rlci1waG9uZVwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZWxcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoeyAncC1pbnZhbGlkJzogZXJyb3JzLnBob25lIH0pfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIis1NyAzMDAgMDAwIDAwMDBcIlxyXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybS5waG9uZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoJ3Bob25lJywgZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJ0ZWxcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHtlcnJvcnMucGhvbmUgJiYgKFxyXG4gICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwicC1lcnJvciBibG9jayBtdC0xXCIgcm9sZT1cImFsZXJ0XCI+e2Vycm9ycy5waG9uZX08L3NtYWxsPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgey8qIFBhc3N3b3JkICYgQ29uZmlybSBQYXNzd29yZCBHcmlkICovfVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxyXG4gICAgICAgICAgey8qIFBhc3N3b3JkICovfVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgbWQ6Y29sLTYgZmxleCBmbGV4LWNvbHVtbiBnYXAtMiBtYi0zXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXByaW1hcnkgdXBwZXJjYXNlXCIgaHRtbEZvcj1cInJlZ2lzdGVyLXBhc3N3b3JkXCI+XHJcbiAgICAgICAgICAgICAgQ29udHJhc2XDsWFcclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPFBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgaWQ9XCJyZWdpc3Rlci1wYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWU9XCJ3LWZ1bGxcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7ICdwLWludmFsaWQnOiBlcnJvcnMucGFzc3dvcmQgfSl9XHJcbiAgICAgICAgICAgICAgdG9nZ2xlTWFza1xyXG4gICAgICAgICAgICAgIGZlZWRiYWNrPXtmYWxzZX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk3DrW5pbW8gOCBjYXJhY3RlcmVzXCJcclxuICAgICAgICAgICAgICB2YWx1ZT17Zm9ybS5wYXNzd29yZH1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgncGFzc3dvcmQnLCBlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPVwibmV3LXBhc3N3b3JkXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAge2Vycm9ycy5wYXNzd29yZCAmJiAoXHJcbiAgICAgICAgICAgICAgPHNtYWxsIGNsYXNzTmFtZT1cInAtZXJyb3IgYmxvY2sgbXQtMVwiIHJvbGU9XCJhbGVydFwiPntlcnJvcnMucGFzc3dvcmR9PC9zbWFsbD5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIHsvKiBDb25maXJtIHBhc3N3b3JkICovfVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgbWQ6Y29sLTYgZmxleCBmbGV4LWNvbHVtbiBnYXAtMiBtYi0zXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXByaW1hcnkgdXBwZXJjYXNlXCIgaHRtbEZvcj1cInJlZ2lzdGVyLWNvbmZpcm1QYXNzd29yZFwiPlxyXG4gICAgICAgICAgICAgIENvbmZpcm1hciBjb250cmFzZcOxYVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8UGFzc3dvcmRcclxuICAgICAgICAgICAgICBpZD1cInJlZ2lzdGVyLWNvbmZpcm1QYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWU9XCJ3LWZ1bGxcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7ICdwLWludmFsaWQnOiBlcnJvcnMuY29uZmlybVBhc3N3b3JkIH0pfVxyXG4gICAgICAgICAgICAgIHRvZ2dsZU1hc2tcclxuICAgICAgICAgICAgICBmZWVkYmFjaz17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJSZXBpdGUgdHUgY29udHJhc2XDsWFcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXtmb3JtLmNvbmZpcm1QYXNzd29yZH1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgnY29uZmlybVBhc3N3b3JkJywgZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIHtlcnJvcnMuY29uZmlybVBhc3N3b3JkICYmIChcclxuICAgICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwicC1lcnJvciBibG9jayBtdC0xXCIgcm9sZT1cImFsZXJ0XCI+e2Vycm9ycy5jb25maXJtUGFzc3dvcmR9PC9zbWFsbD5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7LyogSW5kaWNhZG9yIGRlIEZvcnRhbGV6YSBkZSBDb250cmFzZcOxYSBhIGFuY2hvIGNvbXBsZXRvICovfVxyXG4gICAgICAgIHtmb3JtLnBhc3N3b3JkICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItM1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgYW5pbWF0ZS1kdXJhdGlvbi0yMDBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgICAgICB7WzEsIDIsIDMsIDRdLm1hcCgoaSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnZmxleC0xIGgtMSBib3JkZXItcm91bmQtc20gdHJhbnNpdGlvbi1jb2xvcnMgdHJhbnNpdGlvbi1kdXJhdGlvbi0zMDAnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2JnLWdyYXktMzAwJzogaSA+IHN0cmVuZ3RoLmxldmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICdiZy1yZWQtNTAwJzogaSA8PSBzdHJlbmd0aC5sZXZlbCAmJiBzdHJlbmd0aC5jbGFzc05hbWUgPT09ICdzdHJlbmd0aC13ZWFrJyxcclxuICAgICAgICAgICAgICAgICAgICAnYmctb3JhbmdlLTUwMCc6IGkgPD0gc3RyZW5ndGgubGV2ZWwgJiYgc3RyZW5ndGguY2xhc3NOYW1lID09PSAnc3RyZW5ndGgtZmFpcicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2JnLWdyZWVuLTUwMCc6IGkgPD0gc3RyZW5ndGgubGV2ZWwgJiYgc3RyZW5ndGguY2xhc3NOYW1lID09PSAnc3RyZW5ndGgtZ29vZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2JnLWdyZWVuLTYwMCc6IGkgPD0gc3RyZW5ndGgubGV2ZWwgJiYgc3RyZW5ndGguY2xhc3NOYW1lID09PSAnc3RyZW5ndGgtc3Ryb25nJyxcclxuICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKCd0ZXh0LXhzIGZvbnQtYm9sZCBtdC0yIGJsb2NrJywge1xyXG4gICAgICAgICAgICAgICd0ZXh0LXJlZC01MDAnOiBzdHJlbmd0aC5jbGFzc05hbWUgPT09ICdzdHJlbmd0aC13ZWFrJyxcclxuICAgICAgICAgICAgICAndGV4dC1vcmFuZ2UtNTAwJzogc3RyZW5ndGguY2xhc3NOYW1lID09PSAnc3RyZW5ndGgtZmFpcicsXHJcbiAgICAgICAgICAgICAgJ3RleHQtZ3JlZW4tNTAwJzogc3RyZW5ndGguY2xhc3NOYW1lID09PSAnc3RyZW5ndGgtZ29vZCcsXHJcbiAgICAgICAgICAgICAgJ3RleHQtZ3JlZW4tNjAwJzogc3RyZW5ndGguY2xhc3NOYW1lID09PSAnc3RyZW5ndGgtc3Ryb25nJyxcclxuICAgICAgICAgICAgfSl9PlxyXG4gICAgICAgICAgICAgIHtzdHJlbmd0aC5sYWJlbH1cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAge2FwaUVycm9yICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNFwiPlxyXG4gICAgICAgICAgICA8TWVzc2FnZVxyXG4gICAgICAgICAgICAgIHNldmVyaXR5PVwiZXJyb3JcIlxyXG4gICAgICAgICAgICAgIHRleHQ9e2FwaUVycm9yfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgYm9yZGVyLXJvdW5kLXhsIHAtMlwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICB7LyogU3VibWl0ICovfVxyXG4gICAgICAgIDxCdXR0b25cclxuICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG10LTQgYm9yZGVyLXJvdW5kLTN4bCBmb250LWJvbGRcIlxyXG4gICAgICAgICAgaWQ9XCJyZWdpc3Rlci1zdWJtaXRcIlxyXG4gICAgICAgICAgbGFiZWw9e2lzU3VibWl0dGluZyA/ICdDcmVhbmRvIGN1ZW50YeKApicgOiAnQ3JlYXIgY3VlbnRhJ31cclxuICAgICAgICAgIGxvYWRpbmc9e2lzU3VibWl0dGluZ31cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Zvcm0+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0zIG10LTRcIj5cclxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC02MDAgbS0wXCI+XHJcbiAgICAgICAgICDCv1lhIHRpZW5lcyBjdWVudGE/eycgJ31cclxuICAgICAgICAgIDxhIG9uQ2xpY2s9e29uR29Ub0xvZ2lufSBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgbm8tdW5kZXJsaW5lIGZvbnQtYm9sZCBob3Zlcjp1bmRlcmxpbmUgdHJhbnNpdGlvbi1jb2xvcnMgdHJhbnNpdGlvbi1kdXJhdGlvbi0xNTBcIj5cclxuICAgICAgICAgICAgSW5pY2lhIHNlc2nDs25cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICA8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG4iXX0=