
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
    @property(Node)
    public role: Node = null;

    onLoad(){
        this.portal.on(Node.EventType.MOUSE_UP,this.portalMouseUp,this);
        this.box.on(Node.EventType.MOUSE_UP,this.boxMouseUp,this);
        this.role.on(Node.EventType.MOUSE_UP,this.roleMouseUp,this);
    }
    
    

    start () {
        

    }
    //当鼠标从按下状态松开时触发一次
    portalMouseUp(){
        MessageCenter.SendCustomMessage(MessageType.Type_view,MessageType.Type_view,"openSelectWord");
    }
    boxMouseUp(){
        MessageCenter.SendCustomMessage(MessageType.Type_view,MessageType.Type_view,"openWareroom");
    }
    roleMouseUp(){
        MessageCenter.SendCustomMessage(MessageType.Type_view,MessageType.Type_view,"openRole");
    }
    onDisable(){
        this.portal.off(Node.EventType.MOUSE_UP,this.portalMouseUp,this);
        this.box.off(Node.EventType.MOUSE_UP,this.boxMouseUp,this);
        this.role.off(Node.EventType.MOUSE_UP,this.roleMouseUp,this);
    }
}


