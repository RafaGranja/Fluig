/**
 * *FUNÇÃO PARA ESCONDER A OPÇÃO DE INICIAR SOLICITAÇÃO COM BASE NA ATUAL
*/
parent.$('.wcm-all-content').bind('DOMNodeInserted', function(e){
	
   // QUANDO APARECER A TELA DE "SOLICITAÇÃO INICIADA COM SUCESSO" IRÁ ENTRAR NESSE IF
   if (e.target.id == 'message-page') {
	  
    // ESCONDE A OPÇÃO DE "INICIAR SOLICITAÇÃO COM BASE NESTA"
    parent.$('[data-reset-process-instance-id]').hide()
    
  }	
  
})

/**
 * 
 * @param {ELEMENTO DO DOCUMENTO} e 
 * * TRANSFORMA CONTEÚDO DO IMPUT EM CAIXA ALTA E TRATA FORMAS DE SQL INJECTION
 */

function caixaAlta(obj){
	
	// SALVA O CONTEÚDO DO INPUT
	var cx = $(obj).val()
	
	// TRANSFORMA EM CAIXA ALTA
	var cx = cx.toUpperCase()

	var arraypalavras = new Array('ADD','ALL','ALTER','AND','ANY','AS','ASC','AUTHORIZATION','BACKUP','BEGIN','BETWEEN','BREAK','BROWSE','BULK','BY','CASCADE',
	'CASE','CHECK','CHECKPOINT','CLOSE','CLUSTERED','COALESCE','COLLATE','COLUMN','COMMIT','COMPUTE','CONSTRAINT','CONTAINS','CONTAINSTABLE','CONTINUE','CONVERT',
	'CREATE','CROSS','CURRENT','CURRENT_DATE','CURRENT_TIME','CURRENT_TIMESTAMP','CURRENT_USER','CURSOR','DATABASE','DBCC','DEALLOCATE','DECLARE','DEFAULT',
	'DELETE','DENY','DESC','DISK','DISTINCT','DISTRIBUTED','DOUBLE','DROP','DUMP','ELSE','END','ERRLVL','ESCAPE','EXCEPT','EXEC','EXECUTE','EXISTS','EXIT',
	'EXTERNAL','FETCH','FILE','FILLFACTOR','FOR','FOREIGN','FREETEXT','FREETEXTTABLE','FROM','FULL','FUNÇÃO','GOTO','GRANT','GROUP','HAVING','HOLDLOCK',
	'IDENTITY','IDENTITY_INSERT','IDENTITYCOL','IF','IN','INDEX','INNER','INSERT','INTERSECT','INTO','IS','JOIN','KEY','KILL','LEFT','LIKE','LINENO','LOAD',
	'MERGE','NATIONAL','NOCHECK','NONCLUSTERED','NOT','NULL','NULLIF','OF','OFF','OFFSETS','ON','OPEN','OPENDATASOURCE','OPENQUERY','OPENROWSET','OPENXML',
	'OPTION','OR','ORDER','OUTER','OVER','PERCENT','PIVOT','PLAN','PRECISION','PRIMARY','PRINT','PROC','PROCEDURE','PUBLIC','RAISERROR','READ','READTEXT',
	'RECONFIGURE','REFERENCES','REPLICATION','RESTORE','RESTRICT','RETURN','REVERT','REVOKE','RIGHT','ROLLBACK','ROWCOUNT','ROWGUIDCOL','RULE','SAVE',
	'SCHEMA','SECURITYAUDIT','SELECT','SEMANTICKEYPHRASETABLE','SEMANTICSIMILARITYDETAILSTABLE','SEMANTICSIMILARITYTABLE','SESSION_USER','SET','SETUSER',
	'SHUTDOWN','SOME','STATISTICS','SYSTEM_USER','TABLE','TABLESAMPLE','TEXTSIZE','THEN','TO','TOP','TRAN','TRANSACTION','TRIGGER','TRUNCATE','TRY_CONVERT',
	'TSEQUAL','UNION','UNIQUE','UNPIVOT','UPDATE','UPDATETEXT','USE','USER','VALUES','VARYING','VIEW','WAITFOR','WHEN','WHERE','WHILE','WITH','WITHIN GROUP','WRITETEXT')
	
	var verifica = true
	var caractere = ""

	if(cx.search('\'')!=-1){

		verifica = false;
		//console.log("caractere inválido"," ' ")
		caractere = "\'"

	}
	else if(cx.search(/[-]{2,}/)!=-1){

		verifica = false;
		//console.log("caractere inválido","--")
		caractere = '--'

	}
	else if(cx.search(/[/]{2,}/)!=-1){

		verifica = false;
		//console.log("caractere inválido","//")
		caractere = '//'

	}

	if(verifica){

		for(var i = 0; i < arraypalavras.length; i++) {

			var regex = new RegExp('/^[.^\s]*'+arraypalavras[i]+'\s+|^[.^\s]*'+arraypalavras[i]+'^\w+|^[.^\s]*'+arraypalavras[i]+'$',"i")
			
			if(cx.search(regex)!=-1){

				verifica = false;
				//console.log("caractere inválido",arraypalavras[i])
				caractere = arraypalavras[i]
				break;
		
			}

		}

		if(verifica){

			var cxarray  = cx.split(" ")

			for(var i = 0; i < cxarray.length;i++){
		
				if(arraypalavras.filter(function(x){return x == cxarray[i]}).length>0){
		
					verifica = false;
					//console.log("caractere inválido",cxarray[i])
					caractere = cxarray[i]
					break;
		
				}
		
			}

		}

	}


	if(verifica){
		// SALVA O CONTEÚDO EM CAIXA ALTA NO CAMPO INPUT
		$(obj).val(cx)
	}
	else{

		$(obj).val("")
		// EXIBE ALERTA 
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 1000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'warning',
			title: 'Expressão '+caractere+' inválida!'
		})

	}

	
}
/**
 * 
 * @param {ELEMENTO DO DOCUMENTO} e 
 * * EXIBE UM BALÃO COM O TEXTO COMPLETO DO CAMPO AO PASSAR O MOUSE SOBRE ELE 
 */
function mouse(e){
	
	//console.log("entrei para exibir conteúdo")
	
	// PEGA O VALOR COMPLETO PREENCHIDO NO CAMPO
	var valCampo = $(e).val() ? $(e).val() :  $(e).text();
	
	//console.log("valCampo: "+valCampo)
	
	// SE CAMPO NÃO FOI PREENCHIDO
	if(valCampo == "" || valCampo == null){
		
		return false;
		
	}
	// SE CAMPO FOI PREENCHIDO
	else{
		
		// CARREGA EM "TITLE" O VALOR DO CAMPO PREENCHIDO
		$(e).prop("title", valCampo);
		return true;
		
	}
	
}
 

/**
 * *PEGA VALOR SETADO DO CAMPO RADIO4 (QUANTIDADE UNITÁRIA DO COMPONENTE)
 */
function pegaTipo4() {
	
	// PEGA O VALOR SELECIONADO DO RADIO2
	var tipo = $("input[name='RADIO4']:checked").val();

	//console.log("opção selecionada: "+tipo)
	
	// SALVA VALOR DO RADIO4 NO CAMPO OCULTO
	$("#VALOR").val(tipo)

	
}

/**
 * 
 * @param {ELEMENTO INPUT DO DOCUMENTO} obj 
 * *FORMATA VALORES TROCANDO PONTO POR VÍRGULA
 */
function formataValor(obj){
	
	var valor = $(obj).val()
	//console.log("valor: "+valor)
	
	var campo = $(obj).attr("id")
	//console.log("campo: "+campo)
	valor = valor.replace(",",".")
	
	// SE VALOR NÃO É NÚMERO
	if(isNaN(valor)){
		
		$("#"+campo).val("")
		
		// EXIBE ALERTA 
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 1000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'warning',
			  title: 'Digite um valor correto!'
		})
		
	} else {

		valor = valor.replace(".",",")
		//console.log("novo valor: "+valor)
		$("#"+campo).val(valor)
		
	}
	
}

/**
 * 
 * @param {NUMERO DA ABA CLICLADA - 1 : CAMPO / 2 : ALVOS / 3 : FILTROS / 4 : REVISÃO} op
 * * FUNÇÃO QUE ALTERA VALOR DA BARRA DE PROGROSSO BASEADO NA ABA CLICADA E CONTROLA O TEXTO DO BOTÂO PRÓXIMO
 */

function titulo(op){
	 
	var count = 0;

	$(".titulos").each(function(){

		if(count!=op-1){

			$(this).css('opacity', '0');

		}
		else{

			$(this).css('opacity','1');
			$("#ATUAL").val(op)

		}
		count++;

	})

	var percent = (25 * op) > 0 ? (25 * op) : 10;


	$("#SPANAVANCO").text(percent + '%')
	$("#SPANAVANCO").attr('aria-valuenow',percent)
	$("#SPANAVANCO").css("width",percent+"%")

	if(op==4){

		$("#PROXIMO").text("Finalizar")

	}
	else{

		$("#PROXIMO").text("Próximo")
		
	}

}

/**
 * 
 * @param {*} obj ELEMENTO DO HTML QUE DEVE SER LIMPO 
 *	* CONVERTE PRIORIDADE PARA VALOR INTEIRO
 */

function converteInteiro(obj){
	
	//console.log("entrei para converter inteiro")
	var ret = false
	var seq = $(obj).attr("id").split("___")[1]
	
	var prioridade = $("#VIEWPRIORIDADE___"+seq).val() 
	
	$("#VIEWPRIORIDADE___"+seq).val("")
	
	prioridade = parseInt(prioridade)
	//console.log("prioridade "+prioridade)
		
	$("#VIEWPRIORIDADE___"+seq).val(prioridade)
		
	
}

/**
 * 
 * @param {ELEMENTO DO HTML QUE DEVE SER LIMPO } obj
 *	* LIMPA O CAMPO ZOOM DO COMPONENTE
 */
// LIMPA O CONTEÚDO DO ZOOM
function limparZoom(obj){

	//console.log("vou limpar o zoom")
	//console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#VIEWPRODUTOCOMPONENTES___"+seq).val("")
	$("#VIEWIDPRDCOMPONENTES___"+seq).val("")
	$("#VIEWCODIGOPRDCOMPONENTES___"+seq).val("")
	$("#VIEWCODUNDCOMPONENTES___"+seq).val("")

	$("#INSEREHTMLREV").empty()

}



/**
 * 
 * @param {CAMPO DE VALOR NA ABA CAMPO} obj 
 * * FUNÇÃO PARA COPIAR DADOS DO CAMPO VALOR NA ABA CAMPO PARA O CAMPO VALOR NA ABA REVISÃO
 * !FAZ TROCA DE IDS E TAMBEM DO NAME DE INPUTS OS INSERER O HTML NA ABA REVISÃO
 */
function atualizaValorRev(obj){

	$("#INSEREHTMLREV").empty()

	$("#INSEREHTMLREV").append($("#INSEREHTML").html())

	$("#INSEREHTMLREV").children().each(function(){

		var id = $(this).attr("id")
		var name = $(this).attr("name")
		if(id!=null && id!="" && id!=undefined){
			$(this).attr("id",id+"REV")
			$(this).attr("name",name+"REV")
		}

		$(this).prop("readonly",true)
		$(this).attr("onclick",null)
		
	})

	$("#INSEREHTMLREV").children().children().each(function(){

		var id = $(this).attr("id")
		var name = $(this).attr("name")
		if(id!=null && id!="" && id!=undefined){
			$(this).attr("id",id+"REV")
			$(this).attr("name",name+"REV")
		}
		$(this).prop("readonly",true)
		$(this).attr("onclick",null)
		
	})

	$("#INSEREHTMLREV").children().children().children().each(function(){

		var id = $(this).attr("id")
		var name = $(this).attr("name")
		if(id!=null && id!="" && id!=undefined){
			$(this).attr("id",id+"REV")
			$(this).attr("name",name+"REV")
			var radio = $(this)
			if($(this).attr("name")=="RADIO4"){
				$(radio).attr("name","RADIO4"+"REV")
			}
		}
		$(this).prop("disabled",true)
		$(this).attr("onclick",null)
		
	})

	$("#INSEREHTML").children("input,textarea").each(function(){

		var valor = $(this).val()
		var id = $(this).attr(("id"))

		$("#"+id+"REV").val(valor)


	})

	$("#INSEREHTML").children().children("input,textarea").each(function(){

		var valor = $(this).val()
		var id = $(this).attr(("id"))

		$("#"+id+"REV").val(valor)


	})

	id = $("input[name='RADIO4']:checked").attr("id")
	if(id!=undefined && id!=null && id!=""){
		$("#"+id+"REV").prop("checked",true)
	}


}

