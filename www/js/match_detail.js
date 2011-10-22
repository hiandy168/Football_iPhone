



MatchDetailApp = new Ext.Application({

//Ext.regApplication({
    
    name: 'MatchDetailApp',
    
    isLaunched: 0,
    
    launch: function() {
        		
        console.log("match javascript launched");
//      testReadData();
//      testUpdateMatchDetail();
//      testUpdateOupeiDetail();
//		testUpdateYapeiDetail();
//      testUpdateOverunderDetail();
        
        MatchDetailApp.isLaunched = 1;
        
//        testYapeiOddsDetail();
//        testJSONP();
//        testSendRequest();
//		testUpdateYapeiDetail();
//		testUpdateLineup();
    }

});

function isAppLaunched(){
	return MatchDetailApp.isLaunched;
}

function testUpdateMatchDetail(){
	var data = "0^1^3^D.卡里奴!1^1^42^F.蒙迪路!0^1^60^施薩 迪加度$$3^8^6!4^5^4!5^5^3!6^3^3!9^0^3!11^1^2!16^2^4";
	updateMatchDetail(data);
}

function updateMatchDetail(inputString){

	MatchDetailApp.matchDetailView = new MatchDetailView();	
	MatchDetailApp.viewport = MatchDetailApp.matchDetailView.mainPanel;		
	
	matchDetailManager.readData(inputString);	
	MatchDetailApp.matchDetailView.eventPanel.update(matchDetailManager.eventArray);
	MatchDetailApp.matchDetailView.statPanel.update(matchDetailManager.statArray);
}

function testUpdateOupeiDetail(){
	var data = "盈禾^2580078^1.70^3.30^4.35^1.65^3.45^4.50!韦德^2574267^1.615^3.50^4.75^1.667^3.60^5.50!Bet365^2573522^1.61^3.40^5.00^1.65^4.20^4.60!易胜^2579536^1.65^3.40^4.75^1.62^3.40^5.00!ＳＢ^2580075^1.70^3.30^4.35^1.65^3.30^4.50!利记^2579424^1.70^3.40^4.20^1.64^3.35^4.80!永利高^2580277^1.70^3.30^4.35^1.46^3.30^4.35!10BET^2579343^1.61^3.47^4.92^1.54^3.58^5.26!金宝博^2580170^1.70^3.30^4.35^1.61^3.55^4.65!12bet/大发^2579540^1.67^3.45^4.32^1.64^3.37^4.68!明陞^2579541^1.67^3.45^4.32^1.64^3.37^4.68";
	updateOupeiDetail(data);
}

function updateOupeiDetail(oupeiData){
	
	MatchDetailApp.oupeiView = new OupeiView();	
	MatchDetailApp.viewport = MatchDetailApp.oupeiView.mainPanel;		

	oupeiManager.readData(oupeiData);
	
	MatchDetailApp.oupeiView.statPanel.update(oupeiManager.stat);	
	MatchDetailApp.oupeiView.companyPanel.update(oupeiManager.dataArray);
}

function testUpdateYapeiDetail(){
	var data = "ＳＢ^2490884^1.02^-0.25^0.80^0.90^-0.5^0.92!Bet365^2497415^1.10^-0.25^0.775^0.95^-0.5^0.90!立博^2502862^1.08^-0.25^0.72^1.08^-0.25^0.72!韦德^2496650^1.10^-0.25^0.75^1.16^-0.25^0.69!易胜^2504231^0.72^-0.5^1.08^0.87^-0.5^0.93!明陞^2497396^1.11^-0.25^0.74^0.97^-0.5^0.87!澳彩^2497282^1.02^-0.25^0.80^1.12^-0.25^0.70!10BET^2496512^1.06^-0.25^0.76^0.90^-0.5^0.90!金宝博^2497406^1.04^-0.25^0.80^0.91^-0.5^0.93!12bet/大发^2479187^1.11^-0.25^0.74^0.97^-0.5^0.87!利记^2478851^0.94^-0.25^0.90^0.94^-0.5^0.90!永利高^2496090^0.99^-0.25^0.77^0.87^-0.5^0.89!盈禾^2496075^1.03^-0.25^0.82^0.91^-0.5^0.94";
	updateYapeiDetail(data);
}

