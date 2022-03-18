
import { _decorator } from 'cc';
const { ccclass, property } = _decorator;


export class Message {
    /**
     * 类型
     */
    Type: number;
    /**
     * 命令
     */
    Command: number;
    /**
     * 内容
     */
    Content: any;

    constructor(Type:number,Command:number,Content:any){
        this.Type = Type;
        this.Command = Command;
        this.Content = Content;
    }

}

