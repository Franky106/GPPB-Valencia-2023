import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";
import { ColorNumberPicker, IColorNumberPicker } from "./components/ColorNumberPicker";

export class ColorNumberPickerControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    private value?: number;
    private value2?: string;

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        
        this.value = context.parameters.value.raw ?? undefined;
        
        // constprops: IHelloWorldProps = { name: 'Hello, World! '  + this.value};
        // return React.createElement(
        //     HelloWorld, props
        // );

        const value3 = context.parameters.value3.raw ?? false;
        const editable = !context.mode.isControlDisabled;

        const props: IColorNumberPicker = { 
            value: this.value,
            editable: editable && value3,
            onChange: this.onChange.bind(this)
        };
        return React.createElement(
            ColorNumberPicker, props
        );
    }

    private onChange(newValue?: number) {
        this.value = newValue;
        this.value2 = newValue !== undefined ? newValue % 2 === 0 ? "par" : "impar" : "---";
        this.notifyOutputChanged();
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as ???bound??? or ???output???
     */
    public getOutputs(): IOutputs {
        return {
            value: this.value,
            value2: this.value2
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
