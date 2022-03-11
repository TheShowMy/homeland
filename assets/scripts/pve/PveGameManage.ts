
import { _decorator, Component, Node, Sprite, Quat, Prefab, instantiate, RigidBody2D, Vec2, Label } from 'cc';
import { buttetScript } from './buttetScript';
const { ccclass, property } = _decorator;

const ANGLEMAX = 70;
const ANGLEMIN = 20;


@ccclass('PveGameManage')
export class PveGameManage extends Component {

    //获取力度条节点
    @property(Node)
    public powerBut01: Node = null;
    @property(Node)
    public powerBut02: Node = null;

    //判断是否按下或者抬起fire
    public isfireMouseDown = false;
    //------------------------------上面是power按钮相关变量和节点-------------------------------

    @property(Node)
    public angleUp: Node = null;
    @property(Node)
    public angleDown: Node = null;
    @property(Node)
    public rams: Node = null;
    @property()
    public AngleSpeed = 2;
    public isAngle = false;
    public AngleVal = 0;

    @property(Node)
    public showAngle = null;
    @property(Node)
    public angletip = null;
    @property(Node)
    public angleLabel = null;
    //-------------------------------上面是angln角度调整相关节点和变量 

    @property(Prefab)
    public bulletPre: Prefab = null;

    @property(Node)
    public fierPosition: Node = null

    start() {

    }


    update(deltaTime: number) {
        //控制力度条
        if (this.isfireMouseDown) {
            if (this.powerBut01.getComponent(Sprite).fillRange >= 1) {
                this.isfireMouseDown = false;
                this.fire();
                return;
            }
            this.powerBut01.getComponent(Sprite).fillRange += deltaTime * 0.1;
        }
        //设置武器角度
        if (this.isAngle) {

            if (this.rams.angle > ANGLEMAX || this.rams.angle < ANGLEMIN) {
                if (this.AngleVal > 0) {
                    this.rams.angle = ANGLEMAX;
                } else {
                    this.rams.angle = ANGLEMIN;
                }
                this.isAngle = false;
                this.AngleVal = 0;
                return;
            }
            this.rams.angle += this.AngleVal * deltaTime * this.AngleSpeed;

        }
        this.angletip.angle = this.rams.angle;
        this.angleLabel.getComponent(Label).string = "" + this.rams.angle.toFixed();



    }

    public fire() {
        console.log("开火");

        //并把力度记录下来
        this.powerBut02.getComponent(Sprite).fillRange = this.powerBut01.getComponent(Sprite).fillRange;
        this.powerBut01.getComponent(Sprite).fillRange = 0;
        //攻击逻辑
        let fireXY = this.fierPosition.getPosition();
        let bullet = instantiate(this.bulletPre);
        bullet.setParent(this.rams);
        bullet.setPosition(fireXY);
        //bullet.angle = -90;
        let x: number;
        let y: number;
        x = this.powerBut02.getComponent(Sprite).fillRange * 10;
        y = x * Math.tan(Math.abs(this.rams.angle) * (Math.PI / 180));
        bullet.getComponent(RigidBody2D).sleep();
        bullet.getComponent(RigidBody2D).applyLinearImpulse(new Vec2(x, y), new Vec2(bullet.getWorldPosition().x, bullet.getWorldPosition().y), true);

        // let XY1 = new Vec2(bullet.position.x, bullet.position.y);
        // let XY2 = XY1;
        // let r = 0;
        // this.schedule(() => {
        //     let angle

        //     if (XY1.x > XY2.x) {
        //         angle = Math.atan2(XY2.x - XY1.x, XY1.y - XY2.y) * (180 / Math.PI);
        //     } else {
        //         angle = Math.atan2(XY1.x - XY2.x, XY1.y - XY2.y) * (180 / Math.PI);
        //     }

        //     XY1 = new Vec2(bullet.position.x, bullet.position.y);
        //     //*(180/Math.PI); 
        //     bullet.angle = angle;

        // }, 0.01)
    }
    public getForce() {
        return this.powerBut02.getComponent(Sprite).fillRange;
    }


}


