const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'videos',
        resource_type: 'video',
        public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0]
    }
});

const uploadVideo = multer({ storage });

module.exports = uploadVideo;
