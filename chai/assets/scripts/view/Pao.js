const Ball = require('Ball');

cc.Class({
    extends: cc.Component,

    properties: {
        ballPrefab: cc.Prefab
    },

    onLoad: function () {
        this.node.parent.on("touchstart", (event) => {
            this.changeRotation(event);
        });

        this.node.parent.on("touchmove", (event) => {
            this.changeRotation(event);
        });

        this.node.parent.on("touchend", (event) => {
            let touchPoint = event.getLocation();
            let brickNode = cc.instantiate(this.ballPrefab);
            brickNode.x = 0;
            brickNode.y = 20;
            var ballScript = brickNode.getComponent( 'Ball' );
            ballScript.ballShoot(touchPoint.x, touchPoint.y);
            cc.director.getScene().addChild(brickNode);
        });
    },

    start(){
        this.node.x = 0;
        this.node.y = 0;
    },

    changeRotation(event){
        let touchPoint = this.node.parent.convertToNodeSpace(event.getLocation());
        let disX = touchPoint.x - this.node.x;
        let disY = touchPoint.y - this.node.y;
        let at = Math.atan(disX / disY) * 180 / Math.PI
        this.node.rotation = at;
    }
});