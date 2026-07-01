import { useState, useRef, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { classNames } from 'primereact/utils'
import type { Product, ProductFormErrors } from '../../../types/product'
import type { Category } from '../../../types/category'
import { productService } from '../../../services/productService'
import { categoryService } from '../../../services/categoryService'

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_FORM: Product = {
  id: '0',
  name: '',
  category: '',
  price: null,
  description: '',
  imageUrl: '',
  isAvailable: true,
  stock: 0,
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(
  form: Product,
  imageFile: File | null
): ProductFormErrors {
  const errors: ProductFormErrors = {}

  if (!form.name.trim()) {
    errors.name = 'El nombre del producto es obligatorio'
  } else if (form.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres'
  }

  if (!form.category) {
    errors.category = 'Selecciona una categoría'
  }

  if (form.price === null || form.price === undefined) {
    errors.price = 'El precio es obligatorio'
  } else if (form.price <= 0) {
    errors.price = 'El precio debe ser mayor a 0'
  }

  if (form.stock == null || form.stock < 0) {
    errors.stock = 'El stock no puede ser negativo'
  }

  if (!form.description.trim()) {
    errors.description = 'La descripción es obligatoria'
  } else if (form.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres'
  }

  if (
    form.imageUrl &&
    !imageFile &&
    !/^https?:\/\/.+\..+/.test(form.imageUrl.trim())
  ) {
    errors.imageUrl = 'Ingresa una URL válida (https://...)'
  }

  return errors
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  onSuccess?: (data: Product) => void
  onCancel?: () => void
}

export function ProductForm({ onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<Product>(INITIAL_FORM)
  const [categories, setCategories] = useState<Category[]>([])
  const [errors, setErrors] = useState<ProductFormErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreviewError, setImagePreviewError] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    categoryService.getAll().then((res) => {
      if (res.success) setCategories(res.categories)
    })
  }, [])

  const categoryOptions = categories.map((c) => ({ label: c.name, value: c.id }))

  // ── Helpers ──────────────────────────────────────────────────────────────

  function handleChange<K extends keyof Product>(
    field: K,
    value: Product[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }))

    setApiError(null)

    if (field === 'imageUrl') {
      setImagePreviewError(false)

      // Si el usuario escribe una URL,
      // dejamos de usar el archivo seleccionado
      setImageFile(null)
    }

    if (errors[field as keyof ProductFormErrors]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field as keyof ProductFormErrors]
        return next
      })
    }
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0]

    if (!file) return

    setImageFile(file)

    const objectUrl = URL.createObjectURL(file)

    setForm((prev) => ({
      ...prev,
      imageUrl: objectUrl
    }))

    setImagePreviewError(false)

    if (errors.imageUrl) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next.imageUrl
        return next
      })
    }
  }

  // ── Submit ───────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError(null)

    const validationErrors = validate(form, imageFile)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)

    try {
      let result

      if (imageFile) {
        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('category', form.category)
        formData.append('description', form.description)
        formData.append('price', String(form.price))
        formData.append('stock', String(form.stock))
        formData.append('image', imageFile)
        result = await productService.create(formData)
      } else {
        result = await productService.create({
          name: form.name,
          category: form.category,
          price: form.price,
          description: form.description,
          stock: form.stock,
        })
      }

      if (!result.success) {
        setApiError(result.message ?? 'Ocurrió un error al crear el producto.')
        return
      }

      setSubmitted(true)
      onSuccess?.(form)
    } catch {
      setApiError('Ocurrió un error inesperado al guardar el producto.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Success screen ───────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="w-full max-w-30rem mx-auto p-5 border-round-2xl shadow-4 surface-card border-1 surface-border">
        <div className="flex flex-column align-items-center gap-3 py-4 text-center">
          <div className="flex align-items-center justify-content-center w-4rem h-4rem border-circle bg-green-100 text-green-600 text-3xl font-bold">
            ✓
          </div>
          <h3 className="m-0 text-xl font-bold text-900">¡Producto guardado!</h3>
          <p className="m-0 text-sm text-600 font-medium max-w-25rem">
            <strong>{form.name}</strong> fue creado correctamente en el catálogo.
          </p>
          <Button
            label="Crear otro producto"
            className="mt-2 border-round-3xl font-bold"
            onClick={() => { setForm(INITIAL_FORM); setSubmitted(false) }}
          />
        </div>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────────

  const showImagePreview =
    form.imageUrl.trim() !== '' && !imagePreviewError

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-center font-bold text-3xl text-900 m-0 mb-2">Nuevo producto</h2>
      <p className="text-center text-sm m-0 mb-5 text-600 font-medium">
        Completa la información para agregar el producto al catálogo.
      </p>

      <form onSubmit={handleSubmit} noValidate id="product-form">

        {/* ── Name & SKU ─────────────────────────────────────────────────── */}
        <div className="grid">
          <div className="col-12 md:col-12 flex flex-column gap-2 mb-3">
            <label className="text-xs font-bold text-primary uppercase" htmlFor="product-name">
              Nombre del producto <span className="text-red-500">*</span>
            </label>
            <InputText
              id="product-name"
              className={classNames({ 'p-invalid': errors.name })}
              placeholder="Ej. Leche entera 1L"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            {errors.name && (
              <small className="p-error block mt-1" role="alert">{errors.name}</small>
            )}
          </div>
        </div>

        {/* ── Category ───────────────────────────────────────────────────── */}
        <div className="flex flex-column gap-2 mb-3">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="product-category">
            Categoría <span className="text-red-500">*</span>
          </label>
          <Dropdown
            inputId="product-category"
            className={classNames('w-full', { 'p-invalid': errors.category })}
            options={categoryOptions}
            placeholder="Selecciona una categoría"
            value={form.category}
            onChange={(e) => handleChange('category', e.value)}
          />
          {errors.category && (
            <small className="p-error block mt-1" role="alert">{errors.category}</small>
          )}
        </div>

        {/* ── Price ──────────────────────────────────────────────── */}
        <div className="grid grid-nogutter gap-3 mb-3">
          <div className="col-12 md:col-6 flex flex-column gap-2">
            <label className="text-xs font-bold text-primary uppercase" htmlFor="product-price">
              Precio (COP) <span className="text-red-500">*</span>
            </label>
            <InputNumber
              inputId="product-price"
              inputClassName={classNames('w-full', { 'p-invalid': errors.price })}
              placeholder="0"
              value={form.price}
              onValueChange={(e) => handleChange('price', e.value ?? null)}
              mode="currency"
              currency="COP"
              locale="es-CO"
              min={0}
            />
            {errors.price && (
              <small className="p-error block mt-1" role="alert">{errors.price}</small>
            )}
          </div>
          <div className="col-12 md:col-6 flex flex-column gap-2">
            <label className="text-xs font-bold text-primary uppercase" htmlFor="product-stock">
              Stock <span className="text-red-500">*</span>
            </label>
            <InputNumber
              inputId="product-stock"
              inputClassName={classNames('w-full', { 'p-invalid': errors.stock })}
              placeholder="0"
              value={form.stock}
              onValueChange={(e) => handleChange('stock', e.value ?? 0)}
              mode="decimal"
              locale="es-CO"
              min={0}
            />
            {errors.stock && (
              <small className="p-error block mt-1" role="alert">{errors.stock}</small>
            )}
          </div>
        </div>

        {/* ── Description ────────────────────────────────────────────────── */}
        <div className="flex flex-column gap-2 mb-3">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="product-description">
            Descripción <span className="text-red-500">*</span>
          </label>
          <InputTextarea
            id="product-description"
            className={classNames('w-full', { 'p-invalid': errors.description })}
            placeholder="Describe el producto brevemente…"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            autoResize
          />
          <div className="flex justify-content-between align-items-center mt-1">
            {errors.description
              ? <small className="p-error" role="alert">{errors.description}</small>
              : <span />}
            <small className={classNames('text-xs', {
              'text-600': form.description.length < 10,
              'text-green-500': form.description.length >= 10,
            })}>
              {form.description.length} caracteres
            </small>
          </div>
        </div>

        {/* ── Image (optional) ───────────────────────────────────────────── */}
        <div className="flex flex-column gap-2 mb-3">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="product-imageUrl">
            Imagen del producto{' '}
            <span className="text-xs font-normal text-500 normal-case">(opcional)</span>
          </label>

          <div className="flex gap-2">
            <InputText
              id="product-imageUrl"
              className={classNames('flex-1', { 'p-invalid': errors.imageUrl })}
              placeholder="https://ejemplo.com/imagen.jpg"
              value={form.imageUrl}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
            />
            <Button
              type="button"
              icon="pi pi-upload"
              severity="secondary"
              outlined
              tooltip="Subir desde mi dispositivo"
              tooltipOptions={{ position: 'top' }}
              onClick={() => fileInputRef.current?.click()}
            />
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {errors.imageUrl && (
            <small className="p-error block" role="alert">{errors.imageUrl}</small>
          )}

          {/* Image preview */}
          {showImagePreview && (
            <div className="mt-2 border-round-xl overflow-hidden border-1 surface-border"
                 style={{ maxHeight: '200px', background: 'var(--surface-ground)' }}>
              <img
                src={form.imageUrl}
                alt="Preview del producto"
                className="w-full h-full"
                style={{ objectFit: 'contain', maxHeight: '200px', display: 'block' }}
                onError={() => setImagePreviewError(true)}
              />
            </div>
          )}

          {form.imageUrl && imagePreviewError && (
            <small className="text-orange-500 text-xs block mt-1">
              No se pudo cargar la imagen. Verifica la URL.
            </small>
          )}
        </div>

        {/* ── Required note ──────────────────────────────────────────────── */}
        <p className="text-xs text-500 m-0 mb-3">
          <span className="text-red-500">*</span> Campos obligatorios
        </p>

        {/* ── API error ──────────────────────────────────────────────────── */}
        {apiError && (
          <div className="mb-4">
            <Message
              severity="error"
              text={apiError}
              className="w-full justify-content-start border-round-xl p-2"
            />
          </div>
        )}

        {/* ── Actions ────────────────────────────────────────────────────── */}
        <div className="flex gap-3 mt-2">
          {onCancel && (
            <Button
              type="button"
              label="Cancelar"
              severity="secondary"
              outlined
              className="flex-1 border-round-3xl font-bold"
              onClick={onCancel}
              disabled={isSubmitting}
            />
          )}
          <Button
            type="submit"
            className="flex-1 border-round-3xl font-bold"
            label={isSubmitting ? 'Guardando…' : 'Guardar producto'}
            loading={isSubmitting}
          />
        </div>
      </form>
    </div>
  )
}