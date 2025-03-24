const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Controller = require('../controllers/imagecontrollers');

const router = express.Router();

router.post("/upload", upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const result = await Controller.onNewImages(file.path);
        res.send(result);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

router.delete("/delete/:imageId", async (req, res) => {
    try {
        const imageId = req.params.imageId;
        const result = await Controller.onDeleteImages(imageId);
        res.send(result);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

router.get("/list", async (req, res) => {
    try {
        const result = await Controller.onListImages();
        res.send(result);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

module.exports = router;
