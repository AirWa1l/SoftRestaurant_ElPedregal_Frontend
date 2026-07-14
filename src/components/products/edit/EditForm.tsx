import { useEffect, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Skeleton } from 'primereact/skeleton'
import { classNames } from 'primereact/utils'
import type { Product, ProductFormErrors } from '../../../types/product'
import type { Category } from '../../../types/category'
import { productService } from '../../../services/productService'
import { categoryService } from '../../../services/categoryService'

function validate(form: Product): ProductFormErrors {
  const errors: ProductFormErrors = {}

  if (!form.name.trim()) {
    errors.name = 'El nombre del producto es obligatorio'
  } else if (form.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres'
  }

  if (!form.category) {
    errors.category = 'Selecciona una categoría'
  }

  if (!form.description?.trim()) {
    errors.description = 'La descripción es obligatoria'
  } else if (form.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres'
  }

  return errors
}

interface Props {
  productId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function ProductEditForm({ productId, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [errors, setErrors] = useState<ProductFormErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreviewError, setImagePreviewError] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      setIsLoading(true)
      const [productRes, categoriesRes] = await Promise.all([
        productService.getById(productId),
        categoryService.getAll(),
      ])

      if (!mounted) return

      if (categoriesRes.success) {
        setCategories(categoriesRes.categories)
      }

      if (productRes.success && productRes.product) {
        setForm(productRes.product)
      } else {
        setApiError(productRes.message ?? 'No se pudo cargar el producto.')
      }

      setIsLoading(false)
    }

    void load()
    return () => { mounted = false }
  }, [productId])

  function handleChange<K extends keyof Product>(field: K, value: Product[K]) {
    if (!form) return
    setForm({ ...form, [field]: value })
    setApiError(null)
    if (errors[field as keyof ProductFormErrors]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field as keyof ProductFormErrors]
        return next
      })
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !form) return

    setImageFile(file)
    setForm({ ...form, imageUrl: URL.createObjectURL(file) })
    setImagePreviewError(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form) return

    setApiError(null)
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)

    try {
      let result

        if (imageFile) {
        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('category', form.category)
        formData.append('description', form.description ?? '')
        formData.append('image', imageFile)
        result = await productService.update(productId, formData)
      } else {
        const payload: Record<string, unknown> = {
          name: form.name,
          category: form.category,
          description: form.description,
        }
        result = await productService.update(productId, payload)
      }

      if (!result.success) {
        setApiError(result.message ?? 'No fue posible actualizar el producto.')
        return
      }

      onSuccess?.()
    } catch {
      setApiError('Ocurrió un error inesperado al guardar los cambios.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-column gap-3">
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
        <Skeleton height="6rem" />
        <Skeleton height="2rem" width="50%" />
      </div>
    )
  }

  if (!form) {
    return (
      <Message
        severity="error"
        text={apiError ?? 'Producto no encontrado.'}
        className="w-full justify-content-start border-round-xl"
      />
    )
  }

  const categoryOptions = categories.map((c) => ({ label: c.name, value: c.id }))
  const showImagePreview = form.imageUrl && !imagePreviewError

  return (
    <div className="w-full mx-auto p-4">
      <p className="text-center text-sm m-0 mb-5 text-600 font-medium">
        Modifica la información del producto. El precio no se puede cambiar para preservar pedidos existentes.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-column gap-2 mb-3">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="edit-product-name">
            Nombre del producto <span className="text-red-500">*</span>
          </label>
          <InputText
            id="edit-product-name"
            className={classNames({ 'p-invalid': errors.name })}
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <small className="p-error block mt-1" role="alert">{errors.name}</small>}
        </div>

        <div className="flex flex-column gap-2 mb-3">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="edit-product-category">
            Categoría <span className="text-red-500">*</span>
          </label>
          <Dropdown
            inputId="edit-product-category"
            className={classNames('w-full', { 'p-invalid': errors.category })}
            options={categoryOptions}
            placeholder="Selecciona una categoría"
            value={form.category}
            onChange={(e) => handleChange('category', e.value)}
          />
          {errors.category && <small className="p-error block mt-1" role="alert">{errors.category}</small>}
        </div>

        <div className="grid grid-nogutter gap-3 mb-3">
          <div className="col-12 md:col-6 flex flex-column gap-2">
            <label className="text-xs font-bold text-primary uppercase">
              Precio (COP)
            </label>
            <InputText
              value={
                form.price != null
                  ? form.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
                  : ''
              }
              disabled
              className="surface-100"
            />
            <small className="text-500 text-xs">El precio es inmutable tras la creación del producto.</small>
          </div>

        </div>

        <div className="flex flex-column gap-2 mb-3">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="edit-product-description">
            Descripción <span className="text-red-500">*</span>
          </label>
          <InputTextarea
            id="edit-product-description"
            className={classNames('w-full', { 'p-invalid': errors.description })}
            value={form.description ?? ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            autoResize
          />
          {errors.description && <small className="p-error block mt-1" role="alert">{errors.description}</small>}
        </div>



        <div className="flex flex-column gap-2 mb-3">
          <label className="text-xs font-bold text-primary uppercase">
            Imagen del producto{' '}
            <span className="text-xs font-normal text-500 normal-case">(opcional)</span>
          </label>

          <div className="flex gap-2">
            <Button
              type="button"
              icon="pi pi-upload"
              label="Cambiar imagen"
              severity="secondary"
              outlined
              onClick={() => fileInputRef.current?.click()}
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {showImagePreview && (
            <div
              className="mt-2 border-round-xl overflow-hidden border-1 surface-border"
              style={{ maxHeight: '200px', background: 'var(--surface-ground)' }}
            >
              <img
                src={form.imageUrl}
                alt="Preview del producto"
                className="w-full h-full"
                style={{ objectFit: 'contain', maxHeight: '200px', display: 'block' }}
                onError={() => setImagePreviewError(true)}
              />
            </div>
          )}
        </div>

        {apiError && (
          <div className="mb-4">
            <Message severity="error" text={apiError} className="w-full justify-content-start border-round-xl p-2" />
          </div>
        )}

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
            label={isSubmitting ? 'Guardando…' : 'Guardar cambios'}
            loading={isSubmitting}
          />
        </div>
      </form>
    </div>
  )
}
