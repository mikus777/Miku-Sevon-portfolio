import { send } from '../deps.js';
import { getCurrentTime } from '../services/timeAndDateService.js';
import { getUserId } from '../services/userService.js'
import {getAuthenticated} from '../services/userService.js'

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const requestTimingMiddleware = async({ request }, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${request.method} ${request.url.pathname} - ${ms} ms`);
}

const requestMiddleWare = async({ request,session }, next) => {
  const userId = await getUserId({session});
  const currentTime = await getCurrentTime();
  if (userId) {
    let string = `Current time: ${currentTime}, Method: ${request.method}, Path: ${request.url.pathname}, Current user id: ${userId}`
    console.log(string);
  }
  await next();
}

const checkAuth = async({ request,session, render }, next) => {
  const path = request.url.pathname;
  if (path == "/" || path.split('/')[1] == 'auth' || path.split('/')[1] == 'api') {
    await next();
  } else {
    if (!(await getAuthenticated({session}))) {
      render('notAuthenticated.ejs');
    }
    else {
      await next();
    }
  }
}

const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

export { checkAuth, errorMiddleware, requestTimingMiddleware, serveStaticFilesMiddleware , requestMiddleWare};