import { useState, type FormEvent } from 'react'
import type { RecoveryPasswordFormData, RecoveryPasswordFormErrors } from '../../types/recoveryPassword'
import { userService } from '../../services/userService'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { classNames } from 'primereact/utils'
import 'primeicons/primeicons.css'

const INITIAL_FORM: { email: string } = {
  email: '',
}

function validate(form: RecoveryPasswordFormData): RecoveryPasswordFormErrors {
  const errors: RecoveryPasswordFormErrors = {}

  if (!form.email.trim()) {
    errors.email = 'El correo es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Ingresa un correo válido'
  }

  return errors
}

interface Props {
  onGoToLogin: () => void
}

export function RecoveryPasswordForm({ onGoToLogin }: Props) {
  const [form, setForm] = useState<RecoveryPasswordFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<RecoveryPasswordFormErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(field: keyof RecoveryPasswordFormData, value: string) {
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setApiError(null)

    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      const response = await userService.recoveryPassword(form)
      if (response.success) {
        setSubmitted(true)
      } else {
        setApiError(response.message)
      }
    } catch (error) {
      setApiError('Ocurrió un error inesperado al conectar con el servidor.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Pantalla de éxito ──────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="w-full mx-auto p-4">
        <div className="flex flex-column align-items-center gap-3 py-4 text-center">
          <div className="flex align-items-center justify-content-center w-4rem h-4rem border-circle bg-green-100">
            <i className="pi pi-check-circle text-green-500 text-4xl" />
          </div>
          <h3 className="m-0 text-xl font-bold text-900">¡Enlace enviado!</h3>
          <p className="m-0 text-sm text-600 max-w-20rem">
            Hemos enviado un enlace de recuperación a <strong>{form.email}</strong>. 
            Revisa tu bandeja de entrada (y spam si es necesario).
          </p>
          <p className="m-0 text-xs text-600 mt-3">
            El enlace expirará en 1 hora.
          </p>
          <Button
            className="mt-4 border-round-3xl font-bold w-full"
            label="Volver al inicio de sesión"
            icon="pi pi-sign-in"
            iconPos="right"
            onClick={onGoToLogin}
          />
        </div>
      </div>
    )
  }

  const FooterLink = () => (
    <div className="text-center mt-4">
      <p className="text-sm font-semibold text-600 m-0">
        ¿Recordaste tu contraseña?{' '}
        <a onClick={onGoToLogin} className="text-primary no-underline font-bold hover:underline cursor-pointer">
          Inicia sesión
        </a>
      </p>
    </div>
  )

  return (
    <div className="w-full mx-auto p-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-900 m-0 mb-2">Recuperar contraseña</h2>
        <p className="text-sm text-600 m-0">
          Ingresa el correo asociado a tu cuenta para continuar.
        </p>
      </div>

      {apiError && (
        <div className="mb-3">
          <Message severity="error" text={apiError} className="w-full justify-content-start" />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-column gap-2 mb-4">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="recovery-email">
            Correo electrónico
          </label>
          <InputText
            id="recovery-email"
            type="email"
            className={classNames('w-full', { 'p-invalid': errors.email })}
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            autoComplete="email"
            autoFocus
            disabled={isSubmitting}
          />
          {errors.email && (
            <small className="p-error" role="alert">{errors.email}</small>
          )}
        </div>

        <Button
          type="submit"
          className="w-full border-round-3xl font-bold"
          label={isSubmitting ? 'Enviando...' : 'Enviar enlace de recuperación'}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
      </form>

      <FooterLink />
    </div>
  )
}
