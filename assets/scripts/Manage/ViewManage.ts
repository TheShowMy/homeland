
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


 
@ccclass('ViewManage')
export class ViewManage{
    private static instance: ViewManage;
    private constructor() { };
    static getInstance() {
        if (!this.instance) {
            this.instance = new ViewManage();
            return this.instance;
        }
        return this.instance;
    }
}


