import { db } from './database/knex';
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

app.get("/users", async (req: Request, res: Response) => {
  try {

    const result = await db("users")

    res.status(200).send(result)

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Get All Purchases

app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const result = await db("purchases")

    res.status(200).send(result)

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

//Get All Products 

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products")

    res.status(200).send(result)

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Search Product by name

app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string

    if (q.length < 1) {
      res.status(400)
      throw new Error("a query deve conter no mínimo 1 caractere")
    }

    const result = await db.raw(`SELECT * FROM products WHERE name = "${q}"`)

    if(!result){
      res.status(400)
      throw new Error("produto não encontrado.")
    }

    res.status(200).send(result)
  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Get Product by id

app.get("/products/:id", async (req: Request, res: Response) => {
  try {

    const id = req.params.id as string

    const product = await db("products").where("id","=",`${id}`)

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

// Get Purchase by id

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {

    const id = req.params.id as string

    const purchase = await db("purchases").where("id","=",`${id}`)

    if(!purchase){
      res.status(400)
      throw new Error("'id' não encontrado")
    }

    res.status(200).send(purchase)

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }

})

// Get User Purchases by User id

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {

    const id = req.params.id as string

    const userPurchases = purchases.filter((purchase) => purchase.userId === id)

    if(!userPurchases){
      res.status(400)
      throw new Error("usuario não encontrado")
    }

    const result = await db("purchases").where("buyer_id","=", `${id}`)

    res.status(200).send(result)

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }

})

// Create User 

app.post("/users", async (req: Request, res: Response) => {
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

    await db("users").insert(newUser)
    
    res.status(201).send({ message: "usuario cadastrado com sucesso!" })
  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Create Product

app.post("/products", async (req: Request, res: Response) => {
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
      id: id,
      name: name,
      price: price,
      category: category
    }

    await db("products").insert(newProduct)

    res.status(201).send({ message: "produto cadastrado com sucesso!" })

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }

})

// Create Purchase

app.post("/purchases", async (req: Request, res: Response) => {
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

    await db("purchases").insert(newPurchase)
    
    res.status(201).send({ message: "Compra realizada com sucesso!" })

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Delete User by id

app.delete("/users/:id", async(req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id

    const userIndex = users.findIndex((user) => user.id === idToDelete)

    if (userIndex < 0) {
      res.status(400)
      throw new Error("usuario não encontrado")
    }

    await db("users").del().where({id: idToDelete})

    res.status(201).send({ message: "usuario deletado com sucesso!" })

  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Delete Product by id

app.delete("/products/:id", async(req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id

    const productIndex = products.findIndex((product) => product.id === idToDelete)

    if (productIndex < 0) {
      res.status(400)
      throw new Error("produto não encontrado")
    }

    await db("products").del().where({id: idToDelete})

    res.status(201).send({ message: "produto deletado com sucesso!" })
  } catch (error: any) {

    console.log(error)
    res.status(400).send(error.message)
  }
})


// Edit User by id

app.put("/users/:id", async (req: Request, res: Response) => {
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

    const [user] = await db("users").where({id: idToEdit})

    if(!user){
      res.status(400)
      throw new Error("usuario não encontrado")
    }

    if (user) {
      const updatdUser = {
        id: newId || user.id,
        email: newEmail || user.email,
        password: newPassword
      }
      await db("users").update(updatdUser).where({id: idToEdit})
    }

    res.status(200).send({ message: "cadastro atualizado com sucesso!" })
  } catch (error) {

    console.log(error)
    res.status(400).send(error.message)
  }
})

// Edit Product by id

app.put("/products/:id", async (req: Request, res: Response) => {
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

    const [product] = await db("products").where({id: idToEdit})

    if (!product){
      res.status(400)
      throw new Error("produto não encontrado")
    }

    if (product) {
      const updatedProduct = {
        id : newId || product.id,
        name : newName || product.name,
        price : newPrice || product.price,
        category : newCategory || product.category
      }

      await db("users").update(updatedProduct).where({id: idToEdit})
    }

    res.status(200).send({ message: "produto atualizado com sucesso!" })
  } catch (error) {

    console.log(error)
    res.status(400).send(error.message)
  }

})