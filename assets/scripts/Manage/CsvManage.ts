
import { _decorator, Component, Node, resources } from 'cc';
const { ccclass, property } = _decorator;

 /**
  * 配置csv文件读取并管理
  */
@ccclass('CsvManage')
export class ScvManage {
    private static instance: ScvManage;
    private constructor() {
        //初始化
        this.loadCsvData();
    };
    static getInstance() {
        if (!this.instance) {
            this.instance = new ScvManage();
            return this.instance;
        }
        return this.instance;
    }

    /**
     * 使用表名获取数据
     */
    private csvList = new Map();
    /**
     * 获取指定路径下的所有文件,返回文件列表
     * @param path 需要获取的路径
     * @returns 返回一个 string 数组
     */
    getScvPath(path:string):string[]{
        const infos = resources.getDirWithPath(path)
        let paths = infos.map((info)=>{
            return info.path;
        })
        return paths;
    }

    /**
     * 将每个csv文件 通过[表名:数据]键值对的方法存储
     */
    loadCsvData(){
        const ScvPaths = this.getScvPath("csv")
        for (const ScvPath of ScvPaths) {
            resources.load(ScvPath,(err,ScvData)=>{
                if (err) {
                    console.log("读取csv文件报错:"+ err);
                    return;
                }
                console.log(ScvPath.split("/",2)[1]);
                this.csvList.set(ScvPath.split("/",2)[1],ScvData["text"]);
            })
        }
    }
    /**
     * 通过csv文件名 获取其中的数据
     * @param name csv文件名
     * @returns 
     */
    getDataByCsvName(name:string){
        const data:string =  this.csvList[0].get(name);
        console.log(data);
        
        let dataArr = new Array<string[]>();
        for (let emm of data.split("\n")) {

            //dataArr.push(emm.split(","));
            console.log(emm);
            
        }
        // dataArr.join();
        // console.log(dataArr);
        
        // if (dataArr) {
        //     return dataArr
        // }else{
        //     return null
        // }
    }

}


