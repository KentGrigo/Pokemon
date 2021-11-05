function Squirtle(level) {
    this.level = level;
    this.maxHealth = level * 3 + 10;
    this.attack1;
    this.attack2;
    this.attack3;
    this.attack4;

    this.hp = 44;
    this.attack = 48;
    this.defense = 65;
    this.specialAttack = 50;
    this.specialDefense = 64;
    this.speed = 43;

    this.img_front = new Image();
    this.img_front.src = "images/pokemon/squirtle-front.png";
    this.img_back = new Image();
    this.img_back.src = "images/pokemon/squirtle-back.png";

    this.setAttacks();
}

Squirtle.prototype.setAttacks = function() {
    if (1 <= this.level) {
        this.attack1 = new Attack(new Tackle());
    }
    if (4 <= this.level) {
        this.attack2 = new Attack(new Tail_Whip());
    }
    if (7 <= this.level) {
        this.attack3 = new Attack(new Water_Gun());
    }
    if (10 <= this.level) {
        this.attack4 = new Attack(new Withdraw());
    }
}

