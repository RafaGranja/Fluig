// BUSCA TODOS OS MATERIAIS DA OS NO CADASTRO DA ESTRUTURA
function buscaMateriaisOS(){
	
	console.log("vou buscar os materiais na OS")
	
	var numOS = $("#NUM_OS").val()
	
	var ret = false
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	dataset = DatasetFactory.getDataset("dsBuscaMateriaisOS",null,constraints,null);
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("Valor de count "+row);
	
	// SE RESULTADO DA CONSULTA FOI VAZIO OU NULO
	if(row=="" || row==null || row==undefined || row=="null"){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não foi localizada uma lista de materiais para a OS informada!',
			  text: 'Verifique e tente novamente'
		})			
		
		// LIMPA OS CAMPOS PREENCHIDOS PELO ZOOM
		/*$("#NUM_OS").val("")
		$("#DESCRICAO_OS").val("")
		$("#OS_INFO>option").remove()*/
		
	} else {
		
		console.log("ROW antes de ordenar")
		console.log(row)
		
		// ORDENA O ARRAY DOS REGISTROS PELA POSIÇÃO
		//row = ordenaRowPosicao(row,count)
		
		//console.log("ROW depois de ordenar")
		//console.log(row)
		
		//count = Object.keys(row).length
		//console.log("count: "+count)
		
		// PERCORRE TODOS OS REGISTROS ENCONTRADOS E PREENCHE A TABELA COM OS DADOS
		for(var i=0; i < count; i++){
			
			console.log("Estou no for indice "+i);
			var rep = row[i];
			ret = true
			var idCriacao = rep['IDCRIACAO']
			
			console.log("idCriacao: "+idCriacao)
			
			// VERIFICA SE O ID JÁ FOI SALVO
			//if(verificaId(idCriacao)){
				
				// GUARDA OS DADOS EM VARIÁVEIS
				var posicaoDesenho = rep["POSICAODESENHO"]
				var numdesenho = rep["NUMDESENHO"]
				var totalQtde = rep["TOTALQTDE"]
				var descricao = rep["DESCRICAO"]
				var esprosca = rep["ESPROSCA"]
				var os = rep["OS"]
				var material = rep["MATERIAL"]
				
				var bitola = rep["BITOLA"]
				var largura = rep["LARGURA"]
				var comprimento = rep["COMPRIMENTO"]
				var pesoBruto = rep["PESOBRUTO"]
				var execucao = rep["EXECUCAO"]
			
				console.log("posicao: "+posicaoDesenho+", descricao: "+descricao+", numdesenho: "+numdesenho+
						"quantidade: "+totalQtde+", bitola: "+bitola+", largura: "+largura+", esprosca: "+
						esprosca+", comprimento: "+comprimento+", material: "+material+", os: "+os+
						", peso: "+pesoBruto+", idCriacao: "+idCriacao+", execucao: "+execucao)
				
				var seq = childAdd()
				
				
				//if(totalQtde)
				$("#POSICAO___"+seq).val(posicaoDesenho)
				$("#DESCRICAO___"+seq).val(descricao)
				$("#NUMDESENHO___"+seq).val(numdesenho)
				$("#ESPROSCA___"+seq).val(esprosca)
				$("#MATERIAL___"+seq).val(material)
				$("#OS___"+seq).val(os)
				$("#IDCRIACAO___"+seq).val(idCriacao)
				
				// SE BITOLA NÃO É VÁLIDO
				if(!(bitola=="" || bitola==NaN || bitola=="NaN" || bitola==null || bitola=="null")){
					
					if(bitola.includes(",")){
						
						bitola = bitola.replace(",",".")
						
					}
					
					bitola = parseFloat(bitola)
					bitola = bitola.toFixed(2)
					
					bitola = bitola.toString().replace(".",",")

					$("#BITOLA___"+seq).val(bitola)
					
				}
				
				// SE LARGURA NÃO É VÁLIDO
				if(!(largura=="" || largura==NaN || largura=="NaN" || largura==null || largura=="null")){
					
					if(largura.includes(",")){
						
						largura = largura.replace(",",".")
						
					}
					
					largura = parseFloat(largura)
					largura = largura.toFixed(4)
					
					largura = largura.toString().replace(".",",")

					$("#LARGURA___"+seq).val(largura)
					
				}
				
				// SE COMPRIMENTO NÃO É VÁLIDO
				if(!(comprimento=="" || comprimento==NaN || comprimento=="NaN" || comprimento==null || comprimento=="null")){
					
					if(comprimento.includes(",")){
						
						comprimento = comprimento.replace(",",".")
						
					}

					comprimento = parseFloat(comprimento)
					comprimento = comprimento.toFixed(4)
					
					comprimento = comprimento.toString().replace(".",",")

					$("#COMPRIMENTO___"+seq).val(comprimento)
					
				}
				
				// SE PESOBRUTO NÃO É VÁLIDO
				if(!(pesoBruto=="" || pesoBruto==NaN || pesoBruto=="NaN" || pesoBruto==null || pesoBruto=="null")){

					if(pesoBruto.includes(",")){
						
						pesoBruto = pesoBruto.replace(",",".")
						
					}
					
					console.log("PESO")
					
					execucao = parseInt(execucao)
					
					pesoBruto = parseFloat(pesoBruto)
					pesoBruto = pesoBruto.toFixed(4)
					
					console.log("PESO ANTES DO CALCULO: "+pesoBruto)
					
					pesoBruto = pesoBruto * execucao
					
					pesoBruto = pesoBruto.toFixed(4)
					
					console.log("PESO APÓS O CALCULO: "+pesoBruto)
					
					pesoBruto = pesoBruto.toString().replace(".",",")
					
					$("#PESOBRUTO___"+seq).val(pesoBruto)
					
				}
				
				// SE TOTALQTDE NÃO É VALIDO
				if(!(totalQtde=="" || totalQtde==NaN || totalQtde=="NaN" || totalQtde==null || totalQtde=="null")){
					
					if(totalQtde.includes(",")){
						
						totalQtde = totalQtde.replace(",",".")
						
					}
					
					console.log("QUANTIDADE")
					
					execucao = parseInt(execucao)
					
					totalQtde = parseFloat(totalQtde)
					totalQtde = totalQtde.toFixed(4)
					
					console.log("QUANTIDADE ANTES DO CALCULO: "+totalQtde)
					
					totalQtde = totalQtde * execucao
					
					totalQtde = totalQtde.toFixed(4)
					
					console.log("QUANTIDADE APÓS O CALCULO: "+pesoBruto)
					
					totalQtde = totalQtde.toString().replace(".",",")
					
					$("#QUANTIDADE___"+seq).val(totalQtde)
					
				}
				
				// VERIFICA SE O ID JÁ FOI SALVO
				if(temIdCriacao(idCriacao)){
				
					console.log("vou esconder LINHA___"+seq)
					
					$("#LINHA___"+seq).hide()
					$("#LINHA___"+seq).addClass("invisivel")
				
				}
				
			//}
					
		}
		
		// PREENCHE OS MATERIAIS DAS ORDENS QUE FORAM RETRABALHADAS
		buscaMateraisRetrabalho()
		
		// MOSTRA TÍTULO DA TABELA
		$(".tituloTabela").show()
		$(".PRODUTO_RM").show()
		
		// LIMPA TODOS OS CAMPOS ZOOMS DO PRODUTO RM
		$("#PRODUTO_RM1").val("")
		$("#PRODUTO_RM1").prop("readonly",false)
		$("#IDPRD1").val("")
		$("#CODIGOPRD1").val("")
		$("#PRODUTO_RM2").val("")
		$("#PRODUTO_RM2").prop("readonly",false)
		$("#IDPRD2").val("")
		$("#CODIGOPRD2").val("")
		$("#PRODUTO_RM3").val("")
		$("#PRODUTO_RM3").prop("readonly",false)
		$("#IDPRD3").val("")
		$("#CODIGOPRD3").val("")
		$("#PRODUTO_RM4").val("")
		$("#PRODUTO_RM4").prop("readonly",false)
		$("#IDPRD4").val("")
		$("#CODIGOPRD4").val("")
		$("#PRODUTO_RM5").val("")
		$("#PRODUTO_RM5").prop("readonly",false)
		$("#IDPRD5").val("")
		$("#CODIGOPRD5").val("")
		$("#PRODUTO_RM6").val("")
		$("#PRODUTO_RM6").prop("readonly",false)
		$("#IDPRD6").val("")
		$("#CODIGOPRD6").val("")
		
	}
	
	return ret
			
}

// LIMPA TABELA SALVOS
function limpaTabelaSalvos(){
	
	// PERCORRE TODA A TABELA DOS ITENS SALVOS E REMOVE OS REGISTROS
	$("input[id^='NUMDESENHOSALVOS___']").each(function(){
		
		$(this).parents("tr").remove()
		
	})
	
}

// RETORNA OS IDCRICAO DE UM DESENHO POSICAO E DESCRICAO
function retornaArrayIDcriacao(numOS,numDesenho,posicao,descricao){


	// CONSULTA BANCO
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("POSICAO",posicao,posicao,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("DESENHO",numDesenho,numDesenho,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("DESCRICAO",descricao,descricao,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4)
	var dataset = DatasetFactory.getDataset("dsIdCriacaoListaMateriais",null,constraints,null)
	var row = dataset.values

	var idcriacao = new Array()

	// SE RETORNO É VAZIO OU NULO, NÃO DEVE PERMITIR EDIÇÃO DA LISTA
	if(!(row=="" || row==null || row==undefined)){
	
		var count = row.length
		
		console.log("id's criacao: "+count)
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){

			var rep = row[i]

			idcriacao.push(rep["IDCRIACAOSALVOS"])

		}

	}

	idcriacao = idcriacao.toString()
	idcriacao = idcriacao.replace(/\,/g,";")

	return idcriacao;

}

function agrupaTabelaSalvos(){

	console.log("entrei para agrupar linhas")
	// PERCORRE OS REGISTROS DA TABELA DA ABA SALVOS
	$("input[id^='NUMDESENHOSALVOS___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]

		console.log("primeiro seq:"+ seq)

		if($("#NUMDESENHOSALVOS___"+seq)[0]!=undefined){

			$("input[id^='NUMDESENHOSALVOS___']").each(function(){

				var seq2 = $(this).attr("id").split("___")[1]

				console.log("segundo seq:"+ seq2)

				if($("#NUMDESENHOSALVOS___"+seq2)[0]!=undefined){

					console.log("comparando "+seq+" e "+seq2+"")

					var numDesenho = $("#NUMDESENHOSALVOS___"+seq).val()
					var posicao = $("#POSICAOSALVOS___"+seq).val()
					var qtde = parseInt($("#QUANTIDADESALVOS___"+seq).val())
					var descricao = $("#DESCRICAOSALVOS___"+seq).val()
					var peso = parseFloat($("#PESOBRUTOSALVOS___"+seq).val().replace(",","."))
					var pesounitario = parseFloat($("#PESOBRUTOUNITARIOSALVOS___"+seq).val().replace(",","."))
					var qtdorigemMp1 =  isNaN(parseFloat($("#QTDORIGEM1SALVOS___"+seq).val().replace(",","."))) ? 0 : parseFloat($("#QTDORIGEM1SALVOS___"+seq).val().replace(",","."));
					var qtdorigemMp2 =  isNaN(parseFloat($("#QTDORIGEM2SALVOS___"+seq).val().replace(",","."))) ? 0 : parseFloat($("#QTDORIGEM2SALVOS___"+seq).val().replace(",","."));
					var pesoorigemMp1 =  isNaN(parseFloat($("#PESOORIGEM1SALVOS___"+seq).val().replace(",","."))) ? 0 : parseFloat($("#PESOORIGEM1SALVOS___"+seq).val().replace(",","."));
					var pesoorigemMp2 =  isNaN(parseFloat($("#PESOORIGEM2SALVOS___"+seq).val().replace(",","."))) ? 0 : parseFloat($("#PESOORIGEM2SALVOS___"+seq).val().replace(",","."));
			
					var idcriacao = $("#IDCRIACAOSALVOS___"+seq).val()


					var numDesenho2 = $("#NUMDESENHOSALVOS___"+seq2).val()
					var posicao2 = $("#POSICAOSALVOS___"+seq2).val()
					var qtde2 =  parseInt($("#QUANTIDADESALVOS___"+seq2).val())
					var descricao2 = $("#DESCRICAOSALVOS___"+seq2).val()
					var peso2 =  parseFloat($("#PESOBRUTOSALVOS___"+seq2).val().replace(",","."))
					var pesounitario2 =  parseFloat($("#PESOBRUTOUNITARIOSALVOS___"+seq2).val().replace(",","."))
					var qtdorigemMp12 =  isNaN(parseFloat($("#QTDORIGEM1SALVOS___"+seq2).val().replace(",","."))) ? 0 : parseFloat($("#QTDORIGEM1SALVOS___"+seq2).val().replace(",","."));
					var qtdorigemMp22 =  isNaN(parseFloat($("#QTDORIGEM2SALVOS___"+seq2).val().replace(",","."))) ? 0 : parseFloat($("#QTDORIGEM2SALVOS___"+seq2).val().replace(",","."));
					var pesoorigemMp12 =  isNaN(parseFloat($("#PESOORIGEM1SALVOS___"+seq2).val().replace(",","."))) ? 0 : parseFloat($("#PESOORIGEM1SALVOS___"+seq2).val().replace(",","."));
					var pesoorigemMp22 =  isNaN(parseFloat($("#PESOORIGEM2SALVOS___"+seq2).val().replace(",","."))) ? 0 : parseFloat($("#PESOORIGEM2SALVOS___"+seq2).val().replace(",","."));

					var idcriacao2 = $("#IDCRIACAOSALVOS___"+seq2).val()

					if(numDesenho==numDesenho2 && posicao==posicao2 && descricao==descricao2 && seq!=seq2){



						$("#QUANTIDADESALVOS___"+seq).val((Math.round((qtde + qtde2)*10000)/10000).toString().replace(".",","))
						$("#PESOBRUTOSALVOS___"+seq).val((Math.round((peso + peso2)*10000)/10000).toString().replace(".",","))
						$("#PESOBRUTOUNITARIOSALVOS___"+seq).val( (Math.round((pesounitario + pesounitario2 )*10000)/10000).toString().replace(".",","))
						$("#QTDORIGEM1SALVOS___"+seq).val((Math.round((qtdorigemMp1 + qtdorigemMp12 )*10000)/10000).toString().replace(".",","))
						$("#QTDORIGEM2SALVOS___"+seq).val((Math.round((qtdorigemMp2 + qtdorigemMp22 )*10000)/10000).toString().replace(".",","))
						$("#PESOORIGEM1SALVOS___"+seq).val((Math.round((pesoorigemMp1 + pesoorigemMp12 )*10000)/10000).toString().replace(".",","))
						$("#PESOORIGEM2SALVOS___"+seq).val((Math.round((pesoorigemMp2 + pesoorigemMp22 )*10000)/10000).toString().replace(".",","))

						$("#IDCRIACAOSALVOS___"+seq).val( idcriacao + ";" + idcriacao2 )

						$("#LINHASALVOS___"+seq2).remove()

					}

				}

			})
		
		}
	
	})

	$("input[id^='NUMDESENHOSALVOS___']").each(function(){

		var seq = $(this).attr("id").split("___")[1]

		var qtdorigem1 = $("#QTDORIGEM1SALVOS___"+seq).val()
		var qtdorigem2 = $("#QTDORIGEM2SALVOS___"+seq).val()

		var pesoorigem1 = $("#PESOORIGEM1SALVOS___"+seq).val()
		var pesoorigem2 = $("#PESOORIGEM2SALVOS___"+seq).val()

		var qtd = $("#QUANTIDADESALVOS___"+seq).val()

		pesoorigem1 = pesoorigem1 == 0 ? '0,0000' : (Math.round(parseFloat(pesoorigem1.replace(",","."))*10000)/10000).toFixed(4).replace(".",",");
		pesoorigem2 = pesoorigem2 == 0 ? '0,0000' : (Math.round(parseFloat(pesoorigem2.replace(",","."))*10000)/10000).toFixed(4).replace(".",",");

		$("#PESOORIGEM1SALVOS___"+seq).val(pesoorigem1)
		$("#PESOORIGEM2SALVOS___"+seq).val(pesoorigem2)

		$("#QTDORIGEM1SALVOS___"+seq).val(Math.round(qtdorigem1.replace(",","."))+",0000")
		$("#QTDORIGEM2SALVOS___"+seq).val(Math.round(qtdorigem2.replace(",","."))+",0000")
		if(!qtd.includes(",")){

			$("#QUANTIDADESALVOS___"+seq).val( qtd + ",0000")

		}


	})


}

// BUSCA OS ITENS SALVOS NA LISTA DE MATERIAIS E 
function preencheTabelaSalvos(){
	
	console.log("preenche TABELA SALVOS")
	
	// LIMPA TABELA SALVOS
	limpaTabelaSalvos()

	$("#AMARELO").text(0)
	$("#VERDE").text(0)
	$("#VERMELHO").text(0)
	
	var numOS = $("#NUM_OS").val()

	// CONSULTA BANCO
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	var dataset = DatasetFactory.getDataset("dsItensListaMateriais",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO É VAZIO OU NULO, NÃO DEVE PERMITIR EDIÇÃO DA LISTA
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		console.log("count: "+count)
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			// CRIA LINHA NA TABELA
			var seq = childAdd3()
			
			console.log("seq: "+seq)
			
			var numDesenho = rep["NUMDESENHOSALVOS"]
			var posicao = rep["POSICAOSALVOS"]
			var totalQtde = rep["QUANTIDADESALVOS"]
			var descricao = rep["DESCRICAOSALVOS"]
			var material = rep["MATERIALSALVOS"]
			var bitola = rep["BITOLASALVOS"]
			var largura = rep["LARGURASALVOS"]
			var comprimento = rep["COMPRIMENTOSALVOS"]
			var espRosca = rep["ESPROSCASALVOS"]
			var pesoBruto = rep["PESOBRUTOSALVOS"]
			var pesoBrutoUnitario = rep["PESOUNITARIO"]
			var idCriacao = rep["IDCRIACAOSALVOS"]//retornaArrayIDcriacao(numOS,numDesenho,posicao,descricao)
			var produtoRM1 = rep["PRODUTORM1SALVOS"]
			var produtoRM2 = rep["PRODUTORM2SALVOS"]
			var produtoRM3 = rep["PRODUTORM3SALVOS"]
			var produtoRM4 = rep["PRODUTORM4SALVOS"]
			var produtoRM5 = rep["PRODUTORM5SALVOS"]
			var produtoRM6 = rep["PRODUTORM6SALVOS"]
			var idPrd1 = rep["IDPRD1SALVOS"]
			var idPrd2 = rep["IDPRD2SALVOS"]
			var idPrd3 = rep["IDPRD3SALVOS"]
			var idPrd4 = rep["IDPRD4SALVOS"]
			var idPrd5 = rep["IDPRD5SALVOS"]
			var idPrd6 = rep["IDPRD6SALVOS"]
			var codigoprd1 = rep["CODIGOPRD1SALVOS"]
			var codigoprd2 = rep["CODIGOPRD2SALVOS"]
			var codigoprd3 = rep["CODIGOPRD3SALVOS"]
			var codigoprd4 = rep["CODIGOPRD4SALVOS"]
			var codigoprd5 = rep["CODIGOPRD5SALVOS"]
			var codigoprd6 = rep["CODIGOPRD6SALVOS"]
			var numOS = rep["NUMOSSALVOS"]
			var origemMP1 = rep["ORIGEMMP1SALVOS"]
			var origemMP2 = rep["ORIGEMMP2SALVOS"]
			var undprd1 = rep["UNDPRD1SALVOS"]
			var undprd2 = rep["UNDPRD2SALVOS"]
			var undprd3 = rep["UNDPRD3SALVOS"]
			var undprd4 = rep["UNDPRD4SALVOS"]
			var undprd5 = rep["UNDPRD5SALVOS"]
			var undprd6 = rep["UNDPRD6SALVOS"]
			var obsGerais = rep["OBSGERAL"] 
			var diamExt = rep["DIAMETROEXTERNODISCO"]
			var diamInt = rep["DIAMETROINTERNODISCO"]
			var pedidoCompra = rep["PEDIDOCOMPRASALVOS"]
			var lote = rep["LOTESALVOS"]
			var qtdorigemMP1 = rep["QTDORIGEM1SALVOS"]
			var qtdorigemMP2 = rep["QTDORIGEM2SALVOS"]
			var revisaosalvos = rep["REVISAOSALVOS"]
			var massalinear = rep["MASSALINEAR"]
			var pesoliquido = rep["PESOLIQUIDO"]

			
			console.log("numDesenho: "+numDesenho+", posicao: "+posicao+", totalQtde: "+totalQtde+
					", descricao: "+descricao+", material: "+material+", bitola: "+bitola+", largura: "+largura+
					", comprimento: "+comprimento+", espRosca: "+espRosca+", pesoBruto: "+pesoBruto+", idCriacao: "+
					idCriacao+", produtoRM1: "+produtoRM1+", produtoRM2: "+produtoRM2+", produtoRM3: "+produtoRM3+", produtoRM4: "+produtoRM4+
					", produtoRM5: "+produtoRM5+", produtoRM6: "+produtoRM6+", idPrd1: "+idPrd1+", idPrd2: "+idPrd2+", codigoprd1: "+codigoprd1+
					", idPrd3: "+idPrd3+", idPrd4: "+idPrd4+", idPrd5: "+idPrd5+", idPrd6: "+idPrd6+", codigoprd2: "+codigoprd2+", codigoprd3: "+codigoprd3+
					", codigoprd4: "+codigoprd4+", codigoprd5: "+codigoprd5+", codigoprd6: "+codigoprd6+
					", numOS: "+numOS+", origemMP1: "+origemMP1+", origemMP2: "+origemMP2+", qtdorigemMP1: "+qtdorigemMP1+", qtdorigemMP2: "+qtdorigemMP2+", undprd1: "+undprd1+", undprd2: "+undprd2+", undprd3: "+undprd3+", undprd4: "+undprd4+
					", undprd5: "+undprd5+", undprd6: "+undprd6+", obsGerais: "+obsGerais+", diamExt: "+diamExt+", diamInt: "+diamInt)
			
			// SALVA OS DADOS NA TABELA
			
			// SE NUMDESENHO NÃO É VAZIO OU NULO
			if(!(numDesenho=="" || numDesenho==null || numDesenho==undefined || numDesenho=="null")){
				
				$("#NUMDESENHOSALVOS___"+seq).val(numDesenho)

			}
			
			// SE TOTALQTDE NÃO É VAZIO OU NULO
			if(!(totalQtde=="" || totalQtde==null || totalQtde==undefined || totalQtde=="null")){
			
				$("#QUANTIDADESALVOS___"+seq).val(totalQtde)
				
			}
			
			// SE POSICAO NÃO É VAZIO OU NULO
			if(!(posicao=="" || posicao==null || posicao==undefined || posicao=="null")){
			
				$("#POSICAOSALVOS___"+seq).val(posicao)
			
			}
			
			// SE DESCRIACAO NÃO É VAZIO OU NULO
			if(!(descricao=="" || descricao==null || descricao==undefined || descricao=="null")){
			
				$("#DESCRICAOSALVOS___"+seq).val(descricao)
				
			}
			
			// SE MATERIAL NÃO É VAZIO OU NULO
			if(!(material=="" || material==null || material==undefined || material=="null")){
			
				$("#MATERIALSALVOS___"+seq).val(material)
				
			}
			
			// SE BITOLA NÃO É VAZIO OU NULO
			if(!(bitola=="" || bitola==null || bitola==undefined || bitola=="null")){
			
				$("#BITOLASALVOS___"+seq).val(bitola)
			
			}
			
			// SE LARGURA NÃO É VAZIO OU NULO
			if(!(largura=="" || largura==null || largura==undefined || largura=="null")){
			
				$("#LARGURASALVOS___"+seq).val(largura)
				
			}
			
			// SE COMPRIMENTO NÃO É VAZIO OU NULO
			if(!(comprimento=="" || comprimento==null || comprimento==undefined || comprimento=="null")){
			
				$("#COMPRIMENTOSALVOS___"+seq).val(comprimento)
				
			}
			
			// SE ESPROSCA NÃO É VAZIO OU NULO
			if(!(espRosca=="" || espRosca==null || espRosca==undefined || espRosca=="null")){
			
				$("#ESPROSCASALVOS___"+seq).val(espRosca)
			
			}
			
			// SE PESOBRUTO NÃO É VAZIO OU NULO
			if(!(pesoBruto=="" || pesoBruto==null || pesoBruto==undefined || pesoBruto=="null")){
			
				$("#PESOBRUTOSALVOS___"+seq).val(pesoBruto)
				
			}
			
			// SE IDCRIACAO NÃO É VAZIO OU NULO
			if(!(idCriacao=="" || idCriacao==null || idCriacao==undefined || idCriacao=="null")){
			
				$("#IDCRIACAOSALVOS___"+seq).val(idCriacao)
				
			}
			
			// SE NUMOS NÃO É VAZIO OU NULO
			if(!(numOS=="" || numOS==null || numOS==undefined || numOS=="null")){
				$("#NUMOSSALVOS___"+seq).val(numOS)

			}
			
			// SE ORIGEMMP NÃO É VAZIO OU NULO
			if(!(origemMP1=="" || origemMP1==null || origemMP1==undefined || origemMP1=="null")){
			
				$("#ORIGEMMP1SALVOS___"+seq).val(origemMP1)
				$("#SELECTORIGEMMP1SALVOS___"+seq).val(origemMP1)
				
			}

			$("#SELECTORIGEMMP1SALVOS___"+seq).attr("disabled",true)

			// SE ORIGEMMP NÃO É VAZIO OU NULO
			if(!(origemMP2=="" || origemMP2==null || origemMP2==undefined || origemMP2=="null")){

				$("#ORIGEMMP2SALVOS___"+seq).val(origemMP2)
				$("#SELECTORIGEMMP2SALVOS___"+seq).val(origemMP2)

			}

			$("#SELECTORIGEMMP2SALVOS___"+seq).attr("disabled",true)

			// SE QTDORIGEMMP1 NÃO É VAZIO OU NULO
			if(!(qtdorigemMP1=="" || qtdorigemMP1==null || qtdorigemMP1==undefined || qtdorigemMP1=="null")){

				$("#QTDORIGEM1SALVOS___"+seq).val(qtdorigemMP1)
				var a = isNaN(parseFloat(qtdorigemMP1.replace(",",".")) * parseFloat(pesoBrutoUnitario.replace(",","."))) ? '0,0000' : parseFloat(qtdorigemMP1.replace(",",".")) * parseFloat(pesoBrutoUnitario.replace(",","."))

				a = a.toString()

				if(a.includes(".")){

					a = Math.round(parseFloat(a)*10000)/10000
					a = a.toString()
					a = a.replace(".",",")

				}
				else if(!a.includes(",")){

					a = a + ',0000'

				}

				$("#PESOORIGEM1SALVOS___"+seq).val(a) 
				
			}
			else{

				$("#QTDORIGEM1SALVOS___"+seq).val("0,0000")
				$("#PESOORIGEM1SALVOS___"+seq).val("0,0000")

			}

			// SE QTDORIGEMMP2 NÃO É VAZIO OU NULO
			if(!(qtdorigemMP2=="" || qtdorigemMP2==null || qtdorigemMP2==undefined || qtdorigemMP2=="null")){

				$("#QTDORIGEM2SALVOS___"+seq).val(qtdorigemMP2)
				var a = isNaN(parseFloat(qtdorigemMP2.replace(",",".")) * parseFloat(pesoBrutoUnitario.replace(",","."))) ? '0,0000' : parseFloat(qtdorigemMP2.replace(",",".")) * parseFloat(pesoBrutoUnitario.replace(",","."))

				a = a.toString()

				if(a.includes(".")){

					a = Math.round(parseFloat(a)*10000)/10000
					a = a.toString()
					a = a.replace(".",",")

				}
				else if(!a.includes(",")){

					a = a + ',0000'

				}

				$("#PESOORIGEM2SALVOS___"+seq).val(a)
				
			}
			else{

				$("#QTDORIGEM2SALVOS___"+seq).val("0,0000")
				$("#PESOORIGEM2SALVOS___"+seq).val("0,0000")

			}

			// SE NUMOS NÃO É VAZIO OU NULO
			if(!(pesoliquido=="" || pesoliquido==null || pesoliquido==undefined || pesoliquido=="null")){

				$("#PESOLIQUIDOSALVOS___"+seq).val(pesoliquido)

			}

			// SE NUMOS NÃO É VAZIO OU NULO
			if(!(massalinear=="" || massalinear==null || massalinear==undefined || massalinear=="null")){

				$("#MASSALINEARSALVOS___"+seq).val(massalinear)

			}

			if(!(pesoBrutoUnitario=="" || pesoBrutoUnitario==null || pesoBrutoUnitario==undefined || pesoBrutoUnitario=="null")){

				$("#PESOBRUTOUNITARIOSALVOS___"+seq).val(pesoBrutoUnitario)

			}
			
			// SE DIAMEXT NÃO É VAZIO OU NULO
			if(!(diamExt=="" || diamExt==null || diamExt==undefined || diamExt=="null")){
			
				$("#DIAMEXTSALVOS___"+seq).val(diamExt)
				
			}
			
			// SE DIAMINT NÃO É VAZIO OU NULO
			if(!(diamInt=="" || diamInt==null || diamInt==undefined || diamInt=="null")){
			
				$("#DIAMINTSALVOS___"+seq).val(diamInt)
				
			}
			
			// SE OBSGERAIS NÃO É VAZIO OU NULO
			if(!(obsGerais=="" || obsGerais==null || obsGerais==undefined || obsGerais=="null")){
			
				$("#OBSGERAISSALVOS___"+seq).val(obsGerais)
				
			}
			
			// SE PEDIDO COMPRA NÃO É VAZIO OU NULO
			if(!(pedidoCompra=="" || pedidoCompra==null || pedidoCompra==undefined || pedidoCompra=="null")){
			
				$("#PEDIDOCOMPRASALVOS___"+seq).val(pedidoCompra)
				
			}
			
			// SE PEDIDO COMPRA NÃO É VAZIO OU NULO
			if(!(lote=="" || lote==null || lote==undefined || lote=="null")){
			
				$("#LOTESALVOS___"+seq).val(lote)
				
			}
			
			// SE PRODUTORM1 FOI PREENCHIDO
			if(!(produtoRM1=="" || produtoRM1==null || produtoRM1==undefined || produtoRM1=="null")){
				
				$("#PRODUTORM1SALVOS___"+seq).val(produtoRM1)
				$("#IDPRD1SALVOS___"+seq).val(idPrd1)
				$("#CODIGOPRD1SALVOS___"+seq).val(codigoprd1)
				$("#UNDPRD1SALVOS___"+seq).val(undprd1)
				$("#CODIFICADOSALVOS___"+seq).parent().removeClass()
				$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox")
				$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-success")
				$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-lg")
				$("#CODIFICADOSALVOS___"+seq).parent().attr("title","OK")
				$("#CODIFICADOSALVOS___"+seq).click()
				
			}
			else{

				$("#CODIFICADOSALVOS___"+seq).parent().removeClass()
				$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox")
				$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-danger")
				$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-lg")
				$("#CODIFICADOSALVOS___"+seq).parent().attr("title","Não codifcado")
				$("#CODIFICADOSALVOS___"+seq).click()

			}
			
			// SE PRODUTORM2 FOI PREENCHIDO
			if(!(produtoRM2=="" || produtoRM2==null || produtoRM2==undefined || produtoRM2=="null")){
				
				$("#PRODUTORM2SALVOS___"+seq).val(produtoRM2)
				$("#IDPRD2SALVOS___"+seq).val(idPrd2)
				$("#CODIGOPRD2SALVOS___"+seq).val(codigoprd2)
				$("#UNDPRD2SALVOS___"+seq).val(undprd2)
				
			}
			
			// SE PRODUTORM3 FOI PREENCHIDO
			if(!(produtoRM3=="" || produtoRM3==null || produtoRM3==undefined || produtoRM3=="null")){
				
				$("#PRODUTORM3SALVOS___"+seq).val(produtoRM3)
				$("#IDPRD3SALVOS___"+seq).val(idPrd3)
				$("#CODIGOPRD3SALVOS___"+seq).val(codigoprd3)
				$("#UNDPRD3SALVOS___"+seq).val(undprd3)
			
			}
			
			// SE PRODUTORM4 FOI PREENCHIDO
			if(!(produtoRM4=="" || produtoRM4==null || produtoRM4==undefined || produtoRM4=="null")){
				
				$("#PRODUTORM4SALVOS___"+seq).val(produtoRM4)
				$("#IDPRD4SALVOS___"+seq).val(idPrd4)
				$("#CODIGOPRD4SALVOS___"+seq).val(codigoprd4)
				$("#UNDPRD4SALVOS___"+seq).val(undprd4)
					
			}
			
			// SE PRODUTORM5 FOI PREENCHIDO
			if(!(produtoRM5=="" || produtoRM5==null || produtoRM5==undefined || produtoRM5=="null")){
				
				$("#PRODUTORM5SALVOS___"+seq).val(produtoRM5)
				$("#IDPRD5SALVOS___"+seq).val(idPrd5)
				$("#CODIGOPRD5SALVOS___"+seq).val(codigoprd5)
				$("#UNDPRD5SALVOS___"+seq).val(undprd5)
						
			}
			
			// SE PRODUTORM6 FOI PREENCHIDO
			if(!(produtoRM6=="" || produtoRM6==null || produtoRM6==undefined || produtoRM6=="null")){
				
				$("#PRODUTORM6SALVOS___"+seq).val(produtoRM6)
				$("#IDPRD6SALVOS___"+seq).val(idPrd6)
				$("#CODIGOPRD6SALVOS___"+seq).val(codigoprd6)
				$("#UNDPRD6SALVOS___"+seq).val(undprd6)
			
			}

			$("#REVISAOSALVOS___"+seq).val(revisaosalvos)
			if(revisaosalvos==1){

				$("#CODIFICADOSALVOS___"+seq).parent().removeClass()
				$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox")
				$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-warning")
				$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-lg")
				$("#CODIFICADOSALVOS___"+seq).parent().attr("title","Necessita de Revisão")

			}


			if($("#CODIFICADOSALVOS___"+seq).parent().hasClass("custom-checkbox-warning")){

				$("#AMARELO").text( Number($("#AMARELO").text()) + 1 )

			}
			else if($("#CODIFICADOSALVOS___"+seq).parent().hasClass("custom-checkbox-success")){

				$("#VERDE").text( Number($("#VERDE").text()) + 1 )

			}
			else if($("#CODIFICADOSALVOS___"+seq).parent().hasClass("custom-checkbox-danger")){

				$("#VERMELHO").text( Number($("#VERMELHO").text()) + 1 )

			}
			
		}
		
		// MOSTRA TÍTULO DA TABELA
		$(".tituloTabela").show()
		$(".PRODUTO_RM").show()
		
	}
	
}

// EXPORTAR A LISTA DE MATERIAIS PARA A PLANILHA EXCEL
function exportarLista() {
	
	console.log("Entrei para exportar a Lista de Materiais para o Excel")
	
	// MONTA A TABELA COM OS DADOS INSERIDOS NA LISTA DE MATERIAIS
	var strExcel = montarTabelaExportar()
	
	console.log("strExcel: ")
	console.log(strExcel)
	
	//window.open('data:application/vnd.ms-excel,' + strExcel);
	window.open('data:application/vnd.ms-excel,' + '\uFEFF' + encodeURIComponent(strExcel));
	
	/*setTimeout(function(){
		
		window.open('data:application/msword,' + '\uFEFF' + encodeURIComponent(strExcel));
		
	},500)*/
		
}

