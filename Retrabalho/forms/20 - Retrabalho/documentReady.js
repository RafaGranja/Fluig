// CARREGA AS INFORMAÇÕES NO FORMULÁRIO
$(document).ready(function(){

	// VARIÁVEL PARA GUARDAR ATIVIDADE ATUAL
	var atv = $("#ATIVIDADE").val();
		
	console.log("Sim, entrei no documentReady na atv: "+atv)
	
	// SE ATIVIDADE FOR A INICIAL
	if(atv==0) {
	
		// ESCONDE CAMPOS DO FORMULÁRIO
		$(".FORMULARIO").hide()
		$("#EXCLUSIVO1").val("")
		$(".OPGERADA").hide()
		
		setTimeout(function(){
			
			// DESABILITA CAMPO ZOOM DA OP
			$("#OP_INFO").prop("disabled",true)
			
		},500)
		
	}
	
	// SE ATIVIDADE INICIAL SALVA OU DE EDIÇÃO
	if(atv==4 || atv==11){
		
		$("#EXCLUSIVO1").val("")
		
		var codOrdem = $("#CODORDEM").val()
		var numOS = $("#NUM_OS").val()
		$(".OPGERADA").hide()
		
		// SE O CÓDIGO DA ORDEM OU O NÚMERO DA OS JÁ FOI INFORMADO
		if(!((codOrdem=="" || codOrdem==null || codOrdem==undefined) || (numOS=="" || numOS==null || numOS==undefined))){
	
			// MOSTRA/ESCONDE CAMPOS NECESSÁRIOS
			$(".CABECALHO").hide()
			$(".FORMULARIO").show()
			$("#DIV_INDICECOPIA").hide()
			
			$("#F_UNDMEDIDA").prop("disabled",true)
			$("#RAD2_ACABADO").prop("disabled",true)
			$("#RAD2_SEMI").prop("disabled",true)
			$("#F_COMPORLISTA").prop("disabled",true)
			
			// BUSCAR INFORMAÇÕES DO CHECKBOX "TIPO" E "COMPOR LISTA" E "UND MEDIDA"
			buscaInfoItem()
			
			// AJUSTA OS EXPANSORES DA TABELA DE PROCESSOS
			ajustaExpansoresProc()
			
			// DESABILITA OS CAMPOS DO FORMULÁRIO
			desabilitaCampos()
			
		} else {
			
			// MOSTRA/ESCONDE CAMPOS NECESSÁRIOS
			$(".CABECALHO").show()
			$(".FORMULARIO").hide()
			
		}
		
	}
	
	// SE ATIVIDADE FOR A FINAL
	if(atv==25){
		
		$(".OPGERADA").show()
		
		// BUSCAR INFORMAÇÕES DO CHECKBOX "TIPO" E "COMPOR LISTA" E "UND MEDIDA"
		buscaInfoItem()
			
		// AJUSTA OS EXPANSORES DA TABELA DE PROCESSOS
		ajustaExpansoresProc()
		
		// DESABILITA OS CAMPOS DO FORMULÁRIO
		desabilitaCampos()
		
		// MOSTRA/ESCONDE CAMPOS NECESSÁRIOS
		$(".CABECALHO").show()
		$(".FORMULARIO").show()
		$(".CONFIRMA_RETRABALHO").hide()
		$(".SALVAR").hide()
		$(".CANCELAR").hide()
		
		$("#OS_INFO").css("background-color","#d1d3d4")
		$("#OP_INFO").css("background-color","#d1d3d4")
		
	}
	
})



//SCRIPT PARA BLOQUEAR USO DO INSPECIONAR PARA USUÀRIOS QUE NÂO SÂO ADMIN
/**
* Retorna as roles do usuário logado atualmente
* @param cod O código do usuário
* @returns O nome do usuário logado que está cadastrado no Fluig
*/
function retornaArrayRole(){

	var array = new Array();

 	var usuario = $("#CODUSUARIOATUAL").val();
	if(usuario==null || usuario == "" || usuario == undefined){

		usuario = window.parent.window.WCMAPI.userCode
		console.log(window.parent.window.WCMAPI.userCode)
	}
	console.log(usuario)
	var c1 = DatasetFactory.createConstraint("CODIGO", usuario, usuario, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("dsRoleUsuario", null, constraints, null);

	var row = dataset.values
	var count = row.length

	for (var i = 0; i < count; i++) {
		
		var rep = row[i]
		
		array.push(rep["ROLE_CODE"])
		
	}

	return array;

}
window.parent.window.addEventListener("contextmenu", function(e) {
	console.log("Tentou inspecionar")
	var roles = retornaArrayRole()
	if(!roles.includes("admin")){
		e.preventDefault();
		return false;
	}
});

window.addEventListener("contextmenu", function(e) {
	console.log("Tentou inspecionar")
	var roles = retornaArrayRole()
	if(!roles.includes("admin")){
		e.preventDefault();
		return false;
	}
});


window.parent.window.addEventListener('keydown', function(event){

	console.log("Tentou inspecionar")

	event = event || window.event;
	var code = (event.key==null || event.key==undefined || event.key=="" ) ? event.which : event.key;
	if (
		(event.ctrlKey &&
		(code === 'u' || code === 'U' || code === 's' || code === 'S')) || code==='F12' 
	) {

		var roles = retornaArrayRole()
		if(!roles.includes("admin")){

			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
			return false;

		}
	}
	

});

window.addEventListener('keydown', function(event){

	console.log("Tentou inspecionar")

	event = event || window.event;
	var code = (event.key==null || event.key==undefined || event.key=="" ) ? event.which : event.key;
	if (
		(event.ctrlKey &&
		(code === 'u' || code === 'U' || code === 's' || code === 'S')) || code==='F12' 
	) {

		var roles = retornaArrayRole()
		if(!roles.includes("admin")){

			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
			return false;

		}
	}
	

});

window.parent.window.attachEvent("oncontextmenu", function(e) {
	console.log("Tentou inspecionar")
	var roles = retornaArrayRole()
	if(!roles.includes("admin")){
		e = e || window.event;
		e.returnValue = false;
		return false;
	}
});

window.attachEvent("oncontextmenu", function(e) {
	console.log("Tentou inspecionar")
	var roles = retornaArrayRole()
	if(!roles.includes("admin")){
		e = e || window.event;
		e.returnValue = false;
		return false;
	}
});

window.parent.window.attachEvent('onkeydown', function(event){

	console.log("Tentou inspecionar")
	event = event || window.event;
	var code = (event.key==null || event.key==undefined || event.key=="" ) ? event.which : event.key;
	if (
		(event.ctrlKey &&
		(code === 'u' || code === 'U' || code === 's' || code === 'S')) || code==='F12' //83 = S, 85 = U
	) {
		var roles = retornaArrayRole()
		if(!roles.includes("admin")){
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
			return false;
		}
	}

});


window.attachEvent('onkeydown', function(event){

	console.log("Tentou inspecionar")
	event = event || window.event;
	var code = (event.key==null || event.key==undefined || event.key=="" ) ? event.which : event.key;
	if (
		(event.ctrlKey &&
		(code === 'u' || code === 'U' || code === 's' || code === 'S')) || code==='F12' //83 = S, 85 = U
	) {
		var roles = retornaArrayRole()
		if(!roles.includes("admin")){
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
			return false;
		}
	}

});

