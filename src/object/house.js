function House(x, y, width, height, doorX, doorY) {
    // House
    this.x = x * TILE_SIZE;
    this.y = y * TILE_SIZE;
    this.width = width * TILE_SIZE;
    this.height = height * TILE_SIZE;
    // Door
    this.doorX = doorX * TILE_SIZE + this.x;
    this.doorY = doorY * TILE_SIZE + this.y;
    this.doorWidth = 1 * TILE_SIZE;
    this.doorHeight = 1 * TILE_SIZE;

    this.img = new Image();
    this.img.src = "images/object/house.png";
    if (this.width == 6 * TILE_SIZE && this.height == 4 * TILE_SIZE)
        this.img.src = "images/object/prof-oaks-lab.png";
}

House.prototype.render = function (playerX, playerY) {
    if (GRAPHICS === "false") {
        context.fillStyle = "#A73B00";
        context.fillRect(this.x - playerX + WIDTH / 2, this.y - playerY + HEIGHT / 2, this.width, this.height);
        context.fillStyle = "#FFFFFF";
        context.fillRect(this.doorX - playerX + WIDTH / 2, this.doorY - playerY + HEIGHT / 2, this.doorWidth, this.doorHeight);
    } else {
        context.drawImage(this.img, this.x - playerX + WIDTH / 2, this.y - playerY + HEIGHT / 2, this.width, this.height);
    }
}

House.prototype.update = function () {
}

House.prototype.collision = function (playerX, playerY) {
    left = playerX < this.x;
    right = this.x + this.width - 1 < playerX;
    above = playerY < this.y;
    below = this.y + this.height - 1 < playerY;

    door = (playerX == this.doorX) && (playerY == this.doorY);

    return !(left || right || above || below || door);
}
