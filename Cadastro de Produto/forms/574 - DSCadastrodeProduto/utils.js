//FUNÇÃO PARA VERIFICAR QUAL RADIOBOX ESTÁ SELECIONADO.

var sel = $("#VALOR_RADIO4").val();

//FUNÇÃO PARA MOSTRAR O CAMPO CLASSIFICAÇÃO SERVIÇO
function mostraISS() {
	console.log("Entrei na função!!")
	var iss = $("#RAD4_ISS").is(':checked');
	var icms = $("RAD4_ICMS").is(':checked');
	var tipo = $("#TIPO").val();

	console.log("entrei no tipo", tipo)
	if (tipo == "SERVICO") {

		$("#VALOR_RADIO4").val("1");
		$(".DIVCLASSIFICACAOSERVICO").show();
		$("#RAD4_ISS").prop("checked", true);
		$("#RAD4_ICMS").prop("disabled", true);
		$("#RAD4_ISS").prop("disabled", true);

	}
	else {
		console.log("entrei no else", icms)
		$("#VALOR_RADIO4").val("0");
		$("#RAD4_ICMS").prop("checked", true);
		$(".DIVCLASSIFICACAOSERVICO").hide();
		$("#RAD4_ICMS").prop("disabled", true);
		$("#RAD4_ISS").prop("disabled", true);

	}
}

function validaAplicacao(){
	var aplicacao = $("#APLICACAO").val();
	var count = aplicacao.toString().length;
	if(count < 5){
		Swal.fire({
			icon: 'warning',
			title: 'Aplicação do Produto exige pelo menos 5 caracteres'
		});

		//$("#APLICACAO").focus();
	}
	else{
		$("#CONSULTA_PRODUTO").prop("disabled",false);
	    $("#TIPO").prop("disabled",false);
	}
}

//FUNÇÃO PARA VERIFICAR QUAL RADIOBOX DA APROVAÇÃO ESTÁ SELECIONADO.
function aprov() {
	var aprovSim = $("#RAD3_SIM").is(':checked');
	var aprovNao = $("#RAD3_NAO").is(':checked');
	var aprovAltera = $("#RAD3_ALTERAR").is(':checked');

	if (aprovSim) {
		console.log("entrei no AprovSim")
		$("#VALOR_RADIO3").val("SIM");
		$(".OBSERVACOES").hide();
		$(".MOTIVOAPR").hide();
	}
	else if (aprovNao) {
		console.log("entrei no AprovNao")
		$("#VALOR_RADIO3").val("NAO");
		$(".OBSERVACOES").hide();
		$(".MOTIVOAPR").show();
	}
	else if (aprovAltera) {
		console.log("entrei no Aprovaltera")
		$("#VALOR_RADIO3").val("ALTERAR");
		$(".OBSERVACOES").hide();
		$(".MOTIVOAPR").show();
	}
};
//FUNÇÃO PARA DEIXAR HABILITADO O CAMPO PATRIMONIO PARA O FISCAL
function patrimonio() {
	console.log("entrei na função patrimonio")
	var contabil = $("#CODCONTABIL").val();
	var fiscal = $("#VALORFISCAL").val();

	if(fiscal == "08" && contabil == "044"){
		console.log("entrei no if da função patrimonio" + fiscal + contabil)
		$("#GRUPOPATRIMONIO").prop("disabled", true);
		
	}else if(fiscal == '08'){
		console.log("entrei no else função patrimonio" + fiscal + contabil)
		$("#GRUPOPATRIMONIO").prop("disabled", false);
	}else{
		$("#GRUPOPATRIMONIO").prop("disabled", true);
	}
}

//FUNÇÃO PARA SETAR TRUE E TRAVAR O CAMPO LOTE
//function lote(){
//	console.log("entrei na função LOTE")
//	//var lotesim = $("#RAD1_SIM").is(':checked');
//	//var lotenao = $("#RAD1_NAO").is(':checked');
//	var contabil = $("#CODCONTABIL").val();	
//	var lote = $("#VALOR_RADIO1").val();
//	
//	 if(contabil == '017' || contabil == '018' || contabil == '019' || contabil == '051' || contabil == '052' ||
//			 contabil == '053' || contabil == '022' || contabil == '023' || contabil == '024'){
//		 console.log("entrei no if do lote")
//		
//			//FLUIGC.switcher.setTrue('#switchControleLote');
//		 	//FLUIGC.switcher.isReadOnly('#switchControleLote', true);
//		 $("#RAD1_SIM").click();
//		 $("#RAD1_SIM").prop("disabled", true)
//		 
//	 } else{
//		 console.log("entrei no else do lote")
//		
//		 $("#RAD1_NAO").click();
//		 $("#RAD1_NAO").prop("disabled", false)
//		 //FLUIGC.switcher.enable('#switchControleLote');
//		 //FLUIGC.switcher.isReadOnly('#switchControleLote', false);
//	 }
//}

