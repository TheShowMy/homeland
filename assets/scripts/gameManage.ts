
import { _decorator, Component, Node, assetManager, Sprite, SpriteAtlas, instantiate, Prefab, Button, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gameManage')
export class gameManage extends Component {
    longinViev = {};
    
    start () {
    
        console.log(this.longinViev);

    }
}

