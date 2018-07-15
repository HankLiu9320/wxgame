cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    init(gameCtl) {
        this.gameCtl = gameCtl;
        this.node.position = cc.v2(360,270);//初始化位置
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(800,800);//初始化速度
    },

    onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 1://球碰到砖块
                this.gameCtl.onBallContactBrick(self.node, other.node);
                break;
            case 2://球碰到地面
                this.gameCtl.onBallContactGround(self.node, other.node);
                break;
            case 3://球碰到托盘
                this.gameCtl.onBallContactPaddle(self.node, other.node);
                break;
            case 4://球碰到墙
                this.gameCtl.onBallContactWall(self.node, other.node);
                break;
        }
    },

    ballShoot(newX, newY) {
        this.node.position = cc.v2(this.node.x, this.node.y);//初始化位置
        var disX = newX - this.node.x;
        var disY = newY - this.node.y;
        var sqrtVal = Math.sqrt(disX * disX + disY * disY)
        var vecBaseX = disX / sqrtVal;
        var vecBaseY = disY / sqrtVal;
        cc.log("sqrtVal:" + sqrtVal);
        var speed = sqrtVal / 100 * 400;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(vecBaseX * speed, vecBaseY * speed);//初始化速度
        cc.log(newX, newY);
    }
});