//FUNÇÃO PARA HABILITAR O CAMPO CLASSIFICAÇÃO PARA O FISCAL
function classificacao(){

	console.log("entrei na função classificação ")
	var classgeral = $("#CODCONTABIL").val();
	var fiscal = $("#VALORFISCAL").val();
	console.log("entrei na função classificação ", fiscal, classgeral)
	
	if (fiscal == '01' && classgeral == '018') {
		console.log("entrei no if da classificação")
		$("#CLASSIFICACAO").prop("disabled", false);
	}else{
		console.log("entrei no else da classificação")
		$("#CLASSIFICACAO").prop("disabled", true);
	}
};

//FUNÇÃO PARA COPIAR O TEXTO DO NOME PARA O CAMPO DESCRIÇÃO
$(function () {

	$('#NOME').on('input', function () {
		aumentatexto();
		$('#DESCRICAO').val(this.value);
	});
});

//FUNÇÃO PARA VERIFICAR NOMEFANTASIA DO PRODUTO
function validanome() {
	console.log("entrei no valida nome")
	var nome = $("#NOME").val();
	var decricao = $("#DESCRICAO").val();

	if(!(nome=="" || nome==undefined || nome==null)){
		
		// CONSULTA BANCO
		var c1 = DatasetFactory.createConstraint("NOMEFANTASIA", nome, nome, ConstraintType.MUST);
		var constraints = new Array(c1);

		var dataset = DatasetFactory.getDataset("DsCRMProdutos", null, constraints, null);

		// QUANTIDADE DE REGISTROS DA CONSULTA
		var row = dataset.values;
		console.log("row " + row)
		console.log(row)

		// SE RETORNO NÃO É NULO E NEM VAZIO
		if (!(row == "" || row == null || row == undefined || row == "null")) {
			$("#NOME").val("");
			$("#DESCRICAO").val("");
			Swal.fire({
				icon: 'warning',
				title: 'Produto/Serviço já cadastrado!'

			})
		}
		
	}
	
}
//FUNÇÃO PARA SALVAR O VALOR DO LOTE
function salvaValor() {
	console.log("entrei na função salva valor")
	var verdadeiro = $("#RAD1_SIM").is(':checked');
	var falso = $("#RAD1_NAO").is(':checked');
	console.log("antes do if da função salva valor")
	if (verdadeiro) {
		console.log(">>>>>entrei no if da função salva valor VERDADEIRO<<<<<")
		$("#VALOR_RADIO1").val(1);
		
	} else {
		console.log(">>>>>entrei no else da função salva valor FALSO<<<<<")
		$("#VALOR_RADIO1").val(0);
		
	}
}

//FUNÇÃO PARA UPPERCASE
function aumentatexto() {
	var nome = $("#NOME").val();

	nome = nome.toUpperCase();
	$("#NOME").val(nome);
}
//FUNÇÃO PARA PEGAR O VALOR DA REFERENCIA SELECIONADA
function escolharef() {
	var referencia = $("#REFERENCIA").val();

	console.log("entrei na função da referencia")
	if (referencia == "0") {
		console.log("entrei no primeiro if da referencia")
		$("#VALORREFERENCIA").val(0);

	} else if (referencia == "4") {
		$("#VALORREFERENCIA").val(4);
	}
	else if (referencia == "5") {
		$("#VALORREFERENCIA").val(5);
	}

	else if (referencia == "6") {
		$("#VALORREFERENCIA").val(6);
	}

	else if (referencia == "7") {
		$("#VALORREFERENCIA").val(7);
	}

	else if (referencia == "1") {
		$("#VALORREFERENCIA").val(1);
	}

	else if (referencia == "2") {
		$("#VALORREFERENCIA").val(2);
	}

	else if (referencia == "3") {
		$("#VALORREFERENCIA").val(3);
	}

	else if (referencia == "8") {
		$("#VALORREFERENCIA").val(8);
	}

	else {
		$("#VALORREFERENCIA").val("");
	}
}

