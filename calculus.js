module.exports.add = (num1 , num2) => {
    return num1 + num2;
}

module.exports.setName = (user, fullName) => {
    var names = fullName.split(' ');
    user.firstName = names[0];
    user.lastName = names[1];
    return user;
  };

module.exports.asyncAdd = (num1 , num2 , callback)=>{
    var add = num1 + num2 ;
    setTimeout(()=>{
        callback(add);
    },1000);
    

}