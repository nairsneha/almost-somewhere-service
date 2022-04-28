import roles from '../roles.js';

const canAddMods = (user) => (
        user.role === roles.ADMIN
    ); 

export default canAddMods