const express = require('express');
const router = express.Router();
//const converter = require('json-2-csv');
var mysql = require('mysql');

function getpassesaData(req,res){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database:"db_softeng_2131"
	});

	var test = { 

	};
	test.op1_ID = req.params.op1_ID;
	test.op2_ID = req.params.op2_ID;
	test.PeriodFrom = req.params.date_from;
	test.PeriodTo = req.params.date_to;


	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		let myquery="SELECT passID, stationID, timestamp, vehicleID, charge FROM passes WHERE pass_type = 'visitor' and operatorID1="+"'"+req.params.op1_ID+"'"+" and operatorID2="+"'"+req.params.op2_ID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'";
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

router.get('/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to',getpassesaData);
module.exports = router;
