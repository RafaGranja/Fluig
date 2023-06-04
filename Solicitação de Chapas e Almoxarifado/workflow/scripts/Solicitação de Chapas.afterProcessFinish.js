function afterProcessFinish(processId){

    var tabela = constroiTabela()
    var solicitante = hAPI.getCardValue("SOLICITANTE")
    var destinatarios = hAPI.getCardValue("DESTINATARIOS")

    enviaEmail(solicitante,destinatarios,tabela)
    
	
	
}


function constroiTabela(){

    var indexes = hAPI.getChildrenIndexes("LISTASALVA")

    var str = "<table style='border-spacing:0px;'>"+
    "<thead>"+
        "<tr>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>Prioridade</th>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>Produto</th>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>Material</th>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>Lote</th>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>RA</th>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>Retalho</th>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>Plano</th>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>Máquina</th>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>Endereço</th>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>OC</th>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>OS</th>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>Tipo - Mov</th>"+
            "<th style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>Observação</th>"+
        "</tr>"+
    "</thead>"+
    "<tbody>"


    for (var i =0 ; i < indexes.length; i++) {

        str +="<tr>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+(i+1)+"</td>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+hAPI.getCardValue("CODIGOPRD___"+indexes[i])+"</td>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+hAPI.getCardValue("NOMEFANTASIA___"+indexes[i])+"</td>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+hAPI.getCardValue("NUMLOTE___"+indexes[i])+"</td>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+hAPI.getCardValue("NUMEROMOV___"+indexes[i])+"</td>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+hAPI.getCardValue("RETALHO___"+indexes[i])+"</td>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+hAPI.getCardValue("GEDLINK___"+indexes[i])+"</td>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+hAPI.getCardValue("MAQUINA___"+indexes[i])+"</td>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+hAPI.getCardValue("ENDERECO___"+indexes[i])+"</td>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+hAPI.getCardValue("OC___"+indexes[i])+"</td>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+hAPI.getCardValue("OS___"+indexes[i])+"</td>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+hAPI.getCardValue("TIPOMOV___"+indexes[i])+"</td>"+
        "<td style='border: 2px solid black;border-collapse: collapse;padding: 1em;'>"+hAPI.getCardValue("OBS___"+indexes[i])+"</td>"+
        "</tr>"

    }



    str += "</tbody></table><br/><hr>"

    var docs = hAPI.listAttachments();

    var server = hAPI.getCardValue("SERVER")

    var i = 0

    for (i = 0; i < docs.size(); i++) {

        if(i==0){

            str+="<h2>Documentos Anexados à solicitação:</h2>"

        }

        var doc = docs.get(i);

        var a = 'http://'+hAPI.getCardValue("SERVER")+'/webdesk/streamcontrol/'+doc.getParentDocumentId()+'/23988/'+doc.getVersion()+'//?WDCompanyId='+doc.getCompanyId()+'&WDNrDocto='+doc.getDocumentId()+'&WDNrVersao='+doc.getVersion()+'&WDParentDocumentId='+doc.getParentDocumentId()+'&edit=false'
        
        //publicDocument(doc.getDocumentId(),server)
        
        str += " <a href='"+a+"' >"+doc.getDocumentDescription()+"</a><br/>"

    }

    if(i>0){

        str += "<br/><hr>"

    }

   

    return str;

}

function publicDocument(documentID,server){

    log.info("Public Document "+documentID)

    dados = {}

    var data; //$.ajax({url:"http://"+server+"/api/public/2.0/documents/getDownloadURL/"+documentID}).done(function(data){console.log(data.content)})

    WCMAPI.Create({

        url: '/api/public/2.0/documents/getDownloadURL/'+documentID,

        contentType: "application/json",

        dataType: "json",

        data: dados,

        success: function (data_) {

            log.info('sucesso');
            log.info(data_);
            data = data_;
        }

    });

    log.info("Public Document return"+data)

    return data;

}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

// ENVIA O E-MAIL PARA SER
function enviaEmail(solicitante,destinatario,tabela){
    
    log.info('função email para '+destinatario)

    var array = destinatario.split(";")


    array = array.filter(function(value){return value!=";" && value!=null && value!="" && value!=undefined && value!="null"})

    for(var i = 0; i < array.length; i++){

        var obj = new com.fluig.foundation.mail.service.EMailServiceBean();
        var subject = "FLUIG - Solicitação de Chapas Almoxarifado";
        var emailSolic = array[i]
        var mensagem   = "<h3>O usuário "+solicitante+" enviou uma solicitação de chapas ao almoxarifado <a href='http://"+ hAPI.getCardValue("SERVER")+"/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+getValue('WKNumProces')+"'>"+getValue('WKNumProces')+"</a></h3> <br/><hr>"+tabela;
        var mailFluig  = "naoresponda@delp.com.br"
    
        obj.simpleEmail(1,subject, mailFluig, emailSolic, mensagem, "text/html");

    }


}

