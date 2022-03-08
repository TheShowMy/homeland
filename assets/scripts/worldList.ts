
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('worldList')
export class worldList extends Component {

    start () {
        // [3]
    }

    public setText(worldName: string){
        let test = this.node.children[0].getComponent(Label);
        test.string = worldName;
    }

}


