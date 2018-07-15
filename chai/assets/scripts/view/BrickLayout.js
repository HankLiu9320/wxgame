cc.Class({
    extends: cc.Component,

    properties: {
        padding: 0,
        spacing: 0,
        cols: 0,
        brickPrefab: cc.Prefab,
        bricksNumber: 0,
        paddle: cc.Node
    },

    init(bricksNumber) {
        this.node.removeAllChildren();
        this.bricksNumber = bricksNumber;
        var cX = cc.winSize.width >> 1;
        var cY = cc.winSize.height >> 1;

        if(this.bricksNumber % 2 == 0) {
            var half = this.bricksNumber / 2;
            
            for(var i = 0; i < this.bricksNumber; i++) {
                let brickNode = cc.instantiate(this.brickPrefab);

                var curX = 0;
                if(i < half) {
                    curX = cX - i *(brickNode.width + this.spacing) + brickNode.width / 2;
                }
                else {
                    curX = cX + i *(brickNode.width + this.spacing) + brickNode.width / 2;
                }
                
                var curY = cY - 100;
                
                brickNode.parent = this.node;
                brickNode.x = curX;
                brickNode.y = this.paddle.height / 2;
                
                cc.log("x,y:" + brickNode.x + "," + brickNode.y + "," + this.paddle.y);
            }
        }

    }
});