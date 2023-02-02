import { TUser, TProduct, TPurchase, CATEGORY } from './types';

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
    category: CATEGORY.FOOD
  },
  {
    id: "p002",
    name: "farinha de trigo",
    price: 4,
    category: CATEGORY.FOOD
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

// function createUser (id: string, email: string, password: string) {
//   users.push({id: id, email: email, password: password})
//   return(
//     console.log("Cadastro de usuario realizado com sucesso!")
//   )
// }

// createUser("u003", "gangan@fmail.com", "pass123")

// function getAllUsers () {
//   return(
//     users
//   )
// }

// console.log(getAllUsers())


// function createProduct (id: string, name: string, price: number, category: CATEGORY) {
//   products.push({id: id, name: name, price: price, category: category})
//   return(
//     console.log("Cadastro de produto realizado com sucesso!")
//   )
// }

// createProduct("p003", "Meia longa", 20, CATEGORY.CLOTHES_AND_SHOES)

// function getAllProducts () {
//   return(
//     products
//   )
// }

// console.log(getAllProducts())

// function getProductById (id: string){
//   const product = products.find((product)=> product.id === id)
//   return (
//     console.log(product)
//   )
// }

// getProductById("p002")

// function getProductByName (name: string){
//   const product = products.find((product)=> product.name.toUpperCase === name.toUpperCase)
//   return (
//     console.log(product)
//   )
// }

// getProductByName("farinha de trigo")

// function createPurchase (userId: string, productId: string, quantity: number, totalPrice: number) {
//   purchases.push({userId: userId, productId: productId, quantity: quantity, totalPrice: totalPrice})
//   return(
//     console.log("Cadastro de compra realizado com sucesso!")
//   )
// }

// createPurchase("u003", "p002", 1, 4)

// function getAllPurchasesFromUserId (userId: string){
//   const filtredPurchase = purchases.find((purchase)=> purchase.userId === userId)
//   return( 
//     console.log(filtredPurchase)
//   )
// }

// getAllPurchasesFromUserId("u003")








