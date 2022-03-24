
import { _decorator, Component, Node, resources, instantiate, Prefab, UITransform, Sprite, Color, Animation, director } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
import { CsvManage } from '../Manage/CsvManage';
import { GameManage } from '../Manage/GameManage';
import { wordList } from './wordList';
const { ccclass, property } = _decorator;



@ccclass('selectWord')
export class selectWord extends ComponentBase {
    number
    @property(Node)
    public content: Node = null;
    @property(Node)
    public Cancel: Node = null;
    @property(Node)
    public boxBg: Node = null;

    private wordListNodes: Node[] = [];
    private wordListNodeId: string[] = [];
    private currentWordId: string = null;
    onLoad() {
        this.Cancel.on(Node.EventType.MOUSE_UP, this.CancelMouseUp, this);
        //防止点到外面的东西
        this.boxBg.on(Node.EventType.MOUSE_UP, () => { }, this);
    }
    start() {
        const scvManage = CsvManage.getInstance();

        this.wordListNodeId = scvManage.getCsvDataRow("worldList", 1);
        const wordLists = scvManage.getCsvDataRow("worldList", 2);

        for (let index = 0; index < wordLists.length; index++) {

            const wordName = wordLists[index];
            resources.load("prefab/ui/wordList", Prefab, (err, data) => {
                let wordListNode = instantiate(data);
                this.wordListNodes.push(wordListNode);
                const contentTransform = this.content.getComponent(UITransform);
                contentTransform.contentSize.set(contentTransform.contentSize.width, (index + 1) * 110);
                wordListNode.setParent(this.content);
                wordListNode.on(Node.EventType.MOUSE_UP, () => {
                    //let isOn = false;
                    if (this.currentWordId === this.wordListNodeId[index]) {
                        return;
                    }
                    this.currentWordId = this.wordListNodeId[index];
                    this.refreshWordList();
                }, this);
                wordListNode.getComponent(wordList).setLabelNmae(wordName);
                wordListNode.getComponent(wordList).wordId = this.wordListNodeId[index];
                wordListNode.setPosition(0, (index + 1) * -90, 0);

                if (index === 0) {
                    wordListNode.getComponent(Sprite).color = new Color(175, 35, 35, 255);
                    this.currentWordId = this.wordListNodeId[index];
                }
            });
        }

    }

    enterButton() {
        let wordName = CsvManage.getInstance().inquireCsvDataListRow("worldList", 1, this.currentWordId, 2);
        let wordPath =CsvManage.getInstance().inquireCsvDataListRow("worldList", 1, this.currentWordId, 3);
        if (GameManage.getInstance().getRoleArmsID() === null) {
            console.log("没有佩戴武器 确定要前往<<" + wordName + ">> 吗？");
            console.log("进入" + this.currentWordId);
            this.loadWord(wordPath);
        } else {
            console.log("进入" + this.currentWordId);
            this.loadWord(wordPath);
        }


    }
    //加载场景并切换
    loadWord(path: string) {
        director.loadScene(path);
    }

    CancelMouseUp() {
        this.node.getComponent(Animation).defaultClip = this.node.getComponent(Animation).clips[1];
        this.node.getComponent(Animation).play();
        setTimeout(() => {
            this.node.destroy();
        }, 500);
    }
    //刷新选择列表
    refreshWordList() {

        for (const wordListNode of this.wordListNodes) {
            if (wordListNode.getComponent(wordList).wordId === this.currentWordId) {
                wordListNode.getComponent(Sprite).color = new Color(175, 35, 35, 255);
            } else {
                wordListNode.getComponent(Sprite).color = new Color(255, 255, 255, 255);
            }

        }

    }

    onDisable() {
        this.Cancel.off(Node.EventType.MOUSE_UP, this.CancelMouseUp, this);
        this.boxBg.off(Node.EventType.MOUSE_UP, () => { }, this);
    }

}


