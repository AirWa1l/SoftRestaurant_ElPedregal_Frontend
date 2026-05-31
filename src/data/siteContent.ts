import type { HighlightCard, NavigationLink } from '../types/site'

type OrderStatus = 'Pendiente' | 'Preparación' | 'Entregado' | 'Facturado'

type DashboardMetric = {
  label: string
  value: string
  note: string
}

type DashboardOrder = {
  number: string
  table: string
  products: string
  total: string
  status: OrderStatus
}

type DashboardRecentOrder = {
  number: string
  products: string
  total: string
  time: string
  status: Exclude<OrderStatus, 'Facturado'>
}

export const siteContent = {
  brand: 'El Pedregal',
  tagline: 'SoftRestaurant',
  dashboardUser: {
    initials: 'MC',
    name: 'María Cajero',
    role: 'Cajero',
  },
  navigation: [
    { label: 'Dashboard', href: '/home' },
    { label: 'Pedidos', href: '/home' },
    { label: 'Productos', href: '/home' },
    { label: 'Usuarios', href: '/home' },
    { label: 'Configuración', href: '/home' },
  ] satisfies NavigationLink[],
  hero: {
    eyebrow: 'Dashboard',
    title: 'Dashboard',
    copy: 'Panel sencillo para validar la navegación desde el login hacia la vista principal.',
    primaryAction: 'Nuevo pedido',
    secondaryAction: 'Buscar pedido',
  },
  highlights: [
    { title: 'Pedidos', description: 'Acceso rápido a la gestión del día.' },
    { title: 'Ventas', description: 'Resumen general de ingresos y ticket.' },
    { title: 'Caja', description: 'Estado rápido de la operación del restaurante.' },
  ] satisfies HighlightCard[],
  metrics: [
    { label: 'Ventas hoy', value: '$847.500', note: '+12% vs ayer' },
    { label: 'Pedidos activos', value: '14', note: '3 en preparación' },
    { label: 'Pedidos del día', value: '38', note: '+5 vs ayer' },
    { label: 'Ticket promedio', value: '$22.300', note: '+3%' },
  ] satisfies DashboardMetric[],
  orders: [
    { number: '038', table: 'Mesa 4', products: 'Bandeja paisa, Jugo lulo', total: '$38.000', status: 'Pendiente' },
    { number: '037', table: 'Mesa 2', products: 'Trucha, Limonada', total: '$45.000', status: 'Preparación' },
    { number: '036', table: 'Mesa 7', products: 'Sancocho, Cerveza x2', total: '$32.000', status: 'Preparación' },
    { number: '035', table: 'Mesa 1', products: 'Chuleta, Gaseosa', total: '$28.000', status: 'Entregado' },
    { number: '034', table: 'Mesa 5', products: 'Asado, Agua', total: '$22.000', status: 'Facturado' },
  ] satisfies DashboardOrder[],
  recentOrders: [
    { number: '038', products: 'Bandeja paisa · Jugo de lulo', total: '$38.000', time: 'hace 2 min', status: 'Pendiente' },
    { number: '037', products: 'Trucha al ajillo · Limonada natural', total: '$45.000', time: 'hace 8 min', status: 'Preparación' },
    { number: '036', products: 'Sancocho de gallina · 2 Cervezas', total: '$32.000', time: 'hace 15 min', status: 'Entregado' },
  ] satisfies DashboardRecentOrder[],
}