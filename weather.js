
const request = require("request")

const forCast = (latitude,longtitude , callback) =>{

const url = "https://api.weatherapi.com/v1/current.json?key=d04381e17b42413bb2f160026232007&q=" + latitude +"," + longtitude

request({url,json : true}, (error,res) =>{
    // url here is short hand for key an value for the object
    // json : true convert json data to object 
    // console.log(res.body)

    // const data1 = JSON.parse(res.body)
    // console.log(data1)
    // console.log(res.body.location.name)
    // console.log(res.body.current.condition.text)

    if (error){
        callback ("cant connect to the web" ,undefined)
        // console.log("error has occured")
    }else if (res.body.error){
        callback(res.body.error.message , undefined)
        // console.log(res.body.error.message)
    }else {
        callback (undefined, res.body.location.tz_id +" its " + res.body.current.condition.text
         + " and  tempreture is :" + res.body.current.temp_c)
       
    }

})}

module.exports= forCast
