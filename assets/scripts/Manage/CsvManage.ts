
import { _decorator,  resources ,EventTarget, log} from 'cc';
import { MessageType } from './Constant';
import { MessageCenter } from './MessageCenter';
const { ccclass, property } = _decorator;

/**
 * 配置csv文件读取并管理
 */
@ccclass('CsvManage')
export class CsvManage {
    
    private tableNames: string[] = [];
    private tableDatas: string[] = [];

    private static instance: CsvManage;
    private constructor() {
    };

    static getInstance() {
        if (!this.instance) {
            this.instance = new CsvManage();
            return this.instance;
        }
        return this.instance;
    }

    public startLoad(){
        //初始化    
        return this.loadCsvData();
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
    private loadCsvData() {

        //获取resources\csv目录下的所有文件
        const ScvPaths = this.getScvPath("csv");
        let tableName = [];
        let tableData = [];
        let promises:Promise<boolean>[] = []
        //感觉文件名获取文件里的文本数据
        for (let index = 0; index < ScvPaths.length; index++) {
            const promise = new Promise<boolean>((resolve, reject) => {
                resources.load(ScvPaths[index], (err, ScvData) => {
                    if (err) {
                        console.log("读取csv文件报错:" + err);
                        resolve(false)
                    }
                    //将表名和数据分别存放到两个数值中
                    this.tableNames.push(ScvPaths[index].split("/", 2)[1]);
                    this.tableDatas.push(ScvData["text"]);
                    resolve(true)
                });
            });
            promises.push(promise);
        }
        return Promise.all<boolean>(promises);
    }



    /**
     * 通过表名获取指定配置表数据
     * @param tableName 表名
     * @returns 返回表里的所有数据strin类型,不存在该表返回null
     */
    public getCsvDataAll(tableName: string): string {


        for (let i = 0; i < this.tableNames.length; i++) {
            if (this.tableNames[i] === tableName) {
                return this.tableDatas[i];
            }
        }
        return null;
    }
    /**
     * 获取指定配置表的指定行
     * @param tableName 表名
     * @param list 第几行 1-max
     * @returns 返回指定行的数据:strin[]类型 表名或者行数不存在时 返回null
     */
    public getCsvDataList(tableName: string, list: number): string[] {
        const data: string = this.getCsvDataAll(tableName);
        if (data != null && list != 0) {
            let dataLists = data.split("\r\n");
            if (dataLists.length < list) {
                return null;
            }
            return dataLists[list - 1].split(",");

        } else {
            return null;
        }

    }
    /**
     * 获取指定配置表的指定列
     * @param tableName 表名
     * @param row  指定列数
     * @returns 返回指定列的数据: string[]类型
     */
    public getCsvDataRow(tableName: string, row: number): string[] {
        const data: string = this.getCsvDataAll(tableName);

        if (data != null && row != 0) {
            let dataLists = data.split("\r\n");
            if (dataLists[0].split(",").length < row) {
                return null;
            }
            let dataRowList = [];
            for (const datalist of dataLists) {
                dataRowList.push(datalist.split(",")[row - 1])
            }
            return dataRowList;
        } else {
            return null;
        }
    }
    /**
     * 查询指定表指定列 满足条件的行
     * @param tableName 
     * @param row 
     * @param rowValue 
     * @returns 
     */
    public inquireCsvDataList(tableName: string, row: number, rowValue: string): string[] {
        const tableRowList = this.getCsvDataRow(tableName, row);
        if (tableRowList === null) {
            return null;
        }
        for (let index = 0; index < tableRowList.length; index++) {
            if (tableRowList[index] === rowValue) {
                return this.getCsvDataList(tableName, index + 1);
            }
        }
        return null;
    }
    /**
     * 查询指定表指定列 满足条件的行的指定元素
     * @param tableName 
     * @param row 
     * @param rowValue 
     * @param whichColumn 
     * @returns 
     */
    public inquireCsvDataListRow(tableName: string, row: number, rowValue: string, whichColumn: number): string {

        const tableList = this.inquireCsvDataList(tableName, row, rowValue)
        if (tableList === null) {
            return null;
        }
        for (let index = 0; index < tableList.length; index++) {
            if (tableList.length < whichColumn) {
                return null;
            }
            if (index === whichColumn - 1) {
                return tableList[index];
            }

        }
        return null
    }

}


