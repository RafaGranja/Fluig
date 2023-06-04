// BUSCA OPS EM ABERTO DE UM PLANO DE CORTE
function createDataset(fields, constraints, sortFields) {

	var dsOpsConcluidasPAPC = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var numPlano = ""

    	
	if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if (constraints[i].fieldName == "NUMPLANOCORTE") {
            	
        		numPlano = constraints[i].initialValue
            	
            }
        	
        }
        
	}
    
    var myQuery = 	" SELECT CODORDEM, ( SELECT COUNT(CODORDEM) FROM ZMDPLANOAPROVEITAMENTOCORTE WHERE NUMPLANOCORTE='"+numPlano+"') TOTAL FROM "+
    				" KORDEM WHERE CODORDEM IN ( SELECT CODORDEM FROM ZMDPLANOAPROVEITAMENTOCORTE WHERE NUMPLANOCORTE='"+numPlano+"') "+
    				" AND STATUS <> 5 "
    
    log.info("QUERY dsOpsConcluidasPAPC: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsOpsConcluidasPAPC.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsOpsConcluidasPAPC.addRow(Arr);
            
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
    
    return dsOpsConcluidasPAPC;
	
}