//FUNÇÃO PARA GERAR HISTÓRICO DO ANDAMENTO DO ATENDIMENTO
function gerarHistorico() {
	console.log("entrei na função gerar historico")
	var hist = $("#MOTIVO").val();
	var msg = "";
	var atual = $("#MOTIVOAPR").val();

	if (atual == "" || atual == null) { //SE O CAMPO ATUAL FOR VAZIO OU NULLO NÃO TRAZ INFORMAÇÃO
		console.log("->>>>>>> ENTREI NO IF <<<<<<<<<<<<<<<<<<<<<<<<<-");
	}
	else { //SENÃO O CAMPO TRAZ A OBSERVAÇÃO DO HISTÓRICO
		console.log("->>>>>>> ENTREI NO ELSE <<<<<<<<<<<<<<<<<<<<<<<<<-");
		msg = atual;
		$("#MOTIVO").val(msg);
		//$("#divMOTIVOFISCAL").html(msg);

		msg = hist;
		$("#OBSHIST").val(msg);
	}
}

//FUNÇÃO PARA SALVAR O VALOR DA PRIORIDADE DO CADASTRO
function salvaValorCadastro() {
	console.log("entrei na função salva valor do cadastro")
	var muitoalta = $("#RAD6_MA").is(':checked');
	var alta = $("#RAD6_A").is(':checked');
	var media = $("#RAD6_M").is(':checked');
	var baixa = $("#RAD6_B").is(':checked');
	var data = new Date();
	var dataNova = ""
	var hora = ""
	var prazo = ""
		
	console.log("antes do if da função salva valor cadastro")
	if (muitoalta) {
		console.log("entrei no if muito alta da função salva valor")
		$("#VALOR_RADIO6").val('muito alta');
		console.log("data" + data)
		data.setMinutes(data.getMinutes() + 30);		
		dataNova = geraDataBanco(data)
		hora = data.toString().split(" ");
		hora = hora[4].split(":")
		hora = hora[0]+":" + hora[1]
		console.log("data é: " + dataNova + " " + hora)
		$("#TEMPOATENDIMENTO").val(dataNova + " " + hora);
	} else if (alta) {
		console.log("entrei no else if alta da função salva valor")
		$("#VALOR_RADIO6").val('alta');
		$("#TEMPOATENDIMENTO").val(2);
		data.setHours(data.getHours() + 2);
		dataNova = geraDataBanco(data)
		hora = data.toString().split(" ");
		hora = hora[4].split(":")
		hora = hora[0]+":" + hora[1]
		console.log("data é: " + dataNova + " " + hora)
		$("#TEMPOATENDIMENTO").val(dataNova + " " + hora);
		console.log("data é: " + data)
	} else if (media) {
		console.log("entrei no else if media da função salva valor")
		$("#VALOR_RADIO6").val('media');
		$("#TEMPOATENDIMENTO").val();
		data.setHours(data.getHours() + 4);
		dataNova = geraDataBanco(data)
		hora = data.toString().split(" ");
		hora = hora[4].split(":")
		hora = hora[0]+":" + hora[1]
		console.log("data é: " + dataNova + " " + hora)
		$("#TEMPOATENDIMENTO").val(dataNova + " " + hora);
		console.log("data é: " + data)
	} else {
		console.log("entrei no else baixa da função salva valor")
		$("#VALOR_RADIO6").val('baixa');
		$("#TEMPOATENDIMENTO").val(12);
		data.setHours(data.getHours() + 12);
		dataNova = geraDataBanco(data)
		hora = data.toString().split(" ");
		hora = hora[4].split(":")
		hora = hora[0]+":" + hora[1]
		console.log("data é: " + dataNova + " " + hora)
		$("#TEMPOATENDIMENTO").val(dataNova + " " + hora);
		console.log("data é: " + data)
	}
}


//GERA UMA DATA NO FORMATO DE BANCO
function geraDataBanco(str){
	
	console.log("data: "+str)
	
	str = str.toString().split(" ")
	
	dia = str[2]
	mes = str[1]
	ano = str[3]
	
	
	if(mes=="Jan"){
		mes="01"
	}
	if(mes=="Feb"){
		mes="02"
	}
	if(mes=="Mar"){
		mes="03"
	}
	if(mes=="Apr"){
		mes="04"
	}
	if(mes=="May"){
		mes="05"
	}
	if(mes=="Jun"){
		mes="06"
	}
	if(mes=="Jul"){
		mes="07"
	}
	if(mes=="Aug"){
		mes="08"
	}
	if(mes=="Sep"){
		mes="09"
	}
	if(mes=="Oct"){
		mes="10"
	}
	if(mes=="Nov"){
		mes="11"
	}
	if(mes=="Dec"){
		mes="12"
	}
	
	var dataNova = ""+ano+"-"+mes+"-"+dia
	
	return dataNova
	
}

