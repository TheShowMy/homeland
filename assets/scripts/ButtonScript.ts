
import { _decorator, Component, Node } from 'cc';
import { Constant } from './Constant';
import { gameManage } from './gameManage';
const { ccclass, property } = _decorator;

@ccclass('ButtonScript')
export class ButtonScripts extends Component {

    @property(gameManage)
    public gameManage = null;

    /**
     *主界面传送门被点击时触发
     */
    public portalButton() {
        this.gameManage.setUi(Constant.UI.OptionalWorldUi,true)
    }
    /**
     * 主界面宝箱被点击事件
     */
    public warehouseButton(){

    }
    /**
     * 世界选择界面-确认按钮
     */
    public optionalWorldFixButton(){
        this.gameManage.setUi(Constant.UI.OptionalWorldUi,false)
    }
    /**
     * 世界选择界面-取消按钮
     */
    public optionalWorldCancelButton(){
         this.gameManage.setUi(Constant.UI.OptionalWorldUi,false)
    }

}

