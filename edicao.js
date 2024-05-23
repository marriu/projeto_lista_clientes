document.addEventListener("DOMContentLoaded", function() {
    const usuarioEditar = JSON.parse(localStorage.getItem("usuario_editar"));

    document.getElementById("nome").value = usuarioEditar.name;
    document.getElementById("telefone").value = usuarioEditar.tel;
    document.getElementById("endereco").value = usuarioEditar.adress;

    document.getElementById("salvar").addEventListener("click", function() {
        const lista_usuarios = JSON.parse(localStorage.getItem("users")) || [];
        const index = lista_usuarios.findIndex(user => user.name === usuarioEditar.name);
        lista_usuarios[index] = {
            name: document.getElementById("nome").value,
            tel: document.getElementById("telefone").value,
            adress: document.getElementById("endereco").value
        };

        localStorage.setItem("users", JSON.stringify(lista_usuarios));

        window.location.href = 'index.html';
    });

    document.getElementById("cancelar").addEventListener("click", function() {
        window.location.href = 'index.html';
    });
});