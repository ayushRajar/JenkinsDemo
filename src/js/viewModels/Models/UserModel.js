define(['ojs/ojmodel'],function(oj){
    const userModel= oj.Model.extend({
        idAttribute:'id',
        urlRoot:'http://localhost:3000/users'
    })
    return userModel;
})