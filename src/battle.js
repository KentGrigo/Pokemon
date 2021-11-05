function Battle(pokemon1, pokemon2) {
    this.pokemon1 = pokemon1;
    this.pokemon2 = pokemon2;
    this.action = "FIGHT";
    this.hasChosenAction = false;
    this.hasChosenAttack = false;
    this.fleeing = false;
    this.enteringBattle = true;
    this.pokemon1AttackNumber = 1;
    this.pokemon2AttackNumber = 1;
    this.firstAttacker = 1;

    // Messages
    this.faintMessage = false;
    this.faintMessageConfirmed = false;
    this.pokemon1AttackMessage = false;
    this.pokemon2AttackMessage = false;

    this.inputDelay = 200;        // ms
    this.lastInput = new Date();
    this.messageDelay = 1000;      // ms
    this.lastMessage = new Date(-this.messageDelay); // to not create a delay in the beginning
}

Battle.prototype.render = function() {
    context.fillStyle = "#000000";
    context.font="20px Georgia";

    this.pokemon1.renderBack(90, 110);
    this.pokemon2.renderFront(10, 20);
    this.pokemon1.renderStats(140, 150);
    this.pokemon2.renderStats(10, 50);

    context.rect(10, 210, 230, 80);
    context.stroke();

    if (this.enteringBattle) {
        context.fillText("Wild " + this.pokemon2.name, 15, 230);
        context.fillText("appeared!", 15, 250);
    } else if (this.pokemon1AttackMessage && !(this.firstAttacker == 2 && this.pokemon2AttackMessage)) {
        context.fillText(this.pokemon1.name + " used", 15, 230);
        context.fillText(this.pokemon1.getAttack(this.pokemon1AttackNumber).name + "!", 15, 250);
    } else if (this.pokemon2AttackMessage) {
        context.fillText("Enemy " + this.pokemon2.name, 15, 230);
        context.fillText("used " + this.pokemon2.getAttack(this.pokemon2AttackNumber).name + "!", 15, 250);
    } else if (this.faintMessage) {
        if (this.hasWon()) {
            context.fillText("Enemy " + this.pokemon2.name, 15, 230);
            context.fillText("fainted!", 15, 250);
        } else {
            context.fillText(this.pokemon1.name, 15, 230);
            context.fillText("fainted!", 15, 250);
        }
    } else if (!this.hasChosenAction) {
        context.rect(70, 210, 170, 80);
        context.stroke();
        context.fillText("FIGHT", 80, 240);
        context.fillText("PKMN", 160, 240);
        context.fillText("ITEM", 80, 280);
        context.fillText("RUN", 160, 280);
        this.drawCursor();
    } else if (this.action === "FIGHT") {
        context.rect(70, 210, 170, 80);
        context.stroke();
        context.fillText(this.pokemon1.attack1.name.toUpperCase(), 80, 230);
        context.fillText(this.pokemon1.attack2.name.toUpperCase(), 80, 250);
        context.fillText(this.pokemon1.attack3.name.toUpperCase(), 80, 270);
        context.fillText(this.pokemon1.attack4.name.toUpperCase(), 80, 290);

        context.beginPath();
        context.rect(10, 140, 120, 70);
        context.fillStyle = "#D3ECE5";
        context.fill();
        context.fillStyle = "#000000";
        context.stroke();
        var markedAttack = this.pokemon1.getAttack(this.pokemon1AttackNumber);
        context.fillText("TYPE/", 20, 160);
        context.fillText(markedAttack.type, 30, 180);
        context.fillText(markedAttack.PP + "/" + markedAttack.maxPP, 60, 200);

        this.drawCursor();
    } else if (this.action === "RUN") {
        context.fillText("Got away safely!", 15, 230);
    }
};

Battle.prototype.update = function() {
    if (this.recentlyReceivedInput()) return;
    if (this.recentlyReceivedMessage()) return;

    this.hasChosenAttack = false;

    if (this.pokemon1AttackMessage && !(this.firstAttacker == 2 && this.pokemon2AttackMessage)) {
        if (this.pokemon2AttackMessage) this.lastMessage = new Date();
        this.pokemon1AttackMessage = false;
        return;
    } else if (this.pokemon2AttackMessage) {
        if (this.pokemon1AttackMessage) this.lastMessage = new Date();
        this.pokemon2AttackMessage = false;
        return;
    }

    for(var key in keysDown) {
        var value = Number(key);
        if      (value==8)  this.back();        // backspace
        else if (value==13) this.select();      // enter
        else if (value==37) this.selectLeft();  // left  arrow
        else if (value==38) this.selectUp();    // up    arrow
        else if (value==39) this.selectRight(); // right arrow
        else if (value==40) this.selectDown();  // down  arrow
        if (value == 13 || value == 37 || value == 38 || value == 39 || value == 40) {
            this.lastInput = new Date();
            break;              // No multiple moves
        }
    }

    if (this.hasChosenAttack) {
        this.pokemon2AttackNumber = Math.floor(Math.random() * this.pokemon2.amountOfAttacks) + 1;
        var pokemon1Damage = this.pokemon1.attack(this.pokemon1AttackNumber, this.pokemon2);
        var pokemon2Damage = this.pokemon2.attack(this.pokemon2AttackNumber, this.pokemon1);

        this.lastMessage = new Date();
        if (this.pokemon2.stat_speed <= this.pokemon1.stat_speed) {
            this.firstAttacker = 1;
        } else {
            this.firstAttacker = 2;
        }

        if (this.firstAttacker == 1) {
            this.pokemon1AttackMessage = true;
            this.pokemon2.health -= pokemon1Damage;
        } else {
            this.pokemon2AttackMessage = true;
            this.pokemon1.health -= pokemon2Damage;
        }

        var gameOver = this.hasWon() || this.hasLost();
        if (gameOver) {
            // don't attack
        } else if (this.firstAttack == 1) {
            this.pokemon2AttackMessage = true;
            this.pokemon1.health -= pokemon2Damage;
        } else {
            this.pokemon1AttackMessage = true;
            this.pokemon2.health -= pokemon1Damage;
        }
    }

    if ((this.hasWon() || this.hasLost()) && this.faintMessageConfirmed) {
        MODE = "Roam";
    } else if (this.hasWon()) {
        this.faintMessage = true;
    } else if (this.hasLost()) {
        this.faintMessage = true;
    } else if (this.fleeing) {
        MODE = "Roam";
    }
    
};

Battle.prototype.hasWon = function() {
    return this.pokemon2.health <= 0;
}

Battle.prototype.hasLost = function() {
    return this.pokemon1.health <= 0;
}

Battle.prototype.back = function() {
    if (this.hasChosenAction && this.action === "RUN") {
        this.select();
    } else if (this.hasChosenAction) {
        this.hasChosenAction = false;
    }
}

Battle.prototype.selectLeft = function() {
    if (this.hasChosenAction || this.enteringBattle) return;
    if (this.action === "PKMN") this.action = "FIGHT";
    if (this.action === "RUN")  this.action = "ITEM";
};

Battle.prototype.selectUp = function() {
    if (this.enteringBattle) return;

    if (!this.hasChosenAction) {
        if (this.action === "ITEM") this.action = "FIGHT";
        if (this.action === "RUN")  this.action = "PKMN";
    } else if (this.action === "FIGHT") {
        if (1 < this.pokemon1AttackNumber) {
            this.pokemon1AttackNumber--;
        } else {
            this.pokemon1AttackNumber = this.pokemon1.amountOfAttacks;
        }
    }
};

Battle.prototype.selectRight = function() {
    if (this.hasChosenAction || this.enteringBattle) return;
    if (this.action === "FIGHT") this.action = "PKMN";
    if (this.action === "ITEM")  this.action = "RUN";
};

Battle.prototype.selectDown = function() {
    if (this.enteringBattle) return;

    if (!this.hasChosenAction) {
        if (this.action === "FIGHT") this.action = "ITEM";
        if (this.action === "PKMN")  this.action = "RUN";
    } else if (this.action === "FIGHT") {
        if (this.pokemon1AttackNumber < this.pokemon1.amountOfAttacks) {
            this.pokemon1AttackNumber++;
        } else {
            this.pokemon1AttackNumber = 1;
        }
    }
};

Battle.prototype.select = function() {
    if (this.enteringBattle) {
        this.enteringBattle = false;
    } else if (this.faintMessage) {
        this.faintMessage = false;
        this.faintMessageConfirmed = true;
    } else if (this.hasChosenAction && this.action === "FIGHT") {
        this.hasChosenAttack = true;
        this.hasChosenAction = false;
    } else if (!this.hasChosenAction && this.action === "FIGHT") {
        this.hasChosenAction = true;
    } else if (!this.hasChosenAction && this.action === "RUN") {
        this.hasChosenAction = true;
    } else if (this.hasChosenAction && this.action === "RUN") {
        this.fleeing = true;
    }
};

Battle.prototype.drawCursor = function() {
    var x, y;

    if (!this.hasChosenAction) {
        if      (this.action === "FIGHT") { x =  75; y = 230; }
        else if (this.action === "PKMN")  { x = 155; y = 230; }
        else if (this.action === "ITEM")  { x =  75; y = 270; }
        else if (this.action === "RUN")   { x = 155; y = 270; }
    } else if (this.action === "FIGHT") {
        x = 75;
        y = this.pokemon1AttackNumber * 20 + 200;
    }

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 5, y + 5);
    context.lineTo(x, y + 10);
    context.closePath();
    context.fill();
};

Battle.prototype.recentlyReceivedInput = function() { return (new Date() - this.lastInput) < this.inputDelay; }
Battle.prototype.recentlyReceivedMessage = function() { return (new Date() - this.lastMessage) < this.messageDelay; }
