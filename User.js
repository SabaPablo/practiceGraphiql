class User {
    constructor(args){
        this.name = args.user.name;
        this.lastName = args.user.lastName;
        this.description = args.user.description;
        this.skills = args.user.skills;
        this.url = args.user.url;
    }
};
module.exports = User;
