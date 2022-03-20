
import { _decorator, Component, Node, Label } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
const { ccclass, property } = _decorator;


 
@ccclass('wordList')
export class wordList extends ComponentBase {

    @property(Label)
    public lable:Label = null;

    public setLabelNmae(name:string){
        this.lable.string = name;
    }


}


