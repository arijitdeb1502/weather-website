const request=require('request');

const forecast = (latitude,longitude,callback)=>{
    const url=`https://api.darksky.net/forecast/e6fa205e2cebd31363b5b65345d4d489/${latitude},${longitude}?units=si`;

    request({ url: url , json: true},(error,response)=>{
    
        if(error){
            callback('Unable to connect to weather service!!',undefined);
        } 
        else if(response.body.error){
            callback('Unable to find weather!!!',undefined);
        }
        else {
            const temperature=response.body.currently.temperature;
            const precipProbability=response.body.currently.precipProbability;
            const summary=response.body.daily.data[0].summary;
        
            callback(undefined,{
                temperature,
                precipProbability,
                summary
            });
        }
        
    })
}


const geocode = (location,callback)=>{

    const geoCodeUrl=`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYXJpaml0ZGViMTUwMiIsImEiOiJjazBzb2c5NmgwNHVnM2JwcmgwNHVubnB5In0.NFfiyqL5hLA43oA8GbMUYQ&limit=1`;
    
    request({ url: geoCodeUrl , json: true},(error,response)=>{
 
        if(error){
           
            callback('Unable to connect to geocode service!!',undefined);

        } 
        else if(response.body.features.length === 0){
            callback('Unable to find location!!!',undefined);
        }
        else{
            const latitude=response.body.features[0].center[1]||undefined;
            const longitude=response.body.features[0].center[0]||undefined;   
            callback(undefined,{location,latitude,longitude});
        }
    
    })

}


module.exports = {
    forecast: forecast,
    geocode: geocode
}