import pool from '../configs/connectDB';
import multer from 'multer';

let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.render('index.ejs', {dataUser: rows} )
}

let getDetailpage = async (req, res) => {
    let userId = req.params.userId;
    let [user] = await pool.execute('SELECT * FROM users where id = ?',[userId]);
    
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req,res) => {
    let {FirstName, LastName, Email, Address} = req.body;

    await pool.execute('insert into users(FirstName, LastName, Email, Address) values (?, ?, ?, ?)', 
        [FirstName, LastName, Email, Address]);
    return res.redirect('/');
}

let deleteUser = async (req,res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id=?', [userId]);
    return res.redirect('/');
}

let getEditpage = async (req,res) =>{
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM users where id = ?',[id]);

    return res.render('update.ejs', {dataUser: user[0]})
}

let postUpdateuser = async (req,res) =>{
    let {FirstName, LastName, Email, Address, id} = req.body; 
    await pool.execute('update users set FirstName = ?, LastName = ?, Email = ?, Address = ? where id = ?',
        [FirstName, LastName, Email, Address, id]);
    res.redirect('/');
}

let getUploadFile = async (req,res) =>{
    return res.render('uploadFile.ejs')
}

let handleUploadFile = async (req,res) =>{
    // 'profile_pic' is the name of our file input field in the HTML form
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
}

let handleUploadMultipleFiles = async (req,res) =>{
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/img/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);
}

module.exports = {
    getHomepage, getDetailpage, createNewUser, deleteUser, getEditpage, postUpdateuser, getUploadFile, handleUploadFile,
    handleUploadMultipleFiles
}