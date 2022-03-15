const HelperConstant = {
    generateSaltError: "Rounds param must be a number",
    generateSaltNUmber: "is greater than 15,Must be less that 15",
	generateHashError: "Must Provide Password and salt values",
	generateHashPasswordError: "Password must be a string and salt must either be a salt string or a number of rounds"
};

const UserContants = {
	addUserError: "The User cannot be created!",

}

module.exports = {
    helperConstant: HelperConstant,
	userConstant: UserContants,

};
