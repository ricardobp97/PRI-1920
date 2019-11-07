function apagaFilme(arg){
    axios.delete('/filmes/' + arg)
        .then(response => window.location.assign('/filmes'))
        .catch(error => console.log(error))
}

function apagaActor(arg){
    var args = arg.split(',')
    var id = args[0]
    var actor = args[1]
    axios.delete(`/filmes/actor/${id}`, {data: {"cast": actor}})
        .then(response => window.location.assign(`/filmes/${id}`))
        .catch(error => console.log(error))
}

function apagaGenero(arg){
    var args = arg.split(',')
    var id = args[0]
    var genero = args[1]
    axios.delete(`/filmes/genero/${id}`, {data: {"genres": genero}})
        .then(response => window.location.assign(`/filmes/${id}`))
        .catch(error => console.log(error))
}