let form = document.getElementById("frm1")
form.addEventListener('submit' , (e) =>{
    e.preventDefault()
    console.log(document.getElementById("inp1").value)
    weatherfunc()
    form.reset()
})


const errorf = document.getElementById("error")
const locationf = document.getElementById("location")
const weatherf = document.getElementById("weather")
const latitude = document.getElementById("latitude")
const longtitude = document.getElementById("longtitude")

let weatherfunc = async ()=>{
    try {
        const address = document.getElementById("inp1").value
        const res = await fetch("http://localhost:5000/weather?address="+address)
        const data =await res.json()
        console.log(data)
        if (data.error){
            errorf.innerText = data.error
            locationf.innerText = ""
            weatherf.innerText = ""
            latitude.innerText = ""
            longtitude.innerText = ""
        }else{
            setTimeout(() => {
                 locationf.innerText = (`your Location is : ${data.location}`) 
                }, 500);
           setTimeout(() => {
            weatherf.innerText = (`your Weather is : ${data.weatherforcost}`) 
           }, 1000); 
           setTimeout(() => {
            latitude.innerText = (`your longtitude : ${data.latitude}`) 
           }, 1500); 
           setTimeout(() => {
            longtitude.innerText = (`your longtitude : ${data.longtitude}`) 
           }, 2000); 
            errorf.innerText = ""
           
        }

    } catch (e) {
        console.log(e)
    }
}