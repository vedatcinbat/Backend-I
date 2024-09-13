const express = require('express');
const app = express();

const port = 3000;

// Fake Data
const users = [
    { id: 1, name: 'John Doe', email: 'johndoe@gmail.com', age: 25},
    { id: 2, name: 'Jane Doe', email: 'janedoe@gmail.com', age: 21},
    { id: 3, name: 'Vedat Cinbat'}
]

const products = [
    {id: 1, productName: 'Iphone 12', category: 'Electronics', price: 20000},
    {id: 2, productName: 'Man Jeans', category: 'Clothes', price: 1000},
    {id: 3, productName: 'Bed', category: 'Furniture', price: 50000},
]

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Time ${new Date()}`);
    next();
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/api/users', (req, res) => {
    res.json({
        message: 'List of users',
        status: 200,
        data: users
    })
})

app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    console.log(`User id: ${id}`);
    const user = users.find(user => user.id === parseInt(id));
    console.log(user);

    if(!user){
        return res.status(404).json({
            message: `User not found with id: ${id}`,
            status: 404
        })
    }

    return res.status(200).json({
        message: 'User found',
        status: 200,
        data: user
    })
})

app.get('/api/data', (req, res) => {
    res.json({
        message: 'Hello API',
        success: true,
        status: 200
    })
})


app.get('/api/products', (req, res) => {
    const productCategory = req.query.category;
    const minProductPrice = req.query.minPrice;
    const maxProductPrice = req.query.maxPrice;

    const allProducts = products;

    if(productCategory) {
        allProducts = allProducts.filter(p => p.category.toLowerCase() === productCategory.toLowerCase())
    }

    if(minProductPrice) {
        allProducts = allProducts.filter(p => p.price >= parseInt(minProductPrice))
    }

    if(maxProductPrice) {
        allProducts = allProducts.filter(p => p.price <= parseInt(maxProductPrice))
    }

    res.json({
        message: 'List of products',
        status: 200,
        data: allProducts
    })
})

app.post('/', (req, res) => {
    res.send('Got a POST request');
})

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})