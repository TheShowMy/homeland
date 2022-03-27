
import { _decorator, Component, Node, Button, Sprite, Color, Label } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
import { MessageType } from '../Manage/Constant';
import { CsvManage } from '../Manage/CsvManage';
import { GameManage } from '../Manage/GameManage';
import { MessageCenter } from '../Manage/MessageCenter';
import { wareroomList } from './wareroomList';
const { ccclass, property } = _decorator;


@ccclass('articleDetail')
export class articleDetail extends ComponentBase {
    @property(Node)
    public boxBg = null;
    @property(Node)
    public ButtonNode: Node = null;
    @property(wareroomList)
    public wareroomListScripts: wareroomList = null;

    onLoad() {
        this.boxBg.on(Node.EventType.MOUSE_UP, () => {
            MessageCenter.SendCustomMessage(MessageType.Type_view, MessageType.View_Wareroom_button, true);
            this.node.destroy();
        }, this);
    }
    start() {

        let roleArmsId: string = CsvManage.getInstance().inquireCsvDataListRow("backpack", 2, this.wareroomListScripts.label.string, 1);
        let currentRoleArmsId = GameManage.getInstance().getRoleArmsID();
        if (roleArmsId === currentRoleArmsId) {          
            this.setBuutonStatus(false);
        }
        
    }
    public setWareroom(wareroom: string) {
        this.wareroomListScripts.setLabelName(wareroom)
        const path = CsvManage.getInstance().inquireCsvDataListRow("backpack", 2, wareroom, 3);
        this.wareroomListScripts.setSprite(path);

    }
    public setBuutonStatus(Status: boolean) {
        if (Status) {
            this.ButtonNode.getComponent(Button).interactable = true;
            this.ButtonNode.getComponent(Sprite).color = new Color(255, 255, 255, 255);
        } else {
            this.ButtonNode.getComponent(Button).interactable = false;
            this.ButtonNode.getComponent(Sprite).color = new Color(0, 0, 0, 255);

        }
    }

    ButtonEnd() {       
        let roleArmsId: string = CsvManage.getInstance().inquireCsvDataListRow("backpack", 2, this.wareroomListScripts.label.string, 1);
        GameManage.getInstance().setRoleArmsID(roleArmsId);
        this.node.destroy();
    }

}


