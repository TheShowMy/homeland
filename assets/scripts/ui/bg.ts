
import { _decorator, Component, Node } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
import { MessageType } from '../Manage/Constant';
import { MessageCenter } from '../Manage/MessageCenter';
import { ViewManage } from '../Manage/ViewManage';
const { ccclass, property } = _decorator;


 
@ccclass('bg')
export class bg extends ComponentBase {
    @property(Node)
    public portal:Node = null;
    @property(Node)
    public box:Node = null;

    onLoad(){
        ViewManage.getInstance().RegisterReceiver(this)
    }
    
    

    start () {
        this.portal.on(Node.EventType.MOUSE_UP,this.portalMouseUp,this);
        this.box.on(Node.EventType.MOUSE_UP,this.boxMouseUp,this);

    }
    //当鼠标从按下状态松开时触发一次
    portalMouseUp(){
        MessageCenter.SendCustomMessage(MessageType.Type_view,MessageType.Type_view,"openSelectWord");
    }
    boxMouseUp(){

    }
}


