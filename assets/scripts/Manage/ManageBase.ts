
import { _decorator, Component, Node } from 'cc';
import { ComponentBase } from './ComponentBase';
import { MessageType } from './Constant';
import { Message } from './Message';
import { MessageCenter } from './MessageCenter';
const { ccclass, property } = _decorator;



@ccclass('ManageBase')
export class ManageBase extends ComponentBase {
    /**
     * 已注册消息监听的子类
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
        console.log("消息中心添加了:", this);

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
     * 接受消息并向子类广播这条消息
     * @param message 
     */
    ReceiveMessage(message: Message) {
        super.ReceiveMessage(message);
        if (message.Type === MessageType.Type_view) {
            console.log("view收到管理中心消息");
            console.log(this.messageType != message.Type);
        }


        if (this.messageType != message.Type) {
            return;
        }

        for (const Receive of this.ReceiveList) {
            console.log(Receive);
            Receive.ReceiveMessage(message);
        }
    }
}
