import { createContext, ReactNode, useContext, useState } from "react"
import { useLocalStorage } from "../components/hooks/useLocalStorage"
import { ShoppingCart } from "../components/ShoppingCart"
import { Favorites } from "../components/Favorites"
import Menu  from "../components/Menu"

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  cartId: number
  quantity: number
}

type FavoriteItem = {
  favoriteItemId: number
  quantity: number
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  openFavorites: () => void
  closeFavorites: () => void
  openMenu: () => void
  closeMenu: () => void
  getItemQuantity: (cartId: number) => number
  getFavoriteItemQuantity: (favoriteItemId: number) => number
  increaseCartQuantity: (cartId: number) => void
  decreaseCartQuantity: (cartId: number) => void
  removeFromCart: (cartId: number) => void
  addToFavorites: (favoriteItemId: number) => void
  removeFromFavorites: (favoriteItemId: number) => void
  favoriteItemQuantity: number
  cartQuantity: number
  cartItems: CartItem[]
  favoriteItems: FavoriteItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenFavorites, setIsOpenFavorites] = useState(false)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  //const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[]);
  //const [favoriteItems, setFavoriteItems] = useLocalStorage<FavoriteItem[]>("favorites", []);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const favoriteItemQuantity = favoriteItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const openFavorites = () => setIsOpenFavorites(true)
  const closeFavorites = () => setIsOpenFavorites(false)

  const openMenu = () => setIsOpenMenu(true)
  const closeMenu = () => setIsOpenMenu(false)

  function getItemQuantity(cartId: number) {
    return cartItems.find(item => item.cartId === cartId)?.quantity || 0
  }

  function increaseCartQuantity(cartId: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.cartId === cartId) == null) {
        return [...currItems, { cartId, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.cartId === cartId) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function decreaseCartQuantity(cartId: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.cartId === cartId)?.quantity === 1) {
        return currItems.filter(item => item.cartId !== cartId)
      } else {
        return currItems.map(item => {
          if (item.cartId === cartId) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function getFavoriteItemQuantity(favoriteItemId: number) {
    return favoriteItems.find(item => item.favoriteItemId === favoriteItemId)?.quantity || 0
  }

  function removeFromCart(cartId: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.cartId !== cartId)
    })
  }

  function addToFavorites(favoriteItemId: number) {
    setFavoriteItems(currFavItems => {
      if (currFavItems.find(item => item.favoriteItemId === favoriteItemId) == null) {
        return [...currFavItems, { favoriteItemId, quantity: 1  }]
      } else {
        return currFavItems.map(item => {
          if (item.favoriteItemId === favoriteItemId) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromFavorites(favoriteItemId: number) {
    setFavoriteItems(currFavItems => {
      return currFavItems.filter(item => item.favoriteItemId !== favoriteItemId)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        addToFavorites,
        decreaseCartQuantity,
        removeFromCart,
        removeFromFavorites,
        getFavoriteItemQuantity,
        favoriteItemQuantity,
        openCart,
        closeCart,
        openFavorites,
        closeFavorites,
        openMenu,
        closeMenu,
        cartItems,
        cartQuantity,
        favoriteItems
      }}
    >
      {children}
      <Menu isOpen={isOpenMenu}/>
      <ShoppingCart isOpen={isOpen} />
      <Favorites isOpen={isOpenFavorites}/>
    </ShoppingCartContext.Provider>
  )
}