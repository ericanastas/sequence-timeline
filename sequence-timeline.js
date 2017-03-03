var width = 960,
    height = 500;

var randomX = d3.random.normal(width / 2, 80),
    randomY = d3.random.normal(height / 2, 80);

var data = d3.range(2000).map(function() {
  return [
    randomX(),
    randomY()
  ];
});


var zoomer = d3.behavior.zoom()
  .on("zoom", zoom)

var svg = d3.select("body")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .call(zoomer)
        .on("wheel.zoom",pan)
        .append("g");

svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("transform", function(d) { return "translate(" + d + ")"; });



function zoom() {
    console.log(d3.select(this))
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function pan() {
    current_translate = d3.transform(svg.attr("transform")).translate;
    dx = d3.event.wheelDeltaX + current_translate[0];
    dy = d3.event.wheelDeltaY + current_translate[1];
    svg.attr("transform", "translate(" + [dx,dy] + ")");
    d3.event.stopPropagation();
}