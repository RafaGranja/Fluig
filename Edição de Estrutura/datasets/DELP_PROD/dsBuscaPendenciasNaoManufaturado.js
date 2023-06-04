// VERIFICA SE UM DETERMINADO ITEM DA ESTRUTURA QUE É NÃO MANUFATURADO TEM FILHOS
function createDataset(fields, constraints, sortFields) {

	var dsBuscaPendenciasNaoManufaturado = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
   
    var numOS = ""
    var exec = ""
    var codtrfpai = ""
	
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue;
        	
        	} 
                    	
        	if(constraints[i].fieldName == "EXEC"){
        		
        		exec = constraints[i].initialValue;
        	
        	} 

            if(constraints[i].fieldName == "CODTRFPAI"){
        		
        		codtrfpai = constraints[i].initialValue;
        	
        	} 
        	
        }
        
    }  

    log.info("VOU MONTAR A QUERY")


    var myQuery =  " "

    if (exec=="") {
        
        /*myQuery =  " SELECT DISTINCT INDICE FROM Z_CRM_ML001005 Z "+
                    " LEFT JOIN Z_CRM_ML001019 Z1 ON Z.OS=Z1.OSCOMPONENTES AND Z.IDCRIACAO=Z1.IDCRIACAOCOMPONENTES "+
                    " WHERE TIPODESENHO='NAOMANUFATURADO' AND ( LEFT(Z1.CODIGOPRDCOMPONENTES,6) NOT IN ('01.051','01.052')  "+
                    " OR ( SELECT COUNT(*) FROM Z_CRM_ML001019 Z2 WHERE Z.OS=Z2.OSCOMPONENTES AND Z.IDCRIACAO=Z2.IDCRIACAOCOMPONENTES) != 1 "+ // Industrializado deve ter 1 componente
                    " OR ( LEFT(Z1.CODIGOPRDCOMPONENTES,6)!='01.051' AND (SELECT COUNT(*) FROM Z_CRM_ML001005 WHERE OS=Z.OS AND ITEMDERETORNO=Z.IDCRIACAO) > 0 ) "+
                    " OR ( LEFT(Z1.CODIGOPRDCOMPONENTES,6)='01.052' AND (SELECT COUNT(*) FROM Z_CRM_ML001005 ZAUX INNER JOIN Z_CRM_ML001019 Z2AUX ON ZAUX.OS=Z2AUX.OSCOMPONENTES AND ZAUX.IDCRIACAO=Z2AUX.IDCRIACAOCOMPONENTES "+
                    "  WHERE ZAUX.OS=Z.OS AND ZAUX.NIVEL=Z.NIVEL AND ZAUX.IDCRIACAO!=Z.IDCRIACAO AND ZAUX.TIPODESENHO='INDUSTRIALIZADO' AND  LEFT(Z2AUX.CODIGOPRDCOMPONENTES,6)='01.018' ) < 1 ) "+
                    " OR ( LEFT(Z1.CODIGOPRDCOMPONENTES,6)='01.052' AND (SELECT COUNT(*) FROM Z_CRM_ML001005 WHERE OS=Z.OS AND ITEMDERETORNO=Z.IDCRIACAO) > 0 ) "+
                    " ) "+
                    //Pai tem processo
                    " AND ( SELECT COUNT(*) FROM Z_CRM_ML001005 ZT INNER JOIN Z_CRM_ML001021 ZA ON ZT.OS=ZA.OSPROCESSO AND ZT.IDCRIACAO=ZA.IDCRIACAOPROCESSO WHERE ZT.OS=Z.OS AND ZT.INDICE=Z.NIVEL ) > 0 "+
                    " AND Z.OS ='"+numOS+"' "+
                    " ORDER BY CAST('/' + REPLACE(INDICE, '.', '/') + '/' AS HIERARCHYID)" */
    	
        myQuery = " SELECT * FROM Z_DELP_PENDNAOMANUFATURADO_OS WHERE OS ='"+numOS+"' "

    }
    else{

        /*myQuery =  " SELECT DISTINCT INDICE FROM Z_CRM_EX001005 Z "+
                    " LEFT JOIN Z_CRM_EX001019 Z1 ON Z.OS=Z1.OSCOMPONENTES AND Z.IDCRIACAO=Z1.IDCRIACAOCOMPONENTES AND Z.EXECUCAO=Z1.EXECUCAO"+
                    " WHERE TIPODESENHO='NAOMANUFATURADO' AND ( LEFT(Z1.CODIGOPRDCOMPONENTES,6) NOT IN ('01.051','01.052')  "+
                    " OR ( SELECT COUNT(*) FROM Z_CRM_EX001019 Z2 WHERE Z.OS=Z2.OSCOMPONENTES AND Z.IDCRIACAO=Z2.IDCRIACAOCOMPONENTES AND Z.EXECUCAO=Z2.EXECUCAO) != 1 "+ // Industrializado deve ter 1 componente
                    " OR ( LEFT(Z1.CODIGOPRDCOMPONENTES,6)!='01.051' AND (SELECT COUNT(*) FROM Z_CRM_EX001005 WHERE OS=Z.OS AND ITEMDERETORNO=Z.IDCRIACAO AND EXECUCAO=Z.EXECUCAO ) > 0 ) "+ // Não manufaturados não podem estar codificados com componente diferente de 01.051 caso esteja cadastrado em um 03.023; 
                    " OR ( LEFT(Z1.CODIGOPRDCOMPONENTES,6)='01.052' AND (SELECT COUNT(*) FROM Z_CRM_EX001005 ZAUX INNER JOIN Z_CRM_EX001019 Z2AUX ON ZAUX.OS=Z2AUX.OSCOMPONENTES AND ZAUX.IDCRIACAO=Z2AUX.IDCRIACAOCOMPONENTES AND ZAUX.EXECUCAO=Z2AUX.EXECUCAO "+
                    "  WHERE ZAUX.OS=Z.OS AND ZAUX.EXECUCAO=Z.EXECUCAO AND ZAUX.NIVEL=Z.NIVEL AND ZAUX.IDCRIACAO!=Z.IDCRIACAO AND ZAUX.TIPODESENHO='INDUSTRIALIZADO' AND  LEFT(Z2AUX.CODIGOPRDCOMPONENTES,6)='01.018' ) < 1 ) "+ //'Os itens não manufaturados com componente 01.052 devem ter ao menos um irmão do tipo industrializado com componente 01.018;'
                    " OR ( LEFT(Z1.CODIGOPRDCOMPONENTES,6)='01.052' AND (SELECT COUNT(*) FROM Z_CRM_EX001005 WHERE OS=Z.OS AND ITEMDERETORNO=Z.IDCRIACAO AND EXECUCAO=Z.EXECUCAO) > 0 ) "+ //'Não manufaturados não podem estar relacionados a semiacabados e possuírem componente 01.052;'
                    " ) "+
                    //Pai tem processo
                    " AND ( SELECT COUNT(*) FROM Z_CRM_EX001005 ZT INNER JOIN Z_CRM_EX001021 ZA ON ZT.OS=ZA.OSPROCESSO AND ZT.IDCRIACAO=ZA.IDCRIACAOPROCESSO AND ZT.EXECUCAO=ZA.EXECUCAO WHERE ZT.OS=Z.OS AND ZT.INDICE=Z.NIVEL AND Z.EXECUCAO=ZT.EXECUCAO) > 0 "+
                    " AND Z.OS ='"+numOS+"' AND Z.EXECUCAO ="+exec+" AND Z.CODTRFPAI='"+codtrfpai+"' "+
                    " ORDER BY CAST('/' + REPLACE(INDICE, '.', '/') + '/' AS HIERARCHYID)" */
    	
    	myQuery = " SELECT * FROM Z_DELP_PENDNAOMANUFATURADO_EX WHERE OS ='"+numOS+"' AND EXECUCAO ="+exec+" AND CODTRFPAI='"+codtrfpai+"'"


    }

    
    log.info("QUERY dsBuscaPendenciasNaoManufaturado: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsBuscaPendenciasNaoManufaturado.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsBuscaPendenciasNaoManufaturado.addRow(Arr);
            
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
    
    return dsBuscaPendenciasNaoManufaturado;
	
}