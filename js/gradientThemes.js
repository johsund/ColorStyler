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
	}
];

var gradient_theme = themes.map(function(d) {
	return {
		value: d.palette,
		label: d.name
	}
});