/**
 * * FUNÇÃO QUE EXCUTA UM RELOAD DO DOCUMENTO
 * ! EXECUTA AO CLICAR NO BOTÂO CANCELAR
 */
function Cancelar(){

	Swal.fire({
		title: '<strong>Confirme o cancelamento</strong>',
		html: 'Ao cancelar <strong> TODOS </strong>os dados  do formulário serão limpos ',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '<strong>Sim, limpar preenchimento!</strong>',
		cancelButtonText: '<strong>Manter Preenchimento!</strong>',
		allowOutsideClick : false,
		allowEscapeKey : false,
	}).then(function(result){

		if (result.isConfirmed) {

			var myLoading = FLUIGC.loading(window,
				{textMessage:  'Limpando dados...',title: 'Aguarde!',
				css: {
					padding:        0,
					margin:         0,
					width:          '15%',
					top:            '40%',
					left:           '42.5%',
					textAlign:      'center',
					cursor:         'wait',
					border: 'none',
					backgroundColor: 'transparent',
				},
				overlayCSS:  { 
					opacity:         0.6, 
					cursor:          'wait'
				}, 
			})
			myLoading.show()

			setTimeout(function(){

				window.location.reload();

			},2000)
		
		}

	})

}


/**
 * 
 * @param {LINHA QUE FOI RETIRADA DA TABELA DE FILTROS DA ABA FILTROS} obj 
 * * REMOVE A LINHA DA TABELA FILTROS QUE FOI DA ABA REVISAO
 */
function removeLinhaRevisao(obj){

	var seq = $(obj).attr('id').split('___')[1];

	//console.log("seq",seq)

	$("#REMOVEFILTROREV___"+seq).parent().parent().remove()

}

/**
 * * DESABILITA OS CAMPOS TIPO ZOOM DA TABELA DE FILTROS NA ABA DE REVISAO
 */
function desabilitaFiltrosRev(){

	$("select[id^='CAMPOFILTROZOOMREV___']").each(function(){

		var seq = $(this).attr('id').split('___')[1];

		$("#CAMPOFILTROZOOMREV___"+seq).prop("disabled",true)
		$("#VALORFILTROZOOMREV___"+seq).prop("disabled",true)

	})

}

/**
 * * CONTROLA QUAL ABA ESTÁ SENDO VISTA, ATIAVADA PELO BOTÃO ANTERIOR RETORNA PARA A PÁGINA DA ESQUERDA
 */
function Anterior(){

	$("#ATUAL").next(".nav-tabs").children().eq(Number($("#ATUAL").val())-2).children().click()

}

/**
 * * FUNÇÃO QUE AVANÇA PARA A PRÓXIMA
 * ! EXECUTA AO CLICAR NO BOTÃO PRÓXIMO
 */
async function Proximo(){

	var atual = $("#ATUAL").val()


	if(atual!=4){
		$("#ATUAL").next(".nav-tabs").children().eq(atual).children().click()
	}
	else{

		if( ( $("#ESTRUTURAPRINCIPAL").prop("checked") && $("#CODTRFEX").val()!=null && $("#CODTRFEX").val()!="" && $("#CODTRFEX").val()!="") || 
			( $("#EXECUCAO_INFO").val()!="" &&  $("#EXECUCAO_INFO").val()!=null && $("#EXECUCAO_INFO").val()!=undefined ) ){

			if(verificaObrigatorios()){

				if(verificaFiltrosPreenchidos()){

					var alvos = await verificaAlvos()

					//console.log("alvos",alvos)

					if(alvos.VER){

						//console.log("vou Finalizar")

						var sql = constroiAtualizacao()

						//console.log(sql)

						if(!sql[0].VER){

							Swal.fire(sql[0].ALERT)

						}else{

							var indices = numeroRegistrosAlterados(sql);

							var qtd = indices.LENGTH;

							if( Number(qtd) > 0 ){

								Swal.fire({
									title: '<strong>Confirme a alteração</strong>',
									html:'<span class="input-group-addon"><a href="#ALTERACOESBLANK" id="ABREMODALINDICES" name="ABREMODALINDICES">Ao confirmar seus dados serão salvos como executor da alteração de <strong>'+qtd+'</strong> registros</a></span>',
									icon: 'warning',
									showCancelButton: true,
									confirmButtonColor: '#3085d6',
									cancelButtonColor: '#d33',
									confirmButtonText: '<strong>Sim, confirmar!</strong>',
									cancelButtonText: '<strong>Cancelar!</strong>',
									allowOutsideClick : false,
									allowEscapeKey : false,
									didOpen: function(){

										$("#ABREMODALINDICES").on('click', function(){

											carregaTabelaAlteracoes(indices)

										})

									}
								}).then(function(result){

									if (result.isConfirmed) {

										Swal.showLoading();

										Swal.fire({
											title: '<strong>Realizando alterações!</strong>',
											html: '<strong><b></b></strong>',
											timerProgressBar: true,
											allowOutsideClick : false,
											allowEscapeKey : false,
											icon: 'warning',
											didOpen:function(){

												Swal.showLoading();

												const b = Swal.getHtmlContainer().querySelector('strong').querySelector('b');

												b.textContent = '0% - Iniciando alterações'

												var ret

												setTimeout(function(){	
													
												 	ret = executaAtualizacao(sql);

													b.textContent = '100% - Finalizando alterações';

													setTimeout(function(){	

														if(ret.VER){

															Swal.fire({
																title:'<strong>Alterações realizadas!</strong>',
																html:'Registros alterados com sucesso, Aguarde Integração',
																icon:'success',
																timer: 2000,
																allowOutsideClick : false,
																allowEscapeKey : false,
																timerProgressBar: true,
																showConfirmButton : false,
																didOpen:function(){
			
																	Swal.showLoading();	

																}
															}
															).then(function(result){

																var integraInterval;
			
																Swal.fire({

																	title: 'Integrando alterações!',
																	html: '<strong><b></b></strong>										<div class="progress"> '+
																	' <div class="progress-bar progress-bar-striped active" role="progressbar" id="SPANPERCENTATT" aria-valuemin="0" aria-valuemax="100"> '+
																	' </div>'+
																	' </div>',
																	timerProgressBar: true,
																	allowOutsideClick : false,
																	allowEscapeKey : false,
																	icon: 'warning',
																	didOpen:function(){
			
																		Swal.showLoading();	
			
																		const b = Swal.getHtmlContainer().querySelector('strong').querySelector('b');

																		$("#SPANPERCENTATT").text('10%')
																		$("#SPANPERCENTATT").attr('aria-valuenow',10)
																		$("#SPANPERCENTATT").css("width",'10%')

																		b.textContent = 'Iniciando Integração'

																		var i = 0;
			
																		integraInterval = setInterval(function(){

																			var msg = integra(indices,i);
																			i+=1;

																			b.textContent = msg;

																			if(i==indices.LENGTH){

																				$("#SPANPERCENTATT").text('100%')
																				$("#SPANPERCENTATT").attr('aria-valuenow',100)
																				$("#SPANPERCENTATT").css("width",'100%')
		
																				b.textContent = 'Finalizando integração';

																				setTimeout(function(){

																					Swal.close()

																				},1000)


																			}
																			

																		})	

																				
																	},
																	willClose:function(){	

																		clearInterval(integraInterval)

																	},
			
																}).then(function(){

																	atualizaQuadro();
																	Swal.fire({
																		title:'<strong>Alterações integradas!</strong>',
																		html:'Registros integrados com sucesso',
																		icon:'success'
																	})

																})
																
					
															})
			
														}
														else{
			
															Swal.fire(
																'<strong>Erro na atualização das informações!</strong>',
																ret.RET,
																'error'
															)
			
														}
													
													},2000)
													
												},1000)

											}

										})
									
									}

								})
							}
							else{

								Swal.fire({
									title: '<strong> Revise os dados preenchidos </strong>',
									html: 'Não foram encontrados registros para alteração',
									icon: 'error',
									confirmButtonColor: '#d33',
									confirmButtonText: '<strong>Cancelar finalização</strong>',
									allowOutsideClick : false,
									allowEscapeKey : false,
								})

							}

						}

					}
					else{

						// EXIBE ALERTA
						Swal.fire(alvos.DATA)


					}
		
				}
				else{
		
					// EXIBE ALERTA
					Swal.fire({
						icon: 'error',
						title: 'É necessário selecionar os filtros obrigatórios!',
						text: 'Verifique e tente novamente'
					})
		
					$("#ALERTAFILTROS").show("slow")
					$("#ALERTAALVOS").show("slow")

					$("#BOTAOVIEWALVO").hide("slow")
					$("#BOTAOVIEWFILTRO").hide("slow")
		
				}

			}
			else{

				// EXIBE ALERTA
				Swal.fire({
					icon: 'error',
					title: 'É necessário preencher todos os campos obrigatórios!',
					text: 'Verifique e tente novamente'
				})
	
				$("#ALERTAFILTROS").show("slow")
				$("#ALERTAALVOS").show("slow")

				$("#BOTAOVIEWALVO").hide("slow")
				$("#BOTAOVIEWFILTRO").hide("slow")
	
			}


		}
		else{

			// EXIBE ALERTA
			Swal.fire({
				icon: 'error',
				title: 'É necessário preencher algum alvo da atualização!',
				text: 'Verifique a aba Alvos e tente novamente'
			})

			$("#ALERTAFILTROS").show("slow")
			$("#ALERTAALVOS").show("slow")

			$("#BOTAOVIEWALVO").hide("slow")
			$("#BOTAOVIEWFILTRO").hide("slow")

		}
		

	}
	

}

function modalAlvos(){

	var sql = constroiAtualizacao()

	console.log(sql)

	if(sql.length > 0){

		if(!sql[0].VER){

			Swal.fire(sql[0].ALERT)

		}else{

			var indices = numeroRegistrosAlterados(sql);

			carregaTabelaAlteracoes(indices)
		
		}

		window.location.href = "#ALTERACOESBLANK"
	}else{

		
		// EXIBE ALERTA 
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 1000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'warning',
			title: 'Preencha os campos obrigatórios!'
		})

	}


}

function atualizaQuadro(){

	var sql = constroiAtualizacao()

	console.log(sql)

	if(sql.length > 0){

		if(sql[0].VER){

			var indices = numeroRegistrosAlterados(sql);

			carregaTabelaAlteracoes(indices)
		
		}

	}
	else{

		$(".RASTREABILIDADE").empty()

	}
}

// LIMPA O CONTEÚDO DO ZOOM DA ATIVIDADE
function limparZoomAtv(obj){

		
	$("#VIEWATIVIDADE").val("")
	$("#VIEWCODATIVIDADE").val("")
	$("#VIEWDESCATIVIDADE").val("")
	$("#VIEWHABILIDADEREQUERIDA").val("")
	$("#VIEWHABILIDADEREQUERIDA").val(" - ")

}

function carregaTabelaAlteracoes(indices){

	var array = indices.RET

	$(".RASTREABILIDADE").empty()

	$(".fundoModal").draggable()

	for (var i = 0; i < array.length; i++) {

		const element = array[i];

		var seq = carregaCard();

		$("#INDICE___"+seq).text(element['INDICE'])
		$("#CODESTRUTURA___"+seq).text(element['CODIGOPRD'])
		$("#QTDETOTAL___"+seq).text(element['TOTALQTDE'])
		$("#TIPOPRODUTO___"+seq).text(element['TIPODESENHO'])
		$("#DESCPROD___"+seq).text(element['DESCRICAO'])
		$("#EXECESTRUTURA___"+seq).text(element['EXECUCAO'])

		var datarevisao = element['DATAREVISAO'].split('-')

		datarevisao  = datarevisao[2]+'/'+datarevisao[1]+'/'+datarevisao[0]

		$("#LISTA_INFO___"+seq).append("<li>Revisão Desenho : "+element['REVISAODESENHO']+"</li>")
		$("#LISTA_INFO___"+seq).append("<li>Data Revisão Desenho : "+datarevisao+"</li>")
		$("#LISTA_INFO___"+seq).append("<li>N° DBI : "+element['NUMDBI']+"</li>")
		$("#LISTA_INFO___"+seq).append("<li>Revisão DBI : "+element['REVISAODBI']+"</li>")
		$("#LISTA_INFO___"+seq).append("<li>N° Delp : "+element['NUMDOCDELP']+"</li>")
		$("#LISTA_INFO___"+seq).append("<li>Revisão Delp : "+element['REVISAODOCDELP']+"</li>")

		$("#IDENTIFICA___"+seq).append(element['EXECUCAO']=='PRINCIPAL' ? 'P' : 'EX - '+element['EXECUCAO'])

		$("#LISTA_OBS___"+seq).append(element['OBSERVACOESDESENHO'])
		
	}

}

