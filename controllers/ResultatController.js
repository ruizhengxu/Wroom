let model = require('../models/resultat');
let async = require('async');

  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function(request, response){
	response.title = 'Liste des résulats des grands prix';
	model.getListePrix(function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		response.listeResultats = result;
		response.render('listerResultat', response);
	})
};

module.exports.DetailPrix = function (request, response) {
	let data = request.params.num;
	response.title = "Détail du Grand Prix";
	async.parallel([
		function (callback) {
			model.getListePrix(function (err, result) {
				callback(null, result);
			})
		},
		function (callback) {
			model.getResultatPrix(data, function (err, result) {
				callback(null, result);
			})
		},
		function (callback) {
			model.getInformationPrix(data, function (err, result) {
				callback(null, result);
			})
		}
	], function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		response.listeResultats = result[0];
		response.prix = result[1];
		response.prixInfo = result[2][0];
		//console.log(result[2][0]);
		response.render('detailPrix', response);
	})
}