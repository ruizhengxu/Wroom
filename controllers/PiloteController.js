let model = require('../models/pilote.js');
let async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = function(request, response){
   response.title = 'Répertoire des pilotes';
   model.getToutesLesLettresDesPilotes(function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return ;
       }
       response.listeLettre = result;
       //console.log(result);
       response.render('repertoirePilotes', response);
   });
};

module.exports.ListePhotoPilote = function (request, response) {
    let data = request.params.lettre;
    response.title = 'Pilotes dont le nom commence par ' + data;
    async.parallel ([
        function (callback) {
            model.getToutesLesLettresDesPilotes(function (err, result) {
                callback(null, result)
            });
        },
        function (callback) {
            model.getLesPhotosDeLaLettre(data, function (err, result) {
                callback(null, result)
            });
        },
    ], function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.listeLettre = result[0];
            donnees = result[1];
            for (let i = 1; i < donnees.length; i++) {
                if (i%3 == 0) {
                    donnees[i].ligne = "1";
                }
            }
            response.listePhoto = donnees;
            response.render("listePhotoPilo", response);
        }
    );
};

module.exports.InformationPilote = function (request, response) {
    let data = request.params.num;
    response.title = 'Pilotes N°' + data;
    async.parallel ([
            function (callback) {
                model.getToutesLesLettresDesPilotes(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getInfoPilote(data, function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getPhotoProfilPilote(data, function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getSponsorPilote(data, function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getToutesLesPhotosDuPilote(data, function (err, result) {
                    callback(null, result)
                });
            },
        ], function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.listeLettre = result[0];
            response.pilote = result[1][0];
            response.photoprincipale = result[2][0];
            response.sponsor = result[3];
            response.listePhotos = result[4];
            console.log(result[2]);
            response.render("informationPilote", response);
        }
    );
};