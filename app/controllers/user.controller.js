const { Schema } = require("mongoose");
const { mongoose } = require("../models");
const db = require("../models")
const User = db.users

//Create a new user

exports.create = (req, res) => {
    //Validate Request
 []
    if (!req.body.name && !req.body.email) {
        res.status(400).send({ message: "name and Email can not be empty" });
        return;
    }

    //create a User
    const user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            aadharNumber: req.body.aadharNumber,
            nationality: req.body.nationality,
            state: req.body.state,
            district: req.body.district,
            zipCode: req.body.zipCode,
            tutorials:req.body.tutorials
        }
    )

    // Save USER in the database
    user.save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating new USER."
            });
        });
};
// Retrieve all Users from the database.


exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    User.find(condition).populate("tutorials")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


// Find all authorised authors
exports.findAllAuthorisedUsers = (req, res) => {
    User.find({ authorised: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving authorised users."
            });
        });
};



//Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id).populate("tutorials")
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error comming with user id=" + id });
        });
}; 

// Find a single User with an emailID
exports.findOne1 = (req, res) => {
    const email = req.params.email;

    User.find({ email: email }).populate("tutorials")
        .then(data => {
            if (!data)
                res.status(404).send({ message: "User does not exist with this emailId " + email });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error comming with user Email=" + email });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).populate("tutorials")
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else res.send({ message: "User has updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Update a user by Patch with Id
exports.update2= (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, { $push: req.body })
    .populate("tutorials")
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else res.send({ message: "User has updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};


//Update an User by the emailid in the request
exports.update1 = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const email = req.params.email;

    User.findOneAndUpdate({email:email}, req.body).populate("tutorials")
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${email}. Maybe User was not found!`
                });
            } else res.send({ message: "User has updated successfully."});
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: "Error comming for this User with email=" + email
            });
        });
};

 // Update a user by Patch through emailId

 exports.update3 = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const email = req.params.email;

    User.findOneAndUpdate({email:email}, { $push: req.body })
    .populate("tutorials")
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${email}. Maybe User was not found!`
                });
            } else res.send({ message: "User has updated successfully."});
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: "Error comming for this User with email=" + email
            });
        });
};



// Delete an User with the particular id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User does not exist!`
                });
            } else {
                res.send({
                    message: "User has deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};
// Delete an User with the particular email in the request
exports.delete1 = (req, res) => {
    const email = req.params.email;

    User.findByIdAndRemove(email, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${email}. Maybe User does not exist!`
                });
            } else {
                res.send({
                    message: "User has deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with email =" + email
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Users have been deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Users from the database."
            });
        });
};
