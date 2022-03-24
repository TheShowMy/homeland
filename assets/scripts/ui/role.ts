
import { _decorator, Component, Node } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
import { MessageType } from '../Manage/Constant';
import { CsvManage } from '../Manage/CsvManage';
import { GameManage } from '../Manage/GameManage';
import { Message } from '../Manage/Message';
import { MessageCenter } from '../Manage/MessageCenter';
import { ViewManage } from '../Manage/ViewManage';
import { wareroomList } from './wareroomList';
const { ccclass, property } = _decorator;



@ccclass('role')
export class role extends ComponentBase {
    @property(Node)
    public roleArms: Node = null;
    @property(Node)
    public cancel: Node = null;
    @property(Node)
    public boxBg: Node = null;
    private armsId = null;
    public roleArmsSrms:wareroomList = null;
    onLoad() {
        ViewManage.getInstance().RegisterReceiver(this);
        this.roleArmsSrms = this.roleArms.getComponent(wareroomList);
        this.roleArms.on(Node.EventType.MOUSE_UP, this.roleArmsMouseUp, this);
        this.cancel.on(Node.EventType.MOUSE_UP, this.cancelMouseUp, this);
        this.boxBg.on(Node.EventType.MOUSE_UP, () => { }, this);

        this.armsId = GameManage.getInstance().getRoleArmsID();

        if (GameManage.getInstance().getRoleArmsID() === null) {
            this.roleArmsSrms.setSprite("icon/+");
        }

        for (let armsid of CsvManage.getInstance().getCsvDataRow("backpack", 1)) {
            if (armsid === this.armsId) {
                this.roleArmsSrms.setLabelName(CsvManage.getInstance().inquireCsvDataListRow("backpack", 1, armsid, 2));
                this.roleArmsSrms.setSprite(CsvManage.getInstance().inquireCsvDataListRow("backpack", 1, armsid, 3));
            }
        }
    }

    // start() {

    // }
    onDisable() {
        this.roleArms.off(Node.EventType.MOUSE_UP, this.roleArmsMouseUp, this);
        this.cancel.off(Node.EventType.MOUSE_UP, this.cancelMouseUp, this);
        this.boxBg.off(Node.EventType.MOUSE_UP, () => { }, this);
    }

    cancelMouseUp() {
        ViewManage.getInstance().LogoutRecipient(this);
        this.node.destroy();
    }

    roleArmsMouseUp() {
        MessageCenter.SendCustomMessage(MessageType.Type_view, MessageType.Type_view, "openSelectArms");
    }

    ReceiveMessage(message: Message) {      
        super.ReceiveMessage(message);
        if (message.Command === MessageType.View_refresh_RoleUi) {
            this.armsId = GameManage.getInstance().getRoleArmsID();
            for (let armsid of CsvManage.getInstance().getCsvDataRow("backpack", 1)) {
                if (armsid === this.armsId) {
                    this.roleArmsSrms.setLabelName(CsvManage.getInstance().inquireCsvDataListRow("backpack", 1, armsid, 2));
                    this.roleArmsSrms.setSprite(CsvManage.getInstance().inquireCsvDataListRow("backpack", 1, armsid, 3));
                }
            }
        }
    }
}

