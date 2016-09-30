var themes = [
	{
		id: 1,
		name:"Gradient #1",
		palette:["#64b5f6","#455a64","#ffa000"]
	},
	{
		id: 2,
		name:"Gradient #2",
		palette:['#a6cee3','#e31a1c','#6a3d9a']
	},
	{
		id: 3,
		name:"Gradient #3",
		palette:['#8dd3c7','#fdb462','#bc80bd']
	},	
	{
		id: 4,
		name:"Gradient #4",
		palette:['#e41a1c','#ff7f00','#999999']
	},
	{
		id: 5,
		name:"Gradient #5",
		palette:['#fbb4ae','#decbe4','#f2f2f2']
	},
	{
		id: 6,
		name:"Gradient #6",
		palette:['#dcedc8','#42b3d5','#1a237e']
	},
	{
		id: 7,
		name:"Gradient #7",
		palette:['#ffecb3','#e85285','#6a1b9a']
	},
	{
		id: 8,
		name:"Gradient #8",
		palette:['#ffecb3','#6a1b9a']
	},
	{
		id: 9,
		name:"Multihue #1",
		palette:['#f7fcfd','#66c2a4','#00441b']
	},
	{
		id: 10,
		name:"Multihue #2",
		palette:['#f7fcfd','#8c96c6','#4d004b']
	},
	{
		id: 11,
		name:"Multihue #3",
		palette:['#f7fcf0','#7bccc4','#084081']
	},	
	{
		id: 12,
		name:"Multihue #4",
		palette:['#fff7ec','#fc8d59','#7f0000']
	},
	{
		id: 13,
		name:"Multihue #5",
		palette:['#fff7fb','#74a9cf','#023858']
	},
	{
		id: 14,
		name:"Multihue #6",
		palette:['#f7f4f9','#df65b0','#67001f']
	},
	{
		id: 15,
		name:"Multihue #7",
		palette:['#fff7f3','#f768a1','#49006a']
	},
	{
		id: 16,
		name:"Multihue #8",
		palette:['#ffffe5','#78c679','#004529']
	},	
	{
		id: 17,
		name:"Multihue #9",
		palette:['#ffffd9','#41b6c4','#081d58']
	},
	{
		id: 18,
		name:"Multihue #10",
		palette:['#ffffe5','#fe9929','#662506']
	},
	{
		id: 19,
		name:"Multihue #11",
		palette:['#ffffcc','#fd8d3c','#800026']
	},
	{
		id: 20,
		name:"Diverging #1",
		palette:['#8c510a','#f5f5f5','#01665e']
	},
	{
		id: 21,
		name:"Diverging #2",
		palette:['#c51b7d','#f7f7f7','#4d9221']
	},
	{
		id: 22,
		name:"Diverging #3",
		palette:['#762a83','#f7f7f7','#1b7837']
	},	
	{
		id: 23,
		name:"Diverging #4",
		palette:['#b35806','#f7f7f7','#542788']
	},
	{
		id: 24,
		name:"Diverging #5",
		palette:['#b2182b','#f7f7f7','#2166ac']
	},		
	{
		id: 25,
		name:"Diverging #6",
		palette:['#b2182b','#ffffff','#4d4d4d']
	},
	{
		id: 26,
		name:"Diverging #7",
		palette:['#d73027','#ffffbf','#4575b4']
	},	
	{
		id: 27,
		name:"Diverging #8",
		palette:['#d73027','#ffffbf','#1a9850']
	},
	{
		id: 28,
		name:"Diverging #9",
		palette:['#d53e4f','#ffffbf','#3288bd']
	}		
];

var gradient_theme = themes.map(function(d) {
	return {
		value: d.palette,
		label: d.name
	}
});