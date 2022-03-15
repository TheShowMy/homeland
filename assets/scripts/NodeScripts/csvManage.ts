
import { _decorator, Component, Node } from 'cc';
import { ScvManage } from '../Manage/CsvManage';

const { ccclass, property } = _decorator;


 
@ccclass('csvManage')
export class scvManage extends Component {
    scvManageInstance:ScvManage = ScvManage.getInstance();

    start () {
       
       //this.scvManageInstance.getCsvDataAll("worldList");
       

    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

