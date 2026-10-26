function media(lista) {
  if (lista.length === 0) return 0
  return lista.reduce((suma, alumno) => suma + alumno.nota, 0) / lista.length
}

function aprobados(lista) {
  return lista.filter((alumno) => alumno.nota >= 5)
}

function mejor(lista) {
  return lista.reduce((max, alumno) => (alumno.nota > max.nota ? alumno : max), lista[0])
}

module.exports = { media, aprobados, mejor }