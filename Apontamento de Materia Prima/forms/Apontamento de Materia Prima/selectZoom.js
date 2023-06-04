// SE ITEM É REMOVIDO DO CAMPO ZOOM
function setSelectedZoomItem(selectedItem){        
	
	var input = selectedItem.inputId;
	//CRM.validaCampo($("#" + input));
	
	console.log("entrei no setSelectedZoomItem")
	
	if(!(selectedItem.inputId==undefined)){

		$("#" + selectedItem.inputId).parents("div").first().find("label").addClass("active2")
		

		// SE A OS É REMOVIDA
		if(selectedItem.inputId.indexOf("FILIAL")!="-1"){

			var input = selectedItem.inputId.split("FILIAL")
			console.log(input)

			//modal de edição
			if(input[0]!=""){

				$("#" + input[0]+"CODFILIAL"+input[1]).val(selectedItem.CODFILIAL)
				reloadZoomFilterValues(input[0]+"CODCCUSTO"+input[1],"CODFILIAL,"+selectedItem.CODFILIAL)
				$("#"+input[0]+"CODCCUSTO"+input[1]).prop("disabled",false)

			}
			else{

				$("#CODFILIAL"+input[1]).val(selectedItem.CODFILIAL)
				reloadZoomFilterValues("CODCCUSTO"+input[1],"CODFILIAL,"+selectedItem.CODFILIAL)
				$("#"+"CODCCUSTO"+input[1]).prop("disabled",false)

			}
		
		}
		else if(selectedItem.inputId.indexOf("CODCCUSTO")!="-1"){

			var input = selectedItem.inputId.split("CODCCUSTO")
			console.log(input)

			//modal de edição
			if(input[0]!=""){

				$("#" + input[0]+"CODPRJ"+input[1]).val(selectedItem.OS)
				$("#" + input[0]+"CODCOLIGADA"+input[1]).val(selectedItem.CODCOLIGADA)

				if(input[1]=='PAPC'){

					reloadZoomFilterValues(input[0]+"NUMPLANO"+input[1],"CODCCUSTO,"+selectedItem.OS+",CODCOLIGADA,"+selectedItem.CODCOLIGADA+",CODFILIAL,"+$("#" + input[0]+"CODFILIAL"+input[1]).val())
					$("#"+input[0]+"NUMPLANO"+input[1]).prop("disabled",false)

				}else{

					reloadZoomFilterValues(input[0]+"CODORDEM"+input[1],"CODCCUSTO,"+selectedItem.OS+",TIRARMPRJ,1")
					$("#"+input[0]+"CODORDEM"+input[1]).prop("disabled",false)

				}

			}
			else{

				$("#CODPRJ"+input[1]).val(selectedItem.OS)
				$("#CODCOLIGADA"+input[1]).val(selectedItem.CODCOLIGADA)

				if(input[1]=='PAPC'){

					reloadZoomFilterValues("NUMPLANO"+input[1],"CODCCUSTO,"+selectedItem.OS+",CODCOLIGADA,"+selectedItem.CODCOLIGADA+",CODFILIAL,"+$("#CODFILIAL"+input[1]).val())
					$("#"+"NUMPLANO"+input[1]).prop("disabled",false)

				}else{

					reloadZoomFilterValues("CODORDEM"+input[1],"CODCCUSTO,"+selectedItem.OS+",TIRARMPRJ,1")
					$("#"+"CODORDEM"+input[1]).prop("disabled",false)

				}

			}


		}
		else if(selectedItem.inputId.indexOf("CODORDEM")!="-1"){

			var input = selectedItem.inputId.split("CODORDEM")
			console.log(input)

			if(selectedItem.STATUS_OP==5){

				$(selectedItem.inputId+">option").remove()

				if(input[0]!=""){

					limpaInputZoom(input[0]+"CODORDEM"+input[1])
					$("#"+input[0]+"CODORDEM"+input[1]).prop("disabled",false)
		
				}
				else{
		
					limpaInputZoom("CODORDEM"+input[1])
					$("#"+"CODORDEM"+input[1]).prop("disabled",false)
		
				}
				

				// EXIBE ALERTA
				Swal.fire({
					icon: "error",
					title: "Esta OP está concluída!",
					text: "Verifique e tente novamente"
				})

			}
			else if(selectedItem.STATUS_OP==6){

				$(selectedItem.inputId+">option").remove()

				if(input[0]!=""){

					limpaInputZoom(input[0]+"CODORDEM"+input[1])
					$("#"+input[0]+"CODORDEM"+input[1]).prop("disabled",false)
		
				}
				else{
		
					limpaInputZoom("CODORDEM"+input[1])
					$("#"+"CODORDEM"+input[1]).prop("disabled",false)
		
				}

				// EXIBE ALERTA
				Swal.fire({
					icon: "error",
					title: "Esta OP está cancelada!",
					text: "Verifique e tente novamente"
				})

			}
			else if(selectedItem.STATUS_OP==1){

				$(selectedItem.inputId+">option").remove()

				if(input[0]!=""){

					limpaInputZoom(input[0]+"CODORDEM"+input[1])
					$("#"+input[0]+"CODORDEM"+input[1]).prop("disabled",false)
		
				}
				else{
		
					limpaInputZoom("CODORDEM"+input[1])
					$("#"+"CODORDEM"+input[1]).prop("disabled",false)
		
				}

				// EXIBE ALERTA
				Swal.fire({
					icon: "error",
					title: "Esta OP está planejada!",
					text: "A OP deve estar ao menos programada"
				})

			}
			else{

				//modal de edição
				if(input[0]!=""){

					$("#" + input[0]+"OP"+input[1]).val(selectedItem.CODORDEM)
					$("#" + input[0]+"EXEC"+input[1]).val(selectedItem.NUMEXEC)
					$("#" + input[0]+"STATUSOP"+input[1]).val(selectedItem.STATUS_OP)
					$("#" + input[0]+"CODESTRUTURAOP"+input[1]).val(selectedItem.CODESTRUTURA)
					
					// RELOAD ZOOM NO CAMPO DOS ID"S DAS ATIVIDADES
					reloadZoomFilterValues(input[0]+"IDATVORDEM"+input[1],"CODORDEM,"+selectedItem.CODORDEM+",CODFILIAL,"+$("#" + input[0]+"CODFILIAL"+input[1]).val())
					
					// HABILITA O CAMPO DAS ATIVIDADES
					$("#" + input[0]+"IDATVORDEM"+input[1]).prop("disabled",false)

				}
				else{

					$("#OP"+input[1]).val(selectedItem.CODORDEM)
					$("#EXEC"+input[1]).val(selectedItem.NUMEXEC)
					$("#STATUSOP"+input[1]).val(selectedItem.STATUS_OP)
					$("#CODESTRUTURAOP"+input[1]).val(selectedItem.CODESTRUTURA)

					// RELOAD ZOOM NO CAMPO DOS ID"S DAS ATIVIDADES
					reloadZoomFilterValues("IDATVORDEM"+input[1],"CODORDEM,"+selectedItem.CODORDEM+",CODFILIAL,"+$("#CODFILIAL"+input[1]).val())
					
					// HABILITA O CAMPO DAS ATIVIDADES
					$("#IDATVORDEM"+input[1]).prop("disabled",false)

				}

			}


		}
		else if(selectedItem.inputId.indexOf("IDATVORDEM")!="-1"){

			var input = selectedItem.inputId.split("IDATVORDEM")

			var retrabalho = selectedItem["RETRABALHO"]

			console.log(input)

			if(selectedItem.STATUS_ATV==6){

				$(selectedItem.inputId+">option").remove()

				if(input[0]!=""){

					limpaInputZoom(input[0]+"IDATVORDEM"+input[1])
					$("#"+input[0]+"IDATVORDEM"+input[1]).prop("disabled",false)
		
				}
				else{
		
					limpaInputZoom("IDATVORDEM"+input[1])
					$("#"+"IDATVORDEM"+input[1]).prop("disabled",false)
		
				}

				// EXIBE ALERTA
				Swal.fire({
					icon: "error",
					title: "Esta atividade está Cancelada!",
					text: "Verifique e tente novamente"
				})


			}
			else if(((retrabalho!=null && retrabalho!=undefined && retrabalho!="" && retrabalho!="null") 
			|| ((retrabalho==null || retrabalho==undefined || retrabalho=="" || retrabalho=="null") && selectedItem["DSCATIVIDADE"]=="CONTROLAR"))
			|| selectedItem.STATUS_ATV!=1 
			){
				//modal de edição
				if(input[0]!=""){

					var excecao = retornaRegraOs($("#" + input[0]+"CODPRJ"+input[1]).val(),$("#" + input[0]+"EXEC"+input[1]).val(),selectedItem.CODTRFPAI)

					$("#" + input[0]+"IDATV"+input[1]).val(selectedItem.IDATVORDEM)
					$("#" + input[0]+"CODATV"+input[1]).val(selectedItem.CODATIVIDADE)
					// RELOAD ZOOM NO CAMPO DOS ID"S DAS ATIVIDADES
					reloadZoomFilterValues( input[0]+"CODIGOPRD"+input[1],"CODORDEM,"+$("#"+input[0]+"OP"+input[1]).val()+",CODFILIAL,"+$("#"+input[0]+"CODFILIAL"+input[1]).val()+
					",CODCOLIGADA,"+$("#"+input[0]+"CODCOLIGADA"+input[1]).val()+",IDATVORDEM,"+$("#"+input[0]+"IDATV"+input[1]).val()+",CODESTRUTURA,"+$("#"+input[0]+"CODESTRUTURAOP"+input[1]).val()+",EXCECAO,"+excecao)
					$("#"+input[0]+"CODIGOPRD"+input[1]).prop("disabled",false)

				}
				else{

					var excecao = retornaRegraOs($("#CODPRJ"+input[1]).val(),$("#EXEC"+input[1]).val(),selectedItem.CODTRFPAI)

					$("#IDATV"+input[1]).val(selectedItem.IDATVORDEM)
					$("#CODATV"+input[1]).val(selectedItem.CODATIVIDADE)
					// RELOAD ZOOM NO CAMPO DOS ID"S DAS ATIVIDADES
					reloadZoomFilterValues( "CODIGOPRD"+input[1],"CODORDEM,"+$("#OP"+input[1]).val()+",CODFILIAL,"+$("#CODFILIAL"+input[1]).val()+
					",CODCOLIGADA,"+$("#CODCOLIGADA"+input[1]).val()+",IDATVORDEM,"+$("#IDATV"+input[1]).val()+",CODESTRUTURA,"+$("#CODESTRUTURAOP"+input[1]).val()+",EXCECAO,"+excecao)
					$("#"+"CODIGOPRD"+input[1]).prop("disabled",false)

				}
			}
			else{

				$(selectedItem.inputId+">option").remove()

				if(input[0]!=""){

					limpaInputZoom(input[0]+"IDATVORDEM"+input[1])
					$("#"+input[0]+"IDATVORDEM"+input[1]).prop("disabled",false)
		
				}
				else{
		
					limpaInputZoom("IDATVORDEM"+input[1])
					$("#"+"IDATVORDEM"+input[1]).prop("disabled",false)
		
				}

				// EXIBE ALERTA
				Swal.fire({
					icon: "error",
					title: "Atividade deve estar ao menos programada!",
					text: "Para apontar é necessário ou ter programado a atividade, ou a OP deve ser de retrabalho, ou ser uma atividade de CONTROLE"
				})

			}

		}
		else if(selectedItem.inputId.indexOf("CODIGOPRD")!="-1"){

			var input = selectedItem.inputId.split("CODIGOPRD")
			console.log(input)

			//modal de edição
			if(input[0]!=""){

				$("#" + input[0]+"IDPRD"+input[1]).val(selectedItem.IDPRD)
				$("#" + input[0]+"CODIGOPRODUTO"+input[1]).val(selectedItem.CODIGOPRD)
				$("#" + input[0]+"DESCPROD"+input[1]).val(selectedItem.DESCRICAO)
				$("#" + input[0]+"TIPOPROD"+input[1]).val(selectedItem.TIPO)


			}
			else{

				$("#IDPRD"+input[1]).val(selectedItem.IDPRD)
				$("#CODIGOPRODUTO"+input[1]).val(selectedItem.CODIGOPRD)
				$("#DESCPROD"+input[1]).val(selectedItem.DESCRICAO)
				$("#TIPOPROD"+input[1]).val(selectedItem.TIPO)

			}

		}
		else if(selectedItem.inputId.indexOf("NUMPLANO")!="-1"){

			var input = selectedItem.inputId.split("NUMPLANO")
			console.log(input)

			if(selectedItem.CONCLUIDO=="1"){

				// EXIBE ALERTA
				Swal.fire({
					icon: "error",
					title: "Este Plano já foi apontado!",
					text: "Verifique e tente novamente"
				})

				if(input[0]!=""){

					limpaInputZoom(input[0]+"NUMPLANO"+input[1])
					$("#"+input[0]+"NUMPLANO"+input[1]).prop("disabled",false)
		
				}
				else{
		
					limpaInputZoom("NUMPLANO"+input[1])
					$("#"+"NUMPLANO"+input[1]).prop("disabled",false)
		
				}

			}
			else{
				//modal de edição
				if(input[0]!=""){

					setZoomData(input[0]+"CODIGOPRD"+input[1],selectedItem.CODIGOPRD+" - "+selectedItem.NOMEFANTASIA)
					setZoomData(input[0]+"LOTEPRD"+input[1],selectedItem.NUMLOTE)

					$("#" + input[0]+"NUMPLANOCORTE"+input[1]).val(selectedItem.NUMPLANOCORTE) 
					$("#" + input[0]+"IDPRD"+input[1]).val(selectedItem.IDPRD)
					$("#" + input[0]+"CODIGOPRODUTO"+input[1]).val(selectedItem.CODIGOPRD)
					$("#" + input[0]+"DESCPROD"+input[1]).val(selectedItem.NOMEFANTASIA)
					$("#" + input[0]+"NUMLOTE"+input[1]).val(selectedItem.NUMLOTE)
					$("#" + input[0]+"IDLOTE"+input[1]).val(selectedItem.IDLOTE)


				}
				else{	

					setZoomData("CODIGOPRD"+input[1],selectedItem.CODIGOPRD+" - "+selectedItem.NOMEFANTASIA)
					setZoomData("LOTEPRD"+input[1],selectedItem.NUMLOTE)

					$("#NUMPLANOCORTE"+input[1]).val(selectedItem.NUMPLANOCORTE) 
					$("#IDPRD"+input[1]).val(selectedItem.IDPRD)
					$("#CODIGOPRODUTO"+input[1]).val(selectedItem.CODIGOPRD)
					$("#DESCPROD"+input[1]).val(selectedItem.NOMEFANTASIA)
					$("#NUMLOTE"+input[1]).val(selectedItem.NUMLOTE)
					$("#IDLOTE"+input[1]).val(selectedItem.IDLOTE)

				}

			}

		}
		else if(selectedItem.inputId.indexOf("LOTEAPONTAMENTO")!="-1"){

			var input = selectedItem

			AdicionaLinha(input.IDLOTE)

		}
		
	}

	campoLabel()
	
}

