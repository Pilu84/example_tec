import React from "react";
import { WorkerData } from "../mainContent/MainContentContainer";
import { WorkerDataView } from "./WorkerDataView";


export interface WorkerDataViewContaienerProps {
    readonly workerData?: WorkerData | null;
    readonly openDraw?: boolean;
    readonly onCloseDraw?: () => void;
}

export const WorkerDataViewContaiener = React.memo(function WorkerDataViewContaiener(props: WorkerDataViewContaienerProps) {

    return (
        <WorkerDataView
            data={props.workerData}
            openDraw={props.openDraw}
            onCloseDraw={props.onCloseDraw}
        />
    )
})