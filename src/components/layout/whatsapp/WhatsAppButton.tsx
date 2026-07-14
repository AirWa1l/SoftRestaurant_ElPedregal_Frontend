import { Button } from "primereact/button";
import { siteContent } from "../../../data/siteContent";
import "./WhatsAppButton.css";

export function WhatsAppButton() {
    const { phone, defaultMessage } = siteContent.whatsapp
    const isConfigured = phone.trim().length > 0

    function handleClick() {
        if (!isConfigured) return
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <Button
        icon="pi pi-whatsapp"
        rounded
        aria-label="Contactar por WhatsApp"
        onClick={handleClick}
        disabled={!isConfigured}
        tooltip={isConfigured ? 'Escríbenos por WhatsApp' : 'Próximamente'}
        tooltipOptions={{ position: 'left' }}
        className="whatsapp-fab"
        />
    )
}