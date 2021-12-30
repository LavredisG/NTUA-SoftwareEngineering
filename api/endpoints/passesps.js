const express = require('express');
const router = express.Router();
//const converter = require('json-2-csv');
var mysql = require('mysql');
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
var dateTime = date+' '+time;


function getpassespsData(req,res){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database:"db_softeng_2131"
	});

	var test = { 

	};
	test.Station = req.params.stationID;
	test.RequestTimestamp = dateTime;
	test.PeriodFrom = req.params.date_from;
	test.PeriodTo = req.params.date_to;


	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	let myquery1="SELECT count(*) as Num FROM passes, tags WHERE passes.tagID = tags.tagID and stationID ="+"'"+req.params.stationID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'";
		con.query(myquery1, function (err, resu, fields){
			if (err) throw err;
			test.NumberOfPasses = resu[0]["Num"];
		});
		let myquery="SELECT passID, stationID, timestamp, vehicleID, tag_provider, pass_type, amount FROM passes, tags WHERE passes.tagID = tags.tagID and stationID ="+"'"+req.params.stationID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
			test.PassesList = result;
			//converter.json2csv(test, function(err, csv){
			//	if (err) throw err;
			//        res.send(csv);
			//});
	                res.send(test);
		});
	});
}

router.get('/PassesPerStation/:stationID/:date_from/:date_to',getpassespsData);
module.exports = router;
