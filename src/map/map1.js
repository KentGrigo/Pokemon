function Map1() {
    this.houses = [];
    this.grass = [];
    this.obstacles = [];
    this.ledges = [];

    var map1 = new Map(new PalletTown());
    var map2 = new Map(new Route1());

    map2.offset(3,-36);

    this.appendMap(map1);
    this.appendMap(map2);
}

Map1.prototype.appendMap = function(map, offset) {
    this.houses.push.apply(this.houses, map.map.houses);
    this.grass.push.apply(this.grass, map.map.grass);
    this.obstacles.push.apply(this.obstacles, map.map.obstacles);    
    this.ledges.push.apply(this.ledges, map.map.ledges);    
}
