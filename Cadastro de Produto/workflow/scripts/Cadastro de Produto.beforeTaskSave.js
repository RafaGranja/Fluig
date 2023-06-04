function beforeTaskSave(colleagueId, nextSequenceId, userList) {

    var ativAtual = getValue("WKNumState");
    var numProcess = getValue("WKNumProces");
    var WKUser = getValue("WKUser");

    var NOME_DATASERVER = "EstPrdDataBR"
    var usuario = "fluig"
    var senha = "zaq12wsxZAQ!@WSX"
    //var senha 			= "@Pg242217"
    var authService = getWebService(usuario, senha)
    //var context         = "CodUsuario=mestre;CodSistema=T;CodColigada="+codcoligada;
    var context = "CodUsuario=fluig;CodSistema=T;CodColigada=1"
    var codigoprd = ""
    var estocavel = "0"
    var invetariofiscal = "0"
    var numfluig = hAPI.getCardValue("NUMPROCESSO")

    log.info("beforeTaskSave - CadastraProduto -  Inclusão de novo produto")

    //var numOS = hAPI.getCardValue("NUM_OS")
    //var indexes = hAPI.getChildrenIndexes("ESTRUTURA")
    var total = 0;
    var XML = ""
    var codfat = ""
    var grupo = ""
    var subgrupo = ""
    var tipo = hAPI.getCardValue("VALORTIPO")
    var nome = hAPI.getCardValue("NOME")
    var descricao = hAPI.getCardValue("DESCRICAO")
    var fiscal = hAPI.getCardValue("VALORFISCAL")
    var lote = hAPI.getCardValue("VALOR_RADIO1")
    var ncm = hAPI.getCardValue("CODNCM")
    var cest = hAPI.getCardValue("CEST")
    var contabil = hAPI.getCardValue("CODCONTABIL")
    var unmedida = hAPI.getCardValue("VALORUNIDADEMEDIDA")
    //  var grupo = hAPI.getCardValue("GRUPO")
    //   var subgrupo = hAPI.getCardValue("SUBGRUPO")
    //  var classgeral = hAPI.getCardValue("VALORCLASSIFGERAL")
    var classificacao //= hAPI.getCardValue("CLASSIFICACAOSERVICO")
    var referencia = hAPI.getCardValue("VALORREFERENCIA")
    var grupopatrimonio = hAPI.getCardValue("VALORGRUPOPATRIMONIO")
    var sped = hAPI.getCardValue("VALOR_SPED")
    var classservico
    var tipotributacao = hAPI.getCardValue("VALOR_RADIO4")
    var usuario = hAPI.getCardValue("USUARIOATUAL")
    var aprovacao = hAPI.getCardValue("VALOR_RADIO3")
    var situacaomercadoria = hAPI.getCardValue("SITUACAOMERCADORIA")
    log.info("o nome do produto é : " + nome)

    if (tipo == "S") {
        log.info("tipo cadastro" + tipo)
        classservico = hAPI.getCardValue("CLASSIFICACAOSERVICO")

    } else {
        classservico = ""
    }
    if (contabil == "018") {
        classificacao = hAPI.getCardValue("VALORCLASSIFICACAO")
    } else {
        classificacao = ""
    }
    //VERIFICA SITUACAO MERCADORIA E SETA O CAMPO
    log.info("Antes de entrar no if do situacaomercadoria " + situacaomercadoria + fiscal)
    if (fiscal == "00") {
        situacaomercadoria = "01"
    } else if (fiscal == "01") {
        situacaomercadoria = "02"
    } else if (fiscal == "03") {
        situacaomercadoria = "03"
    } else if (fiscal == "04") {
        situacaomercadoria = "04"
    } else if (fiscal == "02") {
        situacaomercadoria = "08"
    } else if (fiscal == "05") {
        situacaomercadoria = "09"
    } else if (fiscal == "06") {
        situacaomercadoria = "10"
    } else if (fiscal == "07") {
        situacaomercadoria = "11"
    } else if (fiscal == "08") {
        situacaomercadoria = "12"
    } else if (fiscal == "09") {
        situacaomercadoria = "13"
    } else if (fiscal == "99") {
        situacaomercadoria = "14"
    }
    log.info("total:" + total + ", XML:" + XML + ", codfat:" + codfat + ",tipo " + tipo + ", nome: " + nome + ", descrição: " + descricao +
        ", fiscal:" + fiscal + ", lote:" + lote + ", ncm: " + ncm + ", cest:" + cest + ", contabil:" + contabil + ", unmedida:" + unmedida +
        ", referencia: " + referencia + ", grupopatrimonio" + grupopatrimonio +
        ", sped: " + sped + ", tipotributacao: " + tipotributacao + ", usuario: " + usuario + " aprovacao: " + aprovacao + ", classificação" + classificacao)

    log.info("ESTOU NA ATIVIDADE " + ativAtual)

    // SE É ATIVIDADE FISCAL
    if (ativAtual == "5") {

        log.info("ESTOU NA ATIVIDADE FISCAL")

        // SE APROVACAO FOI FEITA
        if (aprovacao == "SIM") {

            log.info("CADASTRO FOI APROVADO " + aprovacao)

            // CHECA O ÚLTIMO CÓDIGO DO PRODUTO
            var dataset = DatasetFactory.getDataset("dsUltimoCodPrd", null, null, null)
            var codigofinal = dataset.getValue(0, "VALAUTOINC")
            codigofinal = parseInt(codigofinal) + 1
            log.info("retorno do dataset " + codigofinal)

            if(contabil=="051" || contabil=="052"){
                
            	codigoprd = "01." + contabil + ".0" + codigofinal
            	
            } else {
            	
            	codigoprd = "" + fiscal + "." + contabil + ".0" + codigofinal
            	
            }

            log.info("codigoprd: " + codigoprd)


            //verifica se o produto é estocável
            if (contabil == "017" || contabil == "018" || contabil == "019" || contabil=="020" || contabil == "021" || contabil == "022" || contabil == "023" ||
                contabil == "024" || contabil == "025" || contabil == "027" || contabil == "031" || contabil == "032" || contabil == "033" || contabil == "034" ||
                contabil == "051" || contabil == "052" || contabil == "053" || contabil == "054" ) {

                estocavel = "1"
                invetariofiscal = "1"
                //  if(tipo == "PRODUTO" && lote == "1"){  
                	
            } else {
            	
                estocavel = "0"
                invetariofiscal = "0"
                	
            };
            
             //VERIFICA NOME E DESCRICAO
              if(nome.toString().indexOf("&") != -1 && descricao.toString().indexOf("&") != -1){
              	nome = nome.replace("&","&amp;")
              	descricao = descricao.replace("&","&amp;")
              	}  
              
              if(classificacao == "" || classificacao == undefined || classificacao == null){
              	classificacao = " <CODTB2FAT></CODTB2FAT> "
              } else{
              	classificacao = " <CODTB2FAT>"+classificacao+"</CODTB2FAT> "
              }
              
              if(grupopatrimonio == "" || grupopatrimonio == undefined || grupopatrimonio == null){
              	grupopatrimonio = " <CODGRUPO></CODGRUPO> "
              } else{
              	grupopatrimonio = " <CODGRUPO>"+grupopatrimonio+"</CODGRUPO> "
              }


            XML =
                "<EstPrdDataBR >" +
                "<TPRODUTO>" +
                "<CODCOLPRD>1</CODCOLPRD>" +
                "<CODCOLIGADA>1</CODCOLIGADA>" +
                "<IDPRD>-1</IDPRD>" +
                "<CODFAB>001</CODFAB>" +
                "<CODUSUARIO>" + usuario + "</CODUSUARIO>" +
                "<CODIGOPRD>" + codigoprd + "</CODIGOPRD>" +
                "<NOMEFANTASIA>" + nome + "</NOMEFANTASIA>" +
                "<CODIGOREDUZIDO>" + codigofinal + "</CODIGOREDUZIDO>" +
                "<CODFAB>001</CODFAB>" +
                "<NUMNOFABRIC>" + codigoprd + "</NUMNOFABRIC>" +
                "<TIPO>" + tipo + "</TIPO>" +
                "<INATIVO>0</INATIVO>" +
                "<DESCRICAO>" + descricao + "</DESCRICAO>" +
                "<CODUNDCONTROLE>" + unmedida + "</CODUNDCONTROLE>" +
                "<CODUNDCOMPRA>" + unmedida + "</CODUNDCOMPRA>" +
                "<CODUNDVENDA>" + unmedida + "</CODUNDVENDA>" +
                "<CUSTOMEDIO>0.0000</CUSTOMEDIO>" +
                "<CUSTOUNITARIO>0.0000</CUSTOUNITARIO>" +
                "<CUSTOREPOSICAO>0.0000</CUSTOREPOSICAO>" +
                "<CUSTOREPOSICAOB>0.0000</CUSTOREPOSICAOB>" +
                "<CODTB3FAT>" + contabil + "</CODTB3FAT>" +
                "<SALDOGERALFISICO>0.0000</SALDOGERALFISICO>" +
                "<SALDOGERALFINANC>0.0000</SALDOGERALFINANC>" +
                "<CONTROLADOPORLOTE>" + lote + "</CONTROLADOPORLOTE>" +
                "<NUMEROCCF>" + ncm + "</NUMEROCCF>" +
                "<PRODVISIVELCLICBUSINESS>1</PRODVISIVELCLICBUSINESS>" +
                "<PRDISENTOFUNRURAL>0</PRDISENTOFUNRURAL>" +
                "<TIPOTRIBUTACAO>0</TIPOTRIBUTACAO>" +
                "<SITUACAOMERCADORIA>03</SITUACAOMERCADORIA>" +
                //"<INVENTARIOFISCAL>03</INVENTARIOFISCAL>"+        	    	
                "<REFERENCIACP>" + referencia + "</REFERENCIACP>" +
                //"<CODIGOEX>"+cest+"</CODIGOEX>"+
                classificacao+
				grupopatrimonio+  
                "</TPRODUTO>" +
                "<TPRDCOMPL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>1</CODFILIAL>" +
                "  <NUMFLUIG>" + numfluig + "</NUMFLUIG>" +
                "</TPRDCOMPL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>1</CODFILIAL>" +
                "  <ESTOCAVEL>0</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>2</CODFILIAL>" +
                "  <ESTOCAVEL>0</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>3</CODFILIAL>" +
                "  <ESTOCAVEL>0</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>4</CODFILIAL>" +
                "  <ESTOCAVEL>0</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>5</CODFILIAL>" +
                "  <ESTOCAVEL>0</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>6</CODFILIAL>" +
                "  <ESTOCAVEL>0</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>7</CODFILIAL>" +
                "  <ESTOCAVEL>" + estocavel + "</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>8</CODFILIAL>" +
                "  <ESTOCAVEL>" + estocavel + "</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL> " +
                "</EstPrdDataBR >"


            try {

                log.info("entrei no try")

                log.info("* CRM * Fluig " + numProcess + " XML Produto:  " + XML);

                log.info("Vou fazer a autenticação")

                var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context));

                log.info("finalizei a autenticação")

                log.info("* CRM * Fluig " + numProcess + " Inclusão de Produto - Resultado:  " + result);

                // SE A INTEGRAÇÃO NÃO FOI CONCLUÍDA COM SUCESSO
                if (result.length > 15) {
                    var mensagemErro = result;
                    throw mensagemErro;

                } else {

                    result = result.substring(result.search(";") + 1, result.length);
                    fiscalXML(result, tipotributacao, sped, classservico, cest, situacaomercadoria, invetariofiscal)
                    eviaEmail(codigoprd, descricao)
                    hAPI.setCardValue("CODPRODUTOGERADO", codigoprd);
                    log.info("entrei para salvar o IDPRD")

                }

                log.info("acabei o try")

            } catch (e) {

                if (e == null) e = "* CRM * Erro desconhecido!";

                var mensagemErro = "* Ocorreu um erro ao incluir produto no RM (coligada 1 ): " + e;
                log.info(e);
                throw mensagemErro;
            }

        }

    }
    
    if(ativAtual == "5"){
    	//ESTOU NA ATIVIDADE FISCAL
    	log.info("estou na atividade fiscal")
    	if(aprovacao == "NAO"){
    		//CADASTRO FOI REPROVADO
    		log.info("reprovado: " + aprovacao)
            eviaEmailReprovado(descricao)
    	}
    	else if(aprovacao == "ALTERAR"){
    		log.info("alterar: " + aprovacao);
            eviaEmailAlterar(descricao);
    	}
    }
}

