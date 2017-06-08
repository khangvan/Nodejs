var express = require('express');
var app = express();
var sql = require("mssql");
var bodyParser = require('body-parser');
 
//app.use(bodyParser.urlencoded({extended: true});

    // config for your database
    var config = {
         server: "10.84.10.67\\Siplace_2008r2ex",
    database: "FinalAssy",
    user: "reports",
    password: "reports",
    port: 1433
    };



    
    app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
    
    /*                        /dog/Devo/123
app.get('/dog/:name/:id', function(req, res) {
   res.json({ parameter_name: req.params.name, 
              id: req.params.id });
});

{"parameter_name":"Devo","id":"123"}

*/
/*
RouterController
/:type
/pms
/pms/:
/qms
/qms/:
*/

var dataroot=
    [
        {
            "test":"select  * from vjascapacity"
            ,"jascapacity":"select  * from vJASCapacity"
            ,"capacity":"select * from vJASCapacity"
            ,"sumhour":"select * from tempSumHour "
            ,"pms":"select * from tempSumHour "
            ,"capacityhistory":"select  * from capacityhistory"
            ,"pmstodaysum":"select  * from tempLineSUMrich"
            ,"pmstodaydetail":"select  * from tempPOSUMrich"
            ,"sumhourman":"select *  from temsumhourman"
            
            
        }
    ];

function getquerybyRequire(nhap) {
    var str ="test";
    var str=JSON.stringify(dataroot[0][nhap]);
    if (str=="" || str=="favicon.ico" ||str== "undefined") 
        { str ="test";}

       
    //all data must be trim quote : "test" -> test
    //str=str.substring(1,str.length-1);
    str=str.replace(/["]/g,'');
    console.log('string: '+ str);
   
    
	return str;
}
app.get('/favicon.ico', function(req, res) {
    res.send(204);
});

app.get('/:type', function (req, res) {


   //host name
   var hostname='';
   require('dns').reverse(req.connection.remoteAddress, function(err, domains) {

    
     hostname= domains;
    });
    //end host name
   
   
   var fullDate = new Date()
   var type =req.params.type;
    if (type == 'favicon.con')
        {
            type =test;
            return;
        }
    console.log("#start------#"+fullDate);
   console.log('001-root-start type=' +type+ ' ');
       // connect to your database
    sql.connect(config, function (err) {
    
        if (err) {
            console.log(err);
            
        }
			var query ='';
            query =getquerybyRequire(type);
            /* 
        	if (type =='test') {
           	           	
           	           	//res.send("<!DOCTYPE html>\n<html>\n    <head>\n    </head>\n   <body>\n      <h1>Hello World!</h1>\n   </body>\n</html>");
           	           query =("           	           		declare @data nvarchar(max); exec [spQueryToHtmlTableDoc] 'select top 10 * from Build_Time', @data Output " );
           	           
           	                 var request = new sql.Request();
           	              request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

          
            
var jsonA =JSON.parse(JSON.stringify(recordset));
           	           //alert('request1 khang data here '+JSON.stringify(json1));
					//console.log(JSON.stringify(json1))  	;
					var jsonB=jsonA[0];
					//alert(JSON.stringify(dlist1)); // bo 1 square bracket
					var json=jsonB[0];
					//alert(JSON.stringify(json));// bo 2 square bracket
 					for(var key in json){
					     var keyjson = json[key];
					     console.log(keyjson);
					  //   alert('Khang-inside->'+JSON.stringify(keyjson))// ok
					  res.render(keyjson);
					 }

			
			
            
        });
           	           
           	           
           	           	
           }
           if (type =='capacitycurrent') {
           	           	query ="select  * from vjascapacity";//done
           }
           else if (type=='capacityhistory'){
           	           		query ="select  * from capacityhistory";//done
           }
            else if (type=='pmstodaysum'){
           	           		query ="select  * from tempLineSUMrich";//done
           }
             else if (type=='pmstodaydetail'){
           	           		query ="select  * from tempPOSUMrich";//done
           }
           
              else if (type=='sumhour'){
           	       		query ="select * from tempSumHour ";//done
           }
           else if (type=='sumhourman'){
           	       		query ="select *  from temsumhourman ";//done
           }
           
               else if (type=='jascapacity'){
           	       		query ="select * from vJASCapacity ";//done
           }
           
           else{
           	
           }
          */

			console.log('001-then run '+query);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
            // for log
            
            
            var fullDateend = new Date()
            console.log("#done------------------------------------------------------#"+fullDateend);
            


			
			
            
        });
    });
   
});


