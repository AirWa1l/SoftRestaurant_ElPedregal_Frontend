import { useState, useRef } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { Message } from 'primereact/message'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'

interface Props {
  visible: boolean
  onHide: () => void
}

interface ChangePasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

function validate(form: ChangePasswordForm): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!form.currentPassword) {
    errors.currentPassword = 'La contraseña actual es obligatoria'
  }

  if (!form.newPassword) {
    errors.newPassword = 'La nueva contraseña es obligatoria'
  } else if (form.newPassword.length < 8) {
    errors.newPassword = 'La contraseña debe tener al menos 8 caracteres'
  } else if (form.newPassword === form.currentPassword) {
    errors.newPassword = 'La nueva contraseña debe ser diferente'
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirmar contraseña es obligatorio'
  } else if (form.newPassword !== form.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
  }

  return errors
}

export function ChangePasswordDialog({ visible, onHide }: Props) {
  const toast = useRef<any>(null)

  const [form, setForm] = useState<ChangePasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  function handleChange(field: keyof ChangePasswordForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setApiError(null)

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  async function handleSubmit() {
    setApiError(null)

    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setIsLoading(true)

    try {
      // TODO: Implement changePassword endpoint on backend
      // const response = await userService.changePassword({
      //   currentPassword: form.currentPassword,
      //   newPassword: form.newPassword,
      // })

      // For now, show a placeholder
      toast.current?.show({
        severity: 'info',
        summary: 'En desarrollo',
        detail: 'El cambio de contraseña aún está en implementación',
        life: 3000,
      })
    } catch {
      setApiError('No fue posible cambiar la contraseña.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleHide() {
    setForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setErrors({})
    setApiError(null)
    onHide()
  }

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        onHide={handleHide}
        header="Cambiar Contraseña"
        modal
        style={{ width: '90vw', maxWidth: '500px' }}
      >
        <div className="flex flex-column gap-3">
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Contraseña Actual</label>
            <Password
              value={form.currentPassword}
              onChange={(e) => handleChange('currentPassword', e.target.value)}
              toggleMask
              feedback={false}
              className={classNames('w-full', { 'p-invalid': errors.currentPassword })}
              placeholder="Tu contraseña actual"
            />
            {errors.currentPassword && <small className="p-error block mt-1">{errors.currentPassword}</small>}
          </div>

          <div>
            <label className="block text-sm font-bold text-primary mb-2">Nueva Contraseña</label>
            <Password
              value={form.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
              toggleMask
              feedback={false}
              className={classNames('w-full', { 'p-invalid': errors.newPassword })}
              placeholder="Tu nueva contraseña"
            />
            {errors.newPassword && <small className="p-error block mt-1">{errors.newPassword}</small>}
          </div>

          <div>
            <label className="block text-sm font-bold text-primary mb-2">Confirmar Contraseña</label>
            <Password
              value={form.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              toggleMask
              feedback={false}
              className={classNames('w-full', { 'p-invalid': errors.confirmPassword })}
              placeholder="Confirma tu nueva contraseña"
            />
            {errors.confirmPassword && <small className="p-error block mt-1">{errors.confirmPassword}</small>}
          </div>

          {apiError && <Message severity="error" text={apiError} className="w-full" />}

          <div className="flex gap-2 justify-content-end mt-4">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              text
              onClick={handleHide}
              disabled={isLoading}
            />
            <Button
              label="Cambiar Contraseña"
              icon="pi pi-check"
              onClick={handleSubmit}
              loading={isLoading}
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}
