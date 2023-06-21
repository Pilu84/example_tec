import { AccountTreeOutlined, AssignmentOutlined, CompareArrowsOutlined, HomeOutlined, TableChartOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Paper } from "@mui/material";
import React, { useCallback, useState } from "react";
import { createUseStyles } from "react-jss";
import { ArrayElement } from "../../../commons/types";
import { ButtonSize, ButtonType } from "../../baseComponentTypes";
import { MenuData, UnderMenuDataType } from "./MainMenuContainer";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SelectedContent } from "../../../App";
import { MainBtn } from "../../../commons/MainBtn/MainBtn";


export interface MainMenuProps {
    readonly data: MenuData;
    readonly selectedContent: (selectedContentId: SelectedContent | null) => void;
}


export enum MainMenuType {
    home = 'home',
    daten = 'daten',
    reports = 'reports',
    vorp = 'vorp',
    transfer = 'transfer'
}

const useStyles = createUseStyles({
    mainWrapper: {
        display: 'flex'
    },
    primaryMenu: {
        height: '100%',
        padding: '0 10px',
        display: 'flex',
        flexDirection: 'column',
        background: '#f2f2f2',
        borderRight: '1px solid #c6c4c4'
    },
    selectedMenu: {
        color: '#000'
    },
    secondaryMenu: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#f2f2f2',
        width: '240px',
        overflow: 'auto'
    },
    secondaryMenuTitle: {
        borderBottom: '1px solid #c6c4c4',
        padding: '8px'
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
    }
})


export const MainMenu = React.memo((props: MainMenuProps) => {


    const classes = useStyles();

    const [activeMenu, setActiveMenu] = useState<MainMenuType | null>(null);
    const [expanded, setExpanded] = useState<string | false>(false);

    const selectContent = props.selectedContent;

    const handlerExpand = useCallback((panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    },
        []
    )

    const handlerSelectContent = useCallback((key: string | null) => () => {

        selectContent({ selectedContentId: key });
    },
        [selectContent]
    )

    const handlerSelectMenu = useCallback((selected: MainMenuType) => () => {
        if (selected !== null) {
            setActiveMenu((prevState: MainMenuType | null) => {

                if (prevState === selected) {
                    return null;
                }
                selectContent(null);
                return selected;
            });
        }
    },
        [selectContent]
    )

    const data = props.data

    return (
        <div className={classes.mainWrapper}>
            <div className={classes.primaryMenu}>

                <MainBtn
                    type={ButtonType.iconWithUnderText}
                    btnSize={ButtonSize.large}
                    icon={HomeOutlined}
                    rootStyle={activeMenu === MainMenuType.home ? null : { color: 'black' }}
                    label={MainMenuType.home}
                    onClick={handlerSelectMenu(MainMenuType.home)}
                    tooltipDisabled
                />

                <MainBtn
                    type={ButtonType.iconWithUnderText}
                    btnSize={ButtonSize.large}
                    icon={TableChartOutlined}
                    rootStyle={activeMenu === MainMenuType.daten ? null : { color: 'black' }}
                    label={data[MainMenuType.daten].title}
                    onClick={handlerSelectMenu(MainMenuType.daten)}
                    tooltipDisabled
                />

                <MainBtn
                    type={ButtonType.iconWithUnderText}
                    btnSize={ButtonSize.large}
                    icon={AssignmentOutlined}
                    rootStyle={activeMenu === MainMenuType.reports ? null : { color: 'black' }}
                    label={data[MainMenuType.reports].title}
                    onClick={handlerSelectMenu(MainMenuType.reports)}
                    tooltipDisabled
                />

                <MainBtn
                    type={ButtonType.iconWithUnderText}
                    btnSize={ButtonSize.large}
                    icon={AccountTreeOutlined}
                    rootStyle={activeMenu === MainMenuType.vorp ? null : { color: 'black' }}
                    label={data[MainMenuType.vorp].title}
                    onClick={handlerSelectMenu(MainMenuType.vorp)}
                    tooltipDisabled
                />

                <MainBtn
                    type={ButtonType.iconWithUnderText}
                    btnSize={ButtonSize.large}
                    icon={CompareArrowsOutlined}
                    rootStyle={activeMenu === MainMenuType.transfer ? null : { color: 'black' }}
                    label={data[MainMenuType.transfer].title}
                    onClick={handlerSelectMenu(MainMenuType.transfer)}
                    tooltipDisabled
                />

            </div>

            {activeMenu !== null &&
                <Paper elevation={3} className={classes.secondaryMenu}>
                    <div className={classes.secondaryMenuTitle}>
                        <h2>{data[activeMenu].title}</h2>
                    </div>

                    {data[activeMenu].data && data[activeMenu].data && data[activeMenu].data.map((d: ArrayElement<UnderMenuDataType>, idx: number) => {
                        const key = Object.keys(d)[0];
                        const value = d[key];
                        return (
                            <div key={'menu' + idx}>
                                <Accordion expanded={expanded === key} onChange={handlerExpand(key)}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}><p>{value.title}</p></AccordionSummary>
                                    {value.underMenu && value.underMenu.length !== 0 &&
                                        <AccordionDetails>
                                            {value.underMenu.map((menu, idx) => {
                                                return (
                                                    <div className={classes.accordionBtn} onClick={handlerSelectContent(menu.key)} key={'undermenu' + idx}>
                                                        <p>{menu.name}</p>
                                                    </div>
                                                )
                                            })}
                                        </AccordionDetails>
                                    }
                                </Accordion>
                            </div>
                        )
                    })}
                </Paper>
            }
        </div>
    )
})