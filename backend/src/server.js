const express = require('express');
const cors = require('cors');

const porta = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(porta, () => console.log(`Rodando na porta ${porta}`));

const connection = require('./db_config');
const upload = require('./multer')

app.post('/usuario/cadastrar', (request,response) => {
    let params = Array(
        request.body.name,
        request.body.email,
        request.body.password,
        request.body.cpf_number,
    );

    let query = "INSERT INTO users(name,email,password,cpf_number) VALUES(?,?,?,?);";

    connection.query(query,params, (err,results) => {
        if(results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
})

app.get('/usuario/listar', (request,response) => {
    const query = "SELECT * FROM users";

    connection.query(query,params, (err,results) =>{
        if(results) {
            response
            .status(200)
            .json({
                sucess: true,
                message: "Sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "sem sucesso",
                data: err
            })
        }
    })

    
})

app.put('/usuario/editar/:id', (request,response) => {
    let params = Array(
        resquest.body.name,
        request.params.id
    );

    let query = "UPDATE users SET name = ? WHERE id = ?";
    
    connection.query(query, params, (err, results) => {
        if(results) {
            response 
            .status(200)
            .json({
                sucess: true,
                message: "sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
})

app.delete('/usuario/deletar/:id', (request,response) => {
    let params = Array(
        request.params.id
    );

    let query = "DELETE FROM users WHERE id = ?;"

    Connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(200)
            .json({
                sucess: true,
                message: "sucesso",
                data: results
            })
        } else {
            response 
            .status(400)
            .json({
                sucess: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
})

app.post('/login', (request, response) => {
    let params = Array(
        request.body.email
    )

    let query = "SELECT name,email,password,perfil FROM users WHERE email = ?";

    connection.query(query, params, (err, results) => {
        if(results.length > 0) {
            let senhaDigitada = request.body.password
            let senhaBanco = results[0].password

            if (senhaBanco == senhaDigitada) {
            response
              .status(200)
              .json({
                success: true,
                message: "Sucesso",
                data: results[0]
              })
          } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Verifique sua senha!"
            })
          }
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Email não cadastrado!"
            })
        }
    })
})

// Rota para favoritar um item
app.post('/favoritar', (request, response) => {
    const userId = request.body.userId;
    const itemId = request.body.itemId;
  
    let query = "INSERT INTO favorites (user_id, item_id) VALUES (?, ?)";
    let params = [userId, itemId];
  
    connection.query(query, params, (err, results) => {
      if (results) {
        response
          .status(201)
          .json({
            success: true,
            message: "Favorito salvo com sucesso!",
            data: results
          })
      } else {
        response
          .status(400)
          .json({
            success: false,
            message: "Erro ao salvar favorito",
            data: err
          })
      }
    })
  })
  
  // Rota para recuperar os favoritos de um usuário
  app.get('/favoritos/:userId', (request, response) => {
    const userId = request.params.userId;
  
    let query = "SELECT * FROM favorites WHERE user_id = ?";
    let params = [userId];
  
    connection.query(query, params, (err, results) => {
      if (results) {
        response
          .status(200)
          .json({
            success: true,
            message: "Favoritos recuperados com sucesso!",
            data: results
          })
      } else {
        response
          .status(400)
          .json({
            success: false,
            message: "Erro ao recuperar favoritos",
            data: err
          })
      }
    })
  })

  app.post('/produto/cadastrar', upload.single('file'), (request, response) => {
    let params = Array(
        request.boby.title,
        request.boby.price,
        request.file.filename
    )

    let query = "INSERT INTO products(title,price,image) VALUES(?,?,?)";

    connetuon.query(query,params, (err, results) => {
        if(results) {
            response
               .status(201)
               .json({
                success: true,
                message: "Sucesso!",
                data: results
               })

        } else {
            response
               .status(400)
               .json({
                success: false,
                message: "Sem sucesso!",
                data: err
        })
    }
})
})


app.use('/uploads', express.static(__dirname + '\\public'));

app.get('/produtos/listar', (request, response) => {
    let query = "SELECT * FROM products";

    connection.query(query, (err, results) => {
        if (results) {
            response
            .status(200)
            .json({
                success: true,
                message: "Sucesso!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso!",
                data: results
            });
        }
    });
});

app.put('/produto/:id', upload.single('file'), (request, response) => {
    let params = Array(
        request.body.titulo,
        request.body.preco,
        request.file.filename,
        request.params.id
    );
 
    let query = `UPDATE products SET title = ?, price = ?, image = ? WHERE id = ?`;
 
    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(200)
            .json({
                success: true,
                message: "Sucesso!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso!",
                data: err
            })
        }   
    })
})