var btnAdicionar = document.querySelector("#botao");
var btnConfirmar = document.querySelector("#confirmar");
var alvo;

if(localStorage.getItem("contador") == ""){
	localStorage.setItem("contador", 0);
}

for(var i=1; i<=localStorage.getItem("contador"); i++ ){
	
	var anexo = criarAnexo(localStorage.getItem("cor_" + i),i);
	criarIcone(anexo);
	adicionarTexto(anexo, localStorage.getItem("texto_" + i));

	if(anexo.querySelector("p").textContent == ""){
		//remove as div vazias do codigo
		anexo.remove();
		//Essa parte remove os cookies sem texto
		localStorage.removeItem("texto_"+i);
		localStorage.removeItem("cor_"+i);
	}
}

btnAdicionar.addEventListener("click", function(event) {
	event.preventDefault();

	var cor = document.querySelector("#cor");
	var busca = document.querySelector("#busca");
	var indice = localStorage.getItem("contador");

	//Criando anexos
	indice++;
	var anexo = criarAnexo(cor.value,indice);
	criarIcone(anexo);
	adicionarTexto(anexo, busca.value);

	//salvando o cookie
	localStorage.setItem("texto_" + indice, busca.value);
	localStorage.setItem("cor_" + indice, cor.value);
	localStorage.setItem("contador",indice);

	//resetando os campos
	form.busca.value = "";
	form.cor.value = "#000000";
});

btnConfirmar.addEventListener("click", function(event) {
	event.preventDefault();
});

function criarAnexo(cor,id){
	
	var  anexo = document.createElement("div");
	anexo.id = id;
	anexo.classList.add("bilhete");	
	document.body.appendChild(anexo);
	anexo.style.backgroundColor = cor;
	return anexo;
};	

function criarIcone(anexo){
	
	var editar = document.createElement("div");
	anexo.appendChild(editar);
	editar.classList.add("glyphicon", "glyphicon-pencil","icone");
	editar.addEventListener("click", editarAnexo);
	
	var excluir = document.createElement("div");
	anexo.appendChild(excluir);
	excluir.classList.add("glyphicon", "glyphicon-remove");
	excluir.addEventListener("click", apagarAnexo);
};

//adiciona o texto ao anexo
//PS: criei isso por que os icones bugavam com o texto
function adicionarTexto(anexo, busca){
	
	var texto = document.createElement("p");

	anexo.appendChild(texto);
	texto.textContent = busca;
	texto.classList.add("espaco");

};

function apagarAnexo(event){
	event.target.parentNode.classList.add("fade-out");
	var id = event.target.parentNode.id;
	localStorage.removeItem("texto_" + id);
	localStorage.removeItem("cor_" + id);
	
	setTimeout(	function(){
		event.target.parentNode.remove(); 
	}, 1000);
};

function editarAnexo(event){
//prepara os campos para edição
	alvo = event.target.parentNode;

	//adiciona  uma classe para identificar o anexo para edição
	alvo.querySelector("p").classList.add("texto");

	form.busca.value = alvo.innerText;
	btnConfirmar.classList.remove("invisible");
	btnAdicionar.classList.add("invisible");
	btnAdicionar.disabled = true;

	//atualiza os dados
	btnConfirmar.addEventListener("click", function (event) {
		var id = alvo.id;
		//altera o texto do anexo selecionado
		alvo.querySelector(".texto").innerText = form.busca.value;
	
		//remove a classe que identificava o texto do anexo para ediçao após a edição.
		alvo.querySelector(".texto").classList.remove("texto");
		btnAdicionar.classList.remove("invisible");
		btnConfirmar.classList.add("invisible");
		btnAdicionar.disabled = false;

		localStorage.setItem("texto_" + id, form.busca.value);
		//limpar os campos
		form.busca.value = "";
		form.cor.value = "#000000";
	});
}