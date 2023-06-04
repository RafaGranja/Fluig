// Função que utiliza o seguinte método para capturar os dados do campo zoom e carregá-los nos respectivos campos.
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;
	($('#' + input));
	
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
		//liberaCampos()

	}

	// SE CLASSIFICAÇÃO FISCAL É SELECIONADO NO ZOOM
	if(selectedItem.inputId.indexOf("CLASSIFICACAO_FISCAL")!="-1"){
		var x = selectedItem["CLASSFISCAL"].toString().split("- ")[0];
		
		console.log("valor fiscal", x)
		$("#VALORFISCAL").val(x);
		var y = selectedItem["CLASSCONTABIL"];		
		$("#SITUACAOMERCADORIA").val(x)
		console.log("Situação da mercadoria é: " + x)
		console.log("VOU RODAR MEU RELOAD FISCAL", y);
		reloadZoomFilterValues("CLASSIFICACAO_CONTABIL", "CLASSFISCAL," + selectedItem["CLASSFISCAL"]);
							//nome do zoom para filtrar / nome da constraint dentro do dataset.
		
		//liberaCampos()
	}
	
	
	
	if(selectedItem.inputId.indexOf("PRODUTO")!="-1"){
		console.log("rodei o selected item ")
		var x = selectedItem["IDPRD"];
		var y = selectedItem["QUANTOS_PEDIDO"];
		var produto = $("#VALORPRODUTO").val();
		console.log("IDPRD", x)
		console.log("QUANTOS_PEDIDO", y)		
		//$("#VALORFISCAL").val(x);
		console.log("VOU RODAR MEU RELOAD");
		
		
		
		var c1 = DatasetFactory.createConstraint("DESCCOMPLETA",selectedItem["DESCCOMPLETA"],selectedItem["DESCCOMPLETA"],ConstraintType.MUST);
		var constraints = new Array(c1);
		
		var dataset = DatasetFactory.getDataset("DsCRMConsultaProdutoCadastrado",null,constraints,null);
		
		// QUANTIDADE DE REGISTROS DA CONSULTA
		var row = dataset.values;
		var rep = row[0];
		var nomefantasia = rep["NOMEFANTASIA"];
		var descricao = rep ["DESCRICAO"];
		var produto = rep["DESCCOMPLETA"];
		var ncm = rep["NUMEROCCF"];
		var lote = rep["CONTROLADOPORLOTE"];
		var unidade = rep["CODUNDCONTROLE"];
		var classificacao = rep["CODTB2FAT"];
		//var contabil = selectedItem["DESCRICAOCODTB3FAT"].toString().split("- ")[0];
		var c_contabil = selectedItem["CLASSCONTABIL"].toString().split("-")[0];
		var contabil = rep ["DESCRICAOCODTB3FAT"];
		var fiscal = rep["CLASSFISCAL"];		
		var patrimonio = rep["DESCRICAOPATRIMONIO"];
		console.log("valor patrionio" + patrimonio)		
		var sped = rep["CODDESCRICAO"]
		var tipo = rep["TIPO"];
		var cest = rep["CODIGOCEST"];
		var codigoprd = rep["CODIGOPRD"]
		console.log("valor codigo produto" + codigoprd)
		var idprd = rep["IDPRD"]
		console.log("valor do id produto" + idprd)
		var pedido = rep["QUANTOS_PEDIDO"]
		var situacaomercadoria = rep["SITUACAOMERCADORIA"]	  	
		
		
		
		
		if(tipo == "P"){
			$("#C_TIPO").val("PRODUTO").prop("disabled", true)	
			$("#TIPO").val("PRODUTO")	
			$("#VALORTIPO").val(tipo);
			$("#CONTROLE_LOTE").val(lote)
			$("#RAD1_SIM").prop("disabled", false)
			$("#RAD1_NAO").prop("disabled", false)
			
		}else{
			$("#C_TIPO").val("SERVICO").prop("disabled", true)	
			$("#TIPO").val("SERVICO")
			$("#VALORTIPO").val(tipo);
		}
				
		if((pedido > 0 && pedido != null) && (tipo == "P" || tipo == "S")){			
			console.log("vou rodar meu if de verificação do produto")
			Swal.fire({
                icon: 'warning',
                title: 'Produto/Serviço já sofreu movimentação e não pode ser alterado!'                
            })
            return false;
        };
		
		
		if(lote == 0){
			$("#C_RAD1_NAO").prop("checked", true).prop("disabled", true)	
			$("#C_RAD1_SIM").prop("checked", false).prop("disabled", true)	
		} else{
			$("#C_RAD1_SIM").prop("checked", true).prop("disabled", true)
			$("#C_RAD1_NAO").prop("checked", false).prop("disabled", true)	
		}
		
		if(cest == null || cest == "null" || cest == undefined || cest == ""){
			$("#C_CEST").val()
		}else{
			$("#C_CEST").val(cest)
		}
		
		//VERIFICA SITUAÇÃO MERCADORIA PARA TROCAR O CAMPO CLASSIFICAÇÃO FISCAL
		if(situacaomercadoria == "01"){
			$("#C_CLASSIFICACAO_FISCAL").val('00- MERCADORIA P/REVENDA')    
    	}else if(situacaomercadoria == "02"){
    		$("#C_CLASSIFICACAO_FISCAL").val('01- MATÉRIA PRIMA')    
    	}else if(situacaomercadoria == "03"){
    		$("#C_CLASSIFICACAO_FISCAL").val('03- PRODUTO EM PROCESSO')    
  		} else if(situacaomercadoria == "04"){
  			$("#C_CLASSIFICACAO_FISCAL").val('04- PRODUTO ACABADO')    
  		}else if(situacaomercadoria == "09"){
  			$("#C_CLASSIFICACAO_FISCAL").val('05- SUBPRODUTO')    
  		}else if(situacaomercadoria == "10"){
  			$("#C_CLASSIFICACAO_FISCAL").val('06- PRODUTO INTERMEDIÁRIO')    
  		}else if(situacaomercadoria == "11"){
  			$("#C_CLASSIFICACAO_FISCAL").val('07- USO E CONSUMO')    
  		}else if(situacaomercadoria == "12"){
  			$("#C_CLASSIFICACAO_FISCAL").val('08- ATIVO IMOBILIZADO')    
  		}else if(situacaomercadoria == "08"){
  			$("#C_CLASSIFICACAO_FISCAL").val('02- EMBALAGEM')    
  		}else if(situacaomercadoria == "13"){
  			$("#C_CLASSIFICACAO_FISCAL").val('09- SERVIÇOS')    
  		}else if(situacaomercadoria == "14"){
  			$("#C_CLASSIFICACAO_FISCAL").val('99- OUTROS')    
  		}
		
		var novoIdprd = ""
		novoIdprd= (idprd.padStart(7,"0"))
		console.log("O ID PRD É :" + novoIdprd) 
		$("#C_CODIGOPRD").val(codigoprd)
        $("#TEMPEDIDO").val(pedido)
		$("#ID_PRD").val(idprd)
		$("#NOVO_IDPRD").val(novoIdprd)
		//$("#C_VALORFISCAL").val(fiscal)
		//$("#C_CLASSIFICACAO_FISCAL").val(fiscal)       
		$("#C_VALOR_RADIO1").val(lote)
		$("#VALOR_RADIO1").val(lote)
		$("#C_CLASSIFICACAO_CONTABIL").val(contabil)
		$("#C_CLASSIFICACAO_CONTABIL_H").val(c_contabil)
		$("#CLASSIFICACAO_CONTABIL").val(contabil)	 
	    $("#C_NOME").val(nomefantasia)       
	    $("#C_DESCRICAO").val(descricao)       
	    $("#VALORGRUPOPATRIMONIO").val(patrimonio)        
	    $("#VALOR_SPED").val(sped)
		$("#VALORPRODUTO").val(produto);
		
		$("#C_NCM").val(ncm);       
		$("#C_UNIDADEMEDIDA").val(unidade)       
	   // $("#C_TIPO").val(tipo)		
		$("#C_VALORTIPO").val(tipo)    
		$("#VALORCLASSIFICACAO").val(classificacao)        
		$("#VALOR_CODCONTABIL").val(contabil)        
		//$("#CONTROLE_LOTE").val("")        
		//$("#VALORREFERENCIA").val("")
		//$("#VALORFISCAL").val(fiscal.toString().split("- ")[0])
		//$("#SITUACAOMERCADORIA").val(fiscal.toString().split("- ")[0]);
		$("#C_SITUACAOMERCADORIA").val(situacaomercadoria)
		$("#VALOR_RADIO1").val(lote)

			
		//TRAVAR OS CAMPOS AO SELECIONAR UM ITEM DE COPIA
	    //	$("#RAD1_SIM").prop("disabled", true)
	    //	$("#RAD1_NAO").prop("disabled", true)
	    //	$("#CLASSIFICACAO_FISCAL").prop("disabled", true)
	    //	$("#NCM").prop("disabled", true)
        //	$("#CLASSIFICACAO_CONTABIL").prop("disabled", true)
         //	$("#UNIDADEMEDIDA").prop("disabled", true)
	    //  $("#CONTACONTABILSPED").prop("disabled", true)
	    //	$("#TIPO").prop("disabled", true)
		
		//LIMPAR CAMPO PATRIMONIO QUANDO NULL
		console.log("PATRIMONIO", patrimonio)
		if(patrimonio == "null" || patrimonio == null || patrimonio == "" || patrimonio == undefined){
			console.log("entrei no if do patrimonio ")			
			$("#VALORGRUPOPATRIMONIO").val('')
			$("#GRUPOPATRIMONIO>option").remove();
		}else {
			console.log("entrei no else do grupo")
			window["GRUPOPATRIMONIO"].setValue(patrimonio)
			$("#VALORGRUPOPATRIMONIO").val(patrimonio.split(" ")[0])
		}
		
		setTimeout(function(){
		$("#CONTACONTABILSPED").prop("disabled", true);
		$("#CLASSIFICACAO").prop("disabled", true);
	//	$("#RAD1_NAO").prop("disabled", true)
	//	$("#RAD1_SIM").prop("disabled", true)
		},1000)
	
    }
	
	if(selectedItem.inputId.indexOf("UNIDADEMEDIDA")!="-1"){
		
		$("#VALORUNIDADEMEDIDA").val(selectedItem["CODUND"]);
	}
	
	if(selectedItem.inputId.indexOf("GRUPOPATRIMONIO")!="-1"){
		console.log("entrei no if do grupo patrimonio", selectedItem["CODGRUPOPATRIMONIO"])
		var patrimonio = selectedItem["CODGRUPOPATRIMONIO"]		
		$("#VALORGRUPOPATRIMONIO").val(patrimonio)
		console.log("valor do patrimonio", patrimonio)
	}
	
	if(selectedItem.inputId.indexOf("CONTACONTABILSPED")!="-1"){
		
		$("#VALOR_SPED").val(selectedItem["CONTACONTABIL"]);
	}
	
	if(selectedItem.inputId.indexOf("CLASSIFICACAO")!="-1"){
		
		$("#VALORCLASSIFICACAO").val(selectedItem["CODTB2FAT"]);
	}
	
	if(selectedItem.inputId.indexOf("NCM")!="-1"){
		
		$("#CODNCM").val(selectedItem["CODNCM"]);
	}
}