function eviaEmail(codigoprd, descricao) {

    log.info('funcao email')

    var obj = new com.fluig.foundation.mail.service.EMailServiceBean();
    var subject = "Cadastro do Produto/Serviço efetuado com sucesso";
    var emailSolic = hAPI.getCardValue("EMAIL");
    var numfluig = hAPI.getCardValue("NUMPROCESSO")
    var nomeProduto = hAPI.getCardValue("NOME")
    var mensagem = "A solicitação de cadastro nº <a href='http://delp5013:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+numfluig+"'>" + numfluig + "</a> foi cadastrada e gerou o produto número " + codigoprd + " o nome do produto é " + nomeProduto;
    var mailFluig = "naoresponda@delp.com.br"
    log.info("O valor do nome é: " + descricao)

    obj.simpleEmail(1, subject, mailFluig, emailSolic, mensagem, "text/html");

}

function eviaEmailReprovado(descricao) {

    log.info('funcao email reprovado')

    var obj = new com.fluig.foundation.mail.service.EMailServiceBean();
    var subject = "Cadastro do Produto/Cancelamento da Solicitação";
    var emailSolic = hAPI.getCardValue("EMAIL");
    var numfluig = hAPI.getCardValue("NUMPROCESSO");
    var mensagem = "A solicitação de cadastro nº <a href='http://delp5013:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+numfluig+"'>" + numfluig + "</a> foi verificada e foi <strong>cancelada</strong> por parte do FISCAL." ;
    var mailFluig = "naoresponda@delp.com.br";
    log.info("O valor do nome é: " + descricao);

    obj.simpleEmail(1, subject, mailFluig, emailSolic, mensagem, "text/html");

}

