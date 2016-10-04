/*
 * Bootstrap-based responsive mashup
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );

var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};

//console.log(config);

//to avoid errors in dev-hub: you can remove this when you have added an app
var app;
require.config( {
	baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"
} );

var qlikNameArray = ["linechart", "piechart", "treemap", "scatterplot", "table", "barchart", "combochart", "kpi", "pivot-table", "map", "filterpane", "text-image"];
var qlikLUINameArray = ["lui-icon--line-chart", "lui-icon--pie-chart", "lui-icon--treemap", "lui-icon--scatter-chart", "lui-icon--table", "lui-icon--bar-chart", "lui-icon--combo-chart", "lui-icon--kpi", "lui-icon--pivot-table", "lui-icon--map", "lui-icon--filterpane", "lui-icon--image"];
var qlikColorPossible = ["linechart", "piechart", "treemap", "scatterplot", "barchart", "combochart", "map"];

var currApp;
var currObject;
var qlikObject;
var colorOption;
var colorExpression;
var sortingExpression;
var singleColor;
var lastTheme;
var lastGradientTheme;
var oldResult;
var oldGradient;

var appHandle;

require( ["js/qlik", "js/themes.js", "js/gradientThemes.js"], function ( qlik ) {

		
	
		qlik.getAppList(function(list){
			list.forEach(function(value) {
				//console.log(value);
				//console.log(value);
				if(value.qMeta.published != undefined && value.qMeta.published == true) { //only add apps from Desktop or My Work				
				}
				else {
					$('<option value="'+ value.qDocId +'">'+value.qDocName+'</option>').appendTo("#qlikAppList");	
				}

			});
			//$('<option selected disabled>Select an app...</option>').appendTo("#qlikAppList");
		}, config);
		
		$("#qlikAppList").change(function(){

			$(".container:hidden").each(function(){
				//console.log($(this));
				$(this).removeClass("hidden");
			});
			$(".horizontal-line:hidden").each(function(){
				//console.log($(this));
				$(this).removeClass("hidden");
			});
			
			
			
			//console.log('Selected value: ' + $(this).val());
			app = qlik.openApp($(this).val(), config);
			currApp = $(this).val();
			
			//console.log(app);
			
			
			app.getAppObjectList( 'masterobject', function(reply){
			$("#appVizList").empty();
			
			//console.log(reply);
			
			//console.log(app);
			
			// app.model.enigmaModel.getAllInfos()
			// .then(function(result) {
					// //console.log(result);
					// $.each(result, function(key, value) {
							// app.getObjectProperties(value.qId).then(function(model){
								// //console.log(model);
								// //qlikObject = model.properties;
								// if(jQuery.inArray(model.properties.visualization, qlikColorPossible)>=0) {
									// //console.log(model.id + " - " + model.properties.visualization + " - ");
									// //console.log(model);
									// if(model.properties.qMetaDef != undefined) {
										// console.log(model.properties.qMetaDef.title);
									// }
								// }
							// });	
					// });
				// });
			
			
			
			
			$.each(reply.qAppObjectList.qItems, function(key, value) {		
				
				//console.log(jQuery.inArray(value.qData.visualization, qlikColorPossible));
				
				if(jQuery.inArray(value.qData.visualization, qlikColorPossible)>=0) {
					$('<button class="lui-button" id="'+value.qInfo.qId+'"><span class="lui-icon  '+ qlikLUINameArray[jQuery.inArray( value.qData.visualization, qlikNameArray )] +'" style="margin-right:5px;"></span>'+value.qMeta.title+'</button>').appendTo("#appVizList");
					
					
					//$("#"+value.qInfo.qId).hover(function() {
						//console.log(value.qMeta.description);
						
						// var tooltip;
						// var options = {
							// alignTo: document.getElementById(value.qInfo.qId), //$("#"+value.qInfo.qId),
							// dock: "bottom",
							// content: "<span>"+value.qInfo.qId+"</span>"
						// };
						// tooltip = leonardoui.tooltip(options);
						var tooltipContent;
						if(value.qMeta.description=="" || value.qMeta.description==undefined) {
							tooltipContent = "No description";
						}
						else {
							tooltipContent = value.qMeta.description;
						}
						$("#"+value.qInfo.qId).tooltip({title: tooltipContent, placement: "bottom"});
						
					//});
					
					$("#"+value.qInfo.qId).click(function() {
						$( "#appVizList :button" ).each(function( index ) {
							$(this).removeClass("lui-button--success");
						});
						$(this).toggleClass("lui-button--success");
						
						$(".colorcontainer").addClass("hidden");
						$(".left-panel").removeClass("hidden");
						$(".right-panel").removeClass("hidden");
						
						app.getObject($("#vizArea"), value.qInfo.qId);

							currObject = value.qInfo.qId;
							//qlikObject = app.getObjectProperties(value.qInfo.qId);
							
							app.getObjectProperties(currObject).then(function(model){
								//console.log(model);
								qlikObject = model.properties;
							});	
							
							//console.log(qlikObject);
							//console.log(qlikObject.properties.title);
							populateColorTypes(value);
						//});	
					});
				}
				else{}
				
			});
		});
		
		function populateColorTypes(qObj) {
			//console.log(qObj);
			$("#qlikColorOption").empty();
			$('<option selected disabled>Select color option..</option>').appendTo("#qlikColorOption");
			$('<option value="color1">Single Color</option>').appendTo("#qlikColorOption");
			$('<option value="color2">Theme</option>').appendTo("#qlikColorOption");
			$('<option value="color3">Gradient</option>').appendTo("#qlikColorOption");
			$('<option value="color4">Gradient Theme</option>').appendTo("#qlikColorOption");
			

			
		}

		
			$("#qlikColorOption").change(function(){
				//$("#colorcontainer").addClass("hidden");
				//console.log($("#qlikColorOption").val());
				$(".colorcontainer").addClass("hidden");
				$("." + $("#qlikColorOption").val()).removeClass("hidden");
				colorOption = $("#qlikColorOption").val();
				
				populateColorOptions(colorOption);
				
				
				
			});
		
			
		});
		
		
		function populateColorOptions(colorOption) {
			$(".colorcontainer").children("div").addClass("hidden");
			$("."+colorOption).children("div").removeClass("hidden");			
			
			if(colorOption=="color1") {
				
				$('#bgopacity').on('input', function (value) {

						
						var tempColor = hexToRgba($("#chartColorPicker1")[0].value, value.currentTarget.value, 1)

						
						singleColorChange();

				});
				
				
				$("#chartColorPicker1").on('change', function() {
					

					singleColorChange();
					//console.log("change");
					//singleColor = "#" + $("#chartColorPicker1").val()
					//modifyObject();
				});
				
				function singleColorChange() {
					
					var tempColor = hexToRgba($("#chartColorPicker1")[0].value, $('#bgopacity')[0].value, 1)
					$("#chartColorPicker1").attr("value", tempColor);
					$("#chartColorPicker1").css("background-color", tempColor);
					
					singleColor = tempColor;// hexToRgba($("#chartColorPicker1").val(), $('#bgopacity')[0].value, 1);
					modifyObject();
				}
				
				// $("#chartColorPicker1").change(function() {
					// //console.log($(this).val());
					// modifyObject();
				// });
			}
			else if(colorOption=="color2") {
				
				var reverseOrder = false;
				

				
				$('#bgopacity').on('input', function (value) {
					if(lastTheme!= undefined) {
						generateTheme(lastTheme);
					}
					else {
					  $("#success-alert").remove();
					  $('<div class="alert alert-info" id="success-alert"><button type="button" class="close" data-dismiss="alert">x</button><strong>Please select a theme first. </strong></div>').appendTo("#messageBar");
					  $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
							$("#success-alert").slideUp(500);
						});						
					}
					
				});

				$("."+colorOption).empty();
				
				$('<label class="lui-checkbox reverseColorCheckboxClass"><input class="lui-checkbox__input" type="checkbox" id="reverseColorCheckbox"/><div class="lui-checkbox__check-wrap"><span class="lui-checkbox__check"></span><span class="lui-checkbox__check-text">Reverse Colors</span></div></label>').appendTo("."+colorOption);
				
				$('<div class="colorThemeTable"><table id="themeTable" class="table table-hover table-condensed"></table>"').appendTo("."+colorOption);

				$('#reverseColorCheckbox').click(function(value) {
					$(this).toggleClass("selected");
					if($( "#reverseColorCheckbox" ).hasClass( "selected" )) {
						reverseOrder = true;
					}
					else {
						reverseOrder = true;
					}
					$("#themeTable tr").remove();
					drawThemeTable();
					//console.log(lastTheme);
					generateTheme(lastTheme);
				});
				
				drawThemeTable();

				function drawThemeTable() {
					$('<tr><th>Theme</th><th>Colors</th></tr>').appendTo("#themeTable");
					$.each(chart_theme, function(index, value) {
					
					var tableRow = "<tr class='tableRow' id='"+index+"'><td>"+value.label+"</td>"; //value.label was previous id
					var colorArray = "";
					
					// console.log(value);
					// console.log(value.value);
					// console.log(value.value.reverse());
					var palette;
					
					if(reverseOrder==true) {
						palette = value.value.reverse();
					}
					else {
						palette = value.value;
					}
					
					
					$.each(palette, function(index, value) {
								colorArray = colorArray + "<div style='float:left;height:20px;width:20px;background-color:"+value+";'></div>"				
					});
					

					tableRow = tableRow + "<td> " + colorArray + "</td></tr>";
					
					$(tableRow).appendTo("#themeTable");					
				});
				}

				
				$("#themeTable").on('click', 'tr', function() {
					
					//$("#themeTable tr").removeClass("success");
					//$("#" + $(this)[0].id).toggleClass("success");
					
					//console.log($("#" + $(this)[0].id));
					//console.log($(this));
					
					lastTheme = $(this);
					generateTheme($(this));
					
				});
				
				function generateTheme(td) {
					//console.log( $(this).find('td:first').text() );
					//var clickedTheme = $(this).find('td:first').text();
					
					var clickedTheme = td.find('td:first').text();

					//console.log(td[0].classList[1]);
					//console.log();
					
					$(".tableRow").removeClass("success");
					//$(td).addClass("success");
					$("#" + lastTheme.context.id).addClass("success");
					
					//console.log(chart_theme);
					var result = chart_theme.filter(function( obj ) {
					  return obj.label == clickedTheme;
					})[0];
					
					
					
					colorExpression = "";
					//console.log(qlikObject.visualization);
					
					if (qlikObject.visualization == 'map') {
						colorExpression = "pick(mod(rowno(),"+result.value.length+") ";
						
						$.each(result.value, function(index, value) {
							//colorExpression += ",'"+value+"'";						
							colorExpression += ","+hexToRgba(value,$("#bgopacity")[0].value,3)+"";
						});
						
						colorExpression += ")";		
						modifyObject();						
					}

					else if(qlikObject.qHyperCubeDef.qDimensions.length==1) {
					
					if (qlikObject.visualization == 'linechart') {
						colorExpression = "pick(mod(1,"+result.value.length+") "; //+1			Removed +1 to pick the first color from the theme
					}
					else {
						colorExpression = "pick(mod(rank(TOTAL column(1))-1,"+result.value.length+")+1 ";  //+1			Removed +1 to pick the first color from the theme
					}
						
						
						$.each(result.value, function(index, value) {
							//colorExpression += ",'"+value+"'";	
							//console.log(value);
							//console.log(hexToRgba(value,$("#bgopacity")[0].value,3));
							colorExpression += ","+hexToRgba(value,$("#bgopacity")[0].value,3)+"";
						});
						
						colorExpression += ")";
						modifyObject();

					}
					else if (qlikObject.qHyperCubeDef.qDimensions.length==2) {
						
						var dim0; 
						var dim1;
						
						// getDimValues()
							// .then(function() {
								// console.log("triggered");
								// setColorExpression2Dim();
							// });
							
						//$.when(getDimValues()).then(setColorExpression2Dim());
						getDimValue(0).then(function(result) {
							//console.log(result);
							dim0 = result;
							getDimValue(1).then(function(result) {
								//console.log(result);
								dim1 = result;
								setColorExpression2Dim();
							})
							//setColorExpression2Dim();
						})
	


						
						function setColorExpression2Dim() {
						
							//sleep(1000);
						
							//console.log("Dim0:" +dim0);
							//console.log(qlikObject.qHyperCubeDef.qDimensions[0]);
							//console.log("Dim1:" +dim1);
							//console.log(qlikObject.qHyperCubeDef.qDimensions[1]);
							
							var exp0 = qlikObject.qHyperCubeDef.qMeasures[0].qDef.qDef;
							//console.log(exp0);
							
							//colorExpression = "pick(mod(rank(sum(aggr("+exp0+","+dim0+"))),"+result.value.length+")+1 ";
							
							//*** CURRENT BEST ***
							//colorExpression = "pick(mod(round(rowno()/sum(total aggr(1,["+dim1+"])), .10)*10,"+result.value.length+") "; //+1			Removed +1 to pick the first color from the theme
							//********************
							
							colorExpression = "pick(mod(sum(total <["+dim1+"]> aggr(Rowno(), ["+dim1+"])),"+result.value.length+")"; //+1			Removed +1 to pick the first color from the theme
							//sum(total <[YYYYMM.autoCalendar.Year]> aggr(Rowno(), [YYYYMM.autoCalendar.Year]))
							
							//pick(mod(rank(sum(aggr(sum([Sales Amount]),[Sales Rep Name]))),10)+1 ,'#64b5f6','#1976d2','#ef6c00','#ffd54f','#455a64','#96a6a6','#dd2c00','#00838f','#00bfa5','#ffa000')
							
							
							$.each(result.value, function(index, value) {
								//colorExpression += ",'"+value+"'";						
								colorExpression += ","+hexToRgba(value,$("#bgopacity")[0].value,3)+"";
							});
							
							colorExpression += ")";
							
							//console.log(colorExpression);
							modifyObject();
							//*********************************************8
						}
						
					}
					
					//modifyObject();
				}
				
				
			}
			else if(colorOption=="color3") {
				
				setGradientPreview(2);
				
				//IF Object is a map, there's no qMeasures. Just a set of layers under layout.
				
				
				colorExpression = "";
				var exp0;
				console.log(qlikObject);

				if (qlikObject.visualization == 'map') {
					if (qlikObject.color.byMeasureDef != undefined) {
						//exp0 = 
						var libraryId = qlikObject.color.byMeasureDef.key;
						
						//console.log(libraryId);
						
						//if(libraryId.length==5) {						
						// app.model.enigmaModel.getMeasure(libraryId)
						// .then(function(model) {
							// model.getLayout()
								// .then(function(layout) {
									// //console.log(layout.qMeasure.qDef);
									// exp0 = layout.qMeasure.qDef;
									
								// })
							// })
							getMeasureValue(0).then(function(result) {
									console.log(result);
									exp0 = result;
								//setColorExpression2Dim();
							})							
						//}
						//else {
							//exp0 = libraryId;
						//}
					}
					else if(qlikObject.layers[0].measureDef != ""){
						exp0 = qlikObject.layers[0].measureDef;
					}
					else {
						
					  $("#success-alert").remove();
					  $('<div class="alert alert-info" id="success-alert"><button type="button" class="close" data-dismiss="alert">x</button><strong>Please set a color measure for the map first. </strong></div>').appendTo("#messageBar");
					  $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
							$("#success-alert").slideUp(500);
						});	
						
					
						exp0 = "NOMEASURESET";
						
					}
				}				

				else {

					
					getMeasureValue(0).then(function(result) {
						exp0 = result;
					})
					

					
				}
				
				//console.log(exp0);
				
				//console.log($("#2colorGradient")[0].checked);
				if($("#3colorGradient")[0].checked==true) {
					$(".gradient2").removeClass("hidden");
				}
				else {
					$(".gradient2").addClass("hidden");
				}
				//.addClass("hidden");
				//$("#3colorGradient").setAttribute("checked", "checked");
				//$("#2colorGradient").removeAttr("checked");
				
				$(".lui-radiobutton__input").change(function() {
					colorExpression = "";
					//console.log($(this).context.checked);
					//console.log($(this).context.value);
					if($(this).context.value==2 && $(this).context.checked==true){
						//$(".gradient2").removeClass("hidden");
						//$("#showGradient").css("background", "linear-gradient(to right,#"+$("#chartGradient1").val()+", #"+$("#chartGradient2").val()+", #"+$("#chartGradient3").val()+")");
						setGradientPreview(2);
					}
					else {
						//$(".gradient2").addClass("hidden");
						//$("#showGradient").css("background", "linear-gradient(to right,#"+$("#chartGradient1").val()+", #"+$("#chartGradient3").val()+")");
						setGradientPreview(3);
					}
				});
				
				function setGradientPreview(type) {
					if(type==2){
						$(".gradient2").removeClass("hidden");
						$("#showGradient").css("background", "linear-gradient(to right,#"+$("#chartGradient1").val()+", #"+$("#chartGradient2").val()+", #"+$("#chartGradient3").val()+")");

					}
					else {
						$(".gradient2").addClass("hidden");
						$("#showGradient").css("background", "linear-gradient(to right,#"+$("#chartGradient1").val()+", #"+$("#chartGradient3").val()+")");
					}
				}
				
				$(".gradientColor").change(function() {
					gradientColorChange();
				});
				
				$('#bgopacity').on('input', function (value) {
					//console.log("triggered");
					gradientColorChange();
				});
				
				function gradientColorChange() {
					colorExpression = "";
					//console.log("Color Changed");
					//console.log($("#3colorGradient")[0].checked);

					
					if (exp0 == "NOMEASURESET") {
						colorExpression = "PLEASE SET COLOR MEASURE FIRST";
					}
					else if($("#3colorGradient")[0].checked===true){
						//$("#showGradient").css("background", "linear-gradient(to right,#"+$("#chartGradient1").val()+", #"+$("#chartGradient2").val()+", #"+$("#chartGradient3").val()+")");
						$("#showGradient").css("background", "linear-gradient(to right,"+hexToRgba($("#chartGradient1").val(),$("#bgopacity")[0].value,1) +", "+hexToRgba($("#chartGradient2").val(),$("#bgopacity")[0].value,1)+", "+hexToRgba($("#chartGradient3").val(),$("#bgopacity")[0].value,1)+")");
						//console.log(hexToRgba($("#chartGradient1").val(),$("#bgopacity")[0].value,1));
						
						colorExpression += "ColorMix2((((1+Sign(2*(";
						colorExpression += exp0;
						colorExpression += "-RangeMin (top(total ";
						colorExpression += exp0;
						colorExpression += ",1,NoOfRows(total))))/(RangeMax (top(total ";
						colorExpression += exp0;
						colorExpression += ",1,NoOfRows(total)))-RangeMin (top(total ";
						colorExpression += exp0;
						colorExpression += ",1,NoOfRows(total))))-1)*Sqrt(Fabs((2*(";
						colorExpression += exp0;
						colorExpression += "-RangeMin (top(total ";
						colorExpression += exp0;
						colorExpression += ",1,NoOfRows(total))))/(RangeMax (top(total ";
						colorExpression += exp0;
						colorExpression += ",1,NoOfRows(total)))-RangeMin (top(total ";
						colorExpression += exp0;
						colorExpression += ",1,NoOfRows(total))))-1))))/2)-.5)*2";
						
						sortingExpression = colorExpression.substring(10);
						console.log(sortingExpression);
						
						colorExpression += "," + hexToRgba($("#chartGradient3").val(),$("#bgopacity")[0].value,3);
						colorExpression += "," + hexToRgba($("#chartGradient1").val(),$("#bgopacity")[0].value,3);
						colorExpression += "," + hexToRgba($("#chartGradient2").val(),$("#bgopacity")[0].value,3);
						colorExpression += ")";
						
						//console.log(colorExpression);
						
					}
					else {
						$("#showGradient").css("background", "linear-gradient(to right,"+hexToRgba($("#chartGradient1").val(),$("#bgopacity")[0].value,1)+", "+hexToRgba($("#chartGradient3").val(),$("#bgopacity")[0].value,1)+")");
						
						colorExpression += "ColorMix1((1+Sign(2*(";
						colorExpression += exp0;
						colorExpression += "-RangeMin (top(total ";
						colorExpression += exp0;
						colorExpression += ",1,NoOfRows(total))))/(RangeMax (top(total ";
						colorExpression += exp0;
						colorExpression += ",1,NoOfRows(total)))-RangeMin (top(total ";
						colorExpression += exp0;
						colorExpression += ",1,NoOfRows(total))))-1)*Sqrt(Fabs((2*(";
						colorExpression += exp0;
						colorExpression += "-RangeMin (top(total ";
						colorExpression += exp0;
						colorExpression += ",1,NoOfRows(total))))/(RangeMax (top(total ";
						colorExpression += exp0;
						colorExpression += ",1,NoOfRows(total)))-RangeMin (top(total ";
						colorExpression += exp0;
						colorExpression += ",1,NoOfRows(total))))-1))))/2";
						sortingExpression = colorExpression.substring(10);
						colorExpression += "," + hexToRgba($("#chartGradient3").val(),$("#bgopacity")[0].value,3);
						colorExpression += "," + hexToRgba($("#chartGradient1").val(),$("#bgopacity")[0].value,3);
						//colorExpression += "," + hexToRgb($("#chartGradient2").val());
						colorExpression += ")";
				
						
						//console.log(colorExpression);
					}
					
					modifyObject();
					
					//background: linear-gradient(to right,red, yellow, green);
				}
				
				
			}					
			else if(colorOption=="color4") {
				var reverseOrder = false;
				$("."+colorOption).empty();
				
				$('<label class="lui-checkbox reverseColorCheckboxClass"><input class="lui-checkbox__input" type="checkbox" id="reverseColorCheckboxGradient"/><div class="lui-checkbox__check-wrap"><span class="lui-checkbox__check"></span><span class="lui-checkbox__check-text">Reverse Colors</span></div></label>').appendTo("."+colorOption);
				
				$('<div class="colorThemeTable"><table id="gradientTable" class="table table-hover table-condensed"></table>"').appendTo("."+colorOption);
				
				$('#reverseColorCheckboxGradient').click(function(value) {
					$(this).toggleClass("selected");
					if($( "#reverseColorCheckboxGradient" ).hasClass( "selected" )) {
						reverseOrder = true;
					}
					else {
						reverseOrder = true;
					}
					$("#gradientTable tr").remove();
					drawGradientTable();
					//console.log(lastGradientTheme.context.id);
					//$(".tableRow").removeClass("success");
					//drawGradientTable(function() {generateGradientTheme(lastGradientTheme);});
					//$(".tableRow").addClass("success");
					
					//console.log($("#"+lastGradientTheme));
					
					//$("#" + lastGradientTheme.context.id).addClass("success");
					
					generateGradientTheme(lastGradientTheme);
				});
				
				drawGradientTable();
				
				function drawGradientTable() {

					$('<tr><th>Gradient</th><th>Colors</th></tr>').appendTo("#gradientTable");
					
					$.each(gradient_theme, function(index, value) {
						
						var tableRow = "<tr class='tableRow' id='gradient"+index+"'><td>"+value.label+"</td>"; //changed from value.label since can't address spaces in element IDs
						var colorArray = [];
						
						var palette;
						
						if(reverseOrder==true) {
							palette = value.value.reverse();
						}
						else {
							palette = value.value;
						}
						
						$.each(palette, function(index, value) {
									//colorArray = colorArray + "<div style='float:left;height:20px;width:20px;background-color:"+value+";'></div>"		
									colorArray[index] = value;
						});
						
						if(colorArray.length==3) {
							var gradientVariable = "<div style='float:left;height:20px;width:100%;background:linear-gradient(to right,"+colorArray[2]+", "+colorArray[1]+", "+colorArray[0]+");'></div>";
						}
						else {
							var gradientVariable = "<div style='float:left;height:20px;width:100%;background:linear-gradient(to right,"+colorArray[1]+", "+colorArray[0]+");'></div>";
						}
						tableRow = tableRow + "<td style='width:60%;'> " + gradientVariable + "</td></tr>";
						
						$(tableRow).appendTo("#gradientTable");					
					});
				}
				
				
				$("#gradientTable").on('click', 'tr', function() {
					//$(".tableRow").removeClass("success");
					lastGradientTheme = $(this);
					generateGradientTheme($(this));
				});
				
					function generateGradientTheme(td) {
						//console.log( $(this).find('td:first').text() );
						var clickedTheme = td.find('td:first').text();

						$(".tableRow").removeClass("success");
						
						if($("#" + lastGradientTheme.context.id).hasClass('success')) {
							//console.log("has success already");
						}
						else {
							$("#" + lastGradientTheme.context.id).addClass('success');
							//console.log("success set");
						}
						//console.log(lastGradientTheme.context.id);
						//$("#" + lastGradientTheme.context.id).addClass("success");
						
						
						var result = gradient_theme.filter(function( obj ) {
						  return obj.label == clickedTheme;
						})[0];
						
						oldResult = result;
						
						//Pull out the expression to use for gradient
						colorExpression = "";
						var exp0;
						//console.log(qlikObject);

						if (qlikObject.visualization == 'map') {
							if (qlikObject.color.byMeasureDef != undefined) {
								//exp0 = 
								var libraryId = qlikObject.color.byMeasureDef.key;
								
								//console.log(libraryId);
								
								//if(libraryId.length==5) {						

									
									getMeasureValue(0).then(function(result) {
										exp0 = result;
										oldGradient = exp0;
										setGradientColorExpression(oldResult, exp0);
									})	
									
									
							}
							else if(qlikObject.layers[0].measureDef != ""){
								exp0 = qlikObject.layers[0].measureDef;
								oldGradient = exp0;
								setGradientColorExpression(oldResult, exp0);
							}
							else {
								exp0 = "NOMEASURESET";
							
							  $("#success-alert").remove();
							  $('<div class="alert alert-info" id="success-alert"><button type="button" class="close" data-dismiss="alert">x</button><strong>Please set a color measure for the map first. </strong></div>').appendTo("#messageBar");
							  $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
									$("#success-alert").slideUp(500);
								});	
								
							}
							oldGradient = exp0;
							setGradientColorExpression(oldResult, exp0);
						}				

						else {

									
							getMeasureValue(0).then(function(result) {
								exp0 = result;
								oldGradient = exp0;
								setGradientColorExpression(oldResult, exp0);
							})									

						}
					}
					
					//console.log(exp0);
					$('#bgopacity').on('input', function (value) {
						colorExpression = "";
						setGradientColorExpression(oldResult, oldGradient);
					});
					//Check if user picked 2 or 3 color gradient and build color expression
					
					//console.log(result);
					function setGradientColorExpression(result, exp0) {
					//console.log("set color function triggered");
					//console.log(result);
					colorExpression = "";
					
						if(result.value.length == 2) //2 color gradient
						{
							colorExpression += "ColorMix1((1+Sign(2*(";
							colorExpression += exp0;
							colorExpression += "-RangeMin (top(total ";
							colorExpression += exp0;
							colorExpression += ",1,NoOfRows(total))))/(RangeMax (top(total ";
							colorExpression += exp0;
							colorExpression += ",1,NoOfRows(total)))-RangeMin (top(total ";
							colorExpression += exp0;
							colorExpression += ",1,NoOfRows(total))))-1)*Sqrt(Fabs((2*(";
							colorExpression += exp0;
							colorExpression += "-RangeMin (top(total ";
							colorExpression += exp0;
							colorExpression += ",1,NoOfRows(total))))/(RangeMax (top(total ";
							colorExpression += exp0;
							colorExpression += ",1,NoOfRows(total)))-RangeMin (top(total ";
							colorExpression += exp0;
							colorExpression += ",1,NoOfRows(total))))-1))))/2";
							sortingExpression = colorExpression.substring(10);
							colorExpression += "," + hexToRgba(result.value[0],$("#bgopacity")[0].value,3);
							colorExpression += "," + hexToRgba(result.value[1],$("#bgopacity")[0].value,3);
							//colorExpression += "," + hexToRgb($("#chartGradient2").val());
							colorExpression += ")";
						}
						else if (result.value.length ==3) //3 color gradient
						{
							colorExpression += "ColorMix2((((1+Sign(2*(";
							colorExpression += exp0;
							colorExpression += "-RangeMin (top(total ";
							colorExpression += exp0;
							colorExpression += ",1,NoOfRows(total))))/(RangeMax (top(total ";
							colorExpression += exp0;
							colorExpression += ",1,NoOfRows(total)))-RangeMin (top(total ";
							colorExpression += exp0;
							colorExpression += ",1,NoOfRows(total))))-1)*Sqrt(Fabs((2*(";
							colorExpression += exp0;
							colorExpression += "-RangeMin (top(total ";
							colorExpression += exp0;
							colorExpression += ",1,NoOfRows(total))))/(RangeMax (top(total ";
							colorExpression += exp0;
							colorExpression += ",1,NoOfRows(total)))-RangeMin (top(total ";
							colorExpression += exp0;
							colorExpression += ",1,NoOfRows(total))))-1))))/2)-.5)*2";
							sortingExpression = colorExpression.substring(10);
							colorExpression += "," + hexToRgba(result.value[2],$("#bgopacity")[0].value,3);
							colorExpression += "," + hexToRgba(result.value[0],$("#bgopacity")[0].value,3);
							colorExpression += "," + hexToRgba(result.value[1],$("#bgopacity")[0].value,3);
							colorExpression += ")";
						}
						
						//console.log(colorExpression);
						
						modifyObject();
					}
				
			}	
		}
		
		
		$(".buttongroupResize").find(":button").click(function() {
			$(".buttongroupResize").find(":button").removeClass("lui-button--success");
		});
		
		$("#x-small").click(function() {
			$(this).toggleClass("lui-button--success");
			$( "#vizArea" ).removeClass( "size-xsmall size-small size-medium size-large size-xlarge" ).addClass( "size-xsmall" );
			qlik.resize();
		});
		$("#small").click(function() {
			$(this).toggleClass("lui-button--success");
			$( "#vizArea" ).removeClass( "size-xsmall size-small size-medium size-large size-xlarge" ).addClass( "size-small" );
			qlik.resize();
		});
		$("#medium").click(function() {
			$(this).toggleClass("lui-button--success");
			$( "#vizArea" ).removeClass( "size-xsmall size-small size-medium size-large size-xlarge" ).addClass( "size-medium" );
			qlik.resize();
		});
		$("#large").click(function() {
			$(this).toggleClass("lui-button--success");
			$( "#vizArea" ).removeClass( "size-xsmall size-small size-medium size-large size-xlarge" ).addClass( "size-large" );
			qlik.resize();
		});
		$("#x-large").click(function() {
			$(this).toggleClass("lui-button--success");
			$( "#vizArea" ).removeClass( "size-xsmall size-small size-medium size-large size-xlarge" ).addClass( "size-xlarge" );
			qlik.resize();
		});
		
		$("#saveButton").click(function() {
			//console.log(currObject);
				
				//modifyObject()
				//.then(function() {console.log("All Done!");}, function(error) {console.log(error);})
			app.doSave();
			//console.log("App Saved");
		  $("#success-alert").remove();
		  $('<div class="alert alert-success" id="success-alert"><button type="button" class="close" data-dismiss="alert">x</button><strong>Success! </strong>Application has been saved.</div>').appendTo("#messageBar");
		  $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
				$("#success-alert").slideUp(500);
			});
		  
		});
		
		$("#helpButton").click(function() {
			
			if($("#helpBox").length == 0) {
				//console.log("HELP");
				$(".container").toggleClass('helpFade');
				
				var myHelpHTML = "";
				
				myHelpHTML = '<div id="helpBox" class="lui-overlay lui-popover-container" style="left: 270.68px; top: 221px; position: absolute;" role="dialog"><div></div>';
				myHelpHTML = myHelpHTML + '<div class="lui-popover  lui-popover--inverse" style="width: 400px;"><div class="lui-popover__header"><div class="lui-popover__title">Qlik Color Styler</div></div><div class="lui-popover__body">';
				myHelpHTML = myHelpHTML + "<p><b>Welcome to the Qlik Color Styler</b></p><p>This is an extension that allows you to manipulate color schemes for Qlik Sense visualizations.<br></p><p><b>How to use it</b><br><br>1. Pick an app from the dropdown<br>2. Select a visualization to work on<br>3. Pick a color option from the left hand dropdown<br>4. Set your color, theme or gradient<br>5. Click 'Save Changes' to persist changes to app</p><p>Johannes Sunden - jsn@qlik.com<br><a href='https://github.com/johsund/colorstyler'>https://github.com/johsund/colorstyler</a></p>"
				myHelpHTML = myHelpHTML + '</div><div class="lui-popover__footer"><button class="lui-button  lui-button--inverse  close-button" id="helpCloseButton">OK</button></div></div></div>';
				
				$(myHelpHTML).appendTo("body");
				
				$('#helpCloseButton').click(function() {
						$("#helpBox").remove();
						$(".container").toggleClass('helpFade');
					} );
			}
					
		});
		

		
		$('#helpButton').hover(function() {
			$(this).css('cursor','pointer');
		});
	
	

		

function modifyObject() {
	
	var myApp = app;
	//console.log("modifyObject triggered");
	
	myApp.getObject(currObject)
		.then(function(handle) {
			var myAppHandle = handle;
			//console.log(handle); 
			//console.log(handle.getProperties());
			handle.getProperties()
				.then(function(handle) {
					//console.log("Got properties");
					modifyProperties(handle)
						.then(function(handle) {
						//console.log(handle);
						myAppHandle.setProperties(handle)
							.then(function(){
								//myApp.doSave()
								//console.log("Properties set");
							})
						})
				})
		})
	
};



function modifyProperties(handle) {

//console.log("modifying properties");
	
	return new Promise(function(resolve, reject) {
			
					//Apply changes to object properties
					handle.color.auto = false;
					
					if(colorOption=="color1") {
						handle.color.singleColor = singleColor;
						handle.color.mode = "primary";
					}
					else if(colorOption=="color2") {

						handle.color.colorExpression = colorExpression;
						handle.color.mode = "byExpression";
						handle.color.expressionIsColor = true;
						//console.log(handle.color.expressionIsColor);
						
						if(handle.visualization=='map') {
							handle.color.colorExpression = colorExpression;
							if(handle.layers[0].qHyperCubeDef.qDimensions[0].qAttributeExpressions.length===0) {
								 var newqAttributeExpression = {
									 id:"colorByExpression",
									 qExpression:colorExpression
								 };
								 handle.layers[0].qHyperCubeDef.qDimensions[0].qAttributeExpressions.push(newqAttributeExpression);
							}
							else {
								handle.layers[0].qHyperCubeDef.qDimensions[0].qAttributeExpressions[0].id = "colorByExpression";
								handle.layers[0].qHyperCubeDef.qDimensions[0].qAttributeExpressions[0].qExpression = colorExpression;
							}								
						}
						else if(handle.qHyperCubeDef.qMeasures[0].qAttributeExpressions.length===0) {
							 var newqAttributeExpression = {
								 id:"colorByExpression",
								 qExpression:colorExpression
							 };
							 handle.qHyperCubeDef.qMeasures[0].qAttributeExpressions.push(newqAttributeExpression);
						}
						else {
							handle.qHyperCubeDef.qMeasures[0].qAttributeExpressions[0].qExpression = colorExpression;
						}
						
					}
					else if(colorOption=="color3") {

						console.log(handle);
						handle.color.mode = "byExpression";
						handle.color.expressionIsColor = true;
						handle.color.colorExpression = colorExpression;

						
						if(handle.visualization=='map') {
							
							handle.color.colorExpression = colorExpression;
							if(handle.layers[0].qHyperCubeDef.qDimensions[0].qAttributeExpressions.length===0) {
								 var newqAttributeExpression = {
									 id:"colorByExpression",
									 qExpression:colorExpression
								 };
								 handle.layers[0].qHyperCubeDef.qDimensions[0].qAttributeExpressions.push(newqAttributeExpression);
							}
							else {
								handle.layers[0].qHyperCubeDef.qDimensions[0].qAttributeExpressions[0].id = "colorByExpression";
								handle.layers[0].qHyperCubeDef.qDimensions[0].qAttributeExpressions[0].qExpression = colorExpression;
							}	

						}
						else if(handle.qHyperCubeDef.qMeasures[0].qAttributeExpressions.length===0) {
							 var newqAttributeExpression = {
								 id:"colorByExpression",
								 qExpression:colorExpression
							 };
							 handle.qHyperCubeDef.qMeasures[0].qAttributeExpressions.push(newqAttributeExpression);
						}
						else {
							handle.qHyperCubeDef.qMeasures[0].qAttributeExpressions[0].qExpression = colorExpression;
						}			
						
						if(handle.visualization=='barchart') {
							handle.qHyperCubeDef.qDimensions[0].qDef.autoSort = false;
							handle.qHyperCubeDef.qDimensions[0].qDef.qSortCriterias[0].qSortByExpression = -1;
							if(handle.qHyperCubeDef.qDimensions[0].qDef.qSortCriterias[0].qExpression.length==0) {
								var newSortExpression = {
									qv: sortingExpression
								}
								handle.qHyperCubeDef.qDimensions[0].qDef.qSortCriterias[0].qExpression.push(newSortExpression);								
							}
							else {
								handle.qHyperCubeDef.qDimensions[0].qDef.qSortCriterias[0].qExpression.qv = sortingExpression;
							}

						}
						//console.log(handle);
						
					}					
					else if(colorOption=="color4") {

						
						handle.color.mode = "byExpression";
						handle.color.expressionIsColor = true;
						handle.color.colorExpression = colorExpression;

						
						if(handle.visualization=='map') {

							console.log(handle);
							handle.color.colorExpression = colorExpression;
							if(handle.layers[0].qHyperCubeDef.qDimensions[0].qAttributeExpressions.length===0) {
								 var newqAttributeExpression = {
									 id:"colorByExpression",
									 qExpression:colorExpression
								 };
								 handle.layers[0].qHyperCubeDef.qDimensions[0].qAttributeExpressions.push(newqAttributeExpression);
							}
							else {
								handle.layers[0].qHyperCubeDef.qDimensions[0].qAttributeExpressions[0].id = "colorByExpression";
								handle.layers[0].qHyperCubeDef.qDimensions[0].qAttributeExpressions[0].qExpression = colorExpression;
							}							

						}
						else if(handle.qHyperCubeDef.qMeasures[0].qAttributeExpressions.length===0) {
							 var newqAttributeExpression = {
								 id:"colorByExpression",
								 qExpression:colorExpression
							 };
							 handle.qHyperCubeDef.qMeasures[0].qAttributeExpressions.push(newqAttributeExpression);
						}
						else {
							handle.qHyperCubeDef.qMeasures[0].qAttributeExpressions[0].qExpression = colorExpression;
						}			
						
						if(handle.visualization=='barchart') {
							handle.qHyperCubeDef.qDimensions[0].qDef.autoSort = false;
							handle.qHyperCubeDef.qDimensions[0].qDef.qSortCriterias[0].qSortByExpression = -1;
							if(handle.qHyperCubeDef.qDimensions[0].qDef.qSortCriterias[0].qExpression.length==0) {
								var newSortExpression = {
									qv: sortingExpression
								}
								handle.qHyperCubeDef.qDimensions[0].qDef.qSortCriterias[0].qExpression.push(newSortExpression);								
							}
							else {
								handle.qHyperCubeDef.qDimensions[0].qDef.qSortCriterias[0].qExpression.qv = sortingExpression;
							}

						}
						
						//console.log(handle);
					}					

				return resolve(handle)

	})	
};

function getDimValue(dimNumber) {
	
	return new Promise(function(resolve, reject) {

		var dimResolve;
		
		if(qlikObject.qHyperCubeDef.qDimensions[dimNumber].qLibraryId == undefined) {
			
			dimResolve = qlikObject.qHyperCubeDef.qDimensions[dimNumber].qDef.qFieldDefs[0];
			return resolve(dimResolve);
		}
		else {
			app.model.enigmaModel.getDimension(qlikObject.qHyperCubeDef.qDimensions[dimNumber].qLibraryId)
			.then(function(model) {
				model.getLayout()
					.then(function(layout) {
						dimResolve = layout.qDim.qFieldDefs[0];
						
					})
					.then(function() {
						return resolve(dimResolve);
					})
				})
		}
	});
}

function getMeasureValue(measureNumber) {
	
	//console.log("fired");
	return new Promise(function(resolve, reject) {

		var measureResolve;
		
		if (qlikObject.visualization =='map') {
			app.model.enigmaModel.getMeasure(qlikObject.color.byMeasureDef.key)
			.then(function(model) {
				//console.log(model);
				if(model!= null) {
					model.getLayout()
						.then(function(layout) {
							measureResolve = layout.qMeasure.qDef;
							
						})
						.then(function() {
							return resolve(measureResolve);
						})
				}
				else {
					measureResolve = qlikObject.color.byMeasureDef.key;
					return resolve(measureResolve);
				}
				})
				
		}
		else if(qlikObject.qHyperCubeDef.qMeasures[measureNumber].qLibraryId == undefined) {
			
			measureResolve = qlikObject.qHyperCubeDef.qMeasures[measureNumber].qDef.qDef;
			return resolve(measureResolve);
		}
		else {
			app.model.enigmaModel.getMeasure(qlikObject.qHyperCubeDef.qMeasures[measureNumber].qLibraryId)
			.then(function(model) {
				model.getLayout()
					.then(function(layout) {
						measureResolve = layout.qMeasure.qDef;
						
					})
					.then(function() {
						return resolve(measureResolve);
					})
				})
		}
	});
}


function hexToRgb(hex) {
	if(hex.length==7) {
		hex = hex.substring(1,7);
		//console.log(hex);
	}
	//else {}
	
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return "rgba(" + r + "," + g + "," + b +",1)";
}

} );

function hexToRgba(hex, alpha, sender) {
	
	if(sender==1) {
		if(hex.length==7) {
			hex = hex.substring(1,7);
			//console.log(hex);
		}
		if(hex.substring(0,3)=='rgb') {
			
			hex = hex.replace(/[^,]+(?=\))/, alpha/255);
			return hex;
		} 
		
		else if(hex.substring(0,4) =='argb') {
			return hex;
		}
		else {
		
		var bigint = parseInt(hex, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;

		return "rgba(" + r + "," + g + "," + b +"," +alpha/255+")";
		}
	}
	else if(sender==3) {
		if(hex.length==7) {
			hex = hex.substring(1,7);
			//console.log(hex);
		}
		if(hex.substring(0,3)=='rgb') {
			
			//console.log(hex);
			hex = hex.replace(/[^,]+(?=\))/, alpha/100);
			return hex;
		} 
		
		else if(hex.substring(0,4) =='argb') {
			return hex;
		}
		else {
		
		var bigint = parseInt(hex, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;

		return "argb(" + alpha + "," + r + "," + g +"," + b +")";
		}
	}
}



