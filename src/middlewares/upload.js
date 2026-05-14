const multer = require('multer');

const cloudinary = require('../config/cloudinary.js');

const CloudinaryStorage = 
   require('multer.storage.cloudinary').CloudinaryStorage;

   const storage = new CloudinaryStorage({
    cloudinary,
    params = 'uploads',   
   });

   const upload = multer({ 
        storage,
       });

module.exports = upload;