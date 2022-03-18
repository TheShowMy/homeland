
import { _decorator, } from 'cc';
import { MessageType } from './Constant';
import { ScvManage } from './CsvManage';
import { ManageBase } from './ManageBase';
import { Message } from './Message';
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
        super()
    };

    onLoad(){
        super.onLoad();
        GameManage.instance = this;
 
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
        if (message.Content === "loadEnd") {
            ScvManage.getInstance().startLoad();
        }
        
        
    }
}

