function Player(x, y) {
    this.x = x * TILE_SIZE;
    this.y = y * TILE_SIZE;
    this.width = 1 * TILE_SIZE;
    this.height = 1 * TILE_SIZE;

    this.xOld = this.x;
    this.xNew = this.x;
    this.yOld = this.y;
    this.yNew = this.y;
    this.moveDelay = 250;
    this.lastMove = new Date();
    this.justMoved = false;

    this.direction = 1;         // down
    var imgDir = "images/player/ash-";
    var imgFormat = ".png";
    this.img = new Image();
    this.imgs = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
    this.imgMoves = [new Image(), new Image(), new Image(), new Image()];
    this.imgs[0].src = imgDir + "up" + imgFormat;
    this.imgs[1].src = imgDir + "down" + imgFormat;
    this.imgs[2].src = imgDir + "left" + imgFormat;
    this.imgs[3].src = imgDir + "right" + imgFormat;
    this.imgs[4].src = imgDir + "up-move" + imgFormat;
    this.imgs[5].src = imgDir + "down-move" + imgFormat;
    this.imgs[6].src = imgDir + "left-move" + imgFormat;
    this.imgs[7].src = imgDir + "right-move" + imgFormat;
    this.img.src = this.imgs[this.direction].src;
}

Player.prototype.render = function () {
    if (GRAPHICS === "false") {
        context.fillStyle = "#0000FF";
        context.fillRect(WIDTH / 2, HEIGHT / 2, this.width, this.height);
    } else {
        var dir = this.direction;
        if (this.halfRecentlyMoved()) dir += 4;
        this.img.src = this.imgs[dir].src;

        context.drawImage(this.img, WIDTH / 2, HEIGHT / 2, this.width, this.height);
    }
};

Player.prototype.update = function (map) {
    if (this.recentlyMoved()) {
        this.moveFrom(this.xOld, this.yOld, this.xNew, this.yNew);
        this.justMoved = true;
        return;
    } else if (this.justMoved) {
        this.justMoved = false;
        this.x = this.xNew;
        this.y = this.yNew;
        if (map.onGrass(this.x, this.y)) {
            var random = Math.random() * 256;

            if (random < map.getEncounterRate()) {
                var pokemon = map.getPokemon();
                MODE = "Battle";
                battle = new Battle(pokemon1, pokemon);
            }
        }
    }

    for (var key in keysDown) {
        var value = Number(key);
        if (value == 8) this.back();      // backspace
        else if (value == 13) this.select();    // enter
        else if (value == 37) this.moveLeft();  // left arrow
        else if (value == 38) this.moveUp();    // up arrow
        else if (value == 39) this.moveRight(); // right arrow
        else if (value == 40) this.moveDown();  // down arrow

        if (value == 8 || value == 13 || value == 37 || value == 38 || value == 39 || value == 40) {
            break;              // No multiple actions
        }
    }
};

Player.prototype.recentlyMoved = function () { return (new Date() - this.lastMove) < this.moveDelay; }
Player.prototype.halfRecentlyMoved = function () { return (new Date() - this.lastMove) < this.moveDelay / 2; }

Player.prototype.back = function () { }
Player.prototype.select = function () { }

Player.prototype.moveLeft = function () { this.direction = 2; this.move(map, -1, 0); }
Player.prototype.moveUp = function () { this.direction = 0; this.move(map, 0, -1); }
Player.prototype.moveRight = function () { this.direction = 3; this.move(map, 1, 0); }
Player.prototype.moveDown = function () { this.direction = 1; this.move(map, 0, 1); }

Player.prototype.moveFrom = function (xOld, yOld, xNew, yNew) {
    var ratio = Math.min(1, (new Date() - this.lastMove) / this.moveDelay);
    this.x = xOld + (xNew - xOld) * ratio;
    this.y = yOld + (yNew - yOld) * ratio;
}

Player.prototype.move = function (map, x, y) {
    if (this.recentlyMoved()) return;

    this.xOld = this.x;
    this.yOld = this.y;

    // this.x += x * TILE_SIZE;
    // this.y += y * TILE_SIZE;
    this.xNew += x * TILE_SIZE;
    this.yNew += y * TILE_SIZE;
    this.lastMove = new Date();

    var pos = map.collision(this.xNew, this.yNew, this.xOld, this.yOld);
    this.xNew = pos[0];
    this.yNew = pos[1];
    // this.x = pos[0];
    // this.y = pos[1];
};
