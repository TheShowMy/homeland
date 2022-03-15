
import { _decorator, Component, Node, resources, color } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 配置csv文件读取并管理
 */
@ccclass('CsvManage')
export class ScvManage {
    private tableNames: string[] = [];
    private tableDatas: string[] = [];

    private static instance: ScvManage;
    private constructor() {
        //初始化
        this.loadCsvData(this.emm.bind(this));
    };
    static getInstance() {
        if (!this.instance) {
            this.instance = new ScvManage();
            return this.instance;
        }
        return this.instance;
    }
    /**
     * 获取指定路径下的所有文件,返回文件列表
     * @param path 需要获取的路径
     * @returns 返回一个 string 数组
     */
    getScvPath(path: string): string[] {
        const infos = resources.getDirWithPath(path)
        let paths = infos.map((info) => {
            return info.path;
        })
        return paths;
    }

    /**
     * 将每个csv文件 通过[表名:数据]键值对的方法存储
     */
    private loadCsvData(cb: Function) {

        //获取resources\csv目录下的所有文件
        const ScvPaths = this.getScvPath("csv");
        let a;
        let b;
        //感觉文件名获取文件里的文本数据
        for (const ScvPath of ScvPaths) {
            const e = resources.load(ScvPath, (err, ScvData) => {
                if (err) {
                    console.log("读取csv文件报错:" + err);
                    return;
                }

                //将表名和数据分别存放到两个数值中
                a = ScvPath.split("/", 2)[1];
                b = ScvData["text"];
                cb(a, b);
            });
        }
    }

    emm(tableName:string, tableData:string) {
        this.tableNames.push(tableName)
        this.tableDatas.push(tableData)
        console.log(this.tableDatas);
        console.log(this.tableDatas[0]);
    }

    /**
     * 通过表名获取指定配置表数据
     * @param tableName 表名
     * @returns 返回表里的所有数据,Strin类型,不存在该表返回null
     */
    public getCsvDataAll(tableName: string): string {

        for (let i = 0; i < this.tableNames.length; i++) {
            if (this.tableNames[i] === tableName) {
                return this.tableDatas[i];
            } else {
                return null;
            }
        }

    }
    /**
     * 获取指定配置表的指定行
     * @param tableName 表名
     * @param list 第几行 1-max
     * @returns 返回指定行的数据:strin 表名或者行数不存在时 返回null
     */
    public getCsvDataList(tableName: string, list: number) {
        const data: string = this.getCsvDataAll(tableName);
        if (data != null && list != 0) {
            let dataLists = data.split("\n");
            if (dataLists.length < list) {
                return null;
            }
            return dataLists[list - 1];

        } else {
            return null;
        }

    }
    public getCsvDataRow(tableName: string, row: number) {
        const data: string = this.getCsvDataAll(tableName);
        if (data != null && row != 0) {
            let dataLists = data.split("\n");
            if (dataLists[0].split(",").length < row) {
                return null;
            }

        } else {
            return null;
        }
    }
    public inquireCsvDataList(tableName: string, row: number, rowValue: string) {

    }
    public inquireCsvDataListRow(tableName: string, row: number, rowValue: string, whichColumn: number) {

    }

}


