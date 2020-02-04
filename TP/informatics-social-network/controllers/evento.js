var Evento = require('../models/evento')
const Joi = require('@hapi/joi')

const Eventos = module.exports


// Validar evento
Eventos.validateEvento = (evento) => {
    const schema = Joi.object({
        titulo: Joi.string()
                  .min(3)
                  .max(45)
                  .required(),
  
        data: Joi.string()
                  .required(),
  
        local: Joi.string()
                  .required(),

        descricao: Joi.string()
                  .required(),
        
        hora: Joi.string()
                  .required(),
        
        visivilidade: Joi.string()
                  .pattern(/(0|1|2|3)$/)
                  .required(),
        
        tipo: Joi.string()
                  .pattern(/(Teste-Exame|Evento Científico|Album Fotografia|Reunião)$/)
                  .required(),
        
    }).unknown(true)
  
    return schema.validate(evento)
}

// Função para listar todos os eventos
Eventos.listar = () => {
    return Evento
            .find()
            .exec()
}

// Função para listar todas os eventos para os alunos
Eventos.listarAlunos = () => {
    return Evento
            .find({ $or:[ {'visivilidade':0}, {'visivilidade':1}, {'visivilidade':3} ] })
            .sort({data: -1})
            .exec()
}

// Função para listar todas os eventos para os docentes
Eventos.listarDocentes = () => {
    return Evento
            .find({ $or:[ {'visivilidade':0}, {'visivilidade':2}, {'visivilidade':3} ] })
            .sort({data: -1})
            .exec()
}

// Função para consultar um dado evento
Eventos.consultar = id => {
    return Evento
            .findOne({ _id: id})
            .exec()
}

// Função para listar eventos de um utilizador
Eventos.consultarPerUser = email_utilizador => {
    return Evento
            .find({ email_utilizador: email_utilizador})
            .exec()
}

// Função para listar utilizadores que vao ao envento
Eventos.consultarUser = (id,user) => {
    return Evento
            .findOne({ _id: id, utilizadores: user})
            .exec()
}

// Função para listar eventos por tipo
Eventos.listarTipo = tipo => {
    return Evento
        .find({tipo: tipo})
        .exec()
}


// Função para listar todos os eventos publicos
Eventos.listarPublicas = () => {
    return Evento
            .find({ visivilidade: 0 })
            .sort({data: -1})
            .exec()
}

// Função para listar eventos por titulo para alunos
Eventos.listarTituloAluno = titulo => {
    return Evento
            .find({ $and: [{ $or: [{titulo: titulo}] },{ $or: [{'visivilidade':0}, {'visivilidade':1}, {'visivilidade':3}] }]})
            .sort({data: -1})
            .exec()
}

// Função para listar eventos por uc para alunos
Eventos.listarUCAluno = uc => {
    return Evento
            .find({ $and: [{ $or: [{uc: uc}] },{ $or: [{'visivilidade':0}, {'visivilidade':1}, {'visivilidade':3}] }]})
            .sort({data: -1})
            .exec()
}

// // Função para listar eventos por visivilidade para alunos
Eventos.listarVisivilidadeAluno = visivilidade => {
    return Evento
            .find({ $and: [{ $or: [{visivilidade: visivilidade}] },{ $or: [{'visivilidade':0}, {'visivilidade':1}, {'visivilidade':3}] }]})
            .sort({data: -1})
            .exec()
}

// Função para listar eventos por tipo para alunos
Eventos.listarTipoAluno = tipo => {
    return Evento
            .find({ $and: [{ $or: [{tipo: tipo}] },{ $or: [{'visivilidade':0}, {'visivilidade':1}, {'visivilidade':3}] }]})
            .sort({data: -1})
            .exec()
}

// Função para listar eventos por data para alunos
Eventos.listarDataAluno = data => {
    return Evento
            .find({ $and: [{ $or: [{data: data}] },{ $or: [{'visivilidade':0}, {'visivilidade':1}, {'visivilidade':3}] }]})
            .sort({data: -1})
            .exec()
}

// Função para listar eventos por titulo para docentes
Eventos.listarTituloDocente = titulo => {
    return Evento
            .find({ $and: [{ $or: [{titulo: titulo}] },{ $or: [{'visivilidade':0}, {'visivilidade':2}, {'visivilidade':3}] }]})
            .sort({data: -1})
            .exec()
}

// Função para listar eventos por uc para docentes
Eventos.listarUCDocente = uc => {
    return Evento
            .find({ $and: [{ $or: [{uc: uc}] },{ $or: [{'visivilidade':0}, {'visivilidade':2}, {'visivilidade':3}] }]})
            .sort({data: -1})
            .exec()
}

// Função para listar eventos por visivilidade para docentes
Eventos.listarVisivilidadeDocente = visivilidade => {
    return Evento
            .find({ $and: [{ $or: [{visivilidade: visivilidade}] },{ $or: [{'visivilidade':0}, {'visivilidade':2}, {'visivilidade':3}] }]})
            .sort({data: -1})
            .exec()
}

// Função para listar eventos por tipo para docentes
Eventos.listarTipoDocente = tipo => {
    return Evento
            .find({ $and: [{ $or: [{tipo: tipo}] },{ $or: [{'visivilidade':0}, {'visivilidade':2}, {'visivilidade':3}] }]})
            .sort({data: -1})
            .exec()
}

// Função para listar eventos por data para docentes
Eventos.listarDataDocente = data => {
    return Evento
            .find({ $and: [{ $or: [{data: data}] },{ $or: [{'visivilidade':0}, {'visivilidade':2}, {'visivilidade':3}] }]})
            .sort({data: -1})
            .exec()
}

// Função para adicinar um utilizador ao evento
Eventos.addUtilizador = async (utilizador,id) => {
    return Evento.update(
                        { "_id": id }, 
                        { "$push": { "utilizadores": utilizador } 
                    })
                     .exec()
}

// Função para inserir um evento
Eventos.inserir = async (evento) => {
    var newEvento = new Evento(evento)
    return newEvento.save()
}

// Funçao que da update do ficheiros do evento
Eventos.addAnexos = async (files,id) => {
    return Evento.updateOne({ _id: id }, { anexos: files })
                     .exec()
}

// Função para remover evento
Eventos.remover = async (idEvento) => {
    return Evento.deleteOne({_id:idEvento})
}

// Função para remover utilizadores do evento
Eventos.removeUtilizador = async (idUser) => {
    return Evento.update({ },{ $pull: { utilizadores: { id_utilizador: idUser }}}, { multi: true })
}

// Funcao que atualiza um evento
Eventos.atualiza = async (evento,id) => {
    return Evento.update({_id:id},{$set:{tipo:evento.tipo,titulo:evento.titulo,evento:evento.data,visivilidade:evento.visivilidade,hora:evento.hora,descricao:evento.descricao,local:evento.local,uc:evento.uc,duracao:evento.duracao}},{new: true},(erro,doc) => {
        if(!erro){
        }
        else{
            console.log('Não consegui atualizar evento')
        }
        
    })
}