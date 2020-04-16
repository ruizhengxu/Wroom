/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

module.exports.getListePrix = function (callback) {
    db.getConnection(function (err, connection) {
        if (!err) {
            let sql = "select gpnum, gpnom, payadrdrap from grandprix g join circuit c on c.cirnum = g.cirnum\n" +
                "join pays p on p.paynum = c.paynum order by gpnom";
            connection.query(sql, callback);
            connection.release();
        }
    })
}

module.exports.getResultatPrix = function(data, callback) {
    db.getConnection(function (err, connection) {
        if (!err) {
            let sql = "select place, tempscourse, pilnom, pilprenom, ptnbpointsplace from points p join\n" +
                "(select row_number() over(order by tempscourse) as place, tempscourse, pilnom, pilprenom\n" +
                "from grandprix g join course c on c.gpnum = g.gpnum join pilote pi\n" +
                "on pi.pilnum = c.pilnum where g.gpnum = " + data + " order by tempscourse, place) s on p.ptplace = s.place";
            //console.log(sql);
            connection.query(sql, callback);
            connection.release();
        }
    })
}

module.exports.getInformationPrix = function (data, callback) {
    db.getConnection(function (err, connection) {
        if (!err) {
            let sql = "select gpnom, gpdate, gpcommentaire from grandprix where gpnum = " + data;
            connection.query(sql, callback);
            connection.release();
        }
    })
}