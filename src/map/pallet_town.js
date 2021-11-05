function PalletTown() {
	this.houses = [
		new House(4, 3, 4, 3, 1, 2),
		new House(12, 3, 4, 3, 1, 2),
		new House(10, 8, 6, 4, 2, 3)
	];
	this.grass = [
		new Grass(10, 0, 2, 2)
	];
	this.obstacles = [
		// Delimiters
		new Delimiter(0, 1, 1, 17),
		new Delimiter(1, 17, 1, 1),
		new Delimiter(0, 18, 5, 1),
		new Delimiter(8, 18, 12, 1),
		new Delimiter(8, 17, 12, 1),
		new Delimiter(19, 1, 1, 16),
		new Delimiter(1, 1, 9, 1),
		new Delimiter(12, 1, 7, 1),
		new Delimiter(3, 0, 1, 1),
		new Delimiter(9, 0, 1, 1),
		new Delimiter(12, 0, 1, 1),
		new Delimiter(18, 0, 1, 1),

		// Signs
		new Sign(3, 5, 1, 1),
		new Sign(11, 5, 1, 1),
		new Sign(7, 9, 1, 1),
		new Sign(13, 13, 1, 1),

		// Fences
		new Fence(4, 9, 3, 1),
		new Fence(10, 13, 3, 1),
		new Fence(14, 13, 2, 1),

		// Water
		new Water(4, 14, 4, 5)
	];
	this.ledges = [
	];
}
