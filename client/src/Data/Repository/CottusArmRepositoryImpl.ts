import {CottusArmRepository} from "../../Domain/Repository/CottusArmRepository";
import CottusArmDatasource from "../Datasource/CottusArmDatasource";
import {CottusArm} from "../../Domain/Models/CottusArm";

export class CottusArmRepositoryImpl implements CottusArmRepository {
    datasource: CottusArmDatasource;
    
    constructor(datasource: CottusArmDatasource) {
        this.datasource = datasource;
    }
    
    async getCottusArm(): Promise<CottusArm> {
        return this.datasource.getCottusArm();
    }
}