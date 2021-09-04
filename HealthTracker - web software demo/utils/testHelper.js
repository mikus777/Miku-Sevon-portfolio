
import {superoak} from "../deps.js"
import {app} from "../app.js"
import {randomEmail,randomPassword} from "../utils/random.js"

const testLogin = async() => {
    const email = await randomEmail(8);
    const password = await randomPassword(6);
    const testClient1 = await superoak(app)
    const testClient2 = await superoak(app);
    await testClient1.post('/auth/registration').send('email='+email).send('password='+password).send('verification='+password);
    
    return await testClient2.post('/auth/login').send('email='+email).send('password='+password)
    
}

export{testLogin}