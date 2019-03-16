function Pidgey(level) {
    this.level = level;
    this.maxHealth = level * 2 + 5;
    this.attack1;
    this.attack2;
    this.attack3;
    this.attack4;

    this.hp = 40;
    this.attack = 45;
    this.defense = 40;
    this.specialAttack = 35;
    this.specialDefense = 35;
    this.speed = 56;

    this.img_front = new Image();
    this.img_front.src = "images/pokemon/pidgey-front.png";
    this.img_back = new Image();
    this.img_back.src = "images/pokemon/pidgey-back.png";

    this.setAttacks();
}

Pidgey.prototype.setAttacks = function() {
    if (1 <= this.level) {
        this.attack1 = new Attack(new Tackle());
    }
    if (5 <= this.level) {
        this.attack2 = new Attack(new Sand_Attack());
    }
    if (9 <= this.level) {
        this.attack3 = new Attack(new Gust());
    }
    if (13 <= this.level) {
        this.attack4 = new Attack(new Quick_Attack());
    }
}
