const bcrypt = require('bcrypt')
class Helper {
    static hashing(password,salt){
        return bcrypt.hashSync(password,salt)
    }
    static genSalt(){
       return bcrypt.genSaltSync(10) 
    }
    static compare(plaintext,hash){
        return bcrypt.compareSync(plaintext, hash)
    }
}

module.exports = Helper