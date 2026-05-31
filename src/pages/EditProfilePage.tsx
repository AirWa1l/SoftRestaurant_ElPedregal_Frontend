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
import { DeleteAccountDialog } from '../components/profile/DeleteAccountDialog'

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

  const toast = useRef<any>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteAccountError, setDeleteAccountError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      setIsLoading(true)
      setApiError(null)

      try {
        const [profileRes, userRes] = await Promise.all([
          userService.getProfile(),
          userService.getCurrentUser(),
        ])

        if (!isMounted) return

        if (profileRes.success && profileRes.profile) {
          setForm(profileRes.profile)
        } else {
          setApiError(profileRes.message || 'No fue posible cargar el perfil.')
        }

        if (userRes.success && userRes.user) {
          setCurrentUser(userRes.user)
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
  }, [])

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

  return (
    <div className="dashboard-shell edit-profile-shell">
      <aside className="dashboard-sidebar">
        <DashboardSidebarHeader />
        <DashboardSidebarFooter
          currentUser={currentUser}
          onGoToEditProfile={() => navigate('/edit-profile')}
        />
      </aside>

      <main className="edit-profile-main">
        <Toast ref={toast} />
        <div className="edit-profile-layout">
          <section className="edit-profile-card">
            <div className="edit-profile-card__header">
              <div className="edit-profile-avatar">{initials}</div>
              <div>
                <h1 className="edit-profile-title">Editar perfil</h1>
                <p className="edit-profile-subtitle">Actualiza tus datos personales.</p>
                <p className="edit-profile-email">{form.email || currentUser?.email || 'Sin correo'}</p>
              </div>
            </div>

            {isLoading ? (
              <div className="edit-profile-loading">
                <Message severity="info" text="Cargando perfil..." className="w-full justify-content-start" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="edit-profile-form">
                <div className="grid">
                  <div className="col-12 md:col-6 flex flex-column gap-2 mb-3">
                    <label className="edit-profile-label" htmlFor="profile-firstName">
                      Nombre completo
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
                />

                <div className="edit-profile-danger-actions">
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
        </div>
      </main>

      <DeleteAccountDialog
        visible={isDeleteDialogVisible}
        onHide={handleHideDeleteDialog}
        onConfirm={handleConfirmDeleteAccount}
        isProcessing={isDeleting}
        serverError={deleteAccountError}
      />
    </div>
  )
}