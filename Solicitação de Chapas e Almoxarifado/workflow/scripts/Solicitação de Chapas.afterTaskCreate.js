function afterTaskCreate(colleagueId) {
    var atividade = getValue('WKCurrentState');
    // Atividade de sequência 5 é a da tarefa criada e que vou alterar o prazo de conclusão
        // Recuperando a data informada no campo do formulário
        var prazoFormulario = hAPI.getCardValue('DATAFECHAMENTO');
        if (prazoFormulario != undefined && prazoFormulario != '') {
            var numeroDaSolicitacao = getValue('WKNumProces');
            var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela
            var responsavelPelaTarefa = colleagueId;
             
            /* Nesse caso o formato da data salva pelo formulário no exemplo é DD/MM/AAAA, mas isso pode variar de acordo com a formatação utilizada, 
               mudando assim as posições das informações dentro do array */
             
            /* Extrai os dados da data do formulário para um array, para posteriormente transformar em data do Javascript */
            var arrayPrazoConclusao = prazoFormulario.split("/");
            var dia = arrayPrazoConclusao[0]; // Posição 0 do array é o dia
            var mes = arrayPrazoConclusao[1] - 1; // Posição 1 do array é o mês (Subtraímos 1 porque na data do Javascript o mês vai de 0 a 11)
            var ano = arrayPrazoConclusao[2]; // Posição 2 do array é o ano
             
            var hora = timeToDecimal(hAPI.getCardValue('HORAFECHAMENTO'))

            var horaDoPrazo = (hora*60*60) - 1; /* A hora é em milisegundos, e esse cálculo tem resultado de 23:59:59, ou seja, 
            o prazo de conclusão vai ser até o último segundo do dia informado no formulário */
             
            // Cria a data no Javascript
            var dataDoPrazo = new Date();
            dataDoPrazo.setDate(dia);
            dataDoPrazo.setMonth(mes);
            dataDoPrazo.setFullYear(ano);
             
            // Altera o prazo de conclusão
            hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, dataDoPrazo, horaDoPrazo);
            
        }

	var docs = hAPI.listAttachments();
	
	for (var i = 0; i < docs.size(); i++) {

		var doc = docs.get(i);

		doc.setParentDocumentId(84401);

		hAPI.publishWorkflowAttachment(doc);

	}
 
}

function timeToDecimal(t) {
    var arr = t.split(':');
    var dec = parseFloat(parseInt(arr[1])/60);

    return parseFloat( parseInt(arr[0]) + dec );
}   