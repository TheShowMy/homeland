
import { _decorator, Component, Node, Input } from 'cc';
import { PveGameManage } from './PveGameManage';
const { ccclass, property } = _decorator;

@ccclass('angleButton')
export class angleButton extends Component {

    @property(PveGameManage)
    public gameManage = null;
    @property(Node)
    public angleUp: Node = null
    @property(Node)
    public angleDown: Node = null


    start() {
        // if (this.angleUp === null || this.angleDown === null) {
        //     console.log("(#`O′):大哥  你angleUp和angleDown是不是还没赋值啊");
        //     return;
        // }
        
        this.angleUp.on(Input.EventType.MOUSE_DOWN, this.angleUpMouseDown, this);
        this.angleUp.on(Input.EventType.MOUSE_UP, this.angleUpMouseUp, this);

        this.angleDown.on(Input.EventType.MOUSE_DOWN, this.angleDownMouseDown, this);
        this.angleDown.on(Input.EventType.MOUSE_UP, this.angleDownMouseUp, this);
    }

    angleUpMouseDown() {
        console.log("角度调整up被点击");
        
        this.gameManage.isAngle = true;
        this.gameManage.AngleVal = 1;
    }
    angleUpMouseUp() {
        this.gameManage.isAngle = false;
        this.gameManage.AngleVal = 0;
    }
    angleDownMouseDown(){
        this.gameManage.isAngle = true;
        this.gameManage.AngleVal = -1;
    }
    angleDownMouseUp(){
        this.gameManage.isAngle = false;
        this.gameManage.AngleVal = 0;
    }






    // update (deltaTime: number) {
    //     // [4]
    // }
}


