// Função que utiliza o seguinte método para capturar os dados do campo zoom e carregá-los nos respectivos campos.
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;
	
	// SE CLASSIFICAÇÃO CONTABIL É SELECIONADO NO ZOOM
	if(selectedItem.inputId.indexOf("CLASSIFICACAO_CONTABIL")!="-1"){
		
		var x = selectedItem['CLASSCONTABIL'].toString().split("- ")[0];
		var situacaomercadoria
		var classfiscal = $("#VALORFISCAL").val();
		
		//VERIFICA SITUACAO MERCADORIA E SETA O CAMPO
		if(classfiscal == "00"){
    		situacaomercadoria = "01"
    	}else if(classfiscal == "01"){
    		situacaomercadoria = "02"
    	}else if(classfiscal == "03"){
    		situacaomercadoria = "03"
  		} else if(classfiscal == "04"){
  			situacaomercadoria = "04"
  		}else if(classfiscal == "02"){
  			situacaomercadoria = "08"  			
  		}else if(classfiscal == "05"){
  			situacaomercadoria = "09"
  		}else if(classfiscal == "06"){
  			situacaomercadoria = "10"
  		}else if(classfiscal == "07"){
  			situacaomercadoria = "11"
  		}else if(classfiscal == "08"){
  			situacaomercadoria = "12"
  		}else if(classfiscal == "09"){
  			situacaomercadoria = "13"
  		}else if(classfiscal == "99"){
  			situacaomercadoria = "14"
  		}
		
		$("#CODCONTABIL").val(x);	
		console.log("variavel x", x)
		var z = selectedItem["CODCONTA"];
		console.log("variavel z", z)
		$("#CONTACONTABIL").val(selectedItem["CONTACONTABIL"]);
		console.log("VOU RODAR MEU RELOAD CONTABIL", z);
		
		setTimeout(function(){
			if(selectedItem['CONTACONTABIL'] == null || selectedItem['CONTACONTABIL'] == "" || selectedItem['CONTACONTABIL'] == undefined || selectedItem['CONTACONTABIL'] == "null"){
				console.log("Entrei no if conta")
				reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + selectedItem['CLASSCONTABIL']);
			}else{
				console.log("Entrei no else conta")
				reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + selectedItem['CLASSCONTABIL'] +",CONTACONTABIL," + selectedItem['CONTACONTABIL']);
				var y = selectedItem['DESCCOMPLETA'];
				console.log("Y: " + y);
				window["CONTACONTABILSPED"].setValue(y);
			}
		},1000)
						
		lote2();
		$("#SITUACAOMERCADORIA").val(situacaomercadoria)
		$("#VALOR_SPED").val(selectedItem['CONTACONTABIL'])
		console.log("VALOOOR", selectedItem['CONTACONTABIL'])
		liberaCampos(true)

	}
	
	// SE CLASSIFICAÇÃO FISCAL É SELECIONADO NO ZOOM
	if(selectedItem.inputId.indexOf("CLASSIFICACAO_FISCAL")!="-1"){
		var x = selectedItem["CLASSFISCAL"].toString().split("- ")[0];
		
		console.log("valor fiscal", x)
		$("#VALORFISCAL").val(x);
		var y = selectedItem["CLASSCONTABIL"];		
		$("#SITUACAOMERCADORIA").val(x)
		console.log("VOU RODAR MEU RELOAD FISCAL", y);
		reloadZoomFilterValues("CLASSIFICACAO_CONTABIL", "CLASSFISCAL," + selectedItem["CLASSFISCAL"]);
							//nome do zoom para filtrar / nome da constraint dentro do dataset.
		
		liberaCampos(true)
		
	}
	
	//CONSULTA PARA COPIAR OS CAMPOS DE ALGUM PRODUTO/SERVIÇO JÁ CADASTRADO NO SISTEMA
	if(selectedItem.inputId.indexOf("CONSULTA_PRODUTO")!="-1"){
		console.log("entrei no consulta produto")
		liberaCampos(true);
		var x = selectedItem["IDPRD"];
		$("#VALORFISCAL").val(x);
		console.log("VOU RODAR MEU RELOAD CONSULTA PRODUTO");
		
		var c1 = DatasetFactory.createConstraint("IDPRD",x,x,ConstraintType.MUST);
		var constraints = new Array(c1);
		
		var dataset = DatasetFactory.getDataset("DsCRMProdutoDefault",null,constraints,null);
		
		// QUANTIDADE DE REGISTROS DA CONSULTA
		var row = dataset.values;
		var rep = row[0];
		//var nomefantasia = rep["NOMEFANTASIA"]
		var ncm = rep["NUMEROCCF"];
		var lote = rep["CONTROLADOPORLOTE"];
		var unidade = rep["CODUNDCONTROLE"];
		var classificacao = rep["CODTB2FAT"];
		var grupo = rep["GRUPO1"];
		var subgrupo = rep ["SUBGRUPO1"];		
		var contabil = rep ["CLASSCONTABIL"];
		var fiscal = rep["CLASSFISCAL"];
		var patrimonio = rep["CODDESCRICAO"];		
		var sped = rep["DESCCOMPLETA"]
		console.log("valor sped"+ sped)
		var tipo = rep["TIPO"]
		var cest = rep["CODIGOCEST"]
		
		
		//VERIFICA O TIPO DE CADASTRO SE PRODUTO OU SERVICO
		if(tipo == "P"){
			$("#TIPO").val("PRODUTO")	
			$("#VALORTIPO").val(tipo);
		}else{
            $("#TIPO").val("SERVICO")
            $("#VALORTIPO").val(tipo);
		}
		
	
		//VERIFICAÇÃO DO CAMPO LOTE PARA PREENCHIMENTO
		console.log("lote: " + lote)
		if(lote == "1"){
			console.log("Entrei no if do lote 1")
			if(contabil == '017' || contabil == '018' || contabil == '019' || contabil == '051' || contabil == '052' || contabil == '053' || contabil == '022' || contabil == '023' || contabil == '024'){
				$("#RAD1_SIM").click();
				$("#RAD1_SIM").prop("disabled", true)
				$("#RAD1_NAO").prop("disabled", true)
				$("#VALOR_RADIO1").val(1); 
			}
		}else if(lote == "0"){
			console.log("Entrei no if do lote 0")
			$("#RAD1_NAO").click();
			$("#RAD1_NAO").prop("disabled", false)
			$("#VALOR_RADIO1").val(0); 
		}	
		
		if (classificacao == "018"){
			window["CLASSIFICACAO"].setValue(classificacao)
		}
		
		//PREENCHIMENTO DOS CAMPOS ZOOM
		if(contabil != "" || contabil != null || contabil != undefined || contabil != "null"){
			window["CLASSIFICACAO_CONTABIL"].setValue(contabil);
		}
		window["UNIDADEMEDIDA"].setValue(unidade);
		window["NCM"].setValue(ncm);
		window["GRUPOPATRIMONIO"].setValue(patrimonio);
		window["CLASSIFICACAO_FISCAL"].setValue(fiscal);
		window["CONTACONTABILSPED"].setValue(sped);
		
		
	
		if(sped == "" || sped == null || sped == undefined || sped == "null" || sped == " - " || sped ==  " - " ){
			console.log("vou entrar para limpar o campo sped   " + sped)
			window["CONTACONTABILSPED"].setValue(sped);	
			$("#CONTACONTABILSPED").val(sped);
			reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + selectedItem['CLASSCONTABIL']);
		}		
		$("#VALORFISCAL").val(fiscal.toString().split("- ")[0])
		$("#SITUACAOMERCADORIA").val(fiscal.toString().split("- ")[0]);
	    $("#CODCONTABIL").val(contabil.toString().split("- ")[0]);
	    $("#CONTACONTABIL").val(sped.toString().split("  ")[0]);
	    console.log("codigo sped é:" + sped)
	    $("#VALORGRUPOPATRIMONIO").val(patrimonio);
	    $("#VALOR_SPED").val(sped.toString().split("  ")[0]);   
		$("#CODNCM").val(ncm);
		$("#VALORUNIDADEMEDIDA").val(unidade);
		$("#VALORTIPO").val(tipo);
		$("#VALOR_RADIO1").val(lote);
		$("#VALOR_CEST").val(cest);
		$("#CONTROLE_LOTE").val("");
		$("#VALORREFERENCIA").val("");	
		$("#VALORCLASSIFICACAO").val(classificacao);
		
		
		//TRAVAR OS CAMPOS AO SELECIONAR UM ITEM DE COPIA
		//$("#RAD1_SIM").prop("disabled", true);
		//$("#RAD1_NAO").prop("disabled", true);		
		$("#CLASSIFICACAO_FISCAL").prop("disabled", true);
		$("#NCM").prop("disabled", true);
		$("#CLASSIFICACAO_CONTABIL").prop("disabled", true);
		$("#UNIDADEMEDIDA").prop("disabled", true);
		$("#TIPO").prop("disabled", true);
		$("#NOME").prop("disabled", false);
		$("#DESCRICAO").prop("disabled", false);
		
		
		//TRECHO INSERIDO EM 13-09-21
		
		console.log("VERIFICAR CAMPO PREENCHIDO")		
		console.log("antes do if da função salva valor")
		if (lote == '1') {
			console.log(">>>>>entrei no if da função salva valor VERDADEIRO<<<<<")
			$("#VALOR_RADIO1").val(1);
			$("#RAD1_SIM").prop("checked", true);
			$("#RAD1_NAO").prop("checked", false);
			
		} else {
			console.log(">>>>>entrei no else da função salva valor FALSO<<<<<")
			$("#VALOR_RADIO1").val(0);
			$("#RAD1_NAO").prop("checked", true);
			$("#RAD1_SIM").prop("checked", false);
			
		}
		
		
		
		//LIMPAR CAMPO PATRIMONIO QUANDO NULL
		console.log("PATRIMONIO", patrimonio)
		if(patrimonio == "null" || patrimonio == null || patrimonio == "" || patrimonio == undefined){
			console.log("entrei no if do patrimonio ")			
			$("#VALORGRUPOPATRIMONIO").val('')
			$("#GRUPOPATRIMONIO>option").remove();
		}else {
			console.log("entrei no else do grupo")
			window["GRUPOPATRIMONIO"].setValue(patrimonio)
			$("#VALORGRUPOPATRIMONIO").val(patrimonio)
		}
		
		
		setTimeout(function(){
         //   $("#CONTACONTABILSPED").prop("disabled", false);
            $("#CLASSIFICACAO").prop("disabled", true);
            $("#RAD1_NAO").prop("disabled", true)
            $("#RAD1_SIM").prop("disabled", true)
		},500)
		
	}
	//PREENCHE OS CAMPOS OCULTOS
	if(selectedItem.inputId.indexOf("NCM")!="-1"){	
		$("#CODNCM").val(selectedItem["CODNCM"]);	
		liberaCampos(true);
	}
	
	if(selectedItem.inputId.indexOf("UNIDADEMEDIDA")!="-1"){
		$("#VALORUNIDADEMEDIDA").val(selectedItem["CODUND"]);
	}
	
	if(selectedItem.inputId.indexOf("GRUPOPATRIMONIO")!="-1"){
		console.log("entrei no if do grupo patrimonio", selectedItem["CODDESCRICAO"])
		var patrimonio = selectedItem["CODDESCRICAO"].toString().split(" ")[0];		
		$("#VALORGRUPOPATRIMONIO").val(patrimonio)
		console.log("valor do patrimonio", patrimonio)
	}
	
	if(selectedItem.inputId.indexOf("CONTACONTABILSPED")!="-1"){
		console.log("conta contabil sped" + selectedItem["CONTACONTABIL"])		
		$("#VALOR_SPED").val(selectedItem["CONTACONTABIL"]);	 
	
	}
	
	if(selectedItem.inputId.indexOf("CLASSIFICACAO")!="-1"){
		$("#VALORCLASSIFICACAO").val(selectedItem["CODTB2FAT"]);
	}

}

