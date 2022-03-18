
import { _decorator, } from 'cc';
import { MessageType } from './Constant';
import { ScvManage } from './CsvManage';
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
        if (!this.instance) {
            this.instance = new GameManage();
            return this.instance;
        }
        return this.instance;
    }
    private constructor() {
        super()
    };

    onLoad(){
        super.onLoad();
 
    }
    setMessageType(){
        return MessageType.Type_game;
    }
    start(){
        
    }
    ReceiveMessage(message:Message){
        
        // super.ReceiveMessage(message);
        if(MessageType.Type_game != message.Command){
            return;
        }
        console.log("gameManage收到消息",message);
        if (message.Content === "loadEnd") {
            console.log("scvManage开始加载配置文件");
            ScvManage.getInstance().startLoad();
        }
        
        
    }
}

