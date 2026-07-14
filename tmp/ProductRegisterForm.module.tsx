import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/products/register/RegisterForm.tsx");const useState = __vite__cjsImport0_react["useState"]; const useRef = __vite__cjsImport0_react["useRef"]; const useEffect = __vite__cjsImport0_react["useEffect"];const _jsxDEV = __vite__cjsImport10_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=a3d32f18";
import { InputText } from "/node_modules/.vite/deps/primereact_inputtext.js?v=a3d32f18";
import { InputTextarea } from "/node_modules/.vite/deps/primereact_inputtextarea.js?v=a3d32f18";
import { InputNumber } from "/node_modules/.vite/deps/primereact_inputnumber.js?v=a3d32f18";
import { Dropdown } from "/node_modules/.vite/deps/primereact_dropdown.js?v=a3d32f18";
import { Button } from "/node_modules/.vite/deps/primereact_button.js?v=a3d32f18";
import { Message } from "/node_modules/.vite/deps/primereact_message.js?v=a3d32f18";
import { classNames } from "/node_modules/.vite/deps/primereact_utils.js?v=a3d32f18";
import { productService } from "/src/services/productService.ts";
import { categoryService } from "/src/services/categoryService.ts";
var _jsxFileName = "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/products/register/RegisterForm.tsx";
import __vite__cjsImport10_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=a3d32f18";
var _s = $RefreshSig$();
// ─── Constants ────────────────────────────────────────────────────────────────
const INITIAL_FORM = {
	id: "0",
	name: "",
	category: "",
	price: null,
	description: "",
	imageUrl: "",
	isAvailable: true,
	stock: 0
};
// ─── Validation ───────────────────────────────────────────────────────────────
function validate(form, imageFile) {
	const errors = {};
	if (!form.name.trim()) {
		errors.name = "El nombre del producto es obligatorio";
	} else if (form.name.trim().length < 3) {
		errors.name = "El nombre debe tener al menos 3 caracteres";
	}
	if (!form.category) {
		errors.category = "Selecciona una categoría";
	}
	if (form.price === null || form.price === undefined) {
		errors.price = "El precio es obligatorio";
	} else if (form.price <= 0) {
		errors.price = "El precio debe ser mayor a 0";
	}
	if (form.stock == null || form.stock < 0) {
		errors.stock = "El stock no puede ser negativo";
	}
	if (!form.description.trim()) {
		errors.description = "La descripción es obligatoria";
	} else if (form.description.trim().length < 10) {
		errors.description = "La descripción debe tener al menos 10 caracteres";
	}
	if (form.imageUrl && !imageFile && !/^https?:\/\/.+\..+/.test(form.imageUrl.trim())) {
		errors.imageUrl = "Ingresa una URL válida (https://...)";
	}
	return errors;
}
export function ProductForm({ onSuccess, onCancel }) {
	_s();
	const [form, setForm] = useState(INITIAL_FORM);
	const [categories, setCategories] = useState([]);
	const [errors, setErrors] = useState({});
	const [apiError, setApiError] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [imagePreviewError, setImagePreviewError] = useState(false);
	const fileInputRef = useRef(null);
	useEffect(() => {
		categoryService.getAll().then((res) => {
			if (res.success) setCategories(res.categories);
		});
	}, []);
	const categoryOptions = categories.map((c) => ({
		label: c.name,
		value: c.id
	}));
	// ── Helpers ──────────────────────────────────────────────────────────────
	function handleChange(field, value) {
		setForm((prev) => ({
			...prev,
			[field]: value
		}));
		setApiError(null);
		if (field === "imageUrl") {
			setImagePreviewError(false);
			// Si el usuario escribe una URL,
			// dejamos de usar el archivo seleccionado
			setImageFile(null);
		}
		if (errors[field]) {
			setErrors((prev) => {
				const next = { ...prev };
				delete next[field];
				return next;
			});
		}
	}
	function handleFileChange(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		setImageFile(file);
		const objectUrl = URL.createObjectURL(file);
		setForm((prev) => ({
			...prev,
			imageUrl: objectUrl
		}));
		setImagePreviewError(false);
		if (errors.imageUrl) {
			setErrors((prev) => {
				const next = { ...prev };
				delete next.imageUrl;
				return next;
			});
		}
	}
	// ── Submit ───────────────────────────────────────────────────────────────
	async function handleSubmit(e) {
		e.preventDefault();
		setApiError(null);
		const validationErrors = validate(form, imageFile);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) return;
		setIsSubmitting(true);
		try {
			let result;
			if (imageFile) {
				const formData = new FormData();
				formData.append("name", form.name);
				formData.append("category", form.category);
				formData.append("description", form.description);
				formData.append("price", String(form.price));
				formData.append("stock", String(form.stock));
				formData.append("image", imageFile);
				result = await productService.create(formData);
			} else {
				result = await productService.create({
					name: form.name,
					category: form.category,
					price: form.price,
					description: form.description,
					stock: form.stock
				});
			}
			if (!result.success) {
				setApiError(result.message ?? "Ocurrió un error al crear el producto.");
				return;
			}
			setSubmitted(true);
			onSuccess?.(form);
		} catch {
			setApiError("Ocurrió un error inesperado al guardar el producto.");
		} finally {
			setIsSubmitting(false);
		}
	}
	// ── Success screen ───────────────────────────────────────────────────────
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
						lineNumber: 209,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("h3", {
						className: "m-0 text-xl font-bold text-900",
						children: "¡Producto guardado!"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 212,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("p", {
						className: "m-0 text-sm text-600 font-medium max-w-25rem",
						children: [/* @__PURE__ */ _jsxDEV("strong", { children: form.name }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 13
						}, this), " fue creado correctamente en el catálogo."]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 213,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Button, {
						label: "Crear otro producto",
						className: "mt-2 border-round-3xl font-bold",
						onClick: () => {
							setForm(INITIAL_FORM);
							setSubmitted(false);
						}
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 216,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 208,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 207,
			columnNumber: 7
		}, this);
	}
	// ── Form ─────────────────────────────────────────────────────────────────
	const showImagePreview = form.imageUrl.trim() !== "" && !imagePreviewError;
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "w-full mx-auto p-4",
		children: [
			/* @__PURE__ */ _jsxDEV("h2", {
				className: "text-center font-bold text-3xl text-900 m-0 mb-2",
				children: "Nuevo producto"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 233,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("p", {
				className: "text-center text-sm m-0 mb-5 text-600 font-medium",
				children: "Completa la información para agregar el producto al catálogo."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 234,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("form", {
				onSubmit: handleSubmit,
				noValidate: true,
				id: "product-form",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid",
						children: /* @__PURE__ */ _jsxDEV("div", {
							className: "col-12 md:col-12 flex flex-column gap-2 mb-3",
							children: [
								/* @__PURE__ */ _jsxDEV("label", {
									className: "text-xs font-bold text-primary uppercase",
									htmlFor: "product-name",
									children: ["Nombre del producto ", /* @__PURE__ */ _jsxDEV("span", {
										className: "text-red-500",
										children: "*"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 244,
										columnNumber: 35
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 243,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV(InputText, {
									id: "product-name",
									className: classNames({ "p-invalid": errors.name }),
									placeholder: "Ej. Leche entera 1L",
									value: form.name,
									onChange: (e) => handleChange("name", e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 13
								}, this),
								errors.name && /* @__PURE__ */ _jsxDEV("small", {
									className: "p-error block mt-1",
									role: "alert",
									children: errors.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 254,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 242,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 241,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-column gap-2 mb-3",
						children: [
							/* @__PURE__ */ _jsxDEV("label", {
								className: "text-xs font-bold text-primary uppercase",
								htmlFor: "product-category",
								children: ["Categoría ", /* @__PURE__ */ _jsxDEV("span", {
									className: "text-red-500",
									children: "*"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 262,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 261,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV(Dropdown, {
								inputId: "product-category",
								className: classNames("w-full", { "p-invalid": errors.category }),
								options: categoryOptions,
								placeholder: "Selecciona una categoría",
								value: form.category,
								onChange: (e) => handleChange("category", e.value)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 264,
								columnNumber: 11
							}, this),
							errors.category && /* @__PURE__ */ _jsxDEV("small", {
								className: "p-error block mt-1",
								role: "alert",
								children: errors.category
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 273,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 260,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-nogutter gap-3 mb-3",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "col-12 md:col-6 flex flex-column gap-2",
							children: [
								/* @__PURE__ */ _jsxDEV("label", {
									className: "text-xs font-bold text-primary uppercase",
									htmlFor: "product-price",
									children: ["Precio (COP) ", /* @__PURE__ */ _jsxDEV("span", {
										className: "text-red-500",
										children: "*"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 281,
										columnNumber: 28
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 280,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV(InputNumber, {
									inputId: "product-price",
									inputClassName: classNames("w-full", { "p-invalid": errors.price }),
									placeholder: "0",
									value: form.price,
									onValueChange: (e) => handleChange("price", e.value ?? null),
									mode: "currency",
									currency: "COP",
									locale: "es-CO",
									min: 0
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 283,
									columnNumber: 13
								}, this),
								errors.price && /* @__PURE__ */ _jsxDEV("small", {
									className: "p-error block mt-1",
									role: "alert",
									children: errors.price
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 295,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 279,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "col-12 md:col-6 flex flex-column gap-2",
							children: [
								/* @__PURE__ */ _jsxDEV("label", {
									className: "text-xs font-bold text-primary uppercase",
									htmlFor: "product-stock",
									children: ["Stock ", /* @__PURE__ */ _jsxDEV("span", {
										className: "text-red-500",
										children: "*"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 300,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 299,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV(InputNumber, {
									inputId: "product-stock",
									inputClassName: classNames("w-full", { "p-invalid": errors.stock }),
									placeholder: "0",
									value: form.stock,
									onValueChange: (e) => handleChange("stock", e.value ?? 0),
									mode: "decimal",
									locale: "es-CO",
									min: 0
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 302,
									columnNumber: 13
								}, this),
								errors.stock && /* @__PURE__ */ _jsxDEV("small", {
									className: "p-error block mt-1",
									role: "alert",
									children: errors.stock
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 313,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 298,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 278,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-column gap-2 mb-3",
						children: [
							/* @__PURE__ */ _jsxDEV("label", {
								className: "text-xs font-bold text-primary uppercase",
								htmlFor: "product-description",
								children: ["Descripción ", /* @__PURE__ */ _jsxDEV("span", {
									className: "text-red-500",
									children: "*"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 321,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 320,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV(InputTextarea, {
								id: "product-description",
								className: classNames("w-full", { "p-invalid": errors.description }),
								placeholder: "Describe el producto brevemente…",
								value: form.description,
								onChange: (e) => handleChange("description", e.target.value),
								rows: 3,
								autoResize: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 323,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex justify-content-between align-items-center mt-1",
								children: [errors.description ? /* @__PURE__ */ _jsxDEV("small", {
									className: "p-error",
									role: "alert",
									children: errors.description
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 334,
									columnNumber: 17
								}, this) : /* @__PURE__ */ _jsxDEV("span", {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 335,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("small", {
									className: classNames("text-xs", {
										"text-600": form.description.length < 10,
										"text-green-500": form.description.length >= 10
									}),
									children: [form.description.length, " caracteres"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 336,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 332,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 319,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-column gap-2 mb-3",
						children: [
							/* @__PURE__ */ _jsxDEV("label", {
								className: "text-xs font-bold text-primary uppercase",
								htmlFor: "product-imageUrl",
								children: [
									"Imagen del producto",
									" ",
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-normal text-500 normal-case",
										children: "(opcional)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 349,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 347,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ _jsxDEV(InputText, {
									id: "product-imageUrl",
									className: classNames("flex-1", { "p-invalid": errors.imageUrl }),
									placeholder: "https://ejemplo.com/imagen.jpg",
									value: form.imageUrl,
									onChange: (e) => handleChange("imageUrl", e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 353,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV(Button, {
									type: "button",
									icon: "pi pi-upload",
									severity: "secondary",
									outlined: true,
									tooltip: "Subir desde mi dispositivo",
									tooltipOptions: { position: "top" },
									onClick: () => fileInputRef.current?.click()
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 360,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 352,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("input", {
								ref: fileInputRef,
								type: "file",
								accept: "image/*",
								className: "hidden",
								style: { display: "none" },
								onChange: handleFileChange
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 372,
								columnNumber: 11
							}, this),
							errors.imageUrl && /* @__PURE__ */ _jsxDEV("small", {
								className: "p-error block",
								role: "alert",
								children: errors.imageUrl
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 382,
								columnNumber: 13
							}, this),
							showImagePreview && /* @__PURE__ */ _jsxDEV("div", {
								className: "mt-2 border-round-xl overflow-hidden border-1 surface-border",
								style: {
									maxHeight: "200px",
									background: "var(--surface-ground)"
								},
								children: /* @__PURE__ */ _jsxDEV("img", {
									src: form.imageUrl,
									alt: "Preview del producto",
									className: "w-full h-full",
									style: {
										objectFit: "contain",
										maxHeight: "200px",
										display: "block"
									},
									onError: () => setImagePreviewError(true)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 389,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 387,
								columnNumber: 13
							}, this),
							form.imageUrl && imagePreviewError && /* @__PURE__ */ _jsxDEV("small", {
								className: "text-orange-500 text-xs block mt-1",
								children: "No se pudo cargar la imagen. Verifica la URL."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 400,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 346,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("p", {
						className: "text-xs text-500 m-0 mb-3",
						children: [/* @__PURE__ */ _jsxDEV("span", {
							className: "text-red-500",
							children: "*"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 408,
							columnNumber: 11
						}, this), " Campos obligatorios"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 407,
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
							lineNumber: 414,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 413,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex gap-3 mt-2",
						children: [onCancel && /* @__PURE__ */ _jsxDEV(Button, {
							type: "button",
							label: "Cancelar",
							severity: "secondary",
							outlined: true,
							className: "flex-1 border-round-3xl font-bold",
							onClick: onCancel,
							disabled: isSubmitting
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 425,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV(Button, {
							type: "submit",
							className: "flex-1 border-round-3xl font-bold",
							label: isSubmitting ? "Guardando…" : "Guardar producto",
							loading: isSubmitting
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 435,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 423,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 238,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 232,
		columnNumber: 5
	}, this);
}
_s(ProductForm, "77X+dCvSnfAsQ39nPMHAbaoKLrE=");
_c = ProductForm;
var _c;
$RefreshReg$(_c, "ProductForm");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/components/products/register/RegisterForm.tsx?t=1781749055454";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/products/register/RegisterForm.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/products/register/RegisterForm.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/products/register/RegisterForm.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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O1NBQ1YsT0FBTztVQUFFLFdBQVc7VUFBVyxXQUFXO1VBQVMsU0FBUztTQUFRO1NBQ3BFLGVBQWUscUJBQXFCLElBQUk7UUFDekM7Ozs7O09BQ0U7Ozs7O09BR04sS0FBSyxZQUFZLHFCQUNoQix3QkFBQyxTQUFEO1FBQU8sV0FBVTtrQkFBcUM7T0FFL0M7Ozs7O01BRU47Ozs7OztLQUdMLHdCQUFDLEtBQUQ7TUFBRyxXQUFVO2dCQUFiLENBQ0Usd0JBQUMsUUFBRDtPQUFNLFdBQVU7aUJBQWU7TUFBTzs7OztnQkFBQyxzQkFDdEM7Ozs7OztLQUdGLFlBQ0Msd0JBQUMsT0FBRDtNQUFLLFdBQVU7Z0JBQ2Isd0JBQUMsU0FBRDtPQUNFLFVBQVM7T0FDVCxNQUFNO09BQ04sV0FBVTtNQUNYOzs7OztLQUNFOzs7OztLQUlQLHdCQUFDLE9BQUQ7TUFBSyxXQUFVO2dCQUFmLENBQ0csWUFDQyx3QkFBQyxRQUFEO09BQ0UsTUFBSztPQUNMLE9BQU07T0FDTixVQUFTO09BQ1Q7T0FDQSxXQUFVO09BQ1YsU0FBUztPQUNULFVBQVU7TUFDWDs7OztnQkFFSCx3QkFBQyxRQUFEO09BQ0UsTUFBSztPQUNMLFdBQVU7T0FDVixPQUFPLGVBQWUsZUFBZTtPQUNyQyxTQUFTO01BQ1Y7Ozs7Y0FDRTs7Ozs7O0lBQ0Q7Ozs7OztFQUNIOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJSZWdpc3RlckZvcm0udHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBJbnB1dFRleHQgfSBmcm9tICdwcmltZXJlYWN0L2lucHV0dGV4dCdcclxuaW1wb3J0IHsgSW5wdXRUZXh0YXJlYSB9IGZyb20gJ3ByaW1lcmVhY3QvaW5wdXR0ZXh0YXJlYSdcclxuaW1wb3J0IHsgSW5wdXROdW1iZXIgfSBmcm9tICdwcmltZXJlYWN0L2lucHV0bnVtYmVyJ1xyXG5pbXBvcnQgeyBEcm9wZG93biB9IGZyb20gJ3ByaW1lcmVhY3QvZHJvcGRvd24nXHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3ByaW1lcmVhY3QvYnV0dG9uJ1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAncHJpbWVyZWFjdC9tZXNzYWdlJ1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSAncHJpbWVyZWFjdC91dGlscydcclxuaW1wb3J0IHR5cGUgeyBQcm9kdWN0LCBQcm9kdWN0Rm9ybUVycm9ycyB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3Byb2R1Y3QnXHJcbmltcG9ydCB0eXBlIHsgQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9jYXRlZ29yeSdcclxuaW1wb3J0IHsgcHJvZHVjdFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9wcm9kdWN0U2VydmljZSdcclxuaW1wb3J0IHsgY2F0ZWdvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvY2F0ZWdvcnlTZXJ2aWNlJ1xyXG5cclxuLy8g4pSA4pSA4pSAIENvbnN0YW50cyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbmNvbnN0IElOSVRJQUxfRk9STTogUHJvZHVjdCA9IHtcclxuICBpZDogJzAnLFxyXG4gIG5hbWU6ICcnLFxyXG4gIGNhdGVnb3J5OiAnJyxcclxuICBwcmljZTogbnVsbCxcclxuICBkZXNjcmlwdGlvbjogJycsXHJcbiAgaW1hZ2VVcmw6ICcnLFxyXG4gIGlzQXZhaWxhYmxlOiB0cnVlLFxyXG4gIHN0b2NrOiAwLFxyXG59XHJcblxyXG4vLyDilIDilIDilIAgVmFsaWRhdGlvbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlKFxyXG4gIGZvcm06IFByb2R1Y3QsXHJcbiAgaW1hZ2VGaWxlOiBGaWxlIHwgbnVsbFxyXG4pOiBQcm9kdWN0Rm9ybUVycm9ycyB7XHJcbiAgY29uc3QgZXJyb3JzOiBQcm9kdWN0Rm9ybUVycm9ycyA9IHt9XHJcblxyXG4gIGlmICghZm9ybS5uYW1lLnRyaW0oKSkge1xyXG4gICAgZXJyb3JzLm5hbWUgPSAnRWwgbm9tYnJlIGRlbCBwcm9kdWN0byBlcyBvYmxpZ2F0b3JpbydcclxuICB9IGVsc2UgaWYgKGZvcm0ubmFtZS50cmltKCkubGVuZ3RoIDwgMykge1xyXG4gICAgZXJyb3JzLm5hbWUgPSAnRWwgbm9tYnJlIGRlYmUgdGVuZXIgYWwgbWVub3MgMyBjYXJhY3RlcmVzJ1xyXG4gIH1cclxuXHJcbiAgaWYgKCFmb3JtLmNhdGVnb3J5KSB7XHJcbiAgICBlcnJvcnMuY2F0ZWdvcnkgPSAnU2VsZWNjaW9uYSB1bmEgY2F0ZWdvcsOtYSdcclxuICB9XHJcblxyXG4gIGlmIChmb3JtLnByaWNlID09PSBudWxsIHx8IGZvcm0ucHJpY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgZXJyb3JzLnByaWNlID0gJ0VsIHByZWNpbyBlcyBvYmxpZ2F0b3JpbydcclxuICB9IGVsc2UgaWYgKGZvcm0ucHJpY2UgPD0gMCkge1xyXG4gICAgZXJyb3JzLnByaWNlID0gJ0VsIHByZWNpbyBkZWJlIHNlciBtYXlvciBhIDAnXHJcbiAgfVxyXG5cclxuICBpZiAoZm9ybS5zdG9jayA9PSBudWxsIHx8IGZvcm0uc3RvY2sgPCAwKSB7XHJcbiAgICBlcnJvcnMuc3RvY2sgPSAnRWwgc3RvY2sgbm8gcHVlZGUgc2VyIG5lZ2F0aXZvJ1xyXG4gIH1cclxuXHJcbiAgaWYgKCFmb3JtLmRlc2NyaXB0aW9uLnRyaW0oKSkge1xyXG4gICAgZXJyb3JzLmRlc2NyaXB0aW9uID0gJ0xhIGRlc2NyaXBjacOzbiBlcyBvYmxpZ2F0b3JpYSdcclxuICB9IGVsc2UgaWYgKGZvcm0uZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA8IDEwKSB7XHJcbiAgICBlcnJvcnMuZGVzY3JpcHRpb24gPSAnTGEgZGVzY3JpcGNpw7NuIGRlYmUgdGVuZXIgYWwgbWVub3MgMTAgY2FyYWN0ZXJlcydcclxuICB9XHJcblxyXG4gIGlmIChcclxuICAgIGZvcm0uaW1hZ2VVcmwgJiZcclxuICAgICFpbWFnZUZpbGUgJiZcclxuICAgICEvXmh0dHBzPzpcXC9cXC8uK1xcLi4rLy50ZXN0KGZvcm0uaW1hZ2VVcmwudHJpbSgpKVxyXG4gICkge1xyXG4gICAgZXJyb3JzLmltYWdlVXJsID0gJ0luZ3Jlc2EgdW5hIFVSTCB2w6FsaWRhIChodHRwczovLy4uLiknXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZXJyb3JzXHJcbn1cclxuXHJcbi8vIOKUgOKUgOKUgCBDb21wb25lbnQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcblxyXG5pbnRlcmZhY2UgUHJvcHMge1xyXG4gIG9uU3VjY2Vzcz86IChkYXRhOiBQcm9kdWN0KSA9PiB2b2lkXHJcbiAgb25DYW5jZWw/OiAoKSA9PiB2b2lkXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQcm9kdWN0Rm9ybSh7IG9uU3VjY2Vzcywgb25DYW5jZWwgfTogUHJvcHMpIHtcclxuICBjb25zdCBbZm9ybSwgc2V0Rm9ybV0gPSB1c2VTdGF0ZTxQcm9kdWN0PihJTklUSUFMX0ZPUk0pXHJcbiAgY29uc3QgW2NhdGVnb3JpZXMsIHNldENhdGVnb3JpZXNdID0gdXNlU3RhdGU8Q2F0ZWdvcnlbXT4oW10pXHJcbiAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlPFByb2R1Y3RGb3JtRXJyb3JzPih7fSlcclxuICBjb25zdCBbYXBpRXJyb3IsIHNldEFwaUVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW3N1Ym1pdHRlZCwgc2V0U3VibWl0dGVkXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtpbWFnZUZpbGUsIHNldEltYWdlRmlsZV0gPSB1c2VTdGF0ZTxGaWxlIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbaXNTdWJtaXR0aW5nLCBzZXRJc1N1Ym1pdHRpbmddID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW2ltYWdlUHJldmlld0Vycm9yLCBzZXRJbWFnZVByZXZpZXdFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICBjb25zdCBmaWxlSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbClcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNhdGVnb3J5U2VydmljZS5nZXRBbGwoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgaWYgKHJlcy5zdWNjZXNzKSBzZXRDYXRlZ29yaWVzKHJlcy5jYXRlZ29yaWVzKVxyXG4gICAgfSlcclxuICB9LCBbXSlcclxuXHJcbiAgY29uc3QgY2F0ZWdvcnlPcHRpb25zID0gY2F0ZWdvcmllcy5tYXAoKGMpID0+ICh7IGxhYmVsOiBjLm5hbWUsIHZhbHVlOiBjLmlkIH0pKVxyXG5cclxuICAvLyDilIDilIAgSGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlQ2hhbmdlPEsgZXh0ZW5kcyBrZXlvZiBQcm9kdWN0PihcclxuICAgIGZpZWxkOiBLLFxyXG4gICAgdmFsdWU6IFByb2R1Y3RbS11cclxuICApIHtcclxuICAgIHNldEZvcm0oKHByZXYpID0+ICh7XHJcbiAgICAgIC4uLnByZXYsXHJcbiAgICAgIFtmaWVsZF06IHZhbHVlXHJcbiAgICB9KSlcclxuXHJcbiAgICBzZXRBcGlFcnJvcihudWxsKVxyXG5cclxuICAgIGlmIChmaWVsZCA9PT0gJ2ltYWdlVXJsJykge1xyXG4gICAgICBzZXRJbWFnZVByZXZpZXdFcnJvcihmYWxzZSlcclxuXHJcbiAgICAgIC8vIFNpIGVsIHVzdWFyaW8gZXNjcmliZSB1bmEgVVJMLFxyXG4gICAgICAvLyBkZWphbW9zIGRlIHVzYXIgZWwgYXJjaGl2byBzZWxlY2Npb25hZG9cclxuICAgICAgc2V0SW1hZ2VGaWxlKG51bGwpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVycm9yc1tmaWVsZCBhcyBrZXlvZiBQcm9kdWN0Rm9ybUVycm9yc10pIHtcclxuICAgICAgc2V0RXJyb3JzKChwcmV2KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldiB9XHJcbiAgICAgICAgZGVsZXRlIG5leHRbZmllbGQgYXMga2V5b2YgUHJvZHVjdEZvcm1FcnJvcnNdXHJcbiAgICAgICAgcmV0dXJuIG5leHRcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZUZpbGVDaGFuZ2UoXHJcbiAgICBlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PlxyXG4gICkge1xyXG4gICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF1cclxuXHJcbiAgICBpZiAoIWZpbGUpIHJldHVyblxyXG5cclxuICAgIHNldEltYWdlRmlsZShmaWxlKVxyXG5cclxuICAgIGNvbnN0IG9iamVjdFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSlcclxuXHJcbiAgICBzZXRGb3JtKChwcmV2KSA9PiAoe1xyXG4gICAgICAuLi5wcmV2LFxyXG4gICAgICBpbWFnZVVybDogb2JqZWN0VXJsXHJcbiAgICB9KSlcclxuXHJcbiAgICBzZXRJbWFnZVByZXZpZXdFcnJvcihmYWxzZSlcclxuXHJcbiAgICBpZiAoZXJyb3JzLmltYWdlVXJsKSB7XHJcbiAgICAgIHNldEVycm9ycygocHJldikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXYgfVxyXG4gICAgICAgIGRlbGV0ZSBuZXh0LmltYWdlVXJsXHJcbiAgICAgICAgcmV0dXJuIG5leHRcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOKUgOKUgCBTdWJtaXQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChlOiBSZWFjdC5Gb3JtRXZlbnQpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgc2V0QXBpRXJyb3IobnVsbClcclxuXHJcbiAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3JzID0gdmFsaWRhdGUoZm9ybSwgaW1hZ2VGaWxlKVxyXG4gICAgc2V0RXJyb3JzKHZhbGlkYXRpb25FcnJvcnMpXHJcbiAgICBpZiAoT2JqZWN0LmtleXModmFsaWRhdGlvbkVycm9ycykubGVuZ3RoID4gMCkgcmV0dXJuXHJcblxyXG4gICAgc2V0SXNTdWJtaXR0aW5nKHRydWUpXHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IHJlc3VsdFxyXG5cclxuICAgICAgaWYgKGltYWdlRmlsZSkge1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCBmb3JtLm5hbWUpXHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdjYXRlZ29yeScsIGZvcm0uY2F0ZWdvcnkpXHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdkZXNjcmlwdGlvbicsIGZvcm0uZGVzY3JpcHRpb24pXHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdwcmljZScsIFN0cmluZyhmb3JtLnByaWNlKSlcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3N0b2NrJywgU3RyaW5nKGZvcm0uc3RvY2spKVxyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2UnLCBpbWFnZUZpbGUpXHJcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuY3JlYXRlKGZvcm1EYXRhKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLmNyZWF0ZSh7XHJcbiAgICAgICAgICBuYW1lOiBmb3JtLm5hbWUsXHJcbiAgICAgICAgICBjYXRlZ29yeTogZm9ybS5jYXRlZ29yeSxcclxuICAgICAgICAgIHByaWNlOiBmb3JtLnByaWNlLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IGZvcm0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICBzdG9jazogZm9ybS5zdG9jayxcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgc2V0QXBpRXJyb3IocmVzdWx0Lm1lc3NhZ2UgPz8gJ09jdXJyacOzIHVuIGVycm9yIGFsIGNyZWFyIGVsIHByb2R1Y3RvLicpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFN1Ym1pdHRlZCh0cnVlKVxyXG4gICAgICBvblN1Y2Nlc3M/Lihmb3JtKVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHNldEFwaUVycm9yKCdPY3VycmnDsyB1biBlcnJvciBpbmVzcGVyYWRvIGFsIGd1YXJkYXIgZWwgcHJvZHVjdG8uJylcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzU3VibWl0dGluZyhmYWxzZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOKUgOKUgCBTdWNjZXNzIHNjcmVlbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbiAgaWYgKHN1Ym1pdHRlZCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctMzByZW0gbXgtYXV0byBwLTUgYm9yZGVyLXJvdW5kLTJ4bCBzaGFkb3ctNCBzdXJmYWNlLWNhcmQgYm9yZGVyLTEgc3VyZmFjZS1ib3JkZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtY2VudGVyIGdhcC0zIHB5LTQgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlciB3LTRyZW0gaC00cmVtIGJvcmRlci1jaXJjbGUgYmctZ3JlZW4tMTAwIHRleHQtZ3JlZW4tNjAwIHRleHQtM3hsIGZvbnQtYm9sZFwiPlxyXG4gICAgICAgICAgICDinJNcclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cIm0tMCB0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LTkwMFwiPsKhUHJvZHVjdG8gZ3VhcmRhZG8hPC9oMz5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm0tMCB0ZXh0LXNtIHRleHQtNjAwIGZvbnQtbWVkaXVtIG1heC13LTI1cmVtXCI+XHJcbiAgICAgICAgICAgIDxzdHJvbmc+e2Zvcm0ubmFtZX08L3N0cm9uZz4gZnVlIGNyZWFkbyBjb3JyZWN0YW1lbnRlIGVuIGVsIGNhdMOhbG9nby5cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgbGFiZWw9XCJDcmVhciBvdHJvIHByb2R1Y3RvXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtMiBib3JkZXItcm91bmQtM3hsIGZvbnQtYm9sZFwiXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Rm9ybShJTklUSUFMX0ZPUk0pOyBzZXRTdWJtaXR0ZWQoZmFsc2UpIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcblxyXG4gIC8vIOKUgOKUgCBGb3JtIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5cclxuICBjb25zdCBzaG93SW1hZ2VQcmV2aWV3ID1cclxuICAgIGZvcm0uaW1hZ2VVcmwudHJpbSgpICE9PSAnJyAmJiAhaW1hZ2VQcmV2aWV3RXJyb3JcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG14LWF1dG8gcC00XCI+XHJcbiAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBmb250LWJvbGQgdGV4dC0zeGwgdGV4dC05MDAgbS0wIG1iLTJcIj5OdWV2byBwcm9kdWN0bzwvaDI+XHJcbiAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtc20gbS0wIG1iLTUgdGV4dC02MDAgZm9udC1tZWRpdW1cIj5cclxuICAgICAgICBDb21wbGV0YSBsYSBpbmZvcm1hY2nDs24gcGFyYSBhZ3JlZ2FyIGVsIHByb2R1Y3RvIGFsIGNhdMOhbG9nby5cclxuICAgICAgPC9wPlxyXG5cclxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gbm9WYWxpZGF0ZSBpZD1cInByb2R1Y3QtZm9ybVwiPlxyXG5cclxuICAgICAgICB7Lyog4pSA4pSAIE5hbWUgJiBTS1Ug4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAICovfVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgbWQ6Y29sLTEyIGZsZXggZmxleC1jb2x1bW4gZ2FwLTIgbWItM1wiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1wcmltYXJ5IHVwcGVyY2FzZVwiIGh0bWxGb3I9XCJwcm9kdWN0LW5hbWVcIj5cclxuICAgICAgICAgICAgICBOb21icmUgZGVsIHByb2R1Y3RvIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTUwMFwiPio8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxJbnB1dFRleHRcclxuICAgICAgICAgICAgICBpZD1cInByb2R1Y3QtbmFtZVwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHsgJ3AtaW52YWxpZCc6IGVycm9ycy5uYW1lIH0pfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRWouIExlY2hlIGVudGVyYSAxTFwiXHJcbiAgICAgICAgICAgICAgdmFsdWU9e2Zvcm0ubmFtZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgnbmFtZScsIGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAge2Vycm9ycy5uYW1lICYmIChcclxuICAgICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwicC1lcnJvciBibG9jayBtdC0xXCIgcm9sZT1cImFsZXJ0XCI+e2Vycm9ycy5uYW1lfTwvc21hbGw+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgey8qIOKUgOKUgCBDYXRlZ29yeSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sdW1uIGdhcC0yIG1iLTNcIj5cclxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXByaW1hcnkgdXBwZXJjYXNlXCIgaHRtbEZvcj1cInByb2R1Y3QtY2F0ZWdvcnlcIj5cclxuICAgICAgICAgICAgQ2F0ZWdvcsOtYSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJlZC01MDBcIj4qPC9zcGFuPlxyXG4gICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgIDxEcm9wZG93blxyXG4gICAgICAgICAgICBpbnB1dElkPVwicHJvZHVjdC1jYXRlZ29yeVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygndy1mdWxsJywgeyAncC1pbnZhbGlkJzogZXJyb3JzLmNhdGVnb3J5IH0pfVxyXG4gICAgICAgICAgICBvcHRpb25zPXtjYXRlZ29yeU9wdGlvbnN9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWNjaW9uYSB1bmEgY2F0ZWdvcsOtYVwiXHJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtLmNhdGVnb3J5fVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgnY2F0ZWdvcnknLCBlLnZhbHVlKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICB7ZXJyb3JzLmNhdGVnb3J5ICYmIChcclxuICAgICAgICAgICAgPHNtYWxsIGNsYXNzTmFtZT1cInAtZXJyb3IgYmxvY2sgbXQtMVwiIHJvbGU9XCJhbGVydFwiPntlcnJvcnMuY2F0ZWdvcnl9PC9zbWFsbD5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHsvKiDilIDilIAgUHJpY2Ug4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAICovfVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLW5vZ3V0dGVyIGdhcC0zIG1iLTNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIG1kOmNvbC02IGZsZXggZmxleC1jb2x1bW4gZ2FwLTJcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtcHJpbWFyeSB1cHBlcmNhc2VcIiBodG1sRm9yPVwicHJvZHVjdC1wcmljZVwiPlxyXG4gICAgICAgICAgICAgIFByZWNpbyAoQ09QKSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJlZC01MDBcIj4qPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8SW5wdXROdW1iZXJcclxuICAgICAgICAgICAgICBpbnB1dElkPVwicHJvZHVjdC1wcmljZVwiXHJcbiAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3ctZnVsbCcsIHsgJ3AtaW52YWxpZCc6IGVycm9ycy5wcmljZSB9KX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjBcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXtmb3JtLnByaWNlfVxyXG4gICAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoJ3ByaWNlJywgZS52YWx1ZSA/PyBudWxsKX1cclxuICAgICAgICAgICAgICBtb2RlPVwiY3VycmVuY3lcIlxyXG4gICAgICAgICAgICAgIGN1cnJlbmN5PVwiQ09QXCJcclxuICAgICAgICAgICAgICBsb2NhbGU9XCJlcy1DT1wiXHJcbiAgICAgICAgICAgICAgbWluPXswfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICB7ZXJyb3JzLnByaWNlICYmIChcclxuICAgICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwicC1lcnJvciBibG9jayBtdC0xXCIgcm9sZT1cImFsZXJ0XCI+e2Vycm9ycy5wcmljZX08L3NtYWxsPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBtZDpjb2wtNiBmbGV4IGZsZXgtY29sdW1uIGdhcC0yXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXByaW1hcnkgdXBwZXJjYXNlXCIgaHRtbEZvcj1cInByb2R1Y3Qtc3RvY2tcIj5cclxuICAgICAgICAgICAgICBTdG9jayA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJlZC01MDBcIj4qPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8SW5wdXROdW1iZXJcclxuICAgICAgICAgICAgICBpbnB1dElkPVwicHJvZHVjdC1zdG9ja1wiXHJcbiAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3ctZnVsbCcsIHsgJ3AtaW52YWxpZCc6IGVycm9ycy5zdG9jayB9KX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjBcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXtmb3JtLnN0b2NrfVxyXG4gICAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoJ3N0b2NrJywgZS52YWx1ZSA/PyAwKX1cclxuICAgICAgICAgICAgICBtb2RlPVwiZGVjaW1hbFwiXHJcbiAgICAgICAgICAgICAgbG9jYWxlPVwiZXMtQ09cIlxyXG4gICAgICAgICAgICAgIG1pbj17MH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAge2Vycm9ycy5zdG9jayAmJiAoXHJcbiAgICAgICAgICAgICAgPHNtYWxsIGNsYXNzTmFtZT1cInAtZXJyb3IgYmxvY2sgbXQtMVwiIHJvbGU9XCJhbGVydFwiPntlcnJvcnMuc3RvY2t9PC9zbWFsbD5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7Lyog4pSA4pSAIERlc2NyaXB0aW9uIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgCAqL31cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2x1bW4gZ2FwLTIgbWItM1wiPlxyXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtcHJpbWFyeSB1cHBlcmNhc2VcIiBodG1sRm9yPVwicHJvZHVjdC1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICBEZXNjcmlwY2nDs24gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtNTAwXCI+Kjwvc3Bhbj5cclxuICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICA8SW5wdXRUZXh0YXJlYVxyXG4gICAgICAgICAgICBpZD1cInByb2R1Y3QtZGVzY3JpcHRpb25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3ctZnVsbCcsIHsgJ3AtaW52YWxpZCc6IGVycm9ycy5kZXNjcmlwdGlvbiB9KX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJEZXNjcmliZSBlbCBwcm9kdWN0byBicmV2ZW1lbnRl4oCmXCJcclxuICAgICAgICAgICAgdmFsdWU9e2Zvcm0uZGVzY3JpcHRpb259XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlQ2hhbmdlKCdkZXNjcmlwdGlvbicsIGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgcm93cz17M31cclxuICAgICAgICAgICAgYXV0b1Jlc2l6ZVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXIgbXQtMVwiPlxyXG4gICAgICAgICAgICB7ZXJyb3JzLmRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgPyA8c21hbGwgY2xhc3NOYW1lPVwicC1lcnJvclwiIHJvbGU9XCJhbGVydFwiPntlcnJvcnMuZGVzY3JpcHRpb259PC9zbWFsbD5cclxuICAgICAgICAgICAgICA6IDxzcGFuIC8+fVxyXG4gICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCd0ZXh0LXhzJywge1xyXG4gICAgICAgICAgICAgICd0ZXh0LTYwMCc6IGZvcm0uZGVzY3JpcHRpb24ubGVuZ3RoIDwgMTAsXHJcbiAgICAgICAgICAgICAgJ3RleHQtZ3JlZW4tNTAwJzogZm9ybS5kZXNjcmlwdGlvbi5sZW5ndGggPj0gMTAsXHJcbiAgICAgICAgICAgIH0pfT5cclxuICAgICAgICAgICAgICB7Zm9ybS5kZXNjcmlwdGlvbi5sZW5ndGh9IGNhcmFjdGVyZXNcclxuICAgICAgICAgICAgPC9zbWFsbD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7Lyog4pSA4pSAIEltYWdlIChvcHRpb25hbCkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAICovfVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbHVtbiBnYXAtMiBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1wcmltYXJ5IHVwcGVyY2FzZVwiIGh0bWxGb3I9XCJwcm9kdWN0LWltYWdlVXJsXCI+XHJcbiAgICAgICAgICAgIEltYWdlbiBkZWwgcHJvZHVjdG97JyAnfVxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbm9ybWFsIHRleHQtNTAwIG5vcm1hbC1jYXNlXCI+KG9wY2lvbmFsKTwvc3Bhbj5cclxuICAgICAgICAgIDwvbGFiZWw+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XHJcbiAgICAgICAgICAgIDxJbnB1dFRleHRcclxuICAgICAgICAgICAgICBpZD1cInByb2R1Y3QtaW1hZ2VVcmxcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnZmxleC0xJywgeyAncC1pbnZhbGlkJzogZXJyb3JzLmltYWdlVXJsIH0pfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly9lamVtcGxvLmNvbS9pbWFnZW4uanBnXCJcclxuICAgICAgICAgICAgICB2YWx1ZT17Zm9ybS5pbWFnZVVybH1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgnaW1hZ2VVcmwnLCBlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBpY29uPVwicGkgcGktdXBsb2FkXCJcclxuICAgICAgICAgICAgICBzZXZlcml0eT1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgICAgb3V0bGluZWRcclxuICAgICAgICAgICAgICB0b29sdGlwPVwiU3ViaXIgZGVzZGUgbWkgZGlzcG9zaXRpdm9cIlxyXG4gICAgICAgICAgICAgIHRvb2x0aXBPcHRpb25zPXt7IHBvc2l0aW9uOiAndG9wJyB9fVxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZpbGVJbnB1dFJlZi5jdXJyZW50Py5jbGljaygpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgey8qIEhpZGRlbiBmaWxlIGlucHV0ICovfVxyXG4gICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIHJlZj17ZmlsZUlucHV0UmVmfVxyXG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUZpbGVDaGFuZ2V9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIHtlcnJvcnMuaW1hZ2VVcmwgJiYgKFxyXG4gICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwicC1lcnJvciBibG9ja1wiIHJvbGU9XCJhbGVydFwiPntlcnJvcnMuaW1hZ2VVcmx9PC9zbWFsbD5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgey8qIEltYWdlIHByZXZpZXcgKi99XHJcbiAgICAgICAgICB7c2hvd0ltYWdlUHJldmlldyAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMiBib3JkZXItcm91bmQteGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlci0xIHN1cmZhY2UtYm9yZGVyXCJcclxuICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhIZWlnaHQ6ICcyMDBweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1zdXJmYWNlLWdyb3VuZCknIH19PlxyXG4gICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgIHNyYz17Zm9ybS5pbWFnZVVybH1cclxuICAgICAgICAgICAgICAgIGFsdD1cIlByZXZpZXcgZGVsIHByb2R1Y3RvXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGxcIlxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgb2JqZWN0Rml0OiAnY29udGFpbicsIG1heEhlaWdodDogJzIwMHB4JywgZGlzcGxheTogJ2Jsb2NrJyB9fVxyXG4gICAgICAgICAgICAgICAgb25FcnJvcj17KCkgPT4gc2V0SW1hZ2VQcmV2aWV3RXJyb3IodHJ1ZSl9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtmb3JtLmltYWdlVXJsICYmIGltYWdlUHJldmlld0Vycm9yICYmIChcclxuICAgICAgICAgICAgPHNtYWxsIGNsYXNzTmFtZT1cInRleHQtb3JhbmdlLTUwMCB0ZXh0LXhzIGJsb2NrIG10LTFcIj5cclxuICAgICAgICAgICAgICBObyBzZSBwdWRvIGNhcmdhciBsYSBpbWFnZW4uIFZlcmlmaWNhIGxhIFVSTC5cclxuICAgICAgICAgICAgPC9zbWFsbD5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHsvKiDilIDilIAgUmVxdWlyZWQgbm90ZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgKi99XHJcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LTUwMCBtLTAgbWItM1wiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtNTAwXCI+Kjwvc3Bhbj4gQ2FtcG9zIG9ibGlnYXRvcmlvc1xyXG4gICAgICAgIDwvcD5cclxuXHJcbiAgICAgICAgey8qIOKUgOKUgCBBUEkgZXJyb3Ig4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAICovfVxyXG4gICAgICAgIHthcGlFcnJvciAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTRcIj5cclxuICAgICAgICAgICAgPE1lc3NhZ2VcclxuICAgICAgICAgICAgICBzZXZlcml0eT1cImVycm9yXCJcclxuICAgICAgICAgICAgICB0ZXh0PXthcGlFcnJvcn1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwganVzdGlmeS1jb250ZW50LXN0YXJ0IGJvcmRlci1yb3VuZC14bCBwLTJcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAgey8qIOKUgOKUgCBBY3Rpb25zIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgCAqL31cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTMgbXQtMlwiPlxyXG4gICAgICAgICAge29uQ2FuY2VsICYmIChcclxuICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsYXJcIlxyXG4gICAgICAgICAgICAgIHNldmVyaXR5PVwic2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICBvdXRsaW5lZFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBib3JkZXItcm91bmQtM3hsIGZvbnQtYm9sZFwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17b25DYW5jZWx9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU3VibWl0dGluZ31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgYm9yZGVyLXJvdW5kLTN4bCBmb250LWJvbGRcIlxyXG4gICAgICAgICAgICBsYWJlbD17aXNTdWJtaXR0aW5nID8gJ0d1YXJkYW5kb+KApicgOiAnR3VhcmRhciBwcm9kdWN0byd9XHJcbiAgICAgICAgICAgIGxvYWRpbmc9e2lzU3VibWl0dGluZ31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufSJdfQ==