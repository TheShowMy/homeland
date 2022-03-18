
import { _decorator, Component, Node } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
import { MessageType } from '../Manage/Constant';
import { Message } from '../Manage/Message';
import { MessageCenter } from '../Manage/MessageCenter';
import { ViewManage } from '../Manage/ViewManage';
const { ccclass, property } = _decorator;


@ccclass('loading')
export class loading extends ComponentBase {
    
    constructor(){
        super();
        
        
    }
    onLoad(){
        
 
    }
    start(){
        console.log("loading页面以添加到管理类");
        ViewManage.getInstance().RegisterReceiver(this);
        



        console.log("通知gameManage load页面加载完成");
        MessageCenter.SendCustomMessage(MessageType.Type_game,MessageType.Type_game,"loadEnd");
        
        
    }
    
    setActive(isOn:boolean){
        this.node.active = isOn;
    }

    ReceiveMessage(message:Message){
        super.ReceiveMessage(message);
        console.log(message);
        if (message.Command === MessageType.View_loading) {
            this.setActive(message.Content)
        }
    }

}

