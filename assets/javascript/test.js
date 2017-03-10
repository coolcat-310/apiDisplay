/**
 * Created by juancarlosnavarrete on 3/8/17.
 */

// var topics = {
//     people : ["Terry Crews", "puppy", "Eddie Murphy", "Amy WineHouse"],
//
//     addPerson: function (person) {
//         this.people.push(person);
//     },
//     getPeople: function () {
//         return this.people;
//     },
//     removeSpace: function(name){
//         return name.replace(/\s/g, "+");
//     }
// };
//
// topics.addPerson('Juan Navarrete');
// console.log(topics.getPeople());
// console.log(topics.removeSpace('Juan Carlos Navarrete'));

var name = 'abcd++++1';
var pattern = 'd\\+';
var reg = new RegExp(pattern,'');
console.log(name.search(reg));
console.log(name.replace(/\+/g, ' '));
