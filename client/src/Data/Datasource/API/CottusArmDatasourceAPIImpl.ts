import CottusArmDatasource from "../CottusArmDatasource";
import {CottusArm} from "../../../Domain/Models/CottusArm";
import {typedFetch} from "../utils/DatasourceUtils";
import {CottusArmAPIEntity} from "./Entity/CottusArmAPIEntity";
import {ArticulationAPIEntity} from "./Entity/ArticulationAPIEntity";
import {Articulation} from "../../../Domain/Models/Articulation";
import {Vector3D} from "../../../Domain/Models/maths/Vector3D";
import {Vector3DAPIEntity} from "./Entity/Vector3DAPIEntity";

/**
 * API Implementation of a datasource for the CottusArm
 * 
 * Its role is to get an instance of the {@link CottusArmAPIEntity} object through
 * the API and then convert it to the model's instance {@link CottusArm} 
 */
export default class CottusArmDatasourceAPIImpl implements CottusArmDatasource {
    async getCottusArm(): Promise<CottusArm> {
        let response = await typedFetch<CottusArmAPIEntity>("/api/cottus-arm");
        let data = await response.json();
        return { articulations: data.articulations.map(mapEntity) };
    }
}

function mapEntity(apiEntity: ArticulationAPIEntity): Articulation {
    return ({
        length: apiEntity.length,
        name: apiEntity.name,
        axis: apiEntity.axis,
        parent: apiEntity.parent === null ? null : mapEntity(apiEntity.parent),
        globalPosition: mapVector(apiEntity.globalPosition),
        localPosition: mapVector(apiEntity.localPosition),
        globalRotation: mapVector(apiEntity.globalRotation),
        localRotation: mapVector(apiEntity.localRotation),
        angleRad: apiEntity.angleRad
    });
}

function mapVector(vectorEntity: Vector3DAPIEntity): Vector3D {
    return (new Vector3D(
        vectorEntity.x,
        vectorEntity.y,
        vectorEntity.z,
    ));
}