
import { _decorator, Component, Node, UITransform, resources, Prefab, instantiate, Animation } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
import { CsvManage } from '../Manage/CsvManage';
import { ViewManage } from '../Manage/ViewManage';
import { wareroomList } from './wareroomList';
const { ccclass, property } = _decorator;



@ccclass('Wareroom')
export class Wareroom extends ComponentBase {
    @property(Node)
    public content: Node = null;
    @property(Node)
    public boxBg: Node = null;

    public wareroomListMax: number = 30;

    public wareroomListArr: Node[] = [];

    onLoad() {
        ViewManage.getInstance().RegisterReceiver(this);
        //防止点到外面的东西
        this.boxBg.on(Node.EventType.MOUSE_UP, () => { }, this);
    }
    start() {
        const csvManage = CsvManage.getInstance();
        const itemNames =  csvManage.getCsvDataRow("backpack",2);
        const itemIconPaths =  csvManage.getCsvDataRow("backpack",3);
        
        //加载仓库格子
        const contentWidth = this.content.getComponent(UITransform).contentSize.width;
        let listMax = Math.floor(contentWidth / 90);
        let listWidth = contentWidth / listMax;
        this.content.getComponent(UITransform).contentSize.set(contentWidth, Math.ceil(this.wareroomListMax / listMax) * 90);
        new Promise((resolve, reject) =>{
            for (let index = 0; index < this.wareroomListMax; index++) {
                let listIndex = Math.floor(index / listMax) + 1
                resources.load("prefab/ui/wareroomList", Prefab, (err, data) => {
                    let WareroomListNode = instantiate(data);
                    this.wareroomListArr.push(WareroomListNode);
                    WareroomListNode.setParent(this.content)
                    WareroomListNode.setPosition(listWidth * ((index % listMax) + 1), listIndex * -90, 0);
                });
                if ((this.wareroomListMax-1) === index) {
                    resolve(true)
                }
            }
        }).then((res)=>{
            if(res){
                for (let index = 0; index < itemNames.length; index++) {
                    const itemName = itemNames[index];
                    resources.load("prefab/ui/wareroomList1", Prefab, (err, data) => {
                        let WareroomListNode = instantiate(data);
                        WareroomListNode.setParent(this.content);
                        WareroomListNode.setPosition(this.wareroomListArr[index].position);
                        this.wareroomListArr[index].destroy();
                        WareroomListNode.getComponent(wareroomList).setLabelName(itemName);
                        WareroomListNode.getComponent(wareroomList).setSprite(itemIconPaths[index]);
                        
                    });
                    
                }
            }
        });
        


        
        

    }
    qxButton() {

        this.node.getComponent(Animation).defaultClip = this.node.getComponent(Animation).clips[1];
        this.node.getComponent(Animation).play();
        setTimeout(() => {
            this.node.destroy();
        }, 500);


    }


}

