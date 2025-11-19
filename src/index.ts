import { Router, Request, Response } from 'express';

const router: Router = Router();
//realizar el let de los productos
let products = [
    {id: 1, name: "Laptop", price: 3500, category: "electronics"},
    {id: 2, name: "Keyboard", price: 150, category: "electronics"},
    {id: 3, name: "Shirt", price: 80, category: "clothing"},
    {id: 4, name: "Book", price: 40, category:"books"}
]

router.get("/products", (req, res) => {
    let { category, minPrice, maxPrice } = req.query;
    let filtered = [...products];
    if (minPrice !== undefined && isNaN(minPrice)) {
        return res.status(400).json({ error: "minPrice must be a number" });
    }
    if (maxPrice !==undefined && isNaN(maxPrice)) {
        return res.status(400).json({ error: "maxPrice must be a number" });
    }

    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }

    if (minPrice) {
        filtered = filtered.filter(p => p.price <= Number(minPrice));
    }

    if (maxPrice) {
        filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    res.json(filtered);
});

router.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if(!product) {
        return res.status(404).json({ error: "Product not found"});
    }

    res.json(product);
});

router.post("/products", (req, res) => {
    const { name, price, category } = req.body;
    if(!name || !price || !category) {
        return res.status(400).json({ error: "All fields are required"});
    };
    const newId = products.length > 0 ? products[products.length -1].id + 1 : 1;
    const nexProduct = {
        id: newId,
        name,
        price,
        category
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product created",
        data: newProduct
    });

router.put("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
    return res.status(404).json({ error: "Product not found" });
    }

    const { name, price, category } = req.body;

// Solo actualizamos lo que envían
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;

    res.json({ message: "Product updated", data: product });
});

router.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Product not found" });
    }

    products.splice(index, 1);

    res.json({ message: "Product deleted" });
});


});