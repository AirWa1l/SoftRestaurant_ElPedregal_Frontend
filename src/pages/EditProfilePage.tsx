import { useEffect, useMemo, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { userService } from '../services/userService'
import type { CurrentUser, ProfileFormData, ProfileFormErrors } from '../types/profile'
import { useNavigate } from 'react-router-dom'
import { DashboardSidebarHeader } from '../components/layout/DashboardSidebarHeader'
import { DashboardSidebarFooter } from '../components/layout/DashboardSidebarFooter'
import { CustomerNavbar } from '../components/layout/CustomerNavbar'
import { DeleteAccountDialog } from '../components/profile/DeleteAccountDialog'
import { ChangePasswordDialog } from '../components/profile/ChangePasswordDialog'
import { orderService } from '../services/orderService'
import type { Order } from '../types/order'

const INITIAL_FORM: ProfileFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

function validate(form: ProfileFormData): ProfileFormErrors {
  const errors: ProfileFormErrors = {}

  if (!form.firstName.trim()) errors.firstName = 'El nombre es obligatorio'
  if (!form.lastName.trim()) errors.lastName = 'El apellido es obligatorio'

  if (!form.email.trim()) {
    errors.email = 'El correo es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Ingresa un correo válido'
  }

  if (!form.phone.trim()) errors.phone = 'El teléfono es obligatorio'

  return errors
}

export function EditProfilePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<ProfileFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<ProfileFormErrors>({})
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [orders, setOrders] = useState<Order[]>([])

  const toast = useRef<any>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteAccountError, setDeleteAccountError] = useState<string | null>(null)
  const [isChangePasswordDialogVisible, setIsChangePasswordDialogVisible] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      setIsLoading(true)
      setApiError(null)

      try {
        const userRes = await userService.getCurrentUser()

        if (!isMounted) return

        if (!userRes.success || !userRes.user) {
          navigate('/login', { replace: true })
          return
        }

        setCurrentUser(userRes.user)

        const [profileRes, ordersRes] = await Promise.all([
          userService.getProfile(),
          orderService.getAll(),
        ])

        if (!isMounted) return

        if (profileRes.success && profileRes.profile) {
          setForm(profileRes.profile)
        } else {
          setApiError(profileRes.message || 'No fue posible cargar el perfil.')
        }

        if (ordersRes.success) {
          setOrders(ordersRes.orders)
        }
      } catch {
        if (isMounted) {
          setApiError('Ocurrió un error al cargar los datos del perfil.')
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void loadData()

    return () => {
      isMounted = false
    }
  }, [navigate])

  function handleChange(field: keyof ProfileFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSuccessMessage(null)
    setApiError(null)

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function handleOpenDeleteDialog() {
    setDeleteAccountError(null)
    setIsDeleteDialogVisible(true)
  }

  function handleHideDeleteDialog() {
    setIsDeleteDialogVisible(false)
    setDeleteAccountError(null)
  }

  async function handleConfirmDeleteAccount(password: string) {
    setDeleteAccountError(null)
    setIsDeleting(true)

    try {
      const response = await userService.deleteAccount({ password })

      if (!response.success) {
        setDeleteAccountError(response.message)
        return
      }

      toast.current?.show({
        severity: 'success',
        summary: 'Cuenta eliminada',
        detail: response.message,
        life: 2500,
      })

      setIsDeleteDialogVisible(false)
      navigate('/', { replace: true })
    } catch {
      setDeleteAccountError('No fue posible eliminar la cuenta. Intenta de nuevo.')
    } finally {
      setIsDeleting(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSuccessMessage(null)
    setApiError(null)

    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setIsSaving(true)
    try {
      const res = await userService.updateProfile(form)

      if (res.success) {
        setSuccessMessage(res.message || 'Perfil actualizado correctamente.')
        toast.current?.show({ severity: 'success', summary: 'Guardado', detail: res.message || 'Perfil actualizado.', life: 3000 })

        // Refresh local currentUser from service (cache updated inside service)
        const cur = await userService.getCurrentUser()
        if (cur.success && cur.user) setCurrentUser(cur.user)
      } else {
        // If server provided field errors, map them to the form
        if (res.errors) {
          setErrors(res.errors)
        }
        setApiError(res.message || 'No fue posible guardar los cambios.')
        toast.current?.show({ severity: 'error', summary: 'Error', detail: res.message || 'No fue posible guardar', life: 4000 })
      }
    } catch {
      setApiError('No fue posible guardar los cambios.')
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No fue posible guardar los cambios.', life: 4000 })
    } finally {
      setIsSaving(false)
    }
  }

  const fullName = useMemo(() => {
    const name = `${form.firstName} ${form.lastName}`.trim()
    return name || currentUser?.name || 'Usuario'
  }, [form.firstName, form.lastName, currentUser?.name])

  const initials = useMemo(() => {
    if (currentUser?.initials) return currentUser.initials
    const letters = fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('')
    return letters || '--'
  }, [fullName, currentUser?.initials])

  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/login', { replace: true })
    }
  }, [isLoading, currentUser, navigate])

  const isCustomer = currentUser?.role === 'user'



  // Map order statuses to localized colors for mockup consistency
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Preparación':
      case 'Pendiente':
      case 'Confirmado':
        return { bg: '#fee2e2', color: '#9d174d', text: 'En preparación' }
      case 'Facturado':
      case 'Entregado':
        return { bg: '#e8f5e9', color: '#2e7d32', text: 'Facturado' }
      default:
        return { bg: '#ffebee', color: '#c62828', text: 'Cancelado' }
    }
  }

  return (
    <div className={isCustomer ? 'customer-shell' : 'dashboard-shell edit-profile-shell'}>
      {isCustomer ? (
        <CustomerNavbar />
      ) : (
        <aside className="dashboard-sidebar">
          <DashboardSidebarHeader userRole={currentUser?.role ?? 'user'} />
          <DashboardSidebarFooter
            currentUser={currentUser}
            onGoToEditProfile={() => navigate('/edit-profile')}
          />
        </aside>
      )}

      <main className={isCustomer ? 'customer-main edit-profile-customer-main' : 'edit-profile-main'}>
        <Toast ref={toast} />

        {isCustomer && (
          <section className="customer-profile-hero mb-5">
            <div className="customer-profile-hero__container flex align-items-center justify-content-between flex-wrap gap-4 p-5">
              <div className="flex align-items-center gap-4">
                <div className="customer-hero-avatar flex align-items-center justify-content-center text-3xl font-bold">
                  {initials}
                </div>
                <div className="text-white">
                  <h1 className="text-4xl font-bold m-0 mb-1">{fullName}</h1>
                  <p className="opacity-80 m-0 mb-3">{form.email || currentUser?.email}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-white-alpha-20 px-3 py-1 border-round-2xl font-semibold">
                      Cliente desde abril 2026
                    </span>
                    <span className="text-xs bg-white-alpha-20 px-3 py-1 border-round-2xl font-semibold">
                      {orders.length} pedido{orders.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                label="Editar perfil"
                className="customer-hero-edit-btn border-round-3xl font-bold text-sm bg-white-alpha-20 text-white"
                style={{ border: '1px solid rgba(255,255,255,0.4)' }}
              />
            </div>
          </section>
        )}

        <div className={isCustomer ? 'customer-profile-grid' : 'edit-profile-layout'}>
          <section className={isCustomer ? 'customer-profile-card-left surface-card p-4 border-round-xl border-1 surface-border' : 'edit-profile-card'}>
            {!isCustomer && (
              <div className="edit-profile-card__header">
                <div className="edit-profile-avatar">{initials}</div>
                <div>
                  <h1 className="edit-profile-title">Editar perfil</h1>
                  <p className="edit-profile-subtitle">Actualiza tus datos personales.</p>
                  <p className="edit-profile-email">{form.email || currentUser?.email || 'Sin correo'}</p>
                </div>
              </div>
            )}

            {isCustomer && <h3 className="text-xl font-bold text-900 m-0 mb-4">Mis datos</h3>}

            {isLoading ? (
              <div className="edit-profile-loading">
                <Message severity="info" text="Cargando perfil..." className="w-full justify-content-start" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="edit-profile-form">
                <div className="grid">
                  <div className="col-12 md:col-6 flex flex-column gap-2 mb-3">
                    <label className="edit-profile-label" htmlFor="profile-firstName">
                      Nombre
                    </label>
                    <InputText
                      id="profile-firstName"
                      className={classNames({ 'p-invalid': errors.firstName })}
                      value={form.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      placeholder="Tu nombre"
                    />
                    {errors.firstName && <small className="p-error">{errors.firstName}</small>}
                  </div>

                  <div className="col-12 md:col-6 flex flex-column gap-2 mb-3">
                    <label className="edit-profile-label" htmlFor="profile-lastName">
                      Apellido
                    </label>
                    <InputText
                      id="profile-lastName"
                      className={classNames({ 'p-invalid': errors.lastName })}
                      value={form.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      placeholder="Tu apellido"
                    />
                    {errors.lastName && <small className="p-error">{errors.lastName}</small>}
                  </div>
                </div>

                <div className="flex flex-column gap-2 mb-3">
                  <label className="edit-profile-label" htmlFor="profile-email">
                    Correo electrónico
                  </label>
                  <InputText
                    id="profile-email"
                    type="email"
                    className={classNames({ 'p-invalid': errors.email })}
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.email && <small className="p-error">{errors.email}</small>}
                </div>

                <div className="flex flex-column gap-2 mb-4">
                  <label className="edit-profile-label" htmlFor="profile-phone">
                    Teléfono
                  </label>
                  <InputText
                    id="profile-phone"
                    type="tel"
                    className={classNames({ 'p-invalid': errors.phone })}
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+57 300 000 0000"
                  />
                  {errors.phone && <small className="p-error">{errors.phone}</small>}
                </div>

                {apiError && (
                  <div className="mb-3">
                    <Message severity="error" text={apiError} className="w-full justify-content-start" />
                  </div>
                )}

                {successMessage && (
                  <div className="mb-3">
                    <Message severity="success" text={successMessage} className="w-full justify-content-start" />
                  </div>
                )}

                <Button
                  type="submit"
                  label={isSaving ? 'Guardando...' : 'Guardar cambios'}
                  loading={isSaving}
                  className="w-full border-round-xl font-bold edit-profile-save"
                  style={{ background: isCustomer ? '#1e5d3b' : undefined, borderColor: isCustomer ? '#1e5d3b' : undefined }}
                />

                <div className="flex gap-3 mt-4">
                  <Button
                    type="button"
                    label="Cambiar Contraseña"
                    icon="pi pi-lock"
                    severity="secondary"
                    outlined
                    className="w-full border-round-xl"
                    onClick={() => setIsChangePasswordDialogVisible(true)}
                  />
                </div>

                <div className="edit-profile-danger-actions mt-3">
                  <Button
                    type="button"
                    label="Eliminar cuenta"
                    severity="danger"
                    outlined
                    className="w-full border-round-xl font-semibold"
                    onClick={handleOpenDeleteDialog}
                  />
                </div>
              </form>
            )}
          </section>

          {isCustomer && (
            <section className="customer-profile-card-right surface-card p-4 border-round-xl border-1 surface-border flex-1">
              <h3 className="text-xl font-bold text-900 m-0 mb-4">Historial de pedidos</h3>
              {orders.length === 0 ? (
                <div className="text-center py-5 text-600">
                  <span className="text-4xl block mb-2">📦</span>
                  No has realizado pedidos todavía.
                </div>
              ) : (
                <div className="flex flex-column gap-3">
                  {orders.map((order) => {
                    const statusStyle = getStatusStyle(order.status)
                    return (
                      <div key={order.number} className="border-round-xl border-1 surface-border p-3 flex justify-content-between align-items-center flex-wrap gap-2 hover:shadow-1 transition-all">
                        <div className="flex flex-column gap-1">
                          <span className="font-bold text-900 text-sm">
                            #{order.number} — {order.table || 'Sin mesa'}
                          </span>
                          <span className="text-xs text-500 line-clamp-1 max-w-20rem">
                            {order.products}
                          </span>
                          <span className="font-semibold text-primary text-sm mt-1">
                            {order.total}
                          </span>
                        </div>
                        <span
                          className="text-xs font-bold px-3 py-1 border-round-2xl"
                          style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                        >
                          {statusStyle.text}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      <DeleteAccountDialog
        visible={isDeleteDialogVisible}
        onHide={handleHideDeleteDialog}
        onConfirm={handleConfirmDeleteAccount}
        isProcessing={isDeleting}
        serverError={deleteAccountError}
      />

      <ChangePasswordDialog
        visible={isChangePasswordDialogVisible}
        onHide={() => setIsChangePasswordDialogVisible(false)}
      />
    </div>
  )
}