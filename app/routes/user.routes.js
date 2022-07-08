module.exports = app => {
    const users = require("../controllers/user.controller.js")

    const router = require("express").Router()

    //create a new user

    router.post("/", users.create)

    // Access All Users
    router.get("/", users.findAll)


    //Retrieve All authorised users

    router.get("/authorised", users.findAllAuthorisedUsers)

    // Retrieve a single user with id
    router.get("/:id", users.findOne)

    // Retrieve a single user with emailId
    router.get("/email/:email", users.findOne1)

    // Update a users with id
    router.put("/:id", users.update)
    // Update a users with email
    router.put("/email/:email", users.update1)

    // Update a user by Patch with Id
    router.patch("/:id",users.update2)
    
    // Update a user by Patch through emailId

    router.patch("/email/:email",users.update3)
    // Find Todo List with Email Id

    router.get("/tutorials/:email",)
    // Delete an user with id
    router.delete("/:id", users.delete)

    // Delete an user with email
    router.delete("/:email", users.delete1)


    // Delete all Users from the database
    router.delete("/", users.deleteAll)

    app.use("/api/users", router)


}