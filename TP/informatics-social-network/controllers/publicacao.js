var Publicacao = require('../models/publicacao')
const Joi = require('@hapi/joi')

const Publicacoes = module.exports


// Validar uma publicacao
Publicacoes.validatePublicacao = (publicacao) => {
    const schema = Joi.object({
        titulo: Joi.string()
                  .min(3)
                  .max(45)
                  .required(),
  
        curso: Joi.string()
                  .required(),
  
        descricao: Joi.string()
                  .required(),
        
        visivilidade: Joi.string()
                  .pattern(/(0|1|2|3)$/)
                  .required(),
        
    }).unknown(true)
  
    return schema.validate(publicacao)
}

// Função para listar todas as publicacoes
Publicacoes.listar = () => {
    return Publicacao
            .find()
            .sort({data: -1})
            .exec()
}

// Função para listar publicacoes de um utilizador
Publicacoes.consultarPerUser = id_utilizador => {
    return Publicacao
            .find({ id_utilizador: id_utilizador})
            .sort({data: -1})
            .exec()
}

// Função para listar todas as publicacoes publicas
Publicacoes.listarPublicas = () => {
    return Publicacao
            .find({ visivilidade: 0 })
            .sort({data: -1})
            .exec()
}

// Função para listar todas as publicacoes para alunos
Publicacoes.listarAlunos = () => {
    return Publicacao
            .find({ $or:[ {'visivilidade':0}, {'visivilidade':1}, {'visivilidade':3} ] })
            .sort({data: -1})
            .exec()
}

// Função para listar todas as publicacoes para docentes
Publicacoes.listarDocentes = () => {
    return Publicacao
            .find({ $or:[ {'visivilidade':0}, {'visivilidade':2}, {'visivilidade':3} ] })
            .sort({data: -1})
            .exec()
}

// Função para listar todas as publicacoes por curso para alunos
Publicacoes.listarCursoAluno = curso => {
    return Publicacao
        .find({ $and: [{ $or: [{curso: curso}] },{ $or: [{'visivilidade':0}, {'visivilidade':1}, {'visivilidade':3}] }]})
        .sort({data: -1})
        .exec()
}

// Função para listar todas as publicacoes por curso para docentes
Publicacoes.listarCursoDocente= curso => {
    return Publicacao
        .find({ $and: [{ $or: [{curso: curso}] },{ $or: [{'visivilidade':0}, {'visivilidade':2}, {'visivilidade':3}] }]})
        .sort({data: -1})
        .exec()
}

// Função para listar todas as publicacoes por titulo para alunos
Publicacoes.listarTituloAluno = titulo => {
    return Publicacao
        .find({ $and: [{ $or: [{titulo: titulo}] },{ $or: [{'visivilidade':0}, {'visivilidade':1}, {'visivilidade':3}] }]})
        .sort({data: -1})
        .exec()
}

// Função para listar todas as publicacoes por titulo para docentes
Publicacoes.listarTituloDocente = titulo => {
    return Publicacao
        .find({ $and: [{ $or: [{titulo: titulo}] },{ $or: [{'visivilidade':0}, {'visivilidade':2}, {'visivilidade':3}] }]})
        .sort({data: -1})
        .exec()
}

// Função para listar eventos por data para alunos
Publicacoes.listarDataAluno = data => {
    return Publicacao
            .find({ $and: [{ $or: [{data: data}] },{ $or: [{'visivilidade':0}, {'visivilidade':1}, {'visivilidade':3}] }]})
            .sort({data: -1})
            .exec()
}

// Função para listar eventos por data para alunos
Publicacoes.listarDataDocente = data => {
    return Publicacao
            .find({ $and: [{ $or: [{data: data}] },{ $or: [{'visivilidade':0}, {'visivilidade':2}, {'visivilidade':3}] }]})
            .sort({data: -1})
            .exec()
}

// Função para listar todas as publicacoes por vissivilidade para alunos
Publicacoes.listarVisivilidadeAluno = visivilidade => {
    return Publicacao
        .find({ $and: [{ $or: [{visivilidade: visivilidade}] },{ $or: [{'visivilidade':0}, {'visivilidade':1}, {'visivilidade':3}] }]})
        .sort({data: -1})
        .exec()
}

// Função para listar todas as publicacoes por visivilidade para docentes
Publicacoes.listarVisivilidadeDocente = visivilidade => {
    return Publicacao
        .find({ $and: [{ $or: [{visivilidade: visivilidade}] },{ $or: [{'visivilidade':0}, {'visivilidade':2}, {'visivilidade':3}] }]})
        .sort({data: -1})
        .exec()
}

// Função para consultar uma publicacao
Publicacoes.consultar = id => {
    return Publicacao
            .findOne({ _id: id})
            .exec()
}

// Função para consultar gostos de uma publicacao
Publicacoes.consultarGostos = (id,idUser) => {
    return Publicacao
            .findOne({ _id: id, gostos: idUser})
            .exec()
}

// Funçao que adiciona gosto numa publicacao
Publicacoes.addGosto = async (idUser,id) => {
    return Publicacao.updateOne(
                        { "_id": id }, 
                        { "$push": { "gostos": idUser } 
                    })
                    .exec()
}

// Funçao que adiciona comenatario numa publicacao
Publicacoes.addComentario = async (comentario,id) => {
    return Publicacao.updateOne(
                        { "_id": id }, 
                        { "$push": { "comentarios": comentario } 
                    })
                     .exec()
}

// Funçao que elimina publicacao
Publicacoes.remover = async (idPub) => {
    return Publicacao.deleteOne({_id:idPub})
}

// Função para remover um gosto de uma publicacao
Publicacoes.removerLike = async (idUser,idPub,) => {
    return Publicacao.update({ _id: idPub},{ $pull: { gostos: idUser}}, { multi: true })
}

// Função para remover um comentario de uma publicacao
Publicacoes.removerComentario = async (idComent,idPub) => {
    return Publicacao.update({ },{ $pull: { comentarios: { _id: idComent }}}, { multi: true })
}

// Função para inserir uma publicacao
Publicacoes.inserir = async (publicacao) => {
    var newPublicacao = new Publicacao(publicacao)
    return newPublicacao.save()
}

// Funçao que da update do ficheiros da publicacao
Publicacoes.addAnexos = async (files,id) => {
    return Publicacao.updateOne({ _id: id }, { anexos: files })
                     .exec()
}

// Funcao que atualiza uma publicacao
Publicacoes.atualiza = async (publicacao,id) => {
    return Publicacao.update({_id:id},{$set:{titulo:publicacao.titulo,curso:publicacao.curso,descricao:publicacao.descricao,visivilidade:publicacao.visivilidade}},{new: true},(erro,doc) => {
        if(!erro){
        }
        else{
            console.log('Não consegui atualizar publicacao')
        }
        
    })
}
