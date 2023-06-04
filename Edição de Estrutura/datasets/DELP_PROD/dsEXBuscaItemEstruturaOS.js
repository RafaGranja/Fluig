// BUSCA TODOS OS DADOS CADASTRADOS DE UM DETERMINADO ITEM DA ESTRUTURA 
function createDataset(fields, constraints, sortFields) {

	var dsEXBuscaItemEstruturaOS = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var numOS = ""
    var idCriacao = ""
    var execucao = ""
    	
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue;
        		
        	}
        	if(constraints[i].fieldName == "IDCRIACAO"){
        		
        		idCriacao = constraints[i].initialValue;
        		
        	} 
        	if(constraints[i].fieldName == "EXECUCAO"){
        		
        		execucao = constraints[i].initialValue;
        	
        	} 
        	
        }
        
    }  
    
    var myQuery = "SELECT * FROM Z_CRM_EX001005 WHERE OS='"+numOS+"' AND IDCRIACAO='"+idCriacao+"' AND EXECUCAO="+execucao
    
    log.info("QUERY dsEXBuscaItemEstruturaOS: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsEXBuscaItemEstruturaOS.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsEXBuscaItemEstruturaOS.addRow(Arr);
            
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
    
    return dsEXBuscaItemEstruturaOS;
	
}