// MONTA A TABELA COM OS DADOS INSERIDOS NA LISTA DE MATERIAIS
function montarTabelaExportar(){
	
	var strExcel = "<table tablename='LISTA_MATERIAIS_SALVOS' class='table table-sm table-bordered table-layout-fixed' border='1' nodeletebutton='true' noaddbutton='true'> "+
                                                        
                        "<thead> "+
                            "<tr> "+
                                
                                "<th class='col-md-2 text-center'>Desenho</th> "+
                                "<th class='col-md-2 text-center'>Posição</th> "+
                                "<th class='col-md-2 text-center'>Quantidade</th> "+
                                "<th class='col-md-3 text-center'>Descrição</th> "+
                                "<th class='col-md-2 text-center'>Bitola(mm)</th> "+
                                "<th class='col-md-2 text-center'>Largura(mm)</th> "+
                                "<th class='col-md-2 text-center'>Comprimento(mm)</th> "+
                                "<th class='col-md-2 text-center'>Esp Rosca</th> "+
                                "<th class='col-md-5 text-center'>Material</th> "+
                                "<th class='col-md-2 text-center'>Peso Bruto(Kg)</th> "+
                                "<th class='col-md-2 text-center'>Origem1 de MP</th> "+
								"<th class='col-md-2 text-center'>Origem2 de MP</th> "+
								"<th class='col-md-2 text-center'>Qtd. Origem2 de MP</th> "+
								"<th class='col-md-2 text-center'>Qtd. Origem2 de MP</th> "+
								"<th class='col-md-2 text-center'>Peso. Origem1</th> "+
								"<th class='col-md-2 text-center'>Peso. Origem2</th> "+
                                "<th class='col-md-5 text-center'>Principal</th> "+
                                "<th class='col-md-5 text-center'>Substituto 1</th> "+
                                "<th class='col-md-5 text-center'>Substituto 2</th> "+
                                "<th class='col-md-5 text-center'>Substituto 3</th> "+
                                "<th class='col-md-5 text-center'>Substituto 4</th> "+
                                "<th class='col-md-5 text-center'>Substituto 5</th> "+
                                
                            "</tr> "+

                        "</thead> "+
                        
                        "<tbody> "
    
    
	// PERCORRE OS REGISTROS DA TABELA DA ABA SALVOS
	$("input[id^='NUMDESENHOSALVOS___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var numDesenho = $("#NUMDESENHOSALVOS___"+seq).val()
		var posicao = $("#POSICAOSALVOS___"+seq).val()
		var qtde = $("#QUANTIDADESALVOS___"+seq).val()
		var descricao = $("#DESCRICAOSALVOS___"+seq).val()
		var bitola = $("#BITOLASALVOS___"+seq).val()
		var largura = $("#LARGURASALVOS___"+seq).val()
		var comprimento = $("#COMPRIMENTOSALVOS___"+seq).val()
		var espRosca = $("#ESPROSCASALVOS___"+seq).val()
		var material = $("#MATERIALSALVOS___"+seq).val()
		var peso = $("#PESOBRUTOSALVOS___"+seq).val()
		var origemMp1 = $("#ORIGEMMP1SALVOS___"+seq).val()
		var origemMp2 = $("#ORIGEMMP2SALVOS___"+seq).val()
		var qtdorigemMp1 = $("#QTDORIGEM1SALVOS___"+seq).val()
		var qtdorigemMp2 = $("#QTDORIGEM2SALVOS___"+seq).val()
		var pesoorigemMp1 = $("#PESOORIGEM1SALVOS___"+seq).val()
		var pesoorigemMp2 = $("#PESOORIGEM2SALVOS___"+seq).val()
		var produtoRM1 = $("#PRODUTORM1SALVOS___"+seq).val()
		var produtoRM2 = $("#PRODUTORM2SALVOS___"+seq).val()
		var produtoRM3 = $("#PRODUTORM3SALVOS___"+seq).val()
		var produtoRM4 = $("#PRODUTORM4SALVOS___"+seq).val()
		var produtoRM5 = $("#PRODUTORM5SALVOS___"+seq).val()
		var produtoRM6 = $("#PRODUTORM6SALVOS___"+seq).val()
		
		strExcel = strExcel + "<tr> "+
    
			                    "<td> "+numDesenho+" "+"</td> "+
			
			                    "<td> "+posicao+" "+"</td> "+
			
			                    "<td> "+qtde+" "+"</td> "+
			
			                    "<td> "+descricao+" "+"</td> "+
			                    
			                    "<td> "+bitola+" "+"</td> "+
			                    
			                    "<td> "+largura+" "+"</td> "+
			                    
			                    "<td> "+comprimento+" "+"</td> "+
			                        
			                    "<td> "+espRosca+" "+"</td> "+
			                    
			                    "<td> "+material+" "+"</td> "+
			
			                    "<td> "+peso+" "+"</td> "+
			
			                    "<td> "+origemMp1+" "+"</td> "+

								"<td> "+origemMp2+" "+"</td> "+

								"<td> "+qtdorigemMp1+" "+"</td> "+

								"<td> "+qtdorigemMp2+" "+"</td> "+
								
								"<td> "+pesoorigemMp1+" "+"</td> "+

								"<td> "+pesoorigemMp2+" "+"</td> "+

			                    "<td> "+produtoRM1+" "+"</td> "+
			
			                    "<td> "+produtoRM2+" "+"</td> "+
			
			                    "<td> "+produtoRM3+" "+"</td> "+
			
			                    "<td> "+produtoRM4+" "+"</td> "+
			
			                    "<td> "+produtoRM5+" "+"</td> "+
			
			                    "<td> "+produtoRM6+" "+"</td> "+
			
			                "</tr> "
		
	})
	
	var somaComp = $("#SOMACOMPRIMENTOSALVOS___1").val()
	var somaPeso = $("#SOMAPESOSALVOS___1").val()
	var somaqtdorigem1 = $("#SOMAQTDORIGEM1SALVOS___1").val()
	var somaqtdorigem2 = $("#SOMAQTDORIGEM2SALVOS___1").val()
	var somapesoorigem1 = $("#SOMAPESOORIGEM1SALVOS___1").val()
	var somapesoorigem2 = $("#SOMAPESOORIGEM2SALVOS___1").val()
	
	strExcel = strExcel + "<tr> "+
    
			                    "<td></td> "+
			
			                    "<td></td> "+
			
			                    "<td></td> "+
			
			                    "<td></td> "+
			                    
			                    "<td></td> "+
			                    
			                    "<td></td> "+
			                    
			                    "<td> "+somaComp+" "+"</td> "+
			                        
			                    "<td></td> "+
			                    
			                    "<td></td> "+
			
			                    "<td> "+somaPeso+" "+"</td> "+
			
			                    "<td></td> "+

			                    "<td></td> "+

								"<td>"+somaqtdorigem1+" "+"</td> "+

								"<td>"+somaqtdorigem2+" "+"</td> "+

								"<td>"+somapesoorigem1+" "+"</td> "+

								"<td>"+somapesoorigem2+" "+"</td> "+

								"<td></td> "+

			                    "<td></td> "+

			                    "<td></td> "+

			                    "<td></td> "+

			                    "<td></td> "+

			                    "<td></td> "+

			
			                "</tr> "
	
	strExcel = strExcel+ "	</tbody> "+
    
    					"</table> "
	
	console.log("strExcel:")
	console.log(strExcel)
	
	return strExcel
	
}

// SE LISTA PODE SER EDITADA, OU SEJA, TEM UM PROCESSO DE CADASTRO OU DE EDIÇÃO ABERTA PARA A OS
function listaEditavel(){
	
	console.log("vou verificar se Lista de Materiais pode ser editável")
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsVerificaProcessosCadEdOS",null,constraints,null)
	
	var row = dataset.values
	
	// SE RETORNO É VAZIO OU NULO, NÃO DEVE PERMITIR EDIÇÃO DA LISTA
	if(row=="" || row==null || row==undefined){
		
		console.log("não há solicitações abertas do processo de cadastro e edição")
		
		return false
		
	}else{
		// SE NÃO, DEVE PERMITIR EDIÇÃO
		
		console.log("há solicitações abertas do processo de cadastro e edição")
		
		return true
		
	}
	
}

// PREENCHE OS MATERIAIS DAS ORDENS QUE FORAM RETRABALHADAS
function buscaMateraisRetrabalho(){
	
	var numOS = $("#NUM_OS").val()
		
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(c1)
	
	dataset = DatasetFactory.getDataset("dsBuscaMateriaisRetrabalhoOS",null,constraints,null)
	
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var count = dataset.values.length
		
		// PERCORRE TODOS OS REGISTROS ENCONTRADOS E PREENCHE A TABELA COM OS DADOS
		for(var i=0; i < count; i++){
			
			console.log("Estou no for indice "+i);
			var rep = row[i];
			ret = true
						
			// GUARDA OS DADOS EM VARIÁVEIS
			var posicaoDesenho = rep["POSICAODESENHO"]
			var numdesenho = rep["NUMDESENHO"]
			var totalQtde = rep["TOTALQTDE"]
			var descricao = rep["DESCRICAO"]
			var esprosca = rep["ESPROSCA"]
			var os = rep["OS"]
			var material = rep["MATERIAL"]
			
			var bitola = rep["BITOLA"]
			var largura = rep["LARGURA"]
			var comprimento = rep["COMPRIMENTO"]
			var pesoBruto = rep["PESOBRUTO"]
			var idCriacao = rep["IDCRIACAO"]
			
			var diamExt = rep["DIAMETROEXTERNODISCO"]
			var diamInt = rep["DIAMETROINTERNODISCO"]
			var obsGerais = rep["OBSGERAL"]
			
			console.log("posicao: "+posicaoDesenho+", descricao: "+descricao+", numdesenho: "+numdesenho+
					"quantidade: "+totalQtde+", bitola: "+bitola+", largura: "+largura+", esprosca: "+
					esprosca+", comprimento: "+comprimento+", material: "+material+", os: "+os+
					", peso: "+pesoBruto+", idCriacao: "+idCriacao+", diamExt: "+diamExt+", diamInt: "+diamInt+", obsGerais: "+obsGerais)
			
			var seq = childAdd()
			
			$("#POSICAO___"+seq).val(posicaoDesenho)
			$("#DESCRICAO___"+seq).val(descricao)
			$("#NUMDESENHO___"+seq).val(numdesenho)
			$("#ESPROSCA___"+seq).val(esprosca)
			$("#MATERIAL___"+seq).val(material)
			$("#OS___"+seq).val(os)
			$("#IDCRIACAO___"+seq).val(idCriacao)
			$("#OBSGERAIS___"+seq).val(obsGerais)
			
			// SE BITOLA NÃO É VÁLIDO
			if(!(bitola=="" || bitola==NaN || bitola=="NaN" || bitola==null || bitola=="null")){
				
				if(bitola.includes(",")){
					
					bitola = bitola.replace(",",".")
					
				}
				
				bitola = parseFloat(bitola)
				bitola = bitola.toFixed(2)
				
				bitola = bitola.toString().replace(".",",")

				$("#BITOLA___"+seq).val(bitola)
				
			}
			
			// SE DIAMETRO EXTERNO NÃO É VÁLIDO
			if(!(diamExt=="" || diamExt==NaN || diamExt=="NaN" || diamExt==null || diamExt=="null")){
				
				if(diamExt.includes(",")){
					
					diamExt = diamExt.replace(",",".")
					
				}
				
				diamExt = parseFloat(diamExt)
				diamExt = diamExt.toFixed(2)
				
				diamExt = diamExt.toString().replace(".",",")

				$("#DIAMEXT___"+seq).val(diamExt)
				
			}
			
			// SE DIAMETRO INTERNO NÃO É VÁLIDO
			if(!(diamInt=="" || diamInt==NaN || diamInt=="NaN" || diamInt==null || diamInt=="null")){
				
				if(diamInt.includes(",")){
					
					diamInt = diamInt.replace(",",".")
					
				}
				
				diamInt = parseFloat(diamInt)
				diamInt = diamInt.toFixed(2)
				
				diamInt = diamInt.toString().replace(".",",")

				$("#DIAMINT___"+seq).val(diamInt)
				
			}
			
			// SE LARGURA NÃO É VÁLIDO
			if(!(largura=="" || largura==NaN || largura=="NaN" || largura==null || largura=="null")){
				
				if(largura.includes(",")){
					
					largura = largura.replace(",",".")
					
				}
				
				largura = parseFloat(largura)
				largura = largura.toFixed(4)
				
				largura = largura.toString().replace(".",",")

				$("#LARGURA___"+seq).val(largura)
				
			}
			
			// SE COMPRIMENTO NÃO É VÁLIDO
			if(!(comprimento=="" || comprimento==NaN || comprimento=="NaN" || comprimento==null || comprimento=="null")){
				
				if(comprimento.includes(",")){
					
					comprimento = comprimento.replace(",",".")
					
				}

				comprimento = parseFloat(comprimento)
				comprimento = comprimento.toFixed(4)
				
				comprimento = comprimento.toString().replace(".",",")

				$("#COMPRIMENTO___"+seq).val(comprimento)
				
			}
			
			// SE PESOBRUTO NÃO É VÁLIDO
			if(!(pesoBruto=="" || pesoBruto==NaN || pesoBruto=="NaN" || pesoBruto==null || pesoBruto=="null")){

				if(pesoBruto.includes(",")){
					
					pesoBruto = pesoBruto.replace(",",".")
					
				}
				
				pesoBruto = parseFloat(pesoBruto)
				pesoBruto = pesoBruto.toFixed(4)
				
				pesoBruto = pesoBruto.toString().replace(".",",")
				
				$("#PESOBRUTO___"+seq).val(pesoBruto)
				
			}
			
			// SE TOTALQTDE NÃO É VALIDO
			if(!(totalQtde=="" || totalQtde==NaN || totalQtde=="NaN" || totalQtde==null || totalQtde=="null")){
				
				$("#QUANTIDADE___"+seq).val(totalQtde)
				
			}
			
			// VERIFICA SE O ID JÁ FOI SALVO
			if(temIdCriacao(idCriacao)){
			
				console.log("vou esconder LINHA___"+seq)
				
				$("#LINHA___"+seq).hide()
				$("#LINHA___"+seq).addClass("invisivel")
			
			}
			
		}
		
	}
	
}

// REPLICA A ORIGEM DA MP PARA TODAS AS LINHAS
function replicaOrigemMP(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var origem = $("#ORIGEMMP___"+seq).val()
	
	console.log("vou replicar origem: "+origem)
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("select[id^='ORIGEMMP___']").each(function(index,value){
		
		var seq2 = $(this).attr("id").split("___")[1]
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq2).hasClass("invisivel"))){
			
			$("#ORIGEMMP___"+seq2).val(origem)
			
		}
		
	})
	
}

// BUSCA TODOS OS MATERIAIS DA OS NA TABELA SALVOS
function buscaMateriaisSalvosOS(){
		
	var numOS = $("#NUM_OS").val()
	
	var ret = false
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("NUMOSSALVOS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	dataset = DatasetFactory.getDataset("dsBuscaMateriaisSalvos",null,constraints,null);
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("Valor de count "+row);
	
	// SE RESULTADO DA CONSULTA FOI VAZIO OU NULO
	if(row=="" || row==null || row==undefined || row=="null"){
		
	
		
	} else {
		
		// PERCORRE TODOS OS REGISTROS ENCONTRADOS E PREENCHE A TABELA COM OS DADOS
		for(var i=0; i < count; i++){
			
			//console.log("Entrei no for");
			var rep = row[i];
			ret = true
			
			//console.log("idML: "+idML)
				
			// GUARDA OS DADOS EM VARIÁVEIS
			var posicaoDesenho = rep["POSICAODESENHOSALVOS"]
			var numdesenho = rep["NUMDESENHOSALVOS"]
			var totalQtde = rep["TOTALQTDESALVOS"]
			var descricao = rep["DESCRICAOSALVOS"]
			var bitola = rep["BITOLASALVOS"]
			var largura = rep["LARGURASALVOS"]
			var comprimento = rep["COMPRIMENTOSALVOS"]
			var os = rep["NUM_OS_SALVOS"]
			var pesoBruto = rep["PESOBRUTOSALVOS"]
			var material = rep["MATERIALSALVOS"]
			var indice = rep["INDICESALVOS"]
			var espRosca = rep['ESPROSCASALVOS']
			var produtoRM = rep['PRODUTORMSALVOS']
			var idprd = rep['IDPRDSALVOS']
			var codigoPrd = rep['CODIGOPRDSALVOS']
			var idCriacao = rep['IDCRIACAOSALVOS']
			//var idML = rep['IDML_SALVOS']
			
			console.log("posicao: "+posicaoDesenho+", descricao: "+descricao+", numdesenho: "+numdesenho+
					"quantidade: "+totalQtde+", bitola: "+bitola+", largura: "+largura+", esprosca: "+
					espRosca+", comprimento: "+comprimento+", material: "+material+", os: "+os+
					", peso: "+pesoBruto+", indice: "+indice+", idCriacao: "+idCriacao+
					", produtoRM: "+produtoRM+", idCriacao: "+idCriacao+", codigoPrd: "+codigoPrd)
			
			var seq = childAdd3()
			
			$("#POSICAOSALVOS___"+seq).val(posicaoDesenho)
			$("#DESCRICAOSALVOS___"+seq).val(descricao)
			$("#NUMDESENHOSALVOS___"+seq).val(numdesenho)
			$("#QUANTIDADESALVOS___"+seq).val(totalQtde)
			$("#BITOLASALVOS___"+seq).val(bitola)
			$("#LARGURASALVOS___"+seq).val(largura)
			$("#ESPROSCASALVOS___"+seq).val(esprosca)
			$("#COMPRIMENTOSALVOS___"+seq).val(comprimento)
			$("#MATERIALSALVOS___"+seq).val(material)
			$("#OSSALVOS___"+seq).val(os)
			
			pesoBruto = parseFloat(pesoBruto)
			pesoBruto = pesoBruto.toFixed(4)
			
			$("#PESOBRUTOSALVOS___"+seq).val(pesoBruto)
			$("#IDCRIACAOSALVOS___"+seq).val(idCriacao)
			$("#CODIGOPRDSALVOS___"+seq).val(codigoPrd)
			$("#PRODUTORMSALVOS___"+seq).val(produtoRM)
			$("#IDPRDSALVOS___"+seq).val(idprd)
			
		}
		
		// MOSTRA TÍTULO DA TABELA
		$(".tituloTabela").show()
		$(".PRODUTO_RM").show()
		
	}
	
	return ret
			
}

// ATIVA O LOAD
function ativaSpinner() {
	
	$("#PANEL1").css("opacity","0.2")
	$("#loader").show();
	  
}

// DESATIVA O LOAD
function desativaSpinner() {
	
	setTimeout(function(){
		$("#PANEL1").css("opacity","1.0")
		$("#loader").hide();
	},1000)
	
}

//
/*function desativaSpinner(){

	console.log("vou desativar o load")
	
	setTimeout(function(){
		$(".loading-spinner").removeClass('active');
	},1000)
	
	// DESATIVA O LOAD	
    
	
}

//
function ativaSpinner(){

	console.log("vou ativar o load")
	// ATIVA O LOADING
	$(".loading-spinner").addClass('active');
	
}*/

// VERIFICA SE O IDCRIACAO JÁ FOI SALVO
function verificaId(idCriacao){
	
	var ret = true
	console.log("entrei para verificar idCriacao")
	
	// PERCORRE A TABELA DOS ITENS QUE FORAM SALVOS
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index, value){
		
		console.log("vou percorrer tabela de salvos")
		var seq = $(this).attr("id").split("___")[1]
		//var idMLSalvo = $("#IDML_SALVOS___"+seq).val()
		
		var idCriacaoSalvo = $("#IDCRIACAOSALVOS___"+seq).val()
		
		console.log("idCriacao: "+idCriacao+", idCriacaoSalvo: "+idCriacaoSalvo)
		
		// SE IDML JÁ FOI SALVO NA TABELA
		if(idCriacaoSalvo==idCriacao){
			
			ret = false
			
		}
		
	})
	
	console.log("id não está na tabela salvos? "+ret)
	return ret
	
}

// CONSTRÓI OS FILTROS DE ACORDO COM O PREENCHIMENTO
function constroiFiltros(){
	
	console.log("entrei para construir filtros")
	
	var numOS = $("#NUM_OS").val()
	var numDesenho = $("#NUMDESENHOINFO___1").val()
	var posicao = $("#POSICAOINFO___1").val()
	var totalQtde = $("#TOTALQTDEINFO___1").val()
	var descricao = $("#DESCRICAOINFO___1").val()
	var material = $("#MATERIALINFO___1").val()
	var bitola = $("#BITOLAINFO___1").val()
	var largura = $("#LARGURAINFO___1").val()
	var comprimento = $("#COMPRIMENTOINFO___1").val()
	var espRosca = $("#ESPROSCAINFO___1").val()
	var pesoBruto = $("#PESOBRUTOINFO___1").val()
	var diamExt = $("#DIAMEXTINFO___1").val()
	var diamInt = $("#DIAMINTINFO___1").val()
	
	console.log("numOS: "+numOS+", numDesenho: "+numDesenho+", posicao: "+posicao+", totalQtde: "+totalQtde+", descricao: "+descricao+", material: "+material+
			", bitola: "+bitola+", largura: "+largura+", comprimento: "+comprimento+", espRosca: "+espRosca+", pesoBruto: "+pesoBruto+", diamExt: "+diamExt+", diamInt: "+diamInt)
	
	/*var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("POSICAODESENHO",posicao,posicao,ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint("DESCRICAO",descricao,descricao,ConstraintType.MUST);
	var c6 = DatasetFactory.createConstraint("MATERIAL",material,material,ConstraintType.MUST);
	var c7 = DatasetFactory.createConstraint("BITOLA",bitola,bitola,ConstraintType.MUST);
	var c8 = DatasetFactory.createConstraint("LARGURA",largura,largura,ConstraintType.MUST);
	var c9 = DatasetFactory.createConstraint("COMPRIMENTO",comprimento,comprimento,ConstraintType.MUST);
	var c10 = DatasetFactory.createConstraint("ESPROSCA",espRosca,espRosca,ConstraintType.MUST);
	var c11 = DatasetFactory.createConstraint("PESOBRUTO",pesoBruto,pesoBruto,ConstraintType.MUST);
	
	var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11);
	
	var dataset1 = DatasetFactory.getDataset("dsFiltroDesenho",null,constraints,null);	
	var dataset2 = DatasetFactory.getDataset("dsFiltroPosicao",null,constraints,null);
	var dataset3 = DatasetFactory.getDataset("dsFiltroQuantidade",null,constraints,null);
	var dataset4 = DatasetFactory.getDataset("dsFiltroDescricao",null,constraints,null);	
	var dataset5 = DatasetFactory.getDataset("dsFiltroMaterial",null,constraints,null);	
	var dataset6 = DatasetFactory.getDataset("dsFiltroBitola",null,constraints,null);	
	var dataset7 = DatasetFactory.getDataset("dsFiltroLargura",null,constraints,null);	
	var dataset8 = DatasetFactory.getDataset("dsFiltroComprimento",null,constraints,null);	
	var dataset9 = DatasetFactory.getDataset("dsFiltroEspRosca",null,constraints,null);	
	var dataset10 = DatasetFactory.getDataset("dsFiltroPeso",null,constraints,null);*/	
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#NUMDESENHOINFO___1").val()=="" || $("#NUMDESENHOINFO___1").val()==null){
		
		//constroiSelectDesenho(dataset1)
		constroiSelectDesenho()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#POSICAOINFO___1").val()=="" || $("#POSICAOINFO___1").val()==null){
		
		constroiSelectPosicao()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#TOTALQTDEINFO___1").val()=="" || $("#TOTALQTDEINFO___1").val()==null){
		
		//constroiSelectQtde(dataset3)
		constroiSelectQtde()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#DESCRICAOINFO___1").val()=="" || $("#DESCRICAOINFO___1").val()==null){
	
		constroiSelectDescricao()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#MATERIALINFO___1").val()=="" || $("#MATERIALINFO___1").val()==null){
	
		//constroiSelectMaterial(dataset5)
		constroiSelectMaterial()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#BITOLAINFO___1").val()=="" || $("#BITOLAINFO___1").val()==null){
	
		//constroiSelectBitola(dataset6)
		constroiSelectBitola()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#LARGURAINFO___1").val()=="" || $("#LARGURAINFO___1").val()==null){
	
		//constroiSelectLargura(dataset7)
		constroiSelectLargura()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#COMPRIMENTOINFO___1").val()=="" || $("#COMPRIMENTOINFO___1").val()==null){
	
		//constroiSelectComprimento(dataset8)
		constroiSelectComprimento()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#ESPROSCAINFO___1").val()=="" || $("#ESPROSCAINFO___1").val()==null){
	
		//constroiSelectEspRosca(dataset9)
		constroiSelectEspRosca()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#PESOBRUTOINFO___1").val()==""  || $("#PESOBRUTOINFO___1").val()==null){
	
		//constroiSelectPeso(dataset10)
		constroiSelectPeso()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#DIAMEXTINFO___1").val()==""  || $("#DIAMEXTINFO___1").val()==null){
	
		//constroiSelectPeso(dataset10)
		constroiSelectDiamExt()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#DIAMINTINFO___1").val()==""  || $("#DIAMINTINFO___1").val()==null){
	
		//constroiSelectPeso(dataset10)
		constroiSelectDiamInt()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#ORIGEMMPINFO___1").val()=="" || $("#ORIGEMMPINFO___1").val()==null){
	
		//constroiSelectPeso(dataset10)
		constroiSelectOrigemMP()
	
	}
	
	console.log("terminei de construir filtros")
	
}

///////////////////////////////////////////////
// AQUI COMEÇAM OS FILTROS
//////////////////////////////////////////////

