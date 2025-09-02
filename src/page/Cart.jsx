import React from 'react'
import { CartContext } from '../components/CartContext'

const Cart = () => {
      const { cart, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>🛒 Cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <img src={item.image} alt={item.name} width="60" />
                <span>{item.name} (Size: {item.size})</span>
                <span> x {item.quantity}</span>
                <button onClick={() => removeFromCart(item.id, item.size)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  )
}

export default Cart
