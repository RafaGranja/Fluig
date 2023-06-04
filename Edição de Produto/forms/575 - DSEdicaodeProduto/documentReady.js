$(document).ready(function(){
	
	// VARIÁVEL PARA GUARDAR ATIVIDADE ATUAL
	var atv = $("#ATIVIDADE").val();
	var tipo =  $("#TIPO").val();
	var ncm = $("#NCM").val();
	var cest = $("#CEST").val();
	var cproduto = $("#CONSULTA_PRODUTO").val();
	var hist = $("#OBSHIST").val();
	var msg = "";
	$("#divCONTEUDOHISTORICO").html(msg);
	var fiscal = $("#VALOR_RADIO3").val();
	var produto = $("#VALORPRODUTO").val();
	//FLUIGC.switcher.disable('#switchControleLote');
	
	
	
	$("#NCM").prop("disabled",true);
	$("#CEST").prop("disabled", false);
	//$("#RAD1_SIM").prop("disabled", false)
	//$("#RAD1_NAO").prop("disabled", false)
	//$("#NCM").val("");
	// dispara o evento change do checkbox
	/*$("select[name=TIPO]").change(function(){
		var tipo = $("#TIPO").val();
		console.log("PASSEI!!!!", tipo)
	  // verifica se foi selecionado
	  if($('#TIPO').is(':checked')){
		  console.log("Entrei no IF")
	    // sim: mostro o campo select	 
		//  $().prop("disabled",false)
		  $("#switchControleLote").show()
	  } else {
		  console.log("Entrei no else!!!")
	    // não: não mostro o campo select
	   // $("#switchControleLote").prop("disabled",true)
		   $("#switchControleLote").hide()
	  }
	});
		*/

	console.log("Sim, entrei no documentReady na atv: "+atv)
	
	// SE ATIVIDADE FOR A INICIAL
	if(atv==0 || atv==3) {
		
		//FLUIGC.switcher.init('#switchControleLote');
		
		// ESCONDE OS CAMPOS DA ATIVIDADE FISCAL
		$(".FISCAL").hide();
		$("#C_RAD1_NAO").prop("disabled", true)
		$("#C_RAD1_SIM").prop("disabled", true)
		$("#C_TIPO").prop("disabled", true)
		$("#MOTIVO_FISCAL").hide();
		$("#MOTIVO").hide();
		$("#DIV_MOTIVO").hide();
		$(".OBSERVACOES").hide();
		

		if(!(fiscal == null || fiscal == "null" || fiscal == undefined || fiscal == "")){
			habilita();
			$(".OBSERVACOES").show()
		}
		
	}else if (atv==4){
		// ESCONDE OS CAMPOS DA ATIVIDADE FISCAL
		$(".FISCAL").hide();
		$("#C_RAD1_NAO").prop("disabled", true);
		$("#C_RAD1_SIM").prop("disabled", true);
		$("#C_TIPO").prop("disabled", true);
		$(".divMOTIVOFISCAL").show();
		$(".OBSHIST").show();
		$("#MOTIVO_FISCAL").hide();
		$("#DIV_MOTIVO").show();		
		gerarHistorico();
		if(!(fiscal == null || fiscal == "null" || fiscal == undefined)){
			$(".OBSERVACOES").show();
			//liberaCampos()
		}
		
		gerarHistorico();
		
		setTimeout(function(){
			window["PRODUTO"].setValue(produto)
			$("#PRODUTO").prop("disabled",true)

		},1000)



	}
	
	
		
	
	
	// SE ATIVIDADE FOR A FISCAL
	if(atv==5){
		$("#MOTIVO_FISCAL").hide();
		$("#DIV_MOTIVO").hide();
		console.log("Sim, entrei no if fiscal: "+atv)
		$(".CADASTRO_BLANK").hide()
		// DESABILITA OS CAMPOS PREENCHIDOS NA SOLICITAÇÃO
		setTimeout(function(){
			var sped = $("#VALOR_SPED").val()
			//var z = $("#CLASSIFICACAO_CONTABIL").val().toString();	
			$("#CLASSIFICACAO_FISCAL").prop("disabled",true);
			$("#CLASSIFICACAO_CONTABIL").prop("disabled",true);
			$("#UNIDADEMEDIDA").prop("disabled",true);
			$("#GRUPO").prop("disabled",true);
			$("#SUBGRUPO").prop("disabled",true);
			$("#NCM").prop("disabled",true);
			$("#CEST").prop("disabled", false);
			$("#CLASSIFICACAO").prop("disabled", true);
			$("#RAD1_NAO").prop("disabled", true);
			$("#RAD1_SIM").prop("disabled", true);
			$("#C_RAD1_NAO").prop("disabled", true);
			$("#C_RAD1_SIM").prop("disabled", true);
			$("#C_TIPO").prop("disabled", true);
			$("#RAD6_MA").prop("disabled", true);
			$("#RAD6_A").prop("disabled", true);
			$("#RAD6_M").prop("disabled", true);
			$("#RAD6_B").prop("disabled", true);
			//window["PRODUTO"].setValue(produto);
			$("#PRODUTO").prop("disabled", true);
			//reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + selectedItem['CLASSCONTABIL']);
			//reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + z);
			/*window["CLASSIFICACAO_FISCAL"].disable(true)
			window["CLASSIFICACAO_CONTABIL"].disable(true)
			window["UNIDADEMEDIDA"].disable(true)
			window["GRUPO"].disable(true)
			window["SUBGRUPO"].disable(true)*/

			//BLOQUEAR CAMPO CONTA SPED SE TIVER VALOR PREENCHIDO
			console.log(" antes if do SPED!!!!  " + sped)				
			if (sped == null || sped == "null" || sped == undefined){
				console.log("entrei no if do SPED")
				$("#CONTACONTABILSPED").prop("disabled", false);
			}
			else if(sped != "" || sped != undefined || sped != null) {
				console.log("entrei no else do SPED")
				$("#CONTACONTABILSPED").prop("disabled", true);	
				window["CONTACONTABILSPED"].setValue(sped)
				$("#VALOR_SPED").val(sped.split(" ")[0])
				
			}
		},1100);
		
		
		$("#TIPO").prop("disabled",true)
		$("#NOME").prop("disabled",true)
		$("#DESCRICAO").prop("disabled",true)
	    //	$("#switchControleLote").prop("disabled",true)
		
	    //	$("#CEST").prop("disabled",false)		
		$("#MOTIVO").prop("disabled",true)
		
		// ESCONDE OS CAMPOS REFERENTES A APROVAÇÃO
		$(".OBSERVACOES").hide()
		$("#OBSERVACOES").prop("readonly", true)
		$(".MOTIVOAPR").hide();
		$(".DIVCLASSIFICACAOSERVICO").hide()
		
		
	
		setTimeout(function(){
			patrimonio();
			classificacao();
			
			/* if(cproduto == "" || cproduto == undefined){
				$("#CONTACONTABILSPED").prop("disabled", false);
			}else{
				$("#CONTACONTABILSPED").prop("disabled", true);
			} */
			
			
			
		},2000);
				
		mostraISS();
		escolharef();

		if(fiscal != null || fiscal!= undefined || fiscal != ""){
			$(".OBSERVACOES").show()
		}else{
			$(".OBSERVACOES").hide()
		}	
	}
});