//CONSTRÓI O SELECT DO DESENHO DE ACORDO COM A TABELA
function constroiSelectDesenho(){
	
	console.log("vou construir select desenho")
	var arrayDesenho = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var numDesenho = $("#NUMDESENHO___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayDesenho.includes(numDesenho)) && !(numDesenho=="")){
				
				arrayDesenho.push(numDesenho)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayDesenho.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#NUMDESENHOINFO___1').append($("<option class='info'></option>").attr("value", arrayDesenho[i]).text(arrayDesenho[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO MATERIAL DE ACORDO COM A TABELA
function constroiSelectMaterial(){
	
	console.log("vou construir select material")
	var arrayMaterial = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var material = $("#MATERIAL___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE MATERIAL NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayMaterial.includes(material)) && !(material=="")){
				
				arrayMaterial.push(material)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayMaterial.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#MATERIALINFO___1').append($("<option class='info'></option>").attr("value", arrayMaterial[i]).text(arrayMaterial[i]));
		
	}
		
}

// CONSTRÓI O SELECT DA DESCRIÇÃO DE ACORDO COM A TABELA
function constroiSelectDescricao(){
	
	console.log("vou construir select descrição")
	var arrayDescricao = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var descricao = $("#DESCRICAO___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE DESCRIÇÃO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayDescricao.includes(descricao)) && !(descricao=="")){
				
				arrayDescricao.push(descricao)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayDescricao.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#DESCRICAOINFO___1').append($("<option class='info'></option>").attr("value", arrayDescricao[i]).text(arrayDescricao[i]));
		
	}
		
}

// CONSTRÓI O SELECT DA BITOLA DE ACORDO COM A TABELA
function constroiSelectBitola(){
	
	console.log("vou construir select bitola")
	var arrayBitola = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var bitola = $("#BITOLA___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE BITOLA NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayBitola.includes(bitola)) && !(bitola=="")){
				
				arrayBitola.push(bitola)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayBitola.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#BITOLAINFO___1').append($("<option class='info'></option>").attr("value", arrayBitola[i]).text(arrayBitola[i]));
		
	}
		
}

// CONSTRÓI O SELECT DA POSIÇÃO DE ACORDO COM A TABELA
function constroiSelectPosicao(){
	
	console.log("vou construir select posição")
	var arrayPosicao = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var posicao = $("#POSICAO___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
			
			// SE POSIÇÃO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayPosicao.includes(posicao)) && !(posicao=="")){
				
				arrayPosicao.push(posicao)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayPosicao.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#POSICAOINFO___1').append($("<option class='info'></option>").attr("value", arrayPosicao[i]).text(arrayPosicao[i]));
		
	}
		
}

// CONSTRÓI O SELECT DA QTDE DE ACORDO COM A TABELA
function constroiSelectQtde(){
	
	console.log("vou construir select qtde")
	var arrayQtde = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtde = $("#QUANTIDADE___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE QUANTIDADE NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayQtde.includes(qtde)) && !(qtde=="")){
				
				arrayQtde.push(qtde)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayQtde.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#TOTALQTDEINFO___1').append($("<option class='info'></option>").attr("value", arrayQtde[i]).text(arrayQtde[i]));
		
	}
		
}

// CONSTRÓI O SELECT DA LARGURA DE ACORDO COM A TABELA
function constroiSelectLargura(){
	
	console.log("vou construir select largura")
	var arrayLargura = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var largura = $("#LARGURA___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE LARGURA NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayLargura.includes(largura)) && !(largura=="")){
				
				arrayLargura.push(largura)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayLargura.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#LARGURAINFO___1').append($("<option class='info'></option>").attr("value", arrayLargura[i]).text(arrayLargura[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO COMPRIMENTO DE ACORDO COM A TABELA
function constroiSelectComprimento(){
	
	console.log("vou construir select comprimento")
	var arrayComprimento = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var comprimento = $("#COMPRIMENTO___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE COMPRIMENTO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayComprimento.includes(comprimento)) && !(comprimento=="")){
				
				arrayComprimento.push(comprimento)
				
			}
		
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayComprimento.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#COMPRIMENTOINFO___1').append($("<option class='info'></option>").attr("value", arrayComprimento[i]).text(arrayComprimento[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO ESPROSCA DE ACORDO COM A TABELA
function constroiSelectEspRosca(){
	
	console.log("vou construir select esprosca")
	var arrayEsprosca = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var espRosca = $("#ESPROSCA___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE ESPROSCA NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayEsprosca.includes(espRosca)) && !(espRosca=="")){
				
				arrayEsprosca.push(espRosca)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayEsprosca.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#ESPROSCAINFO___1').append($("<option class='info'></option>").attr("value", arrayEsprosca[i]).text(arrayEsprosca[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO PESOBRUTO DE ACORDO COM A TABELA
function constroiSelectPeso(){
	
	console.log("vou construir select peso")
	var arrayPesos = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var peso = $("#PESOBRUTO___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE PESO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayPesos.includes(peso)) && !(peso=="")){
				
				arrayPesos.push(peso)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayPesos.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PESOBRUTOINFO___1').append($("<option class='info'></option>").attr("value", arrayPesos[i]).text(arrayPesos[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO DIAMETRO EXTERNO DE ACORDO COM A TABELA
function constroiSelectDiamExt(){
	
	console.log("vou construir select diametro externo")
	var arrayDiamExt = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var diamExt = $("#DIAMEXT___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE PESO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayDiamExt.includes(diamExt)) && !(diamExt=="")){
				
				arrayDiamExt.push(diamExt)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayDiamExt.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#DIAMEXTINFO___1').append($("<option class='info'></option>").attr("value", arrayDiamExt[i]).text(arrayDiamExt[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO DIAMETRO INETRNO DE ACORDO COM A TABELA
function constroiSelectDiamInt(){
	
	console.log("vou construir select diametro interno")
	var arrayDiamInt = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var diamInt = $("#DIAMINT___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE PESO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayDiamInt.includes(diamInt)) && !(diamInt=="")){
				
				arrayDiamInt.push(diamInt)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayDiamInt.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#DIAMINTINFO___1').append($("<option class='info'></option>").attr("value", arrayDiamInt[i]).text(arrayDiamInt[i]));
		
	}
		
}

// CONSTRÓI O SELECT DA ORIGEMMP DE ACORDO COM A TABELA
function constroiSelectOrigemMP(){
	
	console.log("vou construir select origemMP")
	var arrayOrigemMP = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var origemMP = $("#ORIGEMMP___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE PESO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayOrigemMP.includes(origemMP)) && !(origemMP=="")){
				
				arrayOrigemMP.push(origemMP)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOrigemMP.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#ORIGEMMPINFO___1').append($("<option class='info'></option>").attr("value", arrayOrigemMP[i]).text(arrayOrigemMP[i]));
		
	}
	
}

// ATUALIZA OS FILTROS
function atualizaFiltros(){
	
	var antigo = $("#ORIGEMMPINFO___1").val()
	$('#ORIGEMMPINFO___1').children('option:not(:first)').remove();
	
	constroiSelectOrigemMP()

	if(!(antigo=="")){
		
		$("#ORIGEMMPINFO___1").val(antigo)
		
	}
	
	carregaLista()
	
}

function atualizaSelectOrigem(op,obj){


	var seq = $(obj).attr("id").split("___")[1]

	$("#ORIGEMMP"+op+"SALVOS___"+seq).val( $("#SELECTORIGEMMP"+op+"SALVOS___"+seq).val() )

}

// CONSTRÓI O SELECT DO PRODUTORM DE ACORDO COM A TABELA
/*function constroiSelectProdutoRM(){
	
	console.log("vou construir select produtoRM")
	var arrayProdutoRM = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var produtoRM = $("#PRODUTORM___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayProdutoRM.includes(produtoRM)) && !(produtoRM=="")){
				
				arrayProdutoRM.push(produtoRM)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayProdutoRM.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PRODUTORMINFO___1').append($("<option class='info'></option>").attr("value", arrayProdutoRM[i]).text(arrayProdutoRM[i]));
		
	}
		
}*/

///////////////////////////////////////////
// TERMINA OS FILTROS
//////////////////////////////////////////


// CONSTRÓI OS FILTROS DE ACORDO COM O PREENCHIMENTO
function constroiFiltrosSalvos(){
	
	console.log("entrei para construir filtros")
	
	var numOS = $("#NUM_OS").val()
	var pedidoCompra = $("#PEDIDOCOMPRAINFOSALVOS___1").val()
	var lote = $("#LOTEINFOSALVOS___1").val()
	var numDesenho = $("#NUMDESENHOINFOSALVOS___1").val()
	var posicao = $("#POSICAOINFOSALVOS___1").val()
	var totalQtde = $("#TOTALQTDEINFOSALVOS___1").val()
	var descricao = $("#DESCRICAOINFOSALVOS___1").val()
	var material = $("#MATERIALINFOSALVOS___1").val()
	var bitola = $("#BITOLAINFOSALVOS___1").val()
	var largura = $("#LARGURAINFOSALVOS___1").val()
	var comprimento = $("#COMPRIMENTOINFOSALVOS___1").val()
	var espRosca = $("#ESPROSCAINFOSALVOS___1").val()
	var massaLinear = $("#MASSALINEARINFOSALVOS___1").val()
	var pesoBruto = $("#PESOBRUTOINFOSALVOS___1").val()
	var diamExt = $("#DIAMEXTSALVOS___1").val()
	var diamInt = $("#DIAMINTSALVOS___1").val()
	var origemMP1 = $("#ORIGEMMP1INFOSALVOS___1").val()
	var origemMP2 = $("#ORIGEMMP2INFOSALVOS___1").val()
	var qtdMP1 = $("#QTDORIGEM1INFOSALVOS___1").val()
	var qtdMP2 = $("#QTDORIGEM2INFOSALVOS___1").val()
	var pesoMP1 = $("#PESOORIGEM1INFOSALVOS___1").val()
	var pesoMP2 = $("#PESOORIGEM2INFOSALVOS___1").val()
	var produtoRM1 = $("#PRODUTORM1INFOSALVOS___1").val()
	var produtoRM2 = $("#PRODUTORM2INFOSALVOS___1").val()
	var produtoRM3 = $("#PRODUTORM3INFOSALVOS___1").val()
	var produtoRM4 = $("#PRODUTORM4INFOSALVOS___1").val()
	var produtoRM5 = $("#PRODUTORM5INFOSALVOS___1").val()
	var produtoRM6 = $("#PRODUTORM6INFOSALVOS___1").val()
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#PEDIDOCOMPRAINFOSALVOS___1").val()==""){
		
		constroiSelectPedidoCompra()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#LOTEINFOSALVOS___1").val()==""){
		
		constroiSelectLote()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#NUMDESENHOINFOSALVOS___1").val()==""){
		
		constroiSelectDesenhoSalvos()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#POSICAOINFOSALVOS___1").val()==""){
		
		constroiSelectPosicaoSalvos()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#TOTALQTDEINFOSALVOS___1").val()==""){
		
		constroiSelectQtdeSalvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#DESCRICAOINFOSALVOS___1").val()==""){
	
		constroiSelectDescricaoSalvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#MATERIALINFOSALVOS___1").val()==""){
	
		constroiSelectMaterialSalvos()
		
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#MASSALINEARINFOSALVOS___1").val()==""){

		constroiSelectMassaLinear()
		
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#PESOLIQUIDOINFOSALVOS___1").val()==""){
	
		constroiSelectPesoLiquido()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#BITOLAINFOSALVOS___1").val()==""){
	
		constroiSelectBitolaSalvos()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#LARGURAINFOSALVOS___1").val()==""){
	
		constroiSelectLarguraSalvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#COMPRIMENTOINFOSALVOS___1").val()==""){
	
		constroiSelectComprimentoSalvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#ESPROSCAINFOSALVOS___1").val()==""){
	
		constroiSelectEspRoscaSalvos()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#PESOBRUTOINFOSALVOS___1").val()==""){
	
		constroiSelectPesoSalvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#DIAMEXTINFOSALVOS___1").val()==""){
	
		constroiSelectDiamExtSalvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#DIAMINTINFOSALVOS___1").val()==""){
	
		constroiSelectDiamIntSalvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#ORIGEMMP1INFOSALVOS___1").val()==""){
	
		constroiSelectOrigemMP1Salvos()
		
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#ORIGEMMP2INFOSALVOS___1").val()==""){

		constroiSelectOrigemMP2Salvos()
		
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#QTDORIGEM1INFOSALVOS___1").val()==""){

		constroiSelectQtsPos1Salvos()
		
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#QTDORIGEM2INFOSALVOS___1").val()==""){

		constroiSelectQtsPos2Salvos()
		
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#PESOORIGEM1INFOSALVOS___1").val()==""){

		constroiSelectQtsPos1Salvos()
		
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#PESOORIGEM2INFOSALVOS___1").val()==""){

		constroiSelectQtsPos2Salvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#PRODUTORM1INFOSALVOS___1").val()==""){
	
		constroiSelectProdutoRM1Salvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#PRODUTORM2INFOSALVOS___1").val()==""){
	
		constroiSelectProdutoRM2Salvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#PRODUTORM3INFOSALVOS___1").val()==""){
	
		constroiSelectProdutoRM3Salvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#PRODUTORM4INFOSALVOS___1").val()==""){
	
		constroiSelectProdutoRM4Salvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#PRODUTORM5INFOSALVOS___1").val()==""){
	
		constroiSelectProdutoRM5Salvos()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#PRODUTORM6INFOSALVOS___1").val()==""){
	
		constroiSelectProdutoRM6Salvos()
		
	}
	
	console.log("terminei de construir filtros")
	
}

// CARREGA A LISTA DE ACORDO COM OS FILTROS PREENCHIDOS
function carregaLista(){
	
	console.log("entrei para carregar lista")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHO___']").each(function (){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var numOS = $("#NUM_OS").val()
		var numDesenho = $("#NUMDESENHOINFO___1").val()
		var posicaoDesenho = $("#POSICAOINFO___1").val()
		var totalQtde = $("#TOTALQTDEINFO___1").val()
		var descricao = $("#DESCRICAOINFO___1").val()
		var material = $("#MATERIALINFO___1").val()
		var bitola = $("#BITOLAINFO___1").val()
		var largura = $("#LARGURAINFO___1").val()
		var comprimento = $("#COMPRIMENTOINFO___1").val()
		var espRosca = $("#ESPROSCAINFO___1").val()
		var pesoBruto = $("#PESOBRUTOINFO___1").val()
		var diamExt = $("#DIAMEXTINFO___1").val()
		var diamInt = $("#DIAMINTINFO___1").val()
		//var produtoRM = $("#PRODUTORMINFO___1").val()
		var origemMP = $("#ORIGEMMPINFO___1").val()
		
		console.log("numOS: "+numOS+", numDesenho: "+numDesenho+", posicaoDesenho: "+posicaoDesenho+", totalQtde: "+
				totalQtde+", descrição: "+descricao+", material: "+material+", bitola: "+bitola+", largura: "+
				largura+", comprimento: "+comprimento+", esprosca: "+espRosca+", peso: "+pesoBruto+", origemMP: "+origemMP+", diamExt: "+diamExt+", diamInt: "+diamInt)
		
		var numDesenhoLista = $("#NUMDESENHO___"+seq).val()
		var posicaoDesenhoLista = $("#POSICAO___"+seq).val()
		var totalQtdeLista = $("#QUANTIDADE___"+seq).val()
		var descricaoLista = $("#DESCRICAO___"+seq).val()
		var materialLista = $("#MATERIAL___"+seq).val()
		var bitolaLista = $("#BITOLA___"+seq).val()
		var larguraLista = $("#LARGURA___"+seq).val()
		var comprimentoLista = $("#COMPRIMENTO___"+seq).val()
		var espRoscaLista = $("#ESPROSCA___"+seq).val()
		var pesoBrutoLista = $("#PESOBRUTO___"+seq).val()
		var diamExtLista = $("#DIAMEXT___"+seq).val()
		var diamIntLista = $("#DIAMINT___"+seq).val()
		//var produtoRMLista = $("#PRODUTORM___"+seq).val()
		var origemMPLista = $("#ORIGEMMP___"+seq).val()
		var idCriacao = $("#IDCRIACAO___"+seq).val()
	
		console.log("numOS: "+numOS+", numDesenhoLista: "+numDesenhoLista+", posicaoDesenhoLista: "+posicaoDesenhoLista+
				", totalQtdeLista: "+totalQtdeLista+", descriçãoLista: "+descricaoLista+", materialLista: "+
				materialLista+", bitolaLista: "+bitolaLista+", larguraLista: "+larguraLista+
				", comprimentoLista: "+comprimentoLista+", espRoscaLista: "+espRoscaLista+", pesoBrutoLista: "+
				pesoBrutoLista+", origemMPLista: "+origemMPLista+", idCriacao: "+idCriacao+", diamExtLista: "+diamExtLista+", diamIntLista: "+diamIntLista)
	
		if(numDesenho=="" || numDesenho==null){
			console.log("filtro numDesenho esta vazio. Numdesenho: "+numDesenho+" vai receber "+numDesenhoLista)
			numDesenho = numDesenhoLista
			console.log("numDesenho agora é "+numDesenho)
		}
		if(posicaoDesenho=="" || posicaoDesenho==null){
			console.log("filtro posicao esta vazio. PosicaoDesenho: "+posicaoDesenho+" vai receber "+posicaoDesenhoLista)
			posicaoDesenho = posicaoDesenhoLista
			console.log("posicaoDesenho agora é "+posicaoDesenho)
		}
		if(totalQtde=="" || totalQtde==null){  
			console.log("filtro totaQtde esta vazio")
			totalQtde = totalQtdeLista
		}
		if(descricao=="" || descricao==null){
			console.log("filtro descricao esta vazio")
			descricao = descricaoLista
		}
		if(material=="" || material==null){
			console.log("filtro material esta vazio")
			material = materialLista
		}
		if(bitola=="" || bitola==null){
			console.log("filtro bitola esta vazio")
			bitola = bitolaLista
		}
		if(largura=="" || largura==null){
			console.log("filtro largura esta vazio")
			largura = larguraLista
		}
		if(comprimento=="" || comprimento==null){
			console.log("filtro comprimento esta vazio")
			comprimento = comprimentoLista
		}
		if(espRosca=="" || espRosca==null){
			console.log("filtro espRosca esta vazio")
			espRosca = espRoscaLista
		}
		if(pesoBruto=="" || pesoBruto==null){
			console.log("filtro pesoBruto esta vazio")
			pesoBruto = pesoBrutoLista
		}
		if(diamExt=="" || diamExt==null){
			console.log("filtro diamExt esta vazio")
			diamExt = diamExtLista
		}
		if(diamInt=="" || diamInt==null){
			console.log("filtro diamInt esta vazio")
			diamInt = diamIntLista
		}
		/*if(produtoRM=="" || produtoRM==null){
			console.log("filtro produtoRM esta vazio")
			produtoRM = produtoRMLista
		}*/
		if(origemMP=="" || origemMP==null){
			console.log("filtro origemMP esta vazio")
			origemMP = origemMPLista
		}
		
		// IDCRIACAO ESTÁ NA TABELA SALVOS
		if(temIdCriacao(idCriacao)){
			
			console.log("vou esconder LINHA___"+seq)
			
			$("#LINHA___"+seq).hide()
			$("#LINHA___"+seq).addClass("invisivel")
			
		} else {
			
			// SE FILTROS NÃO COINCIDE COM TODOS OS CAMPOS DO ITEM
			if(!(numDesenho==numDesenhoLista && posicaoDesenho==posicaoDesenhoLista && totalQtde==totalQtdeLista &&
					descricao==descricaoLista && material==materialLista && bitola==bitolaLista && 
					largura==larguraLista && comprimento==comprimentoLista && espRosca==espRoscaLista &&
					pesoBruto==pesoBrutoLista && origemMP==origemMPLista && diamExt==diamExtLista && diamInt==diamIntLista)){
				
				console.log("vou esconder LINHA___"+seq)
				
				$("#LINHA___"+seq).hide()
				$("#LINHA___"+seq).addClass("invisivel")
				
			} else {
				
				console.log("vou exibir LINHA___"+seq)
				
				$("#LINHA___"+seq).show()
				$("#LINHA___"+seq).removeClass("invisivel")
				
			}
			
		}
		
	})
	
	// CALCULA O TOTAL DO COMPRIMENTO E DO PESO
	calculaComprimento(0)
	calculaPeso(0)
	
	console.log("terminei de carregar lista")
	
	/*console.log("entrei para carregar lista")
	
	var numOS = $("#NUM_OS").val()
	var numDesenho = $("#NUMDESENHOINFO___1").val()
	var posicaoDesenho = $("#POSICAOINFO___1").val()
	var totalQtde = $("#TOTALQTDEINFO___1").val()
	var descricao = $("#DESCRICAOINFO___1").val()
	var material = $("#MATERIALINFO___1").val()
	var bitola = $("#BITOLAINFO___1").val()
	var largura = $("#LARGURAINFO___1").val()
	var comprimento = $("#COMPRIMENTOINFO___1").val()
	var espRosca = $("#ESPROSCAINFO___1").val()
	var pesoBruto = $("#PESOBRUTOINFO___1").val()
	var origemMP = $("#ORIGEMMPINFO___1").val()
	
	console.log("numOS: "+numOS+", numDesenho: "+numDesenho+", posicaoDesenho: "+posicaoDesenho+", totalQtde: "+totalQtde+", descrição: "+descricao+", material: "
			+material+", bitola: "+bitola+", largura: "+largura+", comprimento: "+comprimento+", esprosca: "+espRosca+", peso: "+pesoBruto)
	
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("POSICAODESENHO",posicaoDesenho,posicaoDesenho,ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint("DESCRICAO",descricao,descricao,ConstraintType.MUST);
	var c6 = DatasetFactory.createConstraint("MATERIAL",material,material,ConstraintType.MUST);
	var c7 = DatasetFactory.createConstraint("BITOLA",bitola,bitola,ConstraintType.MUST);
	var c8 = DatasetFactory.createConstraint("LARGURA",largura,largura,ConstraintType.MUST);
	var c9 = DatasetFactory.createConstraint("COMPRIMENTO",comprimento,comprimento,ConstraintType.MUST);
	var c10 = DatasetFactory.createConstraint("ESPROSCA",espRosca,espRosca,ConstraintType.MUST);
	var c11 = DatasetFactory.createConstraint("PESOBRUTO",pesoBruto,pesoBruto,ConstraintType.MUST);
	
	var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11);
	
	dataset = DatasetFactory.getDataset("dsMateriaisTabela",null,constraints,null);
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("Valor de count "+row);
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS E PREENCHE A TABELA COM OS DADOS
	for(var i=0; i < count; i++){
	
		console.log("Entrei no for");
		var rep = row[i];
		
		//var idML = rep["ID"]
		var idCriacao = rep['IDCRIACAO']
		
		// VERIFICA SE O ID JÁ FOI SALVO
		if(verificaId(idCriacao)){
		//if(verificaId(idML)){
			
			// GUARDA OS DADOS EM VARIÁVEIS
			var posicaoDesenho = rep["POSICAODESENHO"]
			var numdesenho = rep["NUMDESENHO"]
			var totalQtde = rep["TOTALQTDE"]
			var descricao = rep["DESCRICAO"]
			var bitola = rep["BITOLA"]
			var largura = rep["LARGURA"]
			var esprosca = rep["ESPROSCA"]
			var comprimento = rep["COMPRIMENTO"]
			var os = rep["OS"]
			var pesoBruto = rep["PESOBRUTO"]
			var material = rep["MATERIAL"]
			//var indice = rep["INDICE"]
			
			var seq = childAdd()
			
			$("#POSICAO___"+seq).val(posicaoDesenho)
			$("#DESCRICAO___"+seq).val(descricao)
			$("#NUMDESENHO___"+seq).val(numdesenho)
			$("#BITOLA___"+seq).val(bitola)
			$("#LARGURA___"+seq).val(largura)
			$("#ESPROSCA___"+seq).val(esprosca)
			$("#COMPRIMENTO___"+seq).val(comprimento)
			$("#MATERIAL___"+seq).val(material)
			$("#IDCRIACAO___"+seq).val(idCriacao)
			
			// SE PESOBRUTO É INVÁLIDO
			if(!(pesoBruto=="" || pesoBruto=="NaN" || pesoBruto==NaN || pesoBruto==null)){
				
				pesoBruto = parseFloat(pesoBruto)
				pesoBruto = pesoBruto.toFixed(4)
				$("#PESOBRUTO___"+seq).val(pesoBruto)
				
			}
			
			// SE TOTALQTDE É INVÁLIDO
			if(!(totalQtde=="" || totalQtde=="NaN" || totalQtde==NaN || totalQtde==null)){
				
				$("#QUANTIDADE___"+seq).val(totalQtde)
				
			}
			
		}
		
	}
	
	// CALCULA O TOTA DO COMPRIMENTO E DO PESO
	calculaComprimento(0)
	calculaPeso(0)
	
	console.log("terminei de carregar lista")*/

}

// CARREGA A LISTA DE ACORDO COM OS FILTROS PREENCHIDOS DA TABELA SALVOS
function carregaListaSalvos(){
	
	console.log("entrei para carregar lista SALVOS")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var numOS = $("#NUM_OS").val()
		var pedidoCompra = $("#PEDIDOCOMPRAINFOSALVOS___1").val()
		var lote = $("#LOTEINFOSALVOS___1").val()
		var numDesenho = $("#NUMDESENHOINFOSALVOS___1").val()
		var posicaoDesenho = $("#POSICAOINFOSALVOS___1").val()
		var totalQtde = $("#TOTALQTDEINFOSALVOS___1").val()
		var descricao = $("#DESCRICAOINFOSALVOS___1").val()
		var material = $("#MATERIALINFOSALVOS___1").val()
		var bitola = $("#BITOLAINFOSALVOS___1").val()
		var largura = $("#LARGURAINFOSALVOS___1").val()
		var comprimento = $("#COMPRIMENTOINFOSALVOS___1").val()
		var espRosca = $("#ESPROSCAINFOSALVOS___1").val()
		var pesoBruto = $("#PESOBRUTOINFOSALVOS___1").val()
		var diamExt = $("#DIAMEXTINFOSALVOS___1").val()
		var diamInt = $("#DIAMINTINFOSALVOS___1").val()
		var origemMP1 = $("#ORIGEMMP1INFOSALVOS___1").val()
		var origemMP2 = $("#ORIGEMMP2INFOSALVOS___1").val()
		var qtdPosMP1 = $("#QTDORIGEM1INFOSALVOS___1").val()
		var qtdPosMP2 = $("#QTDORIGEM2INFOSALVOS___1").val()
		var pesoPosMP1 = $("#PESOORIGEM1INFOSALVOS___1").val()
		var pesoPosMP2 = $("#PESOORIGEM2INFOSALVOS___1").val()
		var produtoRM1 = $("#PRODUTORM1INFOSALVOS___1").val()
		var produtoRM2 = $("#PRODUTORM2INFOSALVOS___1").val()
		var produtoRM3 = $("#PRODUTORM3INFOSALVOS___1").val()
		var produtoRM4 = $("#PRODUTORM4INFOSALVOS___1").val()
		var produtoRM5 = $("#PRODUTORM5INFOSALVOS___1").val()
		var produtoRM6 = $("#PRODUTORM6INFOSALVOS___1").val()
		var pesoliquido = $("#PESOLIQUIDOINFOSALVOS___1").val()
		var massalinear = $("#MASSALINEARINFOSALVOS___1").val()
		
		console.log("numOS: "+numOS+", numDesenho: "+numDesenho+", posicaoDesenho: "+posicaoDesenho+", totalQtde: "+
				totalQtde+", descrição: "+descricao+", material: "+material+", bitola: "+bitola+", largura: "+
				largura+", comprimento: "+comprimento+", esprosca: "+espRosca+", peso: "+pesoBruto+", produtoRM1: "+
				produtoRM1+", produtoRM2: "+produtoRM2+", produtoRM3: "+produtoRM3+", produtoRM4: "+produtoRM4+
				", produtoRM5: "+produtoRM5+", produtoRM6: "+produtoRM6+", origemMP1: "+origemMP1+", origemMP2: "+origemMP2+", pedidoCompra: "+pedidoCompra+", lote: "+lote+", diamExt: "+diamExt+", diamInt: "+diamInt+", QTDORIGEM1: "+qtdPosMP1+", QTDORIGEM2: "+qtdPosMP2)
		
		var pedidoCompraSalvos = $("#PEDIDOCOMPRASALVOS___"+seq).val()
		var loteSalvos = $("#LOTESALVOS___"+seq).val()
		var numDesenhoSalvos = $("#NUMDESENHOSALVOS___"+seq).val()
		var posicaoDesenhoSalvos = $("#POSICAOSALVOS___"+seq).val()
		var totalQtdeSalvos = $("#QUANTIDADESALVOS___"+seq).val()
		var descricaoSalvos = $("#DESCRICAOSALVOS___"+seq).val()
		var materialSalvos = $("#MATERIALSALVOS___"+seq).val()
		var bitolaSalvos = $("#BITOLASALVOS___"+seq).val()
		var larguraSalvos = $("#LARGURASALVOS___"+seq).val()
		var comprimentoSalvos = $("#COMPRIMENTOSALVOS___"+seq).val()
		var espRoscaSalvos = $("#ESPROSCASALVOS___"+seq).val()
		var pesoBrutoSalvos = $("#PESOBRUTOSALVOS___"+seq).val()
		var diamExtSalvos = $("#DIAMEXTSALVOS___"+seq).val()
		var diamIntSalvos = $("#DIAMINTSALVOS___"+seq).val()
		var origemMPSalvos1 = $("#ORIGEMMP1SALVOS___"+seq).val()
		var origemMPSalvos2 = $("#ORIGEMMP2SALVOS___"+seq).val()
		var QtdPosSalvos1 = $("#QTDORIGEM1SALVOS___"+seq).val()
		var QtdPosSalvos2 = $("#QTDORIGEM2SALVOS___"+seq).val()
		var PesoPosSalvos1 = $("#PESOORIGEM1SALVOS___"+seq).val()
		var PesoPosSalvos2 = $("#PESOORIGEM2SALVOS___"+seq).val()
		var produtoRM1Salvos = $("#PRODUTORM1SALVOS___"+seq).val()
		var produtoRM2Salvos = $("#PRODUTORM2SALVOS___"+seq).val()
		var produtoRM3Salvos = $("#PRODUTORM3SALVOS___"+seq).val()
		var produtoRM4Salvos = $("#PRODUTORM4SALVOS___"+seq).val()
		var produtoRM5Salvos = $("#PRODUTORM5SALVOS___"+seq).val()
		var produtoRM6Salvos = $("#PRODUTORM6SALVOS___"+seq).val()
		var pesoliquidoSalvos = $("#PESOLIQUIDOSALVOS___"+seq).val()
		var massalinearSalvos = $("#MASSALINEARSALVOS___"+seq).val()
	
		console.log("numOS: "+numOS+", numDesenhoSalvos: "+numDesenhoSalvos+", posicaoDesenhoSalvos: "+posicaoDesenhoSalvos+
				", totalQtdeSalvos: "+totalQtdeSalvos+", descriçãoSalvos: "+descricaoSalvos+", materialSalvos: "+
				materialSalvos+", bitolaSalvos: "+bitolaSalvos+", larguraSalvos: "+larguraSalvos+
				", comprimentoSalvos: "+comprimentoSalvos+", espRoscaSalvos: "+espRoscaSalvos+", pesoBrutoSalvos: "+
				pesoBrutoSalvos+", produtoRM1Salvos: "+produtoRM1Salvos+", produtoRM2Salvos: "+produtoRM2Salvos+
				", produtoRM3Salvos: "+produtoRM3Salvos+", produtoRM4Salvos: "+produtoRM4Salvos+", produtoRM5Salvos: "+produtoRM5Salvos+
				", produtoRM6Salvos: "+produtoRM6Salvos+", origemMPSalvos1: "+origemMPSalvos1+", origemMPSalvos2: "+origemMPSalvos2+
				", pedidoCompraSalvos: "+pedidoCompraSalvos+", loteSalvos: "+loteSalvos+", diamExtSalvos: "+diamExtSalvos+", diamIntSalvos: "+diamIntSalvos+
				", QtdPosSalvos1: "+QtdPosSalvos1+", QtdPosSalvos2: "+QtdPosSalvos2)
	
		if(pedidoCompra=="" || pedidoCompra==null){
			console.log("filtro numDesenho esta vazio. Numdesenho: "+pedidoCompra+" vai receber "+pedidoCompraSalvos)
			pedidoCompra = pedidoCompraSalvos
			console.log("numDesenho agora é "+pedidoCompra)
		}
		if(lote=="" || lote==null){
			console.log("filtro numDesenho esta vazio. Numdesenho: "+lote+" vai receber "+loteSalvos)
			lote = loteSalvos
			console.log("numDesenho agora é "+lote)
		}
		if(numDesenho=="" || numDesenho==null){
			console.log("filtro numDesenho esta vazio. Numdesenho: "+numDesenho+" vai receber "+numDesenhoSalvos)
			numDesenho = numDesenhoSalvos
			console.log("numDesenho agora é "+numDesenho)
		}
		if(posicaoDesenho=="" || posicaoDesenho==null){
			console.log("filtro posicao esta vazio. PosicaoDesenho: "+posicaoDesenho+" vai receber "+posicaoDesenhoSalvos)
			posicaoDesenho = posicaoDesenhoSalvos
			console.log("posicaoDesenho agora é "+posicaoDesenho)
		}
		if(totalQtde=="" || totalQtde==null){  
			console.log("filtro totaQtde esta vazio")
			totalQtde = totalQtdeSalvos
		}
		if(descricao=="" || descricao==null){
			console.log("filtro descricao esta vazio")
			descricao = descricaoSalvos
		}
		if(material=="" || material==null){
			console.log("filtro material esta vazio")
			material = materialSalvos
		}
		if(bitola=="" || bitola==null){
			console.log("filtro bitola esta vazio")
			bitola = bitolaSalvos
		}
		if(largura=="" || largura==null){
			console.log("filtro largura esta vazio")
			largura = larguraSalvos
		}
		if(comprimento=="" || comprimento==null){
			console.log("filtro comprimento esta vazio")
			comprimento = comprimentoSalvos
		}
		if(pesoliquido=="" || pesoliquido==null){
			console.log("filtro comprimento esta vazio")
			pesoliquido = pesoliquidoSalvos
		}
		if(massalinear=="" || massalinear==null){
			console.log("filtro comprimento esta vazio")
			massalinear = massalinearSalvos
		}
		if(espRosca=="" || espRosca==null){
			console.log("filtro espRosca esta vazio")
			espRosca = espRoscaSalvos
		}
		if(pesoBruto=="" || pesoBruto==null){
			console.log("filtro pesoBruto esta vazio")
			pesoBruto = pesoBrutoSalvos
		}
		if(produtoRM1=="" || produtoRM1==null){
			console.log("filtro produtoRM1 esta vazio")
			produtoRM1 = produtoRM1Salvos
		}
		if(produtoRM2=="" || produtoRM2==null){
			console.log("filtro produtoRM2 esta vazio")
			produtoRM2 = produtoRM2Salvos
		}
		if(produtoRM3=="" || produtoRM3==null){
			console.log("filtro produtoRM3 esta vazio")
			produtoRM3 = produtoRM3Salvos
		}
		if(produtoRM4=="" || produtoRM4==null){
			console.log("filtro produtoRM4 esta vazio")
			produtoRM4 = produtoRM4Salvos
		}
		if(produtoRM5=="" || produtoRM5==null){
			console.log("filtro produtoRM5 esta vazio")
			produtoRM5 = produtoRM5Salvos
		}
		if(produtoRM6=="" || produtoRM6==null){
			console.log("filtro produtoRM6 esta vazio")
			produtoRM6 = produtoRM6Salvos
		}
		if(origemMP1=="" || origemMP1==null){
			console.log("filtro origemMP1 esta vazio")
			origemMP1 = origemMPSalvos1
		}
		if(origemMP2=="" || origemMP2==null){
			console.log("filtro origemMP2 esta vazio")
			origemMP2 = origemMPSalvos2
		}
		if(qtdPosMP1=="" || qtdPosMP1==null){
			console.log("filtro QtdPosMP1 esta vazio")
			qtdPosMP1 = QtdPosSalvos1
		}
		if(qtdPosMP2=="" || qtdPosMP2==null){
			console.log("filtro QtdPosMP2 esta vazio")
			qtdPosMP2 = QtdPosSalvos2
		}
		if(pesoPosMP1=="" || pesoPosMP1==null){
			console.log("filtro pesoPosMP1 esta vazio")
			pesoPosMP1 = PesoPosSalvos1
		}
		if(pesoPosMP2=="" || pesoPosMP2==null){
			console.log("filtro pesoPosMP2 esta vazio")
			pesoPosMP2 = PesoPosSalvos2
		}
		if(diamExt=="" || diamExt==null){
			console.log("filtro diamExt esta vazio")
			diamExt = diamExtSalvos
		}
		if(diamInt=="" || diamInt==null){
			console.log("filtro diamInt esta vazio")
			diamInt = diamIntSalvos
		}
		
		// SE FILTROS NÃO COINCIDE COM TODOS OS CAMPOS DO ITEM
		if(!(pedidoCompra==pedidoCompraSalvos && lote==loteSalvos && numDesenho==numDesenhoSalvos && posicaoDesenho==posicaoDesenhoSalvos && totalQtde==totalQtdeSalvos &&
				descricao==descricaoSalvos && material==materialSalvos && bitola==bitolaSalvos && 
				largura==larguraSalvos && comprimento==comprimentoSalvos && espRosca==espRoscaSalvos &&
				pesoBruto==pesoBrutoSalvos && origemMP1==origemMPSalvos1 && origemMP2==origemMPSalvos2 && produtoRM1==produtoRM1Salvos && produtoRM2==produtoRM2Salvos
				&& produtoRM3==produtoRM3Salvos && produtoRM4==produtoRM4Salvos && produtoRM5==produtoRM5Salvos && produtoRM6==produtoRM6Salvos && diamExt==diamExtSalvos && diamInt==diamIntSalvos
				&& qtdPosMP1==QtdPosSalvos1 && qtdPosMP2==QtdPosSalvos2 && pesoPosMP1==PesoPosSalvos1 && pesoPosMP2==PesoPosSalvos2 && pesoliquido==pesoliquidoSalvos && massalinear==massalinearSalvos )){
			
			console.log("vou esconder LINHA_SALVOS___"+seq)
			
			$("#LINHASALVOS___"+seq).hide()
			$("#LINHASALVOS___"+seq).addClass("invisivel")
			
		} else {
			
			console.log("vou exibir LINHA_SALVOS___"+seq)
			$("#LINHASALVOS___"+seq).show()
			$("#LINHASALVOS___"+seq).removeClass("invisivel")
			
		}
		
	})
	
	// CALCULA O TOTAL DO COMPRIMENTO E DO PESO
	calculaComprimento(1)
	calculaPeso(1)
	calculaQtdOrigem1()
	calculaQtdOrigem2()
	calculaPesoLiquido()
	
	console.log("terminei de carregar lista SALVOS")

}

// CONSTRÓI O SELECT GERAL DO NUMDESENHO DE ACORDO COM A CONSULTA NO BANCO
/*function constroiSelectDesenho(dataset){
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("vou construir select desenho")
	console.log("Valor de count "+row);
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS E PREENCHE A TABELA COM OS DADOS
	for(var i=0; i < count; i++){
	
		console.log("Entrei no for");
		var rep = row[i];
		var option = rep['NUMDESENHO']
		
		// SE AINDA TEM DESENHO NA TABELA DA LISTA DE MATERIAIS
		if(temDesenho(option,0)){
			
			// GUARDA OS DADOS EM VARIÁVEIS
			 $('#NUMDESENHOINFO___1').append($("<option class='info'></option>").attr("value", option).text(option));
			
		}
		
	}
	
}*/

// CONSTRÓI O SELECT DO DESENHO DE ACORDO COM A TABELA SALVOS
function constroiSelectDesenhoSalvos(){
	
	console.log("vou construir select desenho SALVOS")
	var arrayDesenho = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var numDesenho = $("#NUMDESENHOSALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayDesenho.includes(numDesenho))){
				
				arrayDesenho.push(numDesenho)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayDesenho.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#NUMDESENHOINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayDesenho[i]).text(arrayDesenho[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO PEDIDO DE COMPRA DE ACORDO COM A TABELA SALVOS
function constroiSelectPedidoCompra(){
	
	console.log("vou construir select pedido compra SALVOS")
	var arrayPedidoCompra = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var pedidoCompra = $("#PEDIDOCOMPRASALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PEDIDO DE COMPRA NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayPedidoCompra.includes(pedidoCompra))){
				
				arrayPedidoCompra.push(pedidoCompra)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayPedidoCompra.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PEDIDOCOMPRAINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayPedidoCompra[i]).text(arrayPedidoCompra[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO LOTE DE ACORDO COM A TABELA SALVOS
function constroiSelectLote(){
	
	console.log("vou construir select lote SALVOS")
	var arrayLote = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var lote = $("#LOTESALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PEDIDO DE COMPRA NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayLote.includes(lote))){
				
				arrayLote.push(lote)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayLote.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#LOTEINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayLote[i]).text(arrayLote[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO PRODUTORM DE ACORDO COM A TABELA SALVOS
/*function constroiSelectProdutoRMSalvos(){
	
	console.log("vou construir select produtoRM SALVOS")
	var arrayProdutoRM = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var produtoRM = $("#PRODUTORMSALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayProdutoRM.includes(produtoRM))){
				
				arrayProdutoRM.push(produtoRM)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayProdutoRM.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PRODUTORMINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayProdutoRM[i]).text(arrayProdutoRM[i]));
		
	}
		
}

// CONSTRÓI O SELECT GERAL DA POSIÇÃO DE ACORDO COM A CONSULTA NO BANCO
function constroiSelectPosicao(dataset){
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("vou construir select posição SALVOS")
	console.log("Valor de count "+row);
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS
	for(var i=0; i < count; i++){
	
		console.log("Entrei no for");
		var rep = row[i];
		var option = rep['POSICAODESENHO']
		
		// SE AINDA TEM POSICAO NA TABELA DA LISTA DE MATERIAIS
		if(temPosicao(option,0)){
		
			// PREENCHE O SELECT COM OS DADOS
			$('#POSICAOINFO___1').append($("<option class='info'></option>").attr("value", option).text(option));
		
		}
		
	}
	
}*/

// CONSTRÓI O SELECT DA POSIÇÃO DE ACORDO COM A TABELA SALVOS
function constroiSelectPosicaoSalvos(){
	
	console.log("vou construir select posição SALVOS")
	var arrayPosicao = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var posicao = $("#POSICAOSALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
			
			// SE POSIÇÃO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayPosicao.includes(posicao))){
				
				arrayPosicao.push(posicao)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayPosicao.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#POSICAOINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayPosicao[i]).text(arrayPosicao[i]));
		
	}
		
}

// CONSTRÓI O SELECT GERAL DA TOTALQTDE DE ACORDO COM A CONSULTA NO BANCO
/*function constroiSelectQtde(dataset){
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("vou construir select qtde")
	console.log("Valor de count "+row);
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS
	for(var i=0; i < count; i++){
	
		console.log("Entrei no for");
		var rep = row[i];
		var option = rep['TOTALQTDE']
		//var idML = rep["ID"]
		
		// SE AINDA TEM TOTALQTDE NA TABELA DA LISTA DE MATERIAIS
		if(temQtde(option,0)){
		
			// PREENCHE O SELECT COM OS DADOS
			$('#TOTALQTDEINFO___1').append($("<option class='info'></option>").attr("value", option).text(option));
			
		}
				
	}
	
}*/

// CONSTRÓI O SELECT DA QTDE DE ACORDO COM A TABELA SALVOS
function constroiSelectQtdeSalvos(){
	
	console.log("vou construir select qtde SALVOS")
	var arrayQtde = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtde = $("#QUANTIDADESALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE QUANTIDADE NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayQtde.includes(qtde))){
				
				arrayQtde.push(qtde)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayQtde.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#TOTALQTDEINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayQtde[i]).text(arrayQtde[i]));
		
	}
		
}

// CONSTRÓI O SELECT GERAL DA DESCRIÇÃO DE ACORDO COM A CONSULTA NO BANCO
/*function constroiSelectDescricao(dataset){
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("vou construir select descrição")
	console.log("Valor de count "+row);
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS
	for(var i=0; i < count; i++){
	
		console.log("Entrei no for");
		var rep = row[i];
		var option = rep['DESCRICAO']
		//var idML = rep["ID"]
		
		// SE AINDA TEM TOTALQTDE NA TABELA DA LISTA DE MATERIAIS
		if(temDescricao(option,0)){
		
			 // PREENCHE O SELECT COM OS DADOS
			 $('#DESCRICAOINFO___1').append($("<option class='info'></option>").attr("value", option).text(option));
			
		}
		
	}
	
}*/

// CONSTRÓI O SELECT DA DESCRIÇÃO DE ACORDO COM A TABELA SALVOS
function constroiSelectDescricaoSalvos(){
	
	console.log("vou construir select descrição SALVOS")
	var arrayDescricao = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var descricao = $("#DESCRICAOSALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE DESCRIÇÃO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayDescricao.includes(descricao))){
				
				arrayDescricao.push(descricao)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayDescricao.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#DESCRICAOINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayDescricao[i]).text(arrayDescricao[i]));
		
	}
		
}

// CONSTRÓI O SELECT GERAL DO MATERIAL DE ACORDO COM A CONSULTA NO BANCO
/*function constroiSelectMaterial(dataset){
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("vou construir select material")
	console.log("Valor de count "+row);
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS
	for(var i=0; i < count; i++){
	
		console.log("Entrei no for");
		var rep = row[i];
		var option = rep['MATERIAL']
		//var idML = rep["ID"]
		
		// SE AINDA TEM MATERIAL NA TABELA DA LISTA DE MATERIAIS
		if(temMaterial(option,0)){
		
			// PREENCHE O SELECT COM OS DADOS
			$('#MATERIALINFO___1').append($("<option class='info'></option>").attr("value", option).text(option));
		
		}
		
	}
	
}*/

// CONSTRÓI O SELECT DO MATERIAL DE ACORDO COM A TABELA SALVOS
function constroiSelectMaterialSalvos(){
	
	console.log("vou construir select material SALVOS")
	var arrayMaterial = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var material = $("#MATERIALSALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE MATERIAL NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayMaterial.includes(material))){
				
				arrayMaterial.push(material)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayMaterial.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#MATERIALINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayMaterial[i]).text(arrayMaterial[i]));
		
	}
		
}

// CONSTRÓI O SELECT GERAL DA BITOLA DE ACORDO COM A CONSULTA NO BANCO
/*function constroiSelectBitola(dataset){
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("vou construir select bitola")
	console.log("Valor de count "+row);
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS
	for(var i=0; i < count; i++){
	
		console.log("Entrei no for");
		var rep = row[i];
		var option = rep['BITOLA']
		//var idML = rep["ID"]
		
		// SE AINDA TEM BITOLA NA TABELA DA LISTA DE MATERIAIS
		if(temBitola(option,0)){
		
			// PREENCHE O SELECT COM OS DADOS
			$('#BITOLAINFO___1').append($("<option class='info'></option>").attr("value", option).text(option));
			
		}
		
	}
	
}*/

// CONSTRÓI O SELECT DA BITOLA DE ACORDO COM A TABELA SALVOS
function constroiSelectBitolaSalvos(){
	
	console.log("vou construir select bitola SALVOS")
	var arrayBitola = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var bitola = $("#BITOLASALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE BITOLA NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayBitola.includes(bitola))){
				
				arrayBitola.push(bitola)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayBitola.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#BITOLAINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayBitola[i]).text(arrayBitola[i]));
		
	}
		
}

// CONSTRÓI O SELECT GERAL DA LARGURA DE ACORDO COM A CONSULTA NO BANCO
/*function constroiSelectLargura(dataset){
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("vou construir select largura")
	console.log("Valor de count "+row);
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS
	for(var i=0; i < count; i++){
	
		console.log("Entrei no for");
		var rep = row[i];
		var option = rep['LARGURA']
		//var idML = rep["ID"]
		
		// SE AINDA TEM LARGURA NA TABELA DA LISTA DE MATERIAIS
		if(temLargura(option,0)){
		
			// PREENCHE O SELECT COM OS DADOS
			$('#LARGURAINFO___1').append($("<option class='info'></option>").attr("value", option).text(option));
		
		}
		
	}
	
}*/

// CONSTRÓI O SELECT DA LARGURA DE ACORDO COM A TABELA SALVOS
function constroiSelectLarguraSalvos(){
	
	console.log("vou construir select largura SALVOS")
	var arrayLargura = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var largura = $("#LARGURASALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE LARGURA NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayLargura.includes(largura))){
				
				arrayLargura.push(largura)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayLargura.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#LARGURAINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayLargura[i]).text(arrayLargura[i]));
		
	}
		
}

// CONSTRÓI O SELECT GERAL DO COMPRIMENTO DE ACORDO COM A CONSULTA NO BANCO
/*function constroiSelectComprimento(dataset){
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("vou construir select comprimento")
	console.log("Valor de count "+row);
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS
	for(var i=0; i < count; i++){
	
		console.log("Entrei no for");
		var rep = row[i];
		var option = rep['COMPRIMENTO']
		//var idML = rep["ID"]
		
		// SE AINDA TEM COMPRIMENTO NA TABELA DA LISTA DE MATERIAIS
		if(temComprimento(option,0)){
		
			// PREENCHE O SELECT COM OS DADOS
			$('#COMPRIMENTOINFO___1').append($("<option class='info'></option>").attr("value", option).text(option));
			
		}
		
	}
	
}*/

// CONSTRÓI O SELECT DO COMPRIMENTO DE ACORDO COM A TABELA SALVOS
function constroiSelectComprimentoSalvos(){
	
	console.log("vou construir select comprimento SALVOS")
	var arrayComprimento = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var comprimento = $("#COMPRIMENTOSALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE COMPRIMENTO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayComprimento.includes(comprimento))){
				
				arrayComprimento.push(comprimento)
				
			}
		
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayComprimento.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#COMPRIMENTOINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayComprimento[i]).text(arrayComprimento[i]));
		
	}
		
}

// CONSTRÓI O SELECT GERAL DA ESPROSCA DE ACORDO COM A CONSULTA NO BANCO
/*function constroiSelectEspRosca(dataset){
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("vou construir select esprosca")
	console.log("Valor de count "+row);
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS
	for(var i=0; i < count; i++){
	
		console.log("Entrei no for");
		var rep = row[i];
		var option = rep['ESPROSCA']
		//var idML = rep["ID"]
		
		// SE AINDA TEM ESPROSCA NA TABELA DA LISTA DE MATERIAIS
		if(temEspRosca(option,0)){
		
			// PREENCHE O SELECT COM OS DADOS
			$('#ESPROSCAINFO___1').append($("<option class='info'></option>").attr("value", option).text(option));
			
		}
		
	}
	
}*/

// CONSTRÓI O SELECT DO ESPROSCA DE ACORDO COM A TABELA SALVOS
function constroiSelectEspRoscaSalvos(){
	
	console.log("vou construir select esprosca SALVOS")
	var arrayEsprosca = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var espRosca = $("#ESPROSCASALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE ESPROSCA NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayEsprosca.includes(espRosca))){
				
				arrayEsprosca.push(espRosca)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayEsprosca.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#ESPROSCAINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayEsprosca[i]).text(arrayEsprosca[i]));
		
	}
		
}

// CONSTRÓI O SELECT GERAL DO PESOBRUTO DE ACORDO COM A CONSULTA NO BANCO
/*function constroiSelectPeso(dataset){
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("vou construir select peso")
	console.log("Valor de count "+row);
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS
	for(var i=0; i < count; i++){
	
		console.log("Entrei no for");
		var rep = row[i];
		var option = rep['PESOBRUTO']
		option = parseFloat(option)
		option = option.toFixed(4)
		
		//var idML = rep["ID"]
		
		// SE AINDA TEM PESOBRUTO NA TABELA DA LISTA DE MATERIAIS
		if(temPeso(option,0)){
		
			// PREENCHE O SELECT COM OS DADOS
			$('#PESOBRUTOINFO___1').append($("<option class='info'></option>").attr("value", option).text(option));
			
		}
		
	}
	
}*/

// CONSTRÓI O SELECT DO PESOBRUTO DE ACORDO COM A TABELA SALVOS
function constroiSelectPesoSalvos(){
	
	console.log("vou construir select peso SALVOS")
	var arrayPesos = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var peso = $("#PESOBRUTOSALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PESO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayPesos.includes(peso))){
				
				arrayPesos.push(peso)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayPesos.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PESOBRUTOINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayPesos[i]).text(arrayPesos[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO DIAMETRO EXTERNO DE ACORDO COM A TABELA SALVOS
function constroiSelectDiamExtSalvos(){
	
	console.log("vou construir select diametro externo SALVOS")
	var arrayDiamExt = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var diamExt = $("#DIAMEXTSALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PESO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayDiamExt.includes(diamExt))){
				
				arrayDiamExt.push(diamExt)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayDiamExt.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#DIAMEXTINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayDiamExt[i]).text(arrayDiamExt[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO DIAMETRO INTERNO DE ACORDO COM A TABELA SALVOS
function constroiSelectDiamIntSalvos(){
	
	console.log("vou construir select diametro interno SALVOS")
	var arrayDiamInt = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var diamInt = $("#DIAMINTSALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PESO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayDiamInt.includes(diamInt))){
				
				arrayDiamInt.push(diamInt)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayDiamInt.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#DIAMINTINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayDiamInt[i]).text(arrayDiamInt[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO PRODUTORM1 DE ACORDO COM A TABELA SALVOS
function constroiSelectProdutoRM1Salvos(){
	
	console.log("vou construir select produtoRM1")
	var arrayProdutoRM = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var produtoRM = $("#PRODUTORM1SALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayProdutoRM.includes(produtoRM)) && !(produtoRM=="")){
				
				arrayProdutoRM.push(produtoRM)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayProdutoRM.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PRODUTORM1INFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayProdutoRM[i]).text(arrayProdutoRM[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO PRODUTORM2 DE ACORDO COM A TABELA SALVOS
function constroiSelectProdutoRM2Salvos(){
	
	console.log("vou construir select produtoRM2")
	var arrayProdutoRM = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var produtoRM = $("#PRODUTORM2SALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayProdutoRM.includes(produtoRM)) && !(produtoRM=="")){
				
				arrayProdutoRM.push(produtoRM)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayProdutoRM.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PRODUTORM2INFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayProdutoRM[i]).text(arrayProdutoRM[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO PRODUTORM3 DE ACORDO COM A TABELA SALVOS
function constroiSelectProdutoRM3Salvos(){
	
	console.log("vou construir select produtoRM3")
	var arrayProdutoRM = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var produtoRM = $("#PRODUTORM3SALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayProdutoRM.includes(produtoRM)) && !(produtoRM=="")){
				
				arrayProdutoRM.push(produtoRM)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayProdutoRM.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PRODUTORM3INFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayProdutoRM[i]).text(arrayProdutoRM[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO PRODUTORM4 DE ACORDO COM A TABELA SALVOS
function constroiSelectProdutoRM4Salvos(){
	
	console.log("vou construir select produtoRM4")
	var arrayProdutoRM = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var produtoRM = $("#PRODUTORM4SALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayProdutoRM.includes(produtoRM)) && !(produtoRM=="")){
				
				arrayProdutoRM.push(produtoRM)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayProdutoRM.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PRODUTORM4INFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayProdutoRM[i]).text(arrayProdutoRM[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO PRODUTORM5 DE ACORDO COM A TABELA SALVOS
function constroiSelectProdutoRM5Salvos(){
	
	console.log("vou construir select produtoRM5")
	var arrayProdutoRM = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var produtoRM = $("#PRODUTORM5SALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayProdutoRM.includes(produtoRM)) && !(produtoRM=="")){
				
				arrayProdutoRM.push(produtoRM)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayProdutoRM.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PRODUTORM5INFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayProdutoRM[i]).text(arrayProdutoRM[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO PRODUTORM5 DE ACORDO COM A TABELA SALVOS
function constroiSelectPesoLiquido(){
	
	console.log("vou construir select peso liquido")
	var arrayProdutoRM = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var produtoRM = $("#PESOLIQUIDOSALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayProdutoRM.includes(produtoRM)) && !(produtoRM=="")){
				
				arrayProdutoRM.push(produtoRM)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayProdutoRM.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PESOLIQUIDOINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayProdutoRM[i]).text(arrayProdutoRM[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO PRODUTORM5 DE ACORDO COM A TABELA SALVOS
function constroiSelectMassaLinear(){
	
	console.log("vou construir select massa linear")
	var arrayProdutoRM = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var produtoRM = $("#MASSALINEARSALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayProdutoRM.includes(produtoRM)) && !(produtoRM=="")){
				
				arrayProdutoRM.push(produtoRM)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayProdutoRM.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#MASSALINEARINFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayProdutoRM[i]).text(arrayProdutoRM[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO PRODUTORM6 DE ACORDO COM A TABELA SALVOS
function constroiSelectProdutoRM6Salvos(){
	
	console.log("vou construir select produtoRM6")
	var arrayProdutoRM = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var produtoRM = $("#PRODUTORM6SALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayProdutoRM.includes(produtoRM)) && !(produtoRM=="")){
				
				arrayProdutoRM.push(produtoRM)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayProdutoRM.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PRODUTORM6INFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayProdutoRM[i]).text(arrayProdutoRM[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO ORIGEMMP DE ACORDO COM A TABELA SALVOS
function constroiSelectOrigemMP1Salvos(){
	
	console.log("vou construir select origemMP")
	var arrayOrigemMP = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var origemMP = $("#ORIGEMMP1SALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayOrigemMP.includes(origemMP)) && !(origemMP=="")){
				
				arrayOrigemMP.push(origemMP)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOrigemMP.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#ORIGEMMP1INFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayOrigemMP[i]).text(arrayOrigemMP[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO ORIGEMMP DE ACORDO COM A TABELA SALVOS
function constroiSelectOrigemMP2Salvos(){
	
	console.log("vou construir select origemMP")
	var arrayOrigemMP = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var origemMP = $("#ORIGEMMP2SALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayOrigemMP.includes(origemMP)) && !(origemMP=="")){
				
				arrayOrigemMP.push(origemMP)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOrigemMP.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#ORIGEMMP2INFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayOrigemMP[i]).text(arrayOrigemMP[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO ORIGEMMP DE ACORDO COM A TABELA SALVOS
function constroiSelectQtsPos1Salvos(){
	
	console.log("vou construir select origemMP")
	var arrayOrigemMP = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtdposicao = $("#QTDORIGEM1SALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayOrigemMP.includes(qtdposicao)) && !(qtdposicao=="")){
				
				arrayOrigemMP.push(qtdposicao)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOrigemMP.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#QTDORIGEM1INFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayOrigemMP[i]).text(arrayOrigemMP[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO ORIGEMMP DE ACORDO COM A TABELA SALVOS
function constroiSelectQtsPos2Salvos(){
	
	console.log("vou construir select origemMP")
	var arrayOrigemMP = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtdposicao = $("#QTDORIGEM2SALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayOrigemMP.includes(qtdposicao)) && !(qtdposicao=="")){
				
				arrayOrigemMP.push(qtdposicao)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOrigemMP.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#QTDORIGEM2INFOSALVOS___1').append($("<option class='info'></option>").attr("value", arrayOrigemMP[i]).text(arrayOrigemMP[i]));
		
	}
		
}


// CONSTRÓI O SELECT DO ORIGEMMP DE ACORDO COM A TABELA SALVOS
function constroiSelectQtsPeso1Salvos(){
	
	console.log("vou construir select origemMP")
	var arrayOrigemMP = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtdposicao = $("#PESOORIGEM1SALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayOrigemMP.includes(qtdposicao)) && !(qtdposicao=="")){
				
				arrayOrigemMP.push(qtdposicao)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOrigemMP.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PESOORIGEM1INFOSALVOS___').append($("<option class='info'></option>").attr("value", arrayOrigemMP[i]).text(arrayOrigemMP[i]));
		
	}
		
}

// CONSTRÓI O SELECT DO ORIGEMMP DE ACORDO COM A TABELA SALVOS
function constroiSelectQtsPeso2Salvos(){
	
	console.log("vou construir select origemMP")
	var arrayOrigemMP = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtdposicao = $("#PESOORIGEM2SALVOS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
		
			// SE PRODUTORM NÃO ESTÁ CONTIDO NO ARRAY E N SALVA
			if(!(arrayOrigemMP.includes(qtdposicao)) && !(qtdposicao=="")){
				
				arrayOrigemMP.push(qtdposicao)
				
			}
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOrigemMP.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#PESOORIGEM2INFOSALVOS___').append($("<option class='info'></option>").attr("value", arrayOrigemMP[i]).text(arrayOrigemMP[i]));
		
	}
		
}

// RECONSTRÓI TODOS OS FILTROS
function reconstroiFiltros(){
		
	// ATIVA SPINNER
	ativaSpinner()
	
	// TIMEOUT PARA EXECUÇÃO DA FUNÇÃO
	setTimeout(function (){
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#NUMDESENHOINFO___1").val()=="" || $("#NUMDESENHOINFO___1").val()==null){
			
			$('#NUMDESENHOINFO___1').children('option:not(:first)').remove();
			$("#NUMDESENHOINFO___1").css("border-color","#d1d3d4")
			$("#NUMDESENHOINFO___1").css("background-color","#fff")
			
		} else {
			
			$("#NUMDESENHOINFO___1").css("border-color","#b92113")
			$("#NUMDESENHOINFO___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#POSICAOINFO___1").val()=="" || $("#POSICAOINFO___1").val()==null){
			
			$('#POSICAOINFO___1').children('option:not(:first)').remove();
			$("#POSICAOINFO___1").css("border-color","#d1d3d4")
			$("#POSICAOINFO___1").css("background-color","#fff")

		} else {
			
			$("#POSICAOINFO___1").css("border-color","#b92113")
			$("#POSICAOINFO___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#TOTALQTDEINFO___1").val()=="" || $("#TOTALQTDEINFO___1").val()==null){
			
			$('#TOTALQTDEINFO___1').children('option:not(:first)').remove();
			$("#TOTALQTDEINFO___1").css("border-color","#d1d3d4")
			$("#TOTALQTDEINFO___1").css("background-color","#fff")
			
		} else {
			
			$("#TOTALQTDEINFO___1").css("border-color","#b92113")
			$("#TOTALQTDEINFO___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#DESCRICAOINFO___1").val()=="" || $("#DESCRICAOINFO___1").val()==null){
			
			$('#DESCRICAOINFO___1').children('option:not(:first)').remove();
			$("#DESCRICAOINFO___1").css("border-color","#d1d3d4")
			$("#DESCRICAOINFO___1").css("background-color","#fff")
			
		} else {
			
			$("#DESCRICAOINFO___1").css("border-color","#b92113")
			$("#DESCRICAOINFO___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#MATERIALINFO___1").val()=="" || $("#MATERIALINFO___1").val()==null){
			
			$('#MATERIALINFO___1').children('option:not(:first)').remove();
			$("#MATERIALINFO___1").css("border-color","#d1d3d4")
			$("#MATERIALINFO___1").css("background-color","#fff")
			
		} else {
			
			$("#MATERIALINFO___1").css("border-color","#b92113")
			$("#MATERIALINFO___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#BITOLAINFO___1").val()=="" || $("#BITOLAINFO___1").val()==null){
			
			$('#BITOLAINFO___1').children('option:not(:first)').remove();
			$("#BITOLAINFO___1").css("border-color","#d1d3d4")
			$("#BITOLAINFO___1").css("background-color","#fff")
			
		} else {
			
			$("#BITOLAINFO___1").css("border-color","#b92113")
			$("#BITOLAINFO___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#LARGURAINFO___1").val()=="" || $("#LARGURAINFO___1").val()==null){
		
			$('#LARGURAINFO___1').children('option:not(:first)').remove();
			$("#LARGURAINFO___1").css("border-color","#d1d3d4")
			$("#LARGURAINFO___1").css("background-color","#fff")

		} else {
			
			$("#LARGURAINFO___1").css("border-color","#b92113")
			$("#LARGURAINFO___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#COMPRIMENTOINFO___1").val()=="" || $("#COMPRIMENTOINFO___1").val()==null){
			
			$('#COMPRIMENTOINFO___1').children('option:not(:first)').remove();
			$("#COMPRIMENTOINFO___1").css("border-color","#d1d3d4")
			$("#COMPRIMENTOINFO___1").css("background-color","#fff")
			
		} else {
			
			$("#COMPRIMENTOINFO___1").css("border-color","#b92113")
			$("#COMPRIMENTOINFO___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#ESPROSCAINFO___1").val()=="" || $("#ESPROSCAINFO___1").val()==null){
			
			$('#ESPROSCAINFO___1').children('option:not(:first)').remove();
			$("#ESPROSCAINFO___1").css("border-color","#d1d3d4")
			$("#ESPROSCAINFO___1").css("background-color","#fff")
			
		} else {
			
			$("#ESPROSCAINFO___1").css("border-color","#b92113")
			$("#ESPROSCAINFO___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#PESOBRUTOINFO___1").val()=="" || $("#PESOBRUTOINFO___1").val()==null){
			
			$('#PESOBRUTOINFO___1').children('option:not(:first)').remove();
			$("#PESOBRUTOINFO___1").css("border-color","#d1d3d4")
			$("#PESOBRUTOINFO___1").css("background-color","#fff")
				
		} else {
			
			$("#PESOBRUTOINFO___1").css("border-color","#b92113")
			$("#PESOBRUTOINFO___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#DIAMEXTINFO___1").val()=="" || $("#DIAMEXTINFO___1").val()==null){
			
			$('#DIAMEXTINFO___1').children('option:not(:first)').remove();
			$("#DIAMEXTINFO___1").css("border-color","#d1d3d4")
			$("#DIAMEXTINFO___1").css("background-color","#fff")
				
		} else {
			
			$("#DIAMEXTINFO___1").css("border-color","#b92113")
			$("#DIAMEXTINFO___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#DIAMINTINFO___1").val()=="" || $("#DIAMINTINFO___1").val()==null){
			
			$('#DIAMINTINFO___1').children('option:not(:first)').remove();
			$("#DIAMINTINFO___1").css("border-color","#d1d3d4")
			$("#DIAMINTINFO___1").css("background-color","#fff")
				
		} else {
			
			$("#DIAMINTINFO___1").css("border-color","#b92113")
			$("#DIAMINTINFO___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#ORIGEMMPINFO___1").val()=="" || $("#ORIGEMMPINFO___1").val()==null){
			
			$('#ORIGEMMPINFO___1').children('option:not(:first)').remove();
			$("#ORIGEMMPINFO___1").css("border-color","#d1d3d4")
			$("#ORIGEMMPINFO___1").css("background-color","#fff")
				
		} else {
			
			$("#ORIGEMMPINFO___1").css("border-color","#b92113")
			$("#ORIGEMMPINFO___1").css("background-color","#f2dede")

		}
		
		// APAGA A LISTA ATUAL
		//apagaLista()
		
		// CARREGA UMA NOVA LISTA
		carregaLista()
		
		// CONSTRÓI OS FILTROS
		constroiFiltros()
		
	},1000)
		
	// DESATIVA O LOAD	
	desativaSpinner()
	
}

// RECONSTRÓI TODOS OS FILTROS DA TABELA SALVOS
function reconstroiFiltrosSalvos(){
		
	// ATIVA O LOADING
	ativaSpinner()
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#PEDIDOCOMPRAINFOSALVOS___1").val()==""){
		
		$('#PEDIDOCOMPRAINFOSALVOS___1').children('option:not(:first)').remove();
		$("#PEDIDOCOMPRAINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#PEDIDOCOMPRAINFOSALVOS___1").css("background-color","#fff")
		
	} else {
		
		$("#PEDIDOCOMPRAINFOSALVOS___1").css("border-color","#b92113")
		$("#PEDIDOCOMPRAINFOSALVOS___1").css("background-color","#f2dede")
		
	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#LOTEINFOSALVOS___1").val()==""){
		
		$('#LOTEINFOSALVOS___1').children('option:not(:first)').remove();
		$("#LOTEINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#LOTEINFOSALVOS___1").css("background-color","#fff")
		
	} else {
		
		$("#LOTEINFOSALVOS___1").css("border-color","#b92113")
		$("#LOTEINFOSALVOS___1").css("background-color","#f2dede")
		
	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#NUMDESENHOINFOSALVOS___1").val()==""){
		
		$('#NUMDESENHOINFOSALVOS___1').children('option:not(:first)').remove();
		$("#NUMDESENHOINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#NUMDESENHOINFOSALVOS___1").css("background-color","#fff")
		
	} else {
		
		$("#NUMDESENHOINFOSALVOS___1").css("border-color","#b92113")
		$("#NUMDESENHOINFOSALVOS___1").css("background-color","#f2dede")
		
	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#POSICAOINFOSALVOS___1").val()==""){
		
		$('#POSICAOINFOSALVOS___1').children('option:not(:first)').remove();
		$("#POSICAOINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#POSICAOINFOSALVOS___1").css("background-color","#fff")

	} else {
		
		$("#POSICAOINFOSALVOS___1").css("border-color","#b92113")
		$("#POSICAOINFOSALVOS___1").css("background-color","#f2dede")
		
	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#TOTALQTDEINFOSALVOS___1").val()==""){
		
		$('#TOTALQTDEINFOSALVOS___1').children('option:not(:first)').remove();
		$("#TOTALQTDEINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#TOTALQTDEINFOSALVOS___1").css("background-color","#fff")
		
	} else {
		
		$("#TOTALQTDEINFOSALVOS___1").css("border-color","#b92113")
		$("#TOTALQTDEINFOSALVOS___1").css("background-color","#f2dede")

	}

	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#MASSALINEARINFOSALVOS___1").val()==""){
	
		$('#MASSALINEARINFOSALVOS___1').children('option:not(:first)').remove();
		$("#MASSALINEARINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#MASSALINEARINFOSALVOS___1").css("background-color","#fff")
		
	} else {
		
		$("#MASSALINEARINFOSALVOS___1").css("border-color","#b92113")
		$("#MASSALINEARINFOSALVOS___1").css("background-color","#f2dede")

	}

	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#PESOLIQUIDOINFOSALVOS___1").val()==""){
		
		$('#PESOLIQUIDOINFOSALVOS___1').children('option:not(:first)').remove();
		$("#PESOLIQUIDOINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#PESOLIQUIDOINFOSALVOS___1").css("background-color","#fff")
		
	} else {
		
		$("#PESOLIQUIDOINFOSALVOS___1").css("border-color","#b92113")
		$("#PESOLIQUIDOINFOSALVOS___1").css("background-color","#f2dede")

	}

	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#DESCRICAOINFOSALVOS___1").val()==""){
		
		$('#DESCRICAOINFOSALVOS___1').children('option:not(:first)').remove();
		$("#DESCRICAOINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#DESCRICAOINFOSALVOS___1").css("background-color","#fff")
		
	} else {
		
		$("#DESCRICAOINFOSALVOS___1").css("border-color","#b92113")
		$("#DESCRICAOINFOSALVOS___1").css("background-color","#f2dede")
		
	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#MATERIALINFOSALVOS___1").val()==""){
		
		$('#MATERIALINFOSALVOS___1').children('option:not(:first)').remove();
		$("#MATERIALINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#MATERIALINFOSALVOS___1").css("background-color","#fff")
		
	} else {
		
		$("#MATERIALINFOSALVOS___1").css("border-color","#b92113")
		$("#MATERIALINFOSALVOS___1").css("background-color","#f2dede")

	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#BITOLAINFOSALVOS___1").val()==""){
		
		$('#BITOLAINFOSALVOS___1').children('option:not(:first)').remove();
		$("#BITOLAINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#BITOLAINFOSALVOS___1").css("background-color","#fff")
		
	} else {
		
		$("#BITOLAINFOSALVOS___1").css("border-color","#b92113")
		$("#BITOLAINFOSALVOS___1").css("background-color","#f2dede")

	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#LARGURAINFOSALVOS___1").val()==""){
	
		$('#LARGURAINFOSALVOS___1').children('option:not(:first)').remove();
		$("#LARGURAINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#LARGURAINFOSALVOS___1").css("background-color","#fff")

	} else {
		
		$("#LARGURAINFOSALVOS___1").css("border-color","#b92113")
		$("#LARGURAINFOSALVOS___1").css("background-color","#f2dede")

	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#COMPRIMENTOINFOSALVOS___1").val()==""){
		
		$('#COMPRIMENTOINFOSALVOS___1').children('option:not(:first)').remove();
		$("#COMPRIMENTOINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#COMPRIMENTOINFOSALVOS___1").css("background-color","#fff")
		
	} else {
		
		$("#COMPRIMENTOINFOSALVOS___1").css("border-color","#b92113")
		$("#COMPRIMENTOINFOSALVOS___1").css("background-color","#f2dede")
		
	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#ESPROSCAINFOSALVOS___1").val()==""){
		
		$('#ESPROSCAINFOSALVOS___1').children('option:not(:first)').remove();
		$("#ESPROSCAINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#ESPROSCAINFOSALVOS___1").css("background-color","#fff")
		
	} else {
		
		$("#ESPROSCAINFOSALVOS___1").css("border-color","#b92113")
		$("#ESPROSCAINFOSALVOS___1").css("background-color","#f2dede")
		
	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#PESOBRUTOINFOSALVOS___1").val()==""){
	
		$('#PESOBRUTOINFOSALVOS___1').children('option:not(:first)').remove();
		$("#PESOBRUTOINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#PESOBRUTOINFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#PESOBRUTOINFOSALVOS___1").css("border-color","#b92113")
		$("#PESOBRUTOINFOSALVOS___1").css("background-color","#f2dede")

	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#DIAMEXTINFOSALVOS___1").val()==""){
	
		$('#DIAMEXTINFOSALVOS___1').children('option:not(:first)').remove();
		$("#DIAMEXTINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#DIAMEXTINFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#DIAMEXTINFOSALVOS___1").css("border-color","#b92113")
		$("#DIAMEXTINFOSALVOS___1").css("background-color","#f2dede")

	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#DIAMINTINFOSALVOS___1").val()==""){
	
		$('#DIAMINTINFOSALVOS___1').children('option:not(:first)').remove();
		$("#DIAMINTINFOSALVOS___1").css("border-color","#d1d3d4")
		$("#DIAMINTINFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#DIAMINTINFOSALVOS___1").css("border-color","#b92113")
		$("#DIAMINTINFOSALVOS___1").css("background-color","#f2dede")

	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#ORIGEMMP1INFOSALVOS___1").val()==""){
		
		$('#ORIGEMMP1INFOSALVOS___1').children('option:not(:first)').remove();
		$("#ORIGEMMP1INFOSALVOS___1").css("border-color","#d1d3d4")
		$("#ORIGEMMP1INFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#ORIGEMMP1INFOSALVOS___1").css("border-color","#b92113")
		$("#ORIGEMMP1INFOSALVOS___1").css("background-color","#f2dede")

	}

	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#ORIGEMMP2INFOSALVOS___1").val()==""){
	
		$('#ORIGEMMP2INFOSALVOS___1').children('option:not(:first)').remove();
		$("#ORIGEMMP2INFOSALVOS___1").css("border-color","#d1d3d4")
		$("#ORIGEMMP2INFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#ORIGEMMP2INFOSALVOS___1").css("border-color","#b92113")
		$("#ORIGEMMP2INFOSALVOS___1").css("background-color","#f2dede")

	}

	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#QTDORIGEM1INFOSALVOS___1").val()==""){
	
		$('#QTDORIGEM1INFOSALVOS___1').children('option:not(:first)').remove();
		$("#QTDORIGEM1INFOSALVOS___1").css("border-color","#d1d3d4")
		$("#QTDORIGEM1INFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#QTDORIGEM1INFOSALVOS___1").css("border-color","#b92113")
		$("#QTDORIGEM1INFOSALVOS___1").css("background-color","#f2dede")

	}

	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#QTDORIGEM2INFOSALVOS___1").val()==""){
	
		$('#QTDORIGEM2INFOSALVOS___1').children('option:not(:first)').remove();
		$("#QTDORIGEM2INFOSALVOS___1").css("border-color","#d1d3d4")
		$("#QTDORIGEM2INFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#QTDORIGEM2INFOSALVOS___1").css("border-color","#b92113")
		$("#QTDORIGEM2INFOSALVOS___1").css("background-color","#f2dede")

	}

	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#PESOORIGEM1INFOSALVOS___1").val()==""){

		$('#PESOORIGEM1INFOSALVOS___1').children('option:not(:first)').remove();
		$("#PESOORIGEM1INFOSALVOS___1").css("border-color","#d1d3d4")
		$("#PESOORIGEM1INFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#PESOORIGEM1INFOSALVOS___1").css("border-color","#b92113")
		$("#PESOORIGEM1INFOSALVOS___1").css("background-color","#f2dede")

	}

	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#PESOORIGEM2INFOSALVOS___1").val()==""){
	
		$('#PESOORIGEM2INFOSALVOS___1').children('option:not(:first)').remove();
		$("#PESOORIGEM2INFOSALVOS___1").css("border-color","#d1d3d4")
		$("#PESOORIGEM2INFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#PESOORIGEM2INFOSALVOS___1").css("border-color","#b92113")
		$("#PESOORIGEM2INFOSALVOS___1").css("background-color","#f2dede")

	}
		
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#PRODUTORM1INFOSALVOS___1").val()==""){
		
		$('#PRODUTORM1INFOSALVOS___1').children('option:not(:first)').remove();
		$("#PRODUTORM1INFOSALVOS___1").css("border-color","#d1d3d4")
		$("#PRODUTORM1INFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#PRODUTORM1INFOSALVOS___1").css("border-color","#b92113")
		$("#PRODUTORM1INFOSALVOS___1").css("background-color","#f2dede")

	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#PRODUTORM2INFOSALVOS___1").val()==""){
		
		$('#PRODUTORM2INFOSALVOS___1').children('option:not(:first)').remove();
		$("#PRODUTORM2INFOSALVOS___1").css("border-color","#d1d3d4")
		$("#PRODUTORM2INFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#PRODUTORM2INFOSALVOS___1").css("border-color","#b92113")
		$("#PRODUTORM2INFOSALVOS___1").css("background-color","#f2dede")

	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#PRODUTORM3INFOSALVOS___1").val()==""){
		
		$('#PRODUTORM3INFOSALVOS___1').children('option:not(:first)').remove();
		$("#PRODUTORM3INFOSALVOS___1").css("border-color","#d1d3d4")
		$("#PRODUTORM3INFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#PRODUTORM3INFOSALVOS___1").css("border-color","#b92113")
		$("#PRODUTORM3INFOSALVOS___1").css("background-color","#f2dede")

	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#PRODUTORM4INFOSALVOS___1").val()==""){
		
		$('#PRODUTORM4INFOSALVOS___1').children('option:not(:first)').remove();
		$("#PRODUTORM4INFOSALVOS___1").css("border-color","#d1d3d4")
		$("#PRODUTORM4INFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#PRODUTORM4INFOSALVOS___1").css("border-color","#b92113")
		$("#PRODUTORM4INFOSALVOS___1").css("background-color","#f2dede")

	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#PRODUTORM5INFOSALVOS___1").val()==""){
		
		$('#PRODUTORM5INFOSALVOS___1').children('option:not(:first)').remove();
		$("#PRODUTORM5INFOSALVOS___1").css("border-color","#d1d3d4")
		$("#PRODUTORM5INFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#PRODUTORM5INFOSALVOS___1").css("border-color","#b92113")
		$("#PRODUTORM5INFOSALVOS___1").css("background-color","#f2dede")

	}
	
	// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
	if($("#PRODUTORM6INFOSALVOS___1").val()==""){
		
		$('#PRODUTORM6INFOSALVOS___1').children('option:not(:first)').remove();
		$("#PRODUTORM6INFOSALVOS___1").css("border-color","#d1d3d4")
		$("#PRODUTORM6INFOSALVOS___1").css("background-color","#fff")
			
	} else {
		
		$("#PRODUTORM6INFOSALVOS___1").css("border-color","#b92113")
		$("#PRODUTORM6INFOSALVOS___1").css("background-color","#f2dede")

	}
	
	// APAGA A LISTA ATUAL
	//apagaListaSalvos()
	
	// CARREGA UMA NOVA LISTA
	carregaListaSalvos()
	
	// CONSTRÓI OS FILTROS
	constroiFiltrosSalvos()
	
	// DESATIVA O LOAD	
    desativaSpinner() 
	
}

// RETIRA A SELEÇÃO DE TODOS OS FILTROS DA TABELA SALVOS
function retiraSelecaoFiltrosSalvos() {
	
	$('#PEDIDOCOMPRAINFOSALVOS___1').children('option').remove();
	$('#PEDIDOCOMPRAINFOSALVOS___1').append('<option value=""></option>')
	$("#PEDIDOCOMPRAINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PEDIDOCOMPRAINFOSALVOS___1").css("background-color","#fff")
	$('#PEDIDOCOMPRAINFOSALVOS___1').val("");
	
	$('#LOTEINFOSALVOS___1').children('option').remove();
	$('#LOTEINFOSALVOS___1').append('<option value=""></option>')
	$("#LOTEINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#LOTEINFOSALVOS___1").css("background-color","#fff")
	$('#LOTEINFOSALVOS___1').val("");
	
	$('#NUMDESENHOINFOSALVOS___1').children('option').remove();
	$('#NUMDESENHOINFOSALVOS___1').append('<option value=""></option>')
	$("#NUMDESENHOINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#NUMDESENHOINFOSALVOS___1").css("background-color","#fff")
	$('#NUMDESENHOINFOSALVOS___1').val("");

	$('#POSICAOINFOSALVOS___1').children('option').remove();
	$('#POSICAOINFOSALVOS___1').append('<option value=""></option>')
	$("#POSICAOINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#POSICAOINFOSALVOS___1").css("background-color","#fff")
	$('#POSICAOINFOSALVOS___1').val("");

	$('#TOTALQTDEINFOSALVOS___1').children('option').remove();
	$('#TOTALQTDEINFOSALVOS___1').append('<option value=""></option>')
	$("#TOTALQTDEINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#TOTALQTDEINFOSALVOS___1").css("background-color","#fff")
	$('#TOTALQTDEINFOSALVOS___1').val("");

	$('#DESCRICAOINFOSALVOS___1').children('option').remove();
	$('#DESCRICAOINFOSALVOS___1').append('<option value=""></option>')
	$("#DESCRICAOINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#DESCRICAOINFOSALVOS___1").css("background-color","#fff")
	$('#DESCRICAOINFOSALVOS___1').val("");

	$('#MATERIALINFOSALVOS___1').children('option').remove();
	$('#MATERIALINFOSALVOS___1').append('<option value=""></option>')
	$("#MATERIALINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#MATERIALINFOSALVOS___1").css("background-color","#fff")
	$('#MATERIALINFOSALVOS___1').val("");

	$('#BITOLAINFOSALVOS___1').children('option').remove();
	$('#BITOLAINFOSALVOS___1').append('<option value=""></option>')
	$("#BITOLAINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#BITOLAINFOSALVOS___1").css("background-color","#fff")
	$('#BITOLAINFOSALVOS___1').val("");

	$('#LARGURAINFOSALVOS___1').children('option').remove();
	$('#LARGURAINFOSALVOS___1').append('<option value=""></option>')
	$("#LARGURAINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#LARGURAINFOSALVOS___1").css("background-color","#fff")
	$('#LARGURAINFOSALVOS___1').val("");

	$('#COMPRIMENTOINFOSALVOS___1').children('option').remove();
	$('#COMPRIMENTOINFOSALVOS___1').append('<option value=""></option>')
	$("#COMPRIMENTOINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#COMPRIMENTOINFOSALVOS___1").css("background-color","#fff")
	$('#COMPRIMENTOINFOSALVOS___1').val("");

	$('#ESPROSCAINFOSALVOS___1').children('option').remove();
	$('#ESPROSCAINFOSALVOS___1').append('<option value=""></option>')
	$("#ESPROSCAINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#ESPROSCAINFOSALVOS___1").css("background-color","#fff")
	$('#ESPROSCAINFOSALVOS___1').val("");

	$('#MASSALINEARINFOSALVOS___1').children('option').remove();
	$('#MASSALINEARINFOSALVOS___1').append('<option value=""></option>')
	$('#MASSALINEARINFOSALVOS___1').css("border-color","#d1d3d4")
	$('#MASSALINEARINFOSALVOS___1').css("background-color","#fff")
	$('#MASSALINEARINFOSALVOS___1').val("");

	$('#PESOBRUTOINFOSALVOS___1').children('option').remove();
	$('#PESOBRUTOINFOSALVOS___1').append('<option value=""></option>')
	$("#PESOBRUTOINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PESOBRUTOINFOSALVOS___1").css("background-color","#fff")
	$('#PESOBRUTOINFOSALVOS___1').val("");

	$('#DIAMEXTINFOSALVOS___1').children('option').remove();
	$('#DIAMEXTINFOSALVOS___1').append('<option value=""></option>')
	$("#DIAMEXTINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#DIAMEXTINFOSALVOS___1").css("background-color","#fff")
	$('#DIAMEXTINFOSALVOS___1').val("");

	$('#DIAMINTINFOSALVOS___1').children('option').remove();
	$('#DIAMINTINFOSALVOS___1').append('<option value=""></option>')
	$("#DIAMINTINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#DIAMINTINFOSALVOS___1").css("background-color","#fff")
	$('#DIAMINTINFOSALVOS___1').val("");

	$('#ORIGEMMP1INFOSALVOS___1').children('option').remove();
	$('#ORIGEMMP1INFOSALVOS___1').append('<option value=""></option>')
	$("#ORIGEMMP1INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#ORIGEMMP1INFOSALVOS___1").css("background-color","#fff")
	$('#ORIGEMMP1INFOSALVOS___1').val("");

	$('#ORIGEMMP2INFOSALVOS___1').children('option').remove();
	$('#ORIGEMMP2INFOSALVOS___1').append('<option value=""></option>')
	$("#ORIGEMMP2INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#ORIGEMMP2INFOSALVOS___1").css("background-color","#fff")
	$('#ORIGEMMP2INFOSALVOS___1').val("");

	$('#QTDORIGEM1INFOSALVOS___1').children('option').remove();
	$('#QTDORIGEM1INFOSALVOS___1').append('<option value=""></option>')
	$("#QTDORIGEM1INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#QTDORIGEM1INFOSALVOS___1").css("background-color","#fff")
	$('#QTDORIGEM1INFOSALVOS___1').val("");

	$('#QTDORIGEM2INFOSALVOS___1').children('option').remove();
	$('#QTDORIGEM2INFOSALVOS___1').append('<option value=""></option>')
	$("#QTDORIGEM2INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#QTDORIGEM2INFOSALVOS___1").css("background-color","#fff")
	$('#QTDORIGEM2INFOSALVOS___1').val("");

	$('#PRODUTORM1INFOSALVOS___1').children('option').remove();
	$('#PRODUTORM1INFOSALVOS___1').append('<option value=""></option>')
	$("#PRODUTORM1INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PRODUTORM1INFOSALVOS___1").css("background-color","#fff")
	$('#PRODUTORM1INFOSALVOS___1').val("");

	$('#PRODUTORM2INFOSALVOS___1').children('option').remove();
	$('#PRODUTORM2INFOSALVOS___1').append('<option value=""></option>')
	$("#PRODUTORM2INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PRODUTORM2INFOSALVOS___1").css("background-color","#fff")
	$('#PRODUTORM2INFOSALVOS___1').val("");

	$('#PRODUTORM3INFOSALVOS___1').children('option').remove();
	$('#PRODUTORM3INFOSALVOS___1').append('<option value=""></option>')
	$("#PRODUTORM3INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PRODUTORM3INFOSALVOS___1").css("background-color","#fff")
	$('#PRODUTORM3INFOSALVOS___1').val("");

	$('#PRODUTORM4INFOSALVOS___1').children('option').remove();
	$('#PRODUTORM4INFOSALVOS___1').append('<option value=""></option>')
	$("#PRODUTORM4INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PRODUTORM4INFOSALVOS___1").css("background-color","#fff")
	$('#PRODUTORM4INFOSALVOS___1').val("");

	$('#PRODUTORM5INFOSALVOS___1').children('option').remove();
	$('#PRODUTORM5INFOSALVOS___1').append('<option value=""></option>')
	$("#PRODUTORM5INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PRODUTORM5INFOSALVOS___1").css("background-color","#fff")
	$('#PRODUTORM5INFOSALVOS___1').val("");

	$('#PRODUTORM6INFOSALVOS___1').children('option').remove();
	$('#PRODUTORM6INFOSALVOS___1').append('<option value=""></option>')
	$("#PRODUTORM6INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PRODUTORM6INFOSALVOS___1").css("background-color","#fff")
	$('#PRODUTORM6INFOSALVOS___1').val("");

	console.log(">>>>>>>>>>> VOU REMOVER A CLASSE INVISIVEL")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA SALVOS
	$("input[id^='PEDIDOCOMPRASALVOS___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		$("#LINHASALVOS___"+seq).removeClass("invisivel")
		
		console.log("removi")
		
	})
	
}

// VERIFICA SE NUMDESENHO AINDA ESTÁ CONTIDO NA LISTA DE MATERIAIS
function temDesenho(desenho,op){
	
	var ret = false
	
	console.log("vou apagar lista")

	// SE TABELA GERAL
	if(op==0){
		
		$("input[id^='NUMDESENHO___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var numDesenho = $("#NUMDESENHO___"+seq).val()
			
			// SE NUMDESENHO AINDA ESTÁ CONTIDO NA LISTA
			if(numDesenho==desenho){
				
				ret = true
				
			}
			
		});
		
	}
	
	// SE TABELA SALVOS
	if(op==1){
		
		$("input[id^='NUMDESENHOSALVOS___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var numDesenho = $("#NUMDESENHOSALVOS___"+seq).val()
			
			// SE NUMDESENHO AINDA ESTÁ CONTIDO NA LISTA
			if(numDesenho==desenho){
				
				ret = true
				
			}
			
		});
		
	}
	
	return ret
	
}

// VERIFICA SE POSICAO AINDA ESTÁ CONTIDO NA LISTA DE MATERIAIS
function temPosicao(posicao,op){
	
	var ret = false
	
	console.log("vou apagar lista")

	// SE TABELA GERAL
	if(op==0){
		
		$("input[id^='NUMDESENHO___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var posicaoTabela = $("#POSICAO___"+seq).val()
			
			// SE POSIÇÃO AINDA ESTÁ CONTIDA NA LISTA
			if(posicaoTabela==posicao){
				
				ret = true
				
			}
			
		});
		
	}
	
	// SE TABELA SALVOS
	if(op==1){
		
		$("input[id^='NUMDESENHOSALVOS___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var posicaoTabela = $("#POSICAOSALVOS___"+seq).val()
			
			// SE POSIÇÃO AINDA ESTÁ CONTIDA NA LISTA
			if(posicaoTabela==posicao){
				
				ret = true
				
			}
			
		});

	}
	
	return ret
	
}

// VERIFICA SE TOTALQTDE AINDA ESTÁ CONTIDO NA LISTA DE MATERIAIS
function temQtde(totalQtde,op){
	
	var ret = false
	
	console.log("vou apagar lista")

	// SE TABELA GERAL
	if(op==0){
		
		$("input[id^='NUMDESENHO___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var qtdeTabela = $("#QUANTIDADE___"+seq).val()
			
			// SE TOTALQTDE AINDA ESTÁ CONTIDO NA LISTA
			if(qtdeTabela==totalQtde){
				
				ret = true
				
			}
			
		});
		
	}
	
	// SE TABELA SALVOS
	if(op==1){
		
		$("input[id^='NUMDESENHOSALVOS___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var qtdeTabela = $("#QUANTIDADESALVOS___"+seq).val()
			
			// SE TOTALQTDE AINDA ESTÁ CONTIDO NA LISTA
			if(qtdeTabela==totalQtde){
				
				ret = true
				
			}
			
		});
		
	}

	return ret
	
}

// VERIFICA SE DESCRIÇÃO AINDA ESTÁ CONTIDA NA LISTA DE MATERIAIS
function temDescricao(descricao,op){
	
	var ret = false
	
	console.log("vou apagar lista")

	// SE TABELA GERAL
	if(op==0){
		
		$("input[id^='NUMDESENHO___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var descricaoTabela = $("#DESCRICAO___"+seq).val()
			
			// SE DESCRIÇÃO AINDA ESTÁ CONTIDA NA LISTA
			if(descricaoTabela==descricao){
				
				ret = true
				
			}
			
		});
		
	}
	
	// SE TABELA SALVOS
	if(op==1){
		
		$("input[id^='NUMDESENHOSALVOS___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var descricaoTabela = $("#DESCRICAOSALVOS___"+seq).val()
			
			// SE DESCRIÇÃO AINDA ESTÁ CONTIDA NA LISTA
			if(descricaoTabela==descricao){
				
				ret = true
				
			}
			
		});
		
	}
	
	return ret
	
}

// VERIFICA SE MATERIAL AINDA ESTÁ CONTIDO NA LISTA DE MATERIAIS
function temMaterial(material,op){
	
	var ret = false
	
	console.log("vou apagar lista")

	// SE TABELA GERAL
	if(op==0){
		
		$("input[id^='NUMDESENHO___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var materialTabela = $("#MATERIAL___"+seq).val()
			
			// SE MATERIAL AINDA ESTÁ CONTIDO NA LISTA
			if(materialTabela==material){
				
				ret = true
				
			}
			
		});
		
	}
	
	// SE TABELA SALVOS
	if(op==1){
		
		$("input[id^='NUMDESENHOSALVOS___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var materialTabela = $("#MATERIALSALVOS___"+seq).val()
			
			// SE MATERIAL AINDA ESTÁ CONTIDO NA LISTA
			if(materialTabela==material){
				
				ret = true
				
			}
			
		});
		
	}
	
	return ret
	
}

// VERIFICA SE BITOLA AINDA ESTÁ CONTIDO NA LISTA DE MATERIAIS
function temBitola(bitola,op){
	
	var ret = false
	
	console.log("vou apagar lista")

	// SE TABELA GERAL
	if(op==0){
		
		$("input[id^='NUMDESENHO___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var bitolaTabela = $("#BITOLA___"+seq).val()
			
			// SE BITOLA AINDA ESTÁ CONTIDA NA LISTA
			if(bitolaTabela==bitola){
				
				ret = true
				
			}
			
		});
		
	}

	// SE TABELA SALVOS
	if(op==1){
		
		$("input[id^='NUMDESENHOSALVOS___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var bitolaTabela = $("#BITOLASALVOS___"+seq).val()
			
			// SE BITOLA AINDA ESTÁ CONTIDA NA LISTA
			if(bitolaTabela==bitola){
				
				ret = true
				
			}
			
		});
		
	}
	
	return ret
	
}

// VERIFICA SE LARGURA AINDA ESTÁ CONTIDA NA LISTA DE MATERIAIS
function temLargura(largura,op){
	
	var ret = false
	
	console.log("vou apagar lista")

	// SE TABELA GERAL
	if(op==0){
		
		$("input[id^='NUMDESENHO___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var larguraTabela = $("#LARGURA___"+seq).val()
			
			// SE LARGURA AINDA ESTÁ CONTIDA NA LISTA
			if(larguraTabela==largura){
				
				ret = true
				
			}
			
		});
		
	}
	
	// SE TABELA SALVOS
	if(op==1){
		
		$("input[id^='NUMDESENHOSALVOS___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var larguraTabela = $("#LARGURASALVOS___"+seq).val()
			
			// SE LARGURA AINDA ESTÁ CONTIDA NA LISTA
			if(larguraTabela==largura){
				
				ret = true
				
			}
			
		});
		
	}
	
	return ret
	
}

// VERIFICA SE COMPRIMENTO AINDA ESTÁ CONTIDO NA LISTA DE MATERIAIS
function temComprimento(comprimento,op){
	
	var ret = false
	
	console.log("vou apagar lista")

	// SE TABELA GERAL
	if(op==0){
		
		$("input[id^='NUMDESENHO___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var comprimentoTabela = $("#COMPRIMENTO___"+seq).val()
			
			// SE COMPRIMENTO AINDA ESTÁ CONTIDO NA LISTA
			if(comprimentoTabela==comprimento){
				
				ret = true
				
			}
			
		});
		
	}
	
	// SE TABELA SALVOS
	if(op==1){
		
		$("input[id^='NUMDESENHOSALVOS___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var comprimentoTabela = $("#COMPRIMENTOSALVOS___"+seq).val()
			
			// SE COMPRIMENTO AINDA ESTÁ CONTIDO NA LISTA
			if(comprimentoTabela==comprimento){
				
				ret = true
				
			}
			
		});
		
	}

	return ret
	
}

// VERIFICA SE ESPROSCA AINDA ESTÁ CONTIDO NA LISTA DE MATERIAIS
function temEspRosca(espRosca,op){
	
	var ret = false
	
	console.log("vou apagar lista")

	// SE TABELA GERAL
	if(op==0){
		
		$("input[id^='NUMDESENHO___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var espRoscaTabela = $("#ESPROSCA___"+seq).val()
			
			// SE ESPROSCA AINDA ESTÁ CONTIDO NA LISTA
			if(espRoscaTabela==espRosca){
				
				ret = true
				
			}
			
		});
		
	}
	
	// SE TABELA SALVOS
	if(op==1){
		
		$("input[id^='NUMDESENHOSALVOS___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var espRoscaTabela = $("#ESPROSCASALVOS___"+seq).val()
			
			// SE ESPROSCA AINDA ESTÁ CONTIDO NA LISTA
			if(espRoscaTabela==espRosca){
				
				ret = true
				
			}
			
		});
		
	}
	
	return ret
	
}

// VERIFICA SE PESOBRUTO AINDA ESTÁ CONTIDO NA LISTA DE MATERIAIS
function temPeso(peso,op){
	
	var ret = false
	
	console.log("vou apagar lista")

	// SE TABELA GERAL
	if(op==0){
		
		$("input[id^='NUMDESENHO___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var pesoTabela = $("#PESOBRUTO___"+seq).val()
			
			// SE PESO AINDA ESTÁ CONTIDO NA LISTA
			if(pesoTabela==peso){
				
				ret = true
				
			}
			
		});
		
	}
	
	// SE TABELA SALVOS
	if(op==1){
		
		$("input[id^='NUMDESENHOSALVOS___']").each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var pesoTabela = $("#PESOBRUTOSALVOS___"+seq).val()
			
			// SE PESO AINDA ESTÁ CONTIDO NA LISTA
			if(pesoTabela==peso){
				
				ret = true
				
			}
			
		});
		
	}
	
	return ret
	
}

// APAGA A TABELA QUE CONTÉM A LISTA DE MATERIAIS
function apagaLista(){
	
	console.log("vou apagar lista")

	$("input[id^='NUMDESENHO___']").each(function(index, value){
		
		$(this).parents("tr").remove();
		
	});

}

// APAGA A TABELA QUE CONTÉM A LISTA DE MATERIAIS SALVOS
function apagaListaSalvos(){
	
	console.log("vou apagar lista SALVOS")

	$("input[id^='NUMDESENHOSALVOS___']").each(function(index, value){
		
		$(this).parents("tr").remove();
		
	});

}

// APAGA A TABELA QUE CONTÉM OS FILTROS PARA A LISTA DE MATERIAIS
function apagaListaFiltros(){
	
	console.log("vou apagar lista dos filtros")
	
	$("#NUMDESENHOINFO___1").val("")
	$("#POSICAOINFO___1").val("")
	$("#TOTALQTDEINFO___1").val("")
	$("#DESCRICAOINFO___1").val("")
	$("#MATERIALINFO___1").val("")
	$("#BITOLAINFO___1").val("")
	$("#LARGURAINFO___1").val("")
	$("#COMPRIMENTOINFO___1").val("")
	$("#ESPROSCAINFO___1").val("")
	$("#PESOBRUTOINFO___1").val("")
	$("#ORIGEMMPINFO___1").val("")
	
	$('#NUMDESENHOINFO___1').children('option:not(:first)').remove();
	$('#POSICAOINFO___1').children('option:not(:first)').remove();
	$('#TOTALQTDEINFO___1').children('option:not(:first)').remove();
	$('#DESCRICAOINFO___1').children('option:not(:first)').remove();
	$('#MATERIALINFO___1').children('option:not(:first)').remove();
	$('#BITOLAINFO___1').children('option:not(:first)').remove();
	$('#LARGURAINFO___1').children('option:not(:first)').remove();
	$('#COMPRIMENTOINFO___1').children('option:not(:first)').remove();
	$('#ESPROSCAINFO___1').children('option:not(:first)').remove();
	$('#PESOBRUTOINFO___1').children('option:not(:first)').remove();
	$('#ORIGEMMPINFO___1').children('option:not(:first)').remove();
	
	/*$('#NUMDESENHOINFO___1').children('option!=""').remove();
	$('#POSICAOINFO___1').children('option!=""').remove();
	$('#TOTALQTDEINFO___1').children('option!=""').remove();
	$('#DESCRICAOINFO___1').children('option!=""').remove();
	$('#MATERIALINFO___1').children('option!=""').remove();
	$('#BITOLAINFO___1').children('option!=""').remove();
	$('#LARGURAINFO___1').children('option!=""').remove();
	$('#COMPRIMENTOINFO___1').children('option!=""').remove();
	$('#ESPROSCAINFO___1').children('option!=""').remove();
	$('#PESOBRUTOINFO___1').children('option!=""').remove();
	$('#ORIGEMMPINFO___1').children('option!=""').remove();*/
	
}

// APAGA A TABELA QUE CONTÉM OS FILTROS PARA A LISTA DE MATERIAIS SALVOS
function apagaListaFiltrosSalvos(){
	
	console.log("vou apagar lista dos filtros")
	
	$("#NUMDESENHOINFOSALVOS___1").val("")
	$("#POSICAOINFOSALVOS___1").val("")
	$("#TOTALQTDEINFOSALVOS___1").val("")
	$("#DESCRICAOINFOSALVOS___1").val("")
	$("#MATERIALINFOSALVOS___1").val("")
	$("#BITOLAINFOSALVOS___1").val("")
	$("#LARGURAINFOSALVOS___1").val("")
	$("#COMPRIMENTOINFOSALVOS___1").val("")
	$("#ESPROSCAINFOSALVOS___1").val("")
	$("#MASSALINEARINFOSALVOS___1").val("")
	$("#PESOBRUTOINFOSALVOS___1").val("")
	$("#PRODUTORM1INFOSALVOS___1").val("")
	$("#PRODUTORM2INFOSALVOS___1").val("")
	$("#PRODUTORM3INFOSALVOS___1").val("")
	$("#PRODUTORM4INFOSALVOS___1").val("")
	$("#PRODUTORM5INFOSALVOS___1").val("")
	$("#PRODUTORM6INFOSALVOS___1").val("")

	$('#NUMDESENHOINFOSALVOS___1').children('option:not(:first)').remove();
	$('#POSICAOINFOSALVOS___1').children('option:not(:first)').remove();
	$('#TOTALQTDEINFOSALVOS___1').children('option:not(:first)').remove();
	$('#DESCRICAOINFOSALVOS___1').children('option:not(:first)').remove();
	$('#MATERIALINFOSALVOS___1').children('option:not(:first)').remove();
	$('#BITOLAINFOSALVOS___1').children('option:not(:first)').remove();
	$('#LARGURAINFOSALVOS___1').children('option:not(:first)').remove();
	$('#COMPRIMENTOINFOSALVOS___1').children('option:not(:first)').remove();
	$('#ESPROSCAINFOSALVOS___1').children('option:not(:first)').remove();
	$("#MASSALINEARINFOSALVOS___1").children('option:not(:first)').remove();
	$('#PESOBRUTOINFOSALVOS___1').children('option:not(:first)').remove();
	
	$("#PRODUTORM1INFOSALVOS___1").children('option:not(:first)').remove();
	$("#PRODUTORM2INFOSALVOS___1").children('option:not(:first)').remove();
	$("#PRODUTORM3INFOSALVOS___1").children('option:not(:first)').remove();
	$("#PRODUTORM4INFOSALVOS___1").children('option:not(:first)').remove();
	$("#PRODUTORM5INFOSALVOS___1").children('option:not(:first)').remove();
	$("#PRODUTORM6INFOSALVOS___1").children('option:not(:first)').remove();
	
	/*$('#NUMDESENHOINFOSALVOS___1').children('option!=""').remove();
	$('#POSICAOINFOSALVOS___1').children('option!=""').remove();
	$('#TOTALQTDEINFOSALVOS___1').children('option!=""').remove();
	$('#DESCRICAOINFOSALVOS___1').children('option!=""').remove();
	$('#MATERIALINFOSALVOS___1').children('option!=""').remove();
	$('#BITOLAINFOSALVOS___1').children('option!=""').remove();
	$('#LARGURAINFOSALVOS___1').children('option!=""').remove();
	$('#COMPRIMENTOINFOSALVOS___1').children('option!=""').remove();
	$('#ESPROSCAINFOSALVOS___1').children('option!=""').remove();
	$('#PESOBRUTOINFOSALVOS___1').children('option!=""').remove();
	$("#PRODUTORM1INFOSALVOS___1").children('option!=""').remove();
	$("#PRODUTORM2INFOSALVOS___1").children('option!=""').remove();
	$("#PRODUTORM3INFOSALVOS___1").children('option!=""').remove();
	$("#PRODUTORM4INFOSALVOS___1").children('option!=""').remove();
	$("#PRODUTORM5INFOSALVOS___1").children('option!=""').remove();
	$("#PRODUTORM6INFOSALVOS___1").children('option!=""').remove();*/
	
}

//
/*function filtro*/

// FAZ A ALTERAÇÃO DO ÍCONE DOS BOTÕES DO ZOOM DENTRO DA TABELA
function alterarZoom(){
	
	console.log("entrei para alterar ícone do zoom")
	
	// SELECIONA TODOS OS CAMPOS TIPO ZOOM DA TABELA
	$("table span[class^='fluigicon fluigicon-zoom-in']").each(function (value,index){
		
		$("table span[class^='fluigicon']").addClass("fluigicon-filter icon-xs")
		$("table span[class^='fluigicon']").removeClass("fluigicon-zoom-in")
		
	})
	
	//$("#NUMDESENHO_INFO___1 icone").append("<i class='fluigicon fluigicon-filter icon-md'></i>")
	
}

// EXPANDE O CONTEÚDO DO DETALHAMENTO DO ITEM
function expandir(e) {
	
	var id = $(e).attr("id").split("___")[1];
	console.log("id: "+id)

	var idCampo = id.replace("ICONR", "");
	console.log("idCampo: "+idCampo)
 
	 // ESCONDE/MOSTRA OS ÍCONES
	 $("#ICONtxtHistoricoITMMOV___" + id).hide();
	 $("#ICONRtxtHistoricoITMMOV___" + id).show();
	 
	 // EXIBE A ABA DOS ITENS
	 $("#SECUNDARIO___"+id).show()

}

// REDUZ O CONTEÚDO DO DETALHAMENTO DO ITEM
function reduzir(e) {
	
	 var id = $(e).attr("id").split("___")[1];
	 console.log("id: "+id)
	 
	 var idCampo = id.replace("ICONR", "");
	 console.log("idCampo: "+idCampo)
	 
	 // ESCONDE/MOSTRA OS ÍCONES
	 $("#ICONtxtHistoricoITMMOV___" + id).show();
	 $("#ICONRtxtHistoricoITMMOV___" + id).hide();
	 
	 // EXIBE A ABA DOS ITENS
	 $("#SECUNDARIO___"+id).hide()
 
}

// EXIBE UM BALÃO COM O TEXTO COMPLETO DO CAMPO AO PASSAR O MOUSE SOBRE ELE
function mouse(e) {
	
	// PEGA O VALOR COMPLETO PREENCHIDO NO CAMPO
	var valCampo = $(e).val()
	
	// SE CAMPO NÃO FOI PREENCHIDO
	if(valCampo == "" || valCampo == null){
		
		return false
		
	}
	// SE CAMPO FOI PREENCHIDO
	else{
		
		// CARREGA EM "TITLE" O VALOR DO CAMPO PREENCHIDO
		$(e).prop("title", valCampo)
		
		return true
		
	}
	
}

// VERIFICA SE EXISTE ALGUM CAMPO ORIGEM MP VAZIO
function origemMPvazio(){
	
	var ret = false
	
	// PERCORRE A TABELA DA LISTA DOS MATERIAIS
	$("input[id^='POSICAO___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SALVA O CAMPO ORIGEM MP
		var origemMP = $("#ORIGEMMP___"+seq).val()
		
		// SE LINHA FOI FILTRADA
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
		
			// SE ORIGEM MP NÃO FOI SELECIONADO
			if(origemMP=="" || origemMP==null || origemMP==undefined){
				
				ret = true
				
			}
		
		}
		
	})
	
	return ret
	
}

function salvar2(){

	var verifica = true

	var produtoRM1 = $("#PRODUTO_RM1").val()
	var produtoRM2 = $("#PRODUTO_RM2").val()
	var produtoRM3 = $("#PRODUTO_RM3").val()
	var produtoRM4 = $("#PRODUTO_RM4").val()
	var produtoRM5 = $("#PRODUTO_RM5").val()
	var produtoRM6 = $("#PRODUTO_RM6").val()
	
	console.log("produtoRM1: "+produtoRM1+", produtoRM2: "+produtoRM2+", produtoRM3: "+produtoRM3+", produtoRM4: "+
			produtoRM4+", produtoRM5: "+produtoRM5+", produtoRM6: "+produtoRM6)
	
	// SE NENHUM PRODUTORM FOI SELECIONADO
	if(produtoRM1=="" && produtoRM2=="" && produtoRM3=="" && produtoRM4=="" && produtoRM5=="" && produtoRM6==""){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário informar pelo menos um produto do RM para vincular aos itens da lista!',
			  text: 'Verifique e tente novamente'
		})	
		
	} else {

		// ATIVA SPINNER
		ativaSpinner()

		$("input[id^='POSICAOSALVOS___']").each(function (){

			var seq = $(this).attr("id").split("___")[1]

			if($("#LINHASALVOS___"+seq).hasClass("linha_selecionada") && $("#PRODUTORM1SALVOS___"+seq).val()=="" && $("#PRODUTO_RM1").val() == ""){

				// EXIBE ALERTA
				Swal.fire({
					icon: 'error',
					title: 'Existem itens selecionados que ainda não possuem produto principal!',
					text: 'Selecione um produto principal'
				})	

				verifica=false;

			}

		})

		if(verifica){

			for(var i = 1; i < 6; i++){
			
				if($("#PRODUTO_RM"+i).val() != ""){
		
					$("input[id^='POSICAOSALVOS___']").each(function (){
		
						var seq = $(this).attr("id").split("___")[1]
		
						if($("#LINHASALVOS___"+seq).hasClass("linha_selecionada")){
		
							$("#PRODUTORM"+i+"SALVOS___"+seq).val($("#PRODUTO_RM"+i).val())
							$("#IDPRD"+i+"SALVOS___"+seq).val($("#IDPRD"+i).val())
							$("#CODIGOPRD"+i+"SALVOS___"+seq).val($("#CODIGOPRD"+i).val())
							$("#UNDPRD"+i+"SALVOS___"+seq).val($("#UNDPRD"+i).val())
		
						}
		
					})
		
				}
				

			}

			apagaListaFiltrosSalvos()
			
			carregaListaSalvos()
			
			reconstroiFiltrosSalvos()
	

		}

		// DESATIVA O LOAD
		desativaSpinner()

	}


}

// REFAZ FILTROS APÓS sALVAR CODIFICAÇÃO
function reconstroiFiltrosSalvos2(){

		
	$('#PEDIDOCOMPRAINFOSALVOS___1').children('option:not(:first)').remove();
	$("#PEDIDOCOMPRAINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PEDIDOCOMPRAINFOSALVOS___1").css("background-color","#fff")
	
	
	$('#LOTEINFOSALVOS___1').children('option:not(:first)').remove();
	$("#LOTEINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#LOTEINFOSALVOS___1").css("background-color","#fff")
	
	
	$('#NUMDESENHOINFOSALVOS___1').children('option:not(:first)').remove();
	$("#NUMDESENHOINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#NUMDESENHOINFOSALVOS___1").css("background-color","#fff")
	
	
	$('#POSICAOINFOSALVOS___1').children('option:not(:first)').remove();
	$("#POSICAOINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#POSICAOINFOSALVOS___1").css("background-color","#fff")

	
	$('#TOTALQTDEINFOSALVOS___1').children('option:not(:first)').remove();
	$("#TOTALQTDEINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#TOTALQTDEINFOSALVOS___1").css("background-color","#fff")
	

	$('#MASSALINEARINFOSALVOS___1').children('option:not(:first)').remove();
	$("#MASSALINEARINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#MASSALINEARINFOSALVOS___1").css("background-color","#fff")
	
	
	$('#PESOLIQUIDOINFOSALVOS___1').children('option:not(:first)').remove();
	$("#PESOLIQUIDOINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PESOLIQUIDOINFOSALVOS___1").css("background-color","#fff")
	
	
	$('#DESCRICAOINFOSALVOS___1').children('option:not(:first)').remove();
	$("#DESCRICAOINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#DESCRICAOINFOSALVOS___1").css("background-color","#fff")
	
	
	$('#MATERIALINFOSALVOS___1').children('option:not(:first)').remove();
	$("#MATERIALINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#MATERIALINFOSALVOS___1").css("background-color","#fff")
	
	
	$('#BITOLAINFOSALVOS___1').children('option:not(:first)').remove();
	$("#BITOLAINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#BITOLAINFOSALVOS___1").css("background-color","#fff")
	

	$('#LARGURAINFOSALVOS___1').children('option:not(:first)').remove();
	$("#LARGURAINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#LARGURAINFOSALVOS___1").css("background-color","#fff")

	
	$('#COMPRIMENTOINFOSALVOS___1').children('option:not(:first)').remove();
	$("#COMPRIMENTOINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#COMPRIMENTOINFOSALVOS___1").css("background-color","#fff")
	
	
	$('#ESPROSCAINFOSALVOS___1').children('option:not(:first)').remove();
	$("#ESPROSCAINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#ESPROSCAINFOSALVOS___1").css("background-color","#fff")

	$('#MASSALINEARINFOSALVOS___1').children('option:not(:first)').remove();
	$("#MASSALINEARINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#MASSALINEARINFOSALVOS___1").css("background-color","#fff")
	
	$('#PESOBRUTOINFOSALVOS___1').children('option:not(:first)').remove();
	$("#PESOBRUTOINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PESOBRUTOINFOSALVOS___1").css("background-color","#fff")
		

	$('#DIAMEXTINFOSALVOS___1').children('option:not(:first)').remove();
	$("#DIAMEXTINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#DIAMEXTINFOSALVOS___1").css("background-color","#fff")
		

	$('#DIAMINTINFOSALVOS___1').children('option:not(:first)').remove();
	$("#DIAMINTINFOSALVOS___1").css("border-color","#d1d3d4")
	$("#DIAMINTINFOSALVOS___1").css("background-color","#fff")
		
	
	$('#ORIGEMMP1INFOSALVOS___1').children('option:not(:first)').remove();
	$("#ORIGEMMP1INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#ORIGEMMP1INFOSALVOS___1").css("background-color","#fff")


	$('#ORIGEMMP2INFOSALVOS___1').children('option:not(:first)').remove();
	$("#ORIGEMMP2INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#ORIGEMMP2INFOSALVOS___1").css("background-color","#fff")
		

	$('#QTDORIGEM1INFOSALVOS___1').children('option:not(:first)').remove();
	$("#QTDORIGEM1INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#QTDORIGEM1INFOSALVOS___1").css("background-color","#fff")
		

	$('#QTDORIGEM2INFOSALVOS___1').children('option:not(:first)').remove();
	$("#QTDORIGEM2INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#QTDORIGEM2INFOSALVOS___1").css("background-color","#fff")

	$('#PESOORIGEM1INFOSALVOS___1').children('option:not(:first)').remove();
	$("#PESOORIGEM1INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PESOORIGEM1INFOSALVOS___1").css("background-color","#fff")
		

	$('#PESOORIGEM2INFOSALVOS___1').children('option:not(:first)').remove();
	$("#PESOORIGEM2INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PESOORIGEM2INFOSALVOS___1").css("background-color","#fff")

	
	$('#PRODUTORM1INFOSALVOS___1').children('option:not(:first)').remove();
	$("#PRODUTORM1INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PRODUTORM1INFOSALVOS___1").css("background-color","#fff")

	
	$('#PRODUTORM2INFOSALVOS___1').children('option:not(:first)').remove();
	$("#PRODUTORM2INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PRODUTORM2INFOSALVOS___1").css("background-color","#fff")
	
	$('#PRODUTORM3INFOSALVOS___1').children('option:not(:first)').remove();
	$("#PRODUTORM3INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PRODUTORM3INFOSALVOS___1").css("background-color","#fff")
		
	
	$('#PRODUTORM4INFOSALVOS___1').children('option:not(:first)').remove();
	$("#PRODUTORM4INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PRODUTORM4INFOSALVOS___1").css("background-color","#fff")

	
	$('#PRODUTORM5INFOSALVOS___1').children('option:not(:first)').remove();
	$("#PRODUTORM5INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PRODUTORM5INFOSALVOS___1").css("background-color","#fff")
		
	
	$('#PRODUTORM6INFOSALVOS___1').children('option:not(:first)').remove();
	$("#PRODUTORM6INFOSALVOS___1").css("border-color","#d1d3d4")
	$("#PRODUTORM6INFOSALVOS___1").css("background-color","#fff")

	// CONSTRÓI OS FILTROS
	constroiFiltrosSalvos()

}

// SALVA OS ITENS DA TABELA COM O PRODUTO SELECIONADO NO CAMPO ZOOM
function salvar(){
	
	var produtoRM1 = $("#PRODUTO_RM1").val()
	var produtoRM2 = $("#PRODUTO_RM2").val()
	var produtoRM3 = $("#PRODUTO_RM3").val()
	var produtoRM4 = $("#PRODUTO_RM4").val()
	var produtoRM5 = $("#PRODUTO_RM5").val()
	var produtoRM6 = $("#PRODUTO_RM6").val()
	
	console.log("produtoRM1: "+produtoRM1+", produtoRM2: "+produtoRM2+", produtoRM3: "+produtoRM3+", produtoRM4: "+
			produtoRM4+", produtoRM5: "+produtoRM5+", produtoRM6: "+produtoRM6)
	
	// SE NENHUM PRODUTORM FOI SELECIONADO
	if(produtoRM1=="" && produtoRM2=="" && produtoRM3=="" && produtoRM4=="" && produtoRM5=="" && produtoRM6==""){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário informar pelo menos um produto do RM para vincular aos itens da lista!',
			  text: 'Verifique e tente novamente'
		})	
		
	} else {
		// SE NÃO, SE FOI SELECIONADO, SALVA NA TABELA DE MATERIAIS SALVOS
		
		// ATIVA SPINNER
		ativaSpinner()
		
		// TEMPORIZADOR PARA O LOAD
		setTimeout(function (){
			
			// SE EXISTE ALGUM CAMPO DA ORIGEM MP VAZIO
			if(origemMPvazio()){
				
				console.log("existem campos da origemMP que estão vazios")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'É necessário preencher os campos da Origem MP antes de salvar!',
					  text: 'Verifique e tente novamente.'
				})
				
				
			} else {
				// SE NÃO, SE TODOS OS CAMPOS DA ORIGEM MP FORAM PREENCHIDOS
				
				console.log("todos os campos origemMP foram preenchidos")
				
				// SE TABELA AINDA NÃO FOI PREENCHIDA
				if($("#TABELA_SALVOS").val()==""){
					
					console.log("tabela salvos não foi usada")
					
					$("#TABELA_SALVOS").val("SIM")
					
					//
					childAdd5()
					
					//
					console.log("vou chamar a função de somar salvos agora")
					childAdd6()
					
					// EXIBE TABELA
					$(".SALVOS").show()
					
				}
				
				// PERCORRE A TABELA DA LISTA DOS MATERIAIS
				$("input[id^='POSICAO___']").each(function (index,value){
					
					var seq = $(this).attr("id").split("___")[1]
					
					console.log("seq: "+seq)
					
					// SALVA AS INFORMAÇÕES EM VARIÁVEIS
					var numDesenho = $("#NUMDESENHO___"+seq).val()
					var posicao = $("#POSICAO___"+seq).val()
					var totalQtde = $("#QUANTIDADE___"+seq).val()
					var descricao = $("#DESCRICAO___"+seq).val()
					var material = $("#MATERIAL___"+seq).val()
					var bitola = $("#BITOLA___"+seq).val()
					var largura = $("#LARGURA___"+seq).val()
					var comprimento = $("#COMPRIMENTO___"+seq).val()
					var espRosca = $("#ESPROSCA___"+seq).val()
					var pesoBruto = $("#PESOBRUTO___"+seq).val()
					var idCriacao = $("#IDCRIACAO___"+seq).val()
					var diamExt = $("#DIAMEXT___"+seq).val()
					var diamInt = $("#DIAMINT___"+seq).val()
					var obsGerais = $("#OBSGERAIS___"+seq).val()
					var produtoRM1 = $("#PRODUTO_RM1").val()
					var produtoRM2 = $("#PRODUTO_RM2").val()
					var produtoRM3 = $("#PRODUTO_RM3").val()
					var produtoRM4 = $("#PRODUTO_RM4").val()
					var produtoRM5 = $("#PRODUTO_RM5").val()
					var produtoRM6 = $("#PRODUTO_RM6").val()
					var idPrd1 = $("#IDPRD1").val()
					var idPrd2 = $("#IDPRD2").val()
					var idPrd3 = $("#IDPRD3").val()
					var idPrd4 = $("#IDPRD4").val()
					var idPrd5 = $("#IDPRD5").val()
					var idPrd6 = $("#IDPRD6").val()
					var codigoprd1 = $("#CODIGOPRD1").val()
					var codigoprd2 = $("#CODIGOPRD2").val()
					var codigoprd3 = $("#CODIGOPRD3").val()
					var codigoprd4 = $("#CODIGOPRD4").val()
					var codigoprd5 = $("#CODIGOPRD5").val()
					var codigoprd6 = $("#CODIGOPRD6").val()
					var undprd1 = $("#UNDPRD1").val()
					var undprd2 = $("#UNDPRD2").val()
					var undprd3 = $("#UNDPRD3").val()
					var undprd4 = $("#UNDPRD4").val()
					var undprd5 = $("#UNDPRD5").val()
					var undprd6 = $("#UNDPRD6").val()
					var substituto = codigoprd1

					var numOS = $("#NUM_OS").val()
					var origemMP = $("#ORIGEMMP___"+seq).val()
					
					// SE LINHA FOI FILTRADA
					if(!($("#LINHA___"+seq).hasClass("invisivel"))){
						
						// CRIA LINHA NA TABELA
						var row = childAdd3()
						
						//var idML = $("#IDML___"+seq).val()
						//var indice = $("#INDICE___"+seq).val()
					
						console.log("numDesenho: "+numDesenho+", posicao: "+posicao+", totalQtde: "+totalQtde+
								", descricao: "+descricao+", material: "+material+", bitola: "+bitola+", largura: "+largura+
								", comprimento: "+comprimento+", espRosca: "+espRosca+", pesoBruto: "+pesoBruto+", idCriacao: "+
								idCriacao+", produtoRM1: "+produtoRM1+", produtoRM2: "+produtoRM2+", produtoRM3: "+produtoRM3+", produtoRM4: "+produtoRM4+
								", produtoRM5: "+produtoRM5+", produtoRM6: "+produtoRM6+", idPrd1: "+idPrd1+", idPrd2: "+idPrd2+", codigoprd1: "+codigoprd1+
								", idPrd3: "+idPrd3+", idPrd4: "+idPrd4+", idPrd5: "+idPrd5+", idPrd6: "+idPrd6+", codigoprd2: "+codigoprd2+", codigoprd3: "+codigoprd3+
								", codigoprd4: "+codigoprd4+", codigoprd5: "+codigoprd5+", codigoprd6: "+codigoprd6+
								", numOS: "+numOS+", origemMP: "+origemMP+", undprd1: "+undprd1+", undprd2: "+undprd2+", undprd3: "+undprd3+", undprd4: "+undprd4+
								", undprd5: "+undprd5+", undprd6: "+undprd6+", obsGerais: "+obsGerais+", diamExt: "+diamExt+", diamInt: "+diamInt)
						
						// SALVA OS DADOS NA TABELA
						$("#NUMDESENHOSALVOS___"+row).val(numDesenho)
						$("#POSICAOSALVOS___"+row).val(posicao)
						$("#QUANTIDADESALVOS___"+row).val(totalQtde)
						$("#DESCRICAOSALVOS___"+row).val(descricao)
						$("#MATERIALSALVOS___"+row).val(material)
						$("#BITOLASALVOS___"+row).val(bitola)
						$("#LARGURASALVOS___"+row).val(largura)
						$("#COMPRIMENTOSALVOS___"+row).val(comprimento)
						$("#ESPROSCASALVOS___"+row).val(espRosca)
						$("#PESOBRUTOSALVOS___"+row).val(pesoBruto)
						$("#IDCRIACAOSALVOS___"+row).val(idCriacao)
						$("#NUMOSSALVOS___"+row).val(numOS)
						$("#ORIGEMMPSALVOS___"+row).val(origemMP)
						$("#DIAMEXTSALVOS___"+row).val(diamExt)
						$("#DIAMINTSALVOS___"+row).val(diamInt)
						$("#OBSGERAISSALVOS___"+row).val(obsGerais)
						
						
						// SE PRODUTORM1 NÃO FOI PREENCHIDO
						if(!(produtoRM1=="")){
							
							$("#PRODUTORM1SALVOS___"+row).val(produtoRM1)
							$("#IDPRD1SALVOS___"+row).val(idPrd1)
							$("#CODIGOPRD1SALVOS___"+row).val(codigoprd1)
							$("#UNDPRD1SALVOS___"+row).val(undprd1)
							
							// SALVA COMPONENTE
							//salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM1,idPrd1,codigoprd1,undprd1,0)
						
						}
						
						// SE PRODUTORM2 NÃO FOI PREENCHIDO
						if(!(produtoRM2=="")){
							
							$("#PRODUTORM2SALVOS___"+row).val(produtoRM2)
							$("#IDPRD2SALVOS___"+row).val(idPrd2)
							$("#CODIGOPRD2SALVOS___"+row).val(codigoprd2)
							$("#UNDPRD2SALVOS___"+row).val(undprd2)
							
							// SALVA COMPONENTE
							//salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM2,idPrd2,codigoprd2,undprd2,1)

						}
						
						// SE PRODUTORM3 NÃO FOI PREENCHIDO
						if(!(produtoRM3=="")){
							
							$("#PRODUTORM3SALVOS___"+row).val(produtoRM3)
							$("#IDPRD3SALVOS___"+row).val(idPrd3)
							$("#CODIGOPRD3SALVOS___"+row).val(codigoprd3)
							$("#UNDPRD3SALVOS___"+row).val(undprd3)
						
							// SALVA COMPONENTE
							//salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM3,idPrd3,codigoprd3,undprd3,1)

						}
						
						// SE PRODUTORM4 NÃO FOI PREENCHIDO
						if(!(produtoRM4=="")){
							
							$("#PRODUTORM4SALVOS___"+row).val(produtoRM4)
							$("#IDPRD4SALVOS___"+row).val(idPrd4)
							$("#CODIGOPRD4SALVOS___"+row).val(codigoprd4)
							$("#UNDPRD4SALVOS___"+row).val(undprd4)
							
							// SALVA COMPONENTE
							//salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM4,idPrd4,codigoprd4,undprd4,1)
									
						}
						
						// SE PRODUTORM5 NÃO FOI PREENCHIDO
						if(!(produtoRM5=="")){
							
							$("#PRODUTORM5SALVOS___"+row).val(produtoRM5)
							$("#IDPRD5SALVOS___"+row).val(idPrd5)
							$("#CODIGOPRD5SALVOS___"+row).val(codigoprd5)
							$("#UNDPRD5SALVOS___"+row).val(undprd5)
							
							// SALVA COMPONENTE
							//salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM5,idPrd5,codigoprd5,undprd5,1)
									
						}
						
						// SE PRODUTORM6 NÃO FOI PREENCHIDO
						if(!(produtoRM6=="")){
							
							$("#PRODUTORM6SALVOS___"+row).val(produtoRM6)
							$("#IDPRD6SALVOS___"+row).val(idPrd6)
							$("#CODIGOPRD6SALVOS___"+row).val(codigoprd6)
							$("#UNDPRD6SALVOS___"+row).val(undprd6)
						
							// SALVA COMPONENTE
							//salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM6,idPrd6,codigoprd6,undprd6,1)
									
						}
						
						// SALVA COMPONENTE NA LISTA DE MATERIAIS
						salvaComponenteLista(numDesenho,posicao,totalQtde,descricao,material,bitola,largura,comprimento,espRosca,pesoBruto,idCriacao,numOS,origemMP,
								diamExt,diamInt,obsGerais,produtoRM1,idPrd1,codigoprd1,undprd1,produtoRM2,idPrd2,codigoprd2,undprd2,
								produtoRM3,idPrd3,codigoprd3,undprd3,produtoRM4,idPrd4,codigoprd4,undprd4,produtoRM5,idPrd5,codigoprd5,undprd5,
								produtoRM6,idPrd6,codigoprd6,undprd6)
					
						//$("#IDML_SALVOS___"+row).val(idML)
						//$("#INDICE_SALVOS___"+row).val(indice)
						
					}
					
				})
				
				// LIMPA TODOS OS CAMPOS ZOOM
				$("#PRODUTO_RM1").val("")
				$("#PRODUTO_RM1").prop("readonly",false)
				$("#IDPRD1").val("")
				$("#UNDPRD1").val()
				$("#CODIGOPRD1").val("")
				$("#PRODUTO_RM2").val("")
				$("#PRODUTO_RM2").prop("readonly",false)
				$("#IDPRD2").val("")
				$("#UNDPRD2").val("")
				$("#CODIGOPRD2").val("")
				$("#PRODUTO_RM3").val("")
				$("#PRODUTO_RM3").prop("readonly",false)
				$("#IDPRD3").val("")
				$("#UNDPRD3").val("")
				$("#CODIGOPRD3").val("")
				$("#PRODUTO_RM4").val("")
				$("#PRODUTO_RM4").prop("readonly",false)
				$("#IDPRD4").val("")
				$("#UNDPRD4").val("")
				$("#CODIGOPRD4").val("")
				$("#PRODUTO_RM5").val("")
				$("#PRODUTO_RM5").prop("readonly",false)
				$("#IDPRD5").val("")
				$("#UNDPRD5").val("")
				$("#CODIGOPRD5").val("")
				$("#PRODUTO_RM6").val("")
				$("#PRODUTO_RM6").prop("readonly",false)
				$("#IDPRD6").val("")
				$("#UNDPRD6").val("")
				$("#CODIGOPRD6").val("")
				
				/*$("#PRODUTO_RM1>option").remove();
				$("#PRODUTO_RM1").val("")
				$("#PRODUTO_RM2>option").remove();
				$("#PRODUTO_RM2").val("")
				$("#PRODUTO_RM3>option").remove();
				$("#PRODUTO_RM3").val("")
				$("#PRODUTO_RM4>option").remove();
				$("#PRODUTO_RM4").val("")
				$("#PRODUTO_RM5>option").remove();
				$("#PRODUTO_RM5").val("")
				$("#PRODUTO_RM6>option").remove();
				$("#PRODUTO_RM6").val("")*/
				
				// APAGA A LISTA
				//apagaLista()
				
				//carregaLista()
				
				// APAGA A LISTA DE FILTROS
				apagaListaFiltros()
				apagaListaFiltrosSalvos()
				
				carregaLista()
				carregaListaSalvos()
				
				// RECONSTRÓI OS FILTROS E A LISTA
				reconstroiFiltros()
				reconstroiFiltrosSalvos()


				
				// EXIBE ALERTA
				/*var Toast = Swal.mixin({
					  toast: true,
					  position: 'center',
					  showConfirmButton: false,
					  timer: 2000,
					  timerProgressBar: true,
				})
			
				Toast.fire({
					  icon: 'success',
					  title: 'Produtos salvos com sucesso!'
				})*/
				
			}
			
			
		},1000)
				
		// DESATIVA O LOAD
		desativaSpinner()
			
	}     
	
}

// APAGA TODOS OS ITENS DA TABELA SALVOS DA LISTA DE MATERIAIS
function apagaTabelaSalvos(){
	
	// PERCORRE TODOS OS ITENS DA TABELA SALVOS DA LISTA DE MATERIAIS
	$("input[id^='NUMOSSALVOS___']").each(function(){
		
		$(this).parents("tr").remove()
		
	})
	
}

// SALVA OS COMPONENTES SALVOS NA LISTA DE MATERIAIS E NA ML DOS COMPONENTES
function salvaComponenteLista(numDesenho,posicao,totalQtde,descricao,material,bitola,largura,comprimento,espRosca,pesoBruto,idCriacao,numOS,origemMP,
		diamExt,diamInt,obsGerais,produtoRM1,idPrd1,codigoprd1,undprd1,produtoRM2,idPrd2,codigoprd2,undprd2,
		produtoRM3,idPrd3,codigoprd3,undprd3,produtoRM4,idPrd4,codigoprd4,undprd4,produtoRM5,idPrd5,codigoprd5,undprd5,
		produtoRM6,idPrd6,codigoprd6,undprd6){
	
	var c1 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("POSICAO",posicao,posicao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST)
	var c4 = DatasetFactory.createConstraint("DESCRICAO",descricao,descricao,ConstraintType.MUST)
	var c5 = DatasetFactory.createConstraint("MATERIAL",material,material,ConstraintType.MUST)
	var c6 = DatasetFactory.createConstraint("BITOLA",bitola,bitola,ConstraintType.MUST)
	var c7 = DatasetFactory.createConstraint("LARGURA",largura,largura,ConstraintType.MUST)
	var c8 = DatasetFactory.createConstraint("COMPRIMENTO",comprimento,comprimento,ConstraintType.MUST)
	var c9 = DatasetFactory.createConstraint("ESPROSCA",espRosca,espRosca,ConstraintType.MUST)
	var c10 = DatasetFactory.createConstraint("PESOBRUTO",pesoBruto,pesoBruto,ConstraintType.MUST)
	var c11 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var c12 = DatasetFactory.createConstraint("NUMOS",numOS,numOS,ConstraintType.MUST)
	var c13 = DatasetFactory.createConstraint("ORIGEMMP",origemMP,origemMP,ConstraintType.MUST)
	var c14 = DatasetFactory.createConstraint("DIAMEXT",diamExt,diamExt,ConstraintType.MUST)
	var c15 = DatasetFactory.createConstraint("DIAMINT",diamInt,diamInt,ConstraintType.MUST)
	var c16 = DatasetFactory.createConstraint("OBSGERAIS",obsGerais,obsGerais,ConstraintType.MUST)
	var c17 = DatasetFactory.createConstraint("PRODUTORM1",produtoRM1,produtoRM1,ConstraintType.MUST)
	var c18 = DatasetFactory.createConstraint("IDPRD1",idPrd1,idPrd1,ConstraintType.MUST)
	var c19 = DatasetFactory.createConstraint("CODIGOPRD1",codigoprd1,codigoprd1,ConstraintType.MUST)
	var c20 = DatasetFactory.createConstraint("UNDPRD1",undprd1,undprd1,ConstraintType.MUST)
	var c21 = DatasetFactory.createConstraint("PRODUTORM2",produtoRM2,produtoRM2,ConstraintType.MUST)
	var c22 = DatasetFactory.createConstraint("IDPRD2",idPrd2,idPrd2,ConstraintType.MUST)
	var c23 = DatasetFactory.createConstraint("CODIGOPRD2",codigoprd2,codigoprd2,ConstraintType.MUST)
	var c24 = DatasetFactory.createConstraint("UNDPRD2",undprd2,undprd2,ConstraintType.MUST)
	var c25 = DatasetFactory.createConstraint("PRODUTORM3",produtoRM3,produtoRM3,ConstraintType.MUST)
	var c26 = DatasetFactory.createConstraint("IDPRD3",idPrd3,idPrd3,ConstraintType.MUST)
	var c27 = DatasetFactory.createConstraint("CODIGOPRD3",codigoprd3,codigoprd3,ConstraintType.MUST)
	var c28 = DatasetFactory.createConstraint("UNDPRD3",undprd3,undprd3,ConstraintType.MUST)
	var c29 = DatasetFactory.createConstraint("PRODUTORM4",produtoRM4,produtoRM4,ConstraintType.MUST)
	var c30 = DatasetFactory.createConstraint("IDPRD4",idPrd4,idPrd4,ConstraintType.MUST)
	var c31 = DatasetFactory.createConstraint("CODIGOPRD4",codigoprd4,codigoprd4,ConstraintType.MUST)
	var c32 = DatasetFactory.createConstraint("UNDPRD4",undprd4,undprd4,ConstraintType.MUST)
	var c33 = DatasetFactory.createConstraint("PRODUTORM5",produtoRM5,produtoRM5,ConstraintType.MUST)
	var c34 = DatasetFactory.createConstraint("IDPRD5",idPrd5,idPrd5,ConstraintType.MUST)
	var c35 = DatasetFactory.createConstraint("CODIGOPRD5",codigoprd5,codigoprd5,ConstraintType.MUST)
	var c36 = DatasetFactory.createConstraint("UNDPRD5",undprd5,undprd5,ConstraintType.MUST)
	var c37 = DatasetFactory.createConstraint("PRODUTORM6",produtoRM6,produtoRM6,ConstraintType.MUST)
	var c38 = DatasetFactory.createConstraint("IDPRD6",idPrd6,idPrd6,ConstraintType.MUST)
	var c39 = DatasetFactory.createConstraint("CODIGOPRD6",codigoprd6,codigoprd6,ConstraintType.MUST)
	var c40 = DatasetFactory.createConstraint("UNDPRD6",undprd6,undprd6,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,
			c21,c22,c23,c24,c25,c26,c27,c28,c29,c30,c31,c32,c33,c34,c35,c36,c37,c38,c39,c40)
	
	var dataset = DatasetFactory.getDataset("dsSalvaListaMateriais",null,constraints,null)
		
}

// SALVA TODOS OS ITENS QUE FORAM SALVOS NA LISTA DE MATERIAIS E NA ML DOS COMPONENTES
function salvaLista(){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA SALVOS
	$("input[id^='NUMOSSALVOS___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SALVA OS DADOS NA TABELA
		var numDesenho = $("#NUMDESENHOSALVOS___"+seq).val()
		var posicao = $("#POSICAOSALVOS___"+seq).val()
		var totalQtde = $("#QUANTIDADESALVOS___"+seq).val()
		var descricao = $("#DESCRICAOSALVOS___"+seq).val()
		var material = $("#MATERIALSALVOS___"+seq).val()
		var bitola = $("#BITOLASALVOS___"+seq).val()
		var largura = $("#LARGURASALVOS___"+seq).val()
		var comprimento = $("#COMPRIMENTOSALVOS___"+seq).val()
		var espRosca = $("#ESPROSCASALVOS___"+seq).val()
		var pesoBruto = $("#PESOBRUTOSALVOS___"+seq).val()
		var idCriacao = $("#IDCRIACAOSALVOS___"+seq).val()
		var numOS = $("#NUMOSSALVOS___"+seq).val()
		var origemMP1 = $("#ORIGEMMP1SALVOS___"+seq).val()
		var origemMP2 = $("#ORIGEMMP2SALVOS___"+seq).val()
		var diamExt = $("#DIAMEXTSALVOS___"+seq).val()
		var diamInt = $("#DIAMINTSALVOS___"+seq).val()
		var obsGerais = $("#OBSGERAISSALVOS___"+seq).val()
		
		var produtoRM1 = $("#PRODUTORM1SALVOS___"+row).val(produtoRM1)
		var idPrd1 = $("#IDPRD1SALVOS___"+row).val(idPrd1)
		var codigoprd1 = $("#CODIGOPRD1SALVOS___"+row).val(codigoprd1)
		var undprd1 = $("#UNDPRD1SALVOS___"+row).val(undprd1)
		
		var produtoRM2 = $("#PRODUTORM2SALVOS___"+row).val()
		var idPrd2 = $("#IDPRD2SALVOS___"+row).val()
		var codigoprd2 = $("#CODIGOPRD2SALVOS___"+row).val()
		var undprd2 = $("#UNDPRD2SALVOS___"+row).val()
			
		var produtoRM3 = $("#PRODUTORM3SALVOS___"+row).val()
		var idPrd3 = $("#IDPRD3SALVOS___"+row).val()
		var codigoprd3 = $("#CODIGOPRD3SALVOS___"+row).val()
		var undprd3 = $("#UNDPRD3SALVOS___"+row).val()
		
		var produtoRM4 = $("#PRODUTORM4SALVOS___"+row).val()
		var idPrd4 = $("#IDPRD4SALVOS___"+row).val()
		var codigoprd4 = $("#CODIGOPRD4SALVOS___"+row).val()
		var undprd4 = $("#UNDPRD4SALVOS___"+row).val()

		var produtoRM5 = $("#PRODUTORM5SALVOS___"+row).val()
		var idPrd5 = $("#IDPRD5SALVOS___"+row).val()
		var codigoprd5 = $("#CODIGOPRD5SALVOS___"+row).val()
		var undprd5 = $("#UNDPRD5SALVOS___"+row).val()
		
		var produtoRM6 = $("#PRODUTORM6SALVOS___"+row).val()
		var idPrd6 = $("#IDPRD6SALVOS___"+row).val()
		var codigoprd6 = $("#CODIGOPRD6SALVOS___"+row).val()
		var undprd6 = $("#UNDPRD6SALVOS___"+row).val()
		
		console.log("numDesenho: "+numDesenho+", posicao: "+posicao+", totalQtde: "+totalQtde+", descricao: "+descricao+", material: "+material+
				", bitola: "+bitola+", largura: "+largura+", comprimento: "+comprimento+", espRosca: "+espRosca+", pesoBruto: "+pesoBruto+", idCriacao: "+idCriacao+
				", numOS: "+numOS+", origemMP: "+origemMP+", diamExt: "+diamExt+", diamInt: "+diamInt+", obsGerais: "+obsGerais+", produtoRM1: "+produtoRM1+
				", idPrd1: "+idPrd1+", codigoprd1: "+codigoprd1+", undprd1: "+undprd1+", produtoRM2: "+produtoRM2+", idPrd2: "+idPrd2+", codigoprd2: "+codigoprd2+", undprd2: "+undprd2+
				", produtoRM3: "+produtoRM3+", idPrd3: "+idPrd3+", codigoprd3: "+codigoprd3+", undprd3: "+undprd3+", produtoRM4: "+produtoRM4+", idPrd4: "+idPrd4+
				", codigoprd4: "+codigoprd4+", undprd4: "+undprd4+", produtoRM5: "+produtoRM5+", idPrd5: "+idPrd5+", codigoprd5: "+codigoprd5+", undprd5: "+undprd5+
				", produtoRM6: "+produtoRM6+", idPrd6: "+idPrd6+", codigoprd6: "+codigoprd6+", undprd6: "+undprd6)
		
		// SALVA OS COMPONENTES DA LISTA
		salvaComponenteLista(numDesenho,posicao,totalQtde,descricao,material,bitola,largura,comprimento,espRosca,pesoBruto,idCriacao,numOS,origemMP,
		diamExt,diamInt,obsGerais,produtoRM1,idPrd1,codigoprd1,undprd1,produtoRM2,idPrd2,codigoprd2,undprd2,
		produtoRM3,idPrd3,codigoprd3,undprd3,produtoRM4,idPrd4,codigoprd4,undprd4,produtoRM5,idPrd5,codigoprd5,undprd5,
		produtoRM6,idPrd6,codigoprd6,undprd6)
		
	})
	
}

// LIMPA OS ITENS QUE VIERAM DA LISTA
function limpaItensComponentesLista(){
	
	console.log("vou excluir todos os itens da tabela dos componentes")
	
	var numOS = $("#NUM_OS").val()
	
	var c1 = DatasetFactory.createConstraint("NUMOS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(c1)
	var dataset = DatasetFactory.getDataset("dsApagaListaMateriais",null,constraints,null)
	
}

// SALVA OS ITENS SALVOS NA TABELA DOS COMPONENTES
function salvaItensLista(){
	
	console.log("salva itens da lista")
	
	// LIMPA OS ITENS DA LISTA DA TABELA COMPONENTES
	limpaItensComponentesLista()
	
	// PERCORRE A TABELA DA LISTA DOS MATERIAIS
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SALVA OS DADOS NA TABELA
		var numDesenho = $("#NUMDESENHOSALVOS___"+seq).val()
		var posicao = $("#POSICAOSALVOS___"+seq).val()
		var totalQtde = $("#QUANTIDADESALVOS___"+seq).val()
		var descricao = $("#DESCRICAOSALVOS___"+seq).val()
		var material = $("#MATERIALSALVOS___"+seq).val()
		var bitola = $("#BITOLASALVOS___"+seq).val()
		var largura = $("#LARGURASALVOS___"+seq).val()
		var comprimento = $("#COMPRIMENTOSALVOS___"+seq).val()
		var espRosca = $("#ESPROSCASALVOS___"+seq).val()
		var pesoBruto = $("#PESOBRUTOSALVOS___"+seq).val()
		var idCriacao = $("#IDCRIACAOSALVOS___"+seq).val()
		var numOS = $("#NUMOSSALVOS___"+seq).val()
		var origemMP1 = $("#ORIGEMMP1SALVOS___"+seq).val()
		var origemMP2 = $("#ORIGEMMP2SALVOS___"+seq).val()
		
		var produtoRM1 = $("#PRODUTORM1SALVOS___"+seq).val()
		var idPrd1 = $("#IDPRD1SALVOS___"+seq).val()
		var codigoprd1 = $("#CODIGOPRD1SALVOS___"+seq).val()
		var undprd1 = $("#UNDPRD1SALVOS___"+seq).val()
		
		var produtoRM2 = $("#PRODUTORM2SALVOS___"+seq).val()
		var idPrd2 = $("#IDPRD2SALVOS___"+seq).val()
		var codigoprd2 = $("#CODIGOPRD2SALVOS___"+seq).val()
		var undprd2 = $("#UNDPRD2SALVOS___"+seq).val()
		
		var produtoRM3 = $("#PRODUTORM3SALVOS___"+seq).val()
		var idPrd3 = $("#IDPRD3SALVOS___"+seq).val()
		var codigoprd3 = $("#CODIGOPRD3SALVOS___"+seq).val()
		var undprd3 = $("#UNDPRD3SALVOS___"+seq).val()
	
		var produtoRM4 = $("#PRODUTORM4SALVOS___"+seq).val()
		var idPrd4 = $("#IDPRD4SALVOS___"+seq).val()
		var codigoprd4 = $("#CODIGOPRD4SALVOS___"+seq).val()
		var undprd4 = $("#UNDPRD4SALVOS___"+seq).val()
			
		var produtoRM5 = $("#PRODUTORM5SALVOS___"+seq).val()
		var idPrd5 = $("#IDPRD5SALVOS___"+seq).val()
		var codigoprd5 = $("#CODIGOPRD5SALVOS___"+seq).val()
		var undprd5 = $("#UNDPRD5SALVOS___"+seq).val()

		var produtoRM6 = $("#PRODUTORM6SALVOS___"+seq).val()
		var idPrd6 = $("#IDPRD6SALVOS___"+seq).val()
		var codigoprd6 = $("#CODIGOPRD6SALVOS___"+seq).val()
		var undprd6 = $("#UNDPRD6SALVOS___"+seq).val()
	
		var substituto = ""
		
		// SE PRODUTORM1 NÃO FOI PREENCHIDO
		if(!(produtoRM1=="" || produtoRM1==null || produtoRM1==undefined)){
			
			// SALVA COMPONENTE
			salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM1,idPrd1,codigoprd1,undprd1,0)
		
		}
		
		substituto = produtoRM1
		
		// SE PRODUTORM2 NÃO FOI PREENCHIDO
		if(!(produtoRM2=="" || produtoRM2==null || produtoRM2==undefined)){
						
			// SALVA COMPONENTE
			salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM2,idPrd2,codigoprd2,undprd2,1)

		}
		
		// SE PRODUTORM3 NÃO FOI PREENCHIDO
		if(!(produtoRM3=="" || produtoRM3==null || produtoRM3==undefined)){
						
			// SALVA COMPONENTE
			salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM3,idPrd3,codigoprd3,undprd3,1)

		}
		
		// SE PRODUTORM4 NÃO FOI PREENCHIDO
		if(!(produtoRM4=="" || produtoRM4==null || produtoRM4==undefined)){
			
			// SALVA COMPONENTE
			salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM4,idPrd4,codigoprd4,undprd4,1)
					
		}
		
		// SE PRODUTORM5 NÃO FOI PREENCHIDO
		if(!(produtoRM5=="" || produtoRM5==null || produtoRM5==undefined)){
			
			// SALVA COMPONENTE
			salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM5,idPrd5,codigoprd5,undprd5,1)
					
		}
		
		// SE PRODUTORM6 NÃO FOI PREENCHIDO
		if(!(produtoRM6=="" || produtoRM6==null || produtoRM6==undefined)){
		
			// SALVA COMPONENTE
			salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM6,idPrd6,codigoprd6,undprd6,1)
					
		}
			
	})
	
	// SALVA A LISTA SALVA NA TABELA DA LISTA DE MATERIAIS
	salvaListaMateriais()
	
}

