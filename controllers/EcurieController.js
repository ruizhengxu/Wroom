let model = require('../models/ecurie.js');
let async = require('async');

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response) {
   response.title = 'Liste des écuries';
   model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        console.log(result);
    response.render('listerEcurie', response);
});
}

module.exports.DetailEcurie = function(request, response) {
    let data = request.params.num;
    response.title = 'Information écurie';
    async.parallel([
        function(callback) {
            model.getListeEcurie(function (err, result) {
                callback(null, result);
            });
        },
        function(callback) {
            model.getEcurieInformation(data, function(err, result) {
                callback(null, result);
            });
        },
        function(callback) {
            model.getPiloteDeLEcurie(data, function (err, result) {
                callback(null, result);
            })
        }
    ], function(err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result[0];
        response.ecurie = result[1][0];
        response.pilote = result[2];
        response.render('detailEcurie', response);
    });
}