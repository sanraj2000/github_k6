/*import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  duration: '1m',
  vus: 50,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  sleep(1);
}*/
import http from 'k6/http';
import encoding from 'k6/encoding';
import { check } from 'k6';
const username  = 'vmm';
const password = 'Test@123';
export default function () {
  const credentials = `${username}:${password}`;
  const encodedCredentials = encoding.b64encode(credentials);
  const options = {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      Accept : `application/json`,
      // 'x-Gateway-APIKey':`c46559ed-5e5c-48f4-ad6b-1c36a51e8b76`,
    },
  };
 const apikeyoptions = {
    headers: {
      'x-Gateway-APIKey':`432a619e-9bd6-43d5-9f93-2b823d6186ca`,
         Authorization: `Basic ${encodedCredentials}`,
      Accept : `application/json`

    },
  };
  const apikeyoptions5kb = {
    headers: {
      'x-Gateway-APIKey':`e679df76-25fb-4727-8668-2e343f5d1767`,
         Authorization: `Basic ${encodedCredentials}`,
      Accept : `application/json`

    },
  };

/*  let invocationreq = http.post('http://devrealm1.apigw-aw-us.webmethods-dev.io/gateway/echo/5kb/5kb', apikeyoptions5kb);
  check(invocationreq, {
      'status is 200': (r) => r.status === 200

       });*/



  let invocationreq = http.get('http://devrealm1.apigw-aw-us.webmethods-dev.io/gateway/Petstore/1.0.6/pet/findByStatus?status=sold', apikeyoptions);
check(invocationreq, {
    'status is 200': (r) => r.status === 200

  });
  
   let req = http.get('https://devrealm1.apigw-aw-us.webmethods-dev.io/gateway/echo/1kb/1kb',options);
    check(req, {
    'status is 200': (r) => r.status === 200
    // 'status is 401': (r) => r.status === 401

  });

   let req1 = http.post('https://devrealm1.apigw-aw-us.webmethods-dev.io/gateway/echo/10kb/10kb',options);
    check(req1, {
   // 'status is 200': (r) => r.status === 200
     'status is 401': (r) => r.status === 401
    //
       });

}



