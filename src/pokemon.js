function Pokemon(pokemon) {
    this.pokemon = pokemon
    this.name = pokemon.constructor.name.toUpperCase()

    this.level = this.pokemon.level
    this.health = this.pokemon.maxHealth
    this.maxHealth = this.pokemon.maxHealth
    this.attack1 = this.pokemon.attack1 || new Attack()
    this.attack2 = this.pokemon.attack2 || new Attack()
    this.attack3 = this.pokemon.attack3 || new Attack()
    this.attack4 = this.pokemon.attack4 || new Attack()

    this.stat_hp = this.pokemon.hp
    this.stat_attack = this.pokemon.attack
    this.stat_defense = this.pokemon.defense
    this.stat_specialAttack = this.pokemon.specialAttack
    this.stat_specialDefense = this.pokemon.specialDefense
    this.stat_speed = this.pokemon.speed

    this.amountOfAttacks = 1
    if (this.attack4.name !== "-") this.amountOfAttacks = 4
    else if (this.attack3.name !== "-") this.amountOfAttacks = 3
    else if (this.attack2.name !== "-") this.amountOfAttacks = 2

    this.imageSize = 100
}

Pokemon.prototype.learnAttack = function (attackName, attackNumber) {
    if (this.getAttack(attackNumber) === "-") this.amountOfAttacks++

    if (attackNumber == 1) this.attack1 = attackName
    else if (attackNumber == 2) this.attack2 = attackName
    else if (attackNumber == 3) this.attack3 = attackName
    else if (attackNumber == 4) this.attack4 = attackName
}

Pokemon.prototype.attack = function (attackNumber, target) {
    var chosenAttack = this.getAttack(attackNumber)
    var modifier = 1
    var damage = chosenAttack.attack(this.level, this.stat_attack, target.stat_defense, modifier)
    return damage
}

Pokemon.prototype.renderFront = function (x, y) {
    if (GRAPHICS === "false") return
    context.drawImage(this.pokemon.img_front, x + 130, y + 20, this.imageSize, this.imageSize)
}

Pokemon.prototype.renderBack = function (x, y) {
    if (GRAPHICS === "false") return
    context.drawImage(this.pokemon.img_back, x - 80, y, this.imageSize, this.imageSize)
}

Pokemon.prototype.renderStats = function (x, y) {
    context.fillText(this.name, x, y)
    context.fillText(":L" + this.level, x + 40, y + 20)
    context.fillText("HP:" + Math.max(0, this.health) + " / " + this.maxHealth, x + 10, y + 40)
}

Pokemon.prototype.getAttack = function (attackNumber) {
    if (attackNumber == 1) return this.attack1
    if (attackNumber == 2) return this.attack2
    if (attackNumber == 3) return this.attack3
    if (attackNumber == 4) return this.attack4
}
