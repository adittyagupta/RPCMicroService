var express=require('express'),
 http=require('http'),
 jackrabbit = require('jackrabbit')
 UrlObject=require('url');
 var eventTriggerQueue='SyncServiceEventTriggerQueue';
 var app=express();

var aqmpChannel;
var aqmpConsumer;
//configuring application
app.set('port',process.env.PORT||8081);
app.set('host',process.env.ADDRESS||"127.0.0.1");

app.get('/',function(req,res){
    var message='Status: ';
    aqmpChannel = jackrabbit('amqp://localhost:5672',1);
    aqmpChannel.once('connected',createQueueListener);
    res.status(200).send("Publisher created");
});


function createQueueListener(){
   aqmpConsumer= aqmpChannel.default();
   aqmpConsumer.queue({name: eventTriggerQueue,durable:true});    
}

app.get('/sendMessage',function(req,res){
var urlPart=UrlObject.parse(req.url,true);
var message=urlPart.query.msg;
 aqmpConsumer.publish({displayName:message}, {key:eventTriggerQueue 
    // ,reply: function onReply(data){
    //     res.send(data);
    // }
    });
   // res.send('Ok');
});

//creating server
http.createServer(app).listen(app.get('port'),app.get('host'),function(){
console.log("Server created for Microservice POC at port: %j, address: %j",app.get('port'),app.get('host'));
});

