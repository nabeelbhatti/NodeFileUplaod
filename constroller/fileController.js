import multer from "multer";
import File from "../model/filemodel.js";
import path from "path";

const __dirname = path.resolve()
const multerStorage  = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads')
    }, 
    filename: (req, file, cd) => {
        const ext = file.mimetype.split('/')[1]
        cd(null, `file-${req.body.name}-${Date.now()}.${ext}`)
    }
})

const upload = multer({
    storage: multerStorage
})

const uploadfileMiddleware = upload.single('file')
const uploadFile = async (req, res) =>{
   const filename = req.file.filename
   req.body.path = filename
   console.log(req.body)
   const newTour = await File.create(req.body)
   console.log(filename)
    res.status(200).json({
        status: 'success'
    })
}

const getfile = (req, res) => {
   
    res.sendFile(`uploads/${req.params.id}`, { root: __dirname })
}

const fileController = {
    uploadFile,
    getfile,
    uploadfileMiddleware
}

export default fileController