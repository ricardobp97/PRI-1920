var Utilizador = require('../models/utilizador')
const Joi = require('@hapi/joi')
var bcrypt = require('bcrypt')
const Utilizadores = module.exports


// Função para validar as credenciais
Utilizadores.validateCredentials = (credentials) => {
    const schema = Joi.object({
        email: Joi.string()
                  .email({ minDomainSegments: 2 })//, tlds: { allow: ['com', 'net', 'pt', 'br', 'es', 'it', 'fr', 'uk', 'de', 'ca', 'jp', 'co'] } })
                  .required(),

        password: Joi.string()
                     .required()
    }).unknown(true)

    return schema.validate(credentials)
}

// Função para validar um utilizador
Utilizadores.validateUtilizador = (utilizador) => {
    const schema = Joi.object({
        nome: Joi.string()
                  .pattern(/^[a-zA-Z]+(([ ][a-zA-Z ])?[a-zA-Z]*)*$/)
                  .min(3)
                  .max(45)
                  .required(),

        curso: Joi.string()
                  .required(),

        local: Joi.string()
                  .pattern(/^[a-zA-Z]+(([ ][a-zA-Z ])?[a-zA-Z]*)*$/)
                  .min(3)
                  .max(45),
        
        email: Joi.string()
                  .email({ minDomainSegments: 2 })//, tlds: { allow: ['com', 'net', 'pt', 'br', 'es', 'it', 'fr', 'uk', 'de', 'ca', 'jp', 'co'] } })
                  .required(),

        password: Joi.string()
                     .pattern(/[a-zA-Z]|[\-_@#!*]|[0-9]$/)
                     .required(),
        
        tipoUtilizador: Joi.string()
                  .pattern(/(Docente|Aluno|aluno|docente)$/)
                  .required(),
        
        genero: Joi.string()
                    .pattern(/(Masculino|Feminino|masculino|feminino)$/)
                    .required()
    }).unknown(true)

    return schema.validate(utilizador)
}

// Função para listar todos os utilizadores
Utilizadores.listar = () => {
    return Utilizador
            .find()
            .exec()
}

// Função para listar um dado utilizador
Utilizadores.consultar = email => {
    return Utilizador
            .findOne({ email: email})
            .exec()
}

// Função para listar os utilizadores por tipo
Utilizadores.listarUtilizadorTipo = tipo => {
    return Utilizador
        .find({tipoUtilizador: tipo})
        .exec()
}

// Função para inserir um utilizador normal
Utilizadores.inserir = async (utilizador) => {
    var hash = await bcrypt.hash(utilizador.data.password, 10)
    utilizador.data.password = hash
    if(utilizador.image) {
        utilizador.data.fotografia = utilizador.image
    }
    var newUtilizador = new Utilizador(utilizador.data)
    return newUtilizador.save()
}

// Função para inserir um utilizador por ficheiro
Utilizadores.inserirNoFotografia = async (utilizador) => {
    var hash = await bcrypt.hash(utilizador.password, 10)
    utilizador.password = hash
    var newUtilizador = new Utilizador(utilizador)
    return newUtilizador.save()
}

// Função para inserir um admin
Utilizadores.inserirAdmin = async (utilizador) => {
    var hash = await bcrypt.hash(utilizador.password, 10)
    utilizador.password = hash
    var newUtilizador = new Utilizador(utilizador)
    return newUtilizador.save()
}

// Funçao que da update do path da foto de perfil
Utilizadores.renamePathImageProfile = async (image,id) => {
    return Utilizador.updateOne({ _id: id }, { fotografia: image})
                     .exec()
}

// Funçao que da update do estado do utilizador
Utilizadores.atualizaEstado = async (id,estado) => {
    return Utilizador.updateOne({ _id: id }, { ativo: estado})
                     .exec()
}

// Função para remover um dado utilizador 
Utilizadores.remove = email => {
    return Utilizador.findOneAndRemove({ email: email }, (erro, doc) => {
        if(!erro){
            console.log('Utilizador removido com sucesso')
        }
        else{
            console.log('Não consegui remover utilizador')
        }
        
    })
} 

// Função para actualizar um dado utilizador
Utilizadores.atualiza = async utilizador => {
    if(utilizador.password) {
        var hash = await bcrypt.hash(utilizador.password, 10)
        return Utilizador.update({email:utilizador.email},{$set:{password:hash,nome:utilizador.nome,curso:utilizador.curso,local:utilizador.local}},{new: true},(erro,doc) => {
            if(!erro){
            }
            else{
                console.log('Não consegui atualizar utilizador')
            }
            
        })
    } else {
        return Utilizador.update({email:utilizador.email},{$set:{nome:utilizador.nome,curso:utilizador.curso,local:utilizador.local}},{new: true},(erro,doc) => {
            if(!erro){
            }
            else{
                console.log('Não consegui atualizar utilizador')
            }
            
        })
    }
}
