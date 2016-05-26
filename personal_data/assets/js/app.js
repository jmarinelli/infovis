var json = $.getJSON("assets/js/data.json");
var installments = 0, no_installments = 0;
json.responseJSON.forEach(function(d) {
  if (d.installments){
    installments++;
  } else {
    no_installments++;
  }
});
$("#installments").html(installments);
$("#no-installments").html(no_installments);
histogram();
pie();
