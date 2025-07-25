const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;