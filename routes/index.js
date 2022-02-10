var express = require('express');
var router = express.Router();

const Aluno = require('../models/Aluno')//model aluno, isere um aluno

/* GET home page. */
router.get('/', (req, res, next)=> {
    res.render('index')

});

router.get('/listacadastro', (req, res, next)=>{
  Aluno.findAll().then((alunos)=>{//recebe todos os alunos
    res.render('listaCadastroTeste',{alunos: alunos})
    //listaCadastro
  })
})

router.get('/formulario', (req, res, next)=>{
  res.render('formulario')
})

router.post("/cadastrar",(req, res, next)=>{// não consigo acessar pela url
  var erros = []
  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
      erros.push({texto: "Nome inválido"})
  }
  if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
      erros.push({texto: "E-mail inválido"})
  }
  if(erros.length > 0){
      res.render("formulario", {erros: erros})
  }else{
        Aluno.findOne({ where: { email: req.body.email } }).then((aluno)=>{
            if(aluno){
              req.flash("error_msg", "E-mail já cadastrado. Tente novamente.")
              res.redirect('/formulario')
            }else{
                  Aluno.create({
                      nome: req.body.nome,
                      email: req.body.email,
                      endereco: req.body.endereco,
                      cidade: req.body.cidade,
                      estado: req.body.estado,
                      cep: req.body.cep
                  }).then(()=>{
                      res.cookie("dadosAluno", req.body.email)

                      res.redirect('/listacadastro')                      
                  }).catch((erro)=>{
                      req.flash("error_msg", "Erro ao salvar usuário")
                  })
              
                }
        })
    }
    

})

router.get('/cookie', (req, res, next)=>{
  res.send(req.cookies)
})

router.get('/deletar/:id', (req, res, next)=>{
  const { id } = req.params
  //Aluno.findOne({where: { id }})
  Aluno.destroy({where: { id }})
  res.redirect('/listacadastro')  
})

// editando um cadastro de aluno
router.get('/editar/:id',(req, res)=>{
  id=req.params.id
  res.render('editar')
})
router.post('/editar',(req, res)=>{
  Aluno.update({
    nome: req.body.nome,
    email: req.body.email,
    endereco: req.body.endereco,
    cidade: req.body.cidade,
    estado: req.body.estado,
    cep: req.body.cep
  }, {
      where: {id: id},
  }).then(()=>{
      res.redirect('/listacadastro')
  }).catch((erro)=>{
      console.log("erro")
  })
})


module.exports = router;
