
import { _decorator, } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 游戏管理
 */

@ccclass('GameManage')
export class GameManage {
    private static instance: GameManage;
    private constructor() { };
    static getInstance() {
        if (!this.instance) {
            this.instance = new GameManage();
            return this.instance;
        }
        return this.instance;
    }

}

