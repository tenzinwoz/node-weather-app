const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//set up handlebars and view engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//set up static directory
app.use(express.static(publicDirectoryPath));


app.get('', (req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Tenzin woeser"
    });
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:"About me",
        name:"Tenzin woeser"
    })
});

app.get('/help', (req,res)=>{
    res.render('help',{
        helpText:"Please help me. I am lost",
        title:"Help",
        name:"Tenzin woeser"
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return(
            res.send({
                error:"Unable to find the location!"
            })
        )
    }

    geocode(req.query.address, (error, {longtitude,latitude,Location} = {})=>{
        if(error){
            return
            console.log(error);
        }
         forecast(latitude,longtitude, (error, forecastData)=>{
             if(error){
                 return
                 res.send({error})
             }
            res.send({
                forecast:forecastData,
                location:Location,
                address:req.query.address
            })
         })
    })
 
});

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:"Page not found",
        errorMessage:"Help article not found",
        name:"Tenzin woeser"
    })
});

app.get('/products', (req,res)=>{
    if(!req.query.product){
        return(
            res.send({
                error:"You must provide product name"
            })
        )
    }
    res.send({
      products:[]
    });
});


app.get('*', (req,res)=>{
    res.render('404',{
        title:"Page not found",
        errorMessage:"404. Page not found",
        name:"Tenzin woeser"
    })
})

app.listen(3000, (error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("Server is runnig on port 3000");
    }
})