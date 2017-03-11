/**
 * Created by juancarlosnavarrete on 3/8/17.
 */
const name = 'abcd++++1';
const pattern = 'd\\+';
const reg = new RegExp(pattern, '');
console.log(name.search(reg));
console.log(name.replace(/\+/g, ' '));
