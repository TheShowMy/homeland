
import { _decorator, Component, Node, assetManager, Sprite, SpriteAtlas, instantiate, Prefab, Button, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gameManage')
export class gameManage extends Component {
    longinViev = {};
    
    start () {
        this.showWiev("ui_pre/LonginViev");
        
        console.log(this.longinViev);
        
        // let portal = this.longinViev["portal"]

        // portal.on(Node.EventType.MOUSE_DOWN,()=>{
        //     console.log("1234");
        // });
        
    }

    showWiev(path:string){
        //加载场景预制体
        assetManager.resources.load(path,Prefab,(err,prefab) => {
            //实例化预制体
            let node = instantiate(prefab);
            //设置父节点
            node.setParent(this.node.children[0]);
            //获取预制体下的所有节点
            this.getAllChidere(node,"");

        })
    }

    getAllChidere(root:Node,path:string){
        for (let child of root.children) {
            this.longinViev[child.name] = child;
            this.getAllChidere(child,child.name + "/");
        }
    }

}