//FUNÇÃO PARA DESABILITAR O CHECKBOX DO CONTROLE POR LOTE E NCM DESABILITADO
function habilita(){
	console.log("Entrei no HABILITA")
	var tipo = $("#TIPO").val();
	var ncm = $("#NCM").val();
	var cest = $("#CEST").val();
	var fiscal = $("#VALORFISCAL").val();
	var atv1 = $("#ATIVIDADE").val();
	
	if(tipo == "SERVICO" ){
		console.log("entrei no if")
		// FLUIGC.switcher.disable('#switchControleLote');    		
		// $("#CODNCM").val("00000000");
		window["NCM"].setValue("00000000")
		$("#CODNCM").val("00000000")
		$("#NCM").prop("disabled",true);
		$("#CEST").prop("disabled", true);
		$("#CLASSIFICACAO_FISCAL").prop("disabled", true);
		window["CLASSIFICACAO_FISCAL"].setValue("09")
		$("#VALORFISCAL").val("09")
		reloadZoomFilterValues("CLASSIFICACAO_CONTABIL", "CLASSFISCAL,09");	
		reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + $("#CODCONTABIL").val() + ",CONTACONTABIL," + $("#CONTACONTABIL").val());	
		$("#SITUACAOMERCADORIA").val(fiscal.toString().split("- ")[0])
		$("#RAD1_SIM").prop("disabled", true)
		$("#RAD1_NAO").prop("disabled", true)
		$("#VALORTIPO").val("S")
		$("#CEST").prop("disabled", true);
		window["UNIDADEMEDIDA"].setValue("SV - SERVIÇO")
		$("#VALORUNIDADEMEDIDA").val("SV")
		$("#UNIDADEMEDIDA").prop("disabled", true);
	}
	else if(tipo == "" && atv1 == "0"){
		// FLUIGC.switcher.disable('#switchControleLote');
		$("#NCM").prop("disabled",true);
		$("#CEST").prop("disabled", true);
		$("#NCM").val("");
		$("#RAD1_NAO").prop("disabled", true)
		$("#RAD1_SIM").prop("disabled", true)
	}
	else{
		//FLUIGC.switcher.enable('#switchControleLote');
		$("#NCM").prop("disabled",false);
		$("#CODNCM").val();
		$("#NCM>option").remove()
		$("#CEST").prop("disabled", false);
		$("#CLASSIFICACAO_FISCAL").prop("disabled", false);
		$("#CLASSIFICACAO_FISCAL>option").remove()
		$("#VALORFISCAL").val();
		$("#RAD1_NAO").prop("disabled", false)
		$("#RAD1_SIM").prop("disabled", false)
		$("#VALORTIPO").val("P")
		$("#CEST").prop("disabled", false);
		$("#UNIDADEMEDIDA>option").remove();
		$("#VALORUNIDADEMEDIDA").val("");
		$("#UNIDADEMEDIDA").prop("disabled", false);
	}
}

