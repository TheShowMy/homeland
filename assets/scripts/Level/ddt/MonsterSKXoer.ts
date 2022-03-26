
import { _decorator, Component, Node, ProgressBar, dragonBones } from 'cc';
import { ComponentBase } from '../../Manage/ComponentBase';
const { ccclass, property } = _decorator;


@ccclass('MonsterSKXoer')
export class MonsterSKXoer extends ComponentBase {

    @property(ProgressBar)
    public HP: ProgressBar = null;
    public MydragonBones: dragonBones.ArmatureDisplay;
    public isPlay = false;
    start() {
        this.MydragonBones = this.node.getComponent(dragonBones.ArmatureDisplay);
        this.MydragonBones.addEventListener(dragonBones.EventObject.COMPLETE, this.OnCallAnimationPlayComplete, this);
    }

    private OnCallAnimationPlayComplete(event: Event): void {
        // 非循环动画播放完成（dragonBones.EventObject.LOOP_COMPLETE时循环动画播放完成一次）
        if (event.type === dragonBones.EventObject.COMPLETE) {
            this.MydragonBones.playAnimation("Idle",0);
            this.isPlay = false;
        }  
    }

    setHP(HP: number) {
        if (!this.isPlay) {
            this.MydragonBones.playAnimation("Damage",1);
            this.isPlay = true;
        }
        this.HP.progress = HP;
    }
    getHP(): number {
        return this.HP.progress;
    }

}
