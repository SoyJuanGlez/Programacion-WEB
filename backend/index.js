const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://root:h9hoQKh3uM0NF1xC@popashoescl.gdj6urs.mongodb.net/?retryWrites=true&w=majority&appName=PopaShoesCL')
.then(() => console.log("MongoDB Conectado"))
.catch(error => console.log(error.message));

app.use(express.json());
app.use(cors());

const ShoesSchema = new mongoose.Schema({
    nombre: {type: String},
    descripcion: {type: String},
    precio: {type: Number},
    tipo: {type: String},
    color: {type: String},
    imagen: {type: String}
    });

const Shoe = mongoose.model('Shoe', ShoesSchema);

app.get('/', (req, res) => {
    res.json({
        message: "Bienvenido"
    });
});

app.get('/searchShoes', async (req, res) => {
    try {
        const searchQuery = req.query.q || '';
        const regex = new RegExp('^' + searchQuery, 'i'); 
        const results = await Shoe.find({ nombre: regex });

        res.status(200).json({
            message: "Resultados encontrados",
            shoes: results
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al buscar productos",
            error: error
        });
    }
});

app.get('/getShoes', async (req, res) => {
    try {
        const shoes = await Shoe.find();

        return res.status(200).json({
            message: "Productos obtenidos con éxito.",
            shoes: shoes
        });
    } catch(error) {
        return res.status(500).json({
            message: "Error al consultar Productos.",
            error: error
        });
    }
});

app.post('/newShoes', async (req, res) => {
    try {
        const {nombre, descripcion, precio, tipo, color, imagen} = req.body;
        const newShoe = new Shoe({nombre, descripcion, precio, tipo, color, imagen});

        await newShoe.save();
        
        return res.status(200).json({
            message: "Producto creado con éxito."
        });
    } catch(error) {
        return res.status(500).json({
            message: "Error al crear Producto.",
            error: error
        });
    }
});

app.put('/updateShoes/:shoeId', async (req, res) => {
    try {
        const shoeId = req.params.shoeId;
        const newData = req.body;
        const updateShoe = await Shoe.findByIdAndUpdate(shoeId, newData);

        return res.status(200).json({
            message: "Producto actualizado con éxito.",
            tenis: updateShoe
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error al actualizar Producto.",
            error: error
        });
    }
});

app.delete('/deleteShoes/:shoeId', async (req, res) => {
    try {
        const shoeId = req.params.shoeId;
        
        await Shoe.findByIdAndDelete(shoeId);
        return res.status(200).json({
            message: "Producto eliminado con éxito."
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error al eliminar Producto.",
            error: error
        });
    }
});

app.get('/api/tenis', async (req, res) => {
    try {
        const search = req.query.search || '';
        const tenis = await Shoe.find({
            nombre: { $regex: search, $options: 'i' }
        });
        res.json(tenis);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar tenis.", error });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
