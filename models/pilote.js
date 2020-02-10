/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité des lettres des pilotes selon leur nom
* @return Un tableau qui la première lettre des noms des pilotes
*/
module.exports.getToutesLesLettresDesPilotes = function (callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT DISTINCT SUBSTRING(pilnom, 1, 1) AS lettre FROM pilote ORDER BY lettre";
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getLesPhotosDeLaLettre = function (data, callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT pi.pilnum, pilnom, pilprenom, phonum, phoadresse FROM photo ph JOIN pilote pi ON pi.PILNUM = ph.PILNUM\n" +
                "AND phonum = 1 AND pilnom LIKE '" + data +
                "%' ORDER BY pi.pilnum";
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getInfoPilote = function (data, callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "select pi.pilnum, pilnom, pilprenom, paynat, pildatenais, pilpoids, piltaille, piltexte, ecunom\n" +
                "from pilote pi join pays pa on pa.paynum = pi.paynum\n" +
                "left join ecurie e on e.ecunum = pi.ecunum where pi.pilnum = " + data;
            //console.log(sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getSponsorPilote = function (data, callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT p.pilnum, sponom, SPOSECTACTIVITE FROM pilote p join sponsorise sp on sp.PILNUM = p.PILNUM\n" +
                "left join sponsor s on s.SPONUM = sp.SPONUM where p.pilnum = " + data;
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getPhotoProfilPilote = function (data, callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "select pi.pilnum, phosujet, phocommentaire, phoadresse from pilote pi join photo ph on ph.pilnum = pi.pilnum\n" +
                "where phocommentaire = 'Photo officielle' and pi.pilnum = " + data;
            //console.log(sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getToutesLesPhotosDuPilote = function (data, callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "select pi.pilnum, phosujet, phocommentaire, phoadresse from pilote pi join photo ph on ph.pilnum = pi.pilnum\n" +
                "where phocommentaire <> 'Photo officielle' and pi.pilnum = " + data;
            //console.log(sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};