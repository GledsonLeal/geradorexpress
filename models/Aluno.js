const db = require('./db')

const Aluno = db.sequelize.define('tabela_aluno',{
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    endereco: {
        type: db.Sequelize.STRING
    },
    cidade: {
        type: db.Sequelize.STRING
    },
    estado: {
        type: db.Sequelize.STRING
    },
    cep: {
        type: db.Sequelize.STRING
    }
})

//Aluno.sync({force: true})//depois de criar, comentar ou apagar
module.exports = Aluno