function updateYapeiDetail(yapeiData){
	MatchDetailApp.yapeiView = new YapeiView();
	MatchDetailApp.viewport = MatchDetailApp.yapeiView.mainPanel;
	
	yapeiManager.readData(yapeiData);
	
	MatchDetailApp.yapeiView.companyPanel.update(yapeiManager.dataArray);
}

function testYapeiOddsDetail(){
	MatchDetailApp.yapeiDetailView = new YapeiDetailView();
	MatchDetailApp.viewport = MatchDetailApp.yapeiDetailView.mainPanel;
	
	var yapeiData = "ＳＢ^2490884^1.02^-0.25^0.80^0.90^-0.5^0.92!Bet365^2497415^1.10^-0.25^0.775^0.95^-0.5^0.90!立博^2502862^1.08^-0.25^0.72^1.08^-0.25^0.72!韦德^2496650^1.10^-0.25^0.75^1.16^-0.25^0.69!易胜^2504231^0.72^-0.5^1.08^0.87^-0.5^0.93!明陞^2497396^1.11^-0.25^0.74^0.97^-0.5^0.87!澳彩^2497282^1.02^-0.25^0.80^1.12^-0.25^0.70!10BET^2496512^1.06^-0.25^0.76^0.90^-0.5^0.90!金宝博^2497406^1.04^-0.25^0.80^0.91^-0.5^0.93!12bet/大发^2479187^1.11^-0.25^0.74^0.97^-0.5^0.87!利记^2478851^0.94^-0.25^0.90^0.94^-0.5^0.90!永利高^2496090^0.99^-0.25^0.77^0.87^-0.5^0.89!盈禾^2496075^1.03^-0.25^0.82^0.91^-0.5^0.94";
	yapeiManager.readData(yapeiData);
	
	var oddsData = "0.80^0^1.11^20111021045000!0.76^0^1.16^20111021044800!0.77^0^1.14^20111021044800!0.70^0^1.25^20111021044600!0.72^0^1.21^20111021044500!0.68^0^1.28^20111021044500!0.67^0^1.29^20111021044400!0.65^0^1.33^20111021044200!0.68^0^1.28^20111021044100!0.70^0^1.25^20111021043700!0.72^0^1.21^20111021043700!0.74^0^1.19^20111021043700!0.72^0^1.21^20111021043600!0.77^0^1.14^20111021043500!0.78^0^1.13^20111021043500!0.79^0^1.12^20111021043500!0.80^0^1.11^20111021043500!0.78^0^1.13^20111021043300!0.80^0^1.11^20111021043300!0.83^0^1.07^20111021043300!0.85^0^1.05^20111021043100!0.83^0^1.07^20111021043000!0.80^0^1.11^20111021042900!0.79^0^1.12^20111021042800!0.81^0^1.09^20111021042700!0.83^0^1.07^20111021042600!0.80^0^1.11^20111021042600!0.77^0^1.14^20111021042600!0.74^0^1.19^20111021042400!0.73^0^1.20^20111021042400!0.70^0^1.25^20111021042300!0.72^0^1.21^20111021042200!0.73^0^1.20^20111021042200!0.75^0^1.17^20111021042100!0.70^0^1.25^20111021042100!0.69^0^1.26^20111021042000!1.25^0.25^0.70^20111021041800!1.20^0.25^0.73^20111021041800!1.17^0.25^0.75^20111021041700!1.14^0.25^0.77^20111021041600!1.13^0.25^0.78^20111021041600!1.11^0.25^0.80^20111021041500!1.14^0.25^0.77^20111021041400!1.12^0.25^0.79^20111021041400!1.11^0.25^0.80^20111021041400!1.08^0.25^0.82^20111021041300!1.11^0.25^0.80^20111021041100!1.09^0.25^0.81^20111021041000!1.12^0.25^0.79^20111021040000!1.13^0.25^0.78^20111021035900!1.11^0.25^0.80^20111021035800!1.13^0.25^0.78^20111021035100!1.11^0.25^0.80^20111021035000!1.13^0.25^0.78^20111021034900!1.11^0.25^0.80^20111021034700!1.08^0.25^0.82^20111021034700!1.07^0.25^0.83^20111021034500!1.06^0.25^0.84^20111021034500!1.08^0.25^0.82^20111021034300!1.11^0.25^0.80^20111021034000!0.94^0.25^0.96^20111021033900!0.92^0.25^0.98^20111021033700!0.91^0.25^0.99^20111021033700!0.93^0.25^0.97^20111021033700!0.95^0.25^0.95^20111021033500!0.94^0.25^0.96^20111021033500!0.95^0.25^0.95^20111021033500!0.93^0.25^0.97^20111021033400!0.97^0.25^0.93^20111021033400!0.95^0.25^0.95^20111021033200!0.93^0.25^0.97^20111021033200!0.97^0.25^0.93^20111021033200!0.95^0.25^0.95^20111021033100!0.93^0.25^0.97^20111021033100!0.95^0.25^0.95^20111021033000!0.92^0.25^0.98^20111021033000!0.90^0.25^1.00^20111021033000!0.88^0.25^1.02^20111021032900!0.87^0.25^1.03^20111021032800!0.86^0.25^1.04^20111021032700!0.84^0.25^1.06^20111021032700!0.80^0.25^1.11^20111021032600!0.82^0.25^1.08^20111021032200!0.80^0.25^1.11^20111021032100!0.82^0.25^1.08^20111021032100!1.14^0.5^0.77^20111021032000!1.11^0.5^0.80^20111021032000!1.08^0.5^0.82^20111021031800!1.06^0.5^0.84^20111021031700!1.05^0.5^0.85^20111021031700!1.03^0.5^0.87^20111021031600!1.01^0.5^0.89^20111021031600!0.99^0.5^0.91^20111021031500!1.02^0.5^0.88^20111021031400!1.03^0.5^0.87^20111021031300!1.02^0.5^0.88^20111021031300!0.98^0.5^0.92^20111021031300!0.99^0.5^0.91^20111021031300!0.97^0.5^0.93^20111021031300!0.99^0.5^0.91^20111021031200!0.98^0.5^0.92^20111021031200!1.00^0.5^0.90^20111021031200!1.02^0.5^0.88^20111021031200!1.00^0.5^0.90^20111021031100!1.02^0.5^0.88^20111021031100!0.98^0.5^0.92^20111021031000!1.00^0.5^0.90^20111021031000!0.98^0.5^0.92^20111021030900!1.00^0.5^0.90^20111021030900!0.98^0.5^0.92^20111021030900!1.00^0.5^0.90^20111021030900!0.98^0.5^0.92^20111021030900!1.00^0.5^0.90^20111021030800!1.02^0.5^0.88^20111021030800!1.00^0.5^0.90^20111021030800!1.02^0.5^0.88^20111021030700!1.00^0.5^0.90^20111021030700!1.02^0.5^0.88^20111021030700!1.00^0.5^0.90^20111021030600!1.02^0.5^0.88^20111021030600!1.00^0.5^0.90^20111021030600!0.96^0.5^0.92^20111021030600!0.94^0.5^0.94^20111021030500!0.96^0.5^0.92^20111021030500!0.94^0.5^0.94^20111021030500!0.93^0.5^0.95^20111021030400!0.96^0.5^0.92^20111021030400!0.98^0.5^0.90^20111021030300!1.00^0.5^0.88^20111021030200!1.02^0.5^0.86^20111021030100!1.00^0.5^0.88^20111021030100!0.98^0.5^0.90^20111021030000!0.99^0.5^0.89^20111021025700!0.98^0.5^0.90^20111021025700!0.99^0.5^0.89^20111021025600!0.98^0.5^0.90^20111021025600!1.00^0.5^0.88^20111021025500!1.00^0.5^0.87^20111021025500!1.05^0.5^0.83^20111021025400!1.00^0.5^0.88^20111021025400!1.02^0.5^0.86^20111021025300!1.04^0.5^0.84^20111021025300!1.02^0.5^0.86^20111021025300!1.01^0.5^0.87^20111021025200!1.03^0.5^0.85^20111021025100!1.01^0.5^0.87^20111021025100!1.00^0.5^0.88^20111021025100!1.01^0.5^0.87^20111021025100!0.98^0.5^0.90^20111021025100!0.96^0.5^0.92^20111021025000!0.99^0.5^0.89^20111021024900!0.98^0.5^0.90^20111021024900!0.97^0.5^0.91^20111021024800!0.94^0.5^0.94^20111021024800!0.97^0.5^0.91^20111021024700!0.94^0.5^0.94^20111021024600!0.97^0.5^0.91^20111021024600!0.98^0.5^0.90^20111021024600!0.97^0.5^0.91^20111021024600!0.94^0.5^0.94^20111021024300!0.97^0.5^0.91^20111021024200!0.94^0.5^0.94^20111021024100!0.97^0.5^0.91^20111021024000!0.94^0.5^0.94^20111021023800!0.97^0.5^0.91^20111021023800!0.94^0.5^0.94^20111021023600!0.96^0.5^0.92^20111021023500!0.93^0.5^0.95^20111021023500!0.95^0.5^0.93^20111021023500!0.92^0.5^0.96^20111021022500!0.91^0.5^0.97^20111021022200!0.92^0.5^0.96^20111021021900!0.89^0.5^0.99^20111021021500!0.90^0.5^0.98^20111021021500!0.87^0.5^1.01^20111021021500!0.84^0.5^1.04^20111021021500!0.87^0.5^1.01^20111021021400!0.90^0.5^0.98^20111021021000!0.93^0.5^0.95^20111021020600!0.90^0.5^0.98^20111021015900!0.87^0.5^1.01^20111021015900!0.90^0.5^0.98^20111021015400!0.87^0.5^1.01^20111021015400!0.90^0.5^0.98^20111021015300!0.89^0.5^0.99^20111021015300!0.92^0.5^0.96^20111021015200!0.93^0.5^0.95^20111021014300!0.91^0.5^0.97^20111021014300!0.94^0.5^0.94^20111021011900!0.92^0.5^0.96^20111021011700!0.95^0.5^0.93^20111021010400!0.92^0.5^0.96^20111021010400!0.95^0.5^0.93^20111021010100!0.98^0.5^0.90^20111021005600!1.01^0.5^0.87^20111021005500!1.04^0.5^0.84^20111021005500!1.01^0.5^0.87^20111021005400!0.98^0.5^0.90^20111021005300!0.95^0.5^0.93^20111021004800!0.97^0.5^0.91^20111021004500!0.94^0.5^0.94^20111021004400!0.91^0.5^0.97^20111021004300!0.94^0.5^0.94^20111021004100!0.91^0.5^0.97^20111021004000!0.94^0.5^0.94^20111021003600!0.92^0.5^0.96^20111021003500!0.95^0.5^0.93^20111021003100!0.92^0.5^0.96^20111021003100!0.95^0.5^0.93^20111021002600!0.92^0.5^0.96^20111021002600!0.95^0.5^0.93^20111021002100!0.93^0.5^0.95^20111021002000!0.96^0.5^0.92^20111021000900!0.95^0.5^0.93^20111021000300!0.93^0.5^0.95^20111020235700!0.96^0.5^0.92^20111020235600!0.93^0.5^0.95^20111020235600!0.96^0.5^0.92^20111020235400!0.95^0.5^0.93^20111020235400!0.92^0.5^0.96^20111020235300!0.89^0.5^0.99^20111020235100!0.92^0.5^0.96^20111020234900!0.89^0.5^0.99^20111020234800!0.92^0.5^0.96^20111020234200!0.93^0.5^0.95^20111020234200!0.96^0.5^0.92^20111020234000!0.93^0.5^0.95^20111020233200!0.96^0.5^0.92^20111020233100!0.93^0.5^0.95^20111020232600!0.90^0.5^0.98^20111020232300!0.87^0.5^1.01^20111020232200!0.90^0.5^0.98^20111020231800!0.89^0.5^0.99^20111020231700!0.92^0.5^0.96^20111020231300!0.89^0.5^0.99^20111020231200!0.92^0.5^0.96^20111020230800!0.95^0.5^0.93^20111020225500!0.94^0.5^0.94^20111020225300!0.91^0.5^0.97^20111020225000!0.94^0.5^0.94^20111020225000!0.97^0.5^0.91^20111020224700!0.96^0.5^0.92^20111020223100!0.93^0.5^0.95^20111020220800!0.91^0.5^0.97^20111020220700!0.88^0.5^1.00^20111020220700!0.91^0.5^0.97^20111020220500!0.88^0.5^1.00^20111020220400!0.91^0.5^0.97^20111020220200!0.94^0.5^0.94^20111020215500!0.91^0.5^0.97^20111020215400!0.94^0.5^0.94^20111020215200!0.93^0.5^0.95^20111020214400!0.90^0.5^0.98^20111020213500!0.93^0.5^0.95^20111020213200!0.96^0.5^0.92^20111020212800!0.95^0.5^0.93^20111020212600!0.94^0.5^0.94^20111020212500!0.88^0.5^1.00^20111020210600!0.85^0.5^1.03^20111020210500!0.88^0.5^1.00^20111020210400!0.85^0.5^1.03^20111020210400!0.82^0.5^1.06^20111020210300!0.85^0.5^1.03^20111020205700!0.82^0.5^1.06^20111020205600!0.85^0.5^1.03^20111020204500!0.82^0.5^1.06^20111020204400!0.85^0.5^1.03^20111020203200!0.83^0.5^1.05^20111020203200!0.86^0.5^1.02^20111020201800!0.83^0.5^1.05^20111020201800!0.86^0.5^1.02^20111020201000!0.85^0.5^1.03^20111020200900!0.88^0.5^1.00^20111020200200!0.86^0.5^1.02^20111020200200!0.89^0.5^0.99^20111020200100!0.87^0.5^1.01^20111020200000!0.90^0.5^0.98^20111020195600!0.91^0.5^0.97^20111020195400!0.88^0.5^1.00^20111020195100!0.87^0.5^1.01^20111020195100!0.90^0.5^0.98^20111020194900!1.12^0.75^0.77^20111020194800!1.08^0.75^0.80^20111020194700!1.05^0.75^0.83^20111020194400!1.02^0.75^0.86^20111020194300!1.05^0.75^0.83^20111020193400!1.02^0.75^0.86^20111020193300!1.05^0.75^0.83^20111020192000!1.08^0.75^0.80^20111020191000!1.04^0.75^0.84^20111020191000!1.08^0.75^0.80^20111020191000!1.04^0.75^0.84^20111020190300!1.01^0.75^0.87^20111020190100!1.04^0.75^0.84^20111020185000!1.01^0.75^0.87^20111020185000!1.04^0.75^0.84^20111020183500!1.01^0.75^0.87^20111020182100!0.98^0.75^0.90^20111020182000!1.01^0.75^0.87^20111020181800!0.98^0.75^0.90^20111020181800!0.95^0.75^0.93^20111020181700!0.95^0.75^0.87^20111020180600!0.92^0.75^0.90^20111020180600!0.95^0.75^0.87^20111020180300!0.92^0.75^0.90^20111020175900!0.87^0.75^0.95^20111020175800!0.92^0.75^0.90^20111020174500!0.87^0.75^0.95^20111020174500!0.92^0.75^0.90^20111020174100!0.87^0.75^0.95^20111020174100!0.92^0.75^0.90^20111020172800!0.95^0.75^0.87^20111020172800!0.90^0.75^0.92^20111020172300!0.85^0.75^0.97^20111020172300!0.90^0.75^0.92^20111020172200!0.95^0.75^0.87^20111020172100!0.90^0.75^0.92^20111020171800!0.95^0.75^0.87^20111020170600!0.90^0.75^0.92^20111020170100!0.85^0.75^0.97^20111020170100!0.90^0.75^0.92^20111020163200!0.87^0.75^0.95^20111020163100!0.85^0.75^0.97^20111020163100!0.90^0.75^0.92^20111020162300!0.85^0.75^0.97^20111020162300!0.90^0.75^0.92^20111020161900!0.85^0.75^0.97^20111020161700!0.90^0.75^0.92^20111020161400!0.85^0.75^0.97^20111020161200!0.90^0.75^0.92^20111020155800!0.85^0.75^0.97^20111020155700!0.90^0.75^0.92^20111020153900!0.85^0.75^0.97^20111020153900!0.90^0.75^0.92^20111020150900!0.87^0.75^0.95^20111020145700!0.92^0.75^0.90^20111020145600!0.87^0.75^0.95^20111020145300!0.92^0.75^0.90^20111020144700!0.94^0.75^0.88^20111020143700!0.93^0.75^0.89^20111020143700!0.88^0.75^0.94^20111020142500!0.83^0.75^0.99^20111020142400!0.88^0.75^0.94^20111020140000!0.85^0.75^0.97^20111020140000!0.90^0.75^0.92^20111020135500!0.85^0.75^0.97^20111020135500!0.90^0.75^0.92^20111020132100!0.95^0.75^0.87^20111020131000!0.90^0.75^0.92^20111020131000!0.93^0.75^0.89^20111020130900!0.88^0.75^0.94^20111020130900!0.90^0.75^0.92^20111020130800!0.85^0.75^0.97^20111020130800!0.90^0.75^0.92^20111020124700!0.85^0.75^0.97^20111020124500!0.80^0.75^1.02^20111020124500!0.85^0.75^0.97^20111020124400!0.90^0.75^0.92^20111020123900!0.82^0.75^1.00^20111020123900!0.87^0.75^0.95^20111020123900!0.92^0.75^0.90^20111020123100!0.87^0.75^0.95^20111020123000!0.92^0.75^0.90^20111020122200!0.89^0.75^0.93^20111020122100!0.94^0.75^0.88^20111020121400!0.89^0.75^0.93^20111020121300!0.94^0.75^0.88^20111020121100!0.89^0.75^0.93^20111020121100!0.94^0.75^0.88^20111020120800!0.89^0.75^0.93^20111020120800!0.94^0.75^0.88^20111020113600!0.99^0.75^0.83^20111020112800!0.94^0.75^0.88^20111020102500!0.99^0.75^0.83^20111020093900!1.04^0.75^0.78^20111020065200!0.99^0.75^0.83^20111020052300!1.04^0.75^0.78^20111020042200!1.02^0.75^0.80^20111020041900!0.97^0.75^0.85^20111020034700!1.02^0.75^0.80^20111020031300!0.97^0.75^0.85^20111020024900!1.02^0.75^0.80^20111020023200!0.97^0.75^0.85^20111020021400!0.92^0.75^0.90^20111019231300!0.87^0.75^0.95^20111019035100!0.82^0.75^1.00^20111019034900!0.87^0.75^0.95^20111018195900!0.77^0.75^1.05^20111018162300!0.75^0.75^1.07^20111018033200!0.80^0.75^1.02^20111014172600!0.77^0.75^1.05^20111010150700";
	yapeiCompanyManager.parseOddsChangeRecord(oddsData);
	
	MatchDetailApp.yapeiDetailView.updateCompany();
}

