
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('loading')
export class loading extends Component {

    start(){
        
    }
    setActive(isOn:boolean){
        this.node.active = isOn;
    }

}