//LIMPAR OS CAMPOS E BLOQUEAR CONFORME A SELEÇÃO DO TIPO
function verificaTipo(){
	console.log("entrei na função libera campos")
	var tipo = $("#TIPO").val();
	var nome = $("#NOME").val();
	var descricao = $("#DESCRICAO").val();
	var fiscal = $("#VALORFISCAL").val();
	var classfiscal = $("#CLASSIFICACAO_FISCAL").val();
	var classcontabil = $("#CLASSIFICACAO_CONTABIL").val();
	var ncm = $("#NCM").val();
	var unmedida = $("#UNIDADEMEDIDA").val();


	console.log("peguei o tipo", tipo)


	if (tipo == "PRODUTO") {
		console.log("entrei no if produto ")
		$("#VALORTIPO").val("P");
		$("#NOME").prop("disabled", false);
		$("#DESCRICAO").prop("disabled", false);
		$("#NCM").prop("disabled", true);
		//$("#CLASSIFICACAO_FISCAL").prop("disabled", true);
		$("#UNIDADEMEDIDA").prop("disabled", true);		
		$("#CLASSIFICACAO_CONTABIL").prop("disabled", true);	
		reloadZoomFilterValues("NCM");
		reloadZoomFilterValues("CLASSIFICACAO_FISCAL");
		reloadZoomFilterValues("UNIDADEMEDIDA");
		reloadZoomFilterValues("CLASSIFICACAO_CONTABIL");
		window["CLASSIFICACAO_FISCAL"].clear();		
		window["NCM"].clear();
		window["UNIDADEMEDIDA"].clear();
		window["CLASSIFICACAO_CONTABIL"].clear();
		
		
	}

	if (tipo == "SERVICO") {
		//reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + selectedItem['CLASSCONTABIL']);
		console.log("entrei no if do serviço");
		$("#NOME").prop("disabled", false);
		$("#DESCRICAO").prop("disabled", false);
		window["NCM"].setValue("00000000");
		$("#CODNCM").val("00000000");
		$("#NCM").prop("disabled", true);
		$("#CEST").prop("disabled", true);
		$("#CLASSIFICACAO_FISCAL").prop("disabled", true);
		window["CLASSIFICACAO_FISCAL"].setValue("09- SERVIÇOS");
		$("#VALORFISCAL").val("09");
		reloadZoomFilterValues("CLASSIFICACAO_CONTABIL", "CLASSFISCAL,09");
		//reloadZoomFilterValues("CONTACONTABILSPED", "CONTACONTABIL," + $("#CODCONTABIL").val() + ",CONTACONTABIL," + $("#CONTACONTABIL").val());	
		reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + $("#CONTACONTABIL").val());
		$("#SITUACAOMERCADORIA").val(fiscal.toString().split("- ")[0]);
		$("#RAD1_SIM").prop("disabled", true);
		$("#RAD1_NAO").prop("disabled", true);
		$("#VALORTIPO").val("S");
		$("#CLASSIFICACAO_CONTABIL").prop("disabled", false);
		window["CLASSIFICACAO_CONTABIL"].clear();
		window["UNIDADEMEDIDA"].setValue("SV - SERVIÇO")
		$("#VALORUNIDADEMEDIDA").val("SV")
		$("#UNIDADEMEDIDA").prop("disabled", true);

	}
	
}

// LIMPA TODOS OS CAMPOS ZOOM'S
function limpaCampos(){
	
	$("#VALORFISCAL").val("")
	$("#CLASSIFICACAO_FISCAL>option").remove()
	$("#CLASSIFICACAO_CONTABIL>option").remove()
	$("#CODCONTABIL").val("")
	$("#CONTACONTABIL").val("")
	$("#SITUACAOMERCADORIA").val("")
	$("#NCM>option").remove()
	$("#CODNCM").val("")
	$("#UNIDADEMEDIDA>option").remove()
	$("#VALORUNIDADEMEDIDA").val("")
	
	//$("#CLASSIFICACAO_FISCAL").prop("disabled",true)
	$("#CLASSIFICACAO_CONTABIL").prop("disabled",true)
	$("#NCM").prop("disabled",true)
	$("#UNIDADEMEDIDA").prop("disabled",true)
	
}

