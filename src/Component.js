class Component {
    constructor(x, y, width, height, color, game, speedX) {
        // játék
        this.game = game;
        this.context = this.game.GetContext();

        this.color = color;
        
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.speedX = (typeof speedX == 'undefined') ? -1 : speedX;
        this.speedY = 0;

        this.gravitySpeed = 0;
    }

    Move() {
        // sebesség
        this.gravitySpeed += this.gravity;

        // szélesség
        this.x += this.speedX;

        // magasság
        this.y += this.speedY + this.gravitySpeed;
        
        // korlátok közé helyezés
        this.y = Math.min(this.game.GetHeight() - this.height, this.y);
        this.y = Math.max(0, this.y);
        
        // gravitáció beállítása
        if (this.y == this.game.GetHeight() - this.height) {
            this.gravitySpeed = 0;
        }
        if (this.color == 'red' && this.y == 0) {
            this.gravitySpeed = 0.05;
        }

        this.Draw();
    }

    Draw(){
        // kirajzolás
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    CrashWith(otherComponent) {
        // aktuális objektum
        let myLeft = this.x,
            myRight = this.x + this.width,
            mytop = this.y,
            myBottom = this.y + this.height;

        // másik objektum
        let otherleft = otherComponent.x,
            otherRight = otherComponent.x + otherComponent.width,
            othertop = otherComponent.y,
            otherBottom = otherComponent.y + otherComponent.height;

        // ütközés megállapítása
        if (
            myBottom < othertop ||
            otherBottom < mytop ||
            myRight < otherleft ||
            otherRight < myLeft
        ) {
            return false
        }
        return true;
    }
}
