cc.Class({
    extends: cc.Component,

    properties: {

    },

    onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 3://球碰到地面
								this.destoryBox(this.node);
                break;
        }
    },

    destoryBox(node) {
    	node.removeFromParent();
    }
});