function eviaEmailAlterar(descricao) {

    log.info('funcao email reprovado')

    var obj = new com.fluig.foundation.mail.service.EMailServiceBean();
    var subject = "Cadastro do Produto/Solicitação de alteração";
    var emailSolic = hAPI.getCardValue("EMAIL");
    var numfluig = hAPI.getCardValue("NUMPROCESSO");
    var mensagem = "A solicitação de cadastro nº <a href='http://delp5013:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+numfluig+"'>" + numfluig + "</a> foi verificada e gerou uma solicitação de <strong>alteração</strong> por parte do FISCAL." ;
    var mailFluig = "naoresponda@delp.com.br";
    log.info("O valor do nome é: " + descricao);

    obj.simpleEmail(1, subject, mailFluig, emailSolic, mensagem, "text/html");

}

function fiscalXML(result, tipotributacao, sped, classservico, cest, situacaomercadoria, invetariofiscal) {

    if (classservico == "" || classservico == undefined || classservico == null) {
        classservico = ""

    }
    if (cest == "" || cest == null || cest == "null" || cest == undefined) {
        cest = ""
    }

    log.info("idprd  " + result + ", tributação  " + tipotributacao + ", CODCONTA  " + sped + ", class servico  " + classservico + ", cest  " + cest + ", situacaoMercadoria  " + situacaomercadoria +
        "invetariofiscal" + invetariofiscal)

    var usuario = "fluig"
    var senha = "zaq12wsxZAQ!@WSX"
    var authService = getWebService(usuario, senha)
    var strXML = ""
    var numProcess = getValue("WKNumProces");
    var context = "CodUsuario=fluig;CodSistema=T;CodColigada=1"
    var NOME_DATASERVER = "FisPrdDadosFiscaisData"

    strXML =
        "<FisPrdDadosFiscaisData >" +
        "<TPrdFiscal>" +
        " 	<CODCOLIGADA>1</CODCOLIGADA>" +
        "	<CODCOLCONTA>1</CODCOLCONTA>" +
        " 	<IDPRD>" + result + "</IDPRD>" +
        "  	<TIPOTRIBUTACAO>" + tipotributacao + "</TIPOTRIBUTACAO>" +
        "  	<CODCONTA>" + sped + "</CODCONTA>" +
        "	<CLASSIFSERVICO>" + classservico + "</CLASSIFSERVICO>" +
        "	<CODIGOCEST>" + cest + "</CODIGOCEST>" +
        "	<SITUACAOMERCADORIA>" + situacaomercadoria + "</SITUACAOMERCADORIA>" +
        "	<INVENTARIOFISCAL>" + invetariofiscal + "</INVENTARIOFISCAL>" +
        "</TPrdFiscal>" +
        "</FisPrdDadosFiscaisData >"
    log.info("XML:" + strXML)
    log.info("beforeTaskSave - CadastraProdutoFiscal -  Inclusão de novo produto")
    try {

        log.info("entrei no try")

        log.info("* CRM * Fluig " + numProcess + " XML FISCAL:  " + strXML);

        log.info("Vou fazer a autenticação")

        var result = new String(authService.saveRecord(NOME_DATASERVER, strXML, context));

        log.info("finalizei a autenticação")

        log.info("* CRM * Fluig " + numProcess + " Inclusão de ProdutoFISCAL - Resultado:  " + result);


        // SE A INTEGRAÇÃO NÃO FOI CONCLUÍDA COM SUCESSO
        if (result.length > 15) {

            var mensagemErro = result;
            throw mensagemErro;

        } else {

            result = result.substring(result.search(";") + 1, result.length);
            log.info("entrei para salvar o IDPRD")
        }

        log.info("acabei o try")

    } catch (e) {

        if (e == null) e = "* CRM * Erro desconhecido!";

        var mensagemErro = "* Ocorreu um erro ao incluir produto no RM (coligada 1 ): " + e;
        log.info(e);
        throw mensagemErro;

    }
}

