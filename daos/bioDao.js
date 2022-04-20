import bioModel from '../models/bioModel.js'

const createUserBio = async userBio => bioModel.create( userBio );
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
const getUserBio = async username => bioModel.findOne({username:username});

const bioDao = {
    createUserBio: createUserBio,
    updateUserBio: updateUserBio,
    getUserBio: getUserBio
};

export default bioDao;
