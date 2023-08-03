
const request = require("request")
const fs = require("fs")
const weather = require("./weather")
const geocode = require("./geo")
const yargs = require("yargs")
const express = require("express")

const app = express()


const PORT = 5000 // process.env.PORT || 5000

////////// access public andCSS & js
const path = require ("path")
    const publicDirectory =  path.join(__dirname , '/public')
    app.use (express.static (publicDirectory))
////////////////////////////////////////////////////

///////// partials
const hbs = require('hbs');
const prtialsPath = path.join(__dirname , "/partials")
hbs.registerPartials(prtialsPath)
////////////////////////////////////////////////////


app.set('view engine', 'hbs')
const viewsDirectory = path.join (__dirname , "/views" )
      app.set( "views" , viewsDirectory)

// app.get("/" , (req,res)=>{
// res.send("hello")
// })
app.get("/" , (req , res)=>{
    res.render( "index" ,{
        title :"Home Page",
        desc :"please prerss on check weather "
    })
})

app.get("/CountryInfo" , (req , res)=>{
    res.render( "countryinfo" ,{
        title :"weather info",
        CountryName :"Country Name :",
        latitude : "longtitude :",
        longtitude : "longtitude :",
        cweather :"Current Weather :"
    })
})

app.get("/contact" , (req , res)=>{
    res.render( "contact" ,{
        title :"Contact",
        name:"Mahmoud",
        nationality :"syrian:",
        age : "35",
    
    })
})
//////////////////////////////////////
// app.get("/product" , (req,res)=>{
//     console.log(req.query)
//     res.send({
//         name : req.query.name,
//         lastname:req.query.lastname
//     })
// })

app.get("/weather" , (req,res)=>{
    if(!req.query.address){
      return  res.send({
        error: "you must enter country"
      })
    }
    geocode(req.query.address , (error,data)=>{
        if(error){
            return res.send({error})
        }
        weather(data.latitude, data.longtitude , (error,weatherdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                weatherforcost:weatherdata,
                location:req.query.address ,
                latitude:data.latitude,
                longtitude:data.longtitude
            })
        })
    })
})














///////////////////////

app.get("*",(req,res)=>{
    res.send(" 404 page not found")
})
app.listen (PORT , ()=>{
    console.log(`this web work on port ${PORT}`)
})



//  const showdet = (country) => {
//     geocode(country, (error,data)=>{
//         console.log("error:", error)
//     console.log("data:", data)
    
    
//     weather(data.latitude , data.longtitude  , (error,data) =>{
//     console.log("error:", error)
//     console.log("data:", data)
    
//     })
//     })
// }

// showdet("lebanon")

// command   node app  country --cName="germany"
// yargs.command({
//     command:"country",
//     describe:"enter country",
//     builder:{
//         cName:{
//             describe:"counrty name",
//             demandOption : true,
//             type:"string"
//         },
//     },
//     handler:(x)=>{
//         showdet(x.cName)
        
//     }
// })
// yargs.parse()


// for nodemon Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted