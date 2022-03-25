
import { _decorator, Component, Node, input, Input, EventKeyboard, Prefab, resources, instantiate, KeyCode, PolygonCollider2D, IPhysics2DContact, Contact2DType, Collider2D, RigidBody, RigidBody2D, Vec2, Vec3, dragonBones } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('game')
export class game extends Component {
    @property(Node)
    public birthPoint = null;

    public isLoadEnd = false;

    public RoleDirection = 1;//1朝右,-1朝左.
    public MovingDistance = 0;


    public isJump = false;
    public isCompleteJump = false;

    public rigidbody: RigidBody2D;
    public localCenter = new Vec2();
    @property
    public speed: number = 10;


    public Role: Node = null;

    public RoleDragonBones:dragonBones.ArmatureDisplay = null;

    start() {

        new Promise<boolean>((resolve, reject) => {
            resources.load("prefab/Role/Role", Prefab, (err, data) => {
                this.Role = instantiate(data);
                this.Role.setParent(this.node);
                this.Role.setPosition(this.birthPoint.position);
                resolve(true);
            });
        }).then((res) => {
            if (res) {
                const collider = this.Role.getComponent(PolygonCollider2D);
                collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
                this.rigidbody = this.Role.getComponent(RigidBody2D);
                this.RoleDragonBones = this.Role.getComponent(dragonBones.ArmatureDisplay);
                input.on(Input.EventType.KEY_UP, this.KeyPressing, this);
                input.on(Input.EventType.KEY_DOWN, this.KeyDown, this);
                
                this.isLoadEnd = res;
            }
        });


    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        this.isCompleteJump = true; 
    }

    KeyPressing(event: EventKeyboard) {

        switch (event.keyCode) {
            case KeyCode.KEY_A:
            case KeyCode.KEY_D:
                this.MovingDistance = 0;
                break;
            default:
                break;
        }
    }
    KeyDown(event: EventKeyboard) {
        this.rigidbody.getWorldCenter(this.localCenter);

        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.RoleDirection = -1;
                this.MovingDistance = -10;
                break;
            case KeyCode.KEY_D:
                this.RoleDirection = 1;
                this.MovingDistance = 10;
                break;
            case KeyCode.SPACE:
                if (this.isCompleteJump) {
                    this.isCompleteJump = false;
                    this.rigidbody.applyLinearImpulse(new Vec2(0, 500), this.localCenter, true);
                }
                break;
            case KeyCode.KEY_J:
                this.RoleDragonBones.playAnimation("Skill",1);
                //this.RoleDragonBones.addEventListener();
                break;
            default:
                break;
        }
    }

    update(time) {

        if (this.isLoadEnd) {
            this.setRoleMode(this.RoleDirection)
        }       
        this.Role.setPosition(this.Role.position.x + this.MovingDistance * this.speed * time,this.Role.position.y,this.Role.position.z);
        


    }

    setRoleMode(Distance) {
        this.Role.scale = new Vec3(Distance, 1, 1);
        //this.MovingDistance = 0;
    }


    offInput() {
        input.off(Input.EventType.KEY_DOWN, this.KeyPressing, this);
        input.off(Input.EventType.KEY_DOWN, this.KeyPressing, this);
    }
}


