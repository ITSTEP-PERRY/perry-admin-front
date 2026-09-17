import express from "express"
import fileUpload from "express-fileupload"
import {readFile, writeFile} from "fs/promises"
import bodyParser from "body-parser"


const app = express()
const port = 3030

const readCategories = async () => {
    const result = await readFile("./categories.json", "utf8")
    return JSON.parse(result)
}

const writeCategories = async (data) => {
    data = JSON.stringify(data)
    await writeFile("./categories.json", data, "utf8")
}

const readUsers = async () => {
    const result = await readFile("./users.json", "utf8")
    return JSON.parse(result)
}

const readProducts = async () => {
    const result = await readFile("./products.json", "utf8")
    let res = JSON.parse(result)
    const imagePath = "./uploads/image.png"
    const imageBuffer = await readFile(imagePath);
    const base64Image = imageBuffer.toString('base64');
    res = res.map(r => ({
        ...r,
        imageUrl: `data:image/jpeg;base64,${base64Image}`
    }))
    return res
}
const readOrders = async () => {
    const result = await readFile("./orders.json", "utf8")
    return JSON.parse(result)

}
let categories = await readCategories()
let users = await readUsers()
let products = await readProducts()
let orders = await readOrders()

const findCategory = async (id, categories) => {
    for (const cat of categories) {
        if(cat.id === id){
                return cat
            }
        const res = await findCategory(id, cat.subCategories)
        if (res) return res
    }
}

const addCategory = (data, categories) => {
    if(data.id === "undefined") data.id = `${Date.now()}`
    if (!data.parentCategoryId) {
        categories.push(data)
        return
    }
    
    for (const cat of categories) {
        if (data.parentCategoryId == cat.id){
            if (!cat.subCategories){
                cat.subCategories = [data]
            }else
            {
                cat.subCategories.push(data)
            }
            return
        }

        addCategory(data, cat.subCategories)
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

// app.use(express.json());
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }))
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

app.post("/category-create",  async (req, res) => {

    const data = req.body
    if (data.id !== "undefined") {
        let cat = await findCategory(data.id, categories)
        for (const [k,v] of Object.entries(data)) {
            cat[k] = v
        }

    }else{
        addCategory(data, categories)
    }

    // await writeCategories(categories)

    if (req.files && Object.keys(req.files).length !== 0) {
        const uploadedFile = req.files.uploadedFile;

        const uploadPath = `./uploads/${uploadedFile.name}`


        uploadedFile.mv(uploadPath, function (err) {
        if (err) {
            console.log(err);
            res.send("Failed !!");
        } else res.send("Successfully Uploaded !!");
        });
    } else res.send("No file uploaded !!");
})

app.get("/category-by-id", async (req, res) => {
    const {id} = req.query
    const result = await findCategory(id, categories)
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
    console.log(ids)

    users.forEach(u => {
        if(ids.includes(u.userId)) {
            u.status = status === "false" ? false : true
        }
    });

    res.send("ok")

})


// priducts

app.get("/products", (req, res) => {
    const {categoryId} = req.query

    if(categoryId) {
        console.log("products", categoryId)

        // products = products.filter(p => p.categoryId === categoryId)
        // console.log(products)
    }
    res.send(products)
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

app.get("/orders", (req,res)  => {
    console.log("te")
    res.send(orders)
})

app.listen(port, "0.0.0.0")