function test(){
	
}

function createXHR(){
	var xhr = new XMLHttpRequest();
	return xhr;
}

function testSendRequest(){
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://bf.bet007.com/phone/HandicapDetail.aspx?OddsID=2490932", false);
  xhr.send(null);
  alert("xhr status = " + xhr.status + ", text = " + xhr.responseText);
}

function testUpdateOverunderDetail(){
	var data = "ＳＢ^1978021^1.00^2.5^0.80^0.78^2.5^1.02!Bet365^1984678^1.025^2.5^0.825^0.875^2.5^0.975!立博^1990224^1.01^2.5^0.79^0.94^2.5^0.86!韦德^1983921^0.909^2.5^0.80^0.80^2.5^0.909!易胜^1991610^0.95^2.5^0.75^0.90^2.5^0.80!明陞^1984659^1.02^2.5^0.80^0.89^2.5^0.93!澳彩^1984554^0.95^2.5^0.75^0.95^2.5^0.75!10BET^1983752^1.00^2.5^0.78^0.85^2.5^0.90!金宝博^1984669^1.02^2.5^0.80^0.79^2.5^1.03!12bet/大发^1966126^1.02^2.5^0.80^0.89^2.5^0.93!利记^1965788^1.02^2.5^0.80^0.88^2.5^0.94!永利高^1983327^0.97^2.5^0.77^0.785^2.5^0.955!盈禾^1983312^1.02^2.5^0.80^0.80^2.5^1.02";
	updateOverunderDetail(data);
}

