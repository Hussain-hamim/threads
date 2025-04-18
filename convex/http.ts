import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';

const http = httpRouter();

export const doSomething = httpAction(async () => {
  // implementation will be here
  console.log('Doing something... again!');
  return new Response();
});

http.route({
  path: '/clerk-users-webhook',
  method: 'GET',
  handler: doSomething,
});

//https://<your deployment name>.convex.site
// https://perfect-swan-977.convex.site/clerk-users-webhook

export default http;
