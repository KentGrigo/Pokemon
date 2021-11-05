function Ledge(x, y, width, height) {
    this.x = x * TILE_SIZE;
    this.y = y * TILE_SIZE;
    this.width = width * TILE_SIZE;
    this.height = height * TILE_SIZE;

    this.img = new Image();
    this.img.src = "images/object/ledge.png";
}

Ledge.prototype.render = function (playerX, playerY) {
    if (GRAPHICS === "false") {
        context.fillStyle = "#310C0C";
        context.fillRect(this.x - playerX + WIDTH / 2, this.y - playerY + HEIGHT / 2, this.width, this.height);
    } else {
        for (var i = 0; i < this.width; i += TILE_SIZE) {
            for (var j = 0; j < this.height; j += TILE_SIZE) {
                context.drawImage(this.img, this.x - playerX + WIDTH / 2 + i, this.y - playerY + HEIGHT / 2 + j, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

Ledge.prototype.update = function () {
}

Ledge.prototype.collision = function (playerX, playerY, prevPlayerX, prevPlayerY) {
    left = playerX < this.x;
    right = this.x + this.width - 1 < playerX;
    above = playerY < this.y;
    below = this.y + this.height - 1 < playerY;

    prevLeft = prevPlayerX < this.x;
    prevRight = this.x + this.width - 1 < prevPlayerX;
    prevAbove = prevPlayerY < this.y;
    prevBelow = this.y + this.height - 1 < prevPlayerY;

    if (!(left || right || above || below)) {
        if (prevAbove) return [playerX, playerY + TILE_SIZE];
        else return [prevPlayerX, prevPlayerY];
    } else {
        return [playerX, playerY];
    }
}