function updateOverunderDetail(overunderData){
	MatchDetailApp.overunderView = new OverunderView();
	MatchDetailApp.viewport = MatchDetailApp.overunderView.mainPanel;
	
	overunderManager.readData(overunderData);
	
	MatchDetailApp.overunderView.companyPanel.update(overunderManager.dataArray);
}

function testUpdateLineup(){
	var data = "1 戈麦斯 ^19 巴松 ^28 沃尔克 ^7 列农 ^25 丹尼罗斯 ^29 利弗莫尔 ^30 桑德罗 ^46 卡洛尔 ^18 迪福 ^9 帕夫莱琴科 ^17 多斯桑托斯 $$23 库迪西尼 ^32 埃克托 ^4 卡鲍尔 ^14 莫德里奇 ^31 汤森德 ^27 雅戈 ^37 凯恩 $$1 利兹科夫 ^4 纳瓦斯 ^76 沙罗诺夫 ^27 博切蒂 ^2 O.古斯文 ^61 卡拿丹尼斯 ^8 利亚赞策夫 ^10 卡錫夫 ^66 拿特祖 ^16 基斯坦奴 ^18 巴尔德斯 $$24 艾盧斯基斯 ^67 K.罗门 ^19 卡列申 ^20 阿萊克塞·埃雷蒙科 ^5 奧巴.馬丁斯 ^92 V.奥拉萨科多夫";
	//parseRequestStringWithSegment(data);
	//lineupManager.readData(data);
	//console.log("***"+lineupManager.data.homeLineup[0]);
	updateLineup(data);
}

function updateLineup(lineupData){
	MatchDetailApp.lineupView = new LineupView();
	MatchDetailApp.viewport = MatchDetailApp.lineupView.mainPanel;
	
	lineupManager.readData(lineupData);
	
	MatchDetailApp.lineupView.homeLineupPanel.update(lineupManager.data.homeLineup[0]);
	MatchDetailApp.lineupView.homeReservePanel.update(lineupManager.data.homeReserve[0]);
	MatchDetailApp.lineupView.awayLineupPanel.update(lineupManager.data.awayLineup[0]);
	MatchDetailApp.lineupView.awayReservePanel.update(lineupManager.data.awayReserve[0]);
}
