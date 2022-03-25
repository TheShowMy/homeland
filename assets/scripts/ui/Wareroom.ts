
import { _decorator, Component, Node, UITransform, resources, Prefab, instantiate, Animation, LightComponent, Layers, Layout } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
import { MessageType } from '../Manage/Constant';
import { CsvManage } from '../Manage/CsvManage';
import { Message } from '../Manage/Message';
import { MessageCenter } from '../Manage/MessageCenter';
import { ViewManage } from '../Manage/ViewManage';
import { articleDetail } from './articleDetail';
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
    //仓库里文凭的Node
    public articleNodes: Node[] = [];
    public isOpenArticleDetailUi = true;
    onLoad() {
        ViewManage.getInstance().RegisterReceiver(this);
        //防止点到外面的东西
        this.boxBg.on(Node.EventType.MOUSE_UP, () => { }, this);
    }
    start() {
        const csvManage = CsvManage.getInstance();
        const itemNames = csvManage.getCsvDataRow("backpack", 2);
        const itemIconPaths = csvManage.getCsvDataRow("backpack", 3);
        //加载仓库格子
        const contentWidth = this.content.getComponent(UITransform).contentSize.width;
        let listMax = Math.floor(contentWidth / 90);
        let listWidth = contentWidth / listMax;
        this.content.getComponent(UITransform).contentSize.set(contentWidth, Math.ceil(this.wareroomListMax / listMax) * 90);
        let promises: Promise<boolean>[] = [];
        for (let index = 0; index < this.wareroomListMax; index++) {
            let listIndex = Math.floor(index / listMax) + 1
            const promise = new Promise<boolean>((resolve, reject) => {
                resources.load("prefab/ui/wareroomList", Prefab, (err, data) => {
                    let WareroomListNode = instantiate(data);
                    this.wareroomListArr.push(WareroomListNode);
                    WareroomListNode.setParent(this.content)
                    WareroomListNode.setPosition(listWidth * ((index % listMax) + 1), listIndex * -90, 0);
                    resolve(true);
                });
            })
            promises.push(promise);
        }

        Promise.all<boolean>(promises).then((res) => {
            promises = [];
            for (let index = 0; index < itemNames.length; index++) {
                const itemName = itemNames[index];
                const promise = new Promise<boolean>((resolve, reject) => {
                    resources.load("prefab/ui/wareroomList1", Prefab, (err, data) => {
                        const WareroomListNode = instantiate(data);
                        WareroomListNode.setParent(this.content);
                        WareroomListNode.setPosition(this.wareroomListArr[index].position);
                        WareroomListNode.getComponent(wareroomList).setLabelName(itemName);
                        WareroomListNode.getComponent(wareroomList).SetWareroomName(itemName);
                        WareroomListNode.getComponent(wareroomList).setSprite(itemIconPaths[index]);
                        this.wareroomListArr[index].destroy();
                        this.articleNodes.push(WareroomListNode);
                        resolve(true);
                    });
                });
                promises.push(promise);
            }

            Promise.all<boolean>(promises).then((res) => {
                promises = [];
                for (const articleNode of this.articleNodes) {
                    articleNode.on(Node.EventType.MOUSE_UP, () => {
                        MessageCenter.SendCustomMessage(MessageType.Type_view,MessageType.View_Article_Detail,articleNode.getComponent(wareroomList).wareroomName);
                        this.isOpenArticleDetailUi = false;
                        // resources.load("prefab/ui/articleDetail", Prefab, (err, data) => {
                        //     const articleDetailNode = instantiate(data);
                        //     articleDetailNode.setParent(this.node.getParent())
                        //     articleDetailNode.getComponent(articleDetail).setWareroom(articleNode.getComponent(wareroomList).wareroomName);
                        // });
                        
                    });
                }

            });
        });

    }



    qxButton() {
        if (this.isOpenArticleDetailUi) {
            this.node.getComponent(Animation).defaultClip = this.node.getComponent(Animation).clips[1];
            this.node.getComponent(Animation).play();
            ViewManage.getInstance().LogoutRecipient(this);
            setTimeout(() => {
                this.node.destroy();
            }, 500);
        }

    }

    //详细界面关闭后   打开设置仓库的按钮可以点击
    ReceiveMessage(message: Message) {
        if (message.Command = MessageType.View_Wareroom_button) {
            this.isOpenArticleDetailUi = message.Content;
        }

    }

}

