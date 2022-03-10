
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


 
@ccclass('Constant')
export class Constant{
    public static UI = {
        /**
         * 开始界面UI
         */
        StartUi:"StartUi",
        /**
         * 选择世界界面UI
         */
        OptionalWorldUi:"OptionalWorldUi",

        /**
         * 消息ui
         */
        messageUi:"messageUi",
    }
}

