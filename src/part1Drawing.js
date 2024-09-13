window.onload = function() {
    var canvas = document.getElementById('myCanvas');
    var c = canvas.getContext('2d');

    r = 32
    c.fillStyle = 'red';
    circleTower(c, r, r, r, 1, 1);
    c.fillStyle = 'green';
    circleTower(c, 400-r, r, r, -1, 1);
    c.fillStyle = 'blue';
    circleTower(c, r, 400-r, r, 1, -1);
    c.fillStyle = 'orange';
    circleTower(c, 400-r, 400-r, r, -1, -1);
}

function circleTower(c, x, y, r, xDir, yDir) {
    if (r < 1) {
        return;
    }
    circle(c, x, y, r);
    circleTower(c, x + r * xDir, y + r * yDir, r * 4/5, xDir, yDir);
}

function circle(c, x, y, r) {
    c.beginPath();
    c.arc(x, y, r, 0, 2 * Math.PI, false);
    c.stroke();
    c.fill();
}