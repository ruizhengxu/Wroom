/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ecunum, payadrdrap, ecunom FROM " +
                            "ecurie e INNER JOIN pays p ";
						sql= sql + "ON p.paynum=e.paynum ORDER BY ecunom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getEcurieInformation = function(data, callback) {
    db.getConnection( function (err, connexion) {
        if (!err) {
            let sql = "select e.ecunum, ecunom, ecunomdir, ecuadrsiege, ecuadresseimage, paynom, fpnom, count(pilnom) as nbPilote,\n" +
                "count(sponum) as nbSpon from ecurie e join pays p on p.paynum = e.paynum left join pilote pi on\n" +
                "pi.ecunum = e.ecunum left join finance f on f.ecunum = e.ecunum left join fourn_pneu fo on\n" +
                "fo.fpnum = e.fpnum where e.ecunum = " + data;
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.getPiloteDeLEcurie = function(data, callback) {
    db.getConnection(function(err, connection) {
        if (!err) {
            let sql = "select distinct ecunom, p.pilnum, pilnom, pilprenom, trim(left(piltexte, 120)) as piltexte, phoadresse from ecurie e join pilote p\n" +
                " on p.ecunum = e.ecunum join photo ph on ph.pilnum = p.pilnum where phonum = 1 and e.ecunum = " + data;
            connection.query(sql, callback);
            connection.release();
        }
    })
}