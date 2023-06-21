import { Abc, CircleOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Drawer, Paper } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import React, { useCallback, useState } from "react";
import { createUseStyles } from "react-jss";
import { BaseFormContainer } from "../../commons/baseForm/BaseFormContainer";
import { IconFontSize, NIcon } from "../../commons/NIcon/NIcon";
import { WorkerData } from "../mainContent/MainContentContainer";


export interface WorkerDataProps {
    readonly data?: WorkerData | null;
    readonly openDraw?: boolean;
    readonly onCloseDraw?: () => void;
}

const useStyles = createUseStyles({
    header: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
    },
    groupName: {
        fontWeight: 'bold'
    },
    paperTitle: {
        borderBottom: '1px solid #c6c4c4',
        padding: '8px'
    },
    space: {
        flex: 1
    },
    contentWrapper: {
        display: 'flex'
    },
    contentBox: {
        flex: 1,
        margin: '4px'
    },
    paperContent: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '8px'
    },
    paperContentBox: {
        flex: '1',
        marginRight: '8px',
        minWidth: '140px'
    },
    accordion: {
        flexDirection: "row-reverse"
    },
    accordionBtn: {
        width: '100%',
        cursor: 'pointer',
        display: 'flex',
        height: '100%',
        paddingLeft: '8px',
        "&:hover": {
            background: '#f2f2fe'
        }
    },
    drawMenuWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    drawMenuContent: {
        display: 'flex'
    },
    drawBtn: {
        color: '#000'
    }

});

const accordionTestMenu = [
    { name: 'Werdegang und Weiterbildungeng', icon: Abc, key: 'bildung', underMenu: ['test', 'test2'] },
    { name: 'Kommunikationsdaten', icon: Abc, key: 'kommunikations', underMenu: ['test3', 'test4'] },
    { name: 'Adressen', icon: Abc, key: 'adress' },
    { name: 'Stellen', icon: Abc, key: 'stellen' },
    { name: 'Betreuer', icon: Abc, key: 'betreuer' },
    { name: 'Banken', icon: Abc, key: 'bank' },
    { name: 'Vergütung', icon: Abc, key: 'verguetung' },
    { name: 'Geschäftsvorfälle', icon: Abc, key: 'geschaeftsvorfaelle' },
    { name: 'Zielvereinbarung', icon: Abc, key: 'zielvereinbarung' },
    { name: 'Kontosalden', icon: Abc, key: 'kontosalden' },
    { name: 'Betreuengen', icon: Abc, key: 'betreuengen' },
    { name: 'Notizen', icon: Abc, key: 'notizen' },
    { name: 'Dokumente', icon: Abc, key: 'dokumente' }
]

