import React from "react";
import { BaseForm } from "./BaseForm";

export type ObjectMap = {
    [key: string]: any;
};

export type DataRowsProp<T extends ObjectMap = ObjectMap> = T;

export interface BaseFormContainerProps {
    readonly data?: DataRowsProp;
    readonly onCloseDraw?: () => void;
}

export const BaseFormContainer = React.memo(function BaseFormContainer(props: BaseFormContainerProps) {


    return (
        <BaseForm
            data={props.data}
        />
    )

})
