const path=require('path');
const express=require('express');
const hbs=require('hbs');
const functions=require('./utils/functions');


const app=express();
const port=process.env.PORT||3000;

//Define paths for express config
const publicDir=path.join(__dirname,'../public')
const viewsDir=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

//Set up handlebars location and views location
app.set('view engine','hbs');
app.set('views',viewsDir);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDir))



app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Arijit Deb'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Arijit Deb'
    });
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        helpText: 'This is the help page text',
        name: 'Arijit Deb'
    });
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){

        return res.send({
            error: 'An address must be provided in the query string!!'
        })

    }

    functions.geocode(req.query.address,(error,{location,latitude,longitude}={})=>{
    
        if(error){
            return res.send({error});
        }else{
            functions.forecast(latitude,longitude,(error,{temperature,precipProbability,summary})=>{
                if(error){
                    return res.send({error});
                }else{
                    res.send({
                        location,
                        temperature,
                        precipProbability,
                        summary
                    });
                }
            })
        }
        
    })
})

app.get('*',(req,res)=>{
    res.render('help',{
        title: 'Incorrect Link!!!',
        message: '404 Page not found',
        name: 'Arijit Deb'
    });
})

app.listen(port,()=>{
    console.log('Server is up on port  '+port);
});