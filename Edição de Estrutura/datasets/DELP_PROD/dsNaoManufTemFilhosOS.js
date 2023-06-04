// VERIFICA SE UM DETERMINADO ITEM DA ESTRUTURA QUE É NÃO MANUFATURADO TEM FILHOS
function createDataset(fields, constraints, sortFields) {

	var dsNaoManufTemFilhosOS = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
   
    var numOS = ""
	
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue;
        	
        	} 
        	
        }
        
    }  

    log.info("VOU MONTAR A QUERY")
    
    var myQuery =   "SELECT "+
					"	(SELECT TOP 1 INDICE FROM Z_CRM_ML001005 WHERE OS=M.OS AND INDICE LIKE M.INDICE+'.%') FILHO, M.INDICE, M.IDCRIACAO, M.TIPODESENHO "+
					"FROM "+
					"	Z_CRM_ML001005 M "+
					"	LEFT JOIN Z_CRM_ML001005 ML ON M.OS=ML.OS AND M.IDCRIACAO=ML.IDCRIACAO "+
					"WHERE "+
					"	M.OS='"+numOS+"' AND ( M.TIPODESENHO='NAOMANUFATURADO' OR M.TIPODESENHO='INDUSTRIALIZACAO') " 
    
    log.info("QUERY dsNaoManufTemFilhosOS: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsNaoManufTemFilhosOS.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsNaoManufTemFilhosOS.addRow(Arr);
            
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
    
    return dsNaoManufTemFilhosOS;
	
}