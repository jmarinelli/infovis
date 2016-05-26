var pie = function() {

  var width = 960;
  var height = 500;
  var radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range(["#FF7900", "#002C77", "#509e3c"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var labelArc = d3.svg.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.quantity; });

  var svgPie = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.json("assets/js/data.json", function(error, raw_data) {
    var data = [];
    var aux = {};

    // Parse the date strings into javascript dates
    raw_data.forEach(function(d) {
      if (d.creation_date.split("-")[0] == "2016") {
        d.product_invoice_collections.forEach(function (pi) {
          if (!aux[pi.product]) {
            aux[pi.product] = {
              product: pi.product,
              quantity: 0
            };
          }
          aux[pi.product].quantity++;
        });
      }
    });

    for (var property in aux) {
      if (aux.hasOwnProperty(property)) {
        data.push(aux[property]);
      }
    }

    debugger;

    var g = svgPie.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.product); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.data.product; });
  });
};
