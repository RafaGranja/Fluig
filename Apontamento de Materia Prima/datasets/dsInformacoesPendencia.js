// BUSCA TODAS AS ORDEM ABERTAS PARA O PROJETO
function createDataset(fields, constraints, sortFields) {

	var dsInformaçõesPendencia = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var codOrdem = ""
    var idatvordem = ""
    var codigoprd = ""
    var codColigada = ""
    var codFilial = ""
    	
	if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if (constraints[i].fieldName == "CODORDEM") {
            	
        		codOrdem = " AND K.CODORDEM = '"+constraints[i].initialValue+"'"
            	
            }
        	if (constraints[i].fieldName == "IDATVORDEM") {
            	
        		idatvordem = " AND KA.IDATVORDEM = "+constraints[i].initialValue
            	
            }
        	if (constraints[i].fieldName == "CODIGOPRD") {
            	
        		codigoprd = " AND P.CODIGOPRD = '"+constraints[i].initialValue+"'"
            	
            }
        	if (constraints[i].fieldName == "CODCOLIGADA") {
            	
        		codColigada = " AND K.CODCOLIGADA = "+constraints[i].initialValue
            	
            }
        	if (constraints[i].fieldName == "CODFILIAL") {
            	
        		codFilial = " AND K.CODFILIAL ="+constraints[i].initialValue
            	
            }
        	
        }
        
	}

        
    var myQuery = 	" SELECT K.CODFILIAL,K.CODCOLIGADA,K.CODCCUSTO,K.CODORDEM,KL.NUMEXEC,KI.CODESTRUTURA,KA.IDATVORDEM,KA.STATUS STATUS_ATV, A.DSCATIVIDADE ,KA.CODATIVIDADE,P.IDPRD,P.CODIGOPRD,P.NOMEFANTASIA,KC.RETRABALHO FROM KORDEM K " +
    				" INNER JOIN KITEMORDEM KI ON K.CODCOLIGADA=KI.CODCOLIGADA AND K.CODFILIAL=KI.CODFILIAL AND K.CODORDEM=KI.CODORDEM 	"+
    				" INNER JOIN KORDEMCOMPL KL ON K.CODCOLIGADA=KL.CODCOLIGADA AND K.CODFILIAL=KL.CODFILIAL AND K.CODORDEM=KL.CODORDEM 	"+
    				" INNER JOIN KATVORDEM KA ON K.CODCOLIGADA=KA.CODCOLIGADA AND K.CODFILIAL=KA.CODFILIAL AND K.CODORDEM=KA.CODORDEM 	"+
    				" INNER JOIN KATVORDEMMP KM ON K.CODCOLIGADA=KM.CODCOLIGADA AND K.CODFILIAL=KM.CODFILIAL AND K.CODORDEM=KM.CODORDEM AND KA.IDATVORDEM=KM.IDATIVIDADE	"+
    				" INNER JOIN TPRD P ON K.CODCOLIGADA=P.CODCOLIGADA AND KM.IDPRODUTO=P.IDPRD	"+
    				" INNER JOIN KATVORDEMCOMPL KC ON KC.CODCOLIGADA = KA.CODCOLIGADA AND KC.CODFILIAL = KA.CODFILIAL AND KC.CODORDEM = KA.CODORDEM AND KC.IDATVORDEM = KA.IDATVORDEM "+
    				" INNER JOIN KATIVIDADE A ON A.CODCOLIGADA=KA.CODCOLIGADA AND A.CODFILIAL=KA.CODFILIAL AND A.CODATIVIDADE=KA.CODATIVIDADE	"+
    				" WHERE KM.EFETIVADO=0 AND K.STATUS NOT IN (6) AND KA.STATUS NOT IN (6) "+codOrdem+idatvordem+codigoprd+codColigada+codFilial
    
    log.info("QUERY dsOrdemProducaoOS: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsInformaçõesPendencia.addColumn(rs.getMetaData().getColumnName(i));
                	
                }
                
                created = true;
                
            }
            
            var Arr = new Array();
            
            for (var i = 1; i <= columnCount; i++) {
            	
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                
                if (null != obj) {
                	
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                    
                } else {
                	
                    Arr[i - 1] = "null";
                    
                }
                
            }
            
            dsInformaçõesPendencia.addRow(Arr);
            
        }
        
    } catch (e) {
        
    	log.error("ERRO==============> " + e.message);
    
    } finally {
    	
        if (stmt != null) {
        	
            stmt.close();
            
        }
        
        if (conn != null) {
        	
            conn.close();
            
        }
        
    }
    
    return dsInformaçõesPendencia;
	
}