const express = require('express');
const multer = require('multer');
const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, __dirname + '/uploads/images'); },
  filename: (req, file, cb) => { cb(null, Date.now() + "-" + Math.floor(Math.random() * 1000) + "." + (file.originalname.split('.').pop())); }
});
//if you want to make file filtir :D
const fileFilter = (req, file, cb) => { cb(null, (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') ? true : false); }
const upload = multer({ storage: storage});

app.post('/upload', upload.single('file'), (req, res) => {
    console.log("triggered");
    try {
        return res.status(201).json({ status: true, message: 'File uploded.'});
    } catch (error) {
        res.status(404).json({ status: false, message: 'File can\'t uploded.' + error});
    }
})

app.listen(4707, () => console.log(`Listening port 4707!`));