function selecionacard(seq){

	var seq2 = $("div[id^='CARDITEM___']").children('.cardactive').parent().attr("id")

	seq2 = seq2 != null && seq2 !=undefined && seq2!="" ? seq2.split('___')[1] : -1;

	$(".cardactive").removeClass("cardactive")

	if(seq2!=seq){

		$("#CARDITEM___"+seq).children().addClass("cardactive")

		setTimeout(function(){
			document.getElementsByClassName("cardactive")[0].scrollIntoView({
				behavior: "smooth", // or "auto" or "instant"
				block: "center", // or "end"
				inline : "center", // or "
			});
		},300)

	}

}

function carregaCard(){

	var seq = Number($(".RASTREABILIDADE").children().length)+1;

        var str = '<div class="row" id="CARDITEM___'+seq+'"> '+
				'    <div class="card card-horizontal" > '+
				'        <div class="card-thumb" onclick="selecionacard('+seq+')"> '+
				'            <i class="illustration illustration-layout-group illustration-sm" aria-hidden="true" ></i> '+
				'			<span class="badge badge-danger" id="IDENTIFICA___'+seq+'"></span>'+
				'        </div> '+
				'        <div class="card-body"> '+
				'            <div class=""> '+
				'                <div class=""> '+
				'                   <h3 class="card-title">Indice: </h3> '+
				'                   <h3 class="card-title" id="INDICE___'+seq+'" name="INDICE___'+seq+'"></h3> '+
				'                </div> '+
				'                <div  class=""> '+
				'                    <label class="info" for="CODESTRUTURA___'+seq+'">Codigo do produto:</label> '+
				'                    <h3 class="form-control card-small-text" id="CODESTRUTURA___'+seq+'" name="CODESTRUTURA___'+seq+'" onmouseover="mouse(this)" title=""></h3> '+
				'                </div> '+
				'                <div class=""> '+
				'                    <label class="info" for="QTDETOTAL___'+seq+'">Quantidade total:</label> '+
				'                    <h3 class="form-control card-small-text" id="QTDETOTAL___'+seq+'" name="QTDETOTAL___"'+seq+'"  onmouseover="mouse(this)" title=""></h3> '+
				'                </div> '+
				'                <div class=""> '+
				'                    <label class="info" for="TIPOPRODUTO___'+seq+'">Tipo:</label> '+
				'                    <h3 class="form-control card-small-text" id="TIPOPRODUTO___'+seq+'" name="TIPOPRODUTO___'+seq+'"  onmouseover="mouse(this)" title=""></h3>  '+
				'                </div> '+
				'                <div class=""> '+
				'                    <label class="info" for="DESCPROD___'+seq+'">Descrição Produto:</label> '+
				'                    <h3 class="form-control card-small-text" id="DESCPROD___'+seq+'" name="DESCPROD___'+seq+'"  onmouseover="mouse(this)" title=""></h3> '+
				'                </div> '+
				'                <div  class=""> '+
				'                    <label class="info" for="EXECESTRUTURA___'+seq+'">Estrutura ou execução:</label> '+
				'                    <h3 class="form-control card-small-text" id="EXECESTRUTURA___'+seq+'" name="EXECESTRUTURA___'+seq+'"  onmouseover="mouse(this)" title=""></h3> '+
				'                </div> '+
				'                <div class="card-list-items"> '+
				'                    <div class="btn-group col-md-6"> '+
				'                        <button type="button" class="btn btn-link btn-sm dropdown-toggle link-solicitacoes" data-toggle="dropdown"> '+
				'                            <i class="flaticon flaticon-question icon-xl" aria-hidden="true" ></i> '+
				'                        </button> '+
				'                        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel" id="LISTA_INFO___'+seq+'"> '+
				'                        </ul> '+
				'                    </div> '+
				'                    <div class="btn-group col-md-6"> '+
				'                        <button type="button" class="btn btn-link btn-sm dropdown-toggle link-solicitacoes" data-toggle="dropdown"> '+
				'                            <i class="flaticon flaticon-play-filled icon-xl" aria-hidden="true" style="margin-left: 0.2rem;"></i> '+
				'                        </button> '+
				'                        <div class="dropdown-menu dropdown-menu-right" role="menu"  id="LISTA_OBS___'+seq+'"> '+
				'                        </div> '+
				'                    </div> '+
				'                </div> '+
				'            </div> '+
				'        </div> '+
				'       </div>  '+
                  '</div>'

            
        $(".RASTREABILIDADE").append(str)

        return seq;


}

/**
 * 
 * @param {ARRAY DE INDICES QUE SERÃO ATUALIZADOS E SUAS INFORMAÇÕES DE Estrutura} indices 
 * @param {INDICE DO ARRAY DE INDICES} i 
 * @returns {MENSAGEM DE QUAL INDICE ESTÁ SENDO INTEGRADO}
 */

function integra(indices,i){

	var element = indices.RET[i];
	var msg = "";

	var percent = Math.round((i/indices.LENGTH)*100)

	percent = percent < 10 ? 10 :  percent;

	if(element["EXECUCAO"]=='PRINCIPAL'){

		$("#SPANPERCENTATT").text(percent+'%')
		$("#SPANPERCENTATT").attr('aria-valuenow',percent)
		$("#SPANPERCENTATT").css("width",percent+'%')

		msg = 'Integrando item '+element["DESCRICAO"] +' da estrutura principal '

		var c1 = DatasetFactory.createConstraint('OS',element["OS"],element["OS"],ConstraintType.MUST)
		var c2 = DatasetFactory.createConstraint('INDICE',element["INDICE"],element["INDICE"],ConstraintType.MUST)
		var c3 = DatasetFactory.createConstraint('USER',window.parent.window.WCMAPI.userLogin,window.parent.window.WCMAPI.userLogin,ConstraintType.MUST)

		var constraints = new Array(c1,c2,c3);

		var dataset = DatasetFactory.getDataset("dsIntegraIndiceEstrutura",null,constraints,null)

	}
	else{

		$("#SPANPERCENTATT").text(percent+'%')
		$("#SPANPERCENTATT").attr('aria-valuenow',percent)
		$("#SPANPERCENTATT").css("width",percent+'%')

		msg = 'Integrando item '+element["DESCRICAO"]+' da Execução '+element["EXECUCAO"]

		var c1 = DatasetFactory.createConstraint('OS',element["OS"],element["OS"],ConstraintType.MUST)
		var c2 = DatasetFactory.createConstraint('INDICE',element["INDICE"],element["INDICE"],ConstraintType.MUST)
		var c3 = DatasetFactory.createConstraint('CODTRFPAI',element["CODTRFPAI"],element["CODTRFPAI"],ConstraintType.MUST)
		var c4 = DatasetFactory.createConstraint('EXECUCAO',element["EXECUCAO"],element["EXECUCAO"],ConstraintType.MUST)
		var c5 = DatasetFactory.createConstraint('USER',window.parent.window.WCMAPI.userLogin,window.parent.window.WCMAPI.userLogin,ConstraintType.MUST)

		var constraints = new Array(c1,c2,c3,c4,c5);

		var dataset = DatasetFactory.getDataset("dsIntegraIndiceEstruturaEX",null,constraints,null)

	}

	return msg;

}

/**
 * 
 * @param {OBJETO QUE SERÁ UTILIZADO PARA CONSTRUIT QUERY NO BANCO DE DADOS} sql 
 * @returns {RETORNA INDICES QUE SERÃO ALTERADOS E A QUANTIDADE}
 */
function numeroRegistrosAlterados(sql){

	var a = editor.getValue().replace(/\n/gmi,"")
	a = a.replace(/UPDATE.*?FROM/i,"SELECT DISTINCT ALTERAR FROM" )
	a = a.replace(/;.*?UPDATE.*?FROM/ig,"UNION SELECT DISTINCT ALTERAR FROM" )
	a = a.replace(/DISTINCT\s*ALTERAR\s*FROM\s*Z_CRM_EX/ig," DISTINCT cast(Z.EXECUCAO as varchar(5)) EXECUCAO,INDICE, OS, CODTRFPAI, concat(NUMDESENHO,'-',POSICAODESENHO,'-',DESCRICAO) DESCRICAO,isnull(CODIGOPRD,'') CODIGOPRD,TOTALQTDE,TIPODESENHO,NUMDBI,REVISAODBI,NUMDOCDELP,REVISAODOCDELP,REVISAODESENHO,DATAREVISAO,OBSERVACOESDESENHO FROM Z_CRM_EX")
	a = a.replace(/DISTINCT\s*ALTERAR\s*FROM\s*Z_CRM_ML/ig," DISTINCT 'PRINCIPAL' EXECUCAO,INDICE,OS, '' CODTRFPAI , concat(NUMDESENHO,'-',POSICAODESENHO,'-',DESCRICAO) DESCRICAO,isnull(CODIGOPRD,'') CODIGOPRD,TOTALQTDE,TIPODESENHO,NUMDBI,REVISAODBI,NUMDOCDELP,REVISAODOCDELP,REVISAODESENHO,DATAREVISAO,OBSERVACOESDESENHO FROM Z_CRM_ML")
	editor.insert(editor.getValue() + '\n' +a)
	//	a = a.replace(/\n/gi,"")
	//console.log(a)

	sql = new Array(sql);

	//console.log("sql :",sql)

	a = a.split(" ")

	//console.log('sql : ',a)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("USER",window.parent.window.WCMAPI.userLogin,window.parent.window.WCMAPI.userLogin,ConstraintType.MUST)
	var constraints = new Array(a1)


	for (var i = 0; i < a.length; i++) {

		var element = a[i];
		var a2 = DatasetFactory.createConstraint("SQL"+i,element,element,ConstraintType.MUST)
		constraints.push(a2)

	}
	
	var dataset = DatasetFactory.getDataset("dsExecutaConsulta",null,constraints,null)

	//console.log('dataset : ',dataset)

	var row = dataset.values

	//console.log('row : ',row)

	return {LENGTH:row.length, RET : row};

}

/**
 * 
 * @returns {TRUE SE TODOS OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS, SE NÃO RETORNA FALSE}
 */
function verificaObrigatorios(){

	var ret = true;

	$("[obrigatorio]").each(function(){

		var valor = $(this).val();

		if(valor=="" || valor==undefined || valor==null){

			ret = false;

		}

	})

	return ret;

}

/**
 * * FUNÇÃO QUE ESPELHA O CHECKBOX DE "Atualizar Estrutura principal" DA ABA ALVOS PARA A ABA REVISÃO
*/
async function CheckChange(obj){

	if($(obj).prop("checked")){

		var verifica = await verificaOS($("#NUM_OS").val())
		//console.log(verifica,verifica.TIPO,verifica.SOLICITACAO,verifica.VER)
		if(verifica.VER){
			$("#ESTRUTURAPRINCIPALREV").prop("checked", $(obj).prop("checked"))

			$("select[id^='CAMPOFILTROZOOM___']").each(function(){

				var seq = $(this).attr("id").split("___")[1]

				var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
				// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
				reloadZoomFilterValues("VALORFILTROZOOM___"+seq, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq).val()+",CODTRFPAI,"+$("#CODTRFEX").val()+",PRINCIPAL,"
				+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq).val()+",WHERE,"+retornaWhere(seq));

			})

		}
		else{
			// EXIBE ALERTA
			Swal.fire({
				icon: 'error',
				title: 'A OS selecionada já está sendo '+(verifica.TIPO=='EDICAO' ?  'editada' : 'cadastrada')+'!', 
				footer: '<span class="solicitacoes">Solicitação: &nbsp;<a href="'+window.parent.window.location.href.split('portal')[0]+'portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+verifica.SOLICITACAO+'" target="_blank">'+verifica.SOLICITACAO+' </a></span> ',
				allowOutsideClick : false,
				allowEscapeKey : false
			})
			$(obj).prop("checked",false)
		}

	}
	else{
		$("#ESTRUTURAPRINCIPALREV").prop("checked", $(obj).prop("checked"))
	}
	
}




