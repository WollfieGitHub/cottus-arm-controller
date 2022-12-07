import {CottusArm} from "../../Domain/Models/CottusArm";

export default interface CottusArmDatasource {
    getCottusArm(): Promise<CottusArm>;
}