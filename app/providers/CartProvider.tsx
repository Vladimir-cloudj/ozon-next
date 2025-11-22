'use client'

import { createContext, ReactNode, useContext, useState } from "react";
import { CartContextType } from "../models/cart-context.model";
import { CartItem } from "../models/cart-item.model";
import { Product } from "../models/product.model";

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart должен быть использован с CartProvider')
    }
    return context
}
export default function CartProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [cartItems, setCartItem] = useState<CartItem[]>([]);
    const addToCart = (product: Product) => {
        setCartItem((prev) => {
            const findProduct = cartItems.find(p => p.id === product.id)
            if (findProduct) {
                // prev.map(p => p.id === findProduct.id ? {...p, count: p.count+1} : p)
                return prev.map(p => {
                    if (p.id === findProduct.id) {
                        return { ...p, count: p.count++ };
                    } else {
                        return p
                    }
                })
            } else {
                return [...prev, { ...product, count: 1 }]
            }
            // return prev
        })
    }
    const deleteCartItem = (product: Product) => {
        setCartItem((prev) => {
            const findProduct = cartItems.find(p => p.id === product.id)
            if (findProduct) {
                if (findProduct.count > 1) {
                    return prev.map(p => {
                        if (p.id === findProduct.id) {
                          return { ...p, count: p.count-- };
                        } else {
                          return p;
                        }
                    })
                    // return prev.filter((p) => p.id !== product.id);
                } else {
                    return prev.filter((p) => p.id !== product.id);
                }
            } else {
                return prev
            }
        })
    }
    return (
      <CartContext.Provider
        value={{ isOpen, cartItems, setIsOpen, addToCart, deleteCartItem }}
      >
        {children}
      </CartContext.Provider>
    );
}