/**
 * 
 * @param {SEQUENCIAL QUE FOI SELECIONADO} seq 
 * * VERIFICA SE O FILTRO SELECIONADO JÀ NÂO FOI SELECIONADO
 * @returns {TRUE SE JÁ FOI SELECIONADO - FALSE SE AINDA NÃO FOI SELECIONA} 
 */
function verificaCampoFiltroZoom(seq){
	
	var ret = false;

	$("input[id^='CAMPOFILTRO___']").each(function(){

		var valor = $(this).val()
		//console.log("valor: ",valor,$("#CAMPOFILTRO___"+seq).val())
		var seq2 = $(this).attr("id").split("___")[1]
		//console.log("seq2",seq2,seq)

		if(+seq!=+seq2 && valor==$("#CAMPOFILTRO___"+seq).val()){

			ret = true;

		}

	})

	return ret;

}

/**
 * 
 * @param {ARRAY COM TODOS OS ELEMENTOS} a1 
 * @param {ARRAY COM ELEMENTOS OBRIGATÓRIOS} a2 
 * @returns { VERDADEIRO SE TODOS OS ELEMENTOS DE A2 ESTÃO EM A1 / FALSO SE ALGUM ELEMENTO DE A2 NÃO ESTÁ EM A1}
 */
function ComparaArraysFiltros(a1,a2){

	var ret = true;


	for (var i = 0; i < a2.length; i++) {
		
		ret = a1.includes(a2[i])
		if(!ret){break;}

	}

	return ret;

}


/**
 * * VERIFICA SE OS FILTROS PREENCHIDOS ATENDEM AS ESPECIFICACOES DO CAMPO A SER ATUALIZADO
 * @return {TRUE - FILTROS ATENDEM, FALSE - FILTROS NÃO ATENDEM}
 */
function verificaFiltrosPreenchidos(){

	var campos = $("#FILTROSOBRIGATORIOS").val()
	var campos = campos.split(";")
	var campospre = new Array();

	$("input[id^='CAMPOFILTRO___']").each(function(){

		var valor = $(this).val()

		if(valor!="" && valor!=null && valor!=undefined ){

			campospre.push(valor)

		}

	})

	//console.log("arrays de campos", campos, campospre)

	if(ComparaArraysFiltros(campospre,campos)){
		return true;
	}
	else{
		return false;
	}


}

/**
 * *CHAMA AS FUNÇÕES PARA CRIAÇÃO DO UPDATE SQL QUE SERÁ ENVIADO PARA DATASET
 */
function constroiAtualizacao(){

	var sql = new Array();

	var campo = $("#CODCAMPO").val()
	var tabela = $("#CODTABELA").val()
	var converter = $("#CONVERTERCAMPO").val()
	var os = $("#NUM_OS").val()

	var ret={VER:true};

	var filtros = new Array();

	$("input[id^='CAMPOFILTRO___'").each(function(){

		var seq = $(this).attr("id").split("___")[1];

		if($("#CAMPOFILTRO___"+seq).val()!="" && $("#CAMPOFILTRO___"+seq).val()!=null && $("#CAMPOFILTRO___"+seq).val()!=undefined){
			filtros.push({
				CAMPO:$("#CAMPOFILTRO___"+seq).val(),
				TABELA:$("#TABELAFILTRO___"+seq).val(),
				VALOR:$("#VALORFILTRO___"+seq).val(),
			})
		}

	})

	var param;

	if($("#ESTRUTURAPRINCIPAL").prop("checked")){

		param = {CAMPO:campo,TABELA:tabela,CONVERTER:converter,FILTROS:filtros, VALOR:null,OS: os, INDICEPAI : $("#INDICEPAI").val(), ALVO : "ML"};

		ret = montaSqlPrincipal(param)

		if(ret.VER){
		
			sql.push({
				VER:true,
				ALERT:ret.PUSH
			})

		}
		else{

			sql.push({
				VER:false,
				ALERT:{
				icon:  'error',
				title: 'Erro ao executar atualização!',
				text: ret.PUSH
			}})

		}

	}
	if($("#EXECUCAO_INFO").val()!="" && $("#EXECUCAO_INFO").val()!=null && $("#EXECUCAO_INFO").val()!=undefined){

		var array_execucao = new Set($("#EXECUCAO_INFO").val().split(";"))
		array_execucao = Array.from(array_execucao)
		array_execucao = array_execucao.toString()

		filtros.push({
			CAMPO:'CODTRFPAI',
			TABELA:'001005',
			VALOR:$("#CODTRFEX").val(),
		})
		filtros.push({
			CAMPO:'EXECUCAO',
			TABELA:'001005',
			VALOR: "\'"+array_execucao.replace(/,/g,"\',\'")+"\'",
		})

		param = {CAMPO:campo,TABELA:tabela,CONVERTER:converter,FILTROS:filtros, VALOR:null,OS: os, ALVO : "EX"};

		if(ret.VER){

			ret = montaSqlExecucao(param)

			if(ret.VER){

				sql.push({
					VER:true,
					ALERT:ret.PUSH
				})

			}
			else{

				sql.push({
					VER:false,
					ALERT:{
					icon:  'error',
					title: 'Erro ao executar atualização!',
					text: ret.PUSH
				}})


			}

		}

	}

	if(ret.VER){

		var editortexto = "";

		for (var i = 0; i < sql.length; i++) {
			
			editortexto += sql[i].ALERT.SQL
			//console.log(editortexto)
			
		}

		editor.setValue(editortexto)
		//editor.setReadOnly(true)
	}
	
	
	return sql;

}

/**
 * * BUSCA VALORES DOS CAMPOS DO FORMULÁRIO PARA MONTAR UPDATE SQL NA TABELA DA ML
 * @returns {RETORNA STRING DO SQL PARA SER ENVIADA EM DATASET}
 */
function montaSqlPrincipal(param){

	var sql;
	var ret=true;
	var error;
	//console.log("param principal",param)

	if(param.CAMPO=="CODIGOPRDCOMPONENTES"){

		param.VALOR = {

			PRODUTOCOMPONENTES:$("#VIEWPRODUTOCOMPONENTES___VALOR1").val(), 
			IDPRDCOMPONENTES:$("#VIEWIDPRDCOMPONENTES___VALOR1").val(),
			CODIGOPRDCOMPONENTES: $("#VIEWCODIGOPRDCOMPONENTES___VALOR1").val(), 
			CODUNDCOMPONENTES: $("#VIEWCODUNDCOMPONENTES___VALOR1").val(),
		}

		sql = montaCorpoSqlProduto(param)

		var sql1 = sql.SQL.split("FROM")[1].replace("CODIGOPRDCOMPONENTES","SUBSTITUTOCOMPONENTES")

		sql1 = "UPDATE Z SET Z.SUBSTITUTOCOMPONENTES='"+param.VALOR.CODIGOPRDCOMPONENTES+"',  Z.RECMODIFIEDON=GETDATE(), Z.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"' FROM "+sql1
		
		sql.SQL += sql1 

	}
	else if(param.CAMPO=="SUBSTITUTOCOMPONENTES"){

		var substituto = param.FILTROS.filter(function(x){return x.CAMPO=="CODIGOPRDCOMPONENTES"}) ;

		param.VALOR = {
	
			PRODUTOCOMPONENTES:$("#VIEWPRODUTOCOMPONENTES___VALOR2").val(), 
			IDPRDCOMPONENTES:$("#VIEWIDPRDCOMPONENTES___VALOR2").val(),
			CODIGOPRDCOMPONENTES: $("#VIEWCODIGOPRDCOMPONENTES___VALOR2").val(), 
			CODUNDCOMPONENTES: $("#VIEWCODUNDCOMPONENTES___VALOR2").val(),
			SUBSTITUTOCOMPONENTES: substituto.VALOR,
		}

		sql = montaCorpoSqlProduto(param)

	}
	else if(param.CAMPO=="PRIORIDADEATVCOMPONENTES"){

		param.VALOR=$("#VALOR").val()

		var indices = verificaRegraPrioridade("COMPONENTE",param)

		if(indices.VER){

			sql = montaCorpoSql(param)

			sql.SQL = sql.SQL.split(';')[0]

			sql.SQL += " AND Z.LISTACOMPONENTES!='L'  ;"
		}
		else{

			ret = false;
			error = "Atualização não pode ocorrer na estrutura principal devido às incongruências nos índices : "+ indices.STRING;

		}

	}
	else if(param.CAMPO=="PRIORIDADE"){

		param.VALOR=$("#VALOR").val()

		var indices = verificaRegraPrioridade("ATIVIDADE",param)

		if(indices.VER){

			sql = montaCorpoSql(param)

		}
		else{

			ret = false;
			error = "Atualização não pode ocorrer na estrutura principal devido às incongruências nos índices : "+ indices.STRING;

		}

	}
	else if(param.CAMPO=="QTDEUNCOMP"){

		param.VALOR=$("#VALOR").val()

		sql = montaCorpoSql(param)

		var sql1 = "UPDATE Z019 " 

		if(param.VALOR=="PESOUNITARIO"){
			sql1 += " SET Z019.QTDEUNCOMPONENTES=(Z.PESOUNITARIO),Z019.QTDETOTALCOMPONENTES=(Z.PESOBRUTO), Z019.RECMODIFIEDON=GETDATE(), Z019.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"' FROM Z_CRM_ML" + param.TABELA + " Z "
		}
		else{
			sql1 += " SET Z019.QTDEUNCOMPONENTES=(Z.DESQTDE),Z019.QTDETOTALCOMPONENTES=(Z.TOTALQTDE), Z019.RECMODIFIEDON=GETDATE(), Z019.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"'  FROM Z_CRM_ML" + param.TABELA + " Z "
		}

		sql.SQL += sql1 + sql.JOIN + sql.WHERE + " AND Z019.LISTACOMPONENTES='L' " + "; ";

	}
	else if(param.CAMPO=="PESOUNITARIO"){

		param.VALOR=$("#VALOR").val()

		sql = montaCorpoSql(param)


		var sql1 = "UPDATE Z " 

		sql1 += " SET Z.PESOBRUTO=(CAST(REPLACE(Z.PESOUNITARIO,',','.') AS FLOAT)*CAST(REPLACE(Z.TOTALQTDE,',','.') AS FLOAT)), Z.RECMODIFIEDON=GETDATE(), Z.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"' FROM Z_CRM_ML" + param.TABELA + " Z "

		sql.SQL += sql1 + sql.JOIN + sql.WHERE + "; ";


		var sql2 = "UPDATE Z019 " 

		sql2 += " SET Z019.QTDEUNCOMPONENTES=(Z.PESOUNITARIO),Z019.QTDETOTALCOMPONENTES=(Z.PESOBRUTO), Z019.RECMODIFIEDON=GETDATE(), Z019.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"' FROM Z_CRM_ML" + param.TABELA + " Z "
		

		sql.SQL += sql2 + sql.JOIN + sql.WHERE + " AND Z019.LISTACOMPONENTES='L' " + "; ";

	}
	else if(param.CAMPO=="PESOUNLIQUIDO"){

		param.VALOR=$("#VALOR").val()

		sql = montaCorpoSql(param)

		var sql1 = "UPDATE Z " 

		sql1 += " SET Z.PESOLIQUIDO=(CAST(REPLACE(Z.PESOUNLIQUIDO,',','.') AS FLOAT)*CAST(REPLACE(Z.TOTALQTDE,',','.') AS FLOAT)), Z.RECMODIFIEDON=GETDATE(), Z.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"' FROM Z_CRM_ML" + param.TABELA + " Z "

		sql.SQL += sql1 + sql.JOIN + sql.WHERE + "; ";

	}
	else if(param.CAMPO=="CODPOSTO"){

		param.VALOR = $("#VIEWCODPOSTO").val()

		sql = montaCorpoSql(param)

		var sql1 = " Z.DESCPOSTO='"+$("#VIEWDESCPOSTO").val()+"', Z.RECMODIFIEDON=GETDATE()"

		sql.SQL = sql.SQL.replaceAll('Z.RECMODIFIEDON=GETDATE()',sql1)

	}
	else if(param.CAMPO=="FILA" || param.CAMPO=="CONFIGURACAO" || param.CAMPO=="PROCESSAMENTO" || param.CAMPO=="DESAGREGACAO" || param.CAMPO=="ESPERA" || param.CAMPO=="MOVIMENTACAO"){

		param.VALOR = $("#VALOR").val()

		sql = montaCorpoSql(param)

		var sql1 = " Z.MINUTOSGASTOS=CAST(FILA AS INT)+CAST(CONFIGURACAO AS INT)+CAST(PROCESSAMENTO AS INT)+CAST(DESAGREGACAO AS INT)+CAST(ESPERA AS INT)+CAST(MOVIMENTACAO AS INT), Z.RECMODIFIEDON=GETDATE()"

		sql1 = sql1.replace(param.CAMPO, param.VALOR)

		sql.SQL = sql.SQL.replaceAll('Z.RECMODIFIEDON=GETDATE()',sql1)

	}
	else if(param.CAMPO=="CODATIVIDADE"){

		param.VALOR = $("#VIEWCODATIVIDADE").val()

		var indices = verificaRegraPrioridade("CODATIVIDADE",param)

		if(indices.VER){

			sql = montaCorpoSql(param)

			var sql1 = " Z.DESCATIVIDADE='"+$("#VIEWDESCATIVIDADE").val()+"',"+
			" Z.HABILIDADEREQUERIDA='"+$("#VIEWHABILIDADEREQUERIDA").val()+"',"+
			" Z.CODHABILIDADE='"+$("#VIEWCODHABILIDADE").val()+"',"+
			" Z.RECMODIFIEDON=GETDATE()"

			sql.SQL = sql.SQL.replaceAll('Z.RECMODIFIEDON=GETDATE()',sql1)
		
		}
		else{

			ret = false;
			error = "Atualização não pode ocorrer nas execuções devido às incongruências nos índices : "+ indices.STRING

		}

	}
	else{

		param.VALOR=$("#VALOR").val()

		sql = montaCorpoSql(param)

	}

	if(ret){

		sql = {VER:true,PUSH:sql};

	}
	else{
		sql = {VER:false,PUSH:error};
	}

	return sql;

}

