import roles from '../roles.js';

const canAddMods = (user) => (
        user.role === roles.ADMIN || user.role === roles.MOD
    ); 

export default canAddMods