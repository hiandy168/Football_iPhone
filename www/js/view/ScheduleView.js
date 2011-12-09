
function ScheduleView(type){
	
	this.type = type;

	 var helperFunctions = {
		 scheduleDateString : function(str){

			if (str == null || str.length < 12){
				return str;				
			}
						
			var year = str.substring(0, 4);
			var month = str.substring(4, 6);
			var day = str.substring(6, 8);
			var hour = str.substring(8, 10);
			var minute = str.substring(10, 12);
			
			var result = month + "/" + day + " " + hour + ":" + minute;
			return result;			
		},
		
		isFinished : function(state){
			if(state == -1){
                return true;
            }
			return false;
		},
		getStateString : function(state){

            //0:未开,1:上半场,2:中场,3:下半场,-11:待定,-12:腰斩,-13:中断,-14:推迟,-1:完场，-10取消
			switch(state){
				case "0":
					return "未";
				case "1":
					return "上";
				case "2":
					return "中";
				case "3":
					return "下";
				case "-11":
					return "待定";
				case "-12":
					return "腰斩";
				case "-13":
					return "中断";
				case "-14":
					return "推迟";
				case "-1":
					return "完";
				case "-10":
					return "取消";
				default:
					return "未3";
			}
		}
	 };

    var scheduleTemplate = Ext.XTemplate.from("schedule-template", helperFunctions);

    this.schedulePanel = new Ext.Panel({            
        tpl : scheduleTemplate,
        margin: '0 0 0 0',
        align: 'left'
    });	        	       


    this.mainPanel = new Ext.Panel({

        fullscreen: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        scroll : 'vertical',
        items: [this.schedulePanel]            
    });	
	
	this.manager = null;
}

ScheduleView.prototype = {
	constructor : ScheduleView,
	updateView : function(manager) {
		this.manager = manager;
		this.schedulePanel.update(manager);
	}
};

