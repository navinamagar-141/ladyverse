export interface CartItem {
    id: string
    brand: string
    name: string
    price: string
    quantity: number
  }
  
  export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return []
    const raw = localStorage.getItem('ladyverse_cart')
    return raw ? JSON.parse(raw) : []
  }
  
  export function addToCart(item: Omit<CartItem, 'quantity'>) {
    const cart = getCart()
    const existing = cart.find(c => c.id === item.id)
    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }
    localStorage.setItem('ladyverse_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))
  }
  
  export function removeFromCart(id: string) {
    const cart = getCart().filter(c => c.id !== id)
    localStorage.setItem('ladyverse_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))
  }
  
  export function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) return removeFromCart(id)
    const cart = getCart()
    const item = cart.find(c => c.id === id)
    if (item) item.quantity = quantity
    localStorage.setItem('ladyverse_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))
  }
  
  export function getCartCount(): number {
    return getCart().reduce((sum, item) => sum + item.quantity, 0)
  }