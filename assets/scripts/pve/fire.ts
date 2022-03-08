
import { _decorator, Component, Node, Input } from 'cc';
import { PveGameManage } from './PveGameManage';
const { ccclass, property } = _decorator;


@ccclass('fire')
export class fire extends Component {
    
    @property(PveGameManage)
    public gameManage = null;


    start () {
        this.node.on(Input.EventType.MOUSE_DOWN,this.foerMouseDown,this);
        this.node.on(Input.EventType.MOUSE_UP,this.foerMouseUp,this);
    }

    foerMouseDown(event:EventTarget){
        this.gameManage.foerMouseDown = true;
        
    }
    foerMouseUp(event:EventTarget){
        this.gameManage.foerMouseDown = false;

    }


}


