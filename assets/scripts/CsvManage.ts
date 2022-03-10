
import { _decorator, Component, Node, game } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('CsvManage')
export class CsvManage extends Component {
    
    private static instance:CsvManage;
    private _emm:number;

    onLoad(){
        game.addPersistRootNode(this.node);
        console.log("csvManage");
        this._emm = 0;
    }
    
    
    
    public set emm(v : number) {
        this._emm = v;
    }
    
    public get emm() : number {
        return this._emm;
    }
    
    
    

    start () {
        
    }
    public static getInstance(){
        if (this.instance === null) {
            console.log(this.instance);
            
            this.instance = new CsvManage();
        }
        return CsvManage.instance;
    }

}


