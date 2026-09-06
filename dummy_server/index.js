import express from "express"
import {readFile} from "fs/promises"
const app = express()
const port = 3030

const readCategories = async () => {
    const result = await readFile("./categories.json", "utf8")
    return JSON.parse(result)
}

const readUsers = async () => {
    const result = await readFile("./users.json", "utf8")
    return JSON.parse(result)
}

let categories = await readCategories()
let users = await readUsers()

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



// Categories
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


// Users

app.get("/users", (req, res) => {

    const {roles, name, email, searchTerm} = req.query
    let result = users
    if (roles) {
        result = result.filter(r => r.role === roles || roles.includes(r.role))
    }

    if(name) result = result.filter(r => r.fullName.toLowerCase().includes(name.toLowerCase()))
    if(email) result = result.filter(r => r.email.includes(email))
    if (searchTerm) result = result.filter(r => r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || r.email.includes(searchTerm))
        console.log(searchTerm)
    res.send(result)
})

app.post("/set-user-role", (req,res) => {
    const {id, role} = req.query
    const user = users.find(u => u.userId === id)
    user.role = role
    res.send(200)
})

app.post("/users", (req, res) => {
    const {ids, status} = req.query
    users.forEach(u => {
        if(ids.includes(u.userId)) {
            u.status = status === "false" ? false : true
        }
    });

    res.send("ok")

})

app.post("/user", (req, res) => {
    const {id} = req.query
    console.log(id)
    users.forEach(u => {
        if(u.userId === id) {
            u.status = !u.status
        }
    });

    res.send("ok")

})

app.listen(port, "0.0.0.0")