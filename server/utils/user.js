// class Person{
//     constructor(name,age){
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription(){
//         return `${this.name} is ${this.age} year old`;
//     }
// }

// var me = new Person('amin',32);
// var description = me.getUserDescription();
// console.log(description);
// console.log('this.name',me.name);
// console.log('this.age',me.age);


class Users{
    constructor(){
        this.users= [];
    }
    addUser(id,name,room){
        console.log('addUser is on');
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        console.log('removeUser is on');
       var user = this.getUser(id);
       //console.log(`${}`)
       if(user){
         this.users= this.users.filter((user)=> user.id!=id);
       }
       return user;

    }
    getUser(id){
        console.log('get user is on');
        return this.users.filter((user)=> user.id ==id)[0];// in ye araye barmigardoone age 0 nazanim koel araye ro neshon mide
        // in araye ham 1 meghdar bishtar nadare
    }
    getUserList(room){
        console.log('get room is on');
        var users = this.users.filter((user)=> user.room== room);
        var nameeArray = users.map(user=> user.name);// map miyad user.name ro baraye hameye user haye toye room morede nazar mirize to namearray
        return nameeArray;
    }
}


module.exports = {Users};