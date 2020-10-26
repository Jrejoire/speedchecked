export function encodeImage(src, callback) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = src;
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL('image/jpeg', 1);
    callback(dataURL);
  };
}