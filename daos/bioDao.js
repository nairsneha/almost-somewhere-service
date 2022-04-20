import bioModel from '../models/bioModel.js'

/**
 * Create a user with the userBio object having all params.
 * It calls the create method of mongo to crate a new collection for user.
 * @param userBio the object of the bio to be created.
 */
const createUserBio = async userBio => bioModel.create( userBio );

/**
 * Updtates the bio of the user with the given username.
 * @param userBio the bio object with the new params for the given username.
 */
const updateUserBio = async userBio => bioModel.updateOne({username:userBio.username},{$set:{
        "firstname": userBio.firstname,
        "lastname":userBio.lastname,
        "gender": userBio.gender,
        "age": userBio.age,
        "favorites": userBio.favorites,
        "followers": userBio.followers,
        "following": userBio.following
    }
});

/**
 * Retrieves the bio of the user with the given username. Uses the findOne method to retrieve the
 * unique collection with the username.
 * @param username the username whose record is to be retrieved.
 */
const getUserBio = async username => bioModel.findOne({username:username});

const bioDao = {
    createUserBio: createUserBio,
    updateUserBio: updateUserBio,
    getUserBio: getUserBio
};

export default bioDao;
