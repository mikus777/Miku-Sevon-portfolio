

const emailController = async({session}) => {
    const user = await session.get('user')
    return user.email
}

export {emailController}