import React from 'react'

// Aqui você pode definir o tipo para os itens do carrinho, se necessário.
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

// Simulação de dados do carrinho para exemplo.
const cartItems: CartItem[] = [
  { id: 1, name: 'Product 1', price: 10, quantity: 2 },
  { id: 2, name: 'Product 2', price: 20, quantity: 1 },
]

const Cart: React.FC = () => {
  // Calcula o total do carrinho.
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h2>Total: ${total}</h2>
    </div>
  )
}

export default Cart
