import { useState } from 'react'
import type { RecoveryPasswordFormData, RecoveryPasswordFormErrors } from '../../types/recoveryPassword'
import { userService } from '../../services/userService'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { classNames } from 'primereact/utils'
import { useNavigate } from 'react-router-dom'
import 'primeicons/primeicons.css'

const INITIAL_FORM: RecoveryPasswordFormData = {
  email: '',
  password: '',
  confirmPassword: '',
}

function getPasswordStrength(password: string): { level: number; label: string; className: string } {
  if (!password) return { level: 0, label: '', className: '' }

  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const map: Record<number, { label: string; className: string }> = {
    1: { label: 'Débil', className: 'strength-weak' },
    2: { label: 'Regular', className: 'strength-fair' },
    3: { label: 'Buena', className: 'strength-good' },
    4: { label: 'Fuerte', className: 'strength-strong' },
  }

  return { level: score, ...(map[score] ?? { label: 'Débil', className: 'strength-weak' }) }
}

function validate(form: RecoveryPasswordFormData): RecoveryPasswordFormErrors {
  const errors: RecoveryPasswordFormErrors = {}

  if (!form.email.trim()) {
    errors.email = 'El correo es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Ingresa un correo válido'
  }

  if (!form.password) {
    errors.password = 'La contraseña es obligatoria'
  } else if (form.password.length < 8) {
    errors.password = 'Mínimo 8 caracteres'
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirma tu contraseña'
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
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
  const [step, setStep] = useState<'email' | 'password'>('email')
  const navigate = useNavigate()

  const strength = getPasswordStrength(form.password)

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

  function handleNextStep(e: React.FormEvent) {
    e.preventDefault()
    const emailError = !form.email.trim()
      ? 'El correo es obligatorio'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? 'Ingresa un correo válido'
      : ''
    if (emailError) {
      setErrors({ email: emailError })
      return
    }
    setErrors({})
    setStep('password')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError(null)

    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      const { confirmPassword, ...payload } = form
      const response = await userService.recoveryPassword(payload)
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
          <h3 className="m-0 text-xl font-bold text-900">¡Contraseña actualizada!</h3>
          <p className="m-0 text-sm text-600 max-w-20rem">
            Tu contraseña fue cambiada exitosamente. Ya puedes iniciar sesión con tus nuevas credenciales.
          </p>
          <Button
            className="mt-2 border-round-3xl font-bold w-full"
            label="Ir al inicio de sesión"
            icon="pi pi-sign-in"
            iconPos="right"
            onClick={() => { /* navigate('/login') */ }}
          />
        </div>
      </div>
    )
  }

  const FooterLink = () => (
    <div className="text-center mt-4">
      <p className="text-sm font-semibold text-600 m-0">
        ¿Recordaste tu contraseña?{' '}
        <a onClick={onGoToLogin} className="text-primary no-underline font-bold hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  )

  // ── Paso 1: Email ──────────────────────────────────────────────────────────
  if (step === 'email') {
    return (
      <div className="w-full mx-auto p-4">
        <Button icon="pi pi-angle-left" text severity="secondary" className="font-bold m-0 p-0"/>

        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-900 m-0 mb-2">Recuperar contraseña</h2>
          <p className="text-sm text-600 m-0">
            Ingresa el correo asociado a tu cuenta para continuar.
          </p>
        </div>

        <form onSubmit={handleNextStep} noValidate>
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
            />
            {errors.email && (
              <small className="p-error" role="alert">{errors.email}</small>
            )}
          </div>

          <Button
            type="submit"
            className="w-full border-round-3xl font-bold"
            label="Continuar"
            iconPos="right"
          />
        </form>

        <FooterLink />
      </div>
    )
  }

  // ── Paso 2: Nueva contraseña ───────────────────────────────────────────────
  return (
    <div className="w-full mx-auto p-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-900 m-0 mb-2">Nueva contraseña</h2>
        <p className="text-sm text-600 m-0">
          Crea una contraseña segura para{' '}
          <span className="font-semibold text-900">{form.email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Password */}
        <div className="flex flex-column gap-2 mb-3 w-full">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="recovery-password">
            Nueva contraseña
          </label>
          <Password
            id="recovery-password"
            className={classNames('w-full', { 'p-invalid': errors.password })}
            toggleMask
            feedback={false}
            placeholder="Mínimo 8 caracteres"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            autoComplete="new-password"
            style={{ width: '100%' }}
            inputStyle={{ width: '100%' }}
            autoFocus
          />
          {errors.password && (
            <small className="p-error" role="alert">{errors.password}</small>
          )}
        </div>

        {/* Indicador de fortaleza */}
        {form.password && (
          <div className="mb-3">
            <div className="flex gap-1 mb-1" aria-hidden="true">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={classNames('flex-1 border-round-sm transition-colors transition-duration-300', {
                    'bg-gray-200': i > strength.level,
                    'bg-red-500': i <= strength.level && strength.className === 'strength-weak',
                    'bg-orange-400': i <= strength.level && strength.className === 'strength-fair',
                    'bg-green-400': i <= strength.level && strength.className === 'strength-good',
                    'bg-green-600': i <= strength.level && strength.className === 'strength-strong',
                  })}
                  style={{ height: '4px' }}
                />
              ))}
            </div>
            <span className={classNames('text-xs font-semibold', {
              'text-red-500': strength.className === 'strength-weak',
              'text-orange-400': strength.className === 'strength-fair',
              'text-green-400': strength.className === 'strength-good',
              'text-green-600': strength.className === 'strength-strong',
            })}>
              Seguridad: {strength.label}
            </span>
          </div>
        )}

        {/* Confirm password */}
        <div className="flex flex-column gap-2 mb-4">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="recovery-confirmPassword">
            Confirmar contraseña
          </label>
          <Password
            id="recovery-confirmPassword"
            inputClassName="w-full"
            className={classNames('w-full', { 'p-invalid': errors.confirmPassword })}
            toggleMask
            feedback={false}
            placeholder="Repite tu contraseña"
            value={form.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <small className="p-error" role="alert">{errors.confirmPassword}</small>
          )}
        </div>

        {apiError && (
          <Message
            severity="error"
            text={apiError}
            className="w-full justify-content-start border-round-xl mb-3"
          />
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            className="border-round-3xl font-bold"
            style={{ width: '40%' }}
            label="Volver"
            severity="secondary"
            outlined
            onClick={() => {
              setStep('email')
              setErrors({})
              setApiError(null)
            }}
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            className="border-round-3xl font-bold flex-1"
            label={isSubmitting ? 'Guardando…' : 'Guardar contraseña'}
            iconPos="right"
            loading={isSubmitting}
          />
        </div>
      </form>

      <FooterLink />
    </div>
  )
}