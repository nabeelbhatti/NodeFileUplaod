import readXlsxFile from 'read-excel-file/node'
import User from '../model/userModel.js'
var rowsData = []
// File path.
const extractor = async (file) => {
    await readXlsxFile(`./uploads/${file}`).then((rows) => {
        rows.map((_, index) => {
            if (index > 1) {
                rowsData = [...rowsData, _]
            }
        })
    })
}



const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        // .sort({sheetNo:1})
        res
            .status(200)
            .json({

                status: 'Success',
                users
            })
    } catch (err) {
        res.status(400).json({
            status: 'Fail',
            message: err
        })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({_id:req.params.id})  // IS Equal to = user.findOne({_id: req.params.id})
        res.status(200).json({
            status: 'Success',
            data: {
                user: user
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'Fail',
            message: err
        })
    }

}

const deleteUser = async(req, res) => {
    try {
          await User.findOneAndDelete({_id:req.params.id})  // IS Equal to = user.findOne({_id: req.params.id})
        res.status(200).json({
            status: 'Success',
            
        })
    } catch (err) {
        res.status(404).json({
            status: 'Fail',
            message: err
        })
    }
    
}

const createUser = async (req, res) => {
    await extractor(req.body.file)
    console.log(rowsData)
    try {
        let data = []
        await rowsData.forEach((item, index) => {
            data.push({
                sheetNo: item[0],
                catg: item[1],
                type: item[2],
                size: item[3],
                ownersName: item[4],
                mobileNo: item[5],
                secondMobileNo: item[6],
                thirdMobileNo: item[7],
                plotNo: item[8],
                secNo: item[9],
                communityCenter: item[10],
                refNo: item[11],
                emailId: item[12],
                cnicNo: item[13],
                mem: item[14]

            })
        })
        const user = await User.create(data)
        res.status(200).json({
            success: 'Success',
            user
        })


    } catch (err) {
        res.status(400).json({
            success: 'Fail',
            message: 'InValid Data sent!'
        })
    }
}

const createOneUser = async (req, res) => {
    const {
        sheetNo,
        catg,
        type,
        size,
        ownersName,
        mobileNo,
        secondMobileNo,
        thirdMobileNo,
        plotNo,
        secNo,
        communityCenter,
        refNo,
        emailId,
        cnicNo,
        mem
    } = req.body
    try {
        const user = await User.create({
            sheetNo,
            catg,
            type,
            size,
            ownersName,
            mobileNo,
            secondMobileNo,
            thirdMobileNo,
            plotNo,
            secNo,
            communityCenter,
            refNo,
            emailId,
            cnicNo,
            mem
        })
        res.status(200).json({
            success: 'Success',
            user
        })


    } catch (err) {
        res.status(400).json({
            success: 'Fail',
            message: 'InValid Data sent!'
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).json({
            success: 'Success'
        })
    } catch (err) {
        res.status(200).json({
            success: 'Fail',
            message: err
        })
    }
}

const tourContoller = {
    getUser, getUsers, deleteUser, updateUser, createUser,createOneUser
}

export default tourContoller