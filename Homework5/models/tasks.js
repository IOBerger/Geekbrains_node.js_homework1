const mysql2 = require('mysql2');

const options = {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "homework_node",
}

const pool = mysql2.createPool(options).promise();

var Tasks = {
    list: function() {
        pool.query('select * from todo')
            .then(([data, fields]) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    add: function(task) {
        var sql = "INSERT INTO  ??(text,complete) VALUES ( ? ,0)";
        var inserts = ['todo', task];
        sql = mysql2.format(sql, inserts);
        console.log(sql);
        pool.query(sql)
            // .then(([data, fields]) => {
            //     //console.log(data);
            // })
            .catch((err) => {
                console.log(err);
            });
    },
    change: function(id, text, callback) {
        var sql = "UPDATE ?? SET ??=? WHERE ??=?";
        var inserts = ['todo', 'text', text, 'id', id];
        sql = mysql2.format(sql, inserts);
        console.log(sql);
        pool.query(sql)
            // .then(([data, fields]) => {
            //     //console.log(data);
            // })
            .catch((err) => {
                console.log(err);
            });
    },
    complete: function(id, callback) {
        var sql = "UPDATE ?? SET ??=? WHERE ??=?";
        var inserts = ['todo', 'complete', 1, 'id', id];
        sql = mysql2.format(sql, inserts);
        console.log(sql);
        pool.query(sql)
            .catch((err) => {
                console.log(err);
            });
    },
    delete: function(id, callback) {
        var sql = "DELETE FROM ?? WHERE ??=?";
        var inserts = ['todo', 'id', id];
        sql = mysql2.format(sql, inserts);
        console.log(sql);
        pool.query(sql)
            .catch((err) => {
                console.log(err);
            });

    }
};
module.exports = Tasks;