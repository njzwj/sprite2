var mongo = require('mongo');
var db = mongo.connect('mongodb://localhost/myapp');

var schema = mongo.Schema;
var userSchema = new Schema({
  name:string,
  password:string
});
funtion User(user){
  this->username = user.username;
  this->password = user.password;
}
module.exports = User;
exports.user = db.model('user',userSchema);
