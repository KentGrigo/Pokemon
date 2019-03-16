function Rattata(level) {
    this.level = level;
    this.maxHealth = level * 2 + 5;
    this.attack1;
    this.attack2;
    this.attack3;
    this.attack4;

    this.hp = 30;
    this.attack = 56;
    this.defense = 35;
    this.specialAttack = 25;
    this.specialDefense = 35;
    this.speed = 72;

    this.img_front = new Image();
    this.img_front.src = "images/pokemon/rattata-front.png";
    this.img_back = new Image();
    this.img_back.src = "images/pokemon/rattata-back.png";

    this.setAttacks();
}

Rattata.prototype.setAttacks = function() {
    if (1 <= this.level) {
        this.attack1 = new Attack(new Tackle());
        this.attack2 = new Attack(new Tail_Whip());
    }
    if (4 <= this.level) {
        this.attack3 = new Attack(new Quick_Attack());
    }
    if (7 <= this.level) {
        this.attack4 = new Attack(new Focus_Energy());
    }
}
