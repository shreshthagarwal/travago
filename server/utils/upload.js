import multer from "multer"
import {GridFsStorage} from "multer-gridfs-storage"
import dotenv from "dotenv"
dotenv.config()



const storage = new GridFsStorage({
    url: process.env.URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true }, // Add useUnifiedTopology
    file: (request, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-itenary-${file.originalname}`; // For unsupported types, save as filename
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-itenary-${file.originalname}`,
        };
    }
});

export default multer({ storage });