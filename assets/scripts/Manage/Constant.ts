
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Constant')
export class Constant {
    /**
     * 事件类型枚举
     */
    public static eventType = {
        /**
         *  资源加载完成
         */
        RES_LOAD_END:"resLoadEnd"
    }

}

