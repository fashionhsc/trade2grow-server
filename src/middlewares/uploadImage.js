const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: req.uploadFolder || 'images',
            resource_type: 'image',
            public_id: Date.now() + '-' + file.originalname.split('.')[0]
        };
    }
});

const uploadImage = multer({ storage });

// middleware to set upload folder dynamically
const setUploadFolder = (folder) => (req, res, next) => {
    req.uploadFolder = folder;
    next();
};

module.exports = { uploadImage, setUploadFolder };
