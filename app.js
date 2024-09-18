import express from 'express'
import { getItems, getItem, searchItem, createItem, getCategories, getCategory, getCategoryItem, createCategory, getVolume } from './database.js'



const app = express()
app.use(express.json())

// HANDLE ITEMS

app.get("/items", async (req, res) => {
    const items = await getItems()
    res.send({
        "success": true,
        "code": 200,
        "data": items})
})

app.get("/item/:id", async (req, res) => {
    const id = req.params.id
    const item = await getItem(id)
    const volume = await getVolume(id)
    res.send({
        "success": true,
        "code": 200,
        "data": item,
        "volumes": volume})
})

app.get(["/search/:itm", "/item/search/:itm"] , async (req, res) => {
    const itm = req.params.itm
    const result = await searchItem(itm)
    res.send({
        "success": true,
        "code": 200,
        "data": result})
})

app.post("/items", async (req, res) => {
    const {name, category_id} = req.body
    const item = await createItem(name, category_id)
    res.status(201).send(item)
})

// HANDLE CATEGORY

app.get("/categories", async (req, res) => {
    const id = req.params.id
    const categories = await getCategories(id)
    res.send({
        "success": true,
        "code": 200,
        "data": categories[0]})
})

app.get("/category/:id", async (req, res) => {
    const id = req.params.id
    const category = await getCategory(id)
    const items = await getCategoryItem(id)
    res.send({
        "success": true,
        "code": 200,
        "data": {"category": category[0], items}})
})

app.post("/category", async (req, res) => {
    const {name} = req.body
    const category = await createCategory(name)
    res.status(201).send(category[0])
})

// APP RESPONSE
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, ()=> {
    console.log('Server is running on port 8080')
  })