// SALVA A LISTA SALVA NA TABELA DA LISTA DE MATERIAIS
function salvaListaMateriais(){
	
	console.log("vou salvar os itens salvos na tabela da lista de materiais")
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("NUMOS",numOS,numOS,ConstraintType.MUST);
	
	var constraints = new Array(a1);
	
	var dataset = DatasetFactory.getDataset("dsSalvaItensListaMateriais",null,constraints,null);
		
}

// SALVA COMPONENTE
function salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM,idPrd,codigoprd,undprd,op){
	
	console.log("vou salvar o componente")
	
	console.log("descricao: "+descricao+", idCriacao: "+idCriacao+", numOS: "+numOS+
			", substituto: "+substituto+", produtoRM: "+produtoRM+", idPrd: "+idPrd+", codigoprd: "+codigoprd+", undprd: "+undprd+", op: "+op)

	var qtdes
	var qtdeUnit 
	var qtdeTotal 
		
	// SE É O ITEM PRINCIPAL
	if(op==0){
		
		substituto = ""
			
		// BUSCA A QUANTIDADE DO COMPONENTE DE ACORDO COM A SELEÇÃO NA ESTRUTURA
		//qtdes = buscaQtdes(numOS,idCriacao)
		
		// BUSCA OS VALORES DAS QUANTIDADES DOS ITENS E FAZ OS CÁLCULOS PARA SEREM SALVOS NA TABELA DE COMPONENTES
		var qtdes = buscaQtdeComponentesLista(idCriacao,numOS)
		
		qtdeUnit = qtdes[0].QTDEUNIT
		qtdeTotal = qtdes[0].QTDETOTAL
		
	} else {
		// SE NÃO
		
		qtdeUnit = ''
		qtdeTotal = ''
		
	}

	console.log("qtdeUnit: "+qtdeUnit+", qtdeTotal: "+qtdeTotal)
	
	console.log("vou construir as constraints")
	
	// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O INSERT DO COMPONENTE
	var c1 = DatasetFactory.createConstraint("PRODUTOCOMPONENTES",produtoRM,produtoRM,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDPRDCOMPONENTES",idPrd,idPrd,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODIGOPRDCOMPONENTES",codigoprd,codigoprd,ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("CODUNDCOMPONENTES",undprd,undprd,ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST);
	var c6 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnit,qtdeUnit,ConstraintType.MUST);
	var c7 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotal,qtdeTotal,ConstraintType.MUST);
	var c8 = DatasetFactory.createConstraint("LISTACOMPONENTES",'L','L',ConstraintType.MUST);
	var c9 = DatasetFactory.createConstraint("INSUMOCOMPONENTES",descricao,descricao,ConstraintType.MUST);
	var c10 = DatasetFactory.createConstraint("SUBSTITUTOCOMPONENTES",substituto,substituto,ConstraintType.MUST);
	var c11 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST);
	
	var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11);
	
	var dataset = DatasetFactory.getDataset("dsInsertItemComponentesOS",null,constraints,null);
	
	console.log("fiz a inserção do componente")
	
}