/**
 * * BUSCA VALORES DOS CAMPOS DO FORMULÁRIO PARA MONTAR UPDATE SQL NA TABELA DA EX
 * @returns {RETORNA STRING DO SQL PARA SER ENVIADA EM DATASET}
 */
function montaSqlExecucao(param){

	var sql;
	var ret=true;
	var error;
	//console.log("param principal",param)

	if(param.CAMPO=="CODIGOPRDCOMPONENTES"){

		param.VALOR = {

			PRODUTOCOMPONENTES:$("#VIEWPRODUTOCOMPONENTES___VALOR1").val(), 
			IDPRDCOMPONENTES:$("#VIEWIDPRDCOMPONENTES___VALOR1").val(),
			CODIGOPRDCOMPONENTES: $("#VIEWCODIGOPRDCOMPONENTES___VALOR1").val(), 
			CODUNDCOMPONENTES: $("#VIEWCODUNDCOMPONENTES___VALOR1").val(),
		}

		sql = montaCorpoSqlProdutoEx(param)

		var sql1 = sql.SQL.split("FROM")[1].replace("CODIGOPRDCOMPONENTES","SUBSTITUTOCOMPONENTES")

		sql1 = "UPDATE Z SET Z.SUBSTITUTOCOMPONENTES='"+param.VALOR.CODIGOPRDCOMPONENTES+"',  Z.RECMODIFIEDON=GETDATE(), Z.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"' FROM "+sql1
		
		sql.SQL += sql1 

	}
	else if(param.CAMPO=="SUBSTITUTOCOMPONENTES"){

		var substituto = param.FILTROS.filter(function(x){return x.CAMPO=="CODIGOPRDCOMPONENTES"}) ;

		param.VALOR = {
	
			PRODUTOCOMPONENTES:$("#VIEWPRODUTOCOMPONENTES___VALOR2").val(), 
			IDPRDCOMPONENTES:$("#VIEWIDPRDCOMPONENTES___VALOR2").val(),
			CODIGOPRDCOMPONENTES: $("#VIEWCODIGOPRDCOMPONENTES___VALOR2").val(), 
			CODUNDCOMPONENTES: $("#VIEWCODUNDCOMPONENTES___VALOR2").val(),
			SUBSTITUTOCOMPONENTES: substituto.VALOR,
		}

		sql = montaCorpoSqlProdutoEX(param)

	}
	else if(param.CAMPO=="PRIORIDADEATVCOMPONENTES"){

		param.VALOR=$("#VALOR").val()

		var indices = verificaRegraPrioridade("COMPONENTE",param)

		if(indices.VER){

			sql = montaCorpoSqlEx(param)

			//sql.SQL = sql.SQL.split(';')[0]

			//sql.SQL += " AND Z.LISTACOMPONENTES!='L'  ;"
		 
		}
		else{

			ret = false;
			error = "Atualização não pode ocorrer nas execuções devido às incongruências nos índices : "+ indices.STRING

		}

	}
	else if(param.CAMPO=="PRIORIDADE"){

		param.VALOR=$("#VALOR").val()

		var indices = verificaRegraPrioridade("ATIVIDADE",param)

		if(indices.VER){

			sql = montaCorpoSqlEx(param)

		
		}
		else{

			ret = false;
			error = "Atualização não pode ocorrer nas execuções devido às incongruências nos índices : "+ indices.STRING

		}

	}
	else if(param.CAMPO=="QTDEUNCOMP"){

		param.VALOR=$("#VALOR").val()

		sql = montaCorpoSqlEx(param)

		var sql1 = "UPDATE Z019 " 

		if(param.VALOR=="PESOUNITARIO"){
			sql1 += " SET Z019.QTDEUNCOMPONENTES=(Z.PESOUNITARIO),Z019.QTDETOTALCOMPONENTES=(Z.PESOBRUTO), Z019.RECMODIFIEDON=GETDATE(), Z019.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"' FROM Z_CRM_EX" + param.TABELA + " Z "
		}
		else{
			sql1 += " SET Z019.QTDEUNCOMPONENTES=(Z.DESQTDE),Z019.QTDETOTALCOMPONENTES=(Z.TOTALQTDE), Z019.RECMODIFIEDON=GETDATE(), Z019.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"'  FROM Z_CRM_EX" + param.TABELA + " Z "
		}

		sql.SQL += sql1 + sql.JOIN + sql.WHERE + " AND Z019.LISTACOMPONENTES='L' " + "; ";

	}
	else if(param.CAMPO=="PESOUNITARIO"){

		param.VALOR=$("#VALOR").val()

		sql = montaCorpoSqlEx(param)


		var sql1 = "UPDATE Z " 

		sql1 += " SET Z.PESOBRUTO=(CAST(REPLACE(Z.PESOUNITARIO,',','.') AS FLOAT)*CAST(REPLACE(Z.TOTALQTDE,',','.') AS FLOAT)), Z.RECMODIFIEDON=GETDATE(), Z.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"' FROM Z_CRM_EX" + param.TABELA + " Z "

		sql.SQL += sql1 + sql.JOIN + sql.WHERE + "; ";


		var sql2 = "UPDATE Z019 " 

		sql2 += " SET Z019.QTDEUNCOMPONENTES=(Z.PESOUNITARIO),Z019.QTDETOTALCOMPONENTES=(Z.PESOBRUTO), Z019.RECMODIFIEDON=GETDATE(), Z019.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"' FROM Z_CRM_EX" + param.TABELA + " Z "
		

		sql.SQL += sql2 + sql.JOIN + sql.WHERE + " AND Z019.LISTACOMPONENTES='L' " + "; ";

	}
	else if(param.CAMPO=="PESOUNLIQUIDO"){

		param.VALOR=$("#VALOR").val()

		sql = montaCorpoSqlEx(param)

		var sql1 = "UPDATE Z " 

		sql1 += " SET Z.PESOLIQUIDO=(CAST(REPLACE(Z.PESOUNLIQUIDO,',','.') AS FLOAT)*CAST(REPLACE(Z.TOTALQTDE,',','.') AS FLOAT)), Z.RECMODIFIEDON=GETDATE(), Z.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"' FROM Z_CRM_EX" + param.TABELA + " Z "

		sql.SQL += sql1 + sql.JOIN + sql.WHERE + "; ";

	}
	else if(param.CAMPO=="CODPOSTO"){

		param.VALOR = $("#VIEWCODPOSTO").val()

		sql = montaCorpoSqlEx(param)

		var sql1 = " Z.DESCPOSTO='"+$("#VIEWDESCPOSTO").val()+"', Z.RECMODIFIEDON=GETDATE()"

		sql.SQL = sql.SQL.replaceAll('Z.RECMODIFIEDON=GETDATE()',sql1)

	}
	else if(param.CAMPO=="FILA" || param.CAMPO=="CONFIGURACAO" || param.CAMPO=="PROCESSAMENTO" || param.CAMPO=="DESAGREGACAO" || param.CAMPO=="ESPERA" || param.CAMPO=="MOVIMENTACAO"){

		param.VALOR = $("#VALOR").val()

		sql = montaCorpoSqlEx(param)

		var sql1 = " Z.MINUTOSGASTOS=( CAST(FILA AS INT)+CAST(CONFIGURACAO AS INT)+CAST(PROCESSAMENTO AS INT)+CAST(DESAGREGACAO AS INT)+CAST(ESPERA AS INT)+CAST(MOVIMENTACAO AS INT) ), Z.RECMODIFIEDON=GETDATE()"

		sql1 = sql1.replace(param.CAMPO, param.VALOR)

		sql.SQL = sql.SQL.replaceAll('Z.RECMODIFIEDON=GETDATE()',sql1)

	}
	else if(param.CAMPO=="CODATIVIDADE"){

		param.VALOR = $("#VIEWCODATIVIDADE").val()

		var indices = verificaRegraPrioridade("CODATIVIDADE",param)

		if(indices.VER){

			param.VALOR = $("#VIEWCODATIVIDADE").val()

			sql = montaCorpoSqlEx(param)

			var sql1 = " Z.DESCATIVIDADE='"+$("#VIEWDESCATIVIDADE").val()+"',"+
			" Z.HABILIDADEREQUERIDA='"+$("#VIEWHABILIDADEREQUERIDA").val()+"',"+
			" Z.CODHABILIDADE='"+$("#VIEWCODHABILIDADE").val()+"',"+
			" Z.RECMODIFIEDON=GETDATE()"

			sql.SQL = sql.SQL.replaceAll('Z.RECMODIFIEDON=GETDATE()',sql1)
		
		}
		else{

			ret = false;
			error = "Atualização não pode ocorrer nas execuções devido às incongruências nos índices : "+ indices.STRING

		}


	}
	else{

		param.VALOR=$("#VALOR").val()

		sql = montaCorpoSqlEx(param)

	}

	if(ret){

		sql = {VER:true,PUSH:sql};

	}
	else{
		sql = {VER:false,PUSH:error};
	}

	return sql;

}

/**
 * 
 * @param {RECEBE OBJETO COM OS VALORES MAIS IMPORTANTES PREENCHIDOS NO FORMULÁRIO QUE SERÃO USADOS NA CONSTRUÇÃO DO CORPO PADRÃO DA QUERY SQL}param
 * @returns {RETORNA OBJETO DE UPDATE PADRÃO PARA O COMPONENTE, PRINCIPAL OU SUBSTITUTO -> @{ SQL : sql, WHERE : where, JOIN : join};} 
 */
function montaCorpoSqlProduto(param){

	var where = "";
	var join = "";

	sql = "UPDATE Z " 

	var set_tabelas = new Set();

	sql += " SET "

	for (var key in param.VALOR) {

		sql += " Z." + key + "='" + param.VALOR[key] + "', "

	}

	sql += " Z.RECMODIFIEDON=GETDATE(), Z.RECMODIFIEDBY='" + window.parent.window.WCMAPI.userLogin + "' FROM Z_CRM_ML" + param.TABELA + " Z "

	switch (param.TABELA) {
		case '001005':
			where += " WHERE OS='" + param.OS + "' "
			break;
		case '001019':
			where += " WHERE OSCOMPONENTES='" + param.OS + "' "
			break;
		case '001021':
			where += " WHERE OSPROCESSO='" + param.OS + "' "
			break;
		default:
			break;
	}

	for(var i=0; i<param.FILTROS.length; i++){

		where += " AND " + param.FILTROS[i].CAMPO + "='" + param.FILTROS[i].VALOR + "' "

		if(param.FILTROS[i].TABELA!=param.TABELA){
			set_tabelas.add(param.FILTROS[i].TABELA)
		}

	}

	if(param.INDICEPAI!="" && param.INDICEPAI!=null && param.INDICEPAI!=undefined){
		where += " AND INDICE LIKE '" + param.INDICEPAI + "%' "
	}

	where += " AND Z.LISTACOMPONENTES!='L' "

	//console.log("tabelas join", set_tabelas)

	join += retornaJoinPrincipal(param,set_tabelas)

	sql += join + where + "; ";

	return { SQL : sql, WHERE : where, JOIN : join};

}

