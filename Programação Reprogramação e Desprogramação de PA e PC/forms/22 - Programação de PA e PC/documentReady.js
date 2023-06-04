window.addEventListener('message',function(event){

	var url;

	if(window.location.href.search('5031')>0){

		url = 'http://delp5031:8080'

	}
	else{

		url = 'http://delp5013:8080'

	}

	// IMPORTANT: check the origin of the data!
	if (event.origin == url) {
		// The data was sent from your site.
		// Data sent with postMessage is stored in event.data:

		console.log(event.data);

		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		window['PLANOCORTE'].setValue(event.data.plano)
		$("#NUMPLANOCORTEREAL").val(event.data.plano)
		
		$("#CODCOLIGADA").val(event.data.coligada)
		$("#CODFILIAL").val(event.data.filial)
		
		window['PROJETO'].setValue(event.data.os)
		$("#CODPRJ").val(event.data.os)

		// $("#DATA_DE").click()
		// $("#DATA_DE").blur()
		// $("#BUSCARPLAN").click()

	} else {
		// The data was NOT sent from your site!
		// Be careful! Do not use it. This else branch is
		// here just for clarity, you usually shouldn't need it.
		console.log("message from an invalid origin")
		console.log("origin: " + event.origin)
		return;
	}
});

// CARREGA O FORMULÁRIO
$(document).ready(function(){

	// VARIÁVEL PARA GUARDAR ATIVIDADE ATUAL
	var atv = $("#ATIVIDADE").val();
	
	var mySimpleCalendar = FLUIGC.calendar('#DATA_DE');
	var mySimpleCalendar = FLUIGC.calendar('#ATE');
	var mySimpleCalendar = FLUIGC.calendar('#DATA_DE_DESP');
	var mySimpleCalendar = FLUIGC.calendar('#ATE_DESP');
	var mySimpleCalendar = FLUIGC.calendar('#NOVA_DATA');
	var mySimpleCalendar = FLUIGC.calendar('#NOVA_DATA2');
	
	var data = new Date()

	$("#DATA_ATUAL").val(formataDataDate(data))

	console.log("Sim, entrei no documentReady na atv ATT: "+atv)
	
	// SE ATIVIDADE FOR A INICIAL
	if(atv==0 || atv==4) {
		
		// MOSTRA/ESCONDE CAMPOS DO FORMULÁRIO
		$(".PLANEJAMENTO").hide()
		
		// ESCONDE/MOSTRA OS ÍCONES
		$("#ICONEXPANDIR").hide();
		$("#ICONREDUZIR").show();
		$(".expansor1").show()
		$(".expansor2").hide()
		$(".filtrosDesp").hide()
		$(".RADDESP").hide()
		$(".TOTALIZADOR").hide()
		$(".TOTALIZADORDESP").hide()


		$(".filtrosHab").hide()
		$(".expansor3").hide()
		$("#ICONREDUZIR3").hide()
		$("#ICONEXPANDIR3").hide()
		
		
		setTimeout(function(){
			
			// DESABILITA O CAMPO DO PLANO DE CORTE
			//$("#PLANOCORTE").prop("disabled",true)
			//$("#PLANOCORTEDESP").prop("disabled",true)
			$("#registro").prop("disabled",true)
		},500)
	
	}
	

	console.log("acabei o documentReady")
	
});



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

