$(document).ready(function(){

	// VARIÁVEL PARA GUARDAR ATIVIDADE ATUAL
	var atv = $("#ATIVIDADE").val();
	//var mySimpleCalendar = FLUIGC.calendar('#DATA_DE');
	
	console.log("Sim, entrei no documentReady na atv: "+atv)
	
	// SE ATIVIDADE FOR A INICIAL
	if(atv==0 || atv==4) {
		
		var dataCriacao = new Date()
		console.log("dataCriacao: "+dataCriacao)
		
		//dataCriacao = dataCriacao.toLocaleString()
		//console.log("dataCriacao: "+dataCriacao)
		
		dataCriacao = formataDataDate(dataCriacao)
		
		/*dataCriacao = dataCriacao.split(" ")
		
		console.log("dataCriacao: "+dataCriacao[0])
		
		$("#DATACRIACAO").val(dataCriacao[0])
		$("#DATACRIACAOED").val(dataCriacao[0])*/
	
		$("#DATACRIACAO").val(dataCriacao)
		$("#DATACRIACAOED").val(dataCriacao)
		
		dataCriacao = formataDataBanco(dataCriacao[0])
		console.log("Data banco: "+dataCriacao)
		$("#DATACRIACAOBANCO").val(dataCriacao)
		$("#DATACRIACAOEDBANCO").val(dataCriacao)

		
		
		$(".CADASTRO").show()
		$(".EDICAO").hide()
		$(".filtrosCadastro").show()
		$(".filtrosEdicao").hide()
		$(".CONSULTA").hide()
		$(".filtrosConsulta").hide()

		$(".sectionED").hide()
		$(".sectionCAD").hide()

		iniciaWeekPickerCad()
		iniciaWeekPickerEd()

		var settings = {
			resize_enabled: true,
			width: "auto",
			height: "280",
			allowedContent: true
		};

		//var complemento = FLUIGC.richeditor("COMPLEMENTOCAD",settings);
		//var complemento2 = FLUIGC.richeditor("COMPLEMENTOED",settings);

		var datanecessidade = FLUIGC.calendar('#DATA_NECESSIDADEED', {
			pickDate: true, 
			pickTime: false, 
			minDate: FLUIGC.calendar.formatDate(new Date(), 'l'),
			showToday: true,
			language: 'pt-br',
			defaultDate: new Date().toLocaleDateString(),
			disabledDates: [],
			enabledDates: [],
			useStrict: false,
			sideBySide: false,
			daysOfWeekDisabled: [0]
		});

		var datanecessidade2 = FLUIGC.calendar('#DATA_NECESSIDADECAD', {
			pickDate: true, 
			pickTime: false, 
			minDate: FLUIGC.calendar.formatDate(new Date(), 'l'),
			showToday: true,
			language: 'pt-br',
			defaultDate: new Date().toLocaleDateString(),
			disabledDates: [],
			enabledDates: [],
			useStrict: false,
			sideBySide: false,
			daysOfWeekDisabled: [0]
		});

		$(window).scroll(function() { 

			var scroll = $(window).scrollTop();
		
			if (scroll > 450) {
				$('.dash').addClass('dashlateral');
			} else {
				$('.dash').removeClass('dashlateral');
			}
		});

		//CONFIGURAÇÃO DOS SLIDERS DE PRIORIDADE

		// var options = {

		// 	min: 0,
		// 	max: 2,
		// 	range: false,
		// 	value: 0,
		// 	step: 1,
		// 	orientation :'horizontal',
		// 	id : 'IDSLIDERPRIORIDADECAD',
		// 	enabled : true,
		// 	formatter: function(value) {
		// 		switch (value){
		// 			case 0:
		// 				$("#IDSLIDERPRIORIDADECAD").children(".slider-track").children(".slider-handle .min-slider-handle .round").attr('style','background-image:-webkit-linear-gradient(top,#1ab83f 0,#1ab83f 100%) !important;')
		// 				return 'Baixa'
						
		// 			case 1:
		// 				$("#IDSLIDERPRIORIDADECAD").children(".slider-track").children(".slider-handle .min-slider-handle .round").attr('style','background-image:-webkit-linear-gradient(top,#ffe300 0,#ffe300 100%) !important;')
		// 				return 'Média'

		// 			case 2:
		// 				$("#IDSLIDERPRIORIDADECAD").children(".slider-track").children(".slider-handle .min-slider-handle .round").attr('style','background-image:-webkit-linear-gradient(top,#f00 0,#f00 100%) !important;')
		// 				return 'Alta'
		// 			default:
		// 				return 'Baixa, Média ou Alta';
		// 		}
		// 	}

		// }

		// var options2 = {

		// 	min: 0,
		// 	max: 2,
		// 	range: false,
		// 	value: 0,
		// 	step: 1,
		// 	orientation :'horizontal',
		// 	id : 'IDSLIDERPRIORIDADEED',
		// 	enabled : true,
		// 	formatter: function(value) {
		// 		switch (value){
		// 			case 0:
		// 				$("#IDSLIDERPRIORIDADEED").children(".slider-track").children(".slider-handle .min-slider-handle .round").attr('style','background-image:-webkit-linear-gradient(top,#1ab83f 0,#1ab83f 100%) !important;')
		// 				return 'Baixa'
						
		// 			case 1:
		// 				$("#IDSLIDERPRIORIDADEED").children(".slider-track").children(".slider-handle .min-slider-handle .round").attr('style','background-image:-webkit-linear-gradient(top,#ffe300 0,#ffe300 100%) !important;')
		// 				return 'Média'

		// 			case 2:
		// 				$("#IDSLIDERPRIORIDADEED").children(".slider-track").children(".slider-handle .min-slider-handle .round").attr('style','background-image:-webkit-linear-gradient(top,#f00 0,#f00 100%) !important;')
		// 				return 'Alta'
		// 			default:
		// 				return 'Baixa, Média ou Alta';
		// 		}
		// 	}

		// }

		// $("#IDSLIDERPRIORIDADECAD").on('mouseup', function(){

		// 	var value = Number($("#SLIDERPRIORIDADECAD").val())
		
		// 	switch (value) {
		// 		case 0:
		// 			$("#IDSLIDERPRIORIDADECAD").children(".slider-track").children(".slider-selection").attr('style','background-image:-webkit-linear-gradient(top,#1ab83f 0,#1ab83f 100%) !important;')
		// 			break;
		// 		case 1:
		// 			$("#IDSLIDERPRIORIDADECAD").children(".slider-track").children(".slider-selection").attr('style','background-image:-webkit-linear-gradient(top,#ffe300 0,#ffe300 100%) !important;')
		// 			break;
		// 		case 2:
		// 			$("#IDSLIDERPRIORIDADECAD").children(".slider-track").children(".slider-selection").attr('style','background-image:-webkit-linear-gradient(top,#f00 0,#f00 100%) !important;')
		// 			break;
		// 		default:
		// 			break;
		// 	}
	
	
	
		// })
	
		
		// $("#IDSLIDERPRIORIDADEED").on('mouseup', function(){
	
		// 	var value = Number($("#SLIDERPRIORIDADEED").val())
		
		// 	switch (value) {
		// 		case 0:
		// 			$("#IDSLIDERPRIORIDADEED").children(".slider-track").children(".slider-selection").attr('style','background-image:-webkit-linear-gradient(top,#1ab83f 0,#1ab83f 100%) !important;')
		// 			break;
		// 		case 1:
		// 			$("#IDSLIDERPRIORIDADEED").children(".slider-track").children(".slider-selection").attr('style','background-image:-webkit-linear-gradient(top,#ffe300 0,#ffe300 100%) !important;')
		// 			break;
		// 		case 2:
		// 			$("#IDSLIDERPRIORIDADEED").children(".slider-track").children(".slider-selection").attr('style','background-image:-webkit-linear-gradient(top,#f00 0,#f00 100%) !important;')
		// 			break;
		// 		default:
		// 			break;
		// 	}
	
			
	
		// })

		//var slider1 = FLUIGC.slider.init('#SLIDERPRIORIDADECAD',options);
		//var slider2 = FLUIGC.slider.init('#SLIDERPRIORIDADEED',options2);

		
		// VERIFICA SE VAI EXIBIR/ESCONDE TABELAS
		verificaTabelas()
		
		setTimeout(function(){
			
			// DESABILITA OS CAMPOS
			$("#ATIVIDADEPLANCAD").prop("disabled",true)
			$("#MATERIALPLANCAD").prop("disabled",true)
			$("#DESENHOCAD").prop("disabled",true)
			$("#LOTECAD").prop("disabled",true)
			$("#CODMPCAD").prop("disabled",true)
			$("#LOTEED").prop("disabled",true)
			$("#CODMPED").prop("disabled",true)
			$("#QTDESUCATAPLANCAD").prop("disabled",true)
			$("#QTDEPECASPLANCAD").prop("disabled",true)
			$("#QTDESUCATAPLANED").prop("disabled",true)
			$("#SUCATAED").prop("disabled",true)
			$("#CODSUCATA").prop("disabled",true)
			$("#RETALHOCAD").prop("disabled",true)
			$("#QTDRETALHOCAD").prop("disabled",true)
			$("#RETALHOED").prop("disabled",true)
			$("#QTDRETALHOED").prop("disabled",true)

			/*$("#QTDEMPED").prop("readonly",true)
			$("#SUCATAED").prop("disabled",true)
			$("#QTDESUCATAPLANED").prop("readonly",true)
			$("#RETALHOED").prop("readonly",true)*/
			
			habilitaNumPlano()
		
		},500)
		
		var calculadora=document.getElementById("calculadora");
		calculadora.style.display='none';
		$("#TEMCALCULADORA").val(0)
	}
	
});


