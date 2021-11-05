function Water(x, y, width, height) {
    this.obstacle = new Obstacle(x, y, width, height);
    this.img = new Image();
    this.img.src = "images/object/water.png";
}

Water.prototype.render = function(playerX, playerY) {
    if (GRAPHICS === "false") {
        context.fillStyle = "#6666ff";
        context.fillRect(this.obstacle.x - playerX + WIDTH / 2, this.obstacle.y - playerY + HEIGHT / 2, this.obstacle.width, this.obstacle.height);
    } else {
        context.drawImage(this.img, this.obstacle.x - playerX + WIDTH / 2, this.obstacle.y - playerY + HEIGHT / 2, this.obstacle.width, this.obstacle.height);
    }
}

Water.prototype.update = function () {
    return this.obstacle.update();
}

Water.prototype.collision = function(playerX, playerY) {
    return this.obstacle.collision(playerX, playerY);
}
