///**
// * Created by kadyan on 15-08-26.
// */
//creation of server using http.
var http=require('http');
var express=require('express');
var util=require('util');
var url = require( "url" );
var queryString = require('querystring');
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
    run_cmd("/Users/kadyan/resourcename.sh",[], function (resourceIDArray) {
        for (var resourceID in (resourceIDArray))
        {
            var dataFiltered=resourceIDArray[resourceID].replace(/[|]\s/gm, "");
            var dataSplit = dataFiltered.split('\n');
            if(dataSplit[0]) {
                resourceName[dataSplit[0].split(" ")[0]] = dataSplit[0].split(" ")[1] + '_' + dataSplit[0].split(" ")[0].split('-')[0];
                resourceNameInverse[ dataSplit[0].split(" ")[1] + '_' + dataSplit[0].split(" ")[0].split('-')[0]] = dataSplit[0].split(" ")[0];
                //resourceNameInverse[dataSplit[0].split(/\s(.+)?/)[1]] = dataSplit[0].split(" ")[0];
                if (dataSplit[config.RESOURCE_ID] === ' ') {
                    return;
                }
            }
        }
    });
}
function updateResourceData () {
    console.log('UpdateResourceData invoked');
    run_cmd("/Users/kadyan/nova.sh",[], function (resourceIDArray) {
        for (var resourceID in resourceIDArray) {
            runCmdWithArguments("/Users/kadyan/sumit.sh",[resourceIDArray[resourceID]], function (resourceIdData) {
                var dataSplit = resourceIdData.split('\n');
                if (dataSplit[config.RESOURCE_ID] === '') {
                    return;
                }
                resourceIdData = resourceIdData.replace(/(\r\n|\n|\r)/gm, "");
                if (dataSplit) {
                    serverData[dataSplit[config.RESOURCE_ID]] = {
                        cpuTime: dataSplit[config.CPU],
                        cpu_Util: dataSplit[config.CPU_UTIL],
                        diskephemeralSize:dataSplit[config.DISKEPHEMERALSIZE],
                        diskreadBytes:dataSplit[config.DISKREADBYTES],
                        diskrootSize:dataSplit[config.DISKROOTSIZE],
                        diskwriteBytes:dataSplit[config.DISKWRITEBYTES],
                        diskwriteRequests:dataSplit[config.DISKWRITEREQUESTS],
                        instance:dataSplit[config.INSTANCE],
                        memory:dataSplit[config.MEMORY],
                        vcpus:dataSplit[config.VCPUS],
                        networkincomingBytes:dataSplit[config.NETWORKINCOMINGBYTES],
                        networkoutgoingBytes:dataSplit[config.NETWORKOUTGOINGBYTES]
                    };
                }
            });
        };
    });
}
var runCmdWithArguments=function(cmd,args, callBack ) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd,args);
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
    console.log(serverSpecificData);
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
//cronJob.start();
resource_Name();
updateResourceData();
console.log(serverData);
server.listen(3000);
console.log("server is listening on port 3000");



