const listaUsuarios = JSON.parse(localStorage.getItem('infoLista'))
let formularioLog = document.getElementById('formularioLog')

formularioLog.addEventListener('submit', (event) => {
  event.preventDefault()
  loginUsuario()
})

function loginUsuario() {
  const name = document.getElementById("input-login")
  const senha = document.getElementById("input-senha")

  const usuarioLogando = listaUsuarios.find((dado) => {
    return dado.nome === name.value && dado.senha === senha.value
  })

  if (usuarioLogando) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogando))
    alert("Logado com sucesso !")
    window.location.href = "./recados.html"
    return
  } else {
    alert("Usuário não encontrado, verifique as credenciais e tente novamente")
  }
}