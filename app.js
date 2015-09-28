///**
// * Created by kadyan on 15-08-26.
// */
//creation of server using http.


//1. Create constants in config for all parameters
//2. Extract all the parameters for all the resources and return in /serverdata url
//3. get data for specific server Id
//4. Test using postman/curl
//5. Cron job to update the server data..
//6. Move the routes to router.js (moduleirize)
    var http=require('http');
    var express=require('express');
    var util=require('util');
    var url = require( "url" );
    var queryString = require( "querystring" );
    var path =require('path');
    var app=express();
    var server =http.createServer(app);
    var router=require('router');
    var fs=require("fs");
    var resourceNameInverse={};
    var resourceName={};
    var serverData= {};
    var exec = require('child_process').exec;
    var config = require('./config/config.js');

app.use(express.static(__dirname+'/view'));

var run_cmd=function(cmd, args, callBack ) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";
    var resourceIDArray = [];

    child.stdout.on('data', function (buffer) {
        resp += buffer.toString()
    });
    child.stdout.on('end', function(error) {
        var lines=resp.split('\n');
        for(var resourceID in lines) {
            resourceIDArray.push(lines[resourceID]);
        }
        callBack (resourceIDArray);
    });
}
function resource_Name(){
    run_cmd("./sumit.sh", [], function (resourceIDArray) {
        for (var resourceID in resourceIDArray) {
            var dataSplit = resourceIDArray[resourceID].split('\n');
            if(dataSplit[0]) {
                resourceName[dataSplit[0].split(" ")[0]] = dataSplit[0].split(" ")[1];
                resourceNameInverse[dataSplit[0].split(" ")[1]] = dataSplit[0].split(" ")[0];
                if (dataSplit[config.RESOURCE_ID] === '') {
                    return;
                }
            }
        }
    });
}
function updateResourceData () {
    console.log('UpdateResourceData invoked');
    run_cmd("./sumit.sh", [], function (resourceIDArray) {
        for (var resourceID in resourceIDArray) {
            var dataSplit = resourceIDArray[resourceID].split('\n');

            if (dataSplit[0]) {
                serverData[dataSplit[0].split(" ")[0]]= {
                    cpuData: (Math.random() * 100),
                    cpu_Util: (Math.random() * 100),
                    diskephemeralSize:(Math.random() * 100),
                    diskrootSize:(Math.random() * 100),
                    diskwriteBytes:(Math.random() * 100),
                    diskwriteRequests:(Math.random() * 100),
                    instance:(Math.random() * 100),
                    memory:(Math.random() * 100),
                    vcpus:(Math.random() * 100),
                    networkincomingBytes:(Math.random() * 100),
                    networkoutgoingBytes:(Math.random() * 100)
                };
                if (dataSplit[config.RESOURCE_ID] === '') {
                    return;
                }
            }
        }
    });
}
var runCmdWithArguments=function(cmd, args, callBack ) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp ="";

    child.stdout.on('data', function (buffer) {
        if(buffer) {
            resp += buffer.toString();
        }
    });
    child.stdout.on('end', function(error) {
        callBack(resp)
    });
}
app.get('/serverdata', function(req, res) {
   res.json(serverData);
});
app.get('/serverdata/:id', function(req, res) {
    res.json(serverData[req.params.id]);
});
app.get('/resource',function(req,res){
    res.json(resourceName);
});
app.get('/resourceNameInverse',function(req,res){
    // parses the request url
    var theUrl = url.parse( req.url );
    // gets the query part of the URL and parses it creating an object
    var resourceName = theUrl.query;
    var ResourceID=resourceNameInverse[resourceName];
    var serverSpecificData=serverData[ResourceID];
    res.send(serverSpecificData);
    //res.json(resourceNameInverse);
});
app.get('/getServers', function(req, res) {
    run_cmd("source savi_config",[],function(text) {
        console.log(text)
    });
});
//var cron = require('cron');
//var cronJob = cron.job("0 */1 * * * *", function(){
//    // perform operation
//    updateResourceData()
//});
resource_Name();
//cronJob.start();
updateResourceData();

server.listen(3000);
console.log("server is listening on port 3000");



