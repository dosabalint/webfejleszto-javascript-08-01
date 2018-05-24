class Game {
    constructor() {
        // canvas
        this.canvas = document.getElementById('game');
        this.canvas.width = 1000;
        this.canvas.height = 600;

        // madár
        this.bird = new Component(
            10,
            (this.GetHeight() - 30) / 2,
            30,
            30,
            'red',
            this,
            0
        );
        this.bird.gravity = 0.05;

        // oszlopok
        this.obstacleCollection = [];

        // config
        this.minGap = 100;
        this.maxGap = 200;
        this.minHeight = 20;
        this.maxHeight = 200;

        // propertyk
        this.tickCounter = 0;

        // timer
        this.interval = setInterval(() => {
            this.Update();
        }, 10);

        // feliratkozás
        window.addEventListener('keydown', event => {
            if (event.code == 'Space') {
                this.SetBirdGravity(-0.2);
            }
        });
        window.addEventListener('keyup', event => {
            if (event.code == 'Space') {
                this.SetBirdGravity(0.05);
            }
        });
    }

    Clear() {
        this.GetContext().clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    GetContext() {
        return this.canvas.getContext('2d');
    }

    GetWidth() {
        return this.canvas.width;
    }

    GetHeight() {
        return this.canvas.height;
    }

    IsGameOver() {
        for (let index = 0; index < this.obstacleCollection.length; index++) {
            if (this.bird.CrashWith(this.obstacleCollection[index])) {
                return true;
            }
        }
        return false;
    }

    Update() {
        this.tickCounter++;
        
        // ha van ütközés, akkor game over
        if (this.IsGameOver()) {
            clearInterval(this.interval);
            alert('Game Over');
            return;
        }

        // takarítás
        this.Clear();

        // új oszlopok felvétele
        if (this.tickCounter == 1 || this.IsNthTick(150)) {
            // random magasság (határok között)
            let height = Math.floor(
                this.minHeight +
                    Math.random() * (this.maxHeight - this.minHeight + 1)
            );

            // random térköz (határok között)
            let gap = Math.floor(
                this.minGap + Math.random() * (this.maxGap - this.minGap + 1)
            );

            // oszlop felvétele
            this.obstacleCollection.push(
                new Component(this.GetWidth(), 0, 40, height, 'green', this)
            );
            this.obstacleCollection.push(
                new Component(
                    this.GetWidth(),
                    height + gap,
                    40,
                    this.GetHeight() - height - gap,
                    'green',
                    this
                )
            );
        }

        // oszlopok mozgatása
        this.obstacleCollection.forEach(function(obstacle) {
            obstacle.Move();
        });

        // madár mozgatása
        this.bird.Move();
    }

    IsNthTick(n) {
        return this.tickCounter % n == 0;
    }

    SetBirdGravity(value) {
        this.bird.gravity = value;
    }
}
