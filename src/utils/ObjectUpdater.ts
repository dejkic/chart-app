// @ts-ignore
import IUpdateable from 'src/pods/system/interfaces';

export default class ObjectUpdater {
    /*
     * instanceToUpdate: the class object to be populated
     * newProps: the object where to take the values
     * strict: if true, means the the class object takes only values from the newProps if they exist on the class object
     */

    public update<T extends IUpdateable<T>>(instanceToUpdate: T, newProps: Partial<T>, strict = false): T {
        for (const key in newProps) {
            if (instanceToUpdate[key] && typeof (instanceToUpdate[key] as any).update === 'function') {
                instanceToUpdate[key] = (instanceToUpdate[key] as any).update(newProps[key]);
            } else {
                if (strict && !instanceToUpdate.hasOwnProperty(key)) {
                    continue;
                }
                // @ts-ignore
                instanceToUpdate[key] = newProps[key];
            }
        }

        return instanceToUpdate;
    }
}

export const updater = new ObjectUpdater();
