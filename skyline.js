function drawSkyline(backdrop) {
  var width = backdrop.width = Math.ceil(backdrop.clientWidth / 2);
  var height = backdrop.height = Math.ceil(backdrop.clientHeight / 2);
  var pen = backdrop.getContext('2d');
  var horizon = Math.floor(height * .72);
  var sky = pen.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, '#0d0e24');
  sky.addColorStop(.55, '#312047');
  sky.addColorStop(.88, '#754466');
  sky.addColorStop(1, '#b36577');
  pen.fillStyle = sky;
  pen.fillRect(0, 0, width, height);
  var seed = 71;
  function noise() {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  }
  for (var star = 0; star < width / 3; star++) {
    pen.fillStyle = star % 5 ? '#ac92b5' : '#f5dfe3';
    pen.fillRect(Math.floor(noise()*width), Math.floor(noise()*horizon), 1, 1);
  }
  var radius = Math.min(width * .09, height * .14);
  var sunX = width * .82, sunY = horizon - radius * 1.08;
  var sunset = pen.createLinearGradient(0, sunY - radius, 0, sunY + radius);
  sunset.addColorStop(0, '#ffcf96');
  sunset.addColorStop(1, '#f17ca2');
  pen.fillStyle = sunset;
  for (var line = -Math.floor(radius); line <= radius; line++) {
    if (line > 0 && line % 6 < 2) continue;
    var chord = Math.sqrt(radius * radius - line * line);
    pen.fillRect(Math.round(sunX - chord), Math.round(sunY + line), Math.ceil(chord*2), 1);
  }
  for (var layer = 0; layer < 2; layer++) {
    for (var x = 0; x < width;) {
      var building = Math.floor(5 + noise() * 16);
      var roof = horizon - Math.floor((.02 + noise() * .13) * height / (layer + 1));
      pen.fillStyle = layer ? '#261d37' : '#503654';
      pen.fillRect(x, roof, building, horizon - roof);
      pen.fillStyle = layer ? '#ae738b' : '#91677e';
      for (var floor = roof + 3; floor < horizon - 2; floor += 4)
        for (var windowX = x + 2; windowX < x + building - 1; windowX += 4)
          if (noise() > .75) pen.fillRect(windowX, floor, 1, 1);
      x += building;
    }
  }
  pen.fillStyle = '#171429';
  pen.fillRect(0, horizon, width, height - horizon);
  pen.beginPath();
  for (var lane = -16; lane <= 16; lane++) {
    pen.moveTo(width / 2, horizon);
    pen.lineTo(width / 2 + lane * width / 6, height);
  }
  for (var gap = 1; horizon + gap < height; gap *= 1.6) {
    pen.moveTo(0, horizon + gap);
    pen.lineTo(width, horizon + gap);
  }
  pen.strokeStyle = '#503057';
  pen.lineWidth = .55;
  pen.stroke();
}
