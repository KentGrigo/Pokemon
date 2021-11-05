function Tree(x, y, width, height) {
    this.obstacle = new Obstacle(x, y, width, height);
    this.img = new Image();
    this.img.src = "images/object/tree.png";
}

Tree.prototype.render = function(playerX, playerY) {
    if (GRAPHICS === "false") {
        context.fillStyle = "#009900";
        context.fillRect(this.obstacle.x - playerX + WIDTH / 2, this.obstacle.y - playerY + HEIGHT / 2, this.obstacle.width, this.obstacle.height);
    } else {
        for(var i = 0; i < this.obstacle.width; i += TILE_SIZE) {
            for(var j = 0; j < this.obstacle.height; j += TILE_SIZE) {
                context.drawImage(this.img, this.obstacle.x - playerX + WIDTH / 2 + i, this.obstacle.y - playerY + HEIGHT / 2 + j, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

Tree.prototype.update = function () {
    return this.obstacle.update();
}

Tree.prototype.collision = function(playerX, playerY) {
    return this.obstacle.collision(playerX, playerY);
}
