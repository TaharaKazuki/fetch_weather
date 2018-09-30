const request = require('request');
// const axiosBase = require('axios');
const yargs = require('yargs');

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
})
  .help()
  .alias('help','h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
}, (error, response, body)=>{
  if (error) {
    console.log('Unable to connect to Google servers');
  } else if (body.status === 'ZERO_RESULTS') {
    console.log('Unable to find that address');
  } else if (body.status === 'OK') {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
  }
});

// const axios = axiosBase.create({
//   baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest'
//   },
//   responseType: 'json'
// });
//
// axios.get('?address=1301+lombord+st+philadelphia&key=AIzaSyBwuGjFTphp8wQVD_bWVPN18phg-BNMhOw')
//   .then((res)=>{
//     console.log(res);
//   });


// axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombord+st+philadelphia&key=AIzaSyBwuGjFTphp8wQVD_bWVPN18phg-BNMhOw')
//   .then((res)=>{
//     console.log(JSON.stringify(res.data,undefined,2));
//   });