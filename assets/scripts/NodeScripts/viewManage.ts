
import { _decorator, Component, Node } from 'cc';
import { ViewManage } from '../Manage/ViewManage';
const { ccclass, property } = _decorator;


 
@ccclass('viewManage')
export class viewManage extends Component {
    viewManageInstance:ViewManage = ViewManage.getInstance();

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

