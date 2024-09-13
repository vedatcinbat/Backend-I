//const checkAuth = require("./middlewares/checkAuth");

const secretKey = "secretsadfasdfasdfasdf";
const jwt = require("jsonwebtoken");

// Rate lİMİT
const rateLimit = require("express-rate-limit");

const express = require("express");
const app = express();

// Dummy Data
const users = require("./datas/users");
const products = require("./datas/products");
const authenticateToken = require("./middlewares/authenticateToken");

const port = 3000;

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many requests, please try again later",
});

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 3,
    message: "Too many login attempts, please try again later",
});

app.use(limiter);

// Custom Middleware
const customLogger = (req, res, next) => {
  console.log(`Received a ${req.method} request on ${req.url}`);
  next();
};

//app.use(checkAuth);
app.use(express.json());
app.use(customLogger);

app.use((req, res, next) => {
  console.log(`Time ${new Date()}`);
  next();
});

app.post('/api/login', loginLimiter, (req, res) => {
    const {username, password} = req.body;

    if(username === 'admin' && password === 'admin123') {
        const token = jwt.sign({username}, secretKey, {expiresIn: '1h'});
        res.json({token})
    }else {
        res.status(401).json({
            message: 'Invalid Credentials',
            status: 401
        })
    }
})

app.get('/protected', authenticateToken, (req, res) => {
    res.send(`Hello, ${req.user.username}. Welcome to the protected route!`);
})

app.get('/headers', (req, res) => {
    const userAgent = req.headers['user-agent'];
    res.json({
        message: 'User Agent',
        userAgent
    });
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/users", (req, res) => {
  res.json({
    message: "List of users",
    status: 200,
    data: users,
  });
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({
      message: `User not found with id: ${id}`,
      status: 404,
    });
  }

  return res.status(200).json({
    message: "User found",
    status: 200,
    data: user,
  });
});

app.get("/api/data", (req, res) => {
  res.json({
    message: "Hello API",
    success: true,
    status: 200,
  });
});

app.get("/api/products", (req, res) => {
  const productCategory = req.query.category;
  const minProductPrice = req.query.minPrice;
  const maxProductPrice = req.query.maxPrice;

  const allProducts = products;

  if (productCategory) {
    allProducts = allProducts.filter(
      (p) => p.category.toLowerCase() === productCategory.toLowerCase()
    );
  }

  if (minProductPrice) {
    allProducts = allProducts.filter(
      (p) => p.price >= parseInt(minProductPrice)
    );
  }

  if (maxProductPrice) {
    allProducts = allProducts.filter(
      (p) => p.price <= parseInt(maxProductPrice)
    );
  }

  res.json({
    message: "List of products",
    status: 200,
    data: allProducts,
  });
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
