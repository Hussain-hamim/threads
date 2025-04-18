import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';

const http = httpRouter();

export const doSomething = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();
  console.log('🚀 ~ doSomething ~ data:', data);

  // implementation will be here
  console.log('Doing something... again!');

  switch (type) {
    case 'user.created':
      console.log('User created:', data);
      break;
    case 'user.updated':
      console.log('User updated:', data);
      break;
  }
  return new Response(null, { status: 200 });
});

http.route({
  path: '/clerk-users-webhook',
  method: 'GET',
  handler: doSomething,
});

//https://<your deployment name>.convex.site
// https://perfect-swan-977.convex.site/clerk-users-webhook

export default http;
