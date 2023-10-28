export class UI {
    constructor(game) {
        this.game =game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }

    draw(context) {
        context.save();
        context.font = this. fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillText('Score: '+ this.game.score, 20, 50)
        context.restore();
    }
}