# RPCMicroService
RPCMicroservice ims to show synchronous communication between different microservice using Remote Procedure call protocol of RabbitMQ.
We will be using jackrabbit npm package for amqp connection. JackRabbit provides nabstractiona and make implementation simpler.

# Prerequisites
* RabbitMQ installed and accessible form both the MicroServices

# Technology used
* NodeJS for development
* RabbitMQ for queue implementation

# How it work
This project setup consists of [Publisher](Publisher) and [Subscriber](Subscriber). You can publish message form publisher via HTTP APi call, which will be processed by subscriber. Once message is processed, response is sent to Publisher which returns the OK http Response.

Just run both publisher and Subscriber then:
* Initiate Queue on Publisher by triggering homepage via Http Request
* Initiate Queue on Subscriber by triggeting homepage via Http Request
* Send message from Publisher via HttpRequest