// BUSCA OS VALORES DAS QUANTIDADES DOS ITENS E FAZ OS CÁLCULOS PARA SEREM SALVOS NA TABELA DE COMPONENTES
function buscaQtdeComponentesLista(idCriacao,numOS){
	
	console.log("vou buscar as quantidades dos componentes")
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
	
	var constraints = new Array(a1,a2);
	
	var dataset = DatasetFactory.getDataset("dsBuscaQtdeItemOS",null,constraints,null);
	
	var valor = dataset.values
	
	console.log("row")
	console.log(valor)
	
	var rep = valor[0]
	
	var pesoBruto = rep["PESOBRUTO"]
	var totalQtde = rep["TOTALQTDE"]
	var pesoUnit = rep["PESOUNITARIO"]
	var desQtde = rep["DESQTDE"]
	
	var qtdeUn = rep["QTDEUNCOMP"]
	
	if(qtdeUn=="PESOUNITARIO"){
		
		pesoUnit = pesoUnit.toString()
		pesoBruto = pesoBruto.toString()
		
		if(pesoUnit.includes(",")){
			
			pesoUnit = pesoUnit.replace(",",".")
			
		}
		
		if(pesoBruto.includes(",")){
			
			pesoBruto = pesoBruto.replace(",",".")
			
		}
		
		pesoUnit = parseFloat(pesoUnit).toFixed(4)
		pesoBruto = parseFloat(pesoBruto).toFixed(4)
		
		pesoBruto = parseFloat(pesoBruto)
		pesoBruto = pesoBruto.toFixed(4)
		
		qtdeUnit = pesoUnit.toString()
		qtdeUnit = pesoUnit.replace(".",",")
		qtdeTotal = pesoBruto.toString()
		qtdeTotal = pesoBruto.replace(".",",")
		
	}
	
	else if(qtdeUn=="DESENHO"){
		
		qtdeUnit =  parseInt(desQtde)
		qtdeTotal = parseInt(totalQtde)
		
	} 
	
	else {
		
		pesoUnit = pesoUnit.toString()
		pesoBruto = pesoBruto.toString()
		
		if(pesoUnit.includes(",")){
			
			pesoUnit = pesoUnit.replace(",",".")
			
		}
		
		if(pesoBruto.includes(",")){
			
			pesoBruto = pesoBruto.replace(",",".")
			
		}
		
		pesoUnit = parseFloat(pesoUnit).toFixed(4)
		pesoBruto = parseFloat(pesoBruto).toFixed(4)
		
		pesoBruto = parseFloat(pesoBruto)
		pesoBruto = pesoBruto.toFixed(4)
		
		qtdeUnit = pesoUnit.toString()
		qtdeUnit = pesoUnit.replace(".",",")
		qtdeTotal = pesoBruto.toString()
		qtdeTotal = pesoBruto.replace(".",",")
		
	}
	
	/*totalQtde = parseInt(totalQtde)
	pesoBruto = parseFloat(pesoBruto)
	pesoBruto = pesoBruto.toFixed(4)
	
	qtdeUnit = pesoBruto/totalQtde
	qtdeUnit = parseFloat(qtdeUnit)
	qtdeUnit = qtdeUnit.toFixed(4)
	qtdeUnit = qtdeUnit.toString()
	qtdeUnit = qtdeUnit.replace(".",",")
	qtdeTotal = pesoBruto*/
	
	var qtdes = new Array()
	 
	qtdes.push({QTDEUNIT:qtdeUnit,QTDETOTAL:qtdeTotal})
	
	console.log(qtdes)
	
	console.log("vou retornar qtdes")
	
	return qtdes

}

