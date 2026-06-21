// CloudFront Function (runtime cloudfront-js-2.0), associated as viewer-request on the
// wildcard distribution. Maps `<slug>.companydossier.lol` → S3 key prefix `/<slug>/…`
// and serves index.html for directory-style requests. Deployed as `cd-subdomain-router`.
function handler(event) {
  var req = event.request;
  var host = (req.headers.host && req.headers.host.value) || '';
  var label = host.split('.')[0].toLowerCase();
  var reserved = { www: 1, api: 1, admin: 1, app: 1, assets: 1, cdn: 1, static: 1, mail: 1, status: 1, _dmarc: 1 };
  if (!label || reserved[label]) { label = '_home'; }
  var uri = req.uri;
  if (uri.endsWith('/')) uri += 'index.html';
  else if (uri.lastIndexOf('.') < uri.lastIndexOf('/')) uri += '/index.html';
  req.uri = '/' + label + uri;
  return req;
}