/*'
 * A API de autenticação da Totvs baseia no "Basic access authentication" do HTTP.
 * Código Java para autenticação 
 * Programa responsável por integrar com os Webservices do RM 
 *  Exemplo dev valores para os parâmetros 
 *       @param string Usuario = "mestre";
 *       @param string Senha = "totvs";
 */

function getWebService(Usuario, Senha) {

    var Nome_Servico = "WSRM";
    var Caminho_Servico = "br.com.totvs.WsDataServer";

    var dataServerService = ServiceManager.getServiceInstance(Nome_Servico);
    if (dataServerService == null) {
        throw "Servico nao encontrado: " + Nome_Servico;
    }

    var serviceLocator = dataServerService.instantiate(Caminho_Servico);
    if (serviceLocator == null) {
        throw "Instancia do servico nao encontrada: " + Nome_Servico + " - " + Caminho_Servico;
    }

    var service = serviceLocator.getRMIwsDataServer();
    if (service == null) {
        throw "Instancia do dataserver do invalida: " + Nome_Servico + " - " + Caminho_Servico;
    }

    var serviceHelper = dataServerService.getBean();
    if (serviceHelper == null) {
        throw "Instancia do service helper invalida: " + Nome_Servico + " - " + Caminho_Servico;
    }

    var authService = serviceHelper.getBasicAuthenticatedClient(service, "br.com.totvs.IwsDataServer", Usuario, Senha);
    if (serviceHelper == null) {
        throw "Instancia do auth service invalida: " + Nome_Servico + " - " + Caminho_Servico;
    }

    return authService;
}