// VERIFICA SE ALGUM ITEM DA TABELA SALVOS FOI EXCLUÍDO DA ESTRUTURA
function verificaExclusaoTabelaSalvos(){
	
	console.log("entrei para verificar a exclusão da tabela SALVOS")
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	dataset = DatasetFactory.getDataset("dsBuscaIdCriacaoOS",null,constraints,null);
	
	var row = dataset.values;
	var count = dataset.values.length;
	console.log("row")
	console.log(row)

	// SE RETORNO FOR INVÁLIDO
	if(row=="" || row==null || row=="null" || row==undefined || row==NaN || row=="NaN"){
		
		console.log("não encontrei registros")
		
	} else{
		
		var arrayIds = new Array()
		
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			arrayIds.push(rep['IDCRIACAO'])
			
		}
		
		console.log("arrayIds")
		console.log(arrayIds)
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		$("input[id^='IDCRIACAOSALVOS___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var idCriacao = $("#IDCRIACAOSALVOS___"+seq).val()
			
			console.log("vou verificar se idCriacao "+idCriacao+" está na tabela salvos")
			
			// SE IDCRIACAO NÃO ESTÁ CONTIDO NO RETORNO DA CONSULTA
			if(!(arrayIds.includes(idCriacao))){
				
				console.log("vou remover o registro do idCriacao: "+idCriacao)
				
				// REMOVE A LINHA DA TABELA
				$("#LINHASALVOS___"+seq).remove()
				
			}
			
		})
	
	}
	
}

