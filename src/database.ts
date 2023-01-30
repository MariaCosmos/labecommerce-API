import { TUser, TProduct, TPurchase, CATEGORIES } from './types';

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
    category: CATEGORIES.FOOD
  },
  {
    id: "p002",
    name: "farinha de trigo",
    price: 4,
    category: CATEGORIES.FOOD
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

function createUser (id: string, email: string, password: string) {
  users.push({id: id, email: email, password: password})
  return(
    console.log("Cadastro realizado com sucesso!")
  )
}

createUser("u003", "gangan@fmail.com", "pass123")

function getUsers () {
  return(
    users
  )
}

getUsers()
