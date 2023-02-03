import { TProduct, TUser, CATEGORY } from './types';
import { users, products, purchases } from './database';
import  express, { Request, Response} from 'express'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send({message: "Pong!"})
})

// Get All Users

app.get("/users", (req: Request, res: Response)=>{
  res.status(200).send(users)
})

// Get All Purchases

app.get("/purchases", (req: Request, res: Response)=>{
  res.status(200).send(purchases)
})

//Get All Products 

app.get("/products", (req: Request, res: Response)=>{
  res.status(200).send(products)
})

// Get Product by id

app.get("/products/:id", (req: Request, res: Response)=>{
  const id = req.params.id as string

  const product = products.find((product)=> product.id === id) 

  res.status(200).send(product)
})

// Get User Purchases by User id

app.get("/users/:id/purchases", (req: Request, res: Response)=>{
  const id = req.params.id as string

  const userPurchases = purchases.filter((purchase)=> purchase.userId === id) 

  res.status(200).send(userPurchases)
})

// Search Product by name

app.get("/products/search", (req: Request, res: Response)=>{
  const q = req.query.q as string

  const result: TProduct[] = products
  .filter((product) => (product.name.toLowerCase().replace(/ /g,'')).includes(q.toLowerCase()))

  res.status(200).send(result)
})


// Create User 

app.post("/users", (req: Request, res: Response)=>{

  const newUser = {
   id: req.body.id,
   email: req.body.email,
   password: req.body.password
  }

  users.push(newUser)
  res.status(201).send({message: "usuario cadastrado com sucesso!"})
})

// Create Product

app.post("/products", (req: Request, res: Response)=>{

  const newProduct = {
   id: req.body.id,
   name: req.body.name,
   price: req.body.price,
   category: req.body.category 
  }

  products.push(newProduct)
  res.status(201).send({message: "produto cadastrado com sucesso!"})
})

// Create Purchase

app.post("/purchases", (req: Request, res: Response)=>{

  const newPurchase = {
   userId: req.body.userId,
   productId: req.body.productId,
   quantity: req.body.quantity,
   totalPrice: req.body.totalPrice 
  }

  purchases.push(newPurchase)
  res.status(201).send({message: "Compra realizada com sucesso!"})
})

// Delete User by id

app.delete("/users/:id", (req: Request, res: Response)=>{
  const idToDelete = req.params.id

  const userIndex = users.findIndex((user)=> user.id === idToDelete)

  if(userIndex >= 0){
    users.splice(userIndex, 1)
  }

  res.status(201).send({message: "usuario deletado com sucesso!"})
})

// Delete Product by id

app.delete("/products/:id", (req: Request, res: Response)=>{
  const idToDelete = req.params.id

  const productIndex = products.findIndex((product)=> product.id === idToDelete)

  if(productIndex >= 0){
    products.slice(productIndex, 1)
  }

  res.status(201).send({message: "produto deletado com sucesso!"})
})


// Edit Product by id

app.put("/users/:id", (req: Request, res: Response)=>{
  const idToEdit = req.params.id

  const newId = req.body.id 
  const newEmail = req.body.email
  const newPassword = req.body.password  

  const user = users.find((user)=> user.id === idToEdit)

  if(user){
    user.id = newId || user.id
    user.email = newEmail || user.email
    user.password = newPassword || user.password
  }

  res.status(200).send({message: "cadastro atualizado com sucesso!"})
})

// Edit Product by id

app.put("/products/:id", (req: Request, res: Response)=>{
  const idToEdit = req.params.id

  const newId = req.body.id
  const newName = req.body.name
  const newPrice = req.body.price
  const newCategory = req.body.category

  const product = products.find((product)=> product.id === idToEdit)

  if(product){
    product.id = newId || product.id
    product.name = newName || product.name
    product.price = newPrice || product.price
    product.category = newCategory || product.category
  }

  res.status(200).send({message: "produto atualizado com sucesso!"})
})