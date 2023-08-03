const request = require("request")

const geocode = (address , callback ) =>{
const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYmFyZGFuIiwiYSI6ImNsaGlwMmN1czBhNDYzZ216eXdxajVuM2gifQ.90Trc0foBU4ETKInnTwz6Q"


request ({url:geocodeUrl , json:true} , (error ,res) =>{
    if(error){
        callback ("unable to connect geo service" , undefined)
        // console.log("unable to connect geo service") // low level error
    }else if(res.body.message){
        callback (res.body.message , undefined)
        // console.log(res.body.message)
    }else if(res.body.features.length == 0){
        callback("unable to find location" , undefined)
        // console.log("unable to find location") 
    }else {
       callback(undefined,{
        longtitude : res.body.features[0].center[0],
        latitude : res.body.features[0].center[1]
         })
    }
})
}
module.exports= geocode
