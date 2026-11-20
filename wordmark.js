function drawWordmark(canvas) {
  var letters = [
    [31, 4, 4, 4, 4], [31, 16, 30, 16, 31], [31, 4, 4, 4, 4],
    [30, 17, 30, 20, 18], [31, 4, 4, 4, 31], [31, 16, 31, 1, 31]
  ];
  var pen = canvas.getContext('2d');
  var spectrum = pen.createLinearGradient(0, 0, 0, 30);
  spectrum.addColorStop(0, '#fff3b2');
  spectrum.addColorStop(.49, '#ffc57a');
  spectrum.addColorStop(.5, '#ff868b');
  spectrum.addColorStop(1, '#fa65bc');
  ['#702f85', spectrum].forEach(function(color, layer) {
    pen.fillStyle = color;
    letters.forEach(function(letter, index) {
      letter.forEach(function(row, y) {
        for (var x = 0; x < 5; x++) {
          if (row & (16 >> x))
            pen.fillRect(index * 31 + x * 5 + (1-layer)*2, y * 6 + (1-layer)*3, 5, 6);
        }
      });
    });
  });
}