//FUNÇÃO PARA LIBERAR CAMPOS AO PREENCHER OUTROS
function liberaCampos(selectZoom) {
	console.log("entrei na função libera campos")
	var tipo = $("#TIPO").val();
	var nome = $("#NOME").val();
	var descricao = $("#DESCRICAO").val();
	var fiscal = $("#VALORFISCAL").val();
	var classfiscal = $("#CLASSIFICACAO_FISCAL").val();
	var classcontabil = $("#CLASSIFICACAO_CONTABIL").val();
	var ncm = $("#NCM").val();
	var unmedida = $("#UNIDADEMEDIDA").val();

	console.log("peguei o tipo", tipo)

	console.log("nome: "+nome)

	if (tipo == "PRODUTO") {
		console.log("entrei no if produto ")

		if(!selectZoom)
		limpaCampos()

		$("#VALORTIPO").val("P");
		$("#NOME").prop("disabled", false);
		$("#DESCRICAO").prop("disabled", false);
		
	}

	if (nome == "" || nome == null) {
		$("#CLASSIFICACAO_FISCAL").prop("disabled", true);
	} else {
		console.log("vou desabilitar classificação fiscal")
		$("#CLASSIFICACAO_FISCAL").prop("disabled", false);
		
	}
	if (classfiscal == "" || classfiscal == null) {
		$("#CLASSIFICACAO_CONTABIL").prop("disabled", true);
	}
	else {
		$("#CLASSIFICACAO_CONTABIL").prop("disabled", false);
		
	}
	if (classcontabil == "" || classcontabil == null) {
		$("#NCM").prop("disabled", true);
	}
	else {
		$("#NCM").prop("disabled", false);
	}
	if (ncm == "" || ncm == null) {
		$("#UNIDADEMEDIDA").prop("disabled", true);
	}
	else {
		$("#UNIDADEMEDIDA").prop("disabled", false);
	}
	if (tipo == "SERVICO") {
		//reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + selectedItem['CLASSCONTABIL']);
		console.log("entrei no if do serviço");
		$("#NOME").prop("disabled", false);
		$("#DESCRICAO").prop("disabled", false);
		window["NCM"].setValue("00000000");
		$("#CODNCM").val("00000000");
		$("#NCM").prop("disabled", true);
		$("#CEST").prop("disabled", true);
		$("#CLASSIFICACAO_FISCAL").prop("disabled", true);
		window["CLASSIFICACAO_FISCAL"].setValue("09- SERVIÇOS");
		$("#VALORFISCAL").val("09");
		reloadZoomFilterValues("CLASSIFICACAO_CONTABIL", "CLASSFISCAL,09");
		//reloadZoomFilterValues("CONTACONTABILSPED", "CONTACONTABIL," + $("#CODCONTABIL").val() + ",CONTACONTABIL," + $("#CONTACONTABIL").val());	
		reloadZoomFilterValues("CONTACONTABILSPED", "CLASSCONTABIL," + $("#CONTACONTABIL").val());
		$("#SITUACAOMERCADORIA").val(fiscal.toString().split("- ")[0]);
		$("#RAD1_SIM").prop("disabled", true);
		$("#RAD1_NAO").prop("disabled", true);
		$("#VALORTIPO").val("S");
		$("#CLASSIFICACAO_CONTABIL").prop("disabled", false);		
		window["UNIDADEMEDIDA"].setValue("SV - SERVIÇO")
		$("#VALORUNIDADEMEDIDA").val("SV")
		$("#UNIDADEMEDIDA").prop("disabled", true);

	}

}

function salvaEmailUsuario(){
	var usuario = $("#SOLICITANTE").val();

	var c1 = DatasetFactory.createConstraint("USER_CODE",usuario,usuario,ConstraintType.MUST);
	var constraints = new Array(c1);
		
	var dataset = DatasetFactory.getDataset("DsCRMEmail",null,constraints,null);
		
	// QUANTIDADE DE REGISTROS DA CONSULTA
	var row = dataset.values;
	var rep = row[0];
	$("#EMAIL").val(rep["EMAIL"]);
}

//FUNÇÃO PARA MOSTRAR A MENSAGEM DE INFORMAÇÃO DO CONSULTA PRODUTO
let mensagem = document.querySelector(".mensagem") ;

function textoInformativo(){
	$("#aparecer").show()
	mensagem.style.display = "block"; 
	
}
function limparTextoInformativo() {
	$("#aparecer").hide()
	mensagem.style.display = "none"; 
	}


