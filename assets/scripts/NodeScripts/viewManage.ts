
import { _decorator, Component, Node, game } from 'cc';
import { ViewManage } from '../Manage/ViewManage';
import { loading } from '../ui/loading';
const { ccclass, property } = _decorator;



@ccclass('viewManage')
export class viewManage extends Component {
    viewManageInstance:ViewManage = ViewManage.getInstance();
    @property(loading)
    public loadingUI:loading = null;
    onLoad(){
        game.addPersistRootNode(this.node)
    }
    start () {

    }
    offLoadingUi(isOn:boolean){
        this.loadingUI.setActive(isOn);
    }

}

