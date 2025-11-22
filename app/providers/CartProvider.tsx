'use client'

import { createContext, ReactNode, useContext, useState } from "react";
import { CartContextType } from "../models/cart-context.model";

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart должен быть использован с CartProvider')
    }
    return context
}
export default function CartProvider({children}: {children: ReactNode}) {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <CartContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
      </CartContext.Provider>
    );
}