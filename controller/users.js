const Person = require('../models/users');

const getAllUsers = async (req, res, next) => {
    try{
        const allUsers = await Person.find().exec();
        res.json({users: allUsers});
    }catch(err){
        res.send(err);
    }
    res.json({Users: allUsers});
}

const createUsers = async (req, res, next) => {
    console.log(req.body);
    const { name, email, password, address} = req.body;
    const newPerson = new Person({
        name,
        email,
        password,
        address
    });
    try {
        await newPerson.save();
    }catch(err){
        return next(err);
    }

    res.json({person: newPerson});


}

exports.getAllUsers = getAllUsers;
exports.createUsers = createUsers;