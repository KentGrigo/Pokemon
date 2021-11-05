function Obstacle(x, y, width, height) {
    this.x = x * TILE_SIZE;
    this.y = y * TILE_SIZE;
    this.width = width * TILE_SIZE;
    this.height = height * TILE_SIZE;
}

Obstacle.prototype.render = function (playerX, playerY) {
    context.fillStyle = "#000000";
    context.fillRect(this.x - playerX + WIDTH / 2, this.y - playerY + HEIGHT / 2, this.width, this.height);
}

Obstacle.prototype.update = function () {
}

Obstacle.prototype.collision = function (playerX, playerY) {
    left = playerX < this.x;
    right = this.x + this.width - 1 < playerX;
    above = playerY < this.y;
    below = this.y + this.height - 1 < playerY;

    return !(left || right || above || below);
}
