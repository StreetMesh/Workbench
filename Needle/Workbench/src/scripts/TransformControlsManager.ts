import { GameObject, Behaviour, IPointerUpHandler, DragControls, TransformGizmo, Duplicatable, syncField } from "@needle-tools/engine";


export class TransformControlsManager extends Behaviour implements IPointerUpHandler
{
    @syncField()
    private dragControlsDisabled: boolean = false;
    
    private static objects: Array<TransformControlsManager> = [];

    lateUpdate(): void {
        if (!this.id) {
            this.gameObject.destroy()
        }
    }
    
    start(): void {
        this.dragControlsDisabled && this.disableDragControls();
    }

    onPointerClick() {
        TransformControlsManager.destroyAllTransformGizmos();
        this.gameObject.addComponent(TransformGizmo);
    }
    
    onPointerUp() {
        this.disableDragControls();
    }
    
    private static destroyAllTransformGizmos() {
        GameObject.findObjectsOfType(TransformGizmo).forEach(gizmo => {
            gizmo.control.detach();
            gizmo.destroy();
        });
    }
    
    private disableDragControls() {
        let dragControls = this.gameObject.getComponent(DragControls);
        if (dragControls !== null) {
            dragControls.enabled = false;
        }
        this.dragControlsDisabled = true;
    }
    
    
    
}