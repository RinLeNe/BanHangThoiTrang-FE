'use client'
import { CartProvider } from "../context/cartContext"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <CartProvider>{children}</CartProvider>
  }