export const WorkerDataView = React.memo(function WorkerDataView(props: WorkerDataProps) {

    const classes = useStyles();

    const { data } = props;

    const getDate = (dateString?: string | null) => {
        if (dateString == null) {
            return null;
        }
        return new Date(+dateString * 1000).toLocaleDateString("de-De");
    }

    const [expanded, setExpanded] = useState<string | false>(false);

    const handlerExpand = useCallback((panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    },
        []
    )

    return (
        <>
            <div className={classes.header}>
                <div className={classes.space}>
                    <p className={classes.groupName}>Name</p>
                    <p>{`${data?.firstName} ${data?.lastName}`}</p>
                </div>
                <div className={classes.space}>
                    <p className={classes.groupName}>Vermittelart</p>
                    <p>{data?.hr.vermittelart}</p>
                </div>
                <div className={classes.space}>
                    <p className={classes.groupName}>Hauptstelle</p>
                    <p>{data?.hr.workplace}</p>
                </div>

                <div className={classes.space}>
                    <p className={classes.groupName}>Betreut von</p>
                    <p>{data?.hr.workCared}</p>
                </div>

                <div className={classes.space}>
                    <p className={classes.groupName}>Aufnahme</p>
                    <p>{getDate(data?.hr.entryDate)}</p>
                </div>

                <div className={classes.space}>
                    <p className={classes.groupName}>Status</p>
                    <NIcon
                        icon={CircleOutlined}
                        size={IconFontSize.small}
                        rootStyle={{ color: data?.active ? 'green' : 'red' }}
                    />
                </div>

            </div>


            <div className={classes.contentWrapper}>

                <div className={classes.contentBox}>
                    <Paper elevation={3} sx={{ marginBottom: '8px' }}>
                        <div className={classes.paperTitle}>
                            <h3>Persönliche Informationen</h3>
                        </div>

                        <div className={classes.paperContent}>
                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Geburtsdatum</p>
                                <p>{getDate(data?.birthday)}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Geburtsort</p>
                                <p>{data?.birthPlace}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Geburtsname</p>
                                <p>{data?.birthName}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Sprache</p>
                                <p>{data?.languages}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Nationalität</p>
                                <p>{data?.nationality}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Staatsangehörigkeit</p>
                                <p>{data?.nationality}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Geschlecht</p>
                                <p>{data?.gender}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Familienstand</p>
                                <p>{data?.family}</p>
                            </div>

                        </div>

                    </Paper>

                    <Paper elevation={3} sx={{ marginBottom: '8px' }}>
                        <div className={classes.paperTitle}>
                            <h3>Kontakt</h3>
                        </div>

                        <div className={classes.paperContent}>
                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Hauptanschrift</p>
                                <p>{data?.kontakt.address}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>E-mail (Geschäftlich)</p>
                                <p>{data?.kontakt.email}</p>
                            </div>

                        </div>

                    </Paper>

                    <Paper elevation={3} sx={{ marginBottom: '8px' }}>
                        <div className={classes.paperTitle}>
                            <h3>HR</h3>
                        </div>

                        <div className={classes.paperContent}>
                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Eintritt</p>
                                <p>{getDate(data?.hr.entryDate)}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Zugangsweg</p>
                                <p>{data?.hr.access}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Empfehlung durch</p>
                                <p>{data?.hr.recommendation}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Eintrittsbemerkung</p>
                                <p>{data?.hr.notice}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Kündigung am</p>
                                <p>{getDate(data?.hr.endDate)}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Kündigung bestätigt</p>
                                <p>{getDate(data?.hr.endDateConfirmed)}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Kündigung durch</p>
                                <p>{data?.hr.resignation}</p>
                            </div>

                            <div className={classes.paperContentBox}>
                                <p className={classes.groupName}>Austritt</p>
                                <p>{getDate(data?.hr.endDate)}</p>
                            </div>

                        </div>

                    </Paper>

                </div>

                <div className={classes.contentBox}>

                    {accordionTestMenu.map((data, idx) => {

                        return (
                            <Accordion expanded={expanded === data.key} onChange={handlerExpand(data.key)} key={'siteMenu' + idx}>
                                <AccordionSummary expandIcon={<GridExpandMoreIcon />} className={classes.accordion}><p>{data.name}</p></AccordionSummary>
                                {data.underMenu && data.underMenu.length !== 0 &&
                                    <AccordionDetails>
                                        {data.underMenu.map((menu, idx) => {
                                            return (
                                                <div className={classes.accordionBtn} key={'undermenu' + idx}>
                                                    <p>{menu}</p>
                                                </div>
                                            )
                                        })}
                                    </AccordionDetails>
                                }
                            </Accordion>
                        )
                    })}

                </div>

            </div>

            <Drawer
                anchor={'right'}
                open={props.openDraw}
                onClose={props.onCloseDraw}
            >
                <Box
                    sx={{ width: 450, paddingTop: '70px' }}
                >
                    <div>
                        <BaseFormContainer
                            data={props.data ?? undefined}
                            onCloseDraw={props.onCloseDraw}
                        />
                    </div>

                </Box>
            </Drawer>
        </>
    )
})