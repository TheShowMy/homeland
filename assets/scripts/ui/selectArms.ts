
import { _decorator, Component, Node, resources, instantiate, Prefab, UITransform, Sprite, Color,Animation, Label, Button } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
import { MessageType } from '../Manage/Constant';
import { CsvManage } from '../Manage/CsvManage';
import { GameManage } from '../Manage/GameManage';
import { MessageCenter } from '../Manage/MessageCenter';
import { wareroomList } from './wareroomList';
import { wordList } from './wordList';
const { ccclass, property } = _decorator;



@ccclass('selectArms')
export class selectArms extends ComponentBase {
    number
    @property(Node)
    public content: Node = null;
    @property(Node)
    public Cancel: Node = null;
    @property(Node)
    public boxBg: Node = null;
    @property(Label)
    public label:Label = null;
    @property(Node)
    public enterBut:Node = null;


    public currentSelectionArmsId:String = null;

    public armsList:Node[] = [];
    public currentArmsId = null;
    onLoad() {
        this.Cancel.on(Node.EventType.MOUSE_UP, this.CancelMouseUp, this);
        //防止点到外面的东西
        this.boxBg.on(Node.EventType.MOUSE_UP, ()=>{}, this);
    }
    
    start() {
        const scvManage = CsvManage.getInstance();
        const armsIdS = scvManage.getCsvDataRow("backpack",1);
        this.currentArmsId = armsIdS[0];
        for (let index = 0; index < armsIdS.length; index++) {
            resources.load("prefab/ui/wareroomList1",Prefab,(err,data)=>{
                let arms =  instantiate(data);
                arms.setParent(this.content);
                this.armsList.push(arms);
                arms.getComponent(wareroomList).SetWareroomName(scvManage.inquireCsvDataListRow("backpack",1,armsIdS[index],2));
                arms.getComponent(wareroomList).setLabelName(scvManage.inquireCsvDataListRow("backpack",1,armsIdS[index],2));
                arms.getComponent(wareroomList).setSprite(scvManage.inquireCsvDataListRow("backpack",1,armsIdS[index],3));
                const contentTransform = this.content.getComponent(UITransform);
                contentTransform.contentSize.set(contentTransform.contentSize.width, (index + 1) * 110);
                arms.setPosition(0, (index + 1) * -90, 0);
                arms.on(Node.EventType.MOUSE_UP,()=>{
                    this.currentArmsId = armsIdS[index];
                    this.refreshWordList();
                    this.label.string = scvManage.inquireCsvDataListRow("backpack",1,armsIdS[index],2);
                    if(armsIdS[index] === GameManage.getInstance().getRoleArmsID()){
                        this.enterBut.getComponent(Sprite).color = new Color(0, 0, 0, 255);
                        this.enterBut.getComponent(Button).interactable = false;
                    }else{
                        this.enterBut.getComponent(Sprite).color = new Color(255, 255, 255, 255);
                        this.enterBut.getComponent(Button).interactable = true;
                    }
                },this);
                if (index === 0) {
                    if(armsIdS[0] === GameManage.getInstance().getRoleArmsID()){
                        this.enterBut.getComponent(Sprite).color = new Color(0, 0, 0, 255);
                        this.enterBut.getComponent(Button).interactable = false;
                    }
                    arms.getComponent(Sprite).color = new Color(175, 35, 35, 255);
                    this.label.string = scvManage.inquireCsvDataListRow("backpack",1,armsIdS[0],2);
                }
            });
        }

        

    }

    enterButton() {
        GameManage.getInstance().setRoleArmsID(this.currentArmsId);
        MessageCenter.SendCustomMessage(MessageType.Type_view,MessageType.View_refresh_RoleUi,true);
        this.CancelMouseUp();
    }

    CancelMouseUp() {
        this.node.getComponent(Animation).defaultClip = this.node.getComponent(Animation).clips[1];
        this.node.getComponent(Animation).play();
        setTimeout(()=>{
            this.node.destroy();
        },500);
    }
    //刷新选择列表
    refreshWordList() {
        for (const arms of this.armsList) {
            if (CsvManage.getInstance().inquireCsvDataListRow("backpack",2,arms.getComponent(wareroomList).wareroomName,1) === this.currentArmsId) {
                arms.getComponent(Sprite).color = new Color(175, 35, 35, 255);
            } else {
                arms.getComponent(Sprite).color = new Color(255, 255, 255, 255);
            }

        }

    }

    onDisable() {
        this.Cancel.off(Node.EventType.MOUSE_UP, this.CancelMouseUp, this);
        this.boxBg.off(Node.EventType.MOUSE_UP, ()=>{}, this);
    }

}


