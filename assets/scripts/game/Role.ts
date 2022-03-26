
import { _decorator, Collider2D, Node, IPhysics2DContact, RigidBody2D, Contact2DType ,PolygonCollider2D } from 'cc';
import { MonsterSKXoer } from '../Level/ddt/MonsterSKXoer';
import { ComponentBase } from '../Manage/ComponentBase';
const { ccclass, property } = _decorator;


@ccclass('Role')
export class Role extends ComponentBase {

    @property(Node)
    public arms: Node = null;

    onLoad(){
        this.arms.getComponent(PolygonCollider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        let SKXore = otherCollider.node.getComponent(MonsterSKXoer);
        SKXore.setHP(SKXore.getHP() - 0.1);
        
        this.setArmsCollision(false);
    }
    start() {

    }
    setArmsCollision(isOn: boolean) {
        this.arms.getComponent(RigidBody2D).enabledContactListener = isOn;
    }


}

