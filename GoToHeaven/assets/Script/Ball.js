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
        var rs = this.calcUnitVec(disX, disY);
        var speed = rs.sqrtVal / 100 * 400;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(rs.baseX * speed, rs.baseY * speed);//初始化速度

				this.schedule(function(dt){
						var rbody = this.getComponent(cc.RigidBody);
		    		var aabb = new cc.Rect();
		    		var ballCenter = rbody.getWorldCenter();
		    		cc.log("ballCenter:" + ballCenter);
		    		aabb.center = ballCenter;
		    		aabb.width = this.node.width + 100;
		    		aabb.height = this.node.height + 100;

		    		cc.log("aabb:" + aabb.x + "," + aabb.y);
						var collider = cc.director.getPhysicsManager().testAABB(aabb);
						cc.log("collider:" + collider.length);

						if(collider.length > 0) {
								for(var i = 0; i < collider.length; i++) {
				            var body = collider[i].body;
				            var bodyCenter = body.getWorldCenter();
				            var vecX = bodyCenter.x - ballCenter.x;
				            var vecY = bodyCenter.y - ballCenter.y;
				            cc.log(vecX + "++++" + vecY);
				            var unitVec = this.calcUnitVec(vecX, vecY);
				            cc.log(unitVec.baseX + "," + unitVec.baseY);
				            var vecSpeedX = unitVec.baseX * 100000;
				            var vecSppedY = unitVec.baseY * 100000;
				            cc.log("force:" + vecSpeedX + "," + vecSppedY);

				            body.applyForceToCenter(cc.v2(vecSpeedX, vecSppedY), true);
								}
					  }

						this.node.removeFromParent();
		    }.bind(this), 3)
    },

    calcUnitVec(x, y) {
        var sqrtVal = Math.sqrt(x * x + y * y)
        var vecBaseX = x / sqrtVal;
        var vecBaseY = y / sqrtVal;
        var rs = new Object();
        rs.baseX = vecBaseX;
        rs.baseY = vecBaseY;
        rs.sqrtVal = sqrtVal;
        return rs;
    }
});