/**
 * 
 * @param {RECEBE OBJETO COM OS VALORES MAIS IMPORTANTES PREENCHIDOS NO FORMULÁRIO QUE SERÃO USADOS NA CONSTRUÇÃO DO CORPO PADRÃO DA QUERY SQL}param
 * @returns {RETORNA OBJETO DE UPDATE PADRÃO PARA O CAMPO #VALOR -> @{ SQL : sql, WHERE : where, JOIN : join};} 
 *
 */
function montaCorpoSql(param){

	var where = "";
	var join = "";

	sql = "UPDATE Z " 

	var set_tabelas = new Set();

	sql += " SET Z." + param.CAMPO + "='"+param.VALOR + "', Z.RECMODIFIEDON=GETDATE(), Z.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"'  FROM Z_CRM_ML" + param.TABELA + " Z "

	switch (param.TABELA) {
		case '001005':
			where += " WHERE OS='" + param.OS + "' "
			break;
		case '001019':
			where += " WHERE OSCOMPONENTES='" + param.OS + "' "
			break;
		case '001021':
			where += " WHERE OSPROCESSO='" + param.OS + "' "
			break;
		default:
			break;
	}

	if(param.CAMPO=="QTDEUNCOMP" || param.CAMPO=="PESOUNITARIO"){

		set_tabelas.add("001019")
	
	}

	for(var i=0; i<param.FILTROS.length; i++){

		if(param.FILTROS[i].CAMPO=="OBSERVACOESDESENHO"){

			where += " AND REPLACE(REPLACE(" + param.FILTROS[i].CAMPO + ",CHAR(13) + Char(10) ,''), CHAR(10), '')='" + param.FILTROS[i].VALOR + "' "

		}
		else{

			where += " AND " + param.FILTROS[i].CAMPO + "='" + param.FILTROS[i].VALOR + "' "

		}

		if(param.FILTROS[i].TABELA!=param.TABELA){
			set_tabelas.add(param.FILTROS[i].TABELA)
		}

	}

	if(param.INDICEPAI!="" && param.INDICEPAI!=null && param.INDICEPAI!=undefined){
		where += " AND INDICE LIKE '" + param.INDICEPAI + "%' "
	}

	//console.log("tabelas join", set_tabelas)

	join += retornaJoinPrincipal(param,set_tabelas)

	sql += join + where + "; ";

	return { SQL : sql, WHERE : where, JOIN : join};

}

/**
 * 
 * @param {RECEBE OBJETO COM OS VALORES MAIS IMPORTANTES PREENCHIDOS NO FORMULÁRIO QUE SERÃO USADOS NA CONSTRUÇÃO DO CORPO PADRÃO DA QUERY SQL QUE IRÁ ATUALIZAR AS EXECUÇÕES}param
 * @returns {RETORNA OBJETO DE UPDATE PADRÃO PARA O COMPONENTE, PRINCIPAL OU SUBSTITUTO -> @{ SQL : sql, WHERE : where, JOIN : join};} 
 */
function montaCorpoSqlProdutoEx(param){

	var where = "";
	var join = "";

	sql = "UPDATE Z " 

	var set_tabelas = new Set();

	sql += " SET "

	for (var key in param.VALOR) {

		sql += " Z." + key + "='" + param.VALOR[key] + "', "

	}

	sql += " Z.RECMODIFIEDON=GETDATE(), Z.RECMODIFIEDBY='" + window.parent.window.WCMAPI.userLogin + "' FROM Z_CRM_EX" + param.TABELA + " Z "

	switch (param.TABELA) {
		case '001005':
			where += " WHERE OS='" + param.OS + "' "
			break;
		case '001019':
			where += " WHERE OSCOMPONENTES='" + param.OS + "' "
			break;
		case '001021':
			where += " WHERE OSPROCESSO='" + param.OS + "' "
			break;
		default:
			break;
	}

	for(var i=0; i<param.FILTROS.length; i++){

		if(param.FILTROS[i].CAMPO=="EXECUCAO"){
			where += " AND Z." + param.FILTROS[i].CAMPO + " IN (" + param.FILTROS[i].VALOR + ") "
		}
		else{
			where += " AND " + param.FILTROS[i].CAMPO + "='" + param.FILTROS[i].VALOR + "' "
		}

		if(param.FILTROS[i].TABELA!=param.TABELA){
			set_tabelas.add(param.FILTROS[i].TABELA)
		}

	}

	where += " AND ITEMEXCLUSIVO!=2 "

	//console.log("tabelas join", set_tabelas)

	join += retornaJoinPrincipalEx(param,set_tabelas)

	sql += join + where + "; ";

	return { SQL : sql, WHERE : where, JOIN : join};

}

/**
 * 
 * @param {RECEBE OBJETO COM OS VALORES MAIS IMPORTANTES PREENCHIDOS NO FORMULÁRIO QUE SERÃO USADOS NA CONSTRUÇÃO DO CORPO PADRÃO DA QUERY SQL PARA ATUALIZAR AS EXECUÇÔES}param
 * @returns {RETORNA OBJETO DE UPDATE PADRÃO PARA O CAMPO #VALOR -> @{ SQL : sql, WHERE : where, JOIN : join};} 
 */
function montaCorpoSqlEx(param){

	var where = "";
	var join = "";

	sql = "UPDATE Z " 

	var set_tabelas = new Set();

	sql += " SET Z." + param.CAMPO + "='"+param.VALOR + "', Z.RECMODIFIEDON=GETDATE(), Z.RECMODIFIEDBY='"+window.parent.window.WCMAPI.userLogin+"'  FROM Z_CRM_EX" + param.TABELA + " Z "

	switch (param.TABELA) {
		case '001005':
			where += " WHERE OS='" + param.OS + "' "
			break;
		case '001019':
			where += " WHERE OSCOMPONENTES='" + param.OS + "' "
			break;
		case '001021':
			where += " WHERE OSPROCESSO='" + param.OS + "' "
			break;
		default:
			break;
	}

	if(param.CAMPO=="QTDEUNCOMP" || param.CAMPO=="PESOUNITARIO"){

		set_tabelas.add("001019")
	
	}

	for(var i=0; i<param.FILTROS.length; i++){

		if(param.FILTROS[i].CAMPO=="EXECUCAO"){
			where += " AND Z." + param.FILTROS[i].CAMPO + " IN (" + param.FILTROS[i].VALOR + ") "
		}
		else if(param.FILTROS[i].CAMPO=="OBSERVACOESDESENHO"){

			where += " AND REPLACE(REPLACE(" + param.FILTROS[i].CAMPO + ",CHAR(13) + Char(10) ,''), CHAR(10), '')='" + param.FILTROS[i].VALOR + "' "

		}
		else{
			where += " AND " + param.FILTROS[i].CAMPO + "='" + param.FILTROS[i].VALOR + "' "
		}

		if(param.FILTROS[i].TABELA!=param.TABELA){
			set_tabelas.add(param.FILTROS[i].TABELA)
		}

	}

	where += " AND ITEMEXCLUSIVO!=2 "

	//console.log("tabelas join", set_tabelas)

	join += retornaJoinPrincipalEx(param,set_tabelas)

	sql += join + where + "; ";

	return { SQL : sql, WHERE : where, JOIN : join};

}

/**
 * 
 * @param {CAMPOS PREENCHIDOS DO HTML} param 
 * @param {TABELAS QUE PRECISAM SER INSERIDAS NO JOIN} set_tabelas 
 * @returns {STRING QUE DEVE SER INSERIDA NA QUERY SQL REPRESENTANDO AS INFORMAÇÕES DOS JOINS ENTRE AS TABELAS}
 */
function retornaJoinPrincipal(param,set_tabelas){

	var join = ""

	var iterator = set_tabelas.values()

	for(var i=0; i<set_tabelas.size; i++){
		
		var tabela = iterator.next().value

		//console.log("tabela join",i, tabela)

		if(tabela=="001005"){

			if(param.TABELA=="001019"){

				join += " INNER JOIN Z_CRM_ML001005 Z05 ON Z05.IDCRIACAO=Z.IDCRIACAOCOMPONENTES AND Z05.OS=Z.OSCOMPONENTES "
			
			}
			if(param.TABELA=="001021"){

				join += " INNER JOIN Z_CRM_ML001005 Z05 ON Z05.IDCRIACAO=Z.IDCRIACAOPROCESSO AND Z05.OS=Z.OSPROCESSO "
			
			}

		}
		if(tabela=="001019"){

			if(param.TABELA=="001005"){

				if(join.search("Z_CRM_ML001019")!=-1){
					join += " INNER JOIN Z_CRM_ML001019 Z019 ON Z019.IDCRIACAOCOMPONENTES=Z.IDCRIACAO AND Z019.OSCOMPONENTES=Z.OS AND Z019.PRIORIDADEATVCOMPONENTES=Z021.PRIORIDADE "
				}
				else{
					join += " INNER JOIN Z_CRM_ML001019 Z019 ON Z019.IDCRIACAOCOMPONENTES=Z.IDCRIACAO AND Z019.OSCOMPONENTES=Z.OS "
				}
			
			}
			if(param.TABELA=="001021"){

				join += " INNER JOIN Z_CRM_ML001019 Z019 ON Z019.IDCRIACAOCOMPONENTES=Z.IDCRIACAOPROCESSO AND Z019.OSCOMPONENTES=Z.OSPROCESSO AND Z019.PRIORIDADEATVCOMPONENTES=Z.PRIORIDADE"
			
			}

		}
		if(tabela=="001021"){

			if(param.TABELA=="001019"){

				join += " INNER JOIN Z_CRM_ML001021 Z021 ON Z021.IDCRIACAOPROCESSO=Z.IDCRIACAOCOMPONENTES AND Z021.OSPROCESSO=Z.OSCOMPONENTES AND Z021.PRIORIDADE=Z.PRIORIDADEATVCOMPONENTES "
			
			}
			if(param.TABELA=="001005"){

				if(join.search("Z_CRM_ML001019")!=-1){
					join += " INNER JOIN Z_CRM_ML001021 Z021 ON Z021.IDCRIACAOPROCESSO=Z.IDCRIACAO AND Z021.OSPROCESSO=Z.OS AND Z021.PRIORIDADE=Z019.PRIORIDADEATVCOMPONENTES "
				}
				else{
					join += " INNER JOIN Z_CRM_ML001021 Z021 ON Z021.IDCRIACAOPROCESSO=Z.IDCRIACAO AND Z021.OSPROCESSO=Z.OS "
				}
			}

		}
		
	}
	
	return join;

}

/**
 * 
 * @param {CAMPOS PREENCHIDOS DO HTML} param 
 * @param {TABELAS QUE PRECISAM SER INSERIDAS NO JOIN} set_tabelas 
 * @returns {STRING QUE DEVE SER INSERIDA NA QUERY SQL REPRESENTANDO AS INFORMAÇÕES DOS JOINS ENTRE AS TABELAS PARA ATUALIZAR AS EX'S}
 */