function AdicionaLinha(idlote){

	var seqBaixa = $("#LOTEAPONTAMENTO").attr("seqBaixa")

	var seq = $('#RELATORIOAPONT').find('tbody').children()

	var max = 0

	$(seq).each(function(){

		var id = $(this).attr("id").split("___")[1]

		if(id>max){

			max = id;

		}

	})

	seq = Number(max) + 1;

	var rep = retornaRegistroLote(seqBaixa,idlote)

	console.log(rep)


	var str = ' <tr id="LINHALOTE___'+seq+'" name="LINHALOTE___'+seq+'" class="LINHALOTE"> '+
	' <td><i class="material-icons botao-lixeira waves-effect" onclick="limpaRegistroLote('+seq+')">delete</i><p>'+seq+'</p></td>'+
	' <td id="NUMLOTE" class="filtrar">'+rep['NUMLOTEAUXLOTE']+'</td> '+
	' <td id="IDLOTE" class="filtrar">'+rep['IDLOTEAUXLOTE']+'</td> '+
	' <td id="CODLOC" class="filtrar">'+rep['CODLOCAUXLOTE']+'</td> '+
	' <td id="CODUND" class="filtrar">'+rep['CODUNDAUXLOTE']+'</td> '+
	' <td id="ESTOQUE" class="filtrar">'+rep["SALDOFISICO2AUXLOTE"]+'</td> '+
	' <td id="STATUS" class="filtrar">'+rep["DESCRICAOSATUSAUXLOTE"]+'</td> '+
	' <td><input type="number" class="filtrar" id="APONTAR___'+seq+'" name="APONTAR___'+seq+'" onchange="PreencheQuantidadeLote('+seq+',this)" style="text-align: center;"/></td> '+ 
	' </tr> '

	$('#RELATORIOAPONT').find('tbody').append(str)

	$("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seqBaixa}).parents('tr').filter(function(){ return $(this).find("input[id*='IDLOTEAUXLOTE___']").val()==rep['IDLOTEAUXLOTE']}).find("input[id^='SELECIONADOAUXLOTE___']").val("S")

	$("#APONTAR___"+seq).val( Number(rep["QTDAPONTAAUXLOTE"]) > 0 ? Number(rep["QTDAPONTAAUXLOTE"]) <= Number(rep["SALDOFISICO2AUXLOTE"])  ? Number(rep["QTDAPONTAAUXLOTE"]) : "" : "")

	var zoom = new Array()

	$("#RELATORIOAPONT").find("tr[id*='LINHALOTE___']").find("#NUMLOTE").each(function() {
		
		zoom.push($(this).text());

	})

	window["LOTEAPONTAMENTO"].setValues(zoom); 

	var total=0;
		
	$("input[id^='APONTAR___'").each(function(){

		total += Number($(this).val())

	})

	$("#RELLOTESELEC").val(Number(total))

}

function LimpaTabelaLote(seq){

	$("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seq}).parents('tr').remove()


}

function limpaRegistroLote(seq){

	console.log("limpaRegistroLote")

	var seqBaixa = $("#LOTEAPONTAMENTO").attr("seqBaixa")

	var idlote = $("#RELATORIOAPONT").find("tr[id*='LINHALOTE___"+seq+"']").find("#IDLOTE").text()

	$("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seqBaixa}).parents('tr').filter(function(){ return $(this).find("input[id*='IDLOTEAUXLOTE___']").val()==idlote}).find('input').each(

		function(){

			id = $(this).attr("id").split("___")[0]
			console.log(id)
			valor = $(this).val()
			console.log(valor)

			if(id.indexOf("QTDAPONTAAUXLOTE")!=-1){

				if( Number($(this).val()) - Number($("#RELATORIOAPONT").find("#APONTAR___"+seq).val()) >= 0 ){

					$(this).val( Number($(this).val()) - Number($("#RELATORIOAPONT").find("#APONTAR___"+seq).val())  )

				}
				else{

					// EXIBE ALERTA DA CÓPIA
					var Toast = Swal.mixin({
						toast: true,
						position: 'center',
						showConfirmButton: false,
						timer: 2000,
						timerProgressBar: true,
					})
				
					Toast.fire({
						icon: 'error',
						title: 'Erro ao deletar registro!'
					})

					return false;

				}

			}

		}

	)

	$("#RELATORIOAPONT").find("tr[id*='LINHALOTE___"+seq+"']").hide("slow")
	
	setTimeout(function(){

		$("#RELATORIOAPONT").find("tr[id*='LINHALOTE___"+seq+"']").remove()

		var zoom = new Array()

		$("#RELATORIOAPONT").find("tr[id*='LINHALOTE___']").find("#NUMLOTE").each(function() {
			
			zoom.push($(this).text());

		})

		window["LOTEAPONTAMENTO"].setValues(zoom); 

		var total=0;
			
		$("input[id^='APONTAR___'").each(function(){

			total += Number($(this).val())

		})

		$("#RELLOTESELEC").val(Number(total))

		$("#TOTALAPONTAUXAPONT___"+seqBaixa).val(Number(total))

	},800)

}

function retornaRegistroLote(seqBaixa,idlote){

	var ret = new Object();
	var id;
	var valor;

	$("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seqBaixa}).parents('tr').filter(function(){ return $(this).find("input[id*='IDLOTEAUXLOTE___']").val()==idlote}).find('input').each(

		function(){

			id = $(this).attr("id").split("___")[0]
			console.log(id)
			valor = $(this).val()
			console.log(valor)

			ret[id]=valor;

		}

	)

	return ret;

}

function PreencheQuantidadeLote(seq,obj){

	var seqBaixa = $("#LOTEAPONTAMENTO").attr("seqBaixa")

	var idlote = $("#RELATORIOAPONT").find("tr[id*='LINHALOTE___"+seq+"']").find("#IDLOTE").text()

	var ret = retornaRegistroLote(seqBaixa,idlote)

	var qtdTotalLote = 0;
	var total = 0;
	var previsto = $("#RELLOTEPREV").val()
	var apontado = $("#RELLOTEAPONT").val()

	$("#LISTALOTESAUX_APONT").find("input[id*='IDLOTEAUXLOTE___']").filter(function(){return $(this).val()==idlote}).parents('tr').filter(function(){return $(this).find("input[id*='SEQAUXLOTE___']").val()!=seqBaixa}).find("input[id^='QTDAPONTAAUXLOTE___']").each(

		function(){

			qtdTotalLote += Number($(this).val())

		}

	)

	$("input[id^='APONTAR___'").each(function(){

		total += Number($(this).val())

	})

	console.log(ret)
	console.log($(obj).val())

	if(Number($(obj).val()) > 0){

		if( Number(ret["SALDOFISICO2AUXLOTE"]) - Number($(obj).val()) >= 0 ){

			if( Number(ret["SALDOFISICO2AUXLOTE"]) - Number( Number( $(obj).val() ) + Number( qtdTotalLote )) >= 0 ) {
	
				if(ret["GRUPOAUXLOTE"]!="0184"){
	
					console.log(previsto)
					console.log(apontado)
					console.log(total)
	
					if( (Number(previsto)-Number(apontado)-Number(total)) >= 0){

						if(ret["CODUNDAUXLOTE"]=="KG" || ret["CODUNDAUXLOTE"]=="LI" || ret["CODUNDAUXLOTE"]=="LT" ){
	
							$("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seqBaixa}).parents('tr').filter(function(){ return $(this).find("input[id*='IDLOTEAUXLOTE___']").val()==idlote}).find("input[id^='QTDAPONTAAUXLOTE___']").val(Number( Number( $(obj).val() ) + Number(ret["QTDAPONTAAUXLOTE"]) ))
							$("#RELLOTESELEC").val(Number(total))
							$("#TOTALAPONTAUXAPONT___"+seqBaixa).val(Number(total))
						}
						else if($(obj).val().indexOf(".")!=-1 || $(obj).val().indexOf(",")!=-1) {

							$("#RELLOTESELEC").val(Number(total)-$(obj).val())
							$("#TOTALAPONTAUXAPONT___"+seqBaixa).val(Number(total)-$(obj).val())
							$(obj).val("")
							// EXIBE ALERTA DA CÓPIA
							var Toast = Swal.mixin({
								toast: true,
								position: 'center',
								showConfirmButton: false,
								timer: 3000,
								timerProgressBar: true,
							})
						
							Toast.fire({
								icon: 'error',
								title: 'Esta unidade de medida não permite decimais'
							})
		
							return false;

						}
						else{

							$("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seqBaixa}).parents('tr').filter(function(){ return $(this).find("input[id*='IDLOTEAUXLOTE___']").val()==idlote}).find("input[id^='QTDAPONTAAUXLOTE___']").val(Number( Number( $(obj).val() ) + Number(ret["QTDAPONTAAUXLOTE"]) ))
							$("#RELLOTESELEC").val(Number(total))
							$("#TOTALAPONTAUXAPONT___"+seqBaixa).val(Number(total))

						}

	
					}
					else{
	
						$("#RELLOTESELEC").val(Number(total)-$(obj).val())
						$("#TOTALAPONTAUXAPONT___"+seqBaixa).val(Number(total)-$(obj).val())
						$(obj).val("")
	
						// EXIBE ALERTA DA CÓPIA
						var Toast = Swal.mixin({
							toast: true,
							position: 'center',
							showConfirmButton: false,
							timer: 3000,
							timerProgressBar: true,
						})
					
						Toast.fire({
							icon: 'error',
							title: 'Quantidade informada ultrapasssa a quantidade prevista'
						})
	
						return false;
	
					}
	
				}
				else{

					$("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seqBaixa}).parents('tr').filter(function(){ return $(this).find("input[id*='IDLOTEAUXLOTE___']").val()==idlote}).find("input[id^='QTDAPONTAAUXLOTE___']").val(Number( Number( $(obj).val() ) + Number(ret["QTDAPONTAAUXLOTE"]) ))
					$("#RELLOTESELEC").val(Number(total))
					$("#TOTALAPONTAUXAPONT___"+seqBaixa).val(Number(total))

				}
	
				
			}
			else{
	
				$("#RELLOTESELEC").val(Number(total)-$(obj).val())
				$("#TOTALAPONTAUXAPONT___"+seqBaixa).val(Number(total)-$(obj).val())				
				$(obj).val("")
	
				// EXIBE ALERTA DA CÓPIA
				var Toast = Swal.mixin({
					toast: true,
					position: 'center',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
				})
			
				Toast.fire({
					icon: 'error',
					title: 'Quantidade informada maior que o saldo atual! ( Registros Anteriores )'
				})
	
				return false;
				
	
			}
	
		}
		else{
	
			$("#RELLOTESELEC").val(Number(total)-$(obj).val())
			$("#TOTALAPONTAUXAPONT___"+seqBaixa).val(Number(total)-$(obj).val())	
			$(obj).val("")
	
			// EXIBE ALERTA DA CÓPIA
			var Toast = Swal.mixin({
				toast: true,
				position: 'center',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			})
		
			Toast.fire({
				icon: 'error',
				title: 'Quantidade informada maior que o saldo atual!'
			})
	
			return false;
	
		}

	}
	else{

		$("#RELLOTESELEC").val(Number(total)-$(obj).val())
		$("#TOTALAPONTAUXAPONT___"+seqBaixa).val(Number(total)-$(obj).val())
		$(obj).val("")

		// EXIBE ALERTA DA CÓPIA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'error',
			title: 'Quantidade informada é inválida!'
		})

		return false;

	}

	

}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function removedZoomItem(removedItem){

	$("#" + removedItem.inputId).parents("div").first().find("label").removeClass("active2")
	
	// SE A OS É REMOVIDA
	if(removedItem.inputId.indexOf("FILIAL")!="-1"){

		var input = removedItem.inputId.split("FILIAL")

		//modal de edição
		if(input[0]!=""){

			$("#" + input[0]+"CODFILIAL"+input[1]).val()
			limpaInputZoom(input[0]+"CODCCUSTO"+input[1])
			limpaInputZoom(input[0]+"CODORDEM"+input[1])
			limpaInputZoom(input[0]+"IDATVORDEM"+input[1])
			limpaInputZoom(input[0]+"CODIGOPRD"+input[1])

		}
		else{

			$("#CODFILIAL"+input[1]).val()
			limpaInputZoom("CODCCUSTO"+input[1])
			limpaInputZoom("CODORDEM"+input[1])
			limpaInputZoom("IDATVORDEM"+input[1])
			limpaInputZoom("CODIGOPRD"+input[1])

		}
	
	}
	else if(removedItem.inputId.indexOf("CODCCUSTO")!="-1"){

		var input = removedItem.inputId.split("CODCCUSTO")

		//modal de edição
		if(input[0]!=""){

			$("#" + input[0]+"CODPRJ"+input[1]).val("")
			$("#" + input[0]+"CODCOLIGADA"+input[1]).val("")
			limpaInputZoom(input[0]+"CODORDEM"+input[1])
			limpaInputZoom(input[0]+"IDATVORDEM"+input[1])
			limpaInputZoom(input[0]+"CODIGOPRD"+input[1])
			limpaInputZoom(input[0]+"NUMPLANO"+input[1])
			limpaInputZoom(input[0]+"LOTEPRD"+input[1])
			


		}
		else{

			$("#CODPRJ"+input[1]).val("")
			$("#CODCOLIGADA"+input[1]).val("")
			limpaInputZoom("CODORDEM"+input[1])
			limpaInputZoom("IDATVORDEM"+input[1])
			limpaInputZoom("CODIGOPRD"+input[1])
			limpaInputZoom("NUMPLANO"+input[1])
			limpaInputZoom("LOTEPRD"+input[1])

		}


	}
	else if(removedItem.inputId.indexOf("CODORDEM")!="-1"){

		var input = removedItem.inputId.split("CODORDEM")


		//modal de edição
		if(input[0]!=""){

			$("#" + input[0]+"OP"+input[1]).val("")
			$("#" + input[0]+"EXEC"+input[1]).val("")
			$("#" + input[0]+"STATUSOP"+input[1]).val("")
			$("#" + input[0]+"CODESTRUTURAOP"+input[1]).val(removedItem.CODESTRUTURA)
			limpaInputZoom(input[0]+"IDATVORDEM"+input[1])
			limpaInputZoom(input[0]+"CODIGOPRD"+input[1])
			

		}
		else{

			$("#OP"+input[1]).val("")
			$("#EXEC"+input[1]).val("")
			$("#STATUSOP"+input[1]).val("")
			$("#CODESTRUTURAOP"+input[1]).val("")
			limpaInputZoom("IDATVORDEM"+input[1])
			limpaInputZoom("CODIGOPRD"+input[1])

		}



	}
	else if(removedItem.inputId.indexOf("IDATVORDEM")!="-1"){

		var input = removedItem.inputId.split("IDATVORDEM")

		//modal de edição
		if(input[0]!=""){

			$("#" + input[0]+"IDATV"+input[1]).val("")
			$("#" + input[0]+"CODATV"+input[1]).val("")
			limpaInputZoom(input[0]+"CODIGOPRD"+input[1])

		}
		else{

			$("#IDATV"+input[1]).val("")
			$("#CODATV"+input[1]).val("")
			limpaInputZoom("CODIGOPRD"+input[1])
		}



	}
	else if(removedItem.inputId.indexOf("NUMPLANO")!="-1"){

		var input = removedItem.inputId.split("NUMPLANO")

		//modal de edição
		if(input[0]!=""){

			$("#" + input[0]+"NUMPLANOCORTE"+input[1]).val("")
			limpaInputZoom(input[0]+"CODIGOPRD"+input[1])
			limpaInputZoom(input[0]+"LOTEPRD"+input[1])

		}
		else{

			$("#NUMPLANOCORTE"+input[1]).val("")
			limpaInputZoom("CODIGOPRD"+input[1])
			limpaInputZoom("LOTEPRD"+input[1])
		}



	}
	else if(removedItem.inputId.indexOf("CODIGOPRD")!="-1"){

		var input = removedItem.inputId.split("CODIGOPRD")
		console.log(input)

		//modal de edição
		if(input[0]!=""){

			$("#" + input[0]+"IDPRD"+input[1]).val("")
			$("#" + input[0]+"CODIGOPRODUTO"+input[1]).val("")
			$("#" + input[0]+"DESCPROD"+input[1]).val("")


		}
		else{

			$("#IDPRD"+input[1]).val("")
			$("#CODIGOPRODUTO"+input[1]).val("")
			$("#DESCPROD"+input[1]).val("")

		}


	}
	else if(removedItem.inputId.indexOf("LOTEAPONTAMENTO")!="-1"){

		var input = removedItem
		console.log(input)

		var numlote = removedItem.text

		var seq = $("#RELATORIOAPONT").find("#NUMLOTE").filter(function(){return $(this).text()==numlote}).parents('tr').attr("id").split("___")[1]

		limpaRegistroLote(seq);


	}

	campoLabel()

	
}

function limpaInputZoom(input){

	$("#" + input+">option").each(function(){

		$(this).remove()

	})

	$("#" + input).parents("div").first().find("input").each(function(){

		$(this).val("")

	})

	$("#" + input).prop("disabled", true)
	$("#" + input).parents("div").first().find("label").eq(0).removeClass("active2")

}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	$("#"+instance).parents("div").first().find("label").eq(0).addClass("active2")
	
}

function campoLabel(){

	setTimeout(function(){

		$("input:not([id*='PESQUISA'],[type='checkbox'])").on("focusin",function(e){

			$("label.active:not([for*='PESQUISA'])").removeClass("active")
		
			if(!$(this).prop("disabled") && !$(this).prop("readonly")){
		
				$(this).parents("div").first().find("label").eq(0).addClass("active")
				//$("label[for='"+$(this).attr("id")+"']").addClass("active")
		
			}
		
		})
		
		$("input:not([id*='PESQUISA'],[type='checkbox'])").on("focusout",function(e){
		
			$("label.active:not([for*='PESQUISA'])").removeClass("active")
		
		})
		
		$("select").on('focusin',function(e){
		
			$("label.active:not([for*='PESQUISA'])").removeClass('active')
		
			if(!$(this).prop('disabled') && !$(this).prop('readonly')){
		
				$(this).parents('div').first().find('label').eq(0).addClass('active')
				//$("label[for='"+$(this).attr("id")+"']").addClass("active")
		
			}
		
		})
		
		$("select").on('focusout',function(e){
		
			$("label.active:not([for*='PESQUISA'])").removeClass('active')
		
		})

	},500)


}