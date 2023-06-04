// BUSCA AS PENDENCIAS DE SALDO D EUM ITEM
function createDataset(fields, constraints, sortFields) {

	var dsRelatorioLoteProduto = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    //var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var coligada = "";
    var prod = "";

       
    log.info("Entrei no dataset dsRelatorioLoteProduto")	
    
    log.info("constraints")
    
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "PRODUTO"){
        		
        		prod = constraints[i].initialValue
        		
        	}
			if(constraints[i].fieldName == "COLIGADA"){
			        		
			    coligada = constraints[i].initialValue
			        		
			}

        }
        
    }
    
    var myQuery =" 	SELECT * FROM (SELECT CAST(TL.IDLOTE AS VARCHAR(MAX)) IDLOTE, CONCAT(TL.NUMLOTE,CASE WHEN K.CODORDEM IS NOT NULL THEN CONCAT(' - EXEC ',KL.NUMEXEC) ELSE '' END ) NUMLOTE " +
    		", ISNULL(ISNULL(TLC.SALDOFISICO1 ,0) + ISNULL(TLC.SALDOFISICO2 ,0) + ISNULL(TLC.SALDOFISICO3 ,0) + ISNULL(TLC.SALDOFISICO4 ,0) + ISNULL(TLC.SALDOFISICO5  ,0) + ISNULL(TLC.SALDOFISICO6 ,0) + ISNULL(TLC.SALDOFISICO7 ,0) + "+
    		" ISNULL(TLC.SALDOFISICO8 ,0) + ISNULL(TLC.SALDOFISICO9 ,0) + ISNULL(TLC.SALDOFISICO10,0),0) SALDOTOTAL,   "+
    		" TS.DESCRICAO STATUS,ISNULL(TLC.CODLOC, CASE WHEN ISNULL(K.QTDEEFETIVADA,0) > 0 THEN 'SALDO CONSUMIDO' " +
    		" ELSE CASE WHEN T.CODIGOPRD LIKE '03.023%' OR T.CODIGOPRD LIKE '04.024%' THEN 'SUBIR SALDO' ELSE 'SEM SALDO' END END) CODLOC,KL.NUMEXEC "+
    		" FROM TPRD T  "+
    		" LEFT JOIN TLOTEPRD TL ON "+
    		" TL.CODCOLIGADA=T.CODCOLIGADA "+
    		" AND TL.IDPRD=T.IDPRD "+
    		" LEFT JOIN TLOTEPRDLOC TLC ON "+
    		" TLC.CODCOLIGADA=T.CODCOLIGADA "+
    		" AND TLC.IDLOTE=TL.IDLOTE "+
    		" LEFT JOIN TSTATUSLOTEPRD TS ON "+
    		" TS.IDSTATUS=TL.IDSTATUS "+
    		" LEFT JOIN KITEMORDEM K ON "+
    		" K.CODCOLIGADA=T.CODCOLIGADA "+
    		" AND K.CODESTRUTURA=T.CODIGOPRD "+
    		" AND K.CODORDEM=TL.NUMLOTE "+
    		" LEFT JOIN KORDEMCOMPL KL ON "+
    		" KL.CODCOLIGADA=T.CODCOLIGADA "+
    		" AND KL.CODORDEM=K.CODORDEM "+
    		" AND KL.CODFILIAL=K.CODFILIAL "+
    		" LEFT JOIN KORDEM KK ON "+
    		" KK.CODCOLIGADA=T.CODCOLIGADA "+
    		" AND KK.CODORDEM=K.CODORDEM "+
    		" AND KK.CODFILIAL=K.CODFILIAL "+
    		" WHERE T.CODCOLIGADA="+coligada+" AND CODIGOPRD='"+prod+"' AND ( KK.RESPONSAVEL NOT LIKE '%RETRABALHO%' OR KK.RESPONSAVEL IS NULL)  "+
    			" UNION ALL "+
    		" SELECT 'NÃO CRIADO' IDLOTE ,CONCAT(K.CODORDEM,' - EXEC ',KL.NUMEXEC),0,KS.DSCSTATUS,'SUBIR SALDO' CODLOC,KL.NUMEXEC  FROM  "+
    		" KITEMORDEM K  "+
    		" INNER JOIN TPRD T ON "+
    		" K.CODCOLIGADA=T.CODCOLIGADA "+
    		" AND K.CODESTRUTURA=T.CODIGOPRD "+
    		" LEFT JOIN TLOTEPRD TL ON "+
    		" TL.CODCOLIGADA=T.CODCOLIGADA "+
    		" AND TL.IDPRD=T.IDPRD "+
    		" AND TL.NUMLOTE=K.CODORDEM "+
    		" INNER JOIN KSTATUS KS ON "+
    		" KS.CODCOLIGADA=K.CODCOLIGADA "+
    		" AND KS.CODSTATUS=K.STATUS "+
    		" INNER JOIN KORDEMCOMPL KL ON "+
    		" KL.CODCOLIGADA=T.CODCOLIGADA "+
    		" AND KL.CODORDEM=K.CODORDEM "+
    		" AND KL.CODFILIAL=K.CODFILIAL "+
    		" LEFT JOIN KORDEM KK ON "+
    		" KK.CODCOLIGADA=T.CODCOLIGADA "+
    		" AND KK.CODORDEM=K.CODORDEM "+
    		" AND KK.CODFILIAL=K.CODFILIAL "+
    		" WHERE TL.IDLOTE IS NULL AND K.STATUS!=6 AND T.CODCOLIGADA="+coligada+" AND T.CODIGOPRD='"+prod+"'  AND ( KK.RESPONSAVEL NOT LIKE '%RETRABALHO%' OR KK.RESPONSAVEL IS NULL) ) R" +
    		" WHERE (CHARINDEX('/',NUMLOTE,0)!=0) OR ISNULL(SALDOTOTAL,0) > 0 ORDER BY NUMEXEC"

    
    log.info("QUERY dsRelatorioLoteProduto: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsRelatorioLoteProduto.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsRelatorioLoteProduto.addRow(Arr);
            
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
    
    return dsRelatorioLoteProduto;
	
}