function retornaJoinPrincipalEx(param,set_tabelas){

	var join = ""

	var iterator = set_tabelas.values()

	for(var i=0; i<set_tabelas.size; i++){
		
		var tabela = iterator.next().value

		//console.log("tabela join",i, tabela)

		if(tabela=="001005"){

			if(param.TABELA=="001019"){

				join += " INNER JOIN Z_CRM_EX001005 Z05 ON Z05.IDCRIACAO=Z.IDCRIACAOCOMPONENTES AND Z05.OS=Z.OSCOMPONENTES AND Z05.EXECUCAO=Z.EXECUCAO "
			
			}
			if(param.TABELA=="001021"){

				join += " INNER JOIN Z_CRM_EX001005 Z05 ON Z05.IDCRIACAO=Z.IDCRIACAOPROCESSO AND Z05.OS=Z.OSPROCESSO AND Z05.EXECUCAO=Z.EXECUCAO "
			
			}

		}
		if(tabela=="001019"){

			if(param.TABELA=="001005"){

				if(join.search("Z_CRM_EX001019")!=-1){
					join += " INNER JOIN Z_CRM_EX001019 Z019 ON Z019.IDCRIACAOCOMPONENTES=Z.IDCRIACAO AND Z019.OSCOMPONENTES=Z.OS AND Z019.PRIORIDADEATVCOMPONENTES=Z021.PRIORIDADE AND Z019.OSCOMPONENTES=Z.OS "
				}
				else{
					join += " INNER JOIN Z_CRM_EX001019 Z019 ON Z019.IDCRIACAOCOMPONENTES=Z.IDCRIACAO AND Z019.OSCOMPONENTES=Z.OS AND Z019.EXECUCAO=Z.EXECUCAO "
				}
			
			}
			if(param.TABELA=="001021"){

				join += " INNER JOIN Z_CRM_EX001019 Z019 ON Z019.IDCRIACAOCOMPONENTES=Z.IDCRIACAOPROCESSO AND Z019.OSCOMPONENTES=Z.OSPROCESSO AND Z019.PRIORIDADEATVCOMPONENTES=Z.PRIORIDADE AND Z019.EXECUCAO=Z.EXECUCAO "
			
			}

		}
		if(tabela=="001021"){

			if(param.TABELA=="001019"){

				join += " INNER JOIN Z_CRM_EX001021 Z021 ON Z021.IDCRIACAOPROCESSO=Z.IDCRIACAOCOMPONENTES AND Z021.OSPROCESSO=Z.OSCOMPONENTES AND Z021.PRIORIDADE=Z.PRIORIDADEATVCOMPONENTES AND Z021.EXECUCAO=Z.EXECUCAO "
			
			}
			if(param.TABELA=="001005"){

				if(join.search("Z_CRM_EX001019")!=-1){
					join += " INNER JOIN Z_CRM_EX001021 Z021 ON Z021.IDCRIACAOPROCESSO=Z.IDCRIACAO AND Z021.OSPROCESSO=Z.OS AND Z021.PRIORIDADE=Z019.PRIORIDADEATVCOMPONENTES AND Z021.EXECUCAO=Z.EXECUCAO "
				}
				else{
					join += " INNER JOIN Z_CRM_EX001021 Z021 ON Z021.IDCRIACAOPROCESSO=Z.IDCRIACAO AND Z021.OSPROCESSO=Z.OS AND Z021.EXECUCAO=Z.EXECUCAO "
				}
			}

		}
		
	}
	
	return join;

}

