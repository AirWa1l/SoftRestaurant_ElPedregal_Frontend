import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { classNames } from 'primereact/utils'
import { userService } from '../services/userService'

const INITIAL_FORM = {
  password: '',
  confirmPassword: '',
}

function validate(form: typeof INITIAL_FORM) {
  const errors: Record<string, string> = {}

  if (!form.password) {
    errors.password = 'La contraseña es obligatoria'
  } else if (form.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres'
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirmar contraseña es obligatorio'
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
  }

  return errors
}

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      setApiError('El enlace de recuperación es inválido. Solicita uno nuevo.')
    }
  }, [token])

  function handleChange(field: keyof typeof INITIAL_FORM, value: string) {
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

    if (!token) {
      setApiError('El enlace de recuperación es inválido.')
      return
    }

    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)

    try {
      const response = await userService.resetPassword({
        token,
        password: form.password,
      })

      if (response.success) {
        setIsSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 3000)
      } else {
        setApiError(response.message)
      }
    } catch {
      setApiError('Ocurrió un error inesperado.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex align-items-center justify-content-center p-4">
      <div className="surface-card p-8 border-round-2xl shadow-2 w-full" style={{ maxWidth: '450px' }}>
        <h2 className="text-center font-bold text-3xl text-900 m-0 mb-2">Restablecer Contraseña</h2>
        <p className="text-center text-sm m-0 mb-6 text-600 font-medium">
          Ingresa tu nueva contraseña para acceder a tu cuenta.
        </p>

        {isSuccess ? (
          <div>
            <Message
              severity="success"
              text="¡Contraseña actualizada correctamente! Redirigiendo al inicio de sesión..."
              className="w-full mb-4"
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-column gap-2 mb-4">
              <label className="text-xs font-bold text-primary uppercase" htmlFor="reset-password">
                Nueva Contraseña
              </label>
              <Password
                id="reset-password"
                inputClassName="w-full"
                className={classNames({ 'p-invalid': errors.password })}
                toggleMask
                feedback={false}
                placeholder="Tu nueva contraseña"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
              {errors.password && <small className="p-error block">{errors.password}</small>}
            </div>

            <div className="flex flex-column gap-2 mb-4">
              <label className="text-xs font-bold text-primary uppercase" htmlFor="confirm-password">
                Confirmar Contraseña
              </label>
              <Password
                id="confirm-password"
                inputClassName="w-full"
                className={classNames({ 'p-invalid': errors.confirmPassword })}
                toggleMask
                feedback={false}
                placeholder="Confirma tu contraseña"
                value={form.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
              />
              {errors.confirmPassword && <small className="p-error block">{errors.confirmPassword}</small>}
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
              label={isSubmitting ? 'Actualizando…' : 'Restablecer Contraseña'}
              loading={isSubmitting}
              disabled={!token}
            />
          </form>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-600 m-0">
            ¿Recuerdas tu contraseña?{' '}
            <a
              onClick={() => navigate('/')}
              className="text-primary no-underline font-bold hover:underline transition-colors transition-duration-150 cursor-pointer"
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
