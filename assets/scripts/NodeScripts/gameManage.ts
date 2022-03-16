
import { _decorator, Component,  game, EventTarget } from 'cc';
import { EventManage } from '../Manage/EventManage';
import { GameManage } from '../Manage/GameManage';
import { ScvManage } from "../Manage/CsvManage"
import { viewManage } from './viewManage';
const { ccclass, property } = _decorator;

const eventTarget = new EventTarget();
@ccclass('gameManage')
export class gameManage extends Component {
    scvManage:ScvManage = ScvManage.getInstance()
    gameManageInstance:GameManage = GameManage.getInstance();
    eventManage:EventManage = EventManage.getInstance();
    view = new viewManage();
    onLoad(){
        game.addPersistRootNode(this.node)
        
    }

    start () {
        //this.view.offLoadingUi(true);
        this.scvManage.startLoad();
    }
    

}