// VERIFICA SE PRIORIDADE JÁ FOI PREENCHIDA NA TABELA
function verificaRegraPrioridade(op,param){
	
	//console.log("entrei para verificar a prioridade",op,param)

	var ret =  {VER : true, STRING : ""}
	
	// SE É A PRIORIDADE DO PROCESSO
	if(op=="ATIVIDADE"){

		//console.log("entrei prioridade da atividade")

		var exec =  param.FILTROS.filter(function(obj){return obj.CAMPO=="EXECUCAO"})
		var codtrf =  param.FILTROS.filter(function(obj){return obj.CAMPO=="CODTRFPAI"})
		var where = retornaWhere();
		exec = exec.length > 0 ? exec[0].VALOR : 0;
		codtrf = codtrf.length > 0 ? codtrf[0].VALOR : 0;

		var a1 = DatasetFactory.createConstraint("PRIORIDADE",param.VALOR,param.VALOR,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODTRFPAI",codtrf,codtrf,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("OS",param.OS,param.OS,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("ALVO",param.ALVO,param.ALVO,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("EXECUCAO",exec,exec,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2,a3,a4,a5)

		where = where.split(' ')

		for(var i=0;i < where.length;i++){

			var a2 = DatasetFactory.createConstraint("WHERE",where[i],where[i],ConstraintType.MUST)

			constraints.push(a2)
		}

		var dataset = DatasetFactory.getDataset("dsBuscaPrioridade",null,constraints,null)

		var row = dataset.values

		//console.log("dsBuscaPrioridade",row)

		if(row.length > 0){

			ret = {VER : false, STRING : ""}

			for(var i=0 ; i < row.length ; i++){

				var rep = row[i]

				if(exec!=0){

					ret.STRING += " Indice " + rep["INDICE"] + " EXEC - " + rep["EXECUCAO"] + " - ATIVIDADE - " + rep["DESCATIVIDADE"] + " - " + rep["CODATIVIDADE"] + ";"

				}
				else{

					ret.STRING += " Indice " + rep["INDICE"] + " - ATIVIDADE - " + rep["DESCATIVIDADE"] + " - " + rep["CODATIVIDADE"] + ";"

				}



			}

			ret.STRING += " Estes indices já possuem a prioridade informada. "

		}
		else{

			ret = {VER : true, STRING : ""}

		}
		
	}
	else if(op=="CODATIVIDADE"){

		//console.log("entrei prioridade da atividade")

		var exec =  param.FILTROS.filter(function(obj){return obj.CAMPO=="EXECUCAO"})
		var codtrf =  param.FILTROS.filter(function(obj){return obj.CAMPO=="CODTRFPAI"})
		var where = retornaWhere();
		exec = exec.length > 0 ? exec[0].VALOR : 0;
		codtrf = codtrf.length > 0 ? codtrf[0].VALOR : 0;

		var a1 = DatasetFactory.createConstraint("CODATIVIDADE",param.VALOR,param.VALOR,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODTRFPAI",codtrf,codtrf,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("OS",param.OS,param.OS,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("ALVO",param.ALVO,param.ALVO,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("EXECUCAO",exec,exec,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2,a3,a4,a5)

		where = where.split(' ')

		for(var i=0;i < where.length;i++){

			var a2 = DatasetFactory.createConstraint("WHERE",where[i],where[i],ConstraintType.MUST)

			constraints.push(a2)
		}


		var dataset = DatasetFactory.getDataset("dsBuscaAtividade",null,constraints,null)

		var row = dataset.values

		//console.log("dsBuscaPrioridade",row)

		if(row.length > 0){

			ret = {VER : false, STRING : ""}

			for(var i=0 ; i < row.length ; i++){

				var rep = row[i]

				if(exec!=0){

					ret.STRING += " Indice " + rep["INDICE"] + " EXEC - " + rep["EXECUCAO"] + " - ATIVIDADE - " + rep["DESCATIVIDADE"] + " - " + rep["CODATIVIDADE"] + ";"

				}
				else{

					ret.STRING += " Indice " + rep["INDICE"] + " - ATIVIDADE - " + rep["DESCATIVIDADE"] + " - " + rep["CODATIVIDADE"] + ";"

				}



			}

			ret.STRING += " Estes indices já possuem a atividade informada. "

		}
		else{

			ret = {VER : true, STRING : ""}

		}

	}
	else{

		//console.log("entrei prioridade do componente")

		var exec =  param.FILTROS.filter(function(obj){return obj.CAMPO=="EXECUCAO"})
		var codtrf =  param.FILTROS.filter(function(obj){return obj.CAMPO=="CODTRFPAI"})
		var where = retornaWhere();
		exec = exec.length > 0 ? exec[0].VALOR : 0;
		codtrf = codtrf.length > 0 ? codtrf[0].VALOR : 0;

		var a1 = DatasetFactory.createConstraint("PRIORIDADE",param.VALOR,param.VALOR,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("VERSAO",2,2,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("OS",param.OS,param.OS,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("ALVO",param.ALVO,param.ALVO,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("EXECUCAO",exec,exec,ConstraintType.MUST)
		var a6 = DatasetFactory.createConstraint("CODTRFPAI",codtrf,codtrf,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2,a3,a4,a5,a6)

		where = where.split(' ')

		for(var i=0;i < where.length;i++){

			var a2 = DatasetFactory.createConstraint("WHERE",where[i],where[i],ConstraintType.MUST)

			constraints.push(a2)
		}

		var dataset = DatasetFactory.getDataset("dsBuscaPrioridade",null,constraints,null)

		var row = dataset.values

		//console.log("dsBuscaPrioridade",row)

		if(row.length > 0){

			for(var i=0 ; i < row.length ; i++){

				var rep = row[i]

				if(rep["CODATIVIDADE"]=="null"){

					ret.VER = false;

					if(exec!=0){

						ret.STRING += " Indice " + rep["INDICE"] + " EXEC - " + rep["EXECUCAO"] + ";"
	
					}
					else{
	
						ret.STRING += " Indice " + rep["INDICE"] + ";"
	
					}

				}

			}

			if(ret.VER){

				var produto =  param.FILTROS.filter(function(obj){return obj.CAMPO=="CODIGOPRDCOMPONENTES"}) 

				var a1 = DatasetFactory.createConstraint("PRIORIDADE",param.VALOR,param.VALOR,ConstraintType.MUST)
				var where = retornaWhere();
				var a2 = DatasetFactory.createConstraint("WHERE",where,where,ConstraintType.MUST)
				var a3 = DatasetFactory.createConstraint("OS",param.OS,param.OS,ConstraintType.MUST)
				var a4 = DatasetFactory.createConstraint("ALVO",param.ALVO,param.ALVO,ConstraintType.MUST)
				var a5 = DatasetFactory.createConstraint("EXECUCAO",exec,exec,ConstraintType.MUST)
				var a6 = DatasetFactory.createConstraint("CODTRFPAI",codtrf,codtrf,ConstraintType.MUST)
			
				var constraints = new Array(a1,a2,a3,a4,a5,a6)
		
				var dataset = DatasetFactory.getDataset("dsBuscaComponentePrioridade",null,constraints,null)
		
				var row = dataset.values

				if(row.length > 0){

					ret = {VER : false, STRING : ""}
		
					for(var i=0 ; i < row.length ; i++){
		
						var rep = row[i]
		
						if(exec!=0){
		
							ret.STRING += " Indice " + rep["INDICE"] + " EXEC - " + rep["EXECUCAO"] + " - ATIVIDADE - " + rep["DESCATIVIDADE"] + " - " + rep["CODATIVIDADE"] + " - PRODUTO - "+ rep["CODIGOPRDCOMPONENTES"] +";"
		
						}
						else{
		
							ret.STRING += " Indice " + rep["INDICE"] + " - ATIVIDADE - " + rep["DESCATIVIDADE"] + " - " + rep["CODATIVIDADE"] + " - PRODUTO - "+ rep["CODIGOPRDCOMPONENTES"] + ";"
		
						}
	
					}

					ret.STRING += " Já existe esse mesmo código de componente vinculado a essa prioridade nos itens acima;"
		
				}
				else{
		
					ret = {VER : true, STRING : ""}
		
				}

			}
			else{

				ret = {VER : false, STRING : ret.STRING + " Não foi encontrada nenhuma atividade com a prioridade informada nos itens acima informados;"}

			}
		
		}
		
	}

	//console.log("ret verificaRegraPrioridade : ",ret)
		
	return ret;
	
}
/**
 * 
 * @param {CÓDIGO DA OS} os 
 * @returns {TRUE - OS PODE SER SELECIONADA, FALSE - OS NÃO PODE SER SELECIONADA}
 */
// VERIFICA SE A OS ESTÁ LIBERADA PARA SER EDITADA
async function verificaOS(os){
	
	var numOS = os
	var ret = true
	var solicitacao = ""
	var tipo = ""
		
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CADASTRO",1,1,ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	
	var dataset = DatasetFactory.getDataset("dsVerificaEdicaoOS",null,constraints,null);
	
	var row = dataset.values;
	var count = dataset.values.length;
	//console.log("row "+row)
	//console.log("Valor de count "+count);
	
	// SE RETORNO É VAZIO
	if(row=="" || row==undefined || row==null || row=="null"){

		return {SOLICITACAO:solicitacao,TIPO:tipo,VER:true}
		
	} else {
		// SE NÃO, OS JÁ ESTÁ NO BANCO
		
		solicitacao = row[0]["NUMPROCESSO"]
		tipo = row[0]["TIPO"];

		try{

			var api = await SolicitacaoAPI(solicitacao);
			//console.log("api",api)
			var status = api.items[api.items.length-1].status
			//console.log(solicitacao, status)
			if(status=="TRANSFERRED"){
				ret = {SOLICITACAO:solicitacao,TIPO:tipo,VER:false}
			}
			else{
				ret = {SOLICITACAO:"",TIPO:"",VER:true}
			}

		}
		catch(err){

			//console.log(err)

		}

		//console.log("ret",ret)

		return ret;

	}
	
}

/**
 * 
 * @param {NUMERO DA EXECUÇÂO EM QUESTÃO} ex 
 * @returns {TRUE SE NÂO ESTIVER SENDO EDITADA, FALSE SE ESTIVER SENDO EDITADA, TRUE OR FALSE DENTRO DE OBJETO{VER,SOLICITACAO}}
 */
// VERIFICA SE A OS ESTÁ LIBERADA PARA SER EDITADA
async function verificaExOS(ex){
	
	var numOS = $("#NUM_OS").val()
	var codTrfEx = $("#CODTRFEX").val()
	var execucao = ex
	var solicitacao = ""

	var ret = true
	
	//console.log("vou verificar a OS")
	//console.log("numOS: "+numOS+", codTrfEx: "+codTrfEx+", execucao: "+execucao)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODTRFEX",codTrfEx,codTrfEx,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);
	
	var constraints = new Array(c1,c2,c3);
	
	var dataset = DatasetFactory.getDataset("dsEXVerificaEdicaoOS",null,constraints,null);
	
	var row = dataset.values;
	var count = dataset.values.length;
	//console.log("row "+row)
	
	//console.log("Valor de count "+row);
	
	// SE RETORNO É VAZIO
	if(row=="" || row==undefined || row==null || row=="null"){

		return {SOLICITACAO:solicitacao,VER:true}
		
	} else {
		// SE NÃO, OS JÁ ESTÁ NO BANCO
		
		solicitacao = row[0]["NUMPROCESSO"]

		try{

			var api = await SolicitacaoAPI(solicitacao);
			//console.log("api",api)
			var status = api.items[api.items.length-1].status
			//console.log(solicitacao, status)
			if(status=="TRANSFERRED"){
				ret = {SOLICITACAO:solicitacao,VER:false}
			}
			else{
				ret = {SOLICITACAO:"",VER:true}
			}

		}
		catch(err){

			//console.log(err)

		}

		//console.log("ret",ret)

		return ret;
	
	}
	
	return ret
	
}


/**
 * 
 * @param {NUMERO DA SOLICITAÇÃO QUE DESEJA CONSULTAR} sol 
 * @returns {RETORNA DADOS DA SOLICITAÇÃO INFORMADA CHAMANDO A API DO FLUIG}
 */

async function SolicitacaoAPI(sol){

	return $.ajax({
		method:'get',
		url:window.parent.window.location.href.split('portal')[0]+'process-management/api/v2/requests/'+sol+'/tasks',
	})

}

/**
 * * VERIFICA SE OS ALVOS DA ATUALIZAÇÃO NÃO ESTÃO SENDO EDITADOS
 * @returns {VER : TRUE OR FALSE, FALSE SE OUVER ALGUMA SOLICITAÇÃO, TRUE CASO NÃO HAJA NENHUMA}
 */
async function verificaAlvos(){

	var obj = $("#ESTRUTURAPRINCIPAL")
	var ret = {
		VER:true
	}

	if($(obj).prop("checked")){

		var verifica = await verificaOS($("#NUM_OS").val())
		//console.log(verifica,verifica.TIPO,verifica.SOLICITACAO,verifica.VER)
		if(verifica.VER){
			$("#ESTRUTURAPRINCIPALREV").prop("checked", $(obj).prop("checked"))
		}
		else{
			
			$(obj).prop("checked",false) 
			$("#ESTRUTURAPRINCIPALREV").prop("checked", $(obj).prop("checked"))
			// EXIBE ALERTA
			return {
				VER:false,
				DATA:{
					icon: 'error',
					title: 'A OS selecionada já está sendo '+(verifica.TIPO=='EDICAO' ?  'editada' : 'cadastrada')+'!', 
					footer: '<span class="solicitacoes">Solicitação: &nbsp;<a href="'+window.parent.window.location.href.split('portal')[0]+'portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+verifica.SOLICITACAO+'" target="_blank">'+verifica.SOLICITACAO+' </a></span> ',
					allowOutsideClick : false,
					allowEscapeKey : false
			}}
			
		}

	}

	var array = $("#EXECUCAO_INFO").val().split(";")

	array = array.filter(function(ex){return ex!="" & ex!=" " })

	for (var i = 0; i < array.length; i++) {

		var element = array[i];

		var verifica = await verificaExOS(element)

		//console.log("verifica",verifica)

		if(!verifica.VER){
	
			window["EXECUCOES_OS"].setValues($("#EXECUCOES_OS").val().filter(function(a,b,c){return b!=$("#EXECUCAO_INFO").val().split(";").filter(function(ex){return ex!="" & ex!=" " }).indexOf(element)}))

			var exec_info = $("#EXECUCAO_INFO").val().split(";").filter(function(a,b,c){return a!=element})
			exec_info = exec_info.filter(function(ex){return ex!="" & ex!=" " })
			exec_info = exec_info.toString().replace(/,/g,";")

			//console.log("exec_info",exec_info)
			
			var array2 = ""
			$("#EXECUCOES_OS>option").each(function(){
				array2 += $(this).val() + " ; "
			})

			$("#EXECUCAO_INFO").val(exec_info)

			//console.log("array2",array2)

			$("#EXECUCOES_OSREV").val(array2)

			$("select[id^='CAMPOFILTROZOOM___']").each(function(){

				var seq = $(this).attr("id").split("___")[1]
	
				var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
				// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
				reloadZoomFilterValues("VALORFILTROZOOM___"+seq, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq).val()+",CODTRFPAI,"+$("#CODTRFEX").val()+
				",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq).val()+",WHERE,"+retornaWhere(seq));
	
			})

			// EXIBE ALERTA
			return {
				VER:false,
				DATA:{
					icon: 'error',
					title: 'A execução '+element+' da OS selecionada já está sendo editada!', 
					footer: '<span class="solicitacoes">Solicitação: &nbsp;<a href="'+window.parent.window.location.href.split('portal')[0]+'portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+verifica.SOLICITACAO+'" target="_blank">'+verifica.SOLICITACAO+' </a></span> ',
					allowOutsideClick : false,
					allowEscapeKey : false
			}};

		}
		
	}

	return ret;

}

function retornaWhere(_seq){

	var ret = "";

	$("select[id^='CAMPOFILTROZOOM___']").each(function(){

		var seq = $(this).attr("id").split("___")[1]

		if($("#VALORFILTRO___"+seq).val()!="" && $("#VALORFILTRO___"+seq).val()!=null && $("#VALORFILTRO___"+seq).val()!=undefined ){

			ret += ' AND '+$("#CAMPOFILTRO___"+seq).val()+"='"+$("#VALORFILTRO___"+seq).val().replaceAll(',',';;;')+"' "

		}
		console.log(ret)

	})

	return ret;

}

/**
 * 
 * @param {OBJETO CONTENDO ATRIBUTO CHAMADO SQL, QUE POSSUI O UPDATE A SER REALIZADO} sql 
 * @returns {VERIFICA SE O UPDATE NÂO TEVE ERROS E CASO TEVE RETORNA A MENSAGEM}
 */
function executaAtualizacao(sql){

	//console.log(sql);

	//console.log("vou construir update de atualização")
	var a = "";

	for (var i = 0; i < sql.length; i++) {

		const element = sql[i].ALERT;
		a += element.SQL

	}

	a = a.replace(/\n/gi,"" )
	//console.log('sql : ',a)

	a = a.split(" ")

	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("USER",window.parent.window.WCMAPI.userLogin,window.parent.window.WCMAPI.userLogin,ConstraintType.MUST)
	var constraints = new Array(a1)


	for (var i = 0; i < a.length; i++) {

		var element = a[i];
		var a2 = DatasetFactory.createConstraint("SQL"+i,element,element,ConstraintType.MUST)
		constraints.push(a2)

	}
	
	var dataset = DatasetFactory.getDataset("dsExecutaUpdate",null,constraints,null)

	//console.log('dataset : ',dataset)

	var row = dataset.values
	rep = row[0]

	//console.log('row : ',row)
	//console.log('rep : ',rep)

	if(rep["MSG"]!="SUCESSO"){

		return {VER : false, RET : rep["MSG"]};

	}
	else{

		return {VER : true, RET : rep["MSG"]};

	}


}


/**
 * * FUNÇÃO QUE INSERE OS FILTROS OBRIGATÓRIOS NA ABA FILTROS A DEPENDER DO PREENCHIMENTO DE QUAL CAMPO SERÁ ATUALIZADO
 */
function insereFiltrosObrigatorios(){

	var dataset = DatasetFactory.getDataset("dsCamposEstrutura",null,null,null)
	var row = dataset.values

	var array1 = new Array();
	var array2 = new Array();

	$("input[id^='CAMPOFILTRO___']").each(function(){

		var seq_ = $(this).attr("id").split("___")[1];

		if($(this).val()!="" && $(this).val()!=null && $(this).val()!=undefined){
			array1.push($(this).val());
		}
		else{
			$("#REMOVEFILTRO___"+seq_).click()
		}
		

	})

	array2 = $("#FILTROSOBRIGATORIOS").val().split(';').filter(function(a){return a != '' && a != " " })

	for (var i = 0; i < array2.length; i++) {

		var element = array2[i];

		//console.log(element)

		if(!array1.includes(element)){

			var rep = row.filter(function(a){return a.NOMECOLUNA==element})

			//console.log(rep)

			var rep = rep[0]

			//console.log(rep)


			var seq1 = wdkAddChild('FILTROSADICIONADOS');
			var seq2 = wdkAddChild('FILTROSADICIONADOSREV');

			window['CAMPOFILTROZOOM___'+seq1].setValue(rep.DESCRICAO)
			window['CAMPOFILTROZOOMREV___'+seq2].setValue(rep.DESCRICAO)

			$("#CAMPOFILTRO___"+seq1).val(element)
			$("#TABELAFILTRO___"+seq1).val(rep.TABELA)

			$("#CAMPOFILTRO___"+seq2).val(element)
			$("#TABELAFILTRO___"+seq2).val(rep.TABELA)		
			
			var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
				// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
			reloadZoomFilterValues("VALORFILTROZOOM___"+seq1, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq1).val()+",CODTRFPAI,"+$("#CODTRFEX").val()+",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq1).val());

		}
		
	}

	desabilitaFiltrosRev();

}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
	  if ((new Date().getTime() - start) > milliseconds){
		break;
	  }
	}
}

// LIMPA O CONTEÚDO DO ZOOM DA ATIVIDADE
function limparZoomPosto(obj){
		
	$("#VIEWPOSTO").val("")
	$("#VIEWCODPOSTO").val("")
	$("#VIEWDESCPOSTO").val("")

	$("#INSEREHTMLREV").empty()

}


// VERIFICA O TEMPO INFORMADO E FORMATA VALOR
function verificaFormataValor(obj){

	var valor = $(obj).val()
	console.log("valor: "+valor)
	
	var campo = $(obj).attr("id")
	console.log("campo: "+campo)
	
	// SE VALOR NÃO É NÚMERO
	if(isNaN(valor)){
		
		$("#"+campo).val("")
		
		// EXIBE ALERTA 
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 1000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'warning',
			  title: 'Digite um valor correto!'
		})
		
	} else {

		if(valor.includes(",")){
	
			valor = valor.replace(",",".")
			
		}
		
		valor = parseFloat(valor)
		
		var resto = valor % 3
		
		// SE É UM VALOR VÁLIDO
		if((resto==0)){
		
			valor = valor.toString()
			valor = valor.replace(".",",")
			console.log("novo valor: "+valor)
			$("#"+campo).val(valor)
			
		} else {
		// SE NÃO
		
			$(obj).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Esse não é um valor válido!',
				  text: 'Verifique se o valor informado é múltiplo de 3 e tente novamente'
			})
		
		}

	}
	
}

function BuscaPesquisa(){

	var valor = $("#VALORPESQUISA").val()

	//$(".itemachado").removeClass("itemachado")

	var verifica = false;
	
	var cont = false;
	
	$("div[id^='CARDITEM___']").each(function(e){

		var seq = $(this).attr("id").split("___")[1]

		cont = false;

		$(this).find("[id!=undefined]").each(function(a){

			var text = $(this).text()

			if(text.search(new RegExp(valor, 'i'))==-1){

				//$("#CARDITEM___"+seq).find(".card-thumb").find(".illustration").addClass("itemachado")

				if(!cont){	
					$("#CARDITEM___"+seq).hide("slow")
				}


			}
			else{

				cont = true;

				$("#CARDITEM___"+seq).show("slow")

				verifica = true

			}

		})

	})

	if(!verifica){

		// EXIBE ALERTA 
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 2000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'warning',
			title: 'Valor não encontrado!'
		})

	}else{

		setTimeout(function(){
			document.getElementsByClassName("itemachado")[0].scrollIntoView({
				behavior: "smooth", // or "auto" or "instant"
				block: "center", // or "end"
				inline : "center", // or "
			});
		},300)

	}


}

function ReiniciarPesquisa(){

	$("div[id^='CARDITEM___']").each(function(e){

		var seq = $(this).attr("id").split("___")[1]

		$("#CARDITEM___"+seq).show("slow")

	})

}