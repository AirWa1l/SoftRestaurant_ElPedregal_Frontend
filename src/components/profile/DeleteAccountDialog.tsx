import { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'

interface DeleteAccountDialogProps {
  visible: boolean
  onHide: () => void
  onConfirm: (password: string) => Promise<void>
  isProcessing?: boolean
  serverError?: string | null
}

export function DeleteAccountDialog({
  visible,
  onHide,
  onConfirm,
  isProcessing = false,
  serverError = null,
}: DeleteAccountDialogProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!visible) {
      setPassword('')
      setError(null)
    }
  }, [visible])

  function handleConfirm() {
    if (!password.trim()) {
      setError('Debes reconfirmar tu contraseña para continuar.')
      return
    }

    setError(null)
    onConfirm(password)
  }

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="Eliminar cuenta"
      modal
      draggable={false}
      resizable={false}
      className="delete-account-dialog"
      footer={
        <div className="flex flex-column sm:flex-row justify-content-end gap-2">
          <Button
            type="button"
            label="Cancelar"
            outlined
            className="border-round-xl"
            onClick={onHide}
            disabled={isProcessing}
          />
          <Button
            type="button"
            label={isProcessing ? 'Eliminando...' : 'Eliminar definitivamente'}
            severity="danger"
            className="border-round-xl"
            onClick={handleConfirm}
            loading={isProcessing}
          />
        </div>
      }
    >
      <div className="flex flex-column gap-4">
        <Message
          severity="warn"
          text="Esta acción eliminará tu cuenta y cerrará tu sesión. No podrás recuperar tus datos desde esta pantalla."
          className="w-full justify-content-start"
        />

        <div className="flex flex-column gap-2">
          <label className="font-semibold text-sm" htmlFor="delete-account-password">
            Reingresa tu contraseña
          </label>
          <Password
            inputId="delete-account-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(null)
            }}
            feedback={false}
            toggleMask
            placeholder="Tu contraseña actual"
            className="w-full"
            inputClassName="w-full"
          />
          <small className="text-600">
            Confirma tu contraseña antes de continuar con la eliminación.
          </small>
          {error && (
            <small className="p-error" role="alert">
              {error}
            </small>
          )}
          {serverError && (
            <small className="p-error" role="alert">
              {serverError}
            </small>
          )}
        </div>
      </div>
    </Dialog>
  )
}
