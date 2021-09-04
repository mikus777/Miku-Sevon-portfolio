
const setAuthenticated = async({session}) => {
    await session.set('authenticated', true);
}

const getAuthenticated = async({session}) => {
    const authenticated = await session.get('authenticated')
    return authenticated
}


const setCurrentUser = async({session},userObj) => {
    setAuthenticated({session});
    await session.set('user', {
        id: userObj.id,
        email: userObj.email
    });
}


const getUserId = async({session}) => {
    const user = await session.get('user');
    if (user) {
        return user.id;
    }
    else return 'anonymous'

}

export {setCurrentUser,getUserId,getAuthenticated}