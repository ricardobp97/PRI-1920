$(function() {
    var cont = 1
    $("#mais1").click(e => {
        e.preventDefault()
        cont++
        var campo = $('<div></div>', {class: 'w3-container', id: 'f'+cont})
        var ficheiro = $('<div></div>', {class: 'w3-cell-row', id: 'ficheiro'+cont})
        var ficheiroInput = $('<input/>', {class: 'w3-input w3-cell', type: "file", name: "ficheiro"})
        $("#lista").append(campo)
        $("#f"+cont).append(ficheiro)
        $("#ficheiro"+cont).append(ficheiroInput)
    })
})