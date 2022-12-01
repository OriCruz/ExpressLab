//require is a built-in function to inlcude external modules that exists in a separate files
//In this case we want to access express (located in the package.json)
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const pages = ['WorldCup','Every4Years', 'Winners']

//View engines let us render web pages using template files. You can only have one view engine in your server that can then be modified to each respective template. 
//View engine
app.engine('madeline', (filePath, options, callback)=>{
    fs.readFile(filePath, (err, content)=>{
        if(err) return callback(err);
        const rendered = content.toString()
        .replace('#title#', '<title>'+options.title +'</title>')
        .replace('#message#', '<h1>'+options.message +'</h1>')
        .replace('#content1#', '<div>'+ options.content1+ '</div>')
        .replace('#content2#', '<div>'+ options.content2+ '</div>')
        .replace('#li1#', '<div>'+ options.li1+ '</div>')
        .replace('#li2#', '<div>'+ options.li2+ '</div>')
        .replace('#li3#', '<div>'+ options.li3+ '</div>')
        return callback(null, rendered);
    })
})
//Set up view engine
app.set('views', './views');//specify the views directory
app.set('view engine', 'madeline');
//First template
//1
app.get('/', (req,res)=>{
    res.render('template', {title: 'Uh Oh...', message:'Welcome!', content1:'Hello :)', content2: 'this is the home page. I will be talking about the World Cup!'});
});
//2
app.get('/Every4Years/', (req,res)=>{
    res.render('template', {title: 'World Cup', message:'Why is the World Cup every 4 years?', content1:'The World Cup happens every four years in order to have enough time for the qualification tournaments and playoffs among national teams to take place. Additionally, four years provides the host country adequate time to plan the logistics of the tournament and how to best accommodate an influx of millions of fans.', content2: ''});
});

//second template
//3
app.get('/WorldCup/', (req,res)=>{
    res.render('template2', {title: 'World Cup', message:'History of the World Cup', content1:'The first official World Cup took place in Uruguay 1930. ', content2: 'Winners: ', li1:'1st place: Uruguay', li2:'2nd place: Argentina', li3:'3rd place: Yugoslavia/United States'});
});
//4
app.get('/Winners/', (req,res)=>{
    res.render('template2', {title: 'World Cup', message:'Top 3 countries with the most cup win', content1:' ', content2: '', li1:'Brazil with a total of 5', li2:'Germany and Italy with a total of 4', li3:'Uruguay, Argentina, and France with a total of 2'});
});
//5
app.get('/QuickFacts/', (req,res)=>{
    res.render('template2', {title: 'World Cup', message:'World Cup quick facts', content1:'', content2: '', li1:'Official Name is FIFA World Cup', li2:'Player with Most World Cup Wins is Pelé', li3:'Team with most Losses, Mexico'});
});
//6
app.get('/EssentialFacts/', (req,res)=>{
    res.render('template2', {title: 'World Cup', message:'World Cup essential facts', content1:'', content2: '', li1:'The Women’s World Cup Started in 1991', li2:'Brazil Has Played in Every World Cup Final', li3:'There Was No World Cup in 1942 or 1946'});
});
//7
app.get('/interestingFacts/', (req, res)=>{
    res.render('template2',{title:'World Cup', message:'World Cup interesting facts', content1:'', content2:'', li1:'India Bailed on the World Cup Because they Couldn’t Play Barefoot', li2:'Germany Has Scored the Most World Cup Goals',li3:'Only 8 Countries Have Won the World Cup'});
});
//8
app.get('/newBall/', (req,res)=>{
    res.render('template', {title:'Worl Cup', message:'New World Cup ball that with small battery!', content1:'The World Cup introduced a new ball this year with a sensor that collects spatial positioning data in real-time to make offside reviews more accurate. The sensor is powered by a small battery, which can last up to 6 hours of active use or 18 days when not.', content2:'The sensor weights 14 grams, and the backed system automatically switches when a ew ball is put in play. The balls need to charge before every match.'
    });
});
//9
app.get('/mascots/', (req,res)=>{
    res.render('template2', {title:'World Cup', message:'The Names of the 3 most recent mascots', content1:'', content2:'',li1:'2014 Brazil: Fuleco, is a three-banded armadillo wearing a white T-shirt, green bermuda and a blue carapace',li2:'2018 Russia: Zabivaka, is a wolf wearing red shorts and a blue & white T-shirt', li3:`2022 Qatar: La'eeb, is a white floating ghutrah(traditional arabic headdress)`})
});
//10
app.get('/2026Cup/', (req,res)=>{
    res.render('template2', {title:'World Cup', message:'World Cup 2026', content1:'The host countries for the next World Cup has been choosen. This time it will be divided among 3 countries, which are The U.S., Canada, and Mexico!!!', content2:'There are a total of 16 different cities where the matches will take place. The ones I will be visiting are:',li1:'Kansas City',li2:'Miami', li3:`Boston`});
});

//checks that the app is running
app.listen(port, ()=>{
    console.log('listening');
})