function lote2(){
	console.log("entrei na função LOTE")
	//var lotesim = $("#RAD1_SIM").is(':checked');
	//var lotenao = $("#RAD1_NAO").is(':checked');
	var contabil = $("#CODCONTABIL").val();	
	var lote = $("#VALOR_RADIO1").val();
	
	if(contabil == '017' || contabil == '018' || contabil == '019' || contabil == '051' || contabil == '052' ||
		contabil == '053' || contabil == '022' || contabil == '023' || contabil == '024'){
		console.log("entrei no if do lote")
		
		//FLUIGC.switcher.setTrue('#switchControleLote');
		//FLUIGC.switcher.isReadOnly('#switchControleLote', true);
		$("#RAD1_SIM").prop("checked", true);
		$("#RAD1_SIM").prop("disabled", true)
		$("#RAD1_NAO").prop("disabled", true)
		$("#VALOR_RADIO1").val(1); 
		 
	}else{
		console.log("entrei no else do lote")
		
		$("#RAD1_NAO").prop("checked", true);
		$("#RAD1_NAO").prop("disabled", true)
		$("#RAD1_SIM").prop("disabled", true)
		$("#VALOR_RADIO1").val(0); 
		//FLUIGC.switcher.enable('#switchControleLote');
		//FLUIGC.switcher.isReadOnly('#switchControleLote', false);
	}
}

