import { TUser, TProduct, TPurchase } from './types';

export const users: TUser[] = [
  {
    id: "u001",
    email: "biel@gmail.com",
    password:"senha123"
  },
  {
    id: "u002",
    email: "fabio@jmail.com",
    password:"senha123"
  }
]

export const products: TProduct[] = [
  {
    id: "p001",
    name: "leite condensado",
    price: 6,
    category: "alimentação"
  },
  {
    id: "p002",
    name: "farinha de trigo",
    price: 4,
    category: "alimentação"
  }
]

export const purchases: TPurchase[] = [
  {
    userId: "u001",
    productId: "p002",
    quantity: 2,
    totalPrice: 4
  },
  {
    userId: "u002",
    productId: "p001",
    quantity: 3,
    totalPrice: 18
  }
]