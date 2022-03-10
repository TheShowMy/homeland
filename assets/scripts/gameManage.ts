
import { _decorator, Component, Node, assetManager, Sprite, SpriteAtlas, instantiate, Prefab, Button, EventHandler, LabelComponent, Label } from 'cc';
import { Constant } from './Constant';
const { ccclass, property } = _decorator;
var worlds = [
    {
        name: "斗弹世界",
        map: "ddt",
        choose: 1,

    },
    {
        name: "像素世界",
        map: "minecraft",
        choose: 2,
    },
    {
        name: "原魔",
        map: "minecraft2",
        choose: 3,
    },
];
@ccclass('gameManage')
export class gameManage extends Component {

    /**-------------------------------UI相关变量------------------------------------ */
    /**
     * 主界面UI节点
     */
    @property(Node)
    public startUi = null;
    /**
     * 世界选择UI节点
    */
    @property(Node)
    public optionalWorldUi = null;

    @property(Node)
    public messageUi = null;

    public worldListChoose: number
     /**----------------------------------------------------------------------------- */
    

     /** ------------------------------函数入口已经一些公共方法----------------------- */
    start () {
        this._init()
    }

    /**
     * 初始化游戏需要的个各参数
     */
    private _init() {
        this.startUi.active = true;
        this.worldListChoose = 1;
    }

    update(){
        for (let world of worlds){
            if (world.choose === this.worldListChoose) {
                this.optionalWorldUi.children[1].getComponent(Label).string ="当前选择的世界:" + world.name
            }
            
        }
        
    }

    /** -----------------------------这里是UI相关的操作-------------------------------*/

    public setUi(uiName: Constant,isOpen: boolean){
        switch (uiName) {
            case Constant.UI.StartUi:
                this.startUi.active = isOpen;
                break;
            case Constant.UI.OptionalWorldUi:
                this.optionalWorldUi.active = isOpen;
                break;
            case Constant.UI.messageUi:
            this.messageUi.active = isOpen;
                break;
            default:
                break;
        }
    }

    
    
}