//PREENCHE O LOTE AUTOMÁTICO CONFORME CONTABIL
function lote2(){
	console.log("entrei na função LOTE")
	//var lotesim = $("#RAD1_SIM").is(':checked');
	//var lotenao = $("#RAD1_NAO").is(':checked');
	var contabil = $("#CODCONTABIL").val();	
	var lote = $("#VALOR_RADIO1").val();
	
	if(contabil == '017' || contabil == '018' || contabil == '019' || contabil == '051' || contabil == '052' || contabil == '053' || contabil == '022' || contabil == '023' || contabil == '024'){
		console.log("entrei no if do lote")
		
		$("#RAD1_SIM").prop("checked", true);
		$("#RAD1_SIM").prop("disabled", true)
		$("#RAD1_NAO").prop("disabled", true)
		$("#VALOR_RADIO1").val(1);
		
		
		 
	}else{
		console.log("entrei no else do lote")
		
		$("#RAD1_NAO").prop("checked", true);
		$("#RAD1_NAO").prop("disabled", false)
		$("#RAD1_SIM").prop("disabled", false)
		$("#VALOR_RADIO1").val(0);
		
		
	}
}


function removedZoomItem(removedItem){
	
	var input = removedItem.inputId;
	var CAMPO = removedItem.inputName;
	
	if(removedItem.inputId.indexOf("CLASSIFICACAO_CONTABIL")!="-1"){
        console.log("entrei no removedItem CONTABIL")
        //$("#CLASSIFICACAO_FISCAL>option").remove();
        $("#CLASSIFICACAO_CONTABIL>option").remove();
        $("#NCM>option").remove();
	    $("#UNIDADEMEDIDA>option").remove();
        $("#VALOR_RADIO1").val('')
        $("#RAD1_NAO").prop("disabled", true)
        $("#RAD1_SIM").prop("disabled", true)
        $("#NCM").prop("disabled",true)
        $("#RAD1_NAO").click();
        //$("#VALORFISCAL").val('');
        $("#VALOR_RADIO1").val('');
        $("#CODCONTABIL").val('');
        $("#CODNCM").val('')
        $("#VALORGRUPOPATRIMONIO").val('');
		$("#VALORUNIDADEMEDIDA").val('');
		$("#UNIDADEMEDIDA").prop("disabled",true)

	}
	
	if(removedItem.inputId.indexOf("CLASSIFICACAO_FISCAL")!="-1"){
	    console.log("entrei no remove item classificacao fiscal");
		$("#NCM>option").remove();
		$("#CLASSIFICACAO_CONTABIL>option").remove();
	    $("#UNIDADEMEDIDA>option").remove();
		$("#CLASSIFICACAO>option").remove();
		$("#GRUPOPATRIMONIO>option").remove();
		$("#CLASSIFICACAO_FISCAL>option").remove();
		//$("#CONTACONTABILSPED>option").remove();
		//$("#TIPO").val('');
		$("VALOR_RADIO1").val('')
		$("#RAD1_NAO").prop("disabled", true);
		$("#RAD1_SIM").prop("disabled", true);
		$("#RAD1_NAO").click();
		//$("#VALORTIPO").val('');
		$("#VALORFISCAL").val('');
		$("#VALOR_RADIO1").val('');
		$("#CODNCM").val('');
		$("#CODCONTABIL").val('');
		$("#VALORUNIDADEMEDIDA").val('');
		$("#VALORGRUPOPATRIMONIO").val('');
		$("#CLASSIFICACAO_CONTABIL").prop("disabled",true)
		$("#NCM").prop("disabled",true)
		$("#UNIDADEMEDIDA").prop("disabled",true)

	}
	
	if(removedItem.inputId.indexOf("GRUPOPATRIMONIO")!="-1"){
		$("#VALORGRUPOPATRIMONIO").val('');
	}
	
	
	if(removedItem.inputId.indexOf("CONSULTA_PRODUTO")!="-1"){
			$("#NCM>option").remove();
			$("#CLASSIFICACAO_CONTABIL>option").remove();
			$("#UNIDADEMEDIDA>option").remove();			
			$("#CLASSIFICACAO>option").remove();
			$("#GRUPOPATRIMONIO>option").remove();
			$("#CLASSIFICACAO_FISCAL>option").remove();
			$("#CONTACONTABILSPED>option").remove();
			$("#TIPO").val('');
			$("VALOR_RADIO1").val('')
			$("#RAD1_NAO").prop("disabled", false)
			$("#RAD1_SIM").prop("disabled", false)
			$("#NCM").prop("disabled", false);
			$("#CLASSIFICACAO_CONTABIL").prop("disabled", false);
			$("#UNIDADEMEDIDA").prop("disabled", false);
			$("#CLASSIFICACAO").prop("disabled", false);
			$("#CLASSIFICACAO_FISCAL").prop("disabled", false);
			$("#CONTACONTABILSPED").prop("disabled", false);
			$("#CLASSIFICACAO_CONTABIL").prop("disabled", false);
			$("#TIPO").prop("disabled", false);
			$("#RAD1_NAO").click();
			$("#VALORTIPO").val('');
			$("#VALORFISCAL").val('');
			$("#VALOR_RADIO1").val('');
			$("#CODNCM").val('');
			$("#CODCONTABIL").val('');
			$("#VALORUNIDADEMEDIDA").val('');
			$("#VALORGRUPOPATRIMONIO").val('');
	}
	
	if(removedItem.inputId.indexOf("NCM")!="-1"){
	    console.log("entrei no removedItem");
		
	   	$("#NCM>option").remove();
		//$("#CLASSIFICACAO_CONTABIL>option").remove();
		$("#UNIDADEMEDIDA>option").remove();
		//$("#GRUPO>option").remove();
		//$("#SUBGRUPO>option").remove();
		//$("#CLASSIFICACAO>option").remove();
		//$("#GRUPOPATRIMONIO>option").remove();
		//$("#CLASSIFICACAO_FISCAL>option").remove();
		//$("#CONTACONTABILSPED>option").remove();
		//$("#TIPO").val('');
		//$("VALOR_RADIO1").val('')
		$("#RAD1_NAO").prop("disabled", true);
		$("#RAD1_SIM").prop("disabled", true);
		//$("#RAD1_NAO").click();
		//$("#VALORTIPO").val('');
		//$("#VALORFISCAL").val('');
		//$("#VALOR_RADIO1").val('');
		//$("#CODNCM").val('');
		//$("#CODCONTABIL").val('');
		$("#VALORUNIDADEMEDIDA").val('');
		$("#UNIDADEMEDIDA").prop("disabled",true)

	}
	if(removedItem.inputId.indexOf("CONTACONTABILSPED")!="-1"){
		console.log("entrei no removedItem DO CONTACONTABILSPED");
	    //$("#CONTACONTABILSPED>option").remove();
	    $("#VALOR_SPED").val("");	    
	    var z = $("#CONTACONTABIL").val();
	    setTimeout(function(){
            console.log("valor de conta contabil  " + z)
            if(z == null || z == undefined || z == "" || z == "null"){
                console.log("entrei no if do Z  ")
                reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + $("#VALORFISCAL").val());
            }else{
                console.log("entrei no else de Z")
                reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + $("#VALORFISCAL").val() + ",CONTACONTABIL," + z);
                console.log("valor de Z no else" + z)
                $("#VALOR_SPED").val(z)
            }
	    },1000)
	    
	}
}



