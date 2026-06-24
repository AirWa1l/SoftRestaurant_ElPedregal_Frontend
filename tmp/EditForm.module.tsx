import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/products/edit/EditForm.tsx");const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport12_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=a3d32f18";
import { InputText } from "/node_modules/.vite/deps/primereact_inputtext.js?v=a3d32f18";
import { InputTextarea } from "/node_modules/.vite/deps/primereact_inputtextarea.js?v=a3d32f18";
import { InputNumber } from "/node_modules/.vite/deps/primereact_inputnumber.js?v=a3d32f18";
import { Dropdown } from "/node_modules/.vite/deps/primereact_dropdown.js?v=a3d32f18";
import { Button } from "/node_modules/.vite/deps/primereact_button.js?v=a3d32f18";
import { Message } from "/node_modules/.vite/deps/primereact_message.js?v=a3d32f18";
import { InputSwitch } from "/node_modules/.vite/deps/primereact_inputswitch.js?v=a3d32f18";
import { Skeleton } from "/node_modules/.vite/deps/primereact_skeleton.js?v=a3d32f18";
import { classNames } from "/node_modules/.vite/deps/primereact_utils.js?v=a3d32f18";
import { productService } from "/src/services/productService.ts";
import { categoryService } from "/src/services/categoryService.ts";
var _jsxFileName = "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/products/edit/EditForm.tsx";
import __vite__cjsImport12_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=a3d32f18";
var _s = $RefreshSig$();
function validate(form) {
	const errors = {};
	if (!form.name.trim()) {
		errors.name = "El nombre del producto es obligatorio";
	} else if (form.name.trim().length < 3) {
		errors.name = "El nombre debe tener al menos 3 caracteres";
	}
	if (!form.category) {
		errors.category = "Selecciona una categoría";
	}
	if (form.stock == null || form.stock < 0) {
		errors.stock = "El stock no puede ser negativo";
	}
	if (!form.description?.trim()) {
		errors.description = "La descripción es obligatoria";
	} else if (form.description.trim().length < 10) {
		errors.description = "La descripción debe tener al menos 10 caracteres";
	}
	return errors;
}
export function ProductEditForm({ productId, onSuccess, onCancel }) {
	_s();
	const [form, setForm] = useState(null);
	const [categories, setCategories] = useState([]);
	const [errors, setErrors] = useState({});
	const [apiError, setApiError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [imagePreviewError, setImagePreviewError] = useState(false);
	const fileInputRef = useRef(null);
	useEffect(() => {
		let mounted = true;
		async function load() {
			setIsLoading(true);
			const [productRes, categoriesRes] = await Promise.all([productService.getById(productId), categoryService.getAll()]);
			if (!mounted) return;
			if (categoriesRes.success) {
				setCategories(categoriesRes.categories);
			}
			if (productRes.success && productRes.product) {
				setForm(productRes.product);
			} else {
				setApiError(productRes.message ?? "No se pudo cargar el producto.");
			}
			setIsLoading(false);
		}
		void load();
		return () => {
			mounted = false;
		};
	}, [productId]);
	function handleChange(field, value) {
		if (!form) return;
		setForm({
			...form,
			[field]: value
		});
		setApiError(null);
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
		if (!file || !form) return;
		setImageFile(file);
		setForm({
			...form,
			imageUrl: URL.createObjectURL(file)
		});
		setImagePreviewError(false);
	}
	async function handleSubmit(e) {
		e.preventDefault();
		if (!form) return;
		setApiError(null);
		const validationErrors = validate(form);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) return;
		setIsSubmitting(true);
		try {
			let result;
			if (imageFile) {
				const formData = new FormData();
				formData.append("name", form.name);
				formData.append("category", form.category);
				formData.append("description", form.description ?? "");
				formData.append("isAvailable", String(form.isAvailable));
				formData.append("stock", String(form.stock));
				formData.append("image", imageFile);
				result = await productService.update(productId, formData);
			} else {
				const payload = {
					name: form.name,
					category: form.category,
					description: form.description,
					isAvailable: form.isAvailable,
					stock: form.stock
				};
				result = await productService.update(productId, payload);
			}
			if (!result.success) {
				setApiError(result.message ?? "No fue posible actualizar el producto.");
				return;
			}
			onSuccess?.();
		} catch {
			setApiError("Ocurrió un error inesperado al guardar los cambios.");
		} finally {
			setIsSubmitting(false);
		}
	}
	if (isLoading) {
		return /* @__PURE__ */ _jsxDEV("div", {
			className: "flex flex-column gap-3",
			children: [
				/* @__PURE__ */ _jsxDEV(Skeleton, { height: "2rem" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 160,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV(Skeleton, { height: "2rem" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 161,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV(Skeleton, { height: "6rem" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 162,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV(Skeleton, {
					height: "2rem",
					width: "50%"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 163,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 159,
			columnNumber: 7
		}, this);
	}
	if (!form) {
		return /* @__PURE__ */ _jsxDEV(Message, {
			severity: "error",
			text: apiError ?? "Producto no encontrado.",
			className: "w-full justify-content-start border-round-xl"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 170,
			columnNumber: 7
		}, this);
	}
	const categoryOptions = categories.map((c) => ({
		label: c.name,
		value: c.id
	}));
	const showImagePreview = form.imageUrl && !imagePreviewError;
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "w-full mx-auto p-4",
		children: [/* @__PURE__ */ _jsxDEV("p", {
			className: "text-center text-sm m-0 mb-5 text-600 font-medium",
			children: "Modifica la información del producto. El precio no se puede cambiar para preservar pedidos existentes."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 183,
			columnNumber: 7
		}, this), /* @__PURE__ */ _jsxDEV("form", {
			onSubmit: handleSubmit,
			noValidate: true,
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-column gap-2 mb-3",
					children: [
						/* @__PURE__ */ _jsxDEV("label", {
							className: "text-xs font-bold text-primary uppercase",
							htmlFor: "edit-product-name",
							children: ["Nombre del producto ", /* @__PURE__ */ _jsxDEV("span", {
								className: "text-red-500",
								children: "*"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 33
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV(InputText, {
							id: "edit-product-name",
							className: classNames({ "p-invalid": errors.name }),
							value: form.name,
							onChange: (e) => handleChange("name", e.target.value)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 192,
							columnNumber: 11
						}, this),
						errors.name && /* @__PURE__ */ _jsxDEV("small", {
							className: "p-error block mt-1",
							role: "alert",
							children: errors.name
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 27
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 188,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-column gap-2 mb-3",
					children: [
						/* @__PURE__ */ _jsxDEV("label", {
							className: "text-xs font-bold text-primary uppercase",
							htmlFor: "edit-product-category",
							children: ["Categoría ", /* @__PURE__ */ _jsxDEV("span", {
								className: "text-red-500",
								children: "*"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 202,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV(Dropdown, {
							inputId: "edit-product-category",
							className: classNames("w-full", { "p-invalid": errors.category }),
							options: categoryOptions,
							placeholder: "Selecciona una categoría",
							value: form.category,
							onChange: (e) => handleChange("category", e.value)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 11
						}, this),
						errors.category && /* @__PURE__ */ _jsxDEV("small", {
							className: "p-error block mt-1",
							role: "alert",
							children: errors.category
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 31
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 201,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-nogutter gap-3 mb-3",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "col-12 md:col-6 flex flex-column gap-2",
						children: [
							/* @__PURE__ */ _jsxDEV("label", {
								className: "text-xs font-bold text-primary uppercase",
								children: "Precio (COP)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 218,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV(InputText, {
								value: form.price != null ? form.price.toLocaleString("es-CO", {
									style: "currency",
									currency: "COP",
									maximumFractionDigits: 0
								}) : "",
								disabled: true,
								className: "surface-100"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 221,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("small", {
								className: "text-500 text-xs",
								children: "El precio es inmutable tras la creación del producto."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 230,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 217,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "col-12 md:col-6 flex flex-column gap-2",
						children: [
							/* @__PURE__ */ _jsxDEV("label", {
								className: "text-xs font-bold text-primary uppercase",
								htmlFor: "edit-product-stock",
								children: ["Stock ", /* @__PURE__ */ _jsxDEV("span", {
									className: "text-red-500",
									children: "*"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 234,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV(InputNumber, {
								inputId: "edit-product-stock",
								inputClassName: classNames("w-full", { "p-invalid": errors.stock }),
								placeholder: "0",
								value: form.stock,
								onValueChange: (e) => handleChange("stock", e.value ?? 0),
								mode: "decimal",
								locale: "es-CO",
								min: 0
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 236,
								columnNumber: 13
							}, this),
							errors.stock && /* @__PURE__ */ _jsxDEV("small", {
								className: "p-error block mt-1",
								role: "alert",
								children: errors.stock
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 246,
								columnNumber: 30
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 232,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 216,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-column gap-2 mb-3",
					children: [
						/* @__PURE__ */ _jsxDEV("label", {
							className: "text-xs font-bold text-primary uppercase",
							htmlFor: "edit-product-description",
							children: ["Descripción ", /* @__PURE__ */ _jsxDEV("span", {
								className: "text-red-500",
								children: "*"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 252,
								columnNumber: 25
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 251,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV(InputTextarea, {
							id: "edit-product-description",
							className: classNames("w-full", { "p-invalid": errors.description }),
							value: form.description ?? "",
							onChange: (e) => handleChange("description", e.target.value),
							rows: 3,
							autoResize: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 254,
							columnNumber: 11
						}, this),
						errors.description && /* @__PURE__ */ _jsxDEV("small", {
							className: "p-error block mt-1",
							role: "alert",
							children: errors.description
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 262,
							columnNumber: 34
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 250,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex align-items-center gap-3 mb-3",
					children: [/* @__PURE__ */ _jsxDEV(InputSwitch, {
						checked: form.isAvailable,
						onChange: (e) => handleChange("isAvailable", e.value)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 266,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("label", {
						className: "text-sm font-semibold text-900",
						children: form.isAvailable ? "Disponible en el menú" : "No disponible"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 270,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 265,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-column gap-2 mb-3",
					children: [
						/* @__PURE__ */ _jsxDEV("label", {
							className: "text-xs font-bold text-primary uppercase",
							children: [
								"Imagen del producto",
								" ",
								/* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs font-normal text-500 normal-case",
									children: "(opcional)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 278,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 276,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex gap-2",
							children: /* @__PURE__ */ _jsxDEV(Button, {
								type: "button",
								icon: "pi pi-upload",
								label: "Cambiar imagen",
								severity: "secondary",
								outlined: true,
								onClick: () => fileInputRef.current?.click()
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 282,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 281,
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
							lineNumber: 292,
							columnNumber: 11
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
								lineNumber: 306,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 302,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 275,
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
						lineNumber: 319,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 318,
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
						lineNumber: 325,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV(Button, {
						type: "submit",
						className: "flex-1 border-round-3xl font-bold",
						label: isSubmitting ? "Guardando…" : "Guardar cambios",
						loading: isSubmitting
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 335,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 323,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 187,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 182,
		columnNumber: 5
	}, this);
}
_s(ProductEditForm, "u/16aiFt9ExH30GVq9JF3xOIQig=");
_c = ProductEditForm;
var _c;
$RefreshReg$(_c, "ProductEditForm");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/components/products/edit/EditForm.tsx?t=1781748997299";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/products/edit/EditForm.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/products/edit/EditForm.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/components/products/edit/EditForm.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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V0FBVTtPQUNWLE9BQU8sRUFBRSxTQUFTLE9BQU87T0FDekIsVUFBVTtNQUNYOzs7OztNQUVBLG9CQUNDLHdCQUFDLE9BQUQ7T0FDRSxXQUFVO09BQ1YsT0FBTztRQUFFLFdBQVc7UUFBUyxZQUFZO09BQXdCO2lCQUVqRSx3QkFBQyxPQUFEO1FBQ0UsS0FBSyxLQUFLO1FBQ1YsS0FBSTtRQUNKLFdBQVU7UUFDVixPQUFPO1NBQUUsV0FBVztTQUFXLFdBQVc7U0FBUyxTQUFTO1FBQVE7UUFDcEUsZUFBZSxxQkFBcUIsSUFBSTtPQUN6Qzs7Ozs7TUFDRTs7Ozs7S0FFSjs7Ozs7O0lBRUosWUFDQyx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUNiLHdCQUFDLFNBQUQ7TUFBUyxVQUFTO01BQVEsTUFBTTtNQUFVLFdBQVU7S0FBb0Q7Ozs7O0lBQ3JHOzs7OztJQUdQLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWYsQ0FDRyxZQUNDLHdCQUFDLFFBQUQ7TUFDRSxNQUFLO01BQ0wsT0FBTTtNQUNOLFVBQVM7TUFDVDtNQUNBLFdBQVU7TUFDVixTQUFTO01BQ1QsVUFBVTtLQUNYOzs7O2VBRUgsd0JBQUMsUUFBRDtNQUNFLE1BQUs7TUFDTCxXQUFVO01BQ1YsT0FBTyxlQUFlLGVBQWU7TUFDckMsU0FBUztLQUNWOzs7O2FBQ0U7Ozs7OztHQUNEOzs7OztVQUNIOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJFZGl0Rm9ybS50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IElucHV0VGV4dCB9IGZyb20gJ3ByaW1lcmVhY3QvaW5wdXR0ZXh0J1xyXG5pbXBvcnQgeyBJbnB1dFRleHRhcmVhIH0gZnJvbSAncHJpbWVyZWFjdC9pbnB1dHRleHRhcmVhJ1xyXG5pbXBvcnQgeyBJbnB1dE51bWJlciB9IGZyb20gJ3ByaW1lcmVhY3QvaW5wdXRudW1iZXInXHJcbmltcG9ydCB7IERyb3Bkb3duIH0gZnJvbSAncHJpbWVyZWFjdC9kcm9wZG93bidcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAncHJpbWVyZWFjdC9idXR0b24nXHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdwcmltZXJlYWN0L21lc3NhZ2UnXHJcbmltcG9ydCB7IElucHV0U3dpdGNoIH0gZnJvbSAncHJpbWVyZWFjdC9pbnB1dHN3aXRjaCdcclxuaW1wb3J0IHsgU2tlbGV0b24gfSBmcm9tICdwcmltZXJlYWN0L3NrZWxldG9uJ1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSAncHJpbWVyZWFjdC91dGlscydcclxuaW1wb3J0IHR5cGUgeyBQcm9kdWN0LCBQcm9kdWN0Rm9ybUVycm9ycyB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3Byb2R1Y3QnXHJcbmltcG9ydCB0eXBlIHsgQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9jYXRlZ29yeSdcclxuaW1wb3J0IHsgcHJvZHVjdFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9wcm9kdWN0U2VydmljZSdcclxuaW1wb3J0IHsgY2F0ZWdvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvY2F0ZWdvcnlTZXJ2aWNlJ1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGUoZm9ybTogUHJvZHVjdCk6IFByb2R1Y3RGb3JtRXJyb3JzIHtcclxuICBjb25zdCBlcnJvcnM6IFByb2R1Y3RGb3JtRXJyb3JzID0ge31cclxuXHJcbiAgaWYgKCFmb3JtLm5hbWUudHJpbSgpKSB7XHJcbiAgICBlcnJvcnMubmFtZSA9ICdFbCBub21icmUgZGVsIHByb2R1Y3RvIGVzIG9ibGlnYXRvcmlvJ1xyXG4gIH0gZWxzZSBpZiAoZm9ybS5uYW1lLnRyaW0oKS5sZW5ndGggPCAzKSB7XHJcbiAgICBlcnJvcnMubmFtZSA9ICdFbCBub21icmUgZGViZSB0ZW5lciBhbCBtZW5vcyAzIGNhcmFjdGVyZXMnXHJcbiAgfVxyXG5cclxuICBpZiAoIWZvcm0uY2F0ZWdvcnkpIHtcclxuICAgIGVycm9ycy5jYXRlZ29yeSA9ICdTZWxlY2Npb25hIHVuYSBjYXRlZ29yw61hJ1xyXG4gIH1cclxuXHJcbiAgaWYgKGZvcm0uc3RvY2sgPT0gbnVsbCB8fCBmb3JtLnN0b2NrIDwgMCkge1xyXG4gICAgZXJyb3JzLnN0b2NrID0gJ0VsIHN0b2NrIG5vIHB1ZWRlIHNlciBuZWdhdGl2bydcclxuICB9XHJcblxyXG4gIGlmICghZm9ybS5kZXNjcmlwdGlvbj8udHJpbSgpKSB7XHJcbiAgICBlcnJvcnMuZGVzY3JpcHRpb24gPSAnTGEgZGVzY3JpcGNpw7NuIGVzIG9ibGlnYXRvcmlhJ1xyXG4gIH0gZWxzZSBpZiAoZm9ybS5kZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoIDwgMTApIHtcclxuICAgIGVycm9ycy5kZXNjcmlwdGlvbiA9ICdMYSBkZXNjcmlwY2nDs24gZGViZSB0ZW5lciBhbCBtZW5vcyAxMCBjYXJhY3RlcmVzJ1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVycm9yc1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUHJvcHMge1xyXG4gIHByb2R1Y3RJZDogc3RyaW5nXHJcbiAgb25TdWNjZXNzPzogKCkgPT4gdm9pZFxyXG4gIG9uQ2FuY2VsPzogKCkgPT4gdm9pZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUHJvZHVjdEVkaXRGb3JtKHsgcHJvZHVjdElkLCBvblN1Y2Nlc3MsIG9uQ2FuY2VsIH06IFByb3BzKSB7XHJcbiAgY29uc3QgW2Zvcm0sIHNldEZvcm1dID0gdXNlU3RhdGU8UHJvZHVjdCB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW2NhdGVnb3JpZXMsIHNldENhdGVnb3JpZXNdID0gdXNlU3RhdGU8Q2F0ZWdvcnlbXT4oW10pXHJcbiAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlPFByb2R1Y3RGb3JtRXJyb3JzPih7fSlcclxuICBjb25zdCBbYXBpRXJyb3IsIHNldEFwaUVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpXHJcbiAgY29uc3QgW2lzU3VibWl0dGluZywgc2V0SXNTdWJtaXR0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtpbWFnZUZpbGUsIHNldEltYWdlRmlsZV0gPSB1c2VTdGF0ZTxGaWxlIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbaW1hZ2VQcmV2aWV3RXJyb3IsIHNldEltYWdlUHJldmlld0Vycm9yXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IGZpbGVJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50PihudWxsKVxyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGV0IG1vdW50ZWQgPSB0cnVlXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gbG9hZCgpIHtcclxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpXHJcbiAgICAgIGNvbnN0IFtwcm9kdWN0UmVzLCBjYXRlZ29yaWVzUmVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICBwcm9kdWN0U2VydmljZS5nZXRCeUlkKHByb2R1Y3RJZCksXHJcbiAgICAgICAgY2F0ZWdvcnlTZXJ2aWNlLmdldEFsbCgpLFxyXG4gICAgICBdKVxyXG5cclxuICAgICAgaWYgKCFtb3VudGVkKSByZXR1cm5cclxuXHJcbiAgICAgIGlmIChjYXRlZ29yaWVzUmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICBzZXRDYXRlZ29yaWVzKGNhdGVnb3JpZXNSZXMuY2F0ZWdvcmllcylcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHByb2R1Y3RSZXMuc3VjY2VzcyAmJiBwcm9kdWN0UmVzLnByb2R1Y3QpIHtcclxuICAgICAgICBzZXRGb3JtKHByb2R1Y3RSZXMucHJvZHVjdClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRBcGlFcnJvcihwcm9kdWN0UmVzLm1lc3NhZ2UgPz8gJ05vIHNlIHB1ZG8gY2FyZ2FyIGVsIHByb2R1Y3RvLicpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICB2b2lkIGxvYWQoKVxyXG4gICAgcmV0dXJuICgpID0+IHsgbW91bnRlZCA9IGZhbHNlIH1cclxuICB9LCBbcHJvZHVjdElkXSlcclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlQ2hhbmdlPEsgZXh0ZW5kcyBrZXlvZiBQcm9kdWN0PihmaWVsZDogSywgdmFsdWU6IFByb2R1Y3RbS10pIHtcclxuICAgIGlmICghZm9ybSkgcmV0dXJuXHJcbiAgICBzZXRGb3JtKHsgLi4uZm9ybSwgW2ZpZWxkXTogdmFsdWUgfSlcclxuICAgIHNldEFwaUVycm9yKG51bGwpXHJcbiAgICBpZiAoZXJyb3JzW2ZpZWxkIGFzIGtleW9mIFByb2R1Y3RGb3JtRXJyb3JzXSkge1xyXG4gICAgICBzZXRFcnJvcnMoKHByZXYpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2IH1cclxuICAgICAgICBkZWxldGUgbmV4dFtmaWVsZCBhcyBrZXlvZiBQcm9kdWN0Rm9ybUVycm9yc11cclxuICAgICAgICByZXR1cm4gbmV4dFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlRmlsZUNoYW5nZShlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG4gICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF1cclxuICAgIGlmICghZmlsZSB8fCAhZm9ybSkgcmV0dXJuXHJcblxyXG4gICAgc2V0SW1hZ2VGaWxlKGZpbGUpXHJcbiAgICBzZXRGb3JtKHsgLi4uZm9ybSwgaW1hZ2VVcmw6IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSkgfSlcclxuICAgIHNldEltYWdlUHJldmlld0Vycm9yKGZhbHNlKVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlU3VibWl0KGU6IFJlYWN0LkZvcm1FdmVudCkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBpZiAoIWZvcm0pIHJldHVyblxyXG5cclxuICAgIHNldEFwaUVycm9yKG51bGwpXHJcbiAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3JzID0gdmFsaWRhdGUoZm9ybSlcclxuICAgIHNldEVycm9ycyh2YWxpZGF0aW9uRXJyb3JzKVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHZhbGlkYXRpb25FcnJvcnMpLmxlbmd0aCA+IDApIHJldHVyblxyXG5cclxuICAgIHNldElzU3VibWl0dGluZyh0cnVlKVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCByZXN1bHRcclxuXHJcbiAgICAgICAgaWYgKGltYWdlRmlsZSkge1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCBmb3JtLm5hbWUpXHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdjYXRlZ29yeScsIGZvcm0uY2F0ZWdvcnkpXHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdkZXNjcmlwdGlvbicsIGZvcm0uZGVzY3JpcHRpb24gPz8gJycpXHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdpc0F2YWlsYWJsZScsIFN0cmluZyhmb3JtLmlzQXZhaWxhYmxlKSlcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3N0b2NrJywgU3RyaW5nKGZvcm0uc3RvY2spKVxyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2UnLCBpbWFnZUZpbGUpXHJcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UudXBkYXRlKHByb2R1Y3RJZCwgZm9ybURhdGEpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZDogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7XHJcbiAgICAgICAgICBuYW1lOiBmb3JtLm5hbWUsXHJcbiAgICAgICAgICBjYXRlZ29yeTogZm9ybS5jYXRlZ29yeSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBmb3JtLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgaXNBdmFpbGFibGU6IGZvcm0uaXNBdmFpbGFibGUsXHJcbiAgICAgICAgICBzdG9jazogZm9ybS5zdG9jayxcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UudXBkYXRlKHByb2R1Y3RJZCwgcGF5bG9hZClcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFyZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgIHNldEFwaUVycm9yKHJlc3VsdC5tZXNzYWdlID8/ICdObyBmdWUgcG9zaWJsZSBhY3R1YWxpemFyIGVsIHByb2R1Y3RvLicpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG9uU3VjY2Vzcz8uKClcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICBzZXRBcGlFcnJvcignT2N1cnJpw7MgdW4gZXJyb3IgaW5lc3BlcmFkbyBhbCBndWFyZGFyIGxvcyBjYW1iaW9zLicpXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc1N1Ym1pdHRpbmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoaXNMb2FkaW5nKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2x1bW4gZ2FwLTNcIj5cclxuICAgICAgICA8U2tlbGV0b24gaGVpZ2h0PVwiMnJlbVwiIC8+XHJcbiAgICAgICAgPFNrZWxldG9uIGhlaWdodD1cIjJyZW1cIiAvPlxyXG4gICAgICAgIDxTa2VsZXRvbiBoZWlnaHQ9XCI2cmVtXCIgLz5cclxuICAgICAgICA8U2tlbGV0b24gaGVpZ2h0PVwiMnJlbVwiIHdpZHRoPVwiNTAlXCIgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBpZiAoIWZvcm0pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxNZXNzYWdlXHJcbiAgICAgICAgc2V2ZXJpdHk9XCJlcnJvclwiXHJcbiAgICAgICAgdGV4dD17YXBpRXJyb3IgPz8gJ1Byb2R1Y3RvIG5vIGVuY29udHJhZG8uJ31cclxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwganVzdGlmeS1jb250ZW50LXN0YXJ0IGJvcmRlci1yb3VuZC14bFwiXHJcbiAgICAgIC8+XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBjb25zdCBjYXRlZ29yeU9wdGlvbnMgPSBjYXRlZ29yaWVzLm1hcCgoYykgPT4gKHsgbGFiZWw6IGMubmFtZSwgdmFsdWU6IGMuaWQgfSkpXHJcbiAgY29uc3Qgc2hvd0ltYWdlUHJldmlldyA9IGZvcm0uaW1hZ2VVcmwgJiYgIWltYWdlUHJldmlld0Vycm9yXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBteC1hdXRvIHAtNFwiPlxyXG4gICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB0ZXh0LXNtIG0tMCBtYi01IHRleHQtNjAwIGZvbnQtbWVkaXVtXCI+XHJcbiAgICAgICAgTW9kaWZpY2EgbGEgaW5mb3JtYWNpw7NuIGRlbCBwcm9kdWN0by4gRWwgcHJlY2lvIG5vIHNlIHB1ZWRlIGNhbWJpYXIgcGFyYSBwcmVzZXJ2YXIgcGVkaWRvcyBleGlzdGVudGVzLlxyXG4gICAgICA8L3A+XHJcblxyXG4gICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSBub1ZhbGlkYXRlPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbHVtbiBnYXAtMiBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1wcmltYXJ5IHVwcGVyY2FzZVwiIGh0bWxGb3I9XCJlZGl0LXByb2R1Y3QtbmFtZVwiPlxyXG4gICAgICAgICAgICBOb21icmUgZGVsIHByb2R1Y3RvIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTUwMFwiPio8L3NwYW4+XHJcbiAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgPElucHV0VGV4dFxyXG4gICAgICAgICAgICBpZD1cImVkaXQtcHJvZHVjdC1uYW1lXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHsgJ3AtaW52YWxpZCc6IGVycm9ycy5uYW1lIH0pfVxyXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybS5uYW1lfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgnbmFtZScsIGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICB7ZXJyb3JzLm5hbWUgJiYgPHNtYWxsIGNsYXNzTmFtZT1cInAtZXJyb3IgYmxvY2sgbXQtMVwiIHJvbGU9XCJhbGVydFwiPntlcnJvcnMubmFtZX08L3NtYWxsPn1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sdW1uIGdhcC0yIG1iLTNcIj5cclxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXByaW1hcnkgdXBwZXJjYXNlXCIgaHRtbEZvcj1cImVkaXQtcHJvZHVjdC1jYXRlZ29yeVwiPlxyXG4gICAgICAgICAgICBDYXRlZ29yw61hIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTUwMFwiPio8L3NwYW4+XHJcbiAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgPERyb3Bkb3duXHJcbiAgICAgICAgICAgIGlucHV0SWQ9XCJlZGl0LXByb2R1Y3QtY2F0ZWdvcnlcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3ctZnVsbCcsIHsgJ3AtaW52YWxpZCc6IGVycm9ycy5jYXRlZ29yeSB9KX1cclxuICAgICAgICAgICAgb3B0aW9ucz17Y2F0ZWdvcnlPcHRpb25zfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjY2lvbmEgdW5hIGNhdGVnb3LDrWFcIlxyXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybS5jYXRlZ29yeX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoJ2NhdGVnb3J5JywgZS52YWx1ZSl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAge2Vycm9ycy5jYXRlZ29yeSAmJiA8c21hbGwgY2xhc3NOYW1lPVwicC1lcnJvciBibG9jayBtdC0xXCIgcm9sZT1cImFsZXJ0XCI+e2Vycm9ycy5jYXRlZ29yeX08L3NtYWxsPn1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtbm9ndXR0ZXIgZ2FwLTMgbWItM1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgbWQ6Y29sLTYgZmxleCBmbGV4LWNvbHVtbiBnYXAtMlwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1wcmltYXJ5IHVwcGVyY2FzZVwiPlxyXG4gICAgICAgICAgICAgIFByZWNpbyAoQ09QKVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8SW5wdXRUZXh0XHJcbiAgICAgICAgICAgICAgdmFsdWU9e1xyXG4gICAgICAgICAgICAgICAgZm9ybS5wcmljZSAhPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgID8gZm9ybS5wcmljZS50b0xvY2FsZVN0cmluZygnZXMtQ08nLCB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ0NPUCcsIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMCB9KVxyXG4gICAgICAgICAgICAgICAgICA6ICcnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3VyZmFjZS0xMDBcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwidGV4dC01MDAgdGV4dC14c1wiPkVsIHByZWNpbyBlcyBpbm11dGFibGUgdHJhcyBsYSBjcmVhY2nDs24gZGVsIHByb2R1Y3RvLjwvc21hbGw+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIG1kOmNvbC02IGZsZXggZmxleC1jb2x1bW4gZ2FwLTJcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtcHJpbWFyeSB1cHBlcmNhc2VcIiBodG1sRm9yPVwiZWRpdC1wcm9kdWN0LXN0b2NrXCI+XHJcbiAgICAgICAgICAgICAgU3RvY2sgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtNTAwXCI+Kjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPElucHV0TnVtYmVyXHJcbiAgICAgICAgICAgICAgaW5wdXRJZD1cImVkaXQtcHJvZHVjdC1zdG9ja1wiXHJcbiAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3ctZnVsbCcsIHsgJ3AtaW52YWxpZCc6IGVycm9ycy5zdG9jayB9KX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjBcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXtmb3JtLnN0b2NrfVxyXG4gICAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoJ3N0b2NrJywgZS52YWx1ZSA/PyAwKX1cclxuICAgICAgICAgICAgICBtb2RlPVwiZGVjaW1hbFwiXHJcbiAgICAgICAgICAgICAgbG9jYWxlPVwiZXMtQ09cIlxyXG4gICAgICAgICAgICAgIG1pbj17MH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAge2Vycm9ycy5zdG9jayAmJiA8c21hbGwgY2xhc3NOYW1lPVwicC1lcnJvciBibG9jayBtdC0xXCIgcm9sZT1cImFsZXJ0XCI+e2Vycm9ycy5zdG9ja308L3NtYWxsPn1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2x1bW4gZ2FwLTIgbWItM1wiPlxyXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtcHJpbWFyeSB1cHBlcmNhc2VcIiBodG1sRm9yPVwiZWRpdC1wcm9kdWN0LWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgIERlc2NyaXBjacOzbiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJlZC01MDBcIj4qPC9zcGFuPlxyXG4gICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgIDxJbnB1dFRleHRhcmVhXHJcbiAgICAgICAgICAgIGlkPVwiZWRpdC1wcm9kdWN0LWRlc2NyaXB0aW9uXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCd3LWZ1bGwnLCB7ICdwLWludmFsaWQnOiBlcnJvcnMuZGVzY3JpcHRpb24gfSl9XHJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtLmRlc2NyaXB0aW9uID8/ICcnfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgnZGVzY3JpcHRpb24nLCBlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgIHJvd3M9ezN9XHJcbiAgICAgICAgICAgIGF1dG9SZXNpemVcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICB7ZXJyb3JzLmRlc2NyaXB0aW9uICYmIDxzbWFsbCBjbGFzc05hbWU9XCJwLWVycm9yIGJsb2NrIG10LTFcIiByb2xlPVwiYWxlcnRcIj57ZXJyb3JzLmRlc2NyaXB0aW9ufTwvc21hbGw+fVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggYWxpZ24taXRlbXMtY2VudGVyIGdhcC0zIG1iLTNcIj5cclxuICAgICAgICAgIDxJbnB1dFN3aXRjaFxyXG4gICAgICAgICAgICBjaGVja2VkPXtmb3JtLmlzQXZhaWxhYmxlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgnaXNBdmFpbGFibGUnLCBlLnZhbHVlKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtOTAwXCI+XHJcbiAgICAgICAgICAgIHtmb3JtLmlzQXZhaWxhYmxlID8gJ0Rpc3BvbmlibGUgZW4gZWwgbWVuw7onIDogJ05vIGRpc3BvbmlibGUnfVxyXG4gICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sdW1uIGdhcC0yIG1iLTNcIj5cclxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXByaW1hcnkgdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgICAgIEltYWdlbiBkZWwgcHJvZHVjdG97JyAnfVxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbm9ybWFsIHRleHQtNTAwIG5vcm1hbC1jYXNlXCI+KG9wY2lvbmFsKTwvc3Bhbj5cclxuICAgICAgICAgIDwvbGFiZWw+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XHJcbiAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBpY29uPVwicGkgcGktdXBsb2FkXCJcclxuICAgICAgICAgICAgICBsYWJlbD1cIkNhbWJpYXIgaW1hZ2VuXCJcclxuICAgICAgICAgICAgICBzZXZlcml0eT1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgICAgb3V0bGluZWRcclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBmaWxlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICByZWY9e2ZpbGVJbnB1dFJlZn1cclxuICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVGaWxlQ2hhbmdlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICB7c2hvd0ltYWdlUHJldmlldyAmJiAoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC0yIGJvcmRlci1yb3VuZC14bCBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyLTEgc3VyZmFjZS1ib3JkZXJcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7IG1heEhlaWdodDogJzIwMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLXN1cmZhY2UtZ3JvdW5kKScgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgIHNyYz17Zm9ybS5pbWFnZVVybH1cclxuICAgICAgICAgICAgICAgIGFsdD1cIlByZXZpZXcgZGVsIHByb2R1Y3RvXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGxcIlxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgb2JqZWN0Rml0OiAnY29udGFpbicsIG1heEhlaWdodDogJzIwMHB4JywgZGlzcGxheTogJ2Jsb2NrJyB9fVxyXG4gICAgICAgICAgICAgICAgb25FcnJvcj17KCkgPT4gc2V0SW1hZ2VQcmV2aWV3RXJyb3IodHJ1ZSl9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7YXBpRXJyb3IgJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi00XCI+XHJcbiAgICAgICAgICAgIDxNZXNzYWdlIHNldmVyaXR5PVwiZXJyb3JcIiB0ZXh0PXthcGlFcnJvcn0gY2xhc3NOYW1lPVwidy1mdWxsIGp1c3RpZnktY29udGVudC1zdGFydCBib3JkZXItcm91bmQteGwgcC0yXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMyBtdC0yXCI+XHJcbiAgICAgICAgICB7b25DYW5jZWwgJiYgKFxyXG4gICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJDYW5jZWxhclwiXHJcbiAgICAgICAgICAgICAgc2V2ZXJpdHk9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICAgIG91dGxpbmVkXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGJvcmRlci1yb3VuZC0zeGwgZm9udC1ib2xkXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNhbmNlbH1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNTdWJtaXR0aW5nfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBib3JkZXItcm91bmQtM3hsIGZvbnQtYm9sZFwiXHJcbiAgICAgICAgICAgIGxhYmVsPXtpc1N1Ym1pdHRpbmcgPyAnR3VhcmRhbmRv4oCmJyA6ICdHdWFyZGFyIGNhbWJpb3MnfVxyXG4gICAgICAgICAgICBsb2FkaW5nPXtpc1N1Ym1pdHRpbmd9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbn1cclxuIl19