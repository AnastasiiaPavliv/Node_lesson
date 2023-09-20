const fs=require('node:fs')
const path = require("path");


const filePAth = path.join(__dirname, 'test')

fs.readdir(filePAth,{withFileTypes:true},(err, files)=>{
    if (err) {
        throw new Error(err.message)
    }else{
        files.forEach(file=>{
            if (file.isDirectory()){
                console.log(  file.name + ' It is folder')
            }else {
                console.log( file.name + ' It is file')
            }
        })
    }
})

console.log(filePAth)
