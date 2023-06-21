import React from "react";
import { SelectedContent } from "../../App";
import { FamilyType, GenderType } from "../baseComponentTypes";
import { MainContent } from "./MainContent";


export type WorkerData = {
    readonly id: number;
    readonly firstName?: string | null;
    readonly lastName?: string | null;
    readonly active: boolean;
    readonly birthday?: string | null;
    readonly organisationseinheit?: string | null;
    readonly birthPlace?: string | null;
    readonly birthName?: string | null;
    readonly languages?: string | null;
    readonly nationality?: string | null;
    readonly gender?: GenderType | null;
    readonly family?: FamilyType | null;
    readonly kontakt: {
        readonly address?: string | null;
        readonly email?: string | null;
    }
    readonly hr: {
        readonly entryDate?: string | null;
        readonly access?: string | null;
        readonly recommendation?: string | null;
        readonly notice?: string | null;
        readonly endDate?: string | null;
        readonly endDateConfirmed?: string | null;
        readonly resignation?: string | null;
        readonly vermittelart?: string | null;
        readonly workplace?: string | null;
        readonly workCared?: string | null;
    },
    readonly tax: {
        readonly taxGroup?: string | null;
    }
}

export interface MainContentContainerProps {
    readonly selectedContent: SelectedContent | null;
}


export const MainContentContainer = React.memo(function MainContentContainer(props: MainContentContainerProps) {

    const dataJson = require('../../dummyData/workerData.json');

    const workerData: WorkerData[] = dataJson.data;



    return (
        <MainContent
            selectedContent={props.selectedContent}
            workerData={workerData}
        />
    )
})