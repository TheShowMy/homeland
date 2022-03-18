
import { _decorator, Component, Node } from 'cc';
import { Message } from './Message';

const { ccclass, property } = _decorator;


 
@ccclass('ComponentBase')
export class ComponentBase extends Component {

    /**
     * 接受消息
     * @param message 
     */
    ReceiveMessage(message:Message){
        
    }


}


