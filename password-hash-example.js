/* https://www.npmjs.com/package/password-hash */
/* password-hash is a node.js library to simplify use of hashed password */

var passwordHash = require('password-hash');

/*
generate(password, [options])

Generates a hash of the required password argument. Hashing behavior
can be modified with the optional options object:

*  algorithm - A valid cryptographic algorithm for use with the crypto.createHmac function, defaults to 'sha1'.
*  saltLength - The length of the salt that will be generated when the password is hashed, defaults to 8.
*  iterations - The number of times the hashing algorithm should be applied, defaults to 1.

Errors are thrown if:

*  password is not a string
*  options.algorithm is specified but not a valid cryptographic algorithm
*  options.saltLength is specified but not a positive integer
The hashed password will be in the format algorithm$salt$hash.

*/

var hashedPassword = passwordHash.generate('password123');

console.log(hashedPassword); // sha1$3I7HRwy7$cbfdac6008f9cab4083784cbd1874f76618d2a97

/*
verify(password, hashedPassword)
Compares a plain-text password (password) to a hashed password (hashedPassword) and returns a boolean. Both arguments are required.
*/

console.log(passwordHash.verify('password123', hashedPassword)); // true
console.log(passwordHash.verify('Password0', hashedPassword));   // false
/*
isHashed(password)
Check if a password (password) is hashed. Returns a boolean.
*/
console.log(passwordHash.isHashed('password123'));  // false
console.log(passwordHash.isHashed(hashedPassword)); // true
