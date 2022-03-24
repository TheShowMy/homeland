
import { game, _decorator, } from 'cc';
import { MessageType } from './Constant';
import { CsvManage } from './CsvManage';
import { ManageBase } from './ManageBase';
import { Message } from './Message';
import { MessageCenter } from './MessageCenter';
const { ccclass, property } = _decorator;

/**
 * 游戏管理
 */

@ccclass('GameManage')
export class GameManage extends ManageBase {
    private static instance: GameManage;
    public static getInstance() {
        return this.instance;
    }
    private constructor() {
        super();
        //game.removePersistRootNode(this.node);
    };
    private roleArmsID:string = null;
    onLoad() {
        super.onLoad();
        GameManage.instance = this;
    }
    setMessageType() {
        return MessageType.Type_game;
    }
    start() {



    }
    //重写ReceiveMessage 希望直接在管理类处理有些消息
    ReceiveMessage(message: Message) {
        if (MessageType.Type_game != message.Type) {
            return;
        }
        if (message.Command === MessageType.Type_game) {
            if (message.Content === "loadEnd") {
                //加载配置文件
                CsvManage.getInstance().startLoad().then((res) => {
                    MessageCenter.SendCustomMessage(MessageType.Type_view, MessageType.Type_view, "loadBg");
                });
                return;
            }
        }
        super.ReceiveMessage(message);
    }

    public getRoleArmsID():string{
        return this.roleArmsID;
    }
    setRoleArmsID(armsID:string){
        this.roleArmsID = armsID;
    }

}

