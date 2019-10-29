function apagaAluno(ident){
    console.log("Vou apagar o aluno: " + ident)
    axios.delete('/alunos/' + ident)
        .then(response => window.location.assign('/alunos'))
        .catch(error => console.log(error))
}

function apagaNota(ident){
    var p = ident.split(',')
    var id = p[0]
    var ind = p[1]
    console.log("Vou apagar a nota de: " + ind)
    axios.delete(`/alunos/${id}/notas/${ind}`)
        .then(response => window.location.assign(`/alunos/${id}`))
        .catch(error => console.log(error))
}