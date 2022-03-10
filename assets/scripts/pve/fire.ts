
import { _decorator, Component, Node, Input, Sprite, Event} from 'cc';
import { PveGameManage } from './PveGameManage';
const { ccclass, property } = _decorator;


@ccclass('fire')
export class fire extends Component {
    
    @property(PveGameManage)
    public gameManage = null;

    //获取力度条节点
    // @property(Node)
    // public powerBut01:Node = null;
    // @property(Node)
    // public powerBut02:Node = null;


    start () {
        this.node.on(Input.EventType.MOUSE_DOWN,this.fierMouseDown,this);
        //this.node.on(Input.EventType.MOUSE_MOVE,this.fierMouseMOVE,this);
        this.node.on(Input.EventType.MOUSE_UP,this.fierMouseUp,this);
    }

    fierMouseDown(event:EventTarget){
        //告诉gameManage 可以开始蓄力了
        this.gameManage.isfireMouseDown = true;
        
    }
    fierMouseUp(event:EventTarget){
        //告诉gameManage 停止蓄力了
        this.gameManage.isfireMouseDown = false;
        this.gameManage.fire()

    }
 
    onDestroy(){
        //关闭监听事件
        this.node.off(Input.EventType.MOUSE_DOWN,this.fierMouseDown,this);
        this.node.off(Input.EventType.MOUSE_UP,this.fierMouseUp,this);
     }

}


