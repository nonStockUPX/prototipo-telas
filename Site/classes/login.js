const encoder = body_parser.urlencoded();
class login{
    constructor(expressApp, connection){
        this.app = expressApp;
        this.connection = connection;
    }

    loginRequest(){
        this.app.post("/", encoder, function(req, res){
            const user = req.body.login;
            const senha = req.body.senha;

            this.connection.query("select * from user where email = ? and senha = ?", [user, senha], function(error, results, fields){
                if(results.length > 0){
                    res.redirect("/home.html");
                }
                else{
                    res.redirect("/");
                }
            })
        })
    }
}