function dcReadView(dataservername, context, usuario, senha, filtro) {
    // carrega o webservice...
    var authService = getWebService(usuario, senha);

    // lê os dados da visão respeitando o filtro passado
    var viewData = new String(authService.readView(dataservername, filtro, context));

    return viewData;
}


function dcReadRecord(dataservername, context, usuario, senha, primaryKey) {
    // carrega o webservice...
    var authService = getWebService(usuario, senha);

    // lê os dados do registro respeitando a pk passada
    try {
        var recordData = new String(authService.readRecord(dataservername, primaryKey, context));
    } catch (e) {
        var recordData = new String(authService.getSchema(dataservername, context));
    }

    return recordData;
}


function dcSaveRecord(dataservername, context, usuario, senha, xml) {
    // carrega o webservice...
    var authService = getWebService(usuario, senha);

    // salva o registro de acordo com o xml passado
    var pk = new String(authService.readRecord(dataservername, xml, context));

    return pk;
}


//Transforma o conceito de constraints do Fluig para o Filtro do TBC.
function parseConstraints(constraints, filterRequired) {
    // inicializa o resultado...
    var result = [];
    result.context = "";

    // inicializa o filtro...
    var filter = "";

    // varre as contraints...
    for (con in constraints) {
        var fieldName = con.getFieldName().toUpperCase();
        if (fieldName == "RMSCONTEXT") {
            result.context = con.getInitialValue();
            continue;
        }

        filter += "(";

        if (fieldName == "RMSFILTER") {
            filter += con.getInitialValue();
        } else {
            if (con.getInitialValue() == con.getFinalValue() || isEmpty(con.getFinalValue())) {
                filter += con.getFieldName();
                var isLike = false;
                switch (con.getConstraintType()) {
                    case ConstraintType.MUST:
                        filter += " = ";
                        break;
                    case ConstraintType.MUST_NOT:
                        filter += " = ";
                        break;
                    case ConstraintType.SHOULD:
                        filter += " LIKE ";
                        isLike = true;
                        break;
                    case ConstraintType.SHOULD_NOT:
                        filter += " NOT LIKE ";
                        isLike = true;
                        break;
                }
                filter += getFormattedValue(con.getInitialValue(), isLike);
            } else {
                filter += con.getFieldName();
                filter += " BETWEEN ";
                filter += getFormattedValue(con.getInitialValue(), false);
                filter += " AND ";
                filter += getFormattedValue(con.getFinalValue(), false);
            }
        }

        filter += ") AND ";
    }

    if (filter.length == 0) {
        if (filterRequired) {
            filter = "1=1";
        } else {
            filter = "1=1";
        }
    } else
        filter = filter.substring(0, filter.length - 5);

    // guarda o filtro...
    result.filter = filter;

    // retorna o resultado...
    return result;
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function getFormattedValue(value, isLike) {
    if (isLike) {
        return "'%" + value + "%'";
    } else {
        return "'" + value + "'";
    }
}



function getXMLFromString(xmlString) {
    var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
    var parser = factory.newDocumentBuilder();
    var is = new org.xml.sax.InputSource();
    is.setCharacterStream(new java.io.StringReader(xmlString));
    return parser.parse(is);
}


function abrirPesquisa(DATASET_ID, dataFields, resultFields, type, title) {
    window.open("/webdesk/zoom.jsp" +
        "?datasetId=" +
        DATASET_ID +
        "&dataFields=" +
        dataFields +
        "&resultFields=" +
        resultFields +
        "&type=" +
        type +
        "&title=" +
        title, "zoom", "status,scroolbars=no,width=600,height=350,top=0,left=0");
}

function checkIsPK(result, qtd) {
    var lines = result.split('\r');

    if (lines.length == 1) {
        var pk = result.split(';');
        if (pk.length == qtd)
            return;
    }
    throw result;

}

function ChekExist(result) {
    var lines = result.split('\r');
    if (lines.length > 1)
        return true
    else
        return false;
}


function replaceValue(text, columnName, newValue) {


    if ((newValue != null) && (newValue.trim() != "")) {
        var regex = new RegExp("<" + columnName + ">(.*?)<\\/" + columnName + ">", "g");
        var replaceText = "<" + columnName + ">" + newValue + "</" + columnName + ">";

        return text.replace(regex, replaceText);
    } else
        return text;
}


function isEmpty(str) {
    return (!str || 0 === str.length);
}

function dataAtualFormatada() {

    var data = new Date();
    var dia = data.getDate();
    if (dia.toString().length == 1)
        dia = "0" + dia;
    var mes = data.getMonth() + 1;
    if (mes.toString().length == 1)
        mes = "0" + mes;
    var ano = data.getFullYear();
    return ano + "-" + mes + "-" + dia;
}


function dataentrega() {
    var data = new Date();
    data.setDate(data.getDate() + 15);
    var dia = data.getDate();
    if (dia.toString().length == 1)
        dia = "0" + dia;
    var mes = data.getMonth() + 1;
    if (mes.toString().length == 1)
        mes = "0" + mes;
    var ano = data.getFullYear();
    return ano + "-" + mes + "-" + dia;
}