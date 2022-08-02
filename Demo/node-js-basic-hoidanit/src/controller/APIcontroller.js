import pool from '../configs/connectDB';

let getAllUsers = async (req,res) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM users');
}

let createUser = async (req,res) =>{
    let {FirstName, LastName, Email, Address} = req.body;
    if(!FirstName || !LastName || !Email || !Address){
        return res.status(200).json({
            message:'missing required params'
        })
    }
    await pool.execute('insert into users(FirstName, LastName, Email, Address) values (?, ?, ?, ?)', 
        [FirstName, LastName, Email, Address]);

    return res.status(200).json({
        message:'ok'
    })
}

let deleteUser = async (req,res) =>{
    let userId = req.params.id;
    if (!userId){
        return res.status(200).json({
            message:'missing required params'
        })
    }
    await pool.execute('delete from users where id=?', [userId]);
    return res.status(200).json({
        message:'ok'
    })
}

let updateUser = async (req,res) =>{
    let {FirstName, LastName, Email, Address, id} = req.body; 
    if(!FirstName || !LastName || !Email || !Address || !id){
        return res.status(200).json({
            message:'missing required params'
        })
    }

    await pool.execute('update users set FirstName = ?, LastName = ?, Email = ?, Address = ? where id = ?',
        [FirstName, LastName, Email, Address, id]);
        return res.status(200).json({
            message:'ok'
        })
}

module.exports = {
    getAllUsers, createUser, deleteUser, updateUser
}