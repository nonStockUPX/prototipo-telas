const mysql = require('mysql2');
class ConnectionFactory{
    constructor(config){
        this.connection = mysql.createConnection(config);
    }

    connect(){
        this.connection.connect((err) => {
            if(err){
                console.error('Erro ao Conectar ao Servidor', err);
                throw err;
            }
            console.log('Conexão bem sucedida com o servidor')
        });
    }

    query(sql, args){
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) =>{
                if (err) return reject(err);
                resolve(err);
            })
        });
    }
    
    close(){
        this.connection.end((err) => {
            if(err){
                console.error('Erro ao fechar a conexão com o servidor');
                throw err;
            }
            console.log('Conexão fechada com sucesso');
        });
    }
}
connection.end();
module.exports = ConnectionFactory;