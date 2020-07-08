const request = require('request');

let geoCodeUrlAddress = "https://api.mapbox.com/geocoding/v5/mapbox.places/ADDRESS.json?access_token=pk.eyJ1IjoiYmFsYTE5ODMiLCJhIjoiY2tieDJyYjY2MGdkczJxbzRnOGg2dXphbyJ9.AFFOzKkWTQRlodd5xEh87Q&limit=1";

const geoCode = (address, callback) => {
    const url = geoCodeUrlAddress.replace('ADDRESS', encodeURIComponent(address));
    setTimeout(() => {
        request({url, json: true}, (error, { body }) => {
            if (error) {                
                callback('Not able to connect to Geo Code Appliation!!', undefined);
            } else if (body.error) {
                callback('Error : ' + response.body.error, undefined);
            } else {
                //var responseData = response.body;
                var features = body.features;
        
                if (features != null && features.length == 0) {                    
                    callback('Invalid location!!', undefined);
                } else {
                    var locationData = features[0];                    
                    const coordinates = {
                        latitude: locationData.center[0],
                        longitude: locationData.center[1],
                        location: features[0].text
                    }
                    callback(undefined, coordinates);
                    
                }        
            }
        })
    }, 0)
}

module.exports=  geoCode