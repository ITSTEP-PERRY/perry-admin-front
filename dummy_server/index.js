import express from "express"
import {readFile} from "fs/promises"
const app = express()
const port = 3030

const readCategories = async () => {
    const result = await readFile("./categories.json", "utf8")
    return JSON.parse(result)
}

let categories = await readCategories()


const findCategory = async (id, categories) => {
    for (const cat of categories) {
        if(cat.id === id){
                return cat
            }
        const res = await findCategory(id, cat.subCategories)
        if (res) return res
    }
}

const deteleCategory = (id, categories) => {
     const filteredCategories = categories.filter(cat => cat.id !== id);
        for (const cat of filteredCategories) {
        if (cat.subCategories && cat.subCategories.length > 0) {
            cat.subCategories = deteleCategory(id, cat.subCategories);
            }
        }
    
        return filteredCategories;
}


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all domains
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow headers
  next();
});


app.get("/categories", async (req, res) => {
    res.send(categories)
})

app.get("/category-by-id", async (req, res) => {
    const {id} = req.query
    const result = await findCategory(id, categories)
    console.log(result)
    res.send(result)
})

app.delete("/category-by-id", async (req, res) => {
    const {id} = req.query
     
    categories = await deteleCategory(id, categories)

    res.send(id)
})

app.listen(port, "0.0.0.0")