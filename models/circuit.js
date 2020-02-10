/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité des circuits avec le nom du circuit
* @return Un tableau qui contient le N°, le nom du circuit et le nom de la photo
*/
module.exports.getListeCircuit = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT cirnum, cirnom, payadrdrap FROM circuit c join pays p on p.PAYNUM = c.paynum order by cirnom";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailCircuit = function (data, callback) {
    db.getConnection( function (err, connexion) {
        if (!err) {
            let sql = "select cirnom, cirlongueur, cirnbspectateurs, ciradresseimage, cirtext, p.paynom from circuit c join pays p\n" +
                "on p.paynum = c.paynum where cirnum = " + data;
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }

    })
}