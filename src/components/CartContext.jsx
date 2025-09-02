import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on initialization (with error handling)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("fashionCubeCart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      setCart([]);
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("fashionCubeCart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Add product to cart
  const addToCart = (product, size, quantity) => {
    if (!product || !size || quantity <= 0) {
      throw new Error("Invalid product, size, or quantity");
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === size
      );
      
      if (existingItemIndex >= 0) {
        // If product exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        return updatedCart;
      }
      
      // If product doesn't exist, add new item
      return [...prevCart, { 
        ...product, 
        size, 
        quantity,
        addedAt: new Date().toISOString() // Track when item was added
      }];
    });
  };

  // Update quantity of specific item
  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: Math.min(newQuantity, 10) } // Max 10 items
          : item
      )
    );
  };

  // Remove product from cart
  const removeFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem("fashionCubeCart");
    } catch (error) {
      console.error("Error clearing cart from localStorage:", error);
    }
  };

  // Get total items count
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Check if product is in cart
  const isInCart = (productId, size) => {
    return cart.some((item) => item.id === productId && item.size === size);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId, size) => {
    const item = cart.find((item) => item.id === productId && item.size === size);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      updateQuantity,
      removeFromCart, 
      clearCart,
      getTotalItems,
      getTotalPrice,
      isInCart,
      getItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};