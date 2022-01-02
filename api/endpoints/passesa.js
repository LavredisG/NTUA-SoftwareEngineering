const express = require('express');
const router = express.Router();
const converter = require('json-2-csv');
var mysql = require('mysql');
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
var dateTime = date+' '+time;


function getpassesaData(req,res){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"softeng2131"
	});

	var test = { 

	};
	test.op1_ID = req.params.op1_ID;
	test.op2_ID = req.params.op2_ID;
	test.RequestTimestamp = dateTime;
	test.PeriodFrom = req.params.date_from;
	test.PeriodTo = req.params.date_to;
	var l = req.query.format;


	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	let myquery1="SELECT count(*) as Num FROM passes WHERE pass_type = 'home' and operatorID1="+"'"+req.params.op1_ID+"'"+" and operatorID2="+"'"+req.params.op2_ID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'";	
		con.query(myquery1, function (err, resu, fields){
			if (err) throw err;
			test.NumberOfPasses = resu[0]["Num"];
		});
		let myquery="SELECT passID, stationID, timestamp, vehicleID, amount FROM passes WHERE pass_type = 'home' and operatorID1="+"'"+req.params.op1_ID+"'"+" and operatorID2="+"'"+req.params.op2_ID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
			test.PassesList = result;
			if (l=="csv"){
			converter.json2csv(test, function(err, csv){
				if (err) throw err;
			        res.send(csv);
			});}
			else {res.send(test);}
		});
	});
}

router.get('/interoperability/api/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to',getpassesaData);
module.exports = router;