// ATUALIZA A TABELA SALVOS SEMPRE QUE O FORMULÁRIO FOR RECARREGADO
function atualizaTabelaSalvos(){
	
	var numOS = $("#NUM_OS").val()
	
	console.log("entrei para atualizar a tabela SALVOS")
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	dataset = DatasetFactory.getDataset("dsBuscaMateriaisOS",null,constraints,null);
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	// SE RETORNO FOR INVÁLIDO
	if(row=="" || row==null || row=="null" || row==undefined || row==NaN || row=="NaN"){
		
		console.log("não encontrei registros")
		
	} else{
		// SE NÃO, SE RETORNO É VÁLIDO
		
		console.log("vou percorrer os registros")
		
		// PERCORRE TODOS OS REGISTROS DA CONSULTA
		for(var i=0; i<count; i++){
			
			var rep = row[i];
			var idCriacao = rep['IDCRIACAO']
			
			// SE IDCRIACAO ESTÁ CONTIDO NA TABELA SALVOS
			if(temIdCriacao(idCriacao)){
				
				console.log("idCriacao: "+idCriacao+" está contido na tabela salvos")
				
				var seq = retornaSeq(idCriacao)
				
				var posicaoDesenho = rep["POSICAODESENHO"]
				var numdesenho = rep["NUMDESENHO"]
				var totalQtde = rep["TOTALQTDE"]
				var descricao = rep["DESCRICAO"]
				var bitola = rep["BITOLA"]
				var largura = rep["LARGURA"]
				var esprosca = rep["ESPROSCA"]
				var comprimento = rep["COMPRIMENTO"]
				var os = rep["OS"]
				var pesoBruto = rep["PESOBRUTO"]
				var material = rep["MATERIAL"]
				var execucao = rep["EXECUCAO"]
				var pesounitario = rep["PESOUNITARIO"]
				var pesoliquido = rep["PESOLIQUIDO"]
				var qtdorigemMP1 = $("#QTDORIGEM1SALVOS___"+seq).val()
				var qtdorigemMP2 = $("#QTDORIGEM2SALVOS___"+seq).val()
				
				console.log("posicaoDesenho: "+posicaoDesenho+", numdesenho: "+numdesenho+", totalQtde: "+totalQtde+", descricao: "+descricao+
						", bitola: "+bitola+", largura: "+largura+", esprosca: "+esprosca+", comprimento: "+comprimento+", os: "+os+", pesoBruto: "+
						pesoBruto+", material: "+material+", execucao: "+execucao)
				
				$("#POSICAOSALVOS___"+seq).val(posicaoDesenho)
				$("#NUMDESENHOSALVOS___"+seq).val(numdesenho)
				$("#DESCRICAOSALVOS___"+seq).val(descricao)
				$("#BITOLASALVOS___"+seq).val(bitola)
				$("#LARGURASALVOS___"+seq).val(largura)
				$("#ESPROSCASALVOS___"+seq).val(esprosca)
				$("#COMPRIMENTOSALVOS___"+seq).val(comprimento)
				$("#NUMOSSALVOS___"+seq).val(os)
				$("#MATERIALSALVOS___"+seq).val(material)
				
				// SE PESOBRUTO NÃO É VÁLIDO
				if(!(pesoBruto=="" || pesoBruto==NaN || pesoBruto=="NaN" || pesoBruto==null || pesoBruto=="null")){

					if(pesoBruto.includes(",")){
						
						pesoBruto = pesoBruto.replace(",",".")
						
					}
					
					execucao = parseInt(execucao)
					
					pesoBruto = parseFloat(pesoBruto)
					pesoBruto = pesoBruto.toFixed(4)
					
					pesoBruto = pesoBruto * execucao
					
					pesoBruto = pesoBruto.toFixed(4)
					
					pesoBruto = pesoBruto.toString().replace(".",",")
					
				}

				// SE PESOUNITARIO NÃO É VÁLIDO
				if(!(pesounitario=="" || pesounitario==NaN || pesounitario=="NaN" || pesounitario==null || pesounitario=="null")){

					if(pesounitario.includes(",")){
						
						pesounitario = pesounitario.replace(",",".")
						
					}
					
					execucao = parseInt(execucao)
					
					pesounitario = parseFloat(pesounitario)
					pesounitario = pesounitario.toFixed(4)
					
					pesounitario = pesounitario * execucao
					
					pesounitario = pesounitario.toFixed(4)
					
					pesounitario = pesounitario.toString().replace(".",",")
					
				}

				// SE PESOLIQUIDO NÃO É VÁLIDO
				if(!(pesoliquido=="" || pesoliquido==NaN || pesoliquido=="NaN" || pesoliquido==null || pesoliquido=="null")){

					if(pesoliquido.includes(",")){
						
						pesoliquido = pesoliquido.replace(",",".")
						
					}
					
					execucao = parseInt(execucao)
					
					pesoliquido = parseFloat(pesoliquido)
					pesoliquido = pesoliquido.toFixed(4)
					
					pesoliquido = pesoliquido * execucao
					
					pesoliquido = pesoliquido.toFixed(4)
					
					pesoliquido = pesoliquido.toString().replace(".",",")
					
				}

				// SE QUANTIDADE NÃO É VÁLIDO
				if(!(totalQtde=="" || totalQtde==NaN || totalQtde=="NaN" || totalQtde==null || totalQtde=="null")){

					if(totalQtde.includes(",")){
						
						totalQtde = totalQtde.replace(",",".")
						
					}
					
					execucao = parseInt(execucao)
					
					totalQtde = parseFloat(totalQtde)
					totalQtde = totalQtde.toFixed(4)
					
					totalQtde = totalQtde * execucao
					
					totalQtde = totalQtde.toFixed(4)
					
					totalQtde = totalQtde.toString().replace(".",",")
					
				}

				// SE QTDORIGEMMP1 NÃO É VAZIO OU NULO
				if(!(qtdorigemMP1=="" || qtdorigemMP1==null || qtdorigemMP1==undefined || qtdorigemMP1=="null")){

					$("#QTDORIGEM1SALVOS___"+seq).val(qtdorigemMP1)
					var a = isNaN(parseFloat(qtdorigemMP1.replace(",",".")) * parseFloat(pesounitario.replace(",","."))) ? '0,0000' : parseFloat(qtdorigemMP1.replace(",",".")) * parseFloat(pesounitario.replace(",","."))

					a = a.toString()

					if(a.includes(".")){

						a = Math.round(parseFloat(a)*10000)/10000
						a = a.toString()
						a = a.replace(".",",")

					}
					else if(!a.includes(",")){

						a = a + ',0000'

					}

					$("#PESOORIGEM1SALVOS___"+seq).val(a) 
					
				}
				else{

					$("#QTDORIGEM1SALVOS___"+seq).val("0,0000")
					$("#PESOORIGEM1SALVOS___"+seq).val("0,0000")

				}

				// SE QTDORIGEMMP2 NÃO É VAZIO OU NULO
				if(!(qtdorigemMP2=="" || qtdorigemMP2==null || qtdorigemMP2==undefined || qtdorigemMP2=="null")){

					$("#QTDORIGEM2SALVOS___"+seq).val(qtdorigemMP2)
					var a = isNaN(parseFloat(qtdorigemMP2.replace(",",".")) * parseFloat(pesounitario.replace(",","."))) ? '0,0000' : parseFloat(qtdorigemMP2.replace(",",".")) * parseFloat(pesounitario.replace(",","."))

					a = a.toString()

					if(a.includes(".")){

						a = Math.round(parseFloat(a)*10000)/10000
						a = a.toString()
						a = a.replace(".",",")

					}
					else if(!a.includes(",")){

						a = a + ',0000'

					}

					$("#PESOORIGEM2SALVOS___"+seq).val(a)
					
				}
				else{

					$("#QTDORIGEM2SALVOS___"+seq).val("0,0000")
					$("#PESOORIGEM2SALVOS___"+seq).val("0,0000")

				}

				$("#PESOLIQUIDOSALVOS___"+seq).val(pesoliquido)
				$("#PESOBRUTOUNITARIOSALVOS___"+seq).val(pesounitario)
				$("#QUANTIDADESALVOS___"+seq).val(totalQtde)
				$("#PESOBRUTOSALVOS___"+seq).val(pesoBruto)
				
			}
			
		}
		
	}
	
}

//LOCALIZA O ITEM CLICADO NO MENU SUPERIOR
function LocalizaItem(obj){

	var cor = $(obj).children().next().attr("id").toString();

	console.log("cor: " + cor)

	if(cor=="AMARELO"){

		setTimeout(function(){
			document.getElementsByClassName("custom-checkbox-warning")[0].scrollIntoView({
				behavior: "smooth", // or "auto" or "instant"
				block: "center", // or "end"
				inline : "center",
			});
		},100)

	}
	else if(cor == "VERDE"){

		setTimeout(function(){
			document.getElementsByClassName("custom-checkbox-success")[0].scrollIntoView({
				behavior: "smooth", // or "auto" or "instant"
				block: "center", // or "end"
				inline : "center",
			});
		},100)

	}
	else if(cor == "VERMELHO"){

		setTimeout(function(){
			document.getElementsByClassName("custom-checkbox-danger")[0].scrollIntoView({
				behavior: "smooth", // or "auto" or "instant"
				block: "center", // or "end"
				inline : "center",
			});
		},100)

	}

}

function AtualizaDash(){

	$("#AMARELO").text(0)
	$("#VERDE").text(0)
	$("#VERMELHO").text(0)


	$("input[id^='CODIFICADOSALVOS___']").each(function(){

		if($(this).parent().hasClass("custom-checkbox-warning")){

			$("#AMARELO").text( Number($("#AMARELO").text()) + 1 )

		}
		else if($(this).parent().hasClass("custom-checkbox-success")){

			$("#VERDE").text( Number($("#VERDE").text()) + 1 )

		}
		else if($(this).parent().hasClass("custom-checkbox-danger")){

			$("#VERMELHO").text( Number($("#VERMELHO").text()) + 1 )

		}

		
	})

}

// RETORNA O SEQ DA TABELA SALVOS REFERENTE AO IDCRIACAO
function retornaSeq(idCriacao){
	
	var seqTabela = 0
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='IDCRIACAOSALVOS___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idCriacaoTabela = $("#IDCRIACAOSALVOS___"+seq).val()
		
		// SE IDCRIACAO DA TABELA É IGUAL AO IDCRIACAO
		if(idCriacaoTabela==idCriacao){
			
			seqTabela = seq
			
		}
		
	})
	
	seqTabela = parseInt(seqTabela)
	
	return seqTabela
	
	
}

// VERIFICA SE IDCRIACAO ESTÁ CONTIDO NA TABELA SALVOS
function temIdCriacao(idCriacao){
	
	var ret = false
	
	console.log("vou buscar o idCriacao: "+idCriacao)
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idCriacaoTabela = $("#IDCRIACAOSALVOS___"+seq).val()
		
		// SE IDCRIACAO DA TABELA É IGUAL AO IDCRIACAO
		if(idCriacaoTabela==idCriacao){
			
			ret = true
			
		}
		
	})
	
	if(ret){
		
		console.log("encontrei")
	}
	else {
		
		console.log("não encontrei")
	}
	
	return ret
	
}

// VERIFICA SE A TABELA JÁ TEM ITENS
function tabelaTemItens(op){
	
	// VARIÁVEL PARA CONTROLE
	var itens = false;
	
	// SE TABELA GERAL
	if(op==0){
		
		// PERCORRE A TABELA E VERIFICA SE TEM ITENS
		$('input[id^="NUMDESENHO___"]').each(function(index, value){
			
			itens = true
			
		})
		
	}
	
	// SE TABELA SALVOS
	if(op==1){
		
		// PERCORRE A TABELA E VERIFICA SE TEM ITENS
		$('input[id^="NUMDESENHOSALVOS___"]').each(function(index, value){
			
			itens = true
			
		})
		
	}
	
	return itens
	
}

// VERIFICA SE OS JÁ FOI VINCULADA A ALGUMA LISTA DE MATERIAIS
function verificaOS(numOS){
	
	console.log("vou verificar se OS já está vinculada na tabela salvos")
	
	var ret = false
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	dataset = DatasetFactory.getDataset("dsVerificaListaMateriaisOS",null,constraints,null);
	
	var row = dataset.values;
	console.log("row: "+row)
	var count = dataset.values.length;
	
	// SE RETORNO FOR INVÁLIDO
	if(row=="" || row==null || row=="null" || row==undefined || row==NaN || row=="NaN"){
		
		ret = true
		
	}
	
	console.log("a OS está "+ret+" liberada")
	
	return ret
	
}

// CALCULA O TOTAL DE PESOLIQUIDO
function calculaPesoLiquido(){
	
	console.log("vou calcular o comprimento")
	
	var soma = 0
	soma = parseFloat(soma)
	
		
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
			
			var comp = $("#PESOLIQUIDOSALVOS___"+seq).val()
			
			// COMPRIMENTO É UM VALOR VÁLIDO
			if(!(comp=="" || comp=="NaN" || comp==NaN || comp==undefined || comp==null)){
				
				comp = comp.replace(",",".")
				comp = parseFloat(comp)
				
				// SOMA TODOS OS COMPRIMENTOS
				soma = soma + comp
			
			}
			
		}
		
	})
				
	soma = soma.toFixed(4)
	soma = soma.replace(".",",")
	
	console.log("comp: "+soma)

	// SALVA O TOTAL NO CAMPO DA SOMA
	$("#SOMAPESOLIQUIDOSALVOS___1").val(soma)
	
	
}

// CALCULA O TOTAL DE COMPRIMENTO
function calculaComprimento(op){
	
	console.log("vou calcular o comprimento")
	
	var soma = 0
	soma = parseFloat(soma)
	
	// SE TABELA GERAL
	if(op==0){
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		$("input[id^='NUMDESENHO___']").each(function (index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			if(!($("#LINHA___"+seq).hasClass("invisivel"))){
				
				var comp = $("#COMPRIMENTO___"+seq).val()
				
				// COMPRIMENTO É UM VALOR VÁLIDO
				if(!(comp=="" || comp=="NaN" || comp==NaN || comp==undefined || comp==null)){
					
					comp = comp.replace(",",".")
					comp = parseFloat(comp)
					
					// SOMA TODOS OS COMPRIMENTOS
					soma = soma + comp
				
				}
				
			}
			
		})
					
		soma = soma.toFixed(4)
		soma = soma.replace(".",",")
		console.log("comp: "+soma)
		
		// SALVA O TOTAL NO CAMPO DA SOMA
		$("#SOMACOMPRIMENTO___1").val(soma)
		
	}
	
	// SE TABELA SALVOS
	if(op==1){
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		$("input[id^='NUMDESENHOSALVOS___']").each(function (index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
				
				var comp = $("#COMPRIMENTOSALVOS___"+seq).val()
				
				// COMPRIMENTO É UM VALOR VÁLIDO
				if(!(comp=="" || comp=="NaN" || comp==NaN || comp==undefined || comp==null)){
					
					comp = comp.replace(",",".")
					comp = parseFloat(comp)
					
					// SOMA TODOS OS COMPRIMENTOS
					soma = soma + comp
				
				}
				
			}
			
		})
					
		soma = soma.toFixed(4)
		soma = soma.replace(".",",")
		
		console.log("comp: "+soma)
	
		// SALVA O TOTAL NO CAMPO DA SOMA
		$("#SOMACOMPRIMENTOSALVOS___1").val(soma)
	
	}
	
}

// CALCULA O TOTAL DO PESO
function calculaPeso(op){
	
	console.log("vou calcular o peso")
	
	var soma = 0
	soma = parseFloat(soma)
	
	// SE TABELA GERAL
	if(op==0){
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		$("input[id^='NUMDESENHO___']").each(function (index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			if(!($("#LINHA___"+seq).hasClass("invisivel"))){
				
				var peso = $("#PESOBRUTO___"+seq).val()
				
				// SE PESO É UM VALOR VÁLIDO
				if(!(peso=="" || peso=="NaN" || peso==NaN || peso==undefined || peso==null)){
					
					peso = peso.replace(",",".")
					peso = parseFloat(peso)
					
					// SOMA TODOS OS PESOS
					soma = soma + peso
				
				}
				
			}
			
		})
		
		soma = soma.toFixed(4)
		soma = soma.replace(".",",")
		
		console.log("peso: "+soma)
		
		// SALVA O TOTAL NO CAMPO DA SOMA
		$("#SOMAPESO___1").val(soma)
		
	}
	
	// SE TABELA SALVOS
	if(op==1){
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		$("input[id^='NUMDESENHOSALVOS___']").each(function (index, value){
			
			var seq = $(this).attr("id").split("___")[1]
			
			if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
				
				var peso = $("#PESOBRUTOSALVOS___"+seq).val()
				
				// SE PESO É UM VALOR VÁLIDO
				if(!(peso=="" || peso=="NaN" || peso==NaN || peso==undefined || peso==null)){
				
					peso = peso.replace(",",".")
					peso = parseFloat(peso)
					
					// SOMA TODOS OS PESOS
					soma = soma + peso
				
				}
				
			}
			
		})
		
		soma = soma.toFixed(4)
		soma = soma.replace(".",",")
		
		console.log("peso: "+soma)
		
		// SALVA O TOTAL NO CAMPO DA SOMA
		$("#SOMAPESOSALVOS___1").val(soma)
		
	}
	
}

// CALCULA O TOTAL DA QUANTIDADE DA ORIGEM1
function calculaQtdOrigem1(){
	
	console.log("vou calcular o peso")
	
	var soma = 0
	soma = parseFloat(soma)

	
		
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
			
			var peso = $("#QTDORIGEM1SALVOS___"+seq).val()
			
			// SE PESO É UM VALOR VÁLIDO
			if(!(peso=="" || peso=="NaN" || peso==NaN || peso==undefined || peso==null)){
			
				peso = peso.replace(",",".")
				peso = parseFloat(peso)
				
				// SOMA TODOS OS PESOS
				soma = soma + peso
			
			}
			
		}
		
	})
	
	soma = soma.toFixed(4)
	soma = soma.replace(".",",")
	
	console.log("peso: "+soma)
	
	// SALVA O TOTAL NO CAMPO DA SOMA
	$("#SOMAQTDORIGEM1SALVOS___1").val(soma)

	calculaPesoTotalOrigem1()
	
}

// CALCULA O TOTAL DA QUANTIDADE DA ORIGEM1
function calculaQtdOrigem2(){
	
	console.log("vou calcular o peso")
	
	var soma = 0
	soma = parseFloat(soma)
		
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
			
			var peso = $("#QTDORIGEM2SALVOS___"+seq).val()
			
			// SE PESO É UM VALOR VÁLIDO
			if(!(peso=="" || peso=="NaN" || peso==NaN || peso==undefined || peso==null)){
			
				peso = peso.replace(",",".")
				peso = parseFloat(peso)
				
				// SOMA TODOS OS PESOS
				soma = soma + peso
			
			}
			
		}
		
	})
	
	soma = soma.toFixed(4)
	soma = soma.replace(".",",")
	
	console.log("peso: "+soma)
	
	// SALVA O TOTAL NO CAMPO DA SOMA
	$("#SOMAQTDORIGEM2SALVOS___1").val(soma)

	calculaPesoTotalOrigem2()
	
	
}

// CALCULA O TOTAL DA QUANTIDADE DA ORIGEM1
function calculaPesoTotalOrigem1(){
	
	console.log("vou calcular o peso")
	
	var soma = 0
	soma = parseFloat(soma)

	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
			
			var peso = $("#PESOORIGEM1SALVOS___"+seq).val()
			
			// SE PESO É UM VALOR VÁLIDO
			if(!(peso=="" || peso=="NaN" || peso==NaN || peso==undefined || peso==null)){
			
				peso = peso.replace(",",".")
				peso = parseFloat(peso)
				
				// SOMA TODOS OS PESOS
				soma = soma + peso
			
			}
			
		}
		
	})
	
	soma = soma.toFixed(4)
	soma = soma.replace(".",",")
	
	console.log("peso: "+soma)
	
	// SALVA O TOTAL NO CAMPO DA SOMA
	$("#SOMAPESOORIGEM1SALVOS___1").val(soma)
	
}

// CALCULA O TOTAL DA QUANTIDADE DA ORIGEM1
function calculaPesoTotalOrigem2(){
	
	console.log("vou calcular o peso")
	
	var soma = 0
	soma = parseFloat(soma)


	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOSALVOS___']").each(function (index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
			
			var peso = $("#PESOORIGEM2SALVOS___"+seq).val()
			
			// SE PESO É UM VALOR VÁLIDO
			if(!(peso=="" || peso=="NaN" || peso==NaN || peso==undefined || peso==null)){
			
				peso = peso.replace(",",".")
				peso = parseFloat(peso)
				
				// SOMA TODOS OS PESOS
				soma = soma + peso
			
			}
			
		}
		
	})
	
	soma = soma.toFixed(4)
	soma = soma.replace(".",",")
	
	console.log("peso: "+soma)
	
	// SALVA O TOTAL NO CAMPO DA SOMA
	$("#SOMAPESOORIGEM2SALVOS___1").val(soma)
	
}

$('.ScrollWrapper').on('scroll', function(){
	  var _left = $(this).scrollLeft();
	  $('.ScrollWrapper').scrollLeft(_left)
})

// SINCRONIZA O MOVIMENTO DO SCROLL DO FILTRO E DA TABELA
/*function scrollSincronizado(){
	
	console.log("entrei para sincronizar scroll")
	
	var array = $('.target1'); //Retorna um array com todos elementos com o id target1
	var t1 = array[0];
	var t2 = array[1];
	
	//no console imprime o elemento com os dados completo
//	console.log(t1);
//	console.log(t2); 
	
	//nao executa a funcao no scroll da div, porque?
	$(t1).scroll(function() {
		//console.log("entrou na funcao");
		t2.scrollTo(0,$(t1).scrollTop());
	});
}*/

// EXCLUI TODOS OS ITENS FILTRADOS DA LISTA SALVOS
function excluir(){
	
	console.log("vou excluir itens filtrados da tabela salvos")
	
	// EXIBE ALERTA
	Swal.fire({
	
		  title: 'Tem certeza que deseja remover os itens filtrados?',
		  text: "Atenção, essa ação não poderá ser desfeita.",
		  icon: 'warning',
		  showCancelButton: true,
		  allowEscapeKey: true,
		  allowOutsideClick: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sim',
		  cancelButtonText: 'Cancelar',
		
	}).then(function(result){
		
		  // SE SIM
		  if (result.value) {
			
		    // ATIVA O LOAD
		    ativaSpinner()
		    
		    // FAZ OPERAÇÃO DA FUNÇÃO EM TEMPO DETERMINADO
		    setTimeout(function() {
		    	
		    	// PERCORRE A TABELA DOS ITENS QUE FORAM SALVOS
				$("input[id^='NUMDESENHOSALVOS___']").each(function (index, value){
					
					console.log("vou percorrer tabela de salvos")
					var seq = $(this).attr("id").split("___")[1]

					// SE LINHA NÃO ESTÁ INVISÍVEL
					if(!($("#LINHASALVOS___"+seq).hasClass("invisivel"))){
					
						console.log("vou remover LINHA_SALVOS___"+seq)
						$("#LINHASALVOS___"+seq).remove();
					
					}
					
				})
				
			    // APAGA A LISTA
			    //apagaLista()
			    //apagaListaSalvos()
			    
			    // APAGA OS FILTORS
			    apagaListaFiltros()
			    apagaListaFiltrosSalvos()
			    
			    // CARREGA A LISTA
			    carregaLista()
			    carregaListaSalvos()
			    
			    // CONSTRÓI OS FILTROS
			    reconstroiFiltros()
			    reconstroiFiltrosSalvos()
		    	
		    },500)
		    					    
		    // DESATIVA O LOAD
		    desativaSpinner()
		    
		    // EXIBE ALERTA DA REMOÇÃO 
		    Swal.fire(
		      'Itens removidos!',
		      'success'
		    )
		    
		  } 
	  
	})
	   
}

// VERIFICA SE TABELA DE ITENS SALVOS TEM ITENS
function tabelaSalvosTemItens(){
	
	console.log("vou verificar se tabela salvos tem itens")
	
	var itens = 0
	var numos= $("#NUM_OS").val()

	if(numos!="" && numos!=undefined && numos!=null){

		// PERCORRE A TABELA DE ITENS SALVOS
		$("input[id^='NUMDESENHOSALVOS___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			itens += 1
			
		})
		
		// SE ITENS É MAIOR QUE 0, TEM ITENS
		if(itens>0){
			
			console.log("vou retornar que tabela tem itens")
			return true
			
		} else {
			// SE NÃO, ESTÁ VAZIA
			console.log("vou retornar que tabela não tem itens")
			return false
		
		}

	}
	else{

		return false

	}
	
	
	
	console.log("terminei função de verificar se tabela tem itens")
	
}

// LIMPA O CONTEÚDO DO ZOOM 1
function limpar(campo,op){

	if(campo!=null){

		var seq = $(campo).next().attr("id").split("___")[1]

		console.log("vou limpar produto "+op+" seq"+seq)
	
		if($("#LINHASALVOS___"+seq).hasClass("linha_selecionada")){
	
			$("#PRODUTORM"+op+"SALVOS___"+seq).val("")
			//$("#PRODUTORM"+op+"SALVOS___"+seq).prop("readonly",false)
			$("#IDPRD"+op+"SALVOS___"+seq).val("")
			$("#CODIGOPRD"+op+"SALVOS___"+seq).val("")
			$("#UNDPRD"+op+"SALVOS___"+seq).val("")
		
		}

	}
	else{

		$("#PRODUTO_RM"+op).val("")
		$("#IDPRD"+op).val("")
		$("#CODIGOPRD"+op).val("")
		$("#UNDPRD"+op).val("")
		//$("#PRODUTO_RM"+op).prop("readonly",false)

	}
	
	// if(op==1){
		
	// 	$("#PRODUTO_RM1").val("")
	// 	$("#IDPRD1").val("")
	// 	$("#CODIGOPRD1").val("")
	// 	$("#PRODUTO_RM1").prop("readonly",false)
		
	// }
	
	// if(op==2){
		
	// 	$("#PRODUTO_RM2").val("")
	// 	$("#IDPRD2").val("")
	// 	$("#CODIGOPRD2").val("")
	// 	$("#PRODUTO_RM2").prop("readonly",false)
		
	// }
	
	// if(op==3){
		
	// 	$("#PRODUTO_RM3").val("")
	// 	$("#IDPRD3").val("")
	// 	$("#CODIGOPRD3").val("")
	// 	$("#PRODUTO_RM3").prop("readonly",false)
		
	// }

	// if(op==4){
		
	// 	$("#PRODUTO_RM4").val("")
	// 	$("#IDPRD4").val("")
	// 	$("#CODIGOPRD4").val("")
	// 	$("#PRODUTO_RM4").prop("readonly",false)
		
	// }

	// if(op==5){
		
	// 	$("#PRODUTO_RM5").val("")
	// 	$("#IDPRD5").val("")
	// 	$("#CODIGOPRD5").val("")
	// 	$("#PRODUTO_RM5").prop("readonly",false)
		
	// }

	// if(op==6){
		
	// 	$("#PRODUTO_RM6").val("")
	// 	$("#IDPRD6").val("")
	// 	$("#CODIGOPRD6").val("")
	// 	$("#PRODUTO_RM6").prop("readonly",false)
		
	// }
		
}

// ORDENA O ARRAY ROW DOS REGISTROS PELO CAMPO POSIÇÃO
function ordenaRowPosicao(row,count){
	
	var novoRow = new Array()
	var arrayPosicoes = new Array()
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS E PREENCHE A TABELA COM OS DADOS
	for(var i=0; i < count; i++){
		
		var rep = row[i];
		var posicao = rep['POSICAODESENHO']
		var idCriacao = rep['IDCRIACAO']
		
		//var idCriacao = rep['IDCRIACAO']
		
		//posicao = posicao+"."+idCriacao
		
		//arrayPosicoes.push(posicao)
		
		arrayPosicoes.push({posicao:""+posicao+"",idCriacao:""+idCriacao+""})
	
	}
	
	console.log(arrayPosicoes)
	
	arrayPosicoes = montarEstrutura(arrayPosicoes)
	
	/*for(var j=0; j<arrayPosicoes.length; j++){
		
		for(var l=0; l<count; l++){
			
			var rep = row[l]
			
			var posicao = rep['POSICAODESENHO']
			var idCriacao = rep['IDCRIACAO']
			
			if()
			
			
		}
		
		
	}*/
	
	var salvos = new Array()
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS E PREENCHE A TABELA COM OS DADOS DE ACORDO COM A ORDENAÇÃO DAS POSIÇÕES
	for(var k=0; k < arrayPosicoes.length; k++){
		
		var arrayOrdenado = arrayPosicoes[k] 
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i < count; i++){
			
			//var posicaoArray = arrayPosicoes[k]
			//posicaoArray = array.substr(0,array.lastIndexOf("."))
			//var idArray = array.substr(array.lastIndexOf(".")+1,array.length)
			
			var rep = row[i];
			
			var posicao = rep['POSICAODESENHO']
			var idCriacao = rep['IDCRIACAO'] 
			
			// var concat = posicao+"P"+idCriacao
			// && !salvos.includes(concat)
			
			// SE A POSIÇÃO É A POSIÇÃO DO REGISTRO
			if(posicao==arrayOrdenado.posicao && idCriacao==arrayOrdenado.idCriacao){
				
				novoRow.push(row[i])
				//salvos.push(concat)
				
			}
			
		}
		
	}
	
	return novoRow
	
}

// MONTA A ESTRUTURA DA ÁRVORE DE ACORDO COM OS ÍNDICES
function montarEstrutura(indices){
	
	// ARRAY PARA SALVAR A ORDENAÇÃO
	var salvos = new Array()
	var pais = geraPaisIndices(indices)
	console.log("pais: "+pais)
	
	// ENQUANTO O ARRAY NÃO ESTIVER VAZIO
	while(indices.length>0){
		
		var indice = indices[0]
		
		console.log("array não está vazio")
		
		// MONTAR PAI
		novaMontarPai(indice.posicao,indices,salvos,pais)
		//novaMontarPai(indices[0],indices,salvos)
		
	}
	
	return salvos
	
}

//
function geraPaisIndices(indices){
	
	var pais = new Array()
	var pai = ""
	
	console.log(indices)
	
	console.log(indices[1].posicao)
	console.log("tamanho indices: "+indices.length)
	
	for(var k=0; k<indices.length; k++){
		
		var str = indices[k].posicao.toString()
		console.log(str)
		//str = str.toString()
		
		if(str.includes(".")){

			pai = str.substr(0,str.lastIndexOf("."))
			
		} else {
			
			pai = str
			
		}
		
		pais.push(pai)
		
	}
	
	/*for(var i=0; i<indices.length; i++){
		
		if(indices[i].includes(".")){
			
			pai = indices[i].substr(0,indices[i].lastIndexOf("."))
			
		} else {
			
			pai = indices[i]
			
		}
		
		pais.push(pai)
		
	}*/
	
	return pais
	
}

