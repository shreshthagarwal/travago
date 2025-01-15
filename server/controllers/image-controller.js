import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "https://travora-backend.vercel.app";

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once("open", () => {
    // Use "photos" consistently for the bucket name
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "photos"
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

export const uploadImage = (request, response) => {
    if (!request.file) {
        return response.status(400).json({ msg: "File not found" });
    }

    const imageUrl = `${url}/file/${request.file.filename}`;
    return response.status(200).json(imageUrl);
};

export const getImage = async (request, response) => {
    try {
        if (!gfs || !gridfsBucket) {
            return response.status(500).json({ msg: "Server is not connected to file storage" });
        }

        const file = await gfs.files.findOne({ filename: request.params.filename });
        if (!file) {
            return response.status(404).json({ msg: "File not found" });
        }

        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
};
