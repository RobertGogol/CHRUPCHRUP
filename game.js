const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let cursors;
let sandwiches;
let smartphones;
let platforms;

function preload() {
    this.load.image('background', 'assets/tlo.png');
    this.load.image('sandwich', 'assets/sandwich.png');
    this.load.image('smartphone', 'assets/smartphone.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.spritesheet('student', 'assets/student.png', { frameWidth: 32, frameHeight: 32 });
}

function create() {
    this.add.image(400, 300, 'background').setScale(1.5);
    
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 580, 'platform').setScale(2).refreshBody();
    
    player = this.physics.add.sprite(100, 450, 'student');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    cursors = this.input.keyboard.createCursorKeys();
    
    sandwiches = this.physics.add.group({
        key: 'sandwich',
        repeat: 5,
        setXY: { x: 150, y: 100, stepX: 120 }
    });
    
    smartphones = this.physics.add.group();
    
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, sandwiches, collectSandwich, null, this);
    this.physics.add.collider(player, smartphones, hitSmartphone, null, this);
    this.physics.add.collider(sandwiches, platforms);
    this.physics.add.collider(smartphones, platforms);
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }
    
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-400);
    }
}

function collectSandwich(player, sandwich) {
    sandwich.disableBody(true, true);
    
    setTimeout(() => {
        let phone = smartphones.create(sandwich.x, sandwich.y, 'smartphone');
        phone.setVelocityY(100);
    }, 5000);
}

function hitSmartphone(player, smartphone) {
    console.log("Złamałeś zęby na smartfonie!");
    smartphone.disableBody(true, true);
}
