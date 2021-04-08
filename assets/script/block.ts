

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {}

    // update (dt) {}

    /**
     * 初始化調整寬度
     * @param w 寬度
     */
    init(w) {
      let collider = this.node.getComponent(cc.PhysicsBoxCollider)
      this.node.width = w
      collider.size.width = w
    }
}
