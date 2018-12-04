# ng-web-worker
Web Worker generator service for Angular.

I wanted to create a web worker for Angular without ejecting my entire app! This service will create a Promise, generating a blob that runs any JS function you pass into it.

-

Included is a sample for HTTP GET (w/ a hardcoded token header that I needed for my purposes 😱). This one returns as an Observable!
Usage example:
new HttpWorker().get(url, token).subscribe((response) => { console.log(response); });