import { useState } from 'react'
import type { LoginFormData, LoginFormErrors } from '../../types/login'
import { userService } from '../../services/userService'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { classNames } from 'primereact/utils'

const INITIAL_FORM: LoginFormData = {
  email: '',
  password: '',
}

interface Props {
  onGoToRecovery: () => void
}

function validate(form: LoginFormData): LoginFormErrors {
  const errors: LoginFormErrors = {}

  if (!form.email.trim()) {
    errors.email = 'El correo es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Ingresa un correo válido'
  }

  if (!form.password) {
    errors.password = 'La contraseña es obligatoria'
  }

  return errors
}

export function LoginForm({ onGoToRecovery }: Props) {
  const [form, setForm] = useState<LoginFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(field: keyof LoginFormData, value: string) {
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setApiError(null)

    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)

    try {
      const response = await userService.login(form)

      if (response.success) {
        setSubmitted(true)
      } else {
        setApiError(response.message)
      }
    } catch {
      setApiError('Ocurrió un error inesperado al conectar con el servidor.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="w-full max-w-30rem mx-auto p-5 border-round-2xl shadow-4 surface-card border-1 surface-border">
        <div className="flex flex-column align-items-center gap-3 py-4 text-center">
          <div className="flex align-items-center justify-content-center w-4rem h-4rem border-circle bg-green-100 text-green-600 text-3xl font-bold">
            ✓
          </div>
          <h3 className="m-0 text-xl font-bold text-900">¡Bienvenido!</h3>
          <p className="m-0 text-sm text-600 font-medium max-w-25rem">
            Tu inicio de sesión fue exitoso. Ahora puedes continuar a la aplicación.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-center font-bold text-3xl text-900 m-0 mb-2">Iniciar sesión</h2>
      <p className="text-center text-sm m-0 mb-5 text-600 font-medium">
        Accede a tu cuenta para continuar.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-column gap-2 mb-3">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="login-email">
            Correo electrónico
          </label>
          <InputText
            id="login-email"
            type="email"
            className={classNames({ 'p-invalid': errors.email })}
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            autoComplete="email"
          />
          {errors.email && (
            <small className="p-error block mt-1" role="alert">
              {errors.email}
            </small>
          )}
        </div>

        <div className="flex flex-column gap-2 mb-3">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="login-password">
            Contraseña
          </label>
          <Password
            id="login-password"
            inputClassName="w-full"
            className={classNames({ 'p-invalid': errors.password })}
            toggleMask
            feedback={false}
            placeholder="Tu contraseña"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            autoComplete="current-password"
          />
          {errors.password && (
            <small className="p-error block mt-1" role="alert">
              {errors.password}
            </small>
          )}
        </div>

        {apiError && (
          <div className="mb-4">
            <Message
              severity="error"
              text={apiError}
              className="w-full justify-content-start border-round-xl p-2"
            />
          </div>
        )}

        <Button
          type="submit"
          className="w-full mt-4 border-round-3xl font-bold"
          label={isSubmitting ? 'Ingresando…' : 'Iniciar sesión'}
          loading={isSubmitting}
        />

        <div className="flex flex-column align-items-center justify-center gap-3 mt-4">
            <p className="text-center text-sm font-semibold text-600 m-0">
            ¿Olvidaste tu contraseña?{' '}
            <a onClick={onGoToRecovery} className="text-primary no-underline font-bold hover:underline transition-colors transition-duration-150">
                Recuperar contraseña
            </a>
            </p>
        </div>

      </form>
    </div>
  )
}