//// get for line
app.get('/pms/:from&:to', function (req, res) {
   var rpttype =req.params.pmsreportype;
   var from =req.params.from;
   var to =req.params.to;
 console.log('003-' + rpttype + from+to);
       // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
		//string query
		var query ='';
        
        
       
           if (rpttype =='pmssum') {
                    	query ="SELECT * FROM tempLineSUMrich where event_date >='"+from+"' and event_date <='"+to+"'";
           }
           else if (rpttype=='pmsdetail'){
                  		query ="SELECT * FROM tempPOSUMrich where event_date >='"+from+"' and event_date <='"+to+"'";
           }
           
        
           else{
           	
           }
           // create Request object
           var request = new sql.Request();
           console.log('003-2'+query);
        // query to the database and get the records
        request.query(query , function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
			 
            
        });
    });
});


// get for line
app.get('/pms/line=:linename', function (req, res) {
   var line =req.params.linename;
 console.log('004-pmstodaydetail'+line);
       // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query("SELECT * FROM tempPOSUMrich where linename ='"+line+"'" , function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
			 
            
        });
    });
});

app.get('/yield/:rpttype', function (req, res) {
   var rpttype =req.params.rpttype;
  
   
    
 console.log('yield report-' + rpttype );
       // connect to your database
    sql.connect(vnmacsdb, function (err) {
    
        if (err) console.log(err);
		//string query
		var query ='';
        
        
       
           if (rpttype =='today') {
                    	query ="SELECT * FROM yielddata3 ";
           }
           else if (rpttype=='serial'){
                  		query ="SELECT * FROM rawserial3 ";
           }
        else
            {
                query=cleanforSQL(rpttype);
            }
           
        
         
           // create Request object
           var request = new sql.Request();
           console.log('yieldfor: '+query);
        // query to the database and get the records
        request.query(query , function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
			 
            
        });
    });
});




// now session for QUALITY REPORT at packing May 15 2017
// qs mean Quality System
// config for your database

app.get('/qms/pk/', function (req, res) {
   
     
   
   var fullDate = new Date()
   var type =req.params.type;
    console.log("#Qms ---p view-------------------------------------------#"+fullDate);
   
       // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

			var query ='';
            query ="select *   FROM [QualityVNDB].[dbo].[PackingQualityRecord] where  QReleaseDateTime is null		order by qid desc"

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
            // for log
            
            
            var fullDateend = new Date()
            console.log("#done------------------------------------------------------#"+fullDateend);
            


			
			
            
        });
    });
});



app.get('/qms/pk/serial=:serial', function (req, res) {
   
     
   
   var fullDate = new Date()
   var type =req.params.type;
    console.log("#serial track------------------------------------------#"+fullDate);
   
       // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

			var query ='';
        var serial = req.params.serial;
            query ="exec amevn_PATrackSerial '"+serial +"'";
console.log(query);
        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
            // for log
            
            
            var fullDateend = new Date()
            console.log("#done serial track-------------------------------------------------------#"+fullDateend);
            


			
			
            
        });
    });
});


app.get('/qms/pk/:modeinout,:serial,:model,:location,:defectcode,:op', function (req, res) {
   
     
   
   var fullDate = new Date()
   var type =req.params.type;
    console.log("#Qms------------------#"+fullDate);
     var mode = req.params.modeinout;
   console.log('QS1 mode=  '+mode );
       // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
       
       
			var query ='';
         
            query ="exec [QualityVNDB].[dbo].amevn_input_new '"+mode+"', '" + req.params.serial.toUpperCase()+"','"+ req.params.model.toUpperCase()+"','"+ req.params.location.toUpperCase()+"','"+  req.params.defectcode.toUpperCase()+"','"+  req.params.op.toUpperCase() +"'";
               
			console.log('here your query:  '+query);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
            // for log
            
            
            var fullDateend = new Date()
            console.log("#done------------------------------------------------------#"+fullDateend);
            


			
			
            
        });
    });
});


