var express=require('express'),
 http=require('http'),
 jackrabbit = require('jackrabbit')
 UrlObject=require('url');
 var eventTriggerQueue='SyncServiceEventTriggerQueue';
 var messagRecievedQueue='SyncServiceResponseQueue';
var app=express();
var counter=1;
var aqmpChannel;
var aqmpConsumer;
//configuring application
app.set('port',process.env.PORT||8085);
app.set('host',process.env.ADDRESS||"127.0.0.1");

app.get('/',function(req,res){
    var message='Status: ';
    aqmpChannel=jackrabbit('amqp://localhost:5672',1);
    aqmpChannel.once('connected',createQueueListener);
    res.status(200).send("Subscriber 1 created");
});

function createQueueListener(){
    aqmpConsumer=aqmpChannel.default().queue({name: eventTriggerQueue,durable:true});
    handleQueueListener();
}

function handleQueueListener(){
    aqmpConsumer.consume(function(msg,reply){
        console.log(reply);
        var replyMessage= "Message Served by Subscriber 1: "+msg.displayName;
        console.log(counter+' '+msg.displayName);
        counter++;
        reply(replyMessage);
    });
}

//creating server
http.createServer(app).listen(app.get('port'),app.get('host'),function(){
console.log("Server created for Microservice POC at port: %j, address: %j",app.get('port'),app.get('host'));
});

