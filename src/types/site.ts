import type { UserRole } from '../utils/roles'

export type NavigationLink = {
  label: string
  href: string
  roles?: UserRole[]
}

export type HighlightCard = {
  title: string
  description: string
}

export type SiteDetail = {
  label: string
  value: string
}