//*/
// dynamic query

 var vnmsrv601 = {
         server: "10.84.10.67\\Siplace_2008r2ex",
    database: "FinalAssy",
    user: "reports",
    password: "reports",
    port: 1433
    };
       var vnmacsdb = {
         server: "vnmacsdb",
    database: "ACS EE",
    user: "reports",
    password: "reports",
    port: 1433
    };
    
      var vnmacsrpt2 = {
         server: "vnmacsrpt2",
    database: "RStaging",
    user: "reports",
    password: "reports",
    port: 1433
    };


function cleanforSQL(strquery){
    //strquery=strquery.replace(/_/g,' '); // fail do acs_Serial
        strquery=strquery.replace(/[|]/g,' '); // fail do acs_Serial
        strquery=strquery.replace(/from/g,' from ');
        strquery=strquery.replace(/select/g,' select ');
        strquery=strquery.replace(/where/g,' where ');
        strquery=strquery.replace(/top/g,' top ');
        strquery=strquery.replace(/groupby/g,' group by ');
         strquery=strquery.replace(/orderby/g,' order by ');
        strquery=strquery.replace(/desc/g,' desc ');
        //strquery=strquery.replace(/asc/g,' asc ');
        strquery=strquery.replace(/insert/g,' insert ');
        strquery=strquery.replace(/insertinto/g,' insert into ');
        strquery=strquery.replace(/update/g,' update ');
        strquery=strquery.replace(/innerjoin/g,' inner join ');
        strquery=strquery.replace(/leftjoin/g,' left join ');
        strquery=strquery.replace("*",' * ');
        strquery=strquery.replace(/[+]/g,' '); // nice action May 26
    return strquery;
    
}

app.get('/sql/:server/:data', function (req, res) {
   
  
    
    
var mainconfig =req.params.server;
    if (mainconfig=="vnmsrv601")
        {
            mainconfig = vnmsrv601;
        }
    else if (mainconfig=="vnmacsdb")
        {
            mainconfig = vnmacsdb;
        }
    
     else if (mainconfig=="vnmacsrpt2")
        {
            mainconfig = vnmacsrpt2;
        }
 
    
     //console.log(JSON.stringify(mainconfig));
    
       // connect to your database
    sql.connect(mainconfig, function (err) {
    
        if (err) console.log(err);
        //
        var strquery = req.params.data.toString();
        strquery= cleanforSQL(strquery); // new data
        console.log(strquery);
        
        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(strquery.toString(), function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});
    

//*/



// rfc


var server = app.listen(5000, function () {
    console.log('Server is running 5000..vnmacsrpt2');
});


// now for serial


 var SerialPort = require("serialport");

//0
    var serialPort = new SerialPort(
//"/dev/bus/usb/001/001",{
"COM1", {
      baudrate: 9600
    });
    
    serialPort.on("open", function () {
      console.log('open');
      
      serialPort.on('data', function(data) {
        console.log('data received: ' + data);
          console.log('post ' + data);
          
           //do insert - start
      
    let mylocal = {
         server: "vnmltme-vkhang\\sqlexpress",
    database: "test",
    user: "sa1",
    password: "reports",
    port: 1433
    };
   
       // connect to your database
    sql.connect(mylocal, function (err) {
    console.log('connecting ' );
        if (err) console.log(err);
console.log('query prepare ' );
			var query ='';
            
            query =`insert into logtest (code,rptdate) values ('${data}', getdate())`;
console.log('query la: ' +query);
        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            //send(recordset);
            
            // for log
       		 console.log("done ahihi");
            
        });
    });
          
          
          //do insert -end
          
      });
      
        /*
      serialPort.write(new Buffer('4','ascii'), function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
          
         
      });
      */
    });
/*
var request=require('request');

var postlocal = (url) => {
            request.get(url,options,function(err,res,body){
              if(err) //TODO: handle err
              if(res.statusCode !== 200 ) //etc
              //TODO Do something with response
                   console.log('donepost ');
            });
}
*/