
import { _decorator, Component, Node, math, Collider2D ,Contact2DType,IPhysics2DContact, RigidBody2D, PhysicsSystem2D, director, PolygonCollider2D} from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('buttetScript')
export class buttetScript extends Component {
    

    onLoad(){
        // this.node.getComponent(RigidBody2D).enabledContactListener = true;
        
        // PhysicsSystem2D.instance.enable = true;
        
        let collider = this.node.getComponent(PolygonCollider2D);
        
        if (collider) { 
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            // collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            // collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            // collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }
        if (PhysicsSystem2D.instance) {
            console.log("添加碰撞事件");
            
            // PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            // PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            // PhysicsSystem2D.instance.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            // PhysicsSystem2D.instance.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }
    }

    start(){
        

    }


    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        setTimeout(function () {
            this.node.destroy();
          }.bind(this), 1);
        
          console.log("`````````````````");
          
        
        
    }
    // onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // 只在两个碰撞体结束接触时被调用一次
    //     console.log('碰到了');
    // }
    // onPreSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // 每次将要处理碰撞体接触逻辑时被调用
    //     console.log('碰到了');
    // }
    // onPostSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // 每次处理完碰撞体接触逻辑时被调用
    //     console.log('碰到了');
    // }

    onDestroy(){
        //关闭监听
        let collider = this.node.getComponent(PolygonCollider2D);
        collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    
}