parent.$('.wcm-all-content').bind('DOMNodeInserted', function(e){

    // QUANDO APARECER A TELA DE "SOLICITAÇÃO INICIADA COM SUCESSO" IRÁ ENTRAR NESSE IF
    if (e.target.id == 'message-page') {
 
     // ESCONDE A OPÇÃO DE "INICIAR SOLICITAÇÃO COM BASE NESTA"
     parent.$('[data-reset-process-instance-id]').hide()
 
   }  


});

//HABILITA E DESABILITA CALCULADORA
function Calculadora(){

	var calculadora=document.getElementById("calculadora");

	if($("#TEMCALCULADORA").val()==0){
		calculadora.style.display='block';
		$("#TEMCALCULADORA").val(1)
	}
	else if($("#TEMCALCULADORA").val()==1) {
    	calculadora.style.display='none';
		$("#TEMCALCULADORA").val(0)
	}

}

// SCRIPT DA CALCULADORA
function insert(num)
{
    var numero = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = numero + num;
	console.log((document.getElementById('resultado').length))
}
function clean()
{
    document.getElementById('resultado').innerHTML = "";
}
function back()
{
    var resultado = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = resultado.substring(0, resultado.length -1);
}
function calcular()
{
    var resultado = document.getElementById('resultado').innerHTML;
    if(resultado)
    {
        document.getElementById('resultado').innerHTML = eval(resultado);
    }
    else
    {
        document.getElementById('resultado').innerHTML = "Nada..."
    }
}


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



