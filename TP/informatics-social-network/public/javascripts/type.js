function onlyOneType(checkbox) {
  var checkboxes = document.getElementsByName('tipoUtilizador')
  checkboxes.forEach((item) => {
    if (item == checkbox) item.checked = true
})
  checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
  })
}

function onlyOneGenre(checkbox) {
  var checkboxes = document.getElementsByName('genero')
  checkboxes.forEach((item) => {
    if (item == checkbox) item.checked = true
})
  checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
  })
}

function onlyOneVisibility(checkbox) {
  var checkboxes = document.getElementsByName('visivilidade')
  checkboxes.forEach((item) => {
    if (item == checkbox) item.checked = true
})
  checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
  })
}