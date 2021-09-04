

const logOut = async({session,response}) => {
    await session.set('authenticated', false);
    await session.set('user', {
        id: "",
        email: ""
    });
    response.redirect('/');
}

export {logOut}