//FUNÇÃO PARA DEIXAR HABILITADO O CAMPO PATRIMONIO PARA O FISCAL
/*function patrimonio2(){
	var contabil = $("#CODCONTABIL").val();
	var fiscal = $("#VALORFISCAL").val();

	if(fiscal == 08){
		if(contabil == 044){
			$("#GRUPOPATRIMONIO").prop("disabled",true);
		}else{
			$("#GRUPOPATRIMONIO").prop("disabled",false);
		}}
}
*/

function removedZoomItem(removedItem){
	
	var input = removedItem.inputId;
	var CAMPO = removedItem.inputName;
	
	if(removedItem.inputId.indexOf("PRODUTO")!="-1"){
	    console.log("entrei no removedItem")
		
		$("#C_CODIGOPRD").val('');
		$("#ID_PRD").val('');
		$("#C_switchControleLote").val('');
		//$("#C_VALORFISCAL").val(fiscal)
		$("#C_CLASSIFICACAO_FISCAL").val('');
		$("#C_CLASSIFICACAO_CONTABIL").val('');
		$("#C_NOME").val('');
		$("#C_DESCRICAO").val('');
		$("#VALORGRUPOPATRIMONIO").val('');
		$("#VALOR_SPED").val('');
		$("#C_NCM").val('');
		$("#C_UNIDADEMEDIDA").val('');
		//	$("#C_TIPO").val(tipo)
		$("#VALOR_RADIO1").val('');
		$("#C_CEST").val('');
		$("#VALORCLASSIFICACAO").val('');
		$("#VALOR_CODCONTABIL").val()
		$("#CONTROLE_LOTE").val("")
		$("#VALORREFERENCIA").val("")
		$("#ID_PRD").val('')
		$("#C_TIPO").val('')
		$("#NOME").val('')
		$("#DESCRICAO").val('')
		$("#TIPO").val('')
		$("#VALORTIPO").val('')
	    //FLUIGC.switcher.isReadOnly('#switchControleLote', false );
		//FLUIGC.switcher.setFalse('#switchControleLote');
		
	}
	if(removedItem.inputId.indexOf("CLASSIFICACAO_CONTABIL")!="-1"){
        console.log("entrei no removedItem CONTABIL")
        $("#CLASSIFICACAO_FISCAL>option").remove();
        $("#CLASSIFICACAO_CONTABIL>option").remove();
        $("#VALOR_RADIO1").val('')
        $("#RAD1_NAO").prop("disabled", false)
        $("#RAD1_SIM").prop("disabled", false)
        $("#RAD1_NAO").click();
        $("#VALORFISCAL").val('');
        $("#VALOR_RADIO1").val('');
        $("#CODCONTABIL").val('');		
        $("VALORGRUPOPATRIMONIO").val('');
	}
	
	if(removedItem.inputId.indexOf("CLASSIFICACAO_FISCAL")!="-1"){
	    console.log("entrei no remove item classificacao fiscal");
		//$("#NCM>option").remove();
		$("#CLASSIFICACAO_CONTABIL>option").remove();
	    //$("#UNIDADEMEDIDA>option").remove();
		$("#CLASSIFICACAO>option").remove();
		$("#GRUPOPATRIMONIO>option").remove();
		$("#CLASSIFICACAO_FISCAL>option").remove();
		//$("#CONTACONTABILSPED>option").remove();
		//$("#TIPO").val('');
		$("VALOR_RADIO1").val('')
		$("#RAD1_NAO").prop("disabled", false);
		$("#RAD1_SIM").prop("disabled", false);
		$("#RAD1_NAO").click();
		//$("#VALORTIPO").val('');
		$("#VALORFISCAL").val('');
		$("#VALOR_RADIO1").val('');
		//$("#CODNCM").val('');
		$("#CODCONTABIL").val('');
		//$("#VALORUNIDADEMEDIDA").val('');
		$("VALORGRUPOPATRIMONIO").val('');
	}
	
	if(removedItem.inputId.indexOf("GRUPOPATRIMONIO")!="-1"){
		$("VALORGRUPOPATRIMONIO").val('');
	}
	/* if(removedItem.inputId.indexOf("PRODUTO")!="-1"){
		console.log("entrei no remove do consulta produto")
		$("#NCM>option").remove();
		$("#CLASSIFICACAO_CONTABIL>option").remove();
		$("#UNIDADEMEDIDA>option").remove();
		$("#GRUPO>option").remove();
		$("#SUBGRUPO>option").remove();
		$("#CLASSIFICACAO>option").remove();
		$("#GRUPOPATRIMONIO>option").remove();
		$("#CLASSIFICACAO_FISCAL>option").remove();
		$("#CONTACONTABILSPED>option").remove();
		$("#TIPO").val('');
		$("#VALOR_RADIO1").val('')
		$("#RAD1_NAO").prop("disabled", false)
		$("#RAD1_SIM").prop("disabled", false)
		$("#RAD1_NAO").click();
		$("#VALORTIPO").val('');
		$("#VALORFISCAL").val('');
		$("#VALOR_RADIO1").val('');
		$("#CODNCM").val('');
		$("#CODCONTABIL").val('');
		$("#VALORUNIDADEMEDIDA").val('');
	} */
	
	if(removedItem.inputId.indexOf("NCM")!="-1"){
	console.log("entrei no removedItem")
		
	    $("#NCM>option").remove();
/* 	    $("#CLASSIFICACAO_CONTABIL>option").remove();
	    $("#UNIDADEMEDIDA>option").remove();
	    $("#GRUPO>option").remove();
	    $("#SUBGRUPO>option").remove();
	    $("#CLASSIFICACAO>option").remove();
	    $("#GRUPOPATRIMONIO>option").remove();
	    $("#CLASSIFICACAO_FISCAL>option").remove();
	    $("#CONTACONTABILSPED>option").remove();
	    $("#TIPO").val('');
	    $("#VALOR_RADIO1").val('')
	    $("#RAD1_NAO").prop("disabled", false);
	    $("#RAD1_SIM").prop("disabled", false);
	    $("#RAD1_NAO").click();
	    $("#VALORTIPO").val('');
	    $("#VALORFISCAL").val('');
	    $("#VALOR_RADIO1").val('');
	    $("#CODNCM").val('');
	    $("#CODCONTABIL").val('');
	    $("#VALORUNIDADEMEDIDA").val(''); */
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


