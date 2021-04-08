const {ccclass, property} = cc._decorator;

@ccclass
export default class ball extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    initV : number= 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.initV = 0
    }

    // start () {}

    // update (dt) {}

    /**
     * 碰撞回調: 需要先在rigidbody中開啟碰撞監聽，才會有相應的回調產生
     * @param contact 主要的信息
     * @param selfCollider 撞擊物件
     * @param otherCollider 被撞擊物件
     */
    onBeginContact(contact, selfCollider, otherCollider) {

      // 抓到ball的物理組件rigidBody
      let rigid = selfCollider.node.getComponent(cc.RigidBody)

      if (!this.initV) 
        // 第一次碰撞紀錄向下的速度
        this.initV = rigid.linearVelocity.y
      else
        rigid.linearVelocity = cc.v2(0, this.initV)
    }
}
