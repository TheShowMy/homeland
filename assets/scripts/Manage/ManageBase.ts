
import { _decorator, Component, Node } from 'cc';
import { ComponentBase } from './ComponentBase';
import { MessageType } from './Constant';
import { CsvManage } from './CsvManage';
import { Message } from './Message';
import { MessageCenter } from './MessageCenter';
const { ccclass, property } = _decorator;



@ccclass('ManageBase')
export class ManageBase extends ComponentBase {
    /**
     * 已注册消息监听的子类集合
     */
    ReceiveList: ComponentBase[] = [];
    /**
     * 就收消息类型
     */
    messageType: number;

    onLoad() {
        //设置当前管理类接受的数据类型
        this.messageType = this.setMessageType();
        MessageCenter.Managers.push(this)
    }


    /**
     * 设置接受的消息类型
     * @returns MessageType
     */
    setMessageType() {
        return MessageType.Type_csv;
    }

    /**
     * 注册消息监听
     * @param cb ComponentBase
     */
    RegisterReceiver(cb: ComponentBase) {
        this.ReceiveList.push(cb);
    }
    /**
     * 注销监听
     * @param cb 
     */
    LogoutRecipient(cb: ComponentBase){
        for (let index = 0; index < this.ReceiveList.length; index++) {
            if(this.ReceiveList[index] === cb){
                this.ReceiveList.splice(index,1);
            }
            
        }
    }
    /**
     * 接受消息并向子类广播这条消息
     * @param message 
     */
    ReceiveMessage(message: Message) {
        super.ReceiveMessage(message);

        if (this.messageType != message.Type) {
            return;
        }
        for (const Receive of this.ReceiveList) {
            Receive.ReceiveMessage(message);
        }
    }
}

