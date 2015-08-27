function setupVehicles() {
  String.prototype.ucFirst = function() { return this.charAt(0).toUpperCase() + this.slice(1); }

  for (var item in vehicles) {
    var vehicle = vehicles[item];
    switch (vehicle.category) {
      case "drone":
        $("#drones").append("<tr id='" + item + "'><td class='buy" + item + " button'><strong>+</strong></td><td class='" + item + "'>" + vehicle["name"] + "</td><td class='type'>" + vehicle["type"].ucFirst() + "</td><td class='handling'>" + vehicle["handling"] + "</td><td class='speed'>" + vehicle["speed"] + "</td><td class='accel'>" + vehicle["accel"] + "</td><td class='body'>" + vehicle["body"] + "</td><td class='armor'>" + vehicle["armor"] + "</td><td class='pilot'>" + vehicle["pilot"] + "</td><td class='sensor'>" + vehicle["sensor"] + "</td><td class='seats'>" + vehicle["seats"] + "</td><td class='avail'>" + vehicle["avail"] + vehicle["restrict"] + "</td><td class='price'>" + vehicle["cost"] + "&yen;</td></tr>");
        break;
      default:
        var row = "<tr id='" + item + "'><td class='buy" + item + " button'><strong>+</strong></td><td class='" + item + "'>" + vehicle["name"] + "</td><td class='type'>" + vehicle["type"].ucFirst() + "</td><td class='handling'>" + vehicle["handling"] + (vehicle["handlingoffroad"] > 0 ? ' / ' + vehicle["handlingoffroad"] : '') + "</td><td class='speed'>" + vehicle["speed"] + (vehicle["speedoffroad"] > 0 ? ' / ' + vehicle["speedoffroad"] : '') +"</td><td class='accel'>" + vehicle["accel"] + "</td><td class='body'>" + vehicle["body"] + "</td><td class='armor'>" + vehicle["armor"] + "</td><td class='pilot'>" + vehicle["pilot"] + "</td><td class='sensor'>" + vehicle["sensor"] + "</td><td class='seats'>" + vehicle["seats"] + "</td><td class='avail'>" + vehicle["avail"] + vehicle["restrict"] + "</td><td class='price'>" + vehicle["cost"] + "&yen;</td></tr>";
        //console.log('.vehicles.' + vehicle.category + ' ~ .vehicles = ' + $('.vehicles.' + vehicle.category + ' ~ .vehicles').attr('class') + ' ' + vehicle["name"]);
        if ($('.vehicles.' + vehicle.category + ' ~ .vehicles').length) {
          $('.vehicles.' + vehicle.category + ' ~ .vehicles').first().before(row);
        }
        else {
          $('#craft').append(row);
        }
        break;
    }
    if (vehicle["avail"] > maxAvail) {
      $(".buy" + item).addClass("deact").empty().append("-");
    }
  }
}
