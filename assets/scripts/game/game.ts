
import { _decorator, Component, Node, input, Input, EventKeyboard, Prefab, resources, instantiate, KeyCode, PolygonCollider2D, IPhysics2DContact, Contact2DType, Collider2D, RigidBody, RigidBody2D, Vec2, Vec3, dragonBones } from 'cc';
import { Role } from './Role';
const { ccclass, property } = _decorator;



@ccclass('game')
export class game extends Component {
    @property(Node)
    public birthPoint = null;

    public isLoadEnd = false;

    public RoleDirection = 1;//1朝右,-1朝左.
    public MovingDistance = 0;


    public isJump = false;
    public isCompleteJump = true;
    public isPlay = false;
    public isDoubleHit = false;
    public isDoubleHitStrt = false;

    public rigidbody: RigidBody2D;
    public localCenter = new Vec2();
    @property
    public speed: number = 10;


    public Role: Node = null;

    public RoleDragonBones: dragonBones.ArmatureDisplay = null;

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
                this.RoleDragonBones.addEventListener(dragonBones.EventObject.COMPLETE, this.OnCallAnimationPlayComplete, this);
                this.isLoadEnd = res;
            }
        });


    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
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
        if (!this.isPlay || event.keyCode == KeyCode.KEY_J) {
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
                        this.RoleDragonBones.timeScale = 0.25;
                        this.RoleDragonBones.playAnimation("Damage", 1);
                        //this.isPlay = true;
                        this.rigidbody.applyLinearImpulse(new Vec2(0, 500), this.localCenter, true);
                    }
                    break;
                case KeyCode.KEY_J:
                    if (this.isCompleteJump) {
                        if (!this.isDoubleHitStrt) {
                            if (this.isPlay) {
                                this.MovingDistance = 0;
                                this.isDoubleHit = true;
                                this.isDoubleHitStrt = true;
                            }else{
                                this.MovingDistance = 0;
                                this.RoleDragonBones.playAnimation("Attack", 1);
                                this.Role.getComponent(Role).setArmsCollision(true);
                                this.isPlay = true;
                            }
                        } 
                    }
                      
                    break;
                default:
                    break;
            }
        }

    }

    private OnCallAnimationPlayComplete(event: Event): void {
        // 非循环动画播放完成（dragonBones.EventObject.LOOP_COMPLETE时循环动画播放完成一次）
        if(this.isDoubleHit){
            if (event.type === dragonBones.EventObject.COMPLETE) {
                this.RoleDragonBones.playAnimation("Skill", 1);
                this.Role.getComponent(Role).setArmsCollision(true);
                this.isDoubleHit = false;
            }
        }else{
            if (event.type === dragonBones.EventObject.COMPLETE) {
                if (this.RoleDragonBones.animationName === "Damage") {
                    this.isCompleteJump = true;
                    this.RoleDragonBones.timeScale = 1;
                }
                this.RoleDragonBones.playAnimation("Idle", 0);
                this.isPlay = false;
                this.isDoubleHitStrt = false;
                console.log("播放完毕");
            }
        }
        
        
        
    }

    update(time) {

        if (this.isLoadEnd) {
            this.setRoleMode(this.RoleDirection)
            this.Role.setPosition(this.Role.position.x + this.MovingDistance * this.speed * time, this.Role.position.y, this.Role.position.z);
        }




    }

    setRoleMode(Distance) {
        this.Role.scale = new Vec3(Distance, 1, 1);
        //this.MovingDistance = 0;
    }


    offInput() {
        input.off(Input.EventType.KEY_DOWN, this.KeyPressing, this);
        input.off(Input.EventType.KEY_DOWN, this.KeyPressing, this);
        this.RoleDragonBones.removeEventListener(dragonBones.EventObject.COMPLETE, this.OnCallAnimationPlayComplete, this);
    }
}


