define([
  // Application.
  "backbone"
],

function(Backbone) {

  return function(method, model, options) {
    options.data = model.soapBase.format(options.data);
    // Default JSON-request options.
    var params = _.extend({
      type:         'POST',
      contentType:  'text/xml',
      dataType:     'xml',
      processData:  false,
      headers: {
        'Authorization': 'Basic YXNtYXJ0bjpudHJhbXNhUGFzcw=='
        //'Authorization': 'Basic ' + btoa('Useragent@ihm.com:password')
      }
    }, options);
    params.data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dto="urn:smartn.gdfsuez.fr:business/dto/"><soapenv:Header/><soapenv:Body>' + options.data + '</soapenv:Body></soapenv:Envelope>';
    return Backbone.sync(method, model, params);
  };

});
