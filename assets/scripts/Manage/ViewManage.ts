
import { _decorator, Component, Node, View } from 'cc';
import { MessageType } from './Constant';
import { ManageBase } from './ManageBase';
const { ccclass, property } = _decorator;


 
@ccclass('ViewManage')
export class ViewManage extends ManageBase{
    private static instance: ViewManage;
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ViewManage();
            return this.instance;
        }
        return this.instance;
    }
    private constructor() {
        super()
    };

    onLoad(){
        super.onLoad();

    }
    start(){
    }
    setMessageType(){
        return MessageType.Type_view;
    }

}


