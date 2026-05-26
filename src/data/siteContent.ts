import type { HighlightCard, NavigationLink, SiteDetail } from '../types/site'

export const siteContent: {
  brand: string
  tagline: string
  navigation: NavigationLink[]
  hero: {
    eyebrow: string
    title: string
    copy: string
    primaryAction: string
    secondaryAction: string
  }
  highlights: HighlightCard[]
  details: SiteDetail[]
} = {
  brand: 'El Pedregal',
  tagline: 'Cocina de fuego, mesas compartidas y atención cercana.',
  navigation: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Menú', href: '#menu' },
    { label: 'Reservas', href: '#reservas' },
    { label: 'Contacto', href: '#contacto' },
  ],
  hero: {
    eyebrow: 'Proyecto base',
    title: 'Un inicio limpio para el sitio del restaurante.',
    copy:
      'Esta estructura separa páginas, componentes, datos y tipos para que el front pueda crecer sin perder orden desde el primer commit.',
    primaryAction: 'Ver menú',
    secondaryAction: 'Reservar mesa',
  },
  highlights: [
    {
      title: 'Estructura clara',
      description: 'Carpetas separadas para componentes, páginas, datos, tipos y assets.',
    },
    {
      title: 'Base con Vite',
      description: 'Arranque rápido con React + TypeScript listo para desarrollo y despliegue.',
    },
    {
      title: 'Lista para crecer',
      description: 'Puedes agregar luego menú, reservas, galería, contacto y secciones nuevas.',
    },
  ],
  details: [
    { label: 'Horario', value: 'Mar a dom · 13:00 a 23:00' },
    { label: 'Ubicación', value: 'Centro histórico · Ciudad de México' },
    { label: 'Especialidad', value: 'Parrilla, antojitos y coctelería de autor' },
  ],
}