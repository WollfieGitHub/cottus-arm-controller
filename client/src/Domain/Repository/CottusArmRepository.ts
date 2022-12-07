import {CottusArm} from "../Models/CottusArm";

export interface CottusArmRepository {
    getCottusArm(): Promise<CottusArm>;
}