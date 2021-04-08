// import { ball } from "./ball";
const {ccclass, property} = cc._decorator;

@ccclass
export default class game extends cc.Component {

    @property(cc.Node)
    ballNode : cc.Node = null;

    @property(cc.Node)
    blockAreaNode : cc.Node = null;

    @property(cc.Node)
    mask : cc.Node = null;

    @property(cc.Prefab)
    block : cc.Prefab = null;

    @property(cc.Label)
    scoreLabel : cc.Label = null;

    gameStart : number = 0
    blockNodeArr: cc.Node[] = []
    lastBlockPosX: number = 0
    score: number = 0
    private blockNode: cc.Node = null



    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.initPhysics()
      this.node.on('touchstart', this.boast, this)
      this.gameStart = 0
      this.score = 0

      this.mask.active = true

      this.initBlock()
    }

    start () {

    }
    onDestroy() {
      this.node.on('touchstart', this.boast, this)
    }

    update (dt) {
      if (this.gameStart) {

        let spead = -450 * dt
        for (let blockNode of this.blockNodeArr) {
          blockNode.x += spead

          if (blockNode.x < -cc.winSize.width / 2 - blockNode.width / 2) {
            // 若有一個block移出螢幕就加一分
            this.incrScore()
            blockNode.x = this.getLastBlockPosX() + 200
          }
        }
      }
      if(this.ballNode&&this.ballNode.y < -cc.winSize.height / 2) {
        // 若球掉出去，重新載入遊戲
          cc.director.loadScene('game')
      }

    }

    /**
     * 初始化跳板
     */
    initBlock() {
      this.lastBlockPosX = this.ballNode&&this.ballNode.x
      for (let i = 0; i < 10; i++) {
        
        // 創建新節點
        this.blockNode = cc.instantiate(this.block)
        this.blockNode.x = this.lastBlockPosX
        this.blockNode.y = -100

        // 隨機調整跳板寬度
        let blockWidth = 100 + (Math.random() > 0.5 ? 1 :-1) * ( 50 * Math.random())
        this.blockNode.getComponent('block').init(blockWidth)

        this.blockAreaNode.addChild(this.blockNode)
        this.blockNodeArr.push(this.blockNode)
        this.lastBlockPosX += 300
      }
    }

    /**
     * 初始化物理引擎
     */
    initPhysics() {
      let manager = cc.director.getPhysicsManager()

      //FOR DEBUG
      // manager.enabled = true
      // manager.debugDrawFlags = 1

      // 打開物理引擎
      manager.enabled = true

      // 小球的重力，讓掉下去的速度快一點
      manager.gravity = cc.v2(0, -2400)
    }
    /**
     * 加速
     */
    boast() {
      /// 如果球有初始速度，代表遊戲已經開始了
      if (this.ballNode.getComponent('ball').initV) {
        let rigid = this.ballNode.getComponent(cc.RigidBody)
        rigid.linearVelocity = cc.v2(0, -1200)
        this.gameStart = 1
        this.mask.active = false

      }  
    }
    /**
     * 取得跳板位置
     */
    getLastBlockPosX() {
      let postX : number = 0
      for (let blockNode of this.blockNodeArr) {
        if (blockNode.x > postX) {
          postX = blockNode.x
        }
      }
      return postX
    }
    /**
     * 分數計算
     */
    incrScore() {
      this.score ++
      this.scoreLabel.string = this.score.toString()
    }

}