// FUNÇÃO PARA CONSTRUIR A ESTRUTURA DA ÁRVORE
function novaMontarPai(indice,indices,salvos,pais){
	
	console.log("entrei para montar Pai")
	
	// ENQUANTO INDICE TEM PAI E PAI TEM IRMAO ESQUERDA
	while(idTemPai(indice,indices,0)){
		
		// VARIÁVEL PARA O PAI
		var pai = idTemPai(indice,indices,1)
		
		console.log(indice.posicao+" tem Pai: "+pai)
		
		while(idTemIrmaoEsqPai(indice.posicao, indices, pais, 0)){
			
			var irmaoEsq = idTemIrmaoEsqPai(pai, indices, 1)
			
			// MONTA O PAI
			novaMontarPai(pai,indices,salvos)
			
		}
		
	}
	
	console.log(indice+" não tem pai")
	
	// ENQUANTO ÍNDICE TEM IRMÃO À ESQUERDA
	while(idTemIrmaoEsq(indice,indices,0)){
		
		// VARIÁVEL PARA O IRMÃO À ESQUERDA
		var irmaoEsq = idTemIrmaoEsq(indice,indices,1)
		
		console.log(indice+" tem IrmãoEsq: "+irmaoEsq)
		
		// MONTA O PAI
		novaMontarPai(irmaoEsq,indices,salvos)
		
	}
	
	console.log(indice+" não tem Irmao esquerda")
	
	// SE SALVOS NÃO CONTÉM ÍNDICE
	if(salvos.indexOf(indice)==-1){
		
		console.log("salvos não contém "+indice)
		
		// SALVA O ÍNDICE
		salvos.push(indice)
		
		console.log("salvei "+indice)
		console.log(salvos)
		
		// REMOVE O ELEMENTO DO ARRAY
		var index = indices.indexOf(indice)
		console.log("index: "+index)
		indices.splice(indices.indexOf(indice),1)
		pais.splice(index,1)
		
		console.log("vou remover "+indice)
		console.log(indices)
		
		// ENQUANTO ÍNDICE TEM GÊMEO
		while(idTemGemeo(indice,indices,0)){
			
			// VARIÁVEL PARA O IRMÃO GÊMEO
			var gemeo = idTemGemeo(indice,indices,1)
			
			console.log(indice+" tem gemeo: "+gemeo)
			
			// SALVA O ÍNDICE
			salvos.push(indice)
			
			// REMOVE O ELEMENTO DO ARRAY
			var index = indices.indexOf(indice)
			indices.splice(indices.indexOf(indice),1)
			pais.splice(index,1)
			
			console.log("vou remover "+indice)
			console.log(indices)
			console.log("vou salvar")
			console.log(salvos)
			
		}
		
	}
	
	// ENQUANTO ÍNDICE TEM FILHO
	while(idTemFilho(indice,indices,0)){
				
		// VARIÁVEL PARA O FILHO
		var filho = idTemFilho(indice,indices,1)
	
		console.log(indice+" tem Filho: "+filho)

		// MONTA O PAI
		novaMontarPai(filho,indices,salvos)
		
	}
	
	console.log(indice+" não tem filho")

}

//BUSCA SE TEM PAI E RETORNA DE ACORDO COM A CHAMADA  
function idTemPai(indice,indices,op){
	
	// FLAG PARA CONTROLE
	var temPai = false
	var pai = ""
		
	if(indice.includes(".")){
		
		temPai = true
		
		// VARIÁVEL PARA GUARDAR O PAI
		var pai = indice.substr(0,indice.lastIndexOf("."))
	
	}
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temPai
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		return pai
		
	}	
	
	/*if(indice.includes(".")){
		
		temPai = true
		
		// VARIÁVEL PARA GUARDAR O PAI
		var pai = indice.substr(0,indice.lastIndexOf("."))
	
	}
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temPai
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		return pai
		
	}*/
	
}

//BUSCA SE TEM IRMÃO À ESQUERDA DE ACORDO COM A CHAMADA
function idTemIrmaoEsqPai(indice,indices,pais,op){
	
	// FLAG PARA CONTROLE
	var temIrmaoEsquerda = true
	var flag = true
	
	// VARIÁVEL PARA GUARDAR O IRMÃO À ESQUERDA
	var irmaoEsq = ""
	var nivel = ""
	var posicao = ""
	var menorIrmaoEsq = ""
		
	if(indice.includes(".")){
		nivel = indice.substr(0,indice.lastIndexOf("."))
		posicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
		posicao = parseInt(posicao)
			
	} else {
		
		posicao = indice
		posicao = parseInt(posicao)
		
	}
	
	//console.log(nivel+" é o pai de "+indice)
	
	// ENQUANTO POSIÇÃO É MAIOR OU IGUAL A 0 E NÃO CONTIDA NO ARRAY
	while(posicao>=0){
	
		posicao = posicao-1
		posicao = posicao.toString()
		//posicao = posicao.toString()
		
		if(nivel==""){
			
			irmaoEsq = posicao
			//console.log("irmaoEsq "+irmaoEsq)
			
		}else{
			
			irmaoEsq = nivel+"."+posicao
			//console.log("irmaoEsq "+irmaoEsq)
		}
		
		//console.log(indice+" tem irmão a esquerda "+irmaoEsq)
		
		if(!(pais.indexOf(irmaoEsq)==-1)){
			
			//console.log("encontrei o irmao esquerda de "+indice+" é o "+irmaoEsq)
			menorIrmaoEsq = irmaoEsq	
			
		} 
		
		posicao = parseInt(posicao)
		
	}
	
	//console.log("sai do loop irmao e o irmao esquerda encontrado é o "+irmaoEsq)
	
	// SE NÃO EXISTE IRMÃO À ESQUERDA
	if(menorIrmaoEsq==""){
		
		temIrmaoEsquerda = false
		
	}
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temIrmaoEsquerda
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		return menorIrmaoEsq
		
	}
	
}

// BUSCA SE TEM IRMÃO À ESQUERDA DE ACORDO COM A CHAMADA
function idTemIrmaoEsq(indice,indices,op){
	
	// FLAG PARA CONTROLE
	var temIrmaoEsquerda = true
	var flag = true
	
	// VARIÁVEL PARA GUARDAR O IRMÃO À ESQUERDA
	var irmaoEsq = ""
	var nivel = indice.substr(0,indice.lastIndexOf("."))
	var posicao = ""
	
	// SE NÍVEL É VAZIO
	if(nivel==""){
		
		posicao = indice
		posicao = parseInt(posicao)
		
	} else {
		
		posicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
		posicao = parseInt(posicao)
		
	}
	
	//console.log(nivel+" é o pai de "+indice)
	
	// ENQUANTO POSIÇÃO É MAIOR OU IGUAL A 0 E NÃO CONTIDA NO ARRAY
	while(posicao>=0 && flag){
	
		posicao = posicao-1
		posicao = posicao.toString()
		//posicao = posicao.toString()
		
		if(nivel==""){
			
			irmaoEsq = posicao
			//console.log("irmaoEsq "+irmaoEsq)
			
		}else{
			
			irmaoEsq = nivel+"."+posicao
			//console.log("irmaoEsq "+irmaoEsq)
		}
		
		//console.log(indice+" tem irmão a esquerda "+irmaoEsq)
		
		if(!(indices.indexOf(irmaoEsq)==-1)){
			
			//console.log("encontrei o irmao esquerda de "+indice+" é o "+irmaoEsq)
			flag = false	
			
		} 
		
		posicao = parseInt(posicao)
		
	}
	
	//console.log("sai do loop irmao e o irmao esquerda encontrado é o "+irmaoEsq)
	
	// SE NÃO EXISTE IRMÃO À ESQUERDA
	if(indices.indexOf(irmaoEsq)==-1){
		
		temIrmaoEsquerda = false
		
	}
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temIrmaoEsquerda
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		return irmaoEsq
		
	}
	
}

// BUSCA SE TEM GÊMEO DE ACORDO COM A CHAMADA
function idTemGemeo(indice,indices,op){
	
	// FLAG PARA CONTROLE
	var temGemeo = true
	var flag = true
	
	// VARIÁVEL PARA GUARDAR O IRMÃO À ESQUERDA
	var gemeo = indice
	//var nivel = indice.substr(0,indice.lastIndexOf("."))
	//var posicao = ""
	
	// SE NÃO EXISTE GÊMEO
	if(indices.indexOf(gemeo)==-1){
		
		temGemeo = false
		
	}
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temGemeo
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		return gemeo
		
	}
	
}

// BUSCA SE TEM FILHO DE ACORDO COM A CHAMADA
function idTemFilho(indice,indices,op){
	
	// FLAG PARA CONTROLE
	var temFilho = true
	var filho = ""
		
	var pontos = indice.replace(/[^.]/g, "").length
	pontos = pontos + 1
	//console.log("pontos: "+pontos)
	// PERCORRE O ARRAY DE ÍNDICES
	
	for(var k=0; k < indices.length; k++){
		
		var pontosAr = indices[k].posicao.replace(/[^.]/g, "").length
		//console.log("pontosAr: "+pontosAr)
		// SE QUANTIDADE DE PONTOS É IGUAL AO DO FILHO
		if(pontosAr==pontos){
			
			var paiIndice = indices[k].posicao.substr(0,indices[k].posicao.lastIndexOf("."))
			//console.log("indices[k]: "+indices[k])
			// VERIFICA SE ÍNDICE PODE SER FILHO DO ÍNDICE ATUAL
			if(paiIndice==indice){
				
				filho = indices[k]
				//console.log("filho: "+filho)
				
			}
			
		}
		
	}
	
	// SE NÃO EXISTE IRMÃO À ESQUERDA
	if(indices.indexOf(filho)==-1){
		
		temFilho = false
		
	}
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temFilho
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		return filho
		
	}
	
}

//
function incluiFiltros(){
	
	// $('#PRODUTORM1INFOSALVOS___1').attr('id', 'ORIGEMMPINFOSALVOS___1');
	// $('#PRODUTORM2INFOSALVOS___1').attr('id', 'PRODUTORM1INFOSALVOS___1');
	// $('#PRODUTORM3INFOSALVOS___1').attr('id', 'PRODUTORM2INFOSALVOS___1');
	// $('#PRODUTORM4INFOSALVOS___1').attr('id', 'PRODUTORM3INFOSALVOS___1');
	// $('#PRODUTORM5INFOSALVOS___1').attr('id', 'PRODUTORM4INFOSALVOS___1');
	// $('#PRODUTORM6INFOSALVOS___1').attr('id', 'PRODUTORM5INFOSALVOS___1');
	// $('#OBSGERAISINFOSALVOS___1').attr('id', 'PRODUTORM6INFOSALVOS___1');
	
	//$('#NUMDESENHOINFO___1').append('<option value="">'+""+'</option>')
	// $('#POSICAOINFO___1').append('<option value="">'+""+'</option>')
	// $('#TOTALQTDEINFO___1').append('<option value="">'+""+'</option>')
	// $('#DESCRICAOINFO___1').append('<option value="">'+""+'</option>')
	// $('#MATERIALINFO___1').append('<option value="">'+""+'</option>')
	// $('#BITOLAINFO___1').append('<option value="">'+""+'</option>')
	// $('#LARGURAINFO___1').append('<option value="">'+""+'</option>')
	// $('#COMPRIMENTOINFO___1').append('<option value="">'+""+'</option>')
	// $('#ESPROSCAINFO___1').append('<option value="">'+""+'</option>')
	// $('#PESOBRUTOINFO___1').append('<option value="">'+""+'</option>')
	// $('#ORIGEMMPINFO___1').append('<option value="">'+""+'</option>')
	
	
	$("#PEDIDOCOMPRAINFOSALVOS___1").append('<option value="">'+""+'</option>')
	$("PEDIDOCOMPRAINFOSALVOS___1").append('<option value="">'+""+'</option>')
	$('#NUMDESENHOINFOSALVOS___1').append('<option value="">'+""+'</option>')
	$('#POSICAOINFOSALVOS___1').append('<option value="">'+""+'</option>')
	$('#TOTALQTDEINFOSALVOS___1').append('<option value="">'+""+'</option>')
	$('#DESCRICAOINFOSALVOS___1').append('<option value="">'+""+'</option>')
	$('#MATERIALINFOSALVOS___1').append('<option value="">'+""+'</option>')
	$('#BITOLAINFOSALVOS___1').append('<option value="">'+""+'</option>')
	$('#LARGURAINFOSALVOS___1').append('<option value="">'+""+'</option>')
	$('#COMPRIMENTOINFOSALVOS___1').append('<option value="">'+""+'</option>')
	$('#ESPROSCAINFOSALVOS___1').append('<option value="">'+""+'</option>')
	$('#MASSALINEARINFOSALVOS___1').append('<option value="">'+""+'</option>')
	$('#PESOBRUTOINFOSALVOS___1').append('<option value="">'+""+'</option>')
	$("#DIAMEXTINFOSALVOS___1").append('<option value="">'+""+'</option>')
	$("#DIAMINTINFOSALVOS___1").append('<option value="">'+""+'</option>')
	$("#ORIGEMMP1INFOSALVOS___1").append('<option value="">'+""+'</option>')
	$("#ORIGEMMP2INFOSALVOS___1").append('<option value="">'+""+'</option>')
	$("#QTDORIGEM1INFOSALVOS___1").append('<option value="">'+""+'</option>')
	$("#QTDORIGEM2INFOSALVOS___1").append('<option value="">'+""+'</option>')
	$("#PRODUTORM1INFOSALVOS___1").append('<option value="">'+""+'</option>')
	$("#PRODUTORM2INFOSALVOS___1").append('<option value="">'+""+'</option>')
	$("#PRODUTORM3INFOSALVOS___1").append('<option value="">'+""+'</option>')
	$("#PRODUTORM4INFOSALVOS___1").append('<option value="">'+""+'</option>')
	$("#PRODUTORM5INFOSALVOS___1").append('<option value="">'+""+'</option>')
	$("#PRODUTORM6INFOSALVOS___1").append('<option value="">'+""+'</option>')
	
}

// VERIFICA SE PRODUTO JÁ FOI SELECIONADO
function prdDuplicado(codigoPrd,tipo){
	
	console.log("verifica se o produto já foi salvo como principal ou substituto")
	
	console.log("codigoPrd: "+codigoPrd+", tipo: "+tipo)

	var seq = tipo.split('___')[2]
	
	var ret = false

	for (var i = 1; i < 6; i++) {
		
		if(i!=tipo.split('___')[1]){

			var prd1 = $("#CODIGOPRD"+i+"SALVOS___"+seq).val()

			if(prd1==codigoPrd){
			
				ret = true
				break;
				
			}

		}
		
	}
	
	// if(!(tipo.split('___')[1]=="1")){
		
	// 	var prd1 = $("#CODIGOPRD1SALVOS___"+seq).val()
		
	// 	if(prd1==codigoPrd){
			
	// 		ret = true
			
	// 	}
		
	// }
	
	// if(!(tipo.split('___')[1]=="2")){
		
	// 	var prd2 = $("#CODIGOPRD2").val()
		
	// 	if(prd2==codigoPrd){
			
	// 		ret = true
			
	// 	}
		
	// }
	
	// if(!(tipo.split('___')[1]=="3")){
		
	// 	var prd3 = $("#CODIGOPRD3").val()
		
	// 	if(prd3==codigoPrd){
			
	// 		ret = true
			
	// 	}
		
	// }
	
	// if(!(tipo.split('___')[1]=="4")){
		
	// 	var prd4 = $("#CODIGOPRD4").val()
		
	// 	if(prd4==codigoPrd){
			
	// 		ret = true
			
	// 	}
		
	// }
	
	// if(!(tipo.split('___')[1]=="5")){
		
	// 	var prd5 = $("#CODIGOPRD5").val()
		
	// 	if(prd5==codigoPrd){
			
	// 		ret = true
			
	// 	}
		
	// }
	
	// if(!(tipo.split('___')[1]=="6")){
		
	// 	var prd6 = $("#CODIGOPRD6").val()
		
	// 	if(prd6==codigoPrd){
			
	// 		ret = true
			
	// 	}
		
	// }
	
	console.log("tem produto "+codigoPrd+" duplicado? "+ret)
	
	return ret
	
}

//
function apagaFiltros(){
	
	console.log("vou apagar o conteúdo de todos os filtros")
	
	/*$('#NUMDESENHOINFO___1').children().remove();
	$('#POSICAOINFO___1').children().remove();
	$('#TOTALQTDEINFO___1').children().remove();
	$('#DESCRICAOINFO___1').children().remove();
	$('#MATERIALINFO___1').children().remove();
	$('#BITOLAINFO___1').children().remove();
	$('#LARGURAINFO___1').children().remove();
	$('#COMPRIMENTOINFO___1').children().remove();
	$('#ESPROSCAINFO___1').children().remove();
	$('#PESOBRUTOINFO___1').children().remove();
	$('#ORIGEMMPINFO___1').children().remove();
	
	$('#NUMDESENHOINFOSALVOS___1').children().remove();
	$('#POSICAOINFOSALVOS___1').children().remove();
	$('#TOTALQTDEINFOSALVOS___1').children().remove();
	$('#DESCRICAOINFOSALVOS___1').children().remove();
	$('#MATERIALINFOSALVOS___1').children().remove();
	$('#BITOLAINFOSALVOS___1').children().remove();
	$('#LARGURAINFOSALVOS___1').children().remove();
	$('#COMPRIMENTOINFOSALVOS___1').children().remove();
	$('#ESPROSCAINFOSALVOS___1').children().remove();
	$('#PESOBRUTOINFOSALVOS___1').children().remove();
	$("#PRODUTORM1INFOSALVOS___1").children().remove();
	$("#PRODUTORM2INFOSALVOS___1").children().remove();
	$("#PRODUTORM3INFOSALVOS___1").children().remove();
	$("#PRODUTORM4INFOSALVOS___1").children().remove();
	$("#PRODUTORM5INFOSALVOS___1").children().remove();
	$("#PRODUTORM6INFOSALVOS___1").children().remove();*/
	
	$('#NUMDESENHOINFO___1').val("");
	$('#POSICAOINFO___1').val("");
	$('#TOTALQTDEINFO___1').val("");
	$('#DESCRICAOINFO___1').val("");
	$('#MATERIALINFO___1').val("");
	$('#BITOLAINFO___1').val("");
	$('#LARGURAINFO___1').val("");
	$('#COMPRIMENTOINFO___1').val("");
	$('#ESPROSCAINFO___1').val("");
	$('#PESOBRUTOINFO___1').val("");
	$('#ORIGEMMPINFO___1').val("");
	
	$('#NUMDESENHOINFOSALVOS___1').val("");
	$('#POSICAOINFOSALVOS___1').val("");
	$('#TOTALQTDEINFOSALVOS___1').val("");
	$('#DESCRICAOINFOSALVOS___1').val("");
	$('#MATERIALINFOSALVOS___1').val("");
	$('#BITOLAINFOSALVOS___1').val("");
	$('#LARGURAINFOSALVOS___1').val("");
	$('#COMPRIMENTOINFOSALVOS___1').val("");
	$('#ESPROSCAINFOSALVOS___1').val("");
	$('#MASSALINEARINFOSALVOS___1').val("");
	$('#PESOBRUTOINFOSALVOS___1').val("");
	$("#ORIGEMMP1INFOSALVOS___1").val("");
	$("#ORIGEMMP2INFOSALVOS___1").val("");
	$("#QTDORIGEM1INFOSALVOS___1").val("");
	$("#QTDORIGEM2INFOSALVOS___1").val("");
	$("#PRODUTORM1INFOSALVOS___1").val("");
	$("#PRODUTORM2INFOSALVOS___1").val("");
	$("#PRODUTORM3INFOSALVOS___1").val("");
	$("#PRODUTORM4INFOSALVOS___1").val("");
	$("#PRODUTORM5INFOSALVOS___1").val("");
	$("#PRODUTORM6INFOSALVOS___1").val("");
	
	reconstroiFiltros()
	reconstroiFiltrosSalvos()
	
}

// FUNÇÃO PARA ESCONDER A OPÇÃO DE INICIAR SOLICITAÇÃO COM BASE NA ATUAL
parent.$('.wcm-all-content').bind('DOMNodeInserted', function(e){
	
   // QUANDO APARECER A TELA DE "SOLICITAÇÃO INICIADA COM SUCESSO" IRÁ ENTRAR NESSE IF
   if (e.target.id == 'message-page') {
	  
    // ESCONDE A OPÇÃO DE "INICIAR SOLICITAÇÃO COM BASE NESTA"
    parent.$('[data-reset-process-instance-id]').hide()
    
  }	
  
})

// COLOCA A BORDA NA SELEÇÃO DO ONMOUSEOVER
function colocaBordaSelecao(obj){
	
	$(obj).parent().css("border-style","dotted")
	$(obj).parent().css("border-width","1px")
	$(obj).parent().css("background","#c8c8c8")

}

// TIRA A SELEÇÃO CSS DO TEXTO ONMOUSEOUT
function tiraSelecao(obj) {
	
	//console.log("entrei para tirar a seleção do texto")
	
	$(obj).parent().css("border","none")
	$(obj).parent().css("background","#f0f0f0")
	
}

// CALCULA O PESO DA ORIGEM
function CalculaPesoOrigem(obj,op){

	// EXIBE ALERTA
	var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 2000,
			timerProgressBar: true,
	})


	var seq = $(obj).attr("id").split("___")[1]

	console.log("seq do pesoorigem:"+seq)

	var qtd1 =  isNaN(parseInt($("#QTDORIGEM1SALVOS___"+seq).val())) ? 0 : parseInt($("#QTDORIGEM1SALVOS___"+seq).val());
	var qtd2 =  isNaN(parseInt($("#QTDORIGEM2SALVOS___"+seq).val())) ? 0 : parseInt($("#QTDORIGEM2SALVOS___"+seq).val());
	var qtdtotal = parseInt($("#QUANTIDADESALVOS___"+seq).val())

	console.log("qtd1: " + qtd1 + " qtd2: "+qtd2 + " qtdtotal: " + qtdtotal)
	
	if( qtd1 + qtd2 > qtdtotal ){

		Toast.fire({
			icon: 'error',
			title: 'Quantidade Inválida para origem!'
		})
		$(obj).val(0+",0000")

	}
	else if(qtd1 < 0 || qtd2 < 0){

		Toast.fire({
			icon: 'error',
			title: 'Quantidade Inválida para origem!'
		})
		$(obj).val(0+",0000")

	}
	else{

		if(op==1){

			$(obj).val(qtd1+",0000")

		}
		else{

			$(obj).val(qtd2+",0000")

		}

	}



	if(op==1){

		$("#PESOORIGEM1SALVOS___"+seq).val((parseInt($("#QTDORIGEM1SALVOS___"+seq).val()) * parseFloat($("#PESOBRUTOUNITARIOSALVOS___"+seq).val().replace(",",".")))+",0000")
		calculaQtdOrigem1()

	}
	else{

		$("#PESOORIGEM2SALVOS___"+seq).val((parseInt($("#QTDORIGEM2SALVOS___"+seq).val()) * parseFloat($("#PESOBRUTOUNITARIOSALVOS___"+seq).val().replace(",",".")))+",0000")
		calculaQtdOrigem2()

	}

}

function CadastroComponente(){

	var pesquisa=document.getElementById("produto");

	if($(".SALVOS").is(":visible")){

		if($("#TEMCADASTRO").val()==0){
			pesquisa.style.display='block';
			$("#TEMCADASTRO").val(1)
		}
		else if($("#TEMCADASTRO").val()==1) {
			pesquisa.style.display='none';
			$("#TEMCADASTRO").val(0)
		}

	}

}

function adicionaLinhaProdRM(){

	var seq = Number($(".TABELA_PROD_RM").children("tbody").children().length)+1 ;

	var str = '<tr> '+                                             
			'	<td> '+
			'		<input type="text" title="" onmouseover="mouse(this);" id="RM_CODIGOPRD___'+seq+'" name="RM_CODIGOPRD___'+seq+'" class="form-control" readonly> '+
			'	</td> '+
			'	<td> '+
			'		<input type="text" title="" onmouseover="mouse(this);" id="RM_DESCRICAO___'+seq+'" name="RM_DESCRICAO___'+seq+'" class="form-control" readonly> '+
			'	</td> '+
			'</tr> '

	$(".TABELA_PROD_RM").children("tbody").append(str)

	return seq;

}

function carregaProdutoRM(obj) {

	var seq = $(obj).attr("id").split("___")[1]

	var numOS = $("#NUM_OS").val()
	var desenho = $("#NUMDESENHOSALVOS___"+seq).val()
	var posicao = $("#POSICAOSALVOS___"+seq).val()
	
	var ret = false
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("DESENHO",desenho,desenho,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("POSICAO",posicao,posicao,ConstraintType.MUST);

	var constraints = new Array(c1,c2,c3);
	
	dataset = DatasetFactory.getDataset("dsBuscaCodEstruturaPrincipal",null,constraints,null);
	
	var row = dataset.values;
	var count = row.length;
	
	$(".TABELA_PROD_RM").children("tbody").empty();

	for (var i = 0; i < count; i++) {	

		var rep = row[i];
		
		var seq2 = adicionaLinhaProdRM()

		if(rep["TIPODESENHO"]=="NAOMANUFATURADO"){

			$("#RM_CODIGOPRD___"+seq2).val("NÃO MANUFATURADO")
			$("#RM_DESCRICAO___"+seq2).val(rep["OBSPROCESSO"])

		}
		else{
		
			$("#RM_CODIGOPRD___"+seq2).val(rep["CODIGOPRD"])
			$("#RM_DESCRICAO___"+seq2).val(rep["PRODUTORM"])

		}
		
	}
	
}

function recarregaModalCompra(){

	var seq = $("#SELECTPEDIDODECOMPRA").val()
	var seq1 = seq.split("___")[0]
	var seq2 = seq.split("___")[1]

	console.log("recarregaModalCompra: "+seq1+"___"+seq2)

	carregaModalCompra($("#PEDIDOCOMPRASALVOS___"+seq1).next().children(),seq2)

}

function carregaModalCompra(obj,u){
	
	var seq = $(obj).parent().parent().parent().parent().attr("id").split("___")[1]

	console.log("seq: " + seq)

	var numeromov_array = $("#PEDIDOCOMPRASALVOS___"+seq).val()
	numeromov_array = numeromov_array.replace(/ */g,"")

	numeromov_array = numeromov_array.split(/[^\d]/gi).filter(function(value){return value != ''})

	$("#SELECTPEDIDODECOMPRA").empty()

	for (var j = 0; j < numeromov_array.length; j++) {

		$("#SELECTPEDIDODECOMPRA").append('<option class="info" value="'+seq+'___'+j+'">'+numeromov_array[j]+'</option>')

	}

	$("#SELECTPEDIDODECOMPRA").val(seq+"___"+u)

	var numeromov = numeromov_array[u]

	var numOS = $("#NUM_OS").val()

	var testDataTemplate =  new Array();

	var c1 = DatasetFactory.createConstraint("IDMOV",numeromov,numeromov,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("NUMOS",numOS,numOS,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODTMV",'PC-SOLUM','PC-SOLUM',ConstraintType.MUST);

	var constraints = new Array(c1,c2,c3);
	
	var dataset = DatasetFactory.getDataset("dsConsultaMovimento",null,constraints,null);
	
	var row = dataset.values
	var count1 = row.length

	if(count1 > 0) {

		var rep1 = row[0]

		testDataTemplate.push(
			{

			id : rep1["IDMOV"],
			nomemov : rep1["NOME"], 
			codtmov : rep1["CODTMV"], 
			idmov : rep1["IDMOV"],
			numeromov: rep1["NUMEROMOV"], 
			statusmov: rep1["STATUS"], 
			parent: 0

			}
		)

		var numeromov = new Array();
			
		for (var z = 0; z < count1; z++) {

			var rep2 = row[z]

			if(!numeromov.includes(rep1["MOVGERADO"])){

				numeromov.push(rep1["MOVGERADO"])

				// CONSULTA BANCO
				var c1 = DatasetFactory.createConstraint("IDMOV",rep2["MOVGERADO"],rep2["MOVGERADO"],ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("CODTMOV",rep1["CODMOVGERADO"],rep1["CODMOVGERADO"],ConstraintType.MUST);
			
				var constraints = new Array(c1,c2);
				
				var dataset = DatasetFactory.getDataset("dsRastreabilidadeMovimentos",null,constraints,null);
			
				var row = dataset.values
				var count = row.length
			
				for(var i=0;i<count;i++){
			
					var rep = row[i]
			
					console.log("Mov "+(+count+1)+": " + rep);
			
					testDataTemplate.push(
						{
			
						id : rep["IDMOV"],
						nomemov : rep["NOME"], 
						codtmov : rep["CODTMV"], 
						idmov : rep["IDMOV"],
						numeromov: rep["NUMEROMOV"], 
						statusmov: rep["STATUS"], 
						parent: i == 0 ? rep2["IDMOV"] : rep["PAI"]
			
						}
					)
			
				}
			
				console.log("DATA : "+ testDataTemplate);


			}
		
		}

		var settingsTemplate = {
			data: testDataTemplate,
			template: '.my_template_orgchart'
		}

		var testOrgChartTemplate = FLUIGC.orgChart('.RASTREABILIDADE', settingsTemplate);

		testOrgChartTemplate.on('fluig.orgchart.node.click', function(node){

			console.log(node);
			console.log(node.data.idmov);
			console.log(node.data.codtmov);

			var loading = FLUIGC.loading('.MOVIMENTOS');

			loading.show();

			setTimeout(function(){
				carregaTabela(node.data.idmov,$("#CODCOLIGADA").val(),node.data.codtmov)

				// Do something

				loading.hide()

			},500)



		});
		

		console.log(rep1["IDMOV"]);
		console.log(rep1["CODTMV"]);

		carregaTabela(rep1["IDMOV"],$("#CODCOLIGADA").val(),rep1["CODTMV"])

	}
	else{

		// EXIBE ALERTA
		var Toast = Swal.mixin({
				toast: true,
				position: 'center',
				showConfirmButton: false,
				timer: 2000,
				timerProgressBar: true,
		})
	
		Toast.fire({
				icon: 'error',
				title: 'Dados não encontrados!'
		})


	}

}

// FUNÇÃO PARA PERIODICAMENTE ATUALIZAR OS CHECKBOXES DE REVISÂO
function AtualizaRevisao(){

	var numOs = $("#NUM_OS").val()
	var codcoligada = $("#CODCOLIGADA").val()

	var a1 = DatasetFactory.createConstraint("OS",numOs,numOs,ConstraintType.MUST)

	var constraints = new Array(a1)

	var dataset = DatasetFactory.getDataset("dsBuscaRevisaoListaOs",null,constraints,null)

	var row = dataset.values
	var count = row.length
	var revisao = new Array()

	if(count > 0){

		for (var i = 0; i < count; i++) {
			
			var revisao
			
		}


	}

	$("input[id^='IDCRIACAOSALVOS___']").each(function(){



	})



}

function carregaTabela(idmov,codcoligada,codtmv){

	setTimeout(function(){

		$("[node-id='"+idmov+"']")[0].scrollIntoView({
			behavior: "smooth", // or "auto" or "instant"
			block: "center", // or "end"
			inline: "center",
		});

	},100)


	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("IDMOV",idmov,idmov,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("COLIGADA",codcoligada,codcoligada,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODTMV",codtmv,codtmv,ConstraintType.MUST);
	var numOS = $("#NUM_OS").val()
	var c4 = DatasetFactory.createConstraint("NUMOS",numOS,numOS,ConstraintType.MUST);

	var constraints = new Array(c1,c2,c3,c4);
	
	var dataset = DatasetFactory.getDataset("dsConsultaMovimento",null,constraints,null);

	var row = dataset.values
	var count = row.length

	if(count > 0){

		limpaTabelaMovimento()

		for(var i=0;i<count;i++) {
			
			var rep = row[i]

			var seq = adicionaLinhaMovimento()

			if (i==0) {
				
				$("#IDENTIFICADOR").val(rep["IDMOV"])
				$("#STATUS").val(rep["STATUS"])
				$("#TIPODOMOVIMENTO").val(rep["CODTMV"])
				$("#DESCRICAODOMOVIMENTO").val(rep["DESCMOV"])
				$("#DATACRIACAO").val(rep["DATAEMISSAO"])
				$("#USUARIO").val(rep["RECCREATEDBY"])
				$("#DATAENTREGA").val(rep["DATAENTREGA"])
				$("#CLASSIFICACAO").val(rep["CLASSIFICACAO"])
				$("#SERIE").val(rep["SERIE"])
				$("#COLIGADA").val(rep["CODCOLIGADA"])
				$("#FILIAL").val(rep["CODFILIAL"])
				$("#NUMERO").val(rep["NUMEROMOV"])
				$("#MOEDA").val(rep["CODMOEVALORLIQUIDO"])
				$("#VALORBRUTO").val(rep["VALORBRUTO"])
				$("#VALORLIQUIDO").val(rep["VALORLIQUIDO"])

			}

			$("#IDPRD___"+seq).val(rep["IDPRD"])
			$("#CODIGOPRD___"+seq).val(rep["CODIGOPRD"])
			$("#QUANTIDADETOTAL___"+seq).val(rep["QUANTIDADETOTAL"])
			$("#QUANTIDADEARECEBER___"+seq).val(rep["QUANTIDADEARECEBER"])
			$("#DESCRICAO___"+seq).val(rep["DESCRICAO"])
			$("#CODUND___"+seq).val(rep["CODUND"])
			$("#VALORBRUTOITEM___"+seq).val(parseFloat(rep["VALORBRUTOITEM"]).toFixed(4))
			$("#CODCCUSTO___"+seq).val(rep["CODCCUSTO"])
			$("#DSCCUSTO___"+seq).val(rep["DSCCUSTO"])
			$("#PERCENTUAL___"+seq).val(parseFloat(rep["PERCENTUAL"]).toFixed(2)+'%')
			$("#NOMEITEM___"+seq).val(rep["NOME"])
			$("#OBSPEDIDO___"+seq).val(rep["OBSPEDIDO"])
			$("#OBSITEM___"+seq).val(rep["OBSITEM"])
			$("#NUMLOTE___"+seq).val(rep["NUMLOTE"])
			$("#QTDLOTE___"+seq).val(parseFloat(rep["QUANTIDADE_LOTE"]).toFixed(4))

			
		}
	
	}
	

}

function limpaTabelaMovimento(){

	$(".TABELA_MOVIMENTO").children("tbody").empty()

}

function adicionaLinhaMovimento(){

	var seq = Number($(".TABELA_MOVIMENTO").children("tbody").children().length) + 1

	var str = '<tr> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="IDPRD___'+seq+'" name="IDPRD___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="CODIGOPRD___'+seq+'" name="CODIGOPRD___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="QUANTIDADETOTAL___'+seq+'" name="QUANTIDADETOTAL___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="QUANTIDADEARECEBER___'+seq+'" name="QUANTIDADEARECEBER___'+seq+'" readonly></td> '+ 
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="DESCRICAO___'+seq+'" name="DESCRICAO___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="CODUND___'+seq+'" name="CODUND___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="VALORBRUTOITEM___'+seq+'" name="VALORBRUTOITEM___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="CODCCUSTO___'+seq+'" name="CODCCUSTO___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="DSCCUSTO___'+seq+'" name="DSCCUSTO___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="PERCENTUAL___'+seq+'" name="PERCENTUAL___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="NOMEITEM___'+seq+'" name="NOMEITEM___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="OBSPEDIDO___'+seq+'" name="OBSPEDIDO___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="OBSITEM___'+seq+'" name="OBSITEM___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="NUMLOTE___'+seq+'" name="NUMLOTE___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="QTDLOTE___'+seq+'" name="QTDLOTE___'+seq+'" readonly></td> '+
			 ' </tr> '

	$(".TABELA_MOVIMENTO").children("tbody").append(str)

	return seq;

}


window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key===' ') {

		// Cancel the default action, if needed
		event.preventDefault();
        // do something here
		CadastroComponente();
    }
});

// VERIFICA SE EXISTEM ITENS COM SUBSTITUTOS MAS SEM PRINCIPAL
function ItensSemPrincipalComSubstituto(){

	var ret = false

	$("input[id^='NUMDESENHOSALVOS___']").each(function(){

		var seq =  $(this).attr("id").split("___")[1]

		console.log("seq = " + seq)

		var verifica = 0

		for(var i=1;i < 7; i++){

			var idprd = $("#IDPRD"+i+"SALVOS___"+seq).val()

			console.log("idprd "+i+" valor :" + idprd) 

			if(i == 1 && (idprd == "" || idprd == null || idprd == undefined )){

				verifica = 1

			}
			else if(i != 1 && (idprd != "" && idprd != null && idprd != undefined ) && verifica == 1){

				ret = true;

			}
	

		}


	})

	return ret;


}