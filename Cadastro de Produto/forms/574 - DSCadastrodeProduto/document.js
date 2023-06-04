$(document).ready(function () {
  // VARIÁVEL PARA GUARDAR ATIVIDADE ATUAL
  var atv = $('#ATIVIDADE').val()
  var tipo = $('#TIPO').val()
  var ncm = $('#NCM').val()
  var cest = $('#CEST').val()
  var cproduto = $('#CONSULTA_PRODUTO').val()
  var hist = $('#OBSHIST').val()
  var msg = ''
  $('#divCONTEUDOHISTORICO').html(msg)
  var fiscal = $('#VALOR_RADIO3').val()
  var sped = $('#VALOR_SPED').val()

  $('#NCM').prop('disabled', true)
  $('#CEST').prop('disabled', true)

  console.log('Sim, entrei no documentReady na atv: ' + atv)

  // SE ATIVIDADE FOR A INICIAL
  if (atv == 0 || atv == 3) {
    salvaEmailUsuario()

    setTimeout(function () {
      $('#NCM').prop('disabled', true);
      $('#NOME').prop('disabled', true);
      $('#DESCRICAO').prop('disabled', true);
      $('#CLASSIFICACAO_FISCAL').prop('disabled', true);
      $('#CLASSIFICACAO_CONTABIL').prop('disabled', true);
      $('#UNIDADEMEDIDA').prop('disabled', true);
      $('#RAD1_SIM').prop('disabled', true);
      $('#RAD1_NAO').prop('disabled', true);
      $("#CONSULTA_PRODUTO").prop("disabled",true);
      $("#TIPO").prop("disabled",true);
      $("#aparecer").hide();
    }, 1100)
    $("#APLICACAO").prop("readonly",false);
    // ESCONDE OS CAMPOS DA ATIVIDADE FISCAL
    $('.FISCAL').hide()
    $('#MOTIVO_FISCAL').hide()
    $('#MOTIVO').hide()
    $('#DIV_MOTIVO').hide()
    $('.OBSERVACOES').hide()
    //$("#CONTACONTABILSPED").prop("disabled", false)

    if (!(fiscal == null || fiscal == 'null' || fiscal == undefined || fiscal == '')) {
      habilita()
      $('.OBSERVACOES').show()
    }
  	} else if (atv == 4) {
    $('.FISCAL').hide()
    $('.divMOTIVOFISCAL').show()
    $('.OBSHIST').show()
    $('#MOTIVO_FISCAL').hide()
    $('#DIV_MOTIVO').show()
    $("#aparecer").hide();

    if (!(fiscal == null || fiscal == 'null' || fiscal == undefined)) {
      $('.OBSERVACOES').show()
      liberaCampos()
      $("#APLICACAO").prop("readonly",false);
    }

    gerarHistorico()
  }

  // SE ATIVIDADE FOR A FISCAL
  if (atv == 5) {
    console.log('Sim, entrei no if fiscal: ' + atv)
    $('#MOTIVO_FISCAL').hide()
    $('#DIV_MOTIVO').hide()
    $("#aparecer").hide();

    // DESABILITA OS CAMPOS PREENCHIDOS NA SOLICITAÇÃO
    setTimeout(function () {
      var z = $('#CLASSIFICACAO_CONTABIL').val().toString()
      $('#CLASSIFICACAO_FISCAL').prop('disabled', true)
      $('#CLASSIFICACAO_CONTABIL').prop('disabled', true)
      $('#UNIDADEMEDIDA').prop('disabled', true)
      $('#GRUPO').prop('disabled', true)
      $('#SUBGRUPO').prop('disabled', true)
      $('#NCM').prop('disabled', true)
      //$("#CONTACONTABILSPED").prop("disabled", true);
      $('#CLASSIFICACAO').prop('disabled', true)
      $('#RAD1_NAO').prop('disabled', true)
      $('#RAD1_SIM').prop('disabled', true)
      $('#RAD6_MA').prop('disabled', true)
      $('#RAD6_A').prop('disabled', true)
      $('#RAD6_M').prop('disabled', true)
      $('#RAD6_B').prop('disabled', true)
      $('#CONSULTA_PRODUTO').prop('disabled', true)

      //BLOQUEAR CAMPO CONTA SPED SE TIVER VALOR PREENCHIDO
      console.log(' antes if do SPED!!!!  ' + sped)
      if (sped == null || sped == 'null' || sped == undefined) {
        console.log('entrei no if do SPED')
        $('#CONTACONTABILSPED').prop('disabled', false)
      } else if (sped != '' || sped != undefined || sped != null) {
        console.log('entrei no else do SPED')
        $('#CONTACONTABILSPED').prop('disabled', true)
      }
    }, 1100)

    $('#TIPO').prop('disabled', true)
    $('#NOME').prop('disabled', true)
    $('#DESCRICAO').prop('disabled', true)
    $('#CEST').prop('disabled', false)
    $('#MOTIVO').prop('disabled', true)

    // ESCONDE OS CAMPOS REFERENTES A APROVAÇÃO
    $('.MOTIVOAPR').hide()
    $('.OBSERVACOES').hide()
    $('#OBSERVACOES').prop('readonly', true);
    $('.DIVCLASSIFICACAOSERVICO').hide()
    $("#APLICACAO").prop("readonly",true);
    setTimeout(function () {
      $('#CLASSIFICACAO_FISCAL').prop('disabled', true)
      $('#CLASSIFICACAO_CONTABIL').prop('disabled', true)
      //reloadZoomFilterValues("CONTACONTABILSPED", "CONTACONTABIL," + $("#CONTACONTABIL").val() +",CONTACONTABIL," + $("#CONTACONTABIL").val() +",CONTACONTABIL,");
      patrimonio()
      classificacao()

      /* 	//LIBERAR CAMPO SPED SE A CONSULTA PRODUTO ESTIVER VAZIO
			if(cproduto == "" || cproduto == undefined || cproduto == null || cproduto == "null"){
				$("#CONTACONTABILSPED").prop("disabled", true);				
			}
			else{				
				$("#CONTACONTABILSPED").prop("disabled", true);
		} */
    }, 1100)

    mostraISS()
    escolharef()

    if (fiscal != null || fiscal != undefined || fiscal != '') {
      $('.OBSERVACOES').show()
    } else {
      $('.OBSERVACOES').hide()
    }

    /*	setTimeout(function(){
			var z = $("#CONTACONTABIL").val();
			if(z == null || z == undefined || z == "" || z == "null"){
			console.log("entrei no if do reload contacontabil filter" )
			reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + $("#VALORFISCAL").val() + ",CONTACONTABIL," + z);
			}else{
				console.log("meu reload filter", $("#VALORFISCAL").val(), z )
				reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + $("#VALORFISCAL").val() );
			}
				
		}, 1000)*/
  }
})

