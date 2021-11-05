function Attack(attack) {
    if (!attack) {
        this.name = "-";
        return;
    }

    this.name = attack.constructor.name.toUpperCase().replace("_", " ");
    this.maxPP = attack.PP;
    this.PP = attack.PP;
    this.type = attack.type;
    this.power = attack.power;
    this.accuracy = attack.accuracy;
    this.priority = attack.priority || 0;
}

// http://bulbapedia.bulbagarden.net/wiki/Damage#Damage_formula
Attack.prototype.attack = function (attacker_level, attacker_base, target_defense, modifier) {
    if (this.PP == 0) return;
    this.PP--;

    var damage;
    damage = (2 * attacker_level + 10) / 250;
    damage *= this.power / target_defense;
    damage *= attacker_base;
    damage += 2;
    damage *= modifier;
    return Math.floor(damage);
}

Attack.prototype.isQuick = function () {
    return this.priority == 1;
}
