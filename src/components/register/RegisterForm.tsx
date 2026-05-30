import { useState } from 'react'
import type { RegisterFormData, RegisterFormErrors } from '../../types/register'
import { userService } from '../../services/userService'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { classNames } from 'primereact/utils'

const INITIAL_FORM: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
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

function validate(form: RegisterFormData): RegisterFormErrors {
  const errors: RegisterFormErrors = {}

  if (!form.firstName.trim()) {
    errors.firstName = 'El nombre es obligatorio'
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'El apellido es obligatorio'
  }

  if (!form.email.trim()) {
    errors.email = 'El correo es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Ingresa un correo válido'
  }

  if (!form.phone.trim()) {
    errors.phone = 'El teléfono es obligatorio'
  } else if (!/^[+]?\d[\d\s\-()]{6,}$/.test(form.phone)) {
    errors.phone = 'Ingresa un teléfono válido'
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

export function RegisterForm() {
  const [form, setForm] = useState<RegisterFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<RegisterFormErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const strength = getPasswordStrength(form.password)

  function handleChange(field: keyof RegisterFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setApiError(null)

    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
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
      const response = await userService.register(payload)

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

  if (submitted) {
    return (
      <div className="w-full max-w-30rem mx-auto p-5 border-round-2xl shadow-4 surface-card border-1 surface-border">
        <div className="flex flex-column align-items-center gap-3 py-4 text-center">
          <div className="flex align-items-center justify-content-center w-4rem h-4rem border-circle bg-green-100 text-green-600 text-3xl font-bold">
            ✓
          </div>
          <h3 className="m-0 text-xl font-bold text-900">¡Registro exitoso!</h3>
          <p className="m-0 text-sm text-600 font-medium max-w-25rem">
            Tu cuenta ha sido creada correctamente. Pronto recibirás un correo de confirmación.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-center font-bold text-3xl text-900 m-0 mb-2">Crear cuenta</h2>
      <p className="text-center text-sm m-0 mb-5 text-600 font-medium">
        Únete a la familia El Pedregal y disfruta beneficios exclusivos.
      </p>

      <form onSubmit={handleSubmit} noValidate id="register-form">
        {/* Name row */}
        <div className="grid">
          <div className="col-12 md:col-6 flex flex-column gap-2 mb-3">
            <label className="text-xs font-bold text-primary uppercase" htmlFor="register-firstName">
              Nombre
            </label>
            <InputText
              id="register-firstName"
              className={classNames({ 'p-invalid': errors.firstName })}
              placeholder="Tu nombre"
              value={form.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              autoComplete="given-name"
            />
            {errors.firstName && (
              <small className="p-error block mt-1" role="alert">{errors.firstName}</small>
            )}
          </div>

          <div className="col-12 md:col-6 flex flex-column gap-2 mb-3">
            <label className="text-xs font-bold text-primary uppercase" htmlFor="register-lastName">
              Apellido
            </label>
            <InputText
              id="register-lastName"
              className={classNames({ 'p-invalid': errors.lastName })}
              placeholder="Tu apellido"
              value={form.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              autoComplete="family-name"
            />
            {errors.lastName && (
              <small className="p-error block mt-1" role="alert">{errors.lastName}</small>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-column gap-2 mb-3">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="register-email">
            Correo electrónico
          </label>
          <InputText
            id="register-email"
            type="email"
            className={classNames({ 'p-invalid': errors.email })}
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            autoComplete="email"
          />
          {errors.email && (
            <small className="p-error block mt-1" role="alert">{errors.email}</small>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-column gap-2 mb-3">
          <label className="text-xs font-bold text-primary uppercase" htmlFor="register-phone">
            Teléfono
          </label>
          <InputText
            id="register-phone"
            type="tel"
            className={classNames({ 'p-invalid': errors.phone })}
            placeholder="+57 300 000 0000"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            autoComplete="tel"
          />
          {errors.phone && (
            <small className="p-error block mt-1" role="alert">{errors.phone}</small>
          )}
        </div>

        {/* Password & Confirm Password Grid */}
        <div className="grid">
          {/* Password */}
          <div className="col-12 md:col-6 flex flex-column gap-2 mb-3">
            <label className="text-xs font-bold text-primary uppercase" htmlFor="register-password">
              Contraseña
            </label>
            <Password
              id="register-password"
              inputClassName="w-full"
              className={classNames({ 'p-invalid': errors.password })}
              toggleMask
              feedback={false}
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              autoComplete="new-password"
            />
            {errors.password && (
              <small className="p-error block mt-1" role="alert">{errors.password}</small>
            )}
          </div>

          {/* Confirm password */}
          <div className="col-12 md:col-6 flex flex-column gap-2 mb-3">
            <label className="text-xs font-bold text-primary uppercase" htmlFor="register-confirmPassword">
              Confirmar contraseña
            </label>
            <Password
              id="register-confirmPassword"
              inputClassName="w-full"
              className={classNames({ 'p-invalid': errors.confirmPassword })}
              toggleMask
              feedback={false}
              placeholder="Repite tu contraseña"
              value={form.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <small className="p-error block mt-1" role="alert">{errors.confirmPassword}</small>
            )}
          </div>
        </div>

        {/* Indicador de Fortaleza de Contraseña a ancho completo */}
        {form.password && (
          <div className="mb-3">
            <div className="flex gap-2 animate-duration-200" aria-hidden="true">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={classNames('flex-1 h-1 border-round-sm transition-colors transition-duration-300', {
                    'bg-gray-300': i > strength.level,
                    'bg-red-500': i <= strength.level && strength.className === 'strength-weak',
                    'bg-orange-500': i <= strength.level && strength.className === 'strength-fair',
                    'bg-green-500': i <= strength.level && strength.className === 'strength-good',
                    'bg-green-600': i <= strength.level && strength.className === 'strength-strong',
                  })}
                />
              ))}
            </div>
            <span className={classNames('text-xs font-bold mt-2 block', {
              'text-red-500': strength.className === 'strength-weak',
              'text-orange-500': strength.className === 'strength-fair',
              'text-green-500': strength.className === 'strength-good',
              'text-green-600': strength.className === 'strength-strong',
            })}>
              {strength.label}
            </span>
          </div>
        )}

        {apiError && (
          <div className="mb-4">
            <Message
              severity="error"
              text={apiError}
              className="w-full justify-content-start border-round-xl p-2"
            />
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full mt-4 border-round-3xl font-bold"
          id="register-submit"
          label={isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
          loading={isSubmitting}
        />
      </form>

      <div className="flex flex-column align-items-center justify-center gap-3 mt-4">
        <p className="text-center text-sm font-semibold text-600 m-0">
          ¿Ya tienes cuenta?{' '}
          <a href="#inicio" className="text-primary no-underline font-bold hover:underline transition-colors transition-duration-150">
            Inicia sesión
          </a>
        </p>
      </div>

    </div>
  )
}
