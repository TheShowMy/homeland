
import { _decorator, Component, Node, Label, Sprite, resources, SpriteFrame } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
const { ccclass, property } = _decorator;



@ccclass('wareroomList')
export class wareroomList extends ComponentBase {
    @property(Label)
    public label: Label = null
    @property(Sprite)
    public sprite: Sprite = null
    public wareroomName = null;
    start() {

    }
    public SetWareroomName(wareroomName){
        this.wareroomName = wareroomName;
    }
    public setLabelName(name: string) {
        this.label.string = name;
    }
    public setSprite(path: string) {
        resources.load(path + "/spriteFrame", SpriteFrame, (err, data) => {
            this.sprite.spriteFrame = data;
        });
    }


}


