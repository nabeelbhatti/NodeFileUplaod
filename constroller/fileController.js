import multer from "multer";
import File from "../model/filemodel.js";
import path from "path";

const __dirname = path.resolve()
const multerStorage  = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads')
    }, 
    fileFilter : function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.xlsx') {
            return callback(new Error('Only xlsx'))
        }
        callback(null, true)
    },
    filename: (req, file, cd) => {
        console.log(file)
        cd(null , `${file.originalname}`)
    }
})


const upload = multer({
    storage: multerStorage
})
  
const uploadfileMiddleware = upload.single('file')
const uploadFile = async (req, res) =>{
   const filename = req.file.filename
   req.body.path = filename
   const newTour = await File.create(req.body)
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