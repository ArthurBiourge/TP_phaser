// chargement des librairies

/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/

// configuration générale du jeu
var config = {
  type: Phaser.AUTO,
  width: 800, // largeur en pixels
  height: 600, // hauteur en pixels
  physics: {
    // définition des parametres physiques
    default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
    arcade: {
      // parametres du mode arcade
      gravity: {
        y: 300 // gravité verticale : acceleration ddes corps en pixels par seconde
      },
      debug: false // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  
  scene: {
    // une scene est un écran de jeu. Pour fonctionner il lui faut 3 fonctions  : create, preload, update
    preload: preload, // la phase preload est associée à la fonction preload, du meme nom (on aurait pu avoir un autre nom)
    create: create, // la phase create est associée à la fonction create, du meme nom (on aurait pu avoir un autre nom)
    update: update // la phase update est associée à la fonction update, du meme nom (on aurait pu avoir un autre nom)

  }
};

// création et lancement du jeu
new Phaser.Game(config);


/***********************************************************************/
/** FONCTION PRELOAD 
/***********************************************************************/

/** La fonction preload est appelée une et une seule fois,
 * lors du chargement de la scene dans le jeu.
 * On y trouve surtout le chargement des assets (images, son ..)
 */
function preload() {
    this.load.image("img_ciel", "src/assets/sky.png"); 
    this.load.image("img_plateforme","src/assets/platform.png");
    this.load.spritesheet("img_perso","src/assets/dude.png",{
  frameWidth:32,
  frameHeight:48
 });
}

/***********************************************************************/
/** FONCTION CREATE 
/***********************************************************************/

/* La fonction create est appelée lors du lancement de la scene
 * si on relance la scene, elle sera appelée a nouveau
 * on y trouve toutes les instructions permettant de créer la scene
 * placement des peronnages, des sprites, des platesformes, création des animations
 * ainsi que toutes les instructions permettant de planifier des evenements
 */
function create() {
  this.add.image( 400  ,  300  ,  "img_ciel") ; 
  groupe_plateformes =this.physics.add.staticGroup () ;
  groupe_plateformes.create(200,584,"img_plateforme");
  groupe_plateformes.create(600,584,"img_plateforme");
  groupe_plateformes.create(50,300,"img_plateforme");
  groupe_plateformes.create(600,450,"img_plateforme");
  groupe_plateformes.create(750,270,"img_plateforme");
  player=this.physics.add.sprite(100,450,"img_perso");
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player,groupe_plateformes);
  player.setBounce(0.2);
  clavier=this.input.keyboard.createCursorKeys();
  this.anims.create({
    key:"anim_tourne_gauche",
    frames:this.anims.generateFrameNumbers("img_perso",{start:0,end:3}),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key:"anim_tourne_droite",
    frames:this.anims.generateFrameNumbers("img_perso",{start:5,end:8}),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key:"anim_saute",
    frames:this.anims.generateFrameNumbers("img_perso",{start:4,end:4}),
    frameRate: 10,
    repeat: -1
  })
}

/***********************************************************************/
/** FONCTION UPDATE 
/***********************************************************************/

function update() {
 if(clavier.right.isDown){
  player.setVelocityX(160);
  player.anims.play("anim_tourne_droite",true);
 }
 else if(clavier.left.isDown){
  player.setVelocityX(-160);
  player.anims.play("anim_tourne_gauche",true)
 }

 else if(clavier.space.isDown && player.body.touching.down){
  player.setVelocityY(-330);
  player.anims.play("anim_saute",true)
 }
  else{
  player.setVelocityX(0);
 }
}
  
var groupe_plateformes ; 
var player
var clavier;