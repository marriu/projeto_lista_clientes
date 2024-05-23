const space = document.querySelectorAll("input");
const spans = document.querySelectorAll("span");
const formulario = document.querySelector("#formulario");
const nome = document.querySelector("#nome");
const telefone = document.querySelector("#telefone");
const endereco = document.querySelector("#endereco");
const body = document.body;
let lista_usuarios = JSON.parse(localStorage.getItem("users")) || [];

const handlePhone = (event) => {
  let input = event.target;
  input.value = phoneMask(input.value);
};

const phoneMask = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

const inputValidation = (input, spanIndex, errorMessage) => {
  if (input.value.length < 3) {
    spans[spanIndex].textContent = errorMessage;
    spans[spanIndex].style.color = '#8D6A9F';
    input.style.border = "1px solid #8D6A9F";
    spans[spanIndex].style.display = "block";
  } else {
    input.style.border = "";
    spans[spanIndex].style.display = "none";
  }
};

const inputName = () => {
  inputValidation(space[0], 0, "Insira um nome válido");
};

const inputTel = () => {
  inputValidation(space[1], 1, "Insira um número válido");
};

const inputEnd = () => {
  inputValidation(space[2], 2, "Insira um endereço válido");
};

const sendForm = () => {
  inputName();
  inputEnd();
  inputTel();

  let username = nome.value.trim();
  let phone = telefone.value.trim();
  let adress = endereco.value.trim();

  if (username !== "" || phone !== "" || adress !== "") {
    window.location.href = 'index.html';
    localStorage.setItem("Usuário", username);
    localStorage.setItem("Telefone", phone);
    localStorage.setItem("Endereço", adress);
  }
};

formulario.addEventListener("submit", (e) => {
  if (nome.value == '' || telefone.value == '' || endereco.value == '') {
    inputName();
    inputEnd();
    inputTel();
  } else {
    e.preventDefault();

    const objeto_usuario = {
      name: nome.value,
      tel: telefone.value,
      adress: endereco.value
    };

    lista_usuarios.push(objeto_usuario);
    localStorage.setItem("users", JSON.stringify(lista_usuarios));

    nome.value = '';
    telefone.value = '';
    endereco.value = '';

    buscarDados();
  }
});

const buscarDados = () => {
  const containerDiv = document.createElement("div");
  containerDiv.id = "container";

  lista_usuarios.forEach((usuario_atual, index) => {
    const novaDiv = document.createElement("div");
    novaDiv.classList.add("caixas");

    const nome_usuario = document.createElement("p");
    nome_usuario.textContent = `Nome: ${usuario_atual.name}`;

    const telefone_usuario = document.createElement("p");
    telefone_usuario.textContent = `Telefone: ${usuario_atual.tel}`;

    const endereco_usuario = document.createElement("p");
    endereco_usuario.textContent = `Endereço: ${usuario_atual.adress}`;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const editButton = document.createElement("button");
    editButton.classList.add("icon-button");
    editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';
    editButton.addEventListener("click", () => {
      editarUsuario(index);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("icon-button");
    deleteButton.innerHTML = '<i class="bi bi-trash-fill"></i>';
    deleteButton.addEventListener("click", () => {
      excluirUsuario(index);
    });

    buttonContainer.append(editButton, deleteButton);

    novaDiv.append(nome_usuario, telefone_usuario, endereco_usuario, buttonContainer);
    containerDiv.append(novaDiv);
  });

  const existingContainer = document.querySelector("#container");
  if (existingContainer) {
    existingContainer.remove();
  }

  body.append(containerDiv);
};

const excluirUsuario = (index) => {
  lista_usuarios.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(lista_usuarios));
  buscarDados();
};

const editarUsuario = (index) => {
  localStorage.setItem("usuario_editar", JSON.stringify(lista_usuarios[index]));
  window.location.href = 'editar.html';
};

buscarDados();