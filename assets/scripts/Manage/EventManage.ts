
import { _decorator, EventTarget } from 'cc';
import { viewManage } from '../NodeScripts/viewManage';
import { Constant } from './Constant';
const { ccclass, property } = _decorator;

const eventTarget = new EventTarget();
@ccclass('EventManage')
export class EventManage{
    view = new viewManage();
    private static instance: EventManage;
    private constructor() { 
        //配置表加载完成后执行
        
        eventTarget.on(Constant.eventType.RES_LOAD_END,()=>{

            //this.view.offLoadingUi(false);

        }).bind(this);

    };
    static getInstance() {
        if (!this.instance) {
            this.instance = new EventManage();
            return this.instance;
        }
        return this.instance; 
    }

    /**
     * 发送事件
     * @param emitType 事件类型
     */
    public emitEvent(emitType:string){
        eventTarget.emit(emitType);
    }
    


}
