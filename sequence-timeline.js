
//Defines the margin's an extents
//https://bl.ocks.org/mbostock/3019563


var margin = {top: 20, right: 20, bottom: 20, left: 20},
    padding = {top: 60, right: 60, bottom: 60, left: 60},
    outerWidth = 960,
    outerHeight = 500,
    innerWidth = outerWidth - margin.left - margin.right,
    innerHeight = outerHeight - margin.top - margin.bottom,
    width = innerWidth - padding.left - padding.right,
    height = innerHeight - padding.top - padding.bottom;





//Range bands
//https://github.com/d3/d3-3.x-api-reference/blob/master/Ordinal-Scales.md#ordinal_rangeBands






//Creates the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




function render(data){
    
    
    svg.append("rect")
    .attr("class", "outer")
    .attr("width", innerWidth)
    .attr("fill", "none")
    .attr("stroke","blue")
    .attr("height", innerHeight);
    
    //Scales
    var x = d3.scale.identity().domain([0, width]);
    
    
    //Axes
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
   
    
    var g = svg.append("g").attr("transform", "translate(" + padding.left + "," + padding.top + ")");
    

    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    

}



d3.json("data.json",render);