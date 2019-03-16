function Map(map) {
    this.map = map;
    this.encounterRate = 25; 
}

Map.prototype.render = function(playerX, playerY) {
    for (var i = 0; i < this.map.houses.length; i++) {
        this.map.houses[i].render(playerX, playerY);
    }
    for (var i = 0; i < this.map.grass.length; i++) {
        this.map.grass[i].render(playerX, playerY);
    }
    for (var i = 0; i < this.map.obstacles.length; i++) {
        this.map.obstacles[i].render(playerX, playerY);
    }
    for (var i = 0; i < this.map.ledges.length; i++) {
        this.map.ledges[i].render(playerX, playerY);
    }
}

Map.prototype.update = function() {
}

Map.prototype.collision = function(playerX, playerY, prevPlayerX, prevPlayerY) {
    for (var i = 0; i < this.map.houses.length; i++) {
        house = this.map.houses[i];
        if (house.collision(playerX, playerY)) return [prevPlayerX, prevPlayerY];
    }
    for (var i = 0; i < this.map.obstacles.length; i++) {
        obstacle = this.map.obstacles[i];
        if (obstacle.collision(playerX, playerY)) return [prevPlayerX, prevPlayerY];
    }
    for (var i = 0; i < this.map.ledges.length; i++) {
        ledge = this.map.ledges[i];
        var pos = ledge.collision(playerX, playerY, prevPlayerX, prevPlayerY);
        if      (pos[0] == prevPlayerX && pos[1] == prevPlayerY) return [prevPlayerX, prevPlayerY];
        else if (pos[0] != playerX     || pos[1] != playerY)     return pos;
    }

    return [playerX, playerY];
}

Map.prototype.readSign = function(){}

Map.prototype.onGrass = function(playerX, playerY) {
    for (var i = 0; i < this.map.grass.length; i++) {
        grass = this.map.grass[i];
        if (grass.collision(playerX, playerY)) return true;
    }

    return false;
}

Map.prototype.getEncounterRate = function() {
    return this.encounterRate;
}

Map.prototype.getPokemon = function() {
    var random = Math.random() * 100;
    var level;
    if (random < 50) {
        // Pidgey
        level = Math.floor(Math.random() * 3) + 2;
        return new Pokemon(new Pidgey(level));
    } else {
        // Rattata
        level = Math.floor(Math.random() * 4) + 2;
        return new Pokemon(new Rattata(level));
    }
}

Map.prototype.offset = function(x, y) {
    for (var i = 0; i < this.map.houses.length; i++) {
        this.map.houses[i].x += x * TILE_SIZE;
        this.map.houses[i].y += y * TILE_SIZE;
    }
    for (var i = 0; i < this.map.grass.length; i++) {
        this.map.grass[i].x += x * TILE_SIZE;
        this.map.grass[i].y += y * TILE_SIZE;
    }
    for (var i = 0; i < this.map.obstacles.length; i++) {
        this.map.obstacles[i].obstacle.x += x * TILE_SIZE;
        this.map.obstacles[i].obstacle.y += y * TILE_SIZE;
    }
    for (var i = 0; i < this.map.ledges.length; i++) {
        this.map.ledges[i].x += x * TILE_SIZE;
        this.map.ledges[i].y += y * TILE_SIZE;
    }
}
