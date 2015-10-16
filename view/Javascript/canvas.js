/**
 * Created by kadyan on 15-09-29.
 */
function canvas(serverSpecificData) {
    var cpu_utilization=[Math.round(serverSpecificData.cpu_Util)]/100;
    //var cpu_utilization = 45 / 100;
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var radius = 82.5;
    var startAngle = 0.8 * Math.PI;
    var endAngle = 2.2 * Math.PI;
    var counterClockwise = false;
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = 35;
// line color
    context.strokeStyle = 'grey';
    context.stroke();
//method displaying the value of the cpu_utilization
    var can = document.getElementById('myCanvas');
    var ctx = can.getContext('2d');
    var x1 = canvas.width / 2;
    var y1 = canvas.height / 2;
    var rad = 82.5;
    var startA = 0.8 * Math.PI;
    var endA = 0.8 * Math.PI + [2.2 * Math.PI - 0.8 * Math.PI] * cpu_utilization;
    var counterClockwise = false;
    ctx.beginPath();
    ctx.arc(x1, y1, rad, startA, endA, counterClockwise);
    ctx.lineWidth = 35;
// line color
    ctx.strokeStyle = 'white';
    ctx.stroke();
}