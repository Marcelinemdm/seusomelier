const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const heicConvert = require('heic-convert');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

async function convertImage(inputPath, outputPath, format) {
    const ext = path.extname(inputPath).toLowerCase();
    if (ext === '.heic') {
    const inputBuffer = fs.readFileSync(inputPath);
    const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: 'JPEG'
    });
    await sharp(outputBuffer)
        .toFormat(format)
        .toFile(outputPath);
    } else {
    await sharp(inputPath)
        .toFormat(format)
        .toFile(outputPath);
    }
}

app.post('/upload', upload.single('image'), async (req, res) => {
    const inputPath = req.file.path;
    const format = req.body.format || 'jpeg';
    const outputPath = `uploads/converted.${format}`;

    try {
    await convertImage(inputPath, outputPath, format);
    res.download(outputPath, err => {
        if (err) {
        console.error(err);
        }
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
    });
    } catch (err) {
    console.error(err);
    res.status(500).send('Error during conversion');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
