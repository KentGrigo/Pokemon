function Sign(x, y, width, height) {
    this.obstacle = new Obstacle(x, y, width, height);
    this.img = new Image();
    this.img.src = "images/object/sign.png";
}

Sign.prototype.render = function(playerX, playerY) {
    if (GRAPHICS === "false") {
        context.fillStyle = "#000000";
        context.fillRect(this.obstacle.x - playerX + WIDTH / 2, this.obstacle.y - playerY + HEIGHT / 2, this.obstacle.width, this.obstacle.height);
    } else {
        context.drawImage(this.img, this.obstacle.x - playerX + WIDTH / 2, this.obstacle.y - playerY + HEIGHT / 2, TILE_SIZE, TILE_SIZE);
    }
}

Sign.prototype.update = function () {
    return this.obstacle.update();
}

Sign.prototype.collision = function(playerX, playerY) {
    return this.obstacle.collision(playerX, playerY);
}
