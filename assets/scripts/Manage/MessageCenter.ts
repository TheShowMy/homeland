
import { _decorator, Component, Node } from 'cc';
import { ComponentBase } from './ComponentBase';
import { ManageBase } from './ManageBase';
import { Message } from './Message';
const { ccclass, property } = _decorator;


 
@ccclass('MessageCenter')
export class MessageCenter{
    /**
     * 所有管理类
     */
    public static Managers:ManageBase[] = [];

    /**
     * 向所有的管理类广播消息
     * @param msg 
     */
    public static SendMessage(msg:Message){
        for (const Manager of this.Managers) {
            Manager.ReceiveMessage(msg);
        }
    }
    /**
     * 向所有的管理类广播消息
     * @param Type 
     * @param Command 
     * @param Content 
     */
    public static SendCustomMessage(Type:number,Command:number,Content:any){
        let msg = new Message(Type,Command,Content);
        this.SendMessage(msg);
    }
}
