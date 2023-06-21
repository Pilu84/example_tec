import React, { ReactElement } from "react";
import { BaseView } from "./BaseView";


export interface BaseViewContainerProps {
    readonly children: ReactElement | null;
    readonly headerData: {
        readonly name: string | null;
        readonly id: string | null;
    }
    readonly close?: () => void;
    readonly openDraw?: () => void;
}

export const BaseVeiwContainer = React.memo(function BaseViewContainer(props: BaseViewContainerProps) {


    return (
        <BaseView
            children={props.children}
            headerData={props.headerData}
            close={props.close}
            openDraw={props.openDraw}
        />
    )

})