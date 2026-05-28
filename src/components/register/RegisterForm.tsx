import { useState } from 'react'
import type { RegisterFormData, RegisterFormErrors } from '../../types/register'
import './RegisterForm.css'

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
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const strength = getPasswordStrength(form.password)

  function handleChange(field: keyof RegisterFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))

    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)

    // Simulated async submit
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1200)
  }

  if (submitted) {
    return (
      <div className="register-form-wrapper">
        <div className="register-form__success">
          <div className="register-form__success-icon" aria-hidden="true">✓</div>
          <h3>¡Registro exitoso!</h3>
          <p>
            Tu cuenta ha sido creada correctamente. Pronto recibirás un correo de confirmación.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="register-form-wrapper">
      <h2 className="register-form__title">Crear cuenta</h2>
      <p className="register-form__subtitle">
        Únete a la familia El Pedregal y disfruta beneficios exclusivos.
      </p>

      <form onSubmit={handleSubmit} noValidate id="register-form">
        {/* Name row */}
        <div className="register-form__row">
          <div className="register-form__field">
            <label className="register-form__label" htmlFor="register-firstName">
              Nombre
            </label>
            <input
              id="register-firstName"
              className={`register-form__input${errors.firstName ? ' register-form__input--error' : ''}`}
              type="text"
              placeholder="Tu nombre"
              value={form.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              autoComplete="given-name"
            />
            {errors.firstName && (
              <span className="register-form__error" role="alert">{errors.firstName}</span>
            )}
          </div>

          <div className="register-form__field">
            <label className="register-form__label" htmlFor="register-lastName">
              Apellido
            </label>
            <input
              id="register-lastName"
              className={`register-form__input${errors.lastName ? ' register-form__input--error' : ''}`}
              type="text"
              placeholder="Tu apellido"
              value={form.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              autoComplete="family-name"
            />
            {errors.lastName && (
              <span className="register-form__error" role="alert">{errors.lastName}</span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="register-form__field">
          <label className="register-form__label" htmlFor="register-email">
            Correo electrónico
          </label>
          <input
            id="register-email"
            className={`register-form__input${errors.email ? ' register-form__input--error' : ''}`}
            type="email"
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            autoComplete="email"
          />
          {errors.email && (
            <span className="register-form__error" role="alert">{errors.email}</span>
          )}
        </div>

        {/* Phone */}
        <div className="register-form__field">
          <label className="register-form__label" htmlFor="register-phone">
            Teléfono
          </label>
          <input
            id="register-phone"
            className={`register-form__input${errors.phone ? ' register-form__input--error' : ''}`}
            type="tel"
            placeholder="+57 300 000 0000"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            autoComplete="tel"
          />
          {errors.phone && (
            <span className="register-form__error" role="alert">{errors.phone}</span>
          )}
        </div>

        {/* Password */}
        <div className="register-form__field">
          <label className="register-form__label" htmlFor="register-password">
            Contraseña
          </label>
          <div className="register-form__password-wrapper">
            <input
              id="register-password"
              className={`register-form__input${errors.password ? ' register-form__input--error' : ''}`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="register-form__toggle-password"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? '🙈' : '👁'}
            </button>
          </div>
          {form.password && (
            <>
              <div className="register-form__strength" aria-hidden="true">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`register-form__strength-bar${i <= strength.level ? ` register-form__strength-bar--active ${strength.className}` : ''}`}
                  />
                ))}
              </div>
              <span className={`register-form__strength-label ${strength.className}`}>
                {strength.label}
              </span>
            </>
          )}
          {errors.password && (
            <span className="register-form__error" role="alert">{errors.password}</span>
          )}
        </div>

        {/* Confirm password */}
        <div className="register-form__field">
          <label className="register-form__label" htmlFor="register-confirmPassword">
            Confirmar contraseña
          </label>
          <div className="register-form__password-wrapper">
            <input
              id="register-confirmPassword"
              className={`register-form__input${errors.confirmPassword ? ' register-form__input--error' : ''}`}
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repite tu contraseña"
              value={form.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="register-form__toggle-password"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showConfirm ? '🙈' : '👁'}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="register-form__error" role="alert">{errors.confirmPassword}</span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="register-form__submit"
          id="register-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>

      <div className="register-form__divider">
        <span>o</span>
      </div>

      <p className="register-form__login-link">
        ¿Ya tienes cuenta?{' '}
        <a href="#inicio">Inicia sesión</a>
      </p>
    </div>
  )
}