//FUNÇÃO PARA DESABILITAR O CHECKBOX DO CONTROLE POR LOTE E NCM DESABILITADO

/*function habilita(){
	
	console.log("Entrei no HABILITA")
	var tipo = $("#TIPO").val();
	var ncm = $("#NCM").val();
	var cest = $("#CEST").val();
	var fiscal = $("#VALORFISCAL").val();
	var atv = $("#ATIVIDADE").val();
	
	if(tipo == "SERVICO" ){
		console.log("entrei no if do serviço")
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
		 reloadZoomFilterValues("CONTACONTABILSPED", "CONTACONTABIL," + $("#CODCONTABIL").val() + ",CONTACONTABIL," + $("#CONTACONTABIL").val());	
		 $("#SITUACAOMERCADORIA").val(fiscal.toString().split("- ")[0])
		 $("#RAD1_SIM").prop("disabled", true)
		 $("#RAD1_NAO").prop("disabled", true)
		 $("#VALORTIPO").val("S")
		 $("#CEST").prop("disabled", true);
	}
	else if(tipo == "" && atv == "0"){
		// FLUIGC.switcher.disable('#switchControleLote');
		 $("#NCM").prop("disabled",true);
		 $("#CEST").prop("disabled", true);
		 $("#NCM").val("");
		 $("#RAD1_NAO").prop("disabled", true);
		 $("#RAD1_SIM").prop("disabled", true);
		 $("#VALORFISCAL").val("");
		 $("#CODNCM").val("");
		 $("#CLASSIFICACAO_FISCAL").val("");
		 $("#CLASSIFICACAO_FISCAL").prop("disabled", true);
		 $("#NCM>option").remove();
		 $("#CLASSIFICACAO_FISCAL>option").remove();
		 
	}
	else{
		console.log("entrei no else do habilita")
		 //FLUIGC.switcher.enable('#switchControleLote');
		// $("#NCM").prop("disabled",false);
		 $("#CODNCM").val();
		 $("#NCM>option").remove()
		 $("#CEST").prop("disabled", false);
		// $("#CLASSIFICACAO_FISCAL").prop("disabled", false);
		 $("#CLASSIFICACAO_FISCAL>option").remove()
		 $("#VALORFISCAL").val();
		 $("#RAD1_NAO").prop("disabled", false)
		 $("#RAD1_SIM").prop("disabled", false)
		 $("#VALORTIPO").val("P")
		 $("#CEST").prop("disabled", false);
	}
}*/
