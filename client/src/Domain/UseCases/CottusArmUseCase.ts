import {CottusArmRepository} from "../Repository/CottusArmRepository";
import {CottusArm} from "../Models/CottusArm";

export default class CottusArmUseCase {
    private armRepository: CottusArmRepository;
    
    constructor(armRepository: CottusArmRepository) {
        this.armRepository = armRepository;
    }
    
    public getCottusArm(): Promise<CottusArm> {
        return this.armRepository.getCottusArm();
    }
}