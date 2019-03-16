function Route1() {
    this.houses = [
    ];
    this.grass =  [
	new Grass(7,32,2,4),
	new Grass(1,30,4,2),
	new Grass(3,28,4,2),
	new Grass(9,30,4,2),
	new Grass(11,28,4,2),
	new Grass(9,22,4,4),
	new Grass(11,12,4,4),
	new Grass(7,6,8,4)
    ];
    this.obstacles = [
	// Delimiters
	new Delimiter(0,0,1,6),
	new Delimiter(0,15,1,14),
	new Delimiter(15,0,1,6),
	new Delimiter(15,15,1,14),
	new Delimiter(1,1,6,1),
	new Delimiter(9,1,6,1),
	new Delimiter(6,0,1,1),
	new Delimiter(9,0,1,1),
	new Delimiter(1,32,6,1),
	new Delimiter(9,32,6,1),
	new Delimiter(6,33,1,3),
	new Delimiter(9,33,1,3),

        // Trees
        new Tree(0,6,1,9),        
        new Tree(0,28,1,8),
        new Tree(15,6,1,9),        
        new Tree(15,28,1,8),
	new Tree(1,13,2,1),
	new Tree(7,13,4,1),
	new Tree(1,23,8,1),
	new Tree(6,4,1,6),

	// Signs
	new Sign(6,27,1,1)

	// Fences
    ];
    this.ledges = [
	new Ledge(1,27,2,1),
	new Ledge(7,27,8,1),
	new Ledge(13,23,2,1),
	new Ledge(1,19,1,1),
	new Ledge(3,19,3,1),
	new Ledge(7,19,8,1),
	new Ledge(3,13,4,1),
	new Ledge(1,9,5,1),
	new Ledge(1,5,5,1),
	new Ledge(7,5,4,1)
    ];
}
