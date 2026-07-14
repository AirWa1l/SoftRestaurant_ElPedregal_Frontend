import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/ProductPage.tsx");const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport14_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=a3d32f18";
import { Button } from "/node_modules/.vite/deps/primereact_button.js?v=a3d32f18";
import { Toast } from "/node_modules/.vite/deps/primereact_toast.js?v=a3d32f18";
import { InputText } from "/node_modules/.vite/deps/primereact_inputtext.js?v=a3d32f18";
import { Dropdown } from "/node_modules/.vite/deps/primereact_dropdown.js?v=a3d32f18";
import { Skeleton } from "/node_modules/.vite/deps/primereact_skeleton.js?v=a3d32f18";
import { ConfirmDialog, confirmDialog } from "/node_modules/.vite/deps/primereact_confirmdialog.js?v=a3d32f18";
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=a3d32f18";
import { DashboardSidebarHeader } from "/src/components/layout/DashboardSidebarHeader.tsx?t=1781748294432";
import { DashboardSidebarFooter } from "/src/components/layout/DashboardSidebarFooter.tsx?t=1781748238845";
import { userService } from "/src/services/userService.ts?t=1781748238845";
import { categoryService } from "/src/services/categoryService.ts?t=1781748302042";
import { productService } from "/src/services/productService.ts?t=1781748305092";
import { canCreateProduct, canDeleteProduct, canEditProduct } from "/src/utils/roles.ts";
var _jsxFileName = "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/pages/ProductPage.tsx";
import __vite__cjsImport14_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=a3d32f18";
var _s = $RefreshSig$(), _s2 = $RefreshSig$();
function ProductCardSkeleton() {
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "surface-card border-1 surface-border border-round-xl p-3 flex flex-column gap-3",
		children: [
			/* @__PURE__ */ _jsxDEV(Skeleton, {
				height: "140px",
				borderRadius: "10px"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 22,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-column gap-2",
				children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
					width: "70%",
					height: "1rem"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 24,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV(Skeleton, {
					width: "40%",
					height: "0.75rem"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 25,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 23,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex justify-content-between align-items-center",
				children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
					width: "50%",
					height: "1.25rem"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV(Skeleton, {
					width: "30%",
					height: "0.75rem"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 29,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 27,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
					height: "2rem",
					className: "flex-1",
					borderRadius: "8px"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 32,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV(Skeleton, {
					height: "2rem",
					width: "2.5rem",
					borderRadius: "8px"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 33,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 5
	}, this);
}
_c = ProductCardSkeleton;
function EmptyState({ onCreateClick, canCreate }) {
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "flex flex-column align-items-center justify-content-center gap-4 py-8 text-center",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex align-items-center justify-content-center border-circle surface-200 text-5xl",
				style: {
					width: "5rem",
					height: "5rem"
				},
				children: "📦"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-column gap-1",
				children: [/* @__PURE__ */ _jsxDEV("h3", {
					className: "m-0 text-xl font-bold text-900",
					children: "Sin productos aún"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("p", {
					className: "m-0 text-sm text-600 max-w-20rem",
					children: canCreate ? "Agrega tu primer producto al catálogo y empieza a gestionarlo desde aquí." : "El catálogo aún no tiene productos disponibles."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 48,
				columnNumber: 7
			}, this),
			canCreate && /* @__PURE__ */ _jsxDEV(Button, {
				label: "Crear primer producto",
				icon: "pi pi-plus",
				className: "border-round-3xl font-bold",
				onClick: onCreateClick
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 57,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 41,
		columnNumber: 5
	}, this);
}
_c2 = EmptyState;
function ProductCard({ product, onEdit, onDelete, onAddToCart, quantityInCart, showActions, canEdit, canDelete }) {
	_s();
	const [imgError, setImgError] = useState(false);
	const badgeClass = product.isAvailable ? "text-xs font-semibold px-2 py-1 border-round-lg bg-green-100 text-green-700" : "text-xs font-semibold px-2 py-1 border-round-lg bg-red-100 text-red-600";
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "surface-card border-1 surface-border border-round-xl p-3 flex flex-column gap-3",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "border-round-lg overflow-hidden surface-100 flex align-items-center justify-content-center",
				style: { height: "140px" },
				children: product.imageUrl && !imgError ? /* @__PURE__ */ _jsxDEV("img", {
					src: product.imageUrl,
					alt: product.name,
					style: {
						width: "100%",
						height: "100%",
						objectFit: "cover",
						display: "block"
					},
					onError: () => setImgError(true)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 11
				}, this) : /* @__PURE__ */ _jsxDEV("span", {
					className: "text-4xl",
					children: "🛒"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 79,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 75,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-column gap-1",
				children: [/* @__PURE__ */ _jsxDEV("span", {
					className: "font-bold text-900 text-sm line-clamp-1",
					children: product.name
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 84,
					columnNumber: 9
				}, this), product.categoryName && /* @__PURE__ */ _jsxDEV("span", {
					className: "text-xs text-500",
					children: product.categoryName
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 34
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 83,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex justify-content-between align-items-center",
				children: [/* @__PURE__ */ _jsxDEV("span", {
					className: "text-primary font-bold text-base",
					children: (product.price || 0).toLocaleString("es-CO", {
						style: "currency",
						currency: "COP",
						maximumFractionDigits: 0
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 89,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("span", {
					className: badgeClass,
					children: product.isAvailable ? "Disponible" : "No disponible"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 90,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex justify-content-between align-items-center gap-2 text-xs text-600",
				children: [/* @__PURE__ */ _jsxDEV("span", { children: product.stock > 0 ? product.stock + " en stock" : "Agotado" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 94,
					columnNumber: 9
				}, this), quantityInCart ? /* @__PURE__ */ _jsxDEV("span", { children: [quantityInCart, " en pedido"] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 95,
					columnNumber: 27
				}, this) : null]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 93,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex gap-2",
				children: [showActions && /* @__PURE__ */ _jsxDEV("div", {
					className: "flex gap-2",
					children: [canEdit && /* @__PURE__ */ _jsxDEV(Button, {
						label: "Editar",
						icon: "pi pi-pencil",
						severity: "secondary",
						outlined: true,
						size: "small",
						className: "flex-1 border-round-lg font-semibold",
						onClick: () => onEdit && onEdit(product)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 102,
						columnNumber: 15
					}, this), canDelete && /* @__PURE__ */ _jsxDEV(Button, {
						icon: "pi pi-trash",
						severity: "danger",
						outlined: true,
						size: "small",
						className: "border-round-lg",
						onClick: () => onDelete && onDelete(product),
						tooltip: "Eliminar",
						tooltipOptions: { position: "top" }
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 100,
					columnNumber: 11
				}, this), !showActions && onAddToCart && /* @__PURE__ */ _jsxDEV(Button, {
					label: quantityInCart ? "Añadir de nuevo (" + quantityInCart + ")" : "Agregar al pedido",
					icon: "pi pi-shopping-cart",
					severity: "success",
					className: "w-full border-round-lg",
					disabled: !product.isAvailable || product.stock === 0 || (quantityInCart || 0) >= product.stock,
					onClick: () => onAddToCart(product)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 111,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 98,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 74,
		columnNumber: 5
	}, this);
}
_s(ProductCard, "0doYx/lFKmVVbvtO/eWR8SJrtgo=");
_c3 = ProductCard;
export function ProductsPage() {
	_s2();
	const navigate = useNavigate();
	const toast = useRef(null);
	const [currentUser, setCurrentUser] = useState(null);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [cartItems, setCartItems] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("");
	const userRole = currentUser?.role ?? "user";
	const cartCount = useMemo(() => Object.values(cartItems).reduce((sum, value) => sum + value, 0), [cartItems]);
	const canCreate = canCreateProduct(userRole);
	const canEdit = canEditProduct(userRole);
	const canDelete = canDeleteProduct(userRole);
	const showActions = canEdit || canDelete;
	const categoryOptions = useMemo(() => [{
		label: "Todas las categorías",
		value: ""
	}, ...categories.map((c) => ({
		label: c.name,
		value: c.id
	}))], [categories]);
	useEffect(() => {
		let mounted = true;
		async function load() {
			setIsLoading(true);
			try {
				const userRes = await userService.getCurrentUser();
				if (mounted && userRes.success && userRes.user) {
					setCurrentUser(userRes.user);
				}
				if (typeof window !== "undefined") {
					const cachedCart = window.localStorage.getItem("pedregal_cart");
					if (cachedCart) {
						try {
							setCartItems(JSON.parse(cachedCart));
						} catch {
							setCartItems({});
						}
					}
				}
				const [productsRes, categoriesRes] = await Promise.all([productService.getAll(), categoryService.getAll()]);
				if (mounted) {
					if (categoriesRes.success) {
						setCategories(categoriesRes.categories);
					}
					if (productsRes.success) {
						setProducts(productsRes.products || []);
					} else {
						toast.current?.show({
							severity: "error",
							summary: "Error",
							detail: productsRes.message,
							life: 4e3
						});
						setProducts([]);
					}
				}
			} catch {
				if (mounted) {
					toast.current?.show({
						severity: "error",
						summary: "Error",
						detail: "No se pudieron cargar los productos.",
						life: 4e3
					});
				}
			} finally {
				if (mounted) setIsLoading(false);
			}
		}
		void load();
		return () => {
			mounted = false;
		};
	}, []);
	const filtered = useMemo(() => {
		return products.filter((p) => {
			const matchSearch = !search.trim() || p.name.toLowerCase().includes(search.toLowerCase());
			const matchCategory = !categoryFilter || p.category === categoryFilter;
			return matchSearch && matchCategory;
		});
	}, [
		products,
		search,
		categoryFilter
	]);
	function handleEdit(product) {
		navigate(`/products/${product.id}/edit`);
	}
	function handleAddToCart(product) {
		const currentQty = cartItems[product.id] ?? 0;
		if (!product.isAvailable || product.stock === 0 || currentQty >= product.stock) {
			toast.current?.show({
				severity: "warn",
				summary: "No disponible",
				detail: "No se puede agregar más de este producto al pedido.",
				life: 3e3
			});
			return;
		}
		const nextCart = {
			...cartItems,
			[product.id]: currentQty + 1
		};
		setCartItems(nextCart);
		window.localStorage.setItem("pedregal_cart", JSON.stringify(nextCart));
		toast.current?.show({
			severity: "success",
			summary: "Agregado",
			detail: `${product.name} se agregó al pedido.`,
			life: 3e3
		});
	}
	function handleDelete(product) {
		confirmDialog({
			message: `¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`,
			header: "Confirmar eliminación",
			icon: "pi pi-exclamation-triangle",
			acceptClassName: "p-button-danger",
			acceptLabel: "Eliminar",
			rejectLabel: "Cancelar",
			accept: async () => {
				const result = await productService.remove(product.id);
				if (result.success) {
					setProducts((prev) => prev.filter((p) => p.id !== product.id));
					toast.current?.show({
						severity: "success",
						summary: "Eliminado",
						detail: result.message,
						life: 3e3
					});
				} else {
					toast.current?.show({
						severity: "error",
						summary: "Error",
						detail: result.message,
						life: 4e3
					});
				}
			}
		});
	}
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "dashboard-shell",
		children: [/* @__PURE__ */ _jsxDEV("aside", {
			className: "dashboard-sidebar",
			children: [/* @__PURE__ */ _jsxDEV(DashboardSidebarHeader, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 264,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV(DashboardSidebarFooter, {
				currentUser,
				onGoToEditProfile: () => navigate("/edit-profile")
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 265,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 263,
			columnNumber: 7
		}, this), /* @__PURE__ */ _jsxDEV("main", {
			className: "edit-profile-main",
			children: [
				/* @__PURE__ */ _jsxDEV(Toast, { ref: toast }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 272,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV(ConfirmDialog, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 273,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "edit-profile-layout",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex align-items-start justify-content-between flex-wrap gap-3 mb-4",
							children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h1", {
								className: "text-2xl font-bold text-900 m-0",
								children: "Productos"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 278,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("p", {
								className: "text-sm text-600 m-0 mt-1",
								children: [isLoading ? "Cargando catálogo…" : `${products.length} producto${products.length !== 1 ? "s" : ""} en total`, !isLoading && userRole === "user" && cartCount > 0 && ` · ${cartCount} en tu pedido`]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 279,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 277,
								columnNumber: 13
							}, this), canCreate && /* @__PURE__ */ _jsxDEV(Button, {
								label: "Nuevo producto",
								icon: "pi pi-plus",
								className: "border-round-3xl font-bold",
								onClick: () => navigate("/products/create")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 286,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 276,
							columnNumber: 11
						}, this),
						!isLoading && products.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
							className: "flex gap-3 flex-wrap mb-4",
							children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "p-input-icon-left flex-1",
								style: { minWidth: "180px" },
								children: [/* @__PURE__ */ _jsxDEV("i", { className: "pi pi-search" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 298,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV(InputText, {
									placeholder: "Buscar por nombre…",
									value: search,
									onChange: (e) => setSearch(e.target.value),
									className: "w-full border-round-xl"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 299,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 297,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV(Dropdown, {
								options: categoryOptions,
								value: categoryFilter,
								onChange: (e) => setCategoryFilter(e.value),
								placeholder: "Categoría",
								className: "border-round-xl",
								style: { minWidth: "180px" }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 306,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 296,
							columnNumber: 13
						}, this),
						isLoading ? /* @__PURE__ */ _jsxDEV("div", {
							className: "grid",
							children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ _jsxDEV("div", {
								className: "col-12 sm:col-6 md:col-4 lg:col-3",
								children: /* @__PURE__ */ _jsxDEV(ProductCardSkeleton, {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 321,
									columnNumber: 19
								}, this)
							}, i, false, {
								fileName: _jsxFileName,
								lineNumber: 320,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 318,
							columnNumber: 13
						}, this) : filtered.length === 0 && products.length === 0 ? /* @__PURE__ */ _jsxDEV(EmptyState, {
							onCreateClick: () => navigate("/products/create"),
							canCreate
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 326,
							columnNumber: 13
						}, this) : filtered.length === 0 ? /* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-column align-items-center justify-content-center gap-3 py-8 text-center",
							children: [
								/* @__PURE__ */ _jsxDEV("span", {
									className: "text-4xl",
									children: "🔍"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 329,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-sm text-600 m-0",
									children: ["Sin resultados para ", /* @__PURE__ */ _jsxDEV("strong", { children: [
										"\"",
										search || categoryFilter,
										"\""
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 330,
										columnNumber: 71
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 330,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV(Button, {
									label: "Limpiar filtros",
									severity: "secondary",
									outlined: true,
									className: "border-round-3xl",
									onClick: () => {
										setSearch("");
										setCategoryFilter("");
									}
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 331,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 328,
							columnNumber: 13
						}, this) : /* @__PURE__ */ _jsxDEV("div", {
							className: "grid",
							children: filtered.map((product) => /* @__PURE__ */ _jsxDEV("div", {
								className: "col-12 sm:col-6 md:col-4 lg:col-3",
								children: /* @__PURE__ */ _jsxDEV(ProductCard, {
									product,
									onEdit: handleEdit,
									onDelete: handleDelete,
									onAddToCart: !showActions ? handleAddToCart : undefined,
									quantityInCart: cartItems[product.id] ?? 0,
									showActions,
									canEdit,
									canDelete
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 343,
									columnNumber: 19
								}, this)
							}, product.id, false, {
								fileName: _jsxFileName,
								lineNumber: 342,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 340,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 275,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 271,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 262,
		columnNumber: 5
	}, this);
}
_s2(ProductsPage, "4xYOx/VEsWNpsE3UsdTPlP6ZCzk=", false, function() {
	return [useNavigate];
});
_c4 = ProductsPage;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "ProductCardSkeleton");
$RefreshReg$(_c2, "EmptyState");
$RefreshReg$(_c3, "ProductCard");
$RefreshReg$(_c4, "ProductsPage");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/pages/ProductPage.tsx?t=1781748310462";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/pages/ProductPage.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/pages/ProductPage.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/jjmaf/Downloads/pedregal web/front/SoftRestaurant_ElPedregal_Frontend/src/pages/ProductPage.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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IlByb2R1Y3RQYWdlLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3ByaW1lcmVhY3QvYnV0dG9uJ1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICdwcmltZXJlYWN0L3RvYXN0J1xuaW1wb3J0IHsgSW5wdXRUZXh0IH0gZnJvbSAncHJpbWVyZWFjdC9pbnB1dHRleHQnXG5pbXBvcnQgeyBEcm9wZG93biB9IGZyb20gJ3ByaW1lcmVhY3QvZHJvcGRvd24nXG5pbXBvcnQgeyBTa2VsZXRvbiB9IGZyb20gJ3ByaW1lcmVhY3Qvc2tlbGV0b24nXG5pbXBvcnQgeyBDb25maXJtRGlhbG9nLCBjb25maXJtRGlhbG9nIH0gZnJvbSAncHJpbWVyZWFjdC9jb25maXJtZGlhbG9nJ1xuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgRGFzaGJvYXJkU2lkZWJhckhlYWRlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvbGF5b3V0L0Rhc2hib2FyZFNpZGViYXJIZWFkZXInXG5pbXBvcnQgeyBEYXNoYm9hcmRTaWRlYmFyRm9vdGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9sYXlvdXQvRGFzaGJvYXJkU2lkZWJhckZvb3RlcidcbmltcG9ydCB0eXBlIHsgQ3VycmVudFVzZXIgfSBmcm9tICcuLi90eXBlcy9wcm9maWxlJ1xuaW1wb3J0IHR5cGUgeyBDYXRlZ29yeSB9IGZyb20gJy4uL3R5cGVzL2NhdGVnb3J5J1xuaW1wb3J0IHsgdXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91c2VyU2VydmljZSdcbmltcG9ydCB7IGNhdGVnb3J5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NhdGVnb3J5U2VydmljZSdcbmltcG9ydCB0eXBlIHsgUHJvZHVjdCB9IGZyb20gJy4uL3R5cGVzL3Byb2R1Y3QnXG5pbXBvcnQgeyBwcm9kdWN0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Byb2R1Y3RTZXJ2aWNlJ1xuaW1wb3J0IHsgY2FuQ3JlYXRlUHJvZHVjdCwgY2FuRGVsZXRlUHJvZHVjdCwgY2FuRWRpdFByb2R1Y3QgfSBmcm9tICcuLi91dGlscy9yb2xlcydcblxuZnVuY3Rpb24gUHJvZHVjdENhcmRTa2VsZXRvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInN1cmZhY2UtY2FyZCBib3JkZXItMSBzdXJmYWNlLWJvcmRlciBib3JkZXItcm91bmQteGwgcC0zIGZsZXggZmxleC1jb2x1bW4gZ2FwLTNcIj5cbiAgICAgIDxTa2VsZXRvbiBoZWlnaHQ9XCIxNDBweFwiIGJvcmRlclJhZGl1cz1cIjEwcHhcIiAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sdW1uIGdhcC0yXCI+XG4gICAgICAgIDxTa2VsZXRvbiB3aWR0aD1cIjcwJVwiIGhlaWdodD1cIjFyZW1cIiAvPlxuICAgICAgICA8U2tlbGV0b24gd2lkdGg9XCI0MCVcIiBoZWlnaHQ9XCIwLjc1cmVtXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgICA8U2tlbGV0b24gd2lkdGg9XCI1MCVcIiBoZWlnaHQ9XCIxLjI1cmVtXCIgLz5cbiAgICAgICAgPFNrZWxldG9uIHdpZHRoPVwiMzAlXCIgaGVpZ2h0PVwiMC43NXJlbVwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICA8U2tlbGV0b24gaGVpZ2h0PVwiMnJlbVwiIGNsYXNzTmFtZT1cImZsZXgtMVwiIGJvcmRlclJhZGl1cz1cIjhweFwiIC8+XG4gICAgICAgIDxTa2VsZXRvbiBoZWlnaHQ9XCIycmVtXCIgd2lkdGg9XCIyLjVyZW1cIiBib3JkZXJSYWRpdXM9XCI4cHhcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZnVuY3Rpb24gRW1wdHlTdGF0ZSh7IG9uQ3JlYXRlQ2xpY2ssIGNhbkNyZWF0ZSB9OiB7IG9uQ3JlYXRlQ2xpY2s6ICgpID0+IHZvaWQ7IGNhbkNyZWF0ZTogYm9vbGVhbiB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGdhcC00IHB5LTggdGV4dC1jZW50ZXJcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlciBib3JkZXItY2lyY2xlIHN1cmZhY2UtMjAwIHRleHQtNXhsXCJcbiAgICAgICAgc3R5bGU9e3sgd2lkdGg6ICc1cmVtJywgaGVpZ2h0OiAnNXJlbScgfX1cbiAgICAgID5cbiAgICAgICAg8J+TplxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2x1bW4gZ2FwLTFcIj5cbiAgICAgICAgPGgzIGNsYXNzTmFtZT1cIm0tMCB0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LTkwMFwiPlNpbiBwcm9kdWN0b3MgYcO6bjwvaDM+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cIm0tMCB0ZXh0LXNtIHRleHQtNjAwIG1heC13LTIwcmVtXCI+XG4gICAgICAgICAge2NhbkNyZWF0ZVxuICAgICAgICAgICAgPyAnQWdyZWdhIHR1IHByaW1lciBwcm9kdWN0byBhbCBjYXTDoWxvZ28geSBlbXBpZXphIGEgZ2VzdGlvbmFybG8gZGVzZGUgYXF1w60uJ1xuICAgICAgICAgICAgOiAnRWwgY2F0w6Fsb2dvIGHDum4gbm8gdGllbmUgcHJvZHVjdG9zIGRpc3BvbmlibGVzLid9XG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAge2NhbkNyZWF0ZSAmJiAoXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBsYWJlbD1cIkNyZWFyIHByaW1lciBwcm9kdWN0b1wiXG4gICAgICAgICAgaWNvbj1cInBpIHBpLXBsdXNcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImJvcmRlci1yb3VuZC0zeGwgZm9udC1ib2xkXCJcbiAgICAgICAgICBvbkNsaWNrPXtvbkNyZWF0ZUNsaWNrfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5mdW5jdGlvbiBQcm9kdWN0Q2FyZCh7IHByb2R1Y3QsIG9uRWRpdCwgb25EZWxldGUsIG9uQWRkVG9DYXJ0LCBxdWFudGl0eUluQ2FydCwgc2hvd0FjdGlvbnMsIGNhbkVkaXQsIGNhbkRlbGV0ZSwgfTogeyBwcm9kdWN0OiBQcm9kdWN0OyBvbkVkaXQ/OiAocDogUHJvZHVjdCkgPT4gdm9pZDsgb25EZWxldGU/OiAocDogUHJvZHVjdCkgPT4gdm9pZDsgb25BZGRUb0NhcnQ/OiAocDogUHJvZHVjdCkgPT4gdm9pZDsgcXVhbnRpdHlJbkNhcnQ/OiBudW1iZXI7IHNob3dBY3Rpb25zPzogYm9vbGVhbjsgY2FuRWRpdD86IGJvb2xlYW47IGNhbkRlbGV0ZT86IGJvb2xlYW4gfSkge1xuICBjb25zdCBbaW1nRXJyb3IsIHNldEltZ0Vycm9yXSA9IHVzZVN0YXRlKGZhbHNlKVxuXG4gIGNvbnN0IGJhZGdlQ2xhc3MgPSBwcm9kdWN0LmlzQXZhaWxhYmxlID8gJ3RleHQteHMgZm9udC1zZW1pYm9sZCBweC0yIHB5LTEgYm9yZGVyLXJvdW5kLWxnIGJnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTcwMCcgOiAndGV4dC14cyBmb250LXNlbWlib2xkIHB4LTIgcHktMSBib3JkZXItcm91bmQtbGcgYmctcmVkLTEwMCB0ZXh0LXJlZC02MDAnXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInN1cmZhY2UtY2FyZCBib3JkZXItMSBzdXJmYWNlLWJvcmRlciBib3JkZXItcm91bmQteGwgcC0zIGZsZXggZmxleC1jb2x1bW4gZ2FwLTNcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLXJvdW5kLWxnIG92ZXJmbG93LWhpZGRlbiBzdXJmYWNlLTEwMCBmbGV4IGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCIgc3R5bGU9e3sgaGVpZ2h0OiAnMTQwcHgnIH19PlxuICAgICAgICB7cHJvZHVjdC5pbWFnZVVybCAmJiAhaW1nRXJyb3IgPyAoXG4gICAgICAgICAgPGltZyBzcmM9e3Byb2R1Y3QuaW1hZ2VVcmx9IGFsdD17cHJvZHVjdC5uYW1lfSBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgb2JqZWN0Rml0OiAnY292ZXInLCBkaXNwbGF5OiAnYmxvY2snIH19IG9uRXJyb3I9eygpID0+IHNldEltZ0Vycm9yKHRydWUpfSAvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtNHhsXCI+8J+bkjwvc3Bhbj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2x1bW4gZ2FwLTFcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtOTAwIHRleHQtc20gbGluZS1jbGFtcC0xXCI+e3Byb2R1Y3QubmFtZX08L3NwYW4+XG4gICAgICAgIHtwcm9kdWN0LmNhdGVnb3J5TmFtZSAmJiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtNTAwXCI+e3Byb2R1Y3QuY2F0ZWdvcnlOYW1lfTwvc3Bhbj59XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZm9udC1ib2xkIHRleHQtYmFzZVwiPnsocHJvZHVjdC5wcmljZSB8fCAwKS50b0xvY2FsZVN0cmluZygnZXMtQ08nLCB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ0NPUCcsIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMCB9KX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YmFkZ2VDbGFzc30+e3Byb2R1Y3QuaXNBdmFpbGFibGUgPyAnRGlzcG9uaWJsZScgOiAnTm8gZGlzcG9uaWJsZSd9PC9zcGFuPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyB0ZXh0LTYwMFwiPlxuICAgICAgICA8c3Bhbj57cHJvZHVjdC5zdG9jayA+IDAgPyBwcm9kdWN0LnN0b2NrICsgJyBlbiBzdG9jaycgOiAnQWdvdGFkbyd9PC9zcGFuPlxuICAgICAgICB7cXVhbnRpdHlJbkNhcnQgPyA8c3Bhbj57cXVhbnRpdHlJbkNhcnR9IGVuIHBlZGlkbzwvc3Bhbj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICB7c2hvd0FjdGlvbnMgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICAgICAge2NhbkVkaXQgJiYgKFxuICAgICAgICAgICAgICA8QnV0dG9uIGxhYmVsPVwiRWRpdGFyXCIgaWNvbj1cInBpIHBpLXBlbmNpbFwiIHNldmVyaXR5PVwic2Vjb25kYXJ5XCIgb3V0bGluZWQgc2l6ZT1cInNtYWxsXCIgY2xhc3NOYW1lPVwiZmxleC0xIGJvcmRlci1yb3VuZC1sZyBmb250LXNlbWlib2xkXCIgb25DbGljaz17KCkgPT4gb25FZGl0ICYmIG9uRWRpdChwcm9kdWN0KX0gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7Y2FuRGVsZXRlICYmIChcbiAgICAgICAgICAgICAgPEJ1dHRvbiBpY29uPVwicGkgcGktdHJhc2hcIiBzZXZlcml0eT1cImRhbmdlclwiIG91dGxpbmVkIHNpemU9XCJzbWFsbFwiIGNsYXNzTmFtZT1cImJvcmRlci1yb3VuZC1sZ1wiIG9uQ2xpY2s9eygpID0+IG9uRGVsZXRlICYmIG9uRGVsZXRlKHByb2R1Y3QpfSB0b29sdGlwPVwiRWxpbWluYXJcIiB0b29sdGlwT3B0aW9ucz17eyBwb3NpdGlvbjogJ3RvcCcgfX0gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgeyFzaG93QWN0aW9ucyAmJiBvbkFkZFRvQ2FydCAmJiAoXG4gICAgICAgICAgPEJ1dHRvbiBsYWJlbD17cXVhbnRpdHlJbkNhcnQgPyAoJ0HDsWFkaXIgZGUgbnVldm8gKCcgKyBxdWFudGl0eUluQ2FydCArICcpJykgOiAnQWdyZWdhciBhbCBwZWRpZG8nfSBpY29uPVwicGkgcGktc2hvcHBpbmctY2FydFwiIHNldmVyaXR5PVwic3VjY2Vzc1wiIGNsYXNzTmFtZT1cInctZnVsbCBib3JkZXItcm91bmQtbGdcIiBkaXNhYmxlZD17IXByb2R1Y3QuaXNBdmFpbGFibGUgfHwgcHJvZHVjdC5zdG9jayA9PT0gMCB8fCAocXVhbnRpdHlJbkNhcnQgfHwgMCkgPj0gcHJvZHVjdC5zdG9ja30gb25DbGljaz17KCkgPT4gb25BZGRUb0NhcnQocHJvZHVjdCl9IC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJvZHVjdHNQYWdlKCkge1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKClcbiAgY29uc3QgdG9hc3QgPSB1c2VSZWY8VG9hc3Q+KG51bGwpXG5cbiAgY29uc3QgW2N1cnJlbnRVc2VyLCBzZXRDdXJyZW50VXNlcl0gPSB1c2VTdGF0ZTxDdXJyZW50VXNlciB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtwcm9kdWN0cywgc2V0UHJvZHVjdHNdID0gdXNlU3RhdGU8UHJvZHVjdFtdPihbXSlcbiAgY29uc3QgW2NhdGVnb3JpZXMsIHNldENhdGVnb3JpZXNdID0gdXNlU3RhdGU8Q2F0ZWdvcnlbXT4oW10pXG4gIGNvbnN0IFtjYXJ0SXRlbXMsIHNldENhcnRJdGVtc10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBudW1iZXI+Pih7fSlcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpXG5cbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY2F0ZWdvcnlGaWx0ZXIsIHNldENhdGVnb3J5RmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxuXG4gIGNvbnN0IHVzZXJSb2xlID0gY3VycmVudFVzZXI/LnJvbGUgPz8gJ3VzZXInXG4gIGNvbnN0IGNhcnRDb3VudCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gT2JqZWN0LnZhbHVlcyhjYXJ0SXRlbXMpLnJlZHVjZSgoc3VtLCB2YWx1ZSkgPT4gc3VtICsgdmFsdWUsIDApLFxuICAgIFtjYXJ0SXRlbXNdXG4gIClcbiAgY29uc3QgY2FuQ3JlYXRlID0gY2FuQ3JlYXRlUHJvZHVjdCh1c2VyUm9sZSlcbiAgY29uc3QgY2FuRWRpdCA9IGNhbkVkaXRQcm9kdWN0KHVzZXJSb2xlKVxuICBjb25zdCBjYW5EZWxldGUgPSBjYW5EZWxldGVQcm9kdWN0KHVzZXJSb2xlKVxuICBjb25zdCBzaG93QWN0aW9ucyA9IGNhbkVkaXQgfHwgY2FuRGVsZXRlXG5cbiAgY29uc3QgY2F0ZWdvcnlPcHRpb25zID0gdXNlTWVtbyhcbiAgICAoKSA9PiBbXG4gICAgICB7IGxhYmVsOiAnVG9kYXMgbGFzIGNhdGVnb3LDrWFzJywgdmFsdWU6ICcnIH0sXG4gICAgICAuLi5jYXRlZ29yaWVzLm1hcCgoYykgPT4gKHsgbGFiZWw6IGMubmFtZSwgdmFsdWU6IGMuaWQgfSkpLFxuICAgIF0sXG4gICAgW2NhdGVnb3JpZXNdXG4gIClcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBtb3VudGVkID0gdHJ1ZVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gbG9hZCgpIHtcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXNlclJlcyA9IGF3YWl0IHVzZXJTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgaWYgKG1vdW50ZWQgJiYgdXNlclJlcy5zdWNjZXNzICYmIHVzZXJSZXMudXNlcikge1xuICAgICAgICAgIHNldEN1cnJlbnRVc2VyKHVzZXJSZXMudXNlcilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGNvbnN0IGNhY2hlZENhcnQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BlZHJlZ2FsX2NhcnQnKVxuICAgICAgICAgIGlmIChjYWNoZWRDYXJ0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBzZXRDYXJ0SXRlbXMoSlNPTi5wYXJzZShjYWNoZWRDYXJ0KSlcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICBzZXRDYXJ0SXRlbXMoe30pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgW3Byb2R1Y3RzUmVzLCBjYXRlZ29yaWVzUmVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICBwcm9kdWN0U2VydmljZS5nZXRBbGwoKSxcbiAgICAgICAgICBjYXRlZ29yeVNlcnZpY2UuZ2V0QWxsKCksXG4gICAgICAgIF0pXG5cbiAgICAgICAgaWYgKG1vdW50ZWQpIHtcbiAgICAgICAgICBpZiAoY2F0ZWdvcmllc1Jlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICBzZXRDYXRlZ29yaWVzKGNhdGVnb3JpZXNSZXMuY2F0ZWdvcmllcylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocHJvZHVjdHNSZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgc2V0UHJvZHVjdHMocHJvZHVjdHNSZXMucHJvZHVjdHMgfHwgW10pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvYXN0LmN1cnJlbnQ/LnNob3coeyBzZXZlcml0eTogJ2Vycm9yJywgc3VtbWFyeTogJ0Vycm9yJywgZGV0YWlsOiBwcm9kdWN0c1Jlcy5tZXNzYWdlLCBsaWZlOiA0MDAwIH0pXG4gICAgICAgICAgICBzZXRQcm9kdWN0cyhbXSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBpZiAobW91bnRlZCkge1xuICAgICAgICAgIHRvYXN0LmN1cnJlbnQ/LnNob3coeyBzZXZlcml0eTogJ2Vycm9yJywgc3VtbWFyeTogJ0Vycm9yJywgZGV0YWlsOiAnTm8gc2UgcHVkaWVyb24gY2FyZ2FyIGxvcyBwcm9kdWN0b3MuJywgbGlmZTogNDAwMCB9KVxuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAobW91bnRlZCkgc2V0SXNMb2FkaW5nKGZhbHNlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHZvaWQgbG9hZCgpXG4gICAgcmV0dXJuICgpID0+IHsgbW91bnRlZCA9IGZhbHNlIH1cbiAgfSwgW10pXG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gcHJvZHVjdHMuZmlsdGVyKChwKSA9PiB7XG4gICAgICBjb25zdCBtYXRjaFNlYXJjaCA9XG4gICAgICAgICFzZWFyY2gudHJpbSgpIHx8XG4gICAgICAgIHAubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKVxuICAgICAgY29uc3QgbWF0Y2hDYXRlZ29yeSA9ICFjYXRlZ29yeUZpbHRlciB8fCBwLmNhdGVnb3J5ID09PSBjYXRlZ29yeUZpbHRlclxuICAgICAgcmV0dXJuIG1hdGNoU2VhcmNoICYmIG1hdGNoQ2F0ZWdvcnlcbiAgICB9KVxuICB9LCBbcHJvZHVjdHMsIHNlYXJjaCwgY2F0ZWdvcnlGaWx0ZXJdKVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUVkaXQocHJvZHVjdDogUHJvZHVjdCkge1xuICAgIG5hdmlnYXRlKGAvcHJvZHVjdHMvJHtwcm9kdWN0LmlkfS9lZGl0YClcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUFkZFRvQ2FydChwcm9kdWN0OiBQcm9kdWN0KSB7XG4gICAgY29uc3QgY3VycmVudFF0eSA9IGNhcnRJdGVtc1twcm9kdWN0LmlkXSA/PyAwXG4gICAgaWYgKCFwcm9kdWN0LmlzQXZhaWxhYmxlIHx8IHByb2R1Y3Quc3RvY2sgPT09IDAgfHwgY3VycmVudFF0eSA+PSBwcm9kdWN0LnN0b2NrKSB7XG4gICAgICB0b2FzdC5jdXJyZW50Py5zaG93KHtcbiAgICAgICAgc2V2ZXJpdHk6ICd3YXJuJyxcbiAgICAgICAgc3VtbWFyeTogJ05vIGRpc3BvbmlibGUnLFxuICAgICAgICBkZXRhaWw6ICdObyBzZSBwdWVkZSBhZ3JlZ2FyIG3DoXMgZGUgZXN0ZSBwcm9kdWN0byBhbCBwZWRpZG8uJyxcbiAgICAgICAgbGlmZTogMzAwMCxcbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBuZXh0Q2FydCA9IHtcbiAgICAgIC4uLmNhcnRJdGVtcyxcbiAgICAgIFtwcm9kdWN0LmlkXTogY3VycmVudFF0eSArIDEsXG4gICAgfVxuICAgIHNldENhcnRJdGVtcyhuZXh0Q2FydClcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BlZHJlZ2FsX2NhcnQnLCBKU09OLnN0cmluZ2lmeShuZXh0Q2FydCkpXG4gICAgdG9hc3QuY3VycmVudD8uc2hvdyh7XG4gICAgICBzZXZlcml0eTogJ3N1Y2Nlc3MnLFxuICAgICAgc3VtbWFyeTogJ0FncmVnYWRvJyxcbiAgICAgIGRldGFpbDogYCR7cHJvZHVjdC5uYW1lfSBzZSBhZ3JlZ8OzIGFsIHBlZGlkby5gLFxuICAgICAgbGlmZTogMzAwMCxcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRGVsZXRlKHByb2R1Y3Q6IFByb2R1Y3QpIHtcbiAgICBjb25maXJtRGlhbG9nKHtcbiAgICAgIG1lc3NhZ2U6IGDCv0VsaW1pbmFyIFwiJHtwcm9kdWN0Lm5hbWV9XCI/IEVzdGEgYWNjacOzbiBubyBzZSBwdWVkZSBkZXNoYWNlci5gLFxuICAgICAgaGVhZGVyOiAnQ29uZmlybWFyIGVsaW1pbmFjacOzbicsXG4gICAgICBpY29uOiAncGkgcGktZXhjbGFtYXRpb24tdHJpYW5nbGUnLFxuICAgICAgYWNjZXB0Q2xhc3NOYW1lOiAncC1idXR0b24tZGFuZ2VyJyxcbiAgICAgIGFjY2VwdExhYmVsOiAnRWxpbWluYXInLFxuICAgICAgcmVqZWN0TGFiZWw6ICdDYW5jZWxhcicsXG4gICAgICBhY2NlcHQ6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UucmVtb3ZlKHByb2R1Y3QuaWQpXG4gICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgIHNldFByb2R1Y3RzKChwcmV2KSA9PiBwcmV2LmZpbHRlcigocCkgPT4gcC5pZCAhPT0gcHJvZHVjdC5pZCkpXG4gICAgICAgICAgdG9hc3QuY3VycmVudD8uc2hvdyh7IHNldmVyaXR5OiAnc3VjY2VzcycsIHN1bW1hcnk6ICdFbGltaW5hZG8nLCBkZXRhaWw6IHJlc3VsdC5tZXNzYWdlLCBsaWZlOiAzMDAwIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9hc3QuY3VycmVudD8uc2hvdyh7IHNldmVyaXR5OiAnZXJyb3InLCBzdW1tYXJ5OiAnRXJyb3InLCBkZXRhaWw6IHJlc3VsdC5tZXNzYWdlLCBsaWZlOiA0MDAwIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJkYXNoYm9hcmQtc2hlbGxcIj5cbiAgICAgIDxhc2lkZSBjbGFzc05hbWU9XCJkYXNoYm9hcmQtc2lkZWJhclwiPlxuICAgICAgICA8RGFzaGJvYXJkU2lkZWJhckhlYWRlciAvPlxuICAgICAgICA8RGFzaGJvYXJkU2lkZWJhckZvb3RlclxuICAgICAgICAgIGN1cnJlbnRVc2VyPXtjdXJyZW50VXNlcn1cbiAgICAgICAgICBvbkdvVG9FZGl0UHJvZmlsZT17KCkgPT4gbmF2aWdhdGUoJy9lZGl0LXByb2ZpbGUnKX1cbiAgICAgICAgLz5cbiAgICAgIDwvYXNpZGU+XG5cbiAgICAgIDxtYWluIGNsYXNzTmFtZT1cImVkaXQtcHJvZmlsZS1tYWluXCI+XG4gICAgICAgIDxUb2FzdCByZWY9e3RvYXN0fSAvPlxuICAgICAgICA8Q29uZmlybURpYWxvZyAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWRpdC1wcm9maWxlLWxheW91dFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBhbGlnbi1pdGVtcy1zdGFydCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBmbGV4LXdyYXAgZ2FwLTMgbWItNFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LTkwMCBtLTBcIj5Qcm9kdWN0b3M8L2gxPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtNjAwIG0tMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAge2lzTG9hZGluZyA/ICdDYXJnYW5kbyBjYXTDoWxvZ2/igKYnIDogYCR7cHJvZHVjdHMubGVuZ3RofSBwcm9kdWN0byR7cHJvZHVjdHMubGVuZ3RoICE9PSAxID8gJ3MnIDogJyd9IGVuIHRvdGFsYH1cbiAgICAgICAgICAgICAgICB7IWlzTG9hZGluZyAmJiB1c2VyUm9sZSA9PT0gJ3VzZXInICYmIGNhcnRDb3VudCA+IDAgJiYgYCDCtyAke2NhcnRDb3VudH0gZW4gdHUgcGVkaWRvYH1cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHtjYW5DcmVhdGUgJiYgKFxuICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJOdWV2byBwcm9kdWN0b1wiXG4gICAgICAgICAgICAgICAgaWNvbj1cInBpIHBpLXBsdXNcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJvcmRlci1yb3VuZC0zeGwgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZSgnL3Byb2R1Y3RzL2NyZWF0ZScpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHshaXNMb2FkaW5nICYmIHByb2R1Y3RzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0zIGZsZXgtd3JhcCBtYi00XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInAtaW5wdXQtaWNvbi1sZWZ0IGZsZXgtMVwiIHN0eWxlPXt7IG1pbldpZHRoOiAnMTgwcHgnIH19PlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cInBpIHBpLXNlYXJjaFwiIC8+XG4gICAgICAgICAgICAgICAgPElucHV0VGV4dFxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJCdXNjYXIgcG9yIG5vbWJyZeKAplwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2goZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJvcmRlci1yb3VuZC14bFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8RHJvcGRvd25cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtjYXRlZ29yeU9wdGlvbnN9XG4gICAgICAgICAgICAgICAgdmFsdWU9e2NhdGVnb3J5RmlsdGVyfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q2F0ZWdvcnlGaWx0ZXIoZS52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDYXRlZ29yw61hXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJib3JkZXItcm91bmQteGxcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1pbldpZHRoOiAnMTgwcHgnIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2lzTG9hZGluZyA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxuICAgICAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogOCB9KS5tYXAoKF8sIGkpID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwiY29sLTEyIHNtOmNvbC02IG1kOmNvbC00IGxnOmNvbC0zXCI+XG4gICAgICAgICAgICAgICAgICA8UHJvZHVjdENhcmRTa2VsZXRvbiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgJiYgcHJvZHVjdHMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgPEVtcHR5U3RhdGUgb25DcmVhdGVDbGljaz17KCkgPT4gbmF2aWdhdGUoJy9wcm9kdWN0cy9jcmVhdGUnKX0gY2FuQ3JlYXRlPXtjYW5DcmVhdGV9IC8+XG4gICAgICAgICAgKSA6IGZpbHRlcmVkLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbHVtbiBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlciBnYXAtMyBweS04IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtNHhsXCI+8J+UjTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LTYwMCBtLTBcIj5TaW4gcmVzdWx0YWRvcyBwYXJhIDxzdHJvbmc+XCJ7c2VhcmNoIHx8IGNhdGVnb3J5RmlsdGVyfVwiPC9zdHJvbmc+PC9wPlxuICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJMaW1waWFyIGZpbHRyb3NcIlxuICAgICAgICAgICAgICAgIHNldmVyaXR5PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJvcmRlci1yb3VuZC0zeGxcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0U2VhcmNoKCcnKTsgc2V0Q2F0ZWdvcnlGaWx0ZXIoJycpIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XG4gICAgICAgICAgICAgIHtmaWx0ZXJlZC5tYXAoKHByb2R1Y3QpID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17cHJvZHVjdC5pZH0gY2xhc3NOYW1lPVwiY29sLTEyIHNtOmNvbC02IG1kOmNvbC00IGxnOmNvbC0zXCI+XG4gICAgICAgICAgICAgICAgICA8UHJvZHVjdENhcmRcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdD17cHJvZHVjdH1cbiAgICAgICAgICAgICAgICAgICAgb25FZGl0PXtoYW5kbGVFZGl0fVxuICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZT17aGFuZGxlRGVsZXRlfVxuICAgICAgICAgICAgICAgICAgICBvbkFkZFRvQ2FydD17IXNob3dBY3Rpb25zID8gaGFuZGxlQWRkVG9DYXJ0IDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICBxdWFudGl0eUluQ2FydD17Y2FydEl0ZW1zW3Byb2R1Y3QuaWRdID8/IDB9XG4gICAgICAgICAgICAgICAgICAgIHNob3dBY3Rpb25zPXtzaG93QWN0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgY2FuRWRpdD17Y2FuRWRpdH1cbiAgICAgICAgICAgICAgICAgICAgY2FuRGVsZXRlPXtjYW5EZWxldGV9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9tYWluPlxuICAgIDwvZGl2PlxuICApXG59XG4iXX0=