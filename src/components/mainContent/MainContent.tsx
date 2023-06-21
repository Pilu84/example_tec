import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { createUseStyles } from "react-jss";
import { SelectedContent } from "../../App";
import { BaseVeiwContainer } from "../../commons/baseView/BaseViewContainer";
import { Table } from "../../commons/DataGrid/Table";
import { WorkerDataViewContaiener } from "../workerData/WorkerDataViewContainer";
import { WorkerData } from "./MainContentContainer";


export interface MainContentProps {
    readonly selectedContent: SelectedContent | null;
    readonly workerData: WorkerData[];
}

const useStyles = createUseStyles({
    main: {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#f2f2f2',
    },
    noData: {
        justifyContent: 'center'
    }
});


export const MainContent = React.memo(function MainContent(props: MainContentProps) {

    const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);
    const [selectedWordkerData, setSelectedWorkerData] = useState<WorkerData | null>(null);
    const [openDraw, setOpenDraw] = useState<boolean>(false);

    const classes = useStyles();

    const data = useMemo(() => {
        return props.workerData ?? [];
    },
        [props.workerData]
    )

    const handlerSelectCell = useCallback((id: number) => {
        const workerData = data.filter((d) => d.id === id);
        setSelectedWorkerId(id);
        setSelectedWorkerData(workerData[0]);
    },
        [data]
    )

    const handlerOpenDraw = useCallback(() => {
        setOpenDraw(!openDraw);
    },
        [openDraw]
    )

    if (props.selectedContent?.selectedContentId !== 'mitarbeiter') {
        return (
            <div className={clsx(classes.main, classes.noData)}>

                <h2>Keine Daten Verfügbar!</h2>

            </div>
        )
    }

    return (
        <>

            {selectedWorkerId === null &&
                <Table
                    rows={data}
                    columnsData={
                        {
                            editable: false,
                            field: ['id', 'firstName', 'lastName', 'active', 'organisationseinheit'],
                            headername: ['ID', 'Vorname', 'LastName', 'Aktive', 'Organisationseinheit'],
                            width: [80, 80, 80, 100, 150]
                        }
                    }
                    onSelect={(id) => handlerSelectCell(id)}
                />
            }

            {selectedWorkerId !== null &&
                <BaseVeiwContainer
                    headerData={{
                        name: selectedWordkerData?.firstName + ' ' + selectedWordkerData?.lastName,
                        id: selectedWordkerData?.id.toString() ?? null
                    }}
                    close={() => setSelectedWorkerId(null)}
                    openDraw={handlerOpenDraw}
                >
                    <div>
                        <WorkerDataViewContaiener
                            workerData={selectedWordkerData}
                            openDraw={openDraw}
                            onCloseDraw={handlerOpenDraw}
                        />
                    </div>
                </BaseVeiwContainer>
            }
        </>
    )
})