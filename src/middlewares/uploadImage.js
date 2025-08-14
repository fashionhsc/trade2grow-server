const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'thumbnails',
        resource_type: 'image',
        public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0]
    }
});

const uploadImage = multer({ storage });

module.exports = uploadImage;
