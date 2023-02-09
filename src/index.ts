import { TProduct, TUser, CATEGORY } from './types';
import { users, products, purchases } from './database';
import express, { Request, Response } from 'express'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send({ message: "Pong!" })
})

// Get All Users

app.get("/users", (req: Request, res: Response) => {
  try {

    res.status(200).send(users)

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Get All Purchases

app.get("/purchases", (req: Request, res: Response) => {
  try {

    res.status(200).send(purchases)

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

//Get All Products 

app.get("/products", (req: Request, res: Response) => {
  try {

    res.status(200).send(products)

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Search Product by name

app.get("/products/search", (req: Request, res: Response) => {
  try {
    const q = req.query.q as string

    if (q.length < 1) {
      res.status(400)
      throw new Error("a query deve conter no mínimo 1 caractere")
      
    }

    const result: TProduct[] = products
      .filter((product) => (product.name.toLowerCase().replace(/ /g, '')).includes(q.toLowerCase()))

    res.status(200).send(result)
  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Get Product by id

app.get("/products/:id", (req: Request, res: Response) => {
  try {

    const id = req.params.id as string

    const product = products.find((product) => product.id === id)

    if(!product){
      res.status(400)
      throw new Error("'id' não encontrado")
    }

    res.status(200).send(product)

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }

})

// Get User Purchases by User id

app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {

    const id = req.params.id as string

    const userPurchases = purchases.filter((purchase) => purchase.userId === id)

    if(!userPurchases){
      res.status(400)
      throw new Error("usuario não encontrado")
    }

    res.status(200).send(userPurchases)

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }

})

// Create User 

app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    if(typeof id !== "string"){
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }

    if(typeof email !== "string"){
      res.status(400)
      throw new Error("'email' deve ser uma string")
    }

    if(typeof password !== "string"){
      res.status(400)
      throw new Error("'password' deve ser uma string")
    }

    const newUser = {
      id: id,
      email: email,
      password: password
    }

    users.push(newUser)
    res.status(201).send({ message: "usuario cadastrado com sucesso!" })
  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Create Product

app.post("/products", (req: Request, res: Response) => {
  try {

    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as CATEGORY

    if(typeof id !== "string"){
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }
    if(typeof name !== "string"){
      res.status(400)
      throw new Error("'name' deve ser uma string")
    }
    if(typeof price !== "number"){
      res.status(400)
      throw new Error("'price' deve ser um numero")
    }
    if(typeof category !== "string"){
      res.status(400)
      throw new Error("'category' deve ser uma string")
    }

    const newProduct = {
      id: id as string,
      name: name as string,
      price: price as number,
      category: category as CATEGORY,
    }
  

    products.push(newProduct)
    res.status(201).send({ message: "produto cadastrado com sucesso!" })

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }

})

// Create Purchase

app.post("/purchases", (req: Request, res: Response) => {
  try {

     const userId = req.body.userId
     const productId = req.body.productId
     const quantity = req.body.quantity
     const totalPrice = req.body.totalPrice

     if(typeof userId !== "string"){
      res.status(400)
      throw new Error("'userId' deve ser uma string")
    }
    if(typeof productId !== "string"){
      res.status(400)
      throw new Error("'productId' deve ser uma string")
    }
    if(typeof quantity !== "number"){
      res.status(400)
      throw new Error("'quantity' deve ser um numero")
    }
    if(typeof totalPrice !== "number"){
      res.status(400)
      throw new Error("'totalPrice' deve ser um numero")
    }

    const product = products.find((product)=> product.id === productId)
    const user = users.find((user)=> user.id === userId)

    if (!product){
      res.status(400)
      throw new Error("'productId' não encontrado")
    }
    if (!user){
      res.status(400)
      throw new Error("'userId' não encontrado")
    }

    const valorTotal = product.price * quantity

    if (totalPrice !== valorTotal){
      res.status(400)
      throw new Error(`'totalPrice' não corresponde ao valor do produto e quantidade da compra. Valor total: ${valorTotal}`)
    }

    const newPurchase = {
      userId: userId,
      productId: productId,
      quantity: quantity,
      totalPrice: totalPrice
    }
    

    purchases.push(newPurchase)
    res.status(201).send({ message: "Compra realizada com sucesso!" })

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Delete User by id

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id

    const userIndex = users.findIndex((user) => user.id === idToDelete)

    if (userIndex >= 0) {
      users.splice(userIndex, 1)
    } else {
      res.status(400)
      throw new Error("usuario não encontrado")
    }

    res.status(201).send({ message: "usuario deletado com sucesso!" })

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Delete Product by id

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id

    const productIndex = products.findIndex((product) => product.id === idToDelete)

    if (productIndex >= 0) {
      products.slice(productIndex, 1)
    } else {
      res.status(400)
      throw new Error("produto não encontrado")
    }

    res.status(201).send({ message: "produto deletado com sucesso!" })
  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})


// Edit User by id

app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id

    const newId = req.body.id
    const newEmail = req.body.email
    const newPassword = req.body.password

    if(newId){
      if (typeof newId !== "string"){
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }
    }
    if(newEmail){
      if (typeof newEmail !== "string"){
        res.status(400)
        throw new Error("'email' deve ser uma string")
      }
    }
    if(newPassword){
      if (typeof newPassword !== "string"){
        res.status(400)
        throw new Error("'password' deve ser uma string")
      }
    }

    const user = users.find((user) => user.id === idToEdit)

    if(!user){
      res.status(400)
      throw new Error("usuario não encontrado")
    }

    if (user) {
      user.id = newId || user.id
      user.email = newEmail || user.email
      user.password = newPassword || user.password
    }

    res.status(200).send({ message: "cadastro atualizado com sucesso!" })
  } catch (error) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Edit Product by id

app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id

    const newId = req.body.id
    const newName = req.body.name
    const newPrice = req.body.price
    const newCategory = req.body.category as CATEGORY

    if(newId){
      if (typeof newId !== "string"){
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }
    }
    if(newName){
      if (typeof newName !== "string"){
        res.status(400)
        throw new Error("'name' deve ser uma string")
      }
    }
    if(newPrice){
      if (typeof newPrice !== "number"){
        res.status(400)
        throw new Error("'price' deve ser um number")
      }
    }
    if(newCategory){
      if (typeof newCategory !== "string"){
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }
    }

    const product = products.find((product) => product.id === idToEdit)

    if (!product){
      res.status(400)
      throw new Error("produto não encontrado")
    }

    if (product) {
      product.id = newId || product.id
      product.name = newName || product.name
      product.price = newPrice || product.price
      product.category = newCategory || product.category
    }

    res.status(200).send({ message: "produto atualizado com sucesso!" })
  } catch (error) {

    console.log(error)
    res.status(400).send(error.message)
  }

})