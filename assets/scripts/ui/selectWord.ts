
import { _decorator, Component, Node, resources, instantiate, Prefab, UITransform } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
import { ScvManage } from '../Manage/CsvManage';
import { wordList } from './wordList';
const { ccclass, property } = _decorator;



@ccclass('selectWord')
export class selectWord extends ComponentBase {

    @property(Node)
    public content: Node = null;
    start() {
        const scvManage = ScvManage.getInstance()

        const wordLists = scvManage.getCsvDataRow("worldList", 2)
        // wordLists.forEach((wordName,index,list)=>{
        // });
        for (let index = 0; index < wordLists.length; index++) {
            const wordName = wordLists[index];
            resources.load("prefab/ui/wordList", Prefab, (err, data) => {
                let wordList = instantiate(data);
                const contentTransform = this.content.getComponent(UITransform)
                contentTransform.contentSize.set(contentTransform.contentSize.width, (index + 1) * 90);
                wordList.getComponent('wordList');
                
                wordList.setPosition(0, (index + 1) * -90, 0);
                
            });

        }

    }


}


