
import { _decorator, Component, Node } from 'cc';
import { ScvManage } from '../Manage/CsvManage';

const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = scvManage
 * DateTime = Mon Mar 14 2022 14:58:06 GMT+0800 (中国标准时间)
 * Author = TheShow
 * FileBasename = scvManage.ts
 * FileBasenameNoExtension = scvManage
 * URL = db://assets/scripts/NodeScripts/scvManage.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('csvManage')
export class scvManage extends Component {
    scvManageInstance:ScvManage = ScvManage.getInstance();

    start () {
       
       console.log(this.scvManageInstance.getDataByCsvName("worldList"));
       

    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

