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