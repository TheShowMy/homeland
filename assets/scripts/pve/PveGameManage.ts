
import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('PveGameManage')
export class PveGameManage extends Component {

    //获取力度条节点
    @property(Node)
    public powerBut01:Node = null;
    @property(Node)
    public powerBut02:Node = null;

    //判断是否按下或者抬起fire
    public isfireMouseDown = false;

    start() {

    }


    update(deltaTime: number) {
        //控制力度条
        if (this.isfireMouseDown) {
            this.powerBut01.getComponent(Sprite).fillRange += deltaTime;
        }
    }

}


