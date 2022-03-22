
import { _decorator, Component, Node, Button } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
import { MessageType } from '../Manage/Constant';
import { CsvManage } from '../Manage/CsvManage';
import { MessageCenter } from '../Manage/MessageCenter';
import { ViewManage } from '../Manage/ViewManage';
import { wareroomList } from './wareroomList';
const { ccclass, property } = _decorator;


@ccclass('articleDetail')
export class articleDetail extends ComponentBase {
    @property(Node)
    public boxBg = null;
    @property(Button)
    public ButtonNode: Node = null;
    @property(wareroomList)
    public wareroomListScripts:wareroomList = null;

    onLoad(){
        ViewManage.getInstance().RegisterReceiver(this);
        this.boxBg.on(Node.EventType.MOUSE_UP, ()=>{
            MessageCenter.SendCustomMessage(MessageType.Type_view,MessageType.View_Wareroom_button,true);
            this.node.destroy(); 
        }, this);
    }
    start () {
        
    }

    public setWareroom(wareroom:string){
        this.wareroomListScripts.setLabelName(wareroom)
        const path = CsvManage.getInstance().inquireCsvDataListRow("backpack",2,wareroom,3);
        this.wareroomListScripts.setSprite(path);
        
    }
    public setBuutonStatus(Status: boolean){
        
    }


}


