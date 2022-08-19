
const bcrypt = require("bcryptjs");
const users = []

module.exports = {
    login: (req, res) => {
      //console.log('Logging In User')
      //console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password   === password) {
        const authenticated = bcrypt.compareSync(password, users[i].passwordHash)
          if (authenticated){
            let userToReturn = {...users[i]}
            delete userToReturn.passwordHash
            return res.status(200).send(userToReturn)
          }
        }
         
        }
      
      res.status(400).send("User not found.")
      
    },
    register: (req, res) => {
      const {username, email, firstName,lastName, password } = req.body
      const salt = bcrypt.genSaltSync(10)
      const passwordHash = bcrypt.hashSync(password, salt)
      let user = {
        username,
        email,
        firstName,
        lastName,
        passwordHash
      }
        console.log('Registering User')
        console.log(req.body)
        users.push(user)
        let userToReturn = {...user}
        delete userToReturn.passwordHash
        res.status(200).send(userToReturn)
        
    }
  }
