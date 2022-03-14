
import { _decorator, Component, Node, Game } from 'cc';
import { GameManage } from '../Manage/GameManage';
const { ccclass, property } = _decorator;

 
@ccclass('gameManage')
export class gameManage extends Component {

     gameManageInstance:GameManage = GameManage.getInstance();
    start () {
        
    }
    
    // update (deltaTime: number) {